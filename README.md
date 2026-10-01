# TT Alarm Bot

Send a screenshot of a table tennis match and get an alarm a set number of minutes before it starts.
Screenshots are read by Google Gemini (free tier).

## Use it
1. Open the site. On the welcome page, **Sign in with Google** to keep everything on every device,
   or choose **Continue without an account** to keep everything on this device only.
2. Click the ⚙ button (top left) → **Gemini settings** and paste your free Gemini API key from https://aistudio.google.com/apikey.
3. Paste (Ctrl+V), drop, or attach a match screenshot and press Enter.
4. Click the player names on an alarm to open its competition on Ladbrokes. The first player's name is copied
   so you can paste it into the Ladbrokes search. Set each competition's page link (TT Cup, TT Elite Series,
   Czech Liga Pro) and turn the copying on or off in ⚙ Settings.
5. Add your own tags (e.g. "Strong", "Live bet") in ⚙ Settings → Tags, then click an alarm to tag it.
   Tags show next to OVER/UNDER. You can also create a new tag straight from an alarm.
6. Alarms are removed automatically a few hours after their match starts (3 by default). Change the number,
   or set 0 to keep them, in ⚙ Settings → Remove old alarms.
7. When a match has started, its alarm shows **Cash** and **Chalk**. Cash asks for the decimal odds and units placed;
   Chalk records a loss with your last-used units. The match then moves to your history: press the ⟲ button next
   to the "Alarms" title on the right to switch to your history (green = cash, red = chalk) with your total won
   or lost, and press it again to go back. Click a history entry to edit or delete it.
8. The tab at the top right of the chat shows today's P/L (matches starting today, reset to 0 at 12 AM) and either
   a countdown to midnight or the current time. In ⚙ Settings → P/L tracker you can hide either half, pick the
   time style, and show P/L in units or dollars (with your $ per unit).

Keep the tab open for alarms to ring.

## Where your data is kept
- **Signed in with Google:** alarms (with their screenshots), background, UI colour, sound, lead time, old-alarm removal time, Ladbrokes links, tags, match history, P/L tracker options and Gemini settings
  (including your API key) are saved to your account in Firebase and stay in sync across your devices.
  Only you can read them. Whether the alarm list is open stays per device.
  Signing out removes your data from that browser. It stays in your account.
- **Without an account:** everything stays in that browser's local storage, separate for every device and browser.

Nothing is ever saved to this repository.
