# Locked-phone alarms (push service)

Phones pause web apps when the screen locks, so the site can't ring an alarm by itself then.
This small Cloudflare Worker does it instead: the site tells it when each upcoming bet should ring, and every
minute it sends a push to any phone whose alarm is due. The phone shows the notification even when locked
or when the app is closed. It runs on Cloudflare's **free** plan.

What it stores: for each phone, its push address and its upcoming alarms (match name, start time, alarm time,
Ladbrokes link). Alarms are deleted two days after they ring; a phone that uninstalls the app is removed
automatically. The encryption keys (VAPID) are created by the Worker the first time it runs, and kept in its database.

## Set it up (about 5 minutes, all in the Cloudflare dashboard)

1. **Create the Worker.** [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** →
   **Create Worker** (Hello World) → name it `tt-alarm-push` → **Deploy**.
2. **Paste the code.** On the Worker, click **Edit code**, replace everything with the contents of
   [`worker.js`](worker.js), and click **Deploy**.
3. **Create the database.** **Storage & Databases** → **D1 SQL database** → **Create** → name it `tt-alarm-push` → **Create**.
   (No tables to make: the Worker creates them itself.)
4. **Connect the database.** Back on the Worker → **Settings** → **Bindings** → **Add** → **D1 database** →
   Variable name **`DB`** → pick `tt-alarm-push` → **Deploy**.
5. **Run it every minute.** Worker → **Settings** → **Trigger events** (Triggers) → **Add** → **Cron Triggers** →
   enter `* * * * *` (every minute) → **Add**.
6. **(Optional) Lock it to your site.** Worker → **Settings** → **Variables and Secrets** → **Add**:
   - `ALLOWED_ORIGIN` = your site's address, e.g. `https://straffd.github.io`
   - `CONTACT` = `mailto:you@example.com` (sent to the push services so they can reach you about problems)
7. **Check it.** Open the Worker's address (shown on the Worker page, like `https://tt-alarm-push.<you>.workers.dev`).
   It should show `{"ok":true,"service":"TT Alarm Bot push"}`. Adding `/vapid` to the address shows a key.
8. **Point the site at it.** In `index.html`, set
   `const PUSH_SERVER = 'https://tt-alarm-push.<you>.workers.dev';` and publish.

## Use it on a phone

Open the installed app → ☰ → **Settings** → **Alarms** → **Allow notifications**. The line under it should read
**Locked-phone alarms: on**. Tap **Test alarm** and lock the phone: the notification arrives within about a minute.

- **Android:** works in Chrome and in the installed app.
- **iPhone:** works only in the app installed from Safari (Share → Add to Home Screen), iOS 16.4 or later.
- Alarms can arrive up to about a minute late, because the Worker checks once a minute.

## Free plan limits

Workers: 100,000 requests a day. D1: 5 million rows read and 100,000 written a day. The every-minute check
is one small query, and each bet change is one request, so normal use is far below these.
