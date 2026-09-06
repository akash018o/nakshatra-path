import { services } from "../data/services";
import NakshatraWheel from "./NakshatraWheel";

export default function Services({ onBook }) {
  return (
    <section id="services" className="relative overflow-hidden px-6 py-24 md:px-12">
      <NakshatraWheel className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] opacity-40 md:-right-20 md:-top-20" />
      <div className="relative mx-auto max-w-5xl">
        <h2 className="font-display text-3xl text-parchment md:text-4xl">Services</h2>
        <p className="mt-3 max-w-md text-parchment/60">
          Choose what you need help with. Every request goes straight to the astrologer.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden border border-brass/20 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.id}
              className="group flex flex-col justify-between bg-surface p-6 transition-colors hover:bg-surface2"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}
