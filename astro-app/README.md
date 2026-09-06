# Nakshatra Path — Astrology Services Site

## Run locally
```
npm install
npm run dev
```

## Before going live
1. Create a Supabase project → run `supabase/schema.sql` in the SQL editor.
2. Copy `.env.example` to `.env` and fill in your Supabase URL + anon key.
3. Replace `OWNER_WHATSAPP_NUMBER` in `src/lib/whatsapp.js` with the real number
   (country code, digits only, e.g. 91XXXXXXXXXX) — this is for the Contact page only.
4. Lock down `/admin` — right now anyone who knows the URL can see it if they're
   logged in as `authenticated`. Add Supabase Auth (email/password login) before
   launch, or at minimum a simple password gate.
5. For the silent WhatsApp-to-owner notification on bookings (no redirect, no
   click), follow the setup comment at the top of
   `supabase/functions/notify-owner/index.ts`. Needs Meta Business verification —
   until that's approved, bookings still save fine, the owner just checks /admin.
6. Replace gemstone images (`src/data/gemstones.js` — currently placeholders)
   and update service copy in `src/data/services.js` if the client wants changes.

## Deploy
Cloudflare Pages: build command `npm run build`, output directory `dist`.
