import { services } from "../data/services";
import Reveal from "./Reveal";
import ServiceIcon from "./ServiceIcon";
import TiltCard from "./TiltCard";
import Ornament from "./Ornament";
import useParallax from "../hooks/useParallax";
import altarScene from "../assets/altar-scene.webp";

export default function Services({ onBook }) {
  const [bgRef, bgStyle] = useParallax(0.1);

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
          <p className="eyebrow text-saffronLight">What we offer</p>
          <h2 className="mt-3 font-display text-4xl text-parchment drop-shadow-[0_2px_10px_rgba(18,10,6,1)] md:text-5xl">
            Services
          </h2>
          <Ornament className="my-6" />
          <p className="font-serif-accent mx-auto max-w-xl text-lg text-parchment/85 drop-shadow-[0_1px_4px_rgba(18,10,6,1)]">
            Choose what you need help with. Every request goes straight to the astrologer.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 70} className="h-full">
              <TiltCard className="border border-brass/25 panel-gradient p-7">
                <div className="tilt-inner flex h-full flex-col justify-between">
                  <div>
                    <ServiceIcon serviceId={s.id} className="mb-5 h-16 w-16" />
                    <h3 className="font-display text-xl text-brassLight">{s.name}</h3>
                    <p className="eyebrow mt-2 text-dusk">{s.tagline}</p>
                    <div className="gold-rule my-4 opacity-60" />
                    <p className="text-sm leading-relaxed text-parchment/75">{s.description}</p>
                  </div>
                  <button
                    onClick={() => onBook(s)}
                    className="group mt-7 inline-flex items-center gap-2 self-start text-sm text-brass transition-colors hover:text-brassLight"
                  >
                    Request this service
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
