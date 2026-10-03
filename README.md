# TT Alarm Bot

Send a screenshot of a table tennis match and get an alarm a set number of minutes before it starts.
Screenshots are read by Google Gemini (free tier).

## Use it
1. Open the site. On the welcome page, **Sign in with Google** to keep everything on every device,
   or choose **Continue without an account** to keep everything on this device only.
   The first time, a short **tutorial** walks you through adding your Gemini key and checking your league links, then
   shows you around (replay it any time: Settings → Help → Replay the tutorial).
2. Click **Settings** in the top bar (phones: ☰ menu → Settings) → Gemini → **Gemini settings** (or the blue **Gemini settings** button at the top of the chat,
   shown until a key is saved) and paste your free Gemini API key from https://aistudio.google.com/apikey.
3. Paste (Ctrl+V), drop, or attach a match screenshot and press Enter. No screenshot? Type the match instead, e.g.
   `Will vs Zed 3:20pm` (add `over` or `under`, and any tag names such as `bot` or `strong`, if you like; one per line for several). It's added as a minimal bet with an
   alarm, marked *typed*; friends can see typed bets but can't copy them. The match is added to your **Bets** and its alarm rings
   a set number of minutes before the start. Open or close Bets with **Bets** in the top bar, like
   History, PNL and Friends; it opens by itself when an alarm rings.
4. Click the player names on a bet to open its league's link (set in ⚙ Settings → **League Links**, Ladbrokes by default). In League Links you can also switch a league off (e.g. Czech Liga Pro): its bets are then hidden (yours, which also won't ring, friends' bets and bell messages) until you switch it back on. P/L and History always include every league. The first player's name is copied
   so you can paste it into the Ladbrokes search. Clicking the desktop notification when an alarm rings does the
   same (and stops the alarm). TT Cup, TT Elite Series and Czech Liga Pro link to their ladbrokes.com.au pages by
   default; change the links or turn the copying off in ⚙ Settings.
