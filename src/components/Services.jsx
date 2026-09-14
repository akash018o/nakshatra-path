import { services } from "../data/services";
import Reveal from "./Reveal";
import altarScene from "../assets/altar-scene.webp";

export default function Services({ onBook }) {
  return (
    <section id="services" className="relative overflow-hidden px-6 py-24 md:px-12">
      {/* Faded altar-scene backdrop, built into the section rather than a
          separate banner — reinforces the tradition without competing with
          the card content on top of it */}
      <img src={altarScene} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-85" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(160deg, rgba(240,169,30,0.5) 0%, rgba(196,30,46,0.2) 100%)",
          mixBlendMode: "overlay",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(23,13,8,0.45) 0%, rgba(23,13,8,0.85) 100%)" }}
      />

      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-display text-3xl text-parchment drop-shadow-[0_2px_8px_rgba(23,13,8,1)] md:text-4xl">Services</h2>
          <p className="mt-3 max-w-md text-parchment/90 drop-shadow-[0_1px_4px_rgba(23,13,8,1)]">
            Choose what you need help with. Every request goes straight to the astrologer.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 60} className="h-full">
              <div className="card-lift group flex h-full flex-col justify-between border border-brass/20 panel-gradient p-6">
                <div>
                  <h3 className="font-display text-xl text-brassLight">{s.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wide text-dusk">{s.tagline}</p>
                  <p className="mt-4 text-sm text-parchment/70">{s.description}</p>
                </div>
                <button
                  onClick={() => onBook(s)}
                  className="mt-6 self-start border-b border-brass/50 text-sm text-brass transition-colors hover:border-brass hover:text-brassLight"
                >
                  Request this service
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
