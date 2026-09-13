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
      {/* Full-bleed photo backdrop — fills the entire section, no contained
          shape, so there's nothing with an "edge" to look like a sticker */}
      <img
        src={milkyway}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      {/* The wheel video, also full-bleed, screen-blended so its own dark
          backdrop merges into the photo behind it — only the bright gold
          wheel and sparkle highlights actually show through */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
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

      {/* Saffron/red tint over the photo — warms it toward bhagwa rather
          than just dimming it, using multiply so the photo's own detail
          and brightness still comes through */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(160deg, rgba(242,129,29,0.45) 0%, rgba(196,30,46,0.35) 100%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Light vignette, only for text contrast — not a blanket dark wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(23,13,8,0.55) 0%, rgba(23,13,8,0) 70%), " +
            "linear-gradient(180deg, rgba(23,13,8,0.15) 0%, rgba(23,13,8,0.55) 100%)",
        }}
      />

      <div className="relative z-10 max-w-2xl">
        <p className="mb-4 text-sm text-saffronLight">Vedic astrology &amp; remedies</p>
        <h1 className="font-display text-4xl leading-tight text-parchment drop-shadow-[0_2px_12px_rgba(23,13,8,0.8)] md:text-6xl">
          Your chart already has the answer.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-parchment/90 drop-shadow-[0_1px_6px_rgba(23,13,8,0.8)]">
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
