# TT Alarm Bot

Send a screenshot of a table tennis match and get an alarm a set number of minutes before it starts.
Screenshots are read by Google Gemini (free tier).

## Use it
1. Open the site. On the welcome page, **Sign in with Google** to keep everything on every device,
   or choose **Continue without an account** to keep everything on this device only.
2. Click the ⚙ button (top left) → **Gemini settings** (or the yellow **Gemini settings** button at the top of the chat,
   shown until a key is saved) and paste your free Gemini API key from https://aistudio.google.com/apikey.
3. Paste (Ctrl+V), drop, or attach a match screenshot and press Enter. No screenshot? Type the match instead, e.g.
   `Will vs Zed 3:20pm` (add `over` or `under`, and any tag names such as `bot` or `strong`, if you like; one per line for several). It's added as a minimal bet with an
   alarm, marked *typed*; friends can see typed bets but can't copy them. The match is added to your **Bets** and its alarm rings
   a set number of minutes before the start. Open or close Bets with **Bets** in the toolbar (› next to ⚙), like
   History, PNL and Friends; it opens by itself when an alarm rings.
4. Click the player names on a bet to open its competition on Ladbrokes. The first player's name is copied
   so you can paste it into the Ladbrokes search. Clicking the desktop notification when an alarm rings does the
   same (and stops the alarm). TT Cup, TT Elite Series and Czech Liga Pro link to their ladbrokes.com.au pages by
   default; change the links or turn the copying off in ⚙ Settings.
5. Add your own tags (e.g. "Strong", "Live bet") in ⚙ Settings → Tags, then click a bet to tag it.
   Tags show next to OVER/UNDER. You can also create a new tag straight from a bet.
6. Bets are removed automatically a few hours after their match starts (3 by default). Change the number,
   or set 0 to keep them, in ⚙ Settings → Remove old bets.
7. When a match has started, its bet shows **Cash** and **Chalk**. Screenshots of matches that already started
   earlier today are added straight away as done, with Cash and Chalk ready. Cash asks for the decimal odds and units placed;
   Chalk records a loss with your last-used units. Set **Average odds** in ⚙ Settings (with its switch on) and Cash records the win in one
   click too, at those odds with your last-used units (click the entry in History to change it). Placed more than one bet on the match? Press **+** to record each one
   in its own slot (odds, units, and Cash / Chalk / Void, where Void counts as 0); the match's P/L is the total. The match then moves to your history: open the toolbar (› next
   to ⚙) and press **History** to slide it out (green = cash, red = chalk) with your total won or lost.
   Click a history entry to edit or delete it.
8. The tab at the top right of the chat shows today's combined P/L (matches starting today, reset to 0 at 12 AM); hover over it
   (or tap it on a phone) to split it into **Me** (your own plays) and **Bot** (bot picks). Next to it is either
   a countdown to midnight or the current time. In ⚙ Settings → P/L tracker you can hide either half, pick the
   time style, and show P/L in units or dollars (with your $ per unit).
9. Open the toolbar with the › next to ⚙ and press **PNL** for your profit & loss page. It slides out from the right
   (past Bets or History if they're open too, with the time | PNL tab always just left of the outermost panel)
   and shows today / this month / all time / win rate, with a **Calendar** (each day's P/L; click a day for its
   matches) or a **Graph** (running total over 7, 30, 90 days or all time). Totals and calendar days are combined;
   hover over one to split it into Me and Bot. Click a day, or the **This month** box, to list those bets.
10. **Bot picks:** a screenshot whose match row has the yellow-tinted background (a bot pick) is tagged **Bot**
    automatically. If one is tagged wrong, open the bet and click the Bot tag to add or remove it.
11. In ⚙ Settings you can also add your own alarm sound (**Add sound…**, audio up to 1 MB, kept on this device)
    and set the background picture's **blur** and **saturation**. With a background picture, the main buttons (normally
    yellow) take on its colour.
12. Don't want alarms? Turn off **Ring alarms** in ⚙ Settings → Alarms. Matches are still listed and still get
    Cash / Chalk, but nothing rings, notifies or vibrates (anything ringing at that moment is silenced).
13. **Friends** (toolbar → Friends, signed-in only): create a profile with your own **@username** and **picture** (your
    Google name and picture are never shown). Add friends by @username or by sharing your invite link, and accept
    requests under Requests. Click a friend's @ to drop down **PNL · History · Bets · Block · Unfriend**: PNL and
    History open those panels with their numbers (units, odds and PNL), and Bets slides out their
    upcoming plays, filtered to **Not in mine / In both / All**, with **Copy** to add one to your bets. Click an item again to close its panel (the ⚙ button closes Settings the same way). Blocked
    people are listed under Blocked (click to Unblock) and can't send you requests.
    **Leaderboard** (toolbar → Leaderboard) ranks you and your friends by units won or lost **today**, this **month** or
    this **year**, with each person's wins and losses. Click a friend to open their PNL. A friend's numbers update when
    they next open the site.
    Friends always see your results with odds, units and PNL; under My profile you choose whether they also see your upcoming plays.

**On a phone** the top is one bar: a **☰** menu on the left (Chat, Bets, History, PNL, Leaderboard, Friends, Settings,
Gemini settings and the home page, with counts and today's P/L next to each) and your picture and @name on the right
(tap it for your profile, or to sign in). The clock / PNL tab isn't shown on phones.

**Install it as an app** (opens full screen from your home screen, no address bar):
- **Android (Chrome):** open the site, tap ⋮ → **Install app** (or **Add to Home screen → Install**).
- **iPhone (Safari):** open the site, tap Share → **Add to Home Screen**.
If you added a shortcut before this, delete it and add it again: an old shortcut keeps opening in the browser.
On Android, alarm notifications now show up (they go through the app's service worker); tapping one stops the
alarm and opens the match's competition on Ladbrokes.

Keep the tab (or the app) open for alarms to ring.

## Where your data is kept
- **Signed in with Google:** bets (with their screenshots), background, UI colour, sound, lead time, old-bet removal time, Ladbrokes links, tags, match history, P/L tracker options, background blur/saturation and Gemini settings
  (including your API key) are saved to your account in Firebase and stay in sync across your devices.
  Only you can read them. Whether the Bets panel is open, and any custom alarm sounds you add, stay on that device.
  Signing out removes your data from that browser. It stays in your account.
- **Friends:** your @username and picture can be seen by anyone signed in who looks you up by exact username.
  Your plays, results and stats (including odds, units and PNL) are visible only to accepted friends.
  Your private data (screenshots, settings, Gemini key) is never shared.
- **Without an account:** everything stays in that browser's local storage, separate for every device and browser.

Nothing is ever saved to this repository.
