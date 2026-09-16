import { services } from "../data/services";
import { useLang } from "../i18n/LanguageContext";
import Reveal from "./Reveal";
import ServiceIcon from "./ServiceIcon";
import TiltCard from "./TiltCard";
import Ornament from "./Ornament";
import useParallax from "../hooks/useParallax";
import altarScene from "../assets/altar-scene.webp";

export default function Services({ onBook }) {
  const [bgRef, bgStyle] = useParallax(0.1);
  const { t } = useLang();

  return (
    <section id="services" className="relative overflow-hidden px-6 py-28 md:px-12">
      <div ref={bgRef} className="absolute inset-0 -top-[8%] h-[116%]" style={bgStyle}>
        <img
          src={altarScene}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover opacity-[0.78]"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(160deg, rgba(240,169,30,0.46) 0%, rgba(196,30,46,0.18) 100%)",
          mixBlendMode: "overlay",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(18,10,6,0.9) 0%, rgba(18,10,6,0.5) 40%, rgba(18,10,6,0.93) 100%)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="eyebrow text-saffronLight">{t.services.eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl text-parchment drop-shadow-[0_2px_10px_rgba(18,10,6,1)] md:text-5xl">
            {t.services.heading}
          </h2>
          <Ornament className="my-6" />
          <p className="font-serif-accent mx-auto max-w-xl text-lg text-parchment/85 drop-shadow-[0_1px_4px_rgba(18,10,6,1)]">
            {t.services.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 70} className="h-full">
              <TiltCard className="border border-brass/25 panel-gradient p-7">
                <div className="tilt-inner flex h-full flex-col justify-between">
                  <div>
                    <ServiceIcon serviceId={s.id} className="mb-5 h-16 w-16" />
                    <h3 className="font-display text-xl text-brassLight">{t.services.items[s.id].name}</h3>
                    <p className="eyebrow mt-2 text-dusk">{t.services.items[s.id].tagline}</p>
                    <div className="gold-rule my-4 opacity-60" />
                    <p className="text-sm leading-relaxed text-parchment/75">{t.services.items[s.id].description}</p>
                  </div>
                  <button
                    onClick={() =>
                      onBook({
                        ...s,
                        // Shown to the user in their language...
                        name: t.services.items[s.id].name,
                        tagline: t.services.items[s.id].tagline,
                        // ...but always stored in English, so the admin panel
                        // groups every booking for a service together instead
                        // of splitting it by the visitor's language.
                        storageName: s.name,
                      })
                    }
                    className="group mt-7 inline-flex items-center gap-2 self-start text-sm text-brass transition-colors hover:text-brassLight"
                  >
                    {t.services.cta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
