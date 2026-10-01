// Service worker for the installed app. It lets the browser treat TT Alarm Bot as an installable app
// (opening full screen from the home screen, no address bar). It doesn't cache anything: every page load
// comes from the network, so updates to the site show up straight away.
const PUSH = new URL(self.location).searchParams.get('push') || '';   // push service address (set in index.html)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});   // let every request go to the network as usual

const VIBRATE = [700, 250, 700, 250, 700];

// Locked-phone alarms: the push service wakes the phone at alarm time (an empty push), and we ask it what's due
self.addEventListener('push', e => {
  e.waitUntil((async () => {
    let due = [];
    try{
      const sub = await self.registration.pushManager.getSubscription();
      if(PUSH && sub){
        const r = await fetch(PUSH + '/pending', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ endpoint: sub.endpoint }) });
        due = (await r.json()).alarms || [];
      }
    }catch(err){}
    if(!due.length) due = [{ id: 'tt-alarm', title: 'A bet is about to start', body: 'Open TT Alarm Bot', url: '' }];   // a push must always show something
    await Promise.all(due.map(a => self.registration.showNotification(a.title, { body: a.body || '', tag: a.id, renotify: true, requireInteraction: true,
      silent: false, vibrate: VIBRATE, icon: 'icon-192.png', badge: 'icon-192.png', data: { id: a.id, url: a.url || '' } })));
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
