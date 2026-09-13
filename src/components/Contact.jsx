import { buildWhatsAppLink } from "../lib/whatsapp";
import moonPhases from "../assets/moon-phases.webp";

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-24 text-center md:px-12">
      <img src={moonPhases} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(160deg, rgba(242,129,29,0.3) 0%, rgba(196,30,46,0.35) 100%)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(23,13,8,0.45) 0%, rgba(23,13,8,0.85) 100%)" }}
      />

      <div className="relative mx-auto max-w-md">
        <h2 className="font-display text-3xl text-parchment">Have a quick question?</h2>
        <p className="mt-3 text-parchment/60">
          For anything that doesn't need a full reading, message directly on WhatsApp.
        </p>
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block bg-gradient-to-r from-kumkum to-kumkumLight px-8 py-3 text-sm text-parchment shadow-lg shadow-kumkum/20 transition-transform hover:scale-105"
        >
          Chat on WhatsApp
        </a>
      </div>
    </section>
  );
}
