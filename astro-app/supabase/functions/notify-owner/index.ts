// Supabase Edge Function: notify-owner
// Sends a WhatsApp message to the OWNER's phone via the WhatsApp Cloud API
// whenever a new booking comes in. This is the "silent" path — the USER never
// sees WhatsApp open; only the owner receives a message.
//
// SETUP (do this once you have Meta Business verification approved):
// 1. Create a Meta App at developers.facebook.com, add the WhatsApp product.
// 2. Get: WHATSAPP_TOKEN (permanent access token), PHONE_NUMBER_ID (Meta's, for SENDING),
//    and set OWNER_PHONE to the number that should RECEIVE the message (with country code, no +).
// 3. Set these as secrets: supabase secrets set WHATSAPP_TOKEN=... PHONE_NUMBER_ID=... OWNER_PHONE=...
// 4. Deploy: supabase functions deploy notify-owner
//
// Until this is set up, calls to this function will fail — that's expected and
// handled gracefully in src/lib/bookings.js (the booking is still saved either way).

import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

const WHATSAPP_TOKEN = Deno.env.get("WHATSAPP_TOKEN");
const PHONE_NUMBER_ID = Deno.env.get("PHONE_NUMBER_ID");
const OWNER_PHONE = Deno.env.get("OWNER_PHONE");

serve(async (req) => {
  try {
    const booking = await req.json();

    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID || !OWNER_PHONE) {
      return new Response(JSON.stringify({ skipped: true, reason: "not configured yet" }), { status: 200 });
    }

    const text =
      `New request: ${booking.service}\n` +
      `Name: ${booking.name}\n` +
      `Phone: ${booking.phone}\n` +
      `DOB: ${booking.dob}${booking.timeOfBirth ? " " + booking.timeOfBirth : ""}\n` +
      `Place: ${booking.placeOfBirth || "-"}\n` +
      `Prefers: ${booking.contactPreference}\n` +
      (booking.notes ? `Notes: ${booking.notes}` : "");

    const res = await fetch(
      `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: OWNER_PHONE,
          type: "text",
          text: { body: text },
        }),
      }
    );

    const result = await res.json();
    return new Response(JSON.stringify(result), { status: res.status });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
