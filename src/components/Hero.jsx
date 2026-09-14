import { useEffect, useRef } from "react";
import zodiacVideo from "../assets/zodiac-wheel.mp4";
import zodiacPoster from "../assets/zodiac-wheel-poster.webp";
import milkyway from "../assets/milkyway-silhouette.webp";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Full-bleed photo backdrop, clearly visible */}
      <img
        src={milkyway}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-75"
      />

      {/* Yellowish haldi/turmeric wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(160deg, rgba(240,169,30,0.5) 0%, rgba(196,30,46,0.25) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Solid-enough backing directly behind the text column — guarantees
          legibility regardless of what's happening in the photo behind it */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 65% at 50% 50%, rgba(23,13,8,0.72) 0%, rgba(23,13,8,0.25) 68%, rgba(23,13,8,0) 85%), " +
            "linear-gradient(180deg, rgba(23,13,8,0.25) 0%, rgba(23,13,8,0.6) 100%)",
        }}
      />

      <div className="relative z-10 max-w-2xl">
        <p className="mb-4 text-sm text-saffronLight drop-shadow-[0_1px_4px_rgba(23,13,8,1)]">
          Vedic astrology &amp; remedies
        </p>

        {/* Clean circular medallion — plain video, full opacity, gold ring
            border, soft glow. No blend modes or masks: those kept breaking
            in unpredictable ways, this is the reliable version. */}
        <div className="relative mx-auto -mt-2 mb-4 h-64 w-64 md:h-80 md:w-80">
          <div
            className="absolute inset-[-12%] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(240,169,30,0.5) 0%, rgba(240,169,30,0) 70%)" }}
          />
          <video
            ref={videoRef}
            className="relative h-full w-full rounded-full border-4 border-brass object-cover shadow-2xl shadow-black/60"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={zodiacPoster}
            aria-hidden="true"
          >
            <source src={zodiacVideo} type="video/mp4" />
          </video>
        </div>

        <h1 className="font-display text-4xl leading-tight text-parchment drop-shadow-[0_2px_12px_rgba(23,13,8,1)] md:text-6xl">
          Your chart already has the answer.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-parchment/90 drop-shadow-[0_1px_6px_rgba(23,13,8,1)]">
          Kundali readings, remedies, and gemstone guidance — grounded in your actual
          birth chart, not a horoscope column.
        </p>
        <a
          href="#services"
          className="mt-8 inline-block bg-gradient-to-r from-saffron via-brassLight to-saffron bg-[length:200%_auto] px-8 py-3 text-sm font-medium tracking-wide text-cosmos shadow-lg shadow-saffron/30 transition-all hover:scale-105 hover:bg-right"
        >
          See services
        </a>
      </div>
    </section>
  );
}
