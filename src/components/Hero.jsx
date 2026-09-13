import zodiacWheel from "../assets/zodiac-wheel.webp";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6 text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2"
        style={{ width: "min(90vw, 560px)" }}
      >
        {/* Soft ambient glow behind the wheel — static, just breathes gently */}
        <div
          className="absolute inset-[-15%] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(200,155,60,0.25) 0%, rgba(200,155,60,0) 70%)",
            animation: "glow-pulse 8s ease-in-out infinite",
          }}
        />
        <img src={zodiacWheel} alt="" aria-hidden="true" className="relative h-full w-full object-contain opacity-70" />
      </div>

      {/* Radial vignette so the headline stays legible over the wheel */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(13,19,33,0.45) 0%, rgba(13,19,33,0.8) 55%, rgba(13,19,33,0.97) 100%)",
        }}
      />

      <style>{`
        @keyframes glow-pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
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
