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

## Setting up Google sign-in (site owner, one time, free)
Until this is done, the welcome page shows the Google button as unavailable and everyone uses the site without an account.

1. Go to https://console.firebase.google.com, choose **Create a project**, and give it a name. You can turn Google Analytics off.
2. In the left sidebar open **Authentication** (under *Project shortcuts* or **Security**) and click **Get started** if shown.
   Open the **Sign-in method** tab, click **Google**, turn on **Enable**, pick a support email, and **Save**.
   Ignore anything about SHA-1 keys or config files. Those are only for Android apps.
3. **Authentication → Settings → Authorized domains → Add domain**: add your site's domain, e.g. `straffd.github.io`.
4. Open **Firestore** in the left sidebar (under *Project shortcuts* or **Databases & Storage**) and click **Create database**. Choose a location near you, and start in **production mode**.
5. In **Firestore → Rules**, replace everything with the contents of [`firestore.rules`](firestore.rules) and **Publish**.
   These rules let each person read and write only their own data.
6. In the left sidebar click **Settings** (⚙, just below Project Overview) → **Project settings**, then under **Your apps** click **Web (`</>`)**. Register an app (no hosting needed) and copy the `firebaseConfig` object.
7. In `index.html`, find `const FIREBASE_CONFIG = null;` and replace `null` with the copied object, e.g.
   ```js
   const FIREBASE_CONFIG = { apiKey:'AIza…', authDomain:'your-app.firebaseapp.com', projectId:'your-app', appId:'1:…' };
   ```
   These values are meant to be public. The Firestore rules are what keep data private.
8. Commit and publish the site.

The free Spark plan is plenty for this app (1 GiB stored, 50,000 reads and 20,000 writes per day).
