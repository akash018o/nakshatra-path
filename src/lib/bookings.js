import { supabase } from "./supabase";

// Submits a booking/query request.
// 1. Always saves to the `bookings` table so nothing is lost, and the admin page can show it.
// 2. Also calls a Supabase Edge Function ("notify-owner") which pushes a WhatsApp
//    message to the OWNER's phone via the WhatsApp Cloud API — silent on the user's side,
//    no redirect, no popup. Until that Edge Function + Meta Business approval is live,
//    step 2 just fails silently and the owner checks the admin page / gets an email instead.
export async function submitBooking(booking) {
  const { error } = await supabase.from("bookings").insert([
    {
      service: booking.service,
      name: booking.name,
      phone: booking.phone,
      dob: booking.dob,
      time_of_birth: booking.timeOfBirth || null,
      place_of_birth: booking.placeOfBirth || null,
      contact_preference: booking.contactPreference, // "call" | "chat" | "report_only"
      notes: booking.notes || null,
      status: "new",
    },
  ]);
  // No .select() here on purpose: the public/anon role can INSERT a booking
  // but can't SELECT it back (bookings are only readable by the logged-in
  // admin) — chaining .select() after insert requires read permission too,
  // which was silently failing every submission.

  if (error) throw error;

  // Best-effort owner notification via WhatsApp Cloud API. Never blocks the user's
  // success message if this fails (e.g. before Meta approval comes through).
  try {
    await supabase.functions.invoke("notify-owner", { body: booking });
  } catch (_) {
    // Silently ignored — booking is already saved above.
  }
}
