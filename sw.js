// Service worker for the installed app. It lets the browser treat TT Alarm Bot as an installable app
// (opening full screen from the home screen, no address bar). It doesn't cache anything: every page load
// comes from the network, so updates to the site show up straight away.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});   // let every request go to the network as usual

// Alarm notifications (Android shows them through here). Tapping one stops the alarm and opens the
// match's competition on Ladbrokes; swiping it away stops the alarm.
const tell = msg => self.clients.matchAll({ type:'window', includeUncontrolled:true }).then(list => list.forEach(c => c.postMessage(msg)));
self.addEventListener('notificationclick', e => {
  const d = e.notification.data || {}; e.notification.close();
  e.waitUntil(tell({ type:'notif-click', id:d.id }).then(() => d.url ? self.clients.openWindow(d.url) : null));
});
self.addEventListener('notificationclose', e => { const d = e.notification.data || {}; e.waitUntil(tell({ type:'notif-close', id:d.id })); });
