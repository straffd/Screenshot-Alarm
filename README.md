# TT Alarm Bot

Send a screenshot of a table tennis match and get an alarm a set number of minutes before it starts.
Screenshots are read by Google Gemini (free tier).

## Use it
1. Open the site. On the welcome page, **Sign in with Google** to keep everything on every device,
   or choose **Continue without an account** to keep everything on this device only.
2. Click the ⚙ button (top left) → **Gemini settings** and paste your free Gemini API key from https://aistudio.google.com/apikey.
3. Paste (Ctrl+V), drop, or attach a match screenshot and press Enter.
4. Click the player names on an alarm to open its competition on Ladbrokes. The first player's name is copied
   so you can paste it into the Ladbrokes search. Clicking the desktop notification when an alarm rings does the
   same (and stops the alarm). TT Cup, TT Elite Series and Czech Liga Pro link to their ladbrokes.com.au pages by
   default; change the links or turn the copying off in ⚙ Settings.
5. Add your own tags (e.g. "Strong", "Live bet") in ⚙ Settings → Tags, then click an alarm to tag it.
   Tags show next to OVER/UNDER. You can also create a new tag straight from an alarm.
6. Alarms are removed automatically a few hours after their match starts (3 by default). Change the number,
   or set 0 to keep them, in ⚙ Settings → Remove old alarms.
7. When a match has started, its alarm shows **Cash** and **Chalk**. Screenshots of matches that already started
   earlier today are added straight away as done, with Cash and Chalk ready. Cash asks for the decimal odds and units placed;
   Chalk records a loss with your last-used units. The match then moves to your history: open the toolbar (› next
   to ⚙) and press **History** to slide it out (green = cash, red = chalk) with your total won or lost.
   Click a history entry to edit or delete it.
8. The tab at the top right of the chat shows today's P/L (matches starting today, reset to 0 at 12 AM) and either
   a countdown to midnight or the current time. In ⚙ Settings → P/L tracker you can hide either half, pick the
   time style, and show P/L in units or dollars (with your $ per unit).
9. Open the toolbar with the › next to ⚙ and press **PNL** for your profit & loss page. It slides out from the right
   (past History if that's open too, with the time | PNL tab always just left of the outermost panel)
   and shows today / this month / all time / win rate, with a **Calendar** (each day's P/L; click a day for its
   matches) or a **Graph** (running total over 7, 30, 90 days or all time).
10. In ⚙ Settings you can also add your own alarm sound (**Add sound…**, audio up to 1 MB, kept on this device)
    and set the background picture's **blur** and **saturation**.
11. Don't want alarms? Turn off **Ring alarms** in ⚙ Settings → Alarms. Matches are still listed and still get
    Cash / Chalk, but nothing rings, notifies or vibrates (anything ringing at that moment is silenced).
12. **Friends** (toolbar → Friends, signed-in only): create a profile with your own **@username** and **picture** (your
    Google name and picture are never shown). Add friends by @username or by sharing your invite link, and accept
    requests under Requests. Click a friend's @ to drop down **PNL · History · Alarms · Block · Unfriend**: PNL and
    History open those panels with their numbers (units, odds and PNL), and Alarms slides out their
    upcoming plays, filtered to **Not in mine / In both / All**, with **Copy** to add one to your alarms. Blocked
    people are listed under Blocked (click to Unblock) and can't send you requests.
    Friends always see your results with odds, units and PNL; under My profile you choose whether they also see your upcoming plays.

Keep the tab open for alarms to ring.

## Where your data is kept
- **Signed in with Google:** alarms (with their screenshots), background, UI colour, sound, lead time, old-alarm removal time, Ladbrokes links, tags, match history, P/L tracker options, background blur/saturation and Gemini settings
  (including your API key) are saved to your account in Firebase and stay in sync across your devices.
  Only you can read them. Whether the alarm list is open, and any custom alarm sounds you add, stay on that device.
  Signing out removes your data from that browser. It stays in your account.
- **Friends:** your @username and picture can be seen by anyone signed in who looks you up by exact username.
  Your plays, results and stats (including odds, units and PNL) are visible only to accepted friends.
  Your private data (screenshots, settings, Gemini key) is never shared.
- **Without an account:** everything stays in that browser's local storage, separate for every device and browser.

Nothing is ever saved to this repository.
