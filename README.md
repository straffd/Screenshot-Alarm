# TT Alarm Bot

Send a screenshot of a table tennis match and get an alarm a set number of minutes before it starts.
Screenshots are read by Google Gemini (free tier).

## Use it
Open the site and paste (Ctrl+V), drop, or attach a match screenshot. No API key is needed:
the site goes through a small proxy (see [`proxy/`](proxy/README.md)) that holds the owner's key.

To use your own key instead, click **AI settings**, choose Google Gemini or OpenRouter, and paste a free key.

Alarms, screenshots and any key you enter are stored only in your own browser (localStorage).
They are never saved to this repository. Screenshots you send are passed to Gemini through the proxy to be read. Keep the tab open for alarms to ring.
