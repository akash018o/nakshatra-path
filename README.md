# Nakshatra Path — Astrology Services Site

## Run locally
```
npm install
npm run dev
```

## Before going live
1. Create a Supabase project → run `supabase/schema.sql` in the SQL editor
   (safe to re-run even if some tables already exist).
2. Copy `.env.example` to `.env` and fill in your Supabase URL + anon key.
   **Also set these same two values in Cloudflare Pages → Settings → Environment
   variables** for production — a local `.env` alone won't apply to the deployed site.
   Double-check there are no extra quotes/spaces around the values; a malformed
   URL used to crash the whole site, though that's now handled gracefully.
3. **Create your admin login**: Supabase Dashboard → Authentication → Users →
   "Add user" → enter your email + a password, and make sure "Auto Confirm
   User" is checked so you don't need an email verification step. This is the
   ONLY way to get admin access — there's no public sign-up form anywhere on
   the site, on purpose (so a stranger can't create an account and read your
   customers' names/phones/birth details).
4. Log into `/admin` with that email + password.
5. Replace `OWNER_WHATSAPP_NUMBER` in `src/lib/whatsapp.js` with the real number
   (country code, digits only, e.g. 91XXXXXXXXXX).
6. Upload real gemstone photos from `/admin` → Gemstone photos tab — no code
   changes needed, they replace the icons on the live site immediately.
7. Update service copy in `src/data/services.js` if the client wants changes.

## Admin panel (`/admin`)
- **Bookings**: every service request, searchable by name/phone, filterable
  by service, status dropdown (new/contacted/closed), CSV export, delete.
- **Reviews**: pending reviews awaiting approval — only approved reviews show
  on the public site. Delete spam/fake ones.
- **Gemstone photos**: upload a real photo per stone, replacing the built-in
  icon everywhere on the site.

## Deploy
Cloudflare Pages: build command `npm run build`, output directory `dist`,
root directory blank (unless your repo is nested — it shouldn't be).