5. Add your own tags (e.g. "Strong", "Live bet") in ⚙ Settings → Tags, then click a bet to tag it. **SWEEP** is a built-in tag
   (purple by default; change its colour but it can't be deleted) for sweep bets: the PNL's Play types counts them as Sweep,
   and it and **Bot** are the only tags that come along when you copy a friend's bet, along with OVER/UNDER. Friends can see your other tags on your bets and in your History, but they stay yours and don't copy.
   Tags show next to OVER/UNDER. You can also create a new tag straight from a bet.
6. Bets are removed automatically a few hours after their match starts (3 by default). Change the number,
   or set 0 to keep them, in ⚙ Settings → Remove old bets.
7. When a match has started, its bet shows **Cash** and **Chalk**. Screenshots of matches that already started
   earlier today are added straight away as done, with Cash and Chalk ready. Cash asks for the decimal odds and units placed;
   Chalk records a loss with your last-used units. Set **Default odds** in ⚙ Settings and the Cash popup opens with them
   filled in (change them if needed, then Save). Or set **Average odds** and turn on its switch (off by default) and Cash records the win in one
   click too, at those odds with your last-used units (click the entry in History to change it). Placed more than one bet on the match? Press **+** to record each one
   in its own slot (odds, units, Cash / Chalk / Void where Void counts as 0, and its own play type: Over, Under, Sweep or **Overcommit**). On a Bot-tagged match, Sweep and Overcommit bets count as **Personal** P/L; its other bets count as Bot; the match's P/L is the total, and the PNL's Play types counts each bet under its own type. The match then moves to your history: press **History** in the top bar to slide it out (green = cash, red = chalk) with your total won or lost.
   Click a history entry to edit or delete it.
8. The tab at the top right of the chat shows today's combined P/L (matches starting today, reset to 0 at 12 AM); hover over it
   (or tap it on a phone) to split it into **Me** (your own plays) and **Bot** (bot picks). Next to it is
   the current time. In ⚙ Settings → P/L tracker you can hide either half, pick a 12- or 24-hour clock, show P/L in units or dollars (with your $ per unit), and set its **Size** (computers, 80–200%) and **Position**: left or right (beside any open panels).
9. Press **PNL** in the top bar for your profit & loss page. It slides out from the right
   (past Bets or History if they're open too, with the time | PNL tab always just left of the outermost panel)
   and shows today / this week / this month / all time / win rate / **ROI** (profit ÷ units staked, void bets not counted) /
   **last bet** (click it to jump to that day), with a **Calendar** (each day's P/L; click a day for its
   matches) or a **Graph** (running total over 7, 30, 90 days or all time). Switch between **All**, **Personal** and **Bot** at the top:
   under All, totals and calendar days are combined (hover over one to split it into Me and Bot); Personal and Bot show
   only those plays. The **Calendar / Graph** switch sits just above the calendar or graph.
   Under it, **Play types** shows bets, W–L, win rate, P/L and ROI for Over, Under, Sweep and Overcommit (Bot shows no Sweep or Overcommit: they're always Personal) (also split by All / Personal /
   Bot); click any types for a bigger breakdown, as many open as you like (P/L in units and $, ROI, win rate, record, units staked, pending bets, average
   odds). Opening a calendar day (or This month) hides Play types so that day's bets show in its place. Mark a bet as Sweep with the **SWEEP** tag (click the bet, or type `sweep` in a typed bet), or in the Cash / Chalk
   popup (**Play type**), which also fixes the type of a history entry. Click a day, or the **This month** box, to list those bets.
10. **Bot picks:** a screenshot whose match row has the yellow-tinted background (a bot pick) is tagged **Bot**
    automatically. If one is tagged wrong, open the bet and click the Bot tag to add or remove it.
    Sending a screenshot of a bet you already have redoes its tags from the new photo: Bot is added or removed to match,
    SWEEP is added if you write "sweep" with it, and your own tags stay.
11. In ⚙ Settings you can also add your own alarm sound (**Add sound…**, audio up to 1 MB, kept on this device)
    and set the background picture's **blur** and **saturation**. With a background picture, the main buttons (normally
    blue) take on its colour.
    **Top bar colour** (⚙ Settings) gives the bar across the top (and the time | PNL tab under it) its own colour and
    opacity, separate from the chat's; ↺ makes it follow the chat again. On phones it's always solid.
12. Don't want alarms? Turn off **Ring alarms** in ⚙ Settings → Alarms. Matches are still listed and still get
    Cash / Chalk, but nothing rings, notifies or vibrates (anything ringing at that moment is silenced).
13. **Friends** (top bar → Friends, signed-in only): create a profile with your own **@username** and **picture** (your
    Google name and picture are never shown). Add friends by @username or by sharing your invite link, and accept
    requests under Requests. Click a friend's @ to drop down **PNL · History · Bets · Block · Unfriend**: PNL and
    History open those panels with their numbers (units, odds and PNL), and Bets slides out their
    upcoming plays, filtered to **Not in mine / In both / All** (each with its count, and the total upcoming at the top), with **Copy** to add one to your bets (or **Copy all** under Not in mine). Click an item again to close its panel (the **Settings** button closes Settings the same way). Blocked
    people are listed under Blocked (click to Unblock) and can't send you requests.
    In your friends list, a dot shows where each friend is (hover it for the word): **green** = Online (on the site right now),
    **yellow** = Idle (the site is open in another tab or app), **grey** = Offline (a friend who closes the site turns grey within
    about 2 minutes). A new friend request puts a **blue dot** on Friends in the top bar (phones: on ☰) and on the Requests tab
    until you open Requests.
    The **🔔** in a friend's drop-down (pressed in = on) makes the chat tell you each time they place a bet, with the bet
    and a **Copy** button.
    Your bets show the pictures of friends who have the same bet (next to the start time). Once a friend records
    theirs, a **✓** (Cash) or **✕** (Chalk) appears above their picture, so you can see how it went before you press yours.
    Click the pictures to drop down the list of who is on the play, with how theirs went (and their side if it differs from yours).
    **Leaderboard** (top bar → Leaderboard) ranks you and your friends by units won or lost **today**, this **month** or
    this **year**, with each person's wins and losses. Click a friend to open their PNL. It updates live while it's
    open (and so do friends' PNL, History and Bets), so there's no need to refresh.
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

Keep the tab (or the app) open **on screen** for alarms to ring: phones pause web apps when the screen locks or you switch
apps. In ⚙ Settings → Alarms:
- **Notifications on this device** turns this device's notifications (including locked-phone alarms) on or off.
- **Allow notifications** turns notifications on (Android only asks when you tap something, so tap this once).
- **Test alarm** rings in 5 seconds so you can check sound, notification and vibration.
- **Keep the screen on while a bet is coming up** (on by default on phones) stops the phone pausing the app before an alarm.

**Alarms on a locked phone** need the small push service in [`push-worker/`](push-worker/README.md) (free Cloudflare
Worker). Once it's set up and its address is in `index.html` (`PUSH_SERVER`), alarms arrive as notifications even when
the phone is locked or the app is closed; Settings → Alarms shows **Locked-phone alarms: on**.
Signed in, stopping an alarm on one device (e.g. your PC) stops it on your others too, including a locked phone.

On computers, the **⏰ [5] min** box at the right of the top bar sets how many minutes before each match alarms ring
(the same as Settings → Alarms → Alert me); changing it moves your upcoming alarms.

Settings is grouped into **Account**, **Appearance** (colours, background, P/L tracker), **Alarms** (alarm switches,
lead time, sound), **Betting** (old-bet removal, average/default odds, tags, League Links), **Gemini** and **Help**.
**Clear all** (delete every bet) is in the Bets panel's header: press it twice to confirm.

**Updates:** the site checks for a newer version every few minutes (and when you come back to the tab) and reloads
itself once it's safe: nothing ringing, nothing typed or attached, no popup open. So nobody needs to refresh by hand.

## Where your data is kept
- **Chat:** the chat log is kept on this device for 3 days (older messages are removed). Screenshots you send are kept with it, downsized, in the browser's own storage (IndexedDB), and go with their messages. The 🗑 at the right of the text bar clears it: press it twice (or double-click).
- **Signed in with Google:** bets (with their screenshots), UI colour, top bar colour, sound, lead time, old-bet removal time, League Links (links and which leagues are on), tags, match history, P/L tracker options and Gemini settings
  (including your API key) are saved to your account in Firebase and stay in sync across your devices.
  Only you can read them. Some things stay on each device instead: the background picture (and its blur/saturation),
  the alarm switches (Ring alarms, Notifications on this device, Keep the screen on), whether the Bets panel is open, and
  any custom alarm sounds you add. Signing out removes your account data from that browser (it stays in your account);
  these device settings stay.
- **Friends:** your @username and picture can be seen by anyone signed in who looks you up by exact username.
  Your plays, results and stats (including odds, units and PNL) are visible only to accepted friends.
  Your private data (screenshots, settings, Gemini key) is never shared.
- **Without an account:** everything stays in that browser's local storage, separate for every device and browser.

Nothing is ever saved to this repository.
