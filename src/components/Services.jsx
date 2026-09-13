import { services } from "../data/services";
import Reveal from "./Reveal";

export default function Services({ onBook }) {
  return (
    <section id="services" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-display text-3xl text-parchment md:text-4xl">Services</h2>
          <p className="mt-3 max-w-md text-parchment/60">
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
