/* TT Alarm Bot proxy: forwards screenshot/chat requests to Gemini using a key
   stored as a Worker secret, so site visitors never need their own key. */

const MAX_BODY = 6 * 1024 * 1024;   // ~6 MB request (base64 screenshot + prompt)
const MAX_PROMPT = 6000;            // characters

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
    const originOk = allowed.length === 0 || allowed.includes(origin);
    const cors = {
      'Access-Control-Allow-Origin': originOk && origin ? origin : (allowed[0] || '*'),
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin'
    };
    const reply = (status, obj) => new Response(JSON.stringify(obj), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

    if (req.method === 'OPTIONS') return new Response(null, { status: originOk ? 204 : 403, headers: cors });
    if (req.method !== 'POST') return reply(405, { error: 'Use POST.' });
    if (!originOk) return reply(403, { error: 'This proxy only serves the TT Alarm Bot site.' });
    if (!env.GEMINI_API_KEY) return reply(500, { error: 'Proxy is missing its GEMINI_API_KEY secret.' });

    // Per-IP rate limit (Cloudflare Rate Limiting binding, see wrangler.toml)
    if (env.RATE_LIMITER) {
      const ip = req.headers.get('CF-Connecting-IP') || 'unknown';
      const { success } = await env.RATE_LIMITER.limit({ key: ip });
      if (!success) return reply(429, { error: 'Too many requests. Wait a minute and try again.' });
    }

    if (+(req.headers.get('Content-Length') || 0) > MAX_BODY) return reply(413, { error: 'Screenshot is too large.' });
    let body;
    try {
      const raw = await req.text();
      if (raw.length > MAX_BODY) return reply(413, { error: 'Screenshot is too large.' });
      body = JSON.parse(raw);
    } catch (e) { return reply(400, { error: 'Bad request body.' }); }

    const { prompt, image, json } = body || {};
    if (typeof prompt !== 'string' || !prompt.trim() || prompt.length > MAX_PROMPT) return reply(400, { error: 'Bad prompt.' });

    const parts = [{ text: prompt }];
    if (image != null) {
      const m = typeof image === 'string' && image.match(/^data:(image\/(?:png|jpeg|webp|heic|heif));base64,([A-Za-z0-9+/=]+)$/);
      if (!m) return reply(400, { error: 'Image must be a PNG, JPEG or WebP.' });
      parts.push({ inline_data: { mime_type: m[1], data: m[2] } });
    }

    const model = env.GEMINI_MODEL || 'gemini-2.5-flash';
    const gen = { temperature: 0 };
    if (json) gen.responseMimeType = 'application/json';
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
      body: JSON.stringify({ contents: [{ parts }], generationConfig: gen })
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      const msg = r.status === 429 ? 'The shared AI quota is used up for now. Try again later, or add your own key in AI settings.'
                                   : ((j.error && j.error.message) || ('Gemini returned ' + r.status));
      return reply(r.status === 429 ? 429 : 502, { error: msg });
    }
    const text = (j.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('');
    return reply(200, { text });
  }
};
