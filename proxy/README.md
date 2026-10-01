# TT Alarm Bot proxy

A small Cloudflare Worker that calls Gemini with **your** API key, so people using the site don't need their own.
The key is stored as an encrypted Worker secret. It never appears in this repo or in the page.

## Deploy (free Cloudflare account, ~5 minutes)

1. Install Node.js, then run these from this `proxy/` folder:
   ```sh
   npx wrangler login
   npx wrangler secret put GEMINI_API_KEY     # paste your key from https://aistudio.google.com/apikey
   ```
2. In `wrangler.toml`, set `ALLOWED_ORIGINS` to the address your site is served from, with no trailing slash,
   e.g. `"https://straffd.github.io"`.
3. Deploy:
   ```sh
   npx wrangler deploy
   ```
   It prints a URL like `https://tt-alarm-proxy.<you>.workers.dev`.
4. In `../index.html`, set `const PROXY_URL = 'https://tt-alarm-proxy.<you>.workers.dev';`, then commit and publish the site.

The page now uses **Built-in (no key needed)** by default. People can still pick their own Gemini/OpenRouter key in AI settings.

## Limits and abuse protection
- Only requests from `ALLOWED_ORIGINS` are accepted. This stops other websites from using your proxy,
  but someone running a script can fake the origin, so the rate limit is the real protection.
- Each visitor IP gets 10 requests per minute (`[[ratelimits]]` in `wrangler.toml`).
- Everyone shares your key's free Gemini quota. When it runs out, users see a message suggesting they add their own key.
- The model is fixed by `GEMINI_MODEL`, so visitors can't switch to a costlier model.
- To see usage or errors, run `npx wrangler tail` or open the Worker in the Cloudflare dashboard.
