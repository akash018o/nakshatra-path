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
      {/* Full-bleed photo backdrop, clearly visible like a poster rather
          than a faint hint */}
      <img
        src={milkyway}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      {/* Saffron/red color grade — overlay blend (not multiply) so it
          vividly warms the photo without just muddying it darker */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(160deg, rgba(242,129,29,0.5) 0%, rgba(196,30,46,0.4) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Text-contrast vignette, kept light so the photo still reads clearly */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(23,13,8,0.5) 0%, rgba(23,13,8,0.05) 70%), " +
            "linear-gradient(180deg, rgba(23,13,8,0.1) 0%, rgba(23,13,8,0.5) 100%)",
        }}
      />

      <div className="relative z-10 max-w-2xl">
        <p className="mb-4 text-sm text-saffronLight drop-shadow-[0_1px_4px_rgba(23,13,8,0.9)]">
          Vedic astrology &amp; remedies
        </p>

        {/* Wheel video, sized reasonably (not stretched to fill the whole
            hero) so it stays crisp at its native resolution, screen-blended
            so its dark backdrop still merges with the photo behind it */}
        <div className="relative mx-auto -mt-2 mb-2 h-56 w-56 md:h-72 md:w-72">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            style={{ mixBlendMode: "screen" }}
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

        <h1 className="font-display text-4xl leading-tight text-parchment drop-shadow-[0_2px_12px_rgba(23,13,8,0.9)] md:text-6xl">
          Your chart already has the answer.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-parchment/90 drop-shadow-[0_1px_6px_rgba(23,13,8,0.9)]">
          Kundali readings, remedies, and gemstone guidance — grounded in your actual
          birth chart, not a horoscope column.
        </p>
        <a
          href="#services"
          className="mt-8 inline-block bg-gradient-to-r from-saffron via-kumkum to-saffron bg-[length:200%_auto] px-8 py-3 text-sm font-medium tracking-wide text-parchment shadow-lg shadow-kumkum/30 transition-all hover:scale-105 hover:bg-right"
        >
          See services
        </a>
      </div>
    </section>
  );
}
