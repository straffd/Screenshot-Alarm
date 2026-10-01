# TT Alarm Bot

Send a screenshot of a table tennis match and get an alarm a set number of minutes before it starts.
Screenshots are read by Google Gemini (free tier).

## Use it
1. Open the site. On the welcome page, **Sign in with Google** to keep everything on every device,
   or choose **Continue without an account** to keep everything on this device only.
2. Click the ⚙ button (top left) → **Gemini settings** and paste your free Gemini API key from https://aistudio.google.com/apikey.
3. Paste (Ctrl+V), drop, or attach a match screenshot and press Enter.

Keep the tab open for alarms to ring.

## Where your data is kept
- **Signed in with Google:** alarms (with their screenshots), background, UI colour, sound, lead time and Gemini settings
  (including your API key) are saved to your account in Firebase and stay in sync across your devices.
  Only you can read them. Whether the top bar and alarm list are open stays per device.
  Signing out removes your data from that browser. It stays in your account.
- **Without an account:** everything stays in that browser's local storage, separate for every device and browser.

Nothing is ever saved to this repository.
