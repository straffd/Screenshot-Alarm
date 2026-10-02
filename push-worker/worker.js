/* TT Alarm Bot push service (Cloudflare Worker + D1).
   Phones can't run a web app while they're locked, so this service sends the alarm instead:
   the site tells it when each upcoming bet should ring, and a cron trigger (every minute) sends a Web Push to
   that phone when the time comes. The phone wakes up, its service worker asks /pending what's due, and shows it.

   Setup (Cloudflare dashboard, free plan): see push-worker/README.md.
   Bindings: DB = a D1 database. Optional variable: ALLOWED_ORIGIN = https://<you>.github.io (CORS).
   Encryption keys (VAPID) are created on first use and kept in the database: nothing to generate or paste.

   Routes:
     GET  /vapid      → { key }                      public key the site subscribes with
     POST /schedule   { sub, alarms:[{ id, ring, title, body, url }] }   replace this phone's upcoming alarms
     POST /pending    { endpoint }                   alarms just sent to this phone (the service worker shows them)
   Pushes carry no payload, so nothing needs encrypting: the phone fetches the details from /pending. */

const VERSION = '2026-10-02';  // shown on the health check, so you can tell which code is deployed
const LOOKAHEAD = 20e3;          // send up to 20 s early (the cron runs once a minute)
const SHOW_WINDOW = 15 * 60e3;   // /pending returns alarms sent in the last 15 min

// The D1 database: the binding called DB, or else any D1 binding whatever it's called (the dashboard sometimes
// names it after the database). Returns null if none is attached.
function findDb(env){
  if(env.DB && typeof env.DB.prepare === 'function') return env.DB;
  return Object.values(env || {}).find(v => v && typeof v.prepare === 'function' && typeof v.batch === 'function') || null;
}
const NO_DB = 'No database connected. In the Cloudflare dashboard open this Worker → Settings → Bindings → Add binding → '
  + 'D1 database, set the variable name to DB, pick your tt-alarm-push database, and deploy. Then reload this page.';

