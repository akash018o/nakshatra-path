import zodiacWheel from "../assets/zodiac-wheel.webp";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Ambient nebula wash behind everything, for depth instead of flat black */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(139,38,53,0.18) 0%, rgba(13,19,33,0) 60%), " +
            "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(200,155,60,0.10) 0%, rgba(13,19,33,0) 60%)",
        }}
      />

      <div className="relative z-10 max-w-2xl">
        <p className="mb-4 text-sm text-brass/80">Vedic astrology &amp; remedies</p>

        {/* Wheel sits as a compact glowing accent right behind the tagline only, not the whole hero */}
        <div className="relative mx-auto flex h-40 w-40 items-center justify-center md:h-52 md:w-52">
          <div
            className="absolute inset-[-25%] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(200,155,60,0.45) 0%, rgba(200,155,60,0) 70%)" }}
          />
          <img
            src={zodiacWheel}
            alt=""
            aria-hidden="true"
            className="relative h-full w-full object-contain drop-shadow-[0_0_25px_rgba(200,155,60,0.35)]"
            style={{ animation: "spin-slow 90s linear infinite" }}
          />
        </div>

        <h1 className="mt-6 font-display text-4xl leading-tight text-parchment md:text-6xl">
          Your chart already has the answer.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-parchment/70">
          Kundali readings, remedies, and gemstone guidance — grounded in your actual
          birth chart, not a horoscope column.
        </p>
        <a
          href="#services"
          className="mt-8 inline-block bg-gradient-to-r from-brass to-brassLight px-8 py-3 text-sm font-medium tracking-wide text-cosmos shadow-lg shadow-brass/20 transition-transform hover:scale-105"
        >
          See services
        </a>
      </div>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
      `}</style>
    </section>
  );
}
