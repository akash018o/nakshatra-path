import zodiacWheel from "../assets/zodiac-wheel.webp";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[140vw] w-[140vw] max-w-none -translate-x-1/2 -translate-y-1/2 md:h-[85vh] md:w-[85vh]">
        <img
          src={zodiacWheel}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain opacity-60"
          style={{ animation: "spin-slow 240s linear infinite" }}
        />
      </div>

      {/* Radial vignette so the headline stays legible over the wheel */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(13,19,33,0.35) 0%, rgba(13,19,33,0.75) 55%, rgba(13,19,33,0.95) 100%)",
        }}
      />

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { img { animation: none !important; } }
      `}</style>

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
