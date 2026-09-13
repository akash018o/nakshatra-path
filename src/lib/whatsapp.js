// User-initiated WhatsApp links. Opens WhatsApp addressed to the OWNER's
// number — used both on the Contact page and as a "send via WhatsApp"
// follow-up after a booking is saved, since the Cloud API's silent
// server-to-owner send needs Meta Business approval we're skipping for now.
const OWNER_WHATSAPP_NUMBER = "91XXXXXXXXXX"; // TODO: confirm this is the real number, country code, no + or spaces

export function buildWhatsAppLink(message = "Hi, I'd like to know more about your services.") {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encoded}`;
}

export function buildBookingWhatsAppLink(booking) {
  const lines = [
    `New request: ${booking.service}`,
    `Name: ${booking.name}`,
    `Phone: ${booking.phone}`,
    `DOB: ${booking.dob}${booking.timeOfBirth ? " " + booking.timeOfBirth : ""}`,
    booking.placeOfBirth ? `Place: ${booking.placeOfBirth}` : null,
    `Prefers: ${booking.contactPreference}`,
    booking.notes ? `Notes: ${booking.notes}` : null,
  ].filter(Boolean);
  return buildWhatsAppLink(lines.join("\n"));
}
