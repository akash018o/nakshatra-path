import { useEffect, useRef } from "react";
import zodiacVideo from "../assets/zodiac-wheel.mp4";
import zodiacPoster from "../assets/zodiac-wheel-poster.webp";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Warm ambient wash across the whole hero, so the wheel emerges from
          the same atmosphere instead of sitting on a differently-toned background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 35%, rgba(183,48,42,0.22) 0%, rgba(21,13,10,0) 65%), " +
            "radial-gradient(ellipse 70% 60% at 50% 35%, rgba(217,167,59,0.14) 0%, rgba(21,13,10,0) 60%)",
        }}
      />

      <div className="relative z-10 max-w-2xl">
        <p className="mb-4 text-sm text-brass/80">Vedic astrology &amp; remedies</p>

        {/* Wheel as a proper hero visual, faded into the page rather than a
            hard sticker — feathered mask + reduced opacity so it reads as
            part of the atmosphere, not a cutout pasted on top */}
        <div className="relative mx-auto -mt-2 mb-2 h-64 w-64 md:h-80 md:w-80">
          <video
            ref={videoRef}
            className="h-full w-full object-cover opacity-80"
            style={{
              maskImage: "radial-gradient(circle, black 40%, transparent 72%)",
              WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 72%)",
            }}
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

        <h1 className="mt-2 font-display text-4xl leading-tight text-parchment md:text-6xl">
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
    </section>
  );
}
