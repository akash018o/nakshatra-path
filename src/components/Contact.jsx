import { buildWhatsAppLink } from "../lib/whatsapp";

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24 text-center md:px-12">
      <div className="mx-auto max-w-md">
        <h2 className="font-display text-3xl text-parchment">Have a quick question?</h2>
        <p className="mt-3 text-parchment/60">
          For anything that doesn't need a full reading, message directly on WhatsApp.
        </p>
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block bg-kumkum px-8 py-3 text-sm text-parchment transition-colors hover:bg-kumkumLight"
        >
          Chat on WhatsApp
        </a>
      </div>
    </section>
  );
}
