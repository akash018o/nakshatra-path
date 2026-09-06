import KundaliWheel from "./KundaliWheel";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 text-center">
      <KundaliWheel className="pointer-events-none absolute left-1/2 top-1/2 h-[130vw] w-[130vw] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-70 md:h-[70vh] md:w-[70vh]" />
      <div className="relative z-10 max-w-2xl">
        <p className="mb-4 text-sm text-brass/80">Vedic astrology &amp; remedies</p>
        <h1 className="font-display text-4xl leading-tight text-parchment md:text-6xl">
          Your chart already has the answer.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-parchment/70">
          Kundali readings, remedies, and gemstone guidance — grounded in your actual
          birth chart, not a horoscope column.
        </p>
        <a
          href="#services"
          className="mt-8 inline-block border border-brass px-8 py-3 text-sm tracking-wide text-brass transition-colors hover:bg-brass hover:text-cosmos"
        >
          See services
        </a>
      </div>
    </section>
  );
}
