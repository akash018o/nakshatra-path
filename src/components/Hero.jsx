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
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />

      {/* The wheel video, also full-bleed, screen-blended so its own dark
          backdrop merges into the photo behind it — only the bright gold
          wheel and sparkle highlights actually show through */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-90"
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

      {/* Bhagwa wash tying the photo + video together, and a dark vignette
          so the headline stays legible over all of it */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 45%, rgba(242,129,29,0.32) 0%, rgba(23,13,8,0.55) 55%, rgba(23,13,8,0.92) 100%), " +
            "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(196,30,46,0.22) 0%, rgba(23,13,8,0) 60%)",
        }}
      />

      <div className="relative z-10 max-w-2xl">
        <p className="mb-4 text-sm text-saffronLight">Vedic astrology &amp; remedies</p>
        <h1 className="font-display text-4xl leading-tight text-parchment md:text-6xl">
          Your chart already has the answer.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-parchment/70">
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
