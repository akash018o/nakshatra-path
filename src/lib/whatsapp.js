// User-initiated WhatsApp links. Opens WhatsApp addressed to the OWNER's
// number — used both on the Contact page and as a "send via WhatsApp"
// follow-up after a booking is saved, since the Cloud API's silent
// server-to-owner send needs Meta Business approval we're skipping for now.
//
// The number is no longer hardcoded here — callers pass it in from
// useSettings() (see SettingsContext), which the owner can edit from
// /admin. DEFAULT_SETTINGS in lib/settings.js is the fallback if that
// hasn't loaded yet.

export function buildWhatsAppLink(number, message = "Hi, I'd like to know more about your services.") {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export function buildBookingWhatsAppLink(number, booking) {
  const lines = [
    `New request: ${booking.service}`,
    `Name: ${booking.name}`,
    `Phone: ${booking.phone}`,
    `DOB: ${booking.dob}${booking.timeOfBirth ? " " + booking.timeOfBirth : ""}`,
    booking.placeOfBirth ? `Place: ${booking.placeOfBirth}` : null,
    `Prefers: ${booking.contactPreference}`,
    booking.notes ? `Notes: ${booking.notes}` : null,
  ].filter(Boolean);
  return buildWhatsAppLink(number, lines.join("\n"));
}