export default {
  async fetch(req, env){
    const db = findDb(env); if(db) env = { ...env, DB: db };
    const cors = { 'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                   'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400' };
    const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
    if(req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if(!db) return json({ ok: false, error: NO_DB, version: VERSION, bindingsSeen: Object.keys(env || {}).map(k => `${k} (${env[k] === null ? 'null' : typeof env[k]})`) }, 500);
    try{
      await setup(env);
      const path = new URL(req.url).pathname.replace(/\/+$/, '');
      if(req.method === 'GET' && path === '/vapid') return json({ key: (await vapid(env)).pub });
      if(req.method === 'GET' && (path === '' || path === '/')){   // health check: shows the database works
        const subs = await env.DB.prepare('SELECT count(*) AS n FROM subs').first(), waiting = await env.DB.prepare("SELECT count(*) AS n FROM alarms WHERE status = 'wait'").first();
        return json({ ok: true, service: 'TT Alarm Bot push', version: VERSION, phones: subs.n, alarmsWaiting: waiting.n });
      }
      if(req.method !== 'POST') return json({ error: 'not found' }, 404);
      const body = await req.json().catch(() => null);
      if(!body) return json({ error: 'bad json' }, 400);

      if(path === '/schedule'){
        const sub = body.sub;
        if(!sub || typeof sub.endpoint !== 'string' || !/^https:\/\//.test(sub.endpoint) || sub.endpoint.length > 1000) return json({ error: 'bad subscription' }, 400);
        const h = await hash(sub.endpoint), now = Date.now();
        const list = (Array.isArray(body.alarms) ? body.alarms : []).slice(0, 200)
          .filter(a => a && typeof a.id === 'string' && Number.isFinite(a.ring) && a.ring > now - 60e3 && a.ring < now + 14 * 864e5);
        const stmts = [
          env.DB.prepare('INSERT INTO subs (h, sub, updated) VALUES (?1, ?2, ?3) ON CONFLICT(h) DO UPDATE SET sub = ?2, updated = ?3').bind(h, JSON.stringify(sub), now),
          env.DB.prepare("DELETE FROM alarms WHERE h = ?1 AND status = 'wait'").bind(h),
          ...list.map(a => env.DB.prepare("INSERT OR IGNORE INTO alarms (h, id, ring, title, body, url, status) VALUES (?1, ?2, ?3, ?4, ?5, ?6, 'wait')")
            .bind(h, a.id.slice(0, 64), Math.round(a.ring), String(a.title || 'Alarm').slice(0, 120), String(a.body || '').slice(0, 200), safeUrl(a.url)))
        ];
        await env.DB.batch(stmts);
        return json({ ok: true, scheduled: list.length });
      }
      if(path === '/pending'){
        if(typeof body.endpoint !== 'string') return json({ error: 'bad endpoint' }, 400);
        const h = await hash(body.endpoint), now = Date.now();
        const { results } = await env.DB.prepare("SELECT id, ring, title, body, url FROM alarms WHERE h = ?1 AND status = 'sent' AND sent_at > ?2 ORDER BY ring")
          .bind(h, now - SHOW_WINDOW).all();
        if(results.length) await env.DB.prepare("UPDATE alarms SET status = 'shown' WHERE h = ?1 AND status = 'sent'").bind(h).run();
        return json({ alarms: results });
      }
      return json({ error: 'not found' }, 404);
    }catch(e){ return json({ error: String(e && e.message || e) }, 500); }
  },

  // Cron trigger: every minute
  async scheduled(event, env, ctx){ ctx.waitUntil(sendDue(env)); }
};

export async function sendDue(env, now = Date.now()){
  const db = findDb(env); if(!db){ console.error(NO_DB); return []; }
  env = { ...env, DB: db };
  await setup(env);
  const { results } = await env.DB.prepare("SELECT DISTINCT h FROM alarms WHERE status = 'wait' AND ring <= ?1").bind(now + LOOKAHEAD).all();
  const keys = results.length ? await vapid(env) : null, out = [];
  for(const { h } of results){
    const row = await env.DB.prepare('SELECT sub FROM subs WHERE h = ?1').bind(h).first();
    if(!row){ await env.DB.prepare('DELETE FROM alarms WHERE h = ?1').bind(h).run(); continue; }
    const sub = JSON.parse(row.sub);
    let status = 0;
    try{ status = (await push(sub.endpoint, keys, env)).status; }catch(e){ status = 0; }
    if(status === 404 || status === 410){   // the phone unsubscribed or the app was removed
      await env.DB.batch([env.DB.prepare('DELETE FROM subs WHERE h = ?1').bind(h), env.DB.prepare('DELETE FROM alarms WHERE h = ?1').bind(h)]);
    } else if(status >= 200 && status < 300){
      await env.DB.prepare("UPDATE alarms SET status = 'sent', sent_at = ?2 WHERE h = ?1 AND status = 'wait' AND ring <= ?3").bind(h, now, now + LOOKAHEAD).run();
    }   // other failures: left waiting, tried again next minute
    out.push({ h, status });
  }
  await env.DB.prepare('DELETE FROM alarms WHERE ring < ?1').bind(now - 2 * 864e5).run();   // tidy up
  return out;
}

const ready = new WeakSet();   // databases whose tables we've already made
async function setup(env){
  if(ready.has(env.DB)) return;
  await env.DB.batch([
    env.DB.prepare('CREATE TABLE IF NOT EXISTS subs (h TEXT PRIMARY KEY, sub TEXT NOT NULL, updated INTEGER)'),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS alarms (h TEXT NOT NULL, id TEXT NOT NULL, ring INTEGER NOT NULL, title TEXT, body TEXT, url TEXT, status TEXT NOT NULL DEFAULT 'wait', sent_at INTEGER, PRIMARY KEY (h, id))"),
    env.DB.prepare('CREATE INDEX IF NOT EXISTS alarms_due ON alarms (status, ring)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS kv (k TEXT PRIMARY KEY, v TEXT NOT NULL)')
  ]);
  ready.add(env.DB);
}

// VAPID key pair: made once, stored in the database
async function vapid(env){
  if(vapid.cache) return vapid.cache;
  let row = await env.DB.prepare("SELECT v FROM kv WHERE k = 'vapid'").first();
  if(!row){
    const pair = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
    const jwk = await crypto.subtle.exportKey('jwk', pair.privateKey), raw = new Uint8Array(await crypto.subtle.exportKey('raw', pair.publicKey));
    await env.DB.prepare("INSERT OR IGNORE INTO kv (k, v) VALUES ('vapid', ?1)").bind(JSON.stringify({ jwk, pub: b64u(raw) })).run();
    row = await env.DB.prepare("SELECT v FROM kv WHERE k = 'vapid'").first();   // another request may have won the race
  }
  const { jwk, pub } = JSON.parse(row.v);
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
  return (vapid.cache = { key, pub });
}

// One empty Web Push (RFC 8030) with VAPID (RFC 8292) authorisation
async function push(endpoint, keys, env){
  const aud = new URL(endpoint).origin;
  const enc = o => b64u(new TextEncoder().encode(JSON.stringify(o)));
  const head = enc({ typ: 'JWT', alg: 'ES256' }), claims = enc({ aud, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: env.CONTACT || 'mailto:alarms@tt-alarm-bot.invalid' });
  const sig = new Uint8Array(await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, keys.key, new TextEncoder().encode(head + '.' + claims)));
  return fetch(endpoint, { method: 'POST', headers: { Authorization: `vapid t=${head}.${claims}.${b64u(sig)}, k=${keys.pub}`, TTL: '600', Urgency: 'high', 'Content-Length': '0' } });
}

const b64u = bytes => { let s = ''; for(const b of bytes) s += String.fromCharCode(b); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
async function hash(s){ return b64u(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)))).slice(0, 32); }
function safeUrl(u){ try{ const x = new URL(String(u)); return x.protocol === 'https:' ? x.href.slice(0, 400) : ''; }catch(e){ return ''; } }
