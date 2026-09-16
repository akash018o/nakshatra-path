import { buildWhatsAppLink } from "../lib/whatsapp";
import { useLang } from "../i18n/LanguageContext";
import Reveal from "./Reveal";
import Ornament from "./Ornament";
import useParallax from "../hooks/useParallax";
import moonPhases from "../assets/moon-phases.webp";

export default function Contact() {
  const [bgRef, bgStyle] = useParallax(0.12);
  const { t } = useLang();

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28 text-center md:px-12">
      <div ref={bgRef} className="absolute inset-0 -top-[8%] h-[116%]" style={bgStyle}>
        <img
          src={moonPhases}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover opacity-[0.8]"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(160deg, rgba(240,169,30,0.38) 0%, rgba(196,30,46,0.22) 100%)",
          mixBlendMode: "overlay",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(18,10,6,0.82) 0%, rgba(18,10,6,0.55) 70%, rgba(18,10,6,0.92) 100%)" }}
      />

      <Reveal className="relative mx-auto max-w-lg">
        <p className="eyebrow text-saffronLight">{t.contact.eyebrow}</p>
        <h2 className="mt-3 font-display text-4xl text-parchment drop-shadow-[0_2px_10px_rgba(18,10,6,1)] md:text-5xl">
          {t.contact.heading}
        </h2>
        <Ornament className="my-6" />
        <p className="font-serif-accent text-lg text-parchment/85 drop-shadow-[0_1px_4px_rgba(18,10,6,1)]">
          {t.contact.subtitle}
        </p>
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-press btn-shimmer mt-9 inline-block bg-gradient-to-r from-saffron via-brassLight to-saffron px-9 py-3.5 text-sm font-medium tracking-wide text-cosmos shadow-[0_10px_30px_-8px_rgba(240,169,30,0.6)] transition-transform hover:scale-[1.04]"
        >
          {t.contact.cta}
        </a>
      </Reveal>
    </section>
  );
}
