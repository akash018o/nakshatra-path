// User-initiated WhatsApp link — used on the Contact page only.
// This opens WhatsApp on the USER's own device, addressed to the owner's number.
const OWNER_WHATSAPP_NUMBER = "91XXXXXXXXXX"; // TODO: replace with real number, country code, no + or spaces

export function buildWhatsAppLink(message = "Hi, I'd like to know more about your services.") {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encoded}`;
}
