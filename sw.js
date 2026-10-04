// Service worker for the installed app. It lets the browser treat TT Alarm Bot as an installable app
// (opening full screen from the home screen, no address bar). It doesn't cache anything: every page load
// comes from the network, so updates to the site show up straight away.
const PUSH = new URL(self.location).searchParams.get('push') || '';   // push service address (set in index.html)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});   // let every request go to the network as usual

const VIBRATE = [700, 250, 700, 250, 700];
// Settings the app leaves for us in IndexedDB ('tt-sw', written by index.html), e.g. whether alarms vibrate
const pref = (k, dflt) => new Promise(res => {
  try{
    const r = indexedDB.open('tt-sw', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('imgs');
    r.onsuccess = () => { try{ const q = r.result.transaction('imgs').objectStore('imgs').get(k); q.onsuccess = () => res(q.result ?? dflt); q.onerror = () => res(dflt); }catch(e){ res(dflt); } };
    r.onerror = () => res(dflt);
  }catch(e){ res(dflt); }
});

// Locked-phone alarms: the push service wakes the phone at alarm time (an empty push), and we ask it what's due
self.addEventListener('push', e => {
  e.waitUntil((async () => {
    let due = [], close = [];
    try{
      const sub = await self.registration.pushManager.getSubscription();
      if(PUSH && sub){
        const r = await fetch(PUSH + '/pending', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ endpoint: sub.endpoint }) });
        const j = await r.json(); due = j.alarms || []; close = j.close || [];
      }
    }catch(err){}
    if(close.length){   // stopped on another device: take the ringing alarm away, and tell an open app to stop its sound
      for(const id of close) (await self.registration.getNotifications({ tag: id })).forEach(n => n.close());
      await tell({ type: 'remote-stop', ids: close });
      if(!due.length)   // a push must always show something: a quiet note in place of the alarm
        return self.registration.showNotification('Alarm stopped', { body: 'Stopped on your other device', tag: 'tt-stopped', silent: true, icon: 'icon-192.png', badge: 'icon-192.png', data: { id: '', url: '' } });
    }
    if(!due.length) due = [{ id: 'tt-alarm', title: 'A bet is about to start', body: 'Open TT Alarm Bot', url: '' }];   // a push must always show something
    const show = a => self.registration.showNotification(a.title, { body: a.body || '', tag: a.id, renotify: true, requireInteraction: true,
      silent: false, vibrate: VIBRATE, icon: 'icon-192.png', badge: 'icon-192.png', data: { id: a.id, url: a.url || '' } });
    await Promise.all(due.map(show));
    // A notification only buzzes once, so for 10 seconds it's shown again every 3 s (each one buzzes) until it's tapped,
    // swiped away or stopped on another device. Off when Vibration is switched off in the app's Settings.
    if(due[0].id !== 'tt-alarm' && await pref('vib', true) !== false)
      for(let i = 0; i < 3; i++){
        await new Promise(r => setTimeout(r, 3300));
        const left = [];
        for(const a of due) if((await self.registration.getNotifications({ tag: a.id })).length) left.push(a);
        if(!left.length) break;
        await Promise.all(left.map(show));
      }
  })());
});

// Alarm notifications. Tapping one stops the alarm and opens the match's competition on Ladbrokes
// (or the app, if there's no link); swiping it away stops the alarm.
const tell = msg => self.clients.matchAll({ type:'window', includeUncontrolled:true }).then(list => list.forEach(c => c.postMessage(msg)));
self.addEventListener('notificationclick', e => {
  const d = e.notification.data || {}; e.notification.close();
  e.waitUntil(tell({ type:'notif-click', id:d.id }).then(async () => {
    if(d.url) return self.clients.openWindow(d.url);
    const list = await self.clients.matchAll({ type:'window', includeUncontrolled:true });
    const open = list.find(c => c.url.startsWith(self.registration.scope));
    return open ? open.focus() : self.clients.openWindow(self.registration.scope);
  }));
});
self.addEventListener('notificationclose', e => { const d = e.notification.data || {}; e.waitUntil(tell({ type:'notif-close', id:d.id })); });
