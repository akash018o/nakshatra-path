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
      {/* Bold saffron/red/gold temple-fire wash — the actual bhagwa palette,
          not a hint of it */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 40%, rgba(242,129,29,0.35) 0%, rgba(23,13,8,0) 68%), " +
            "radial-gradient(ellipse 80% 65% at 50% 40%, rgba(196,30,46,0.28) 0%, rgba(23,13,8,0) 62%), " +
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(227,167,48,0.25) 0%, rgba(23,13,8,0) 55%)",
        }}
      />

      <div className="relative z-10 max-w-2xl">
        <p className="mb-4 text-sm text-saffronLight">Vedic astrology &amp; remedies</p>

        {/* Video blended with mix-blend-mode instead of a hard mask/crop —
            this makes the video's own dark backdrop merge with the page
            background by luminance (black areas vanish, bright gold/gem
            highlights glow through), so there's no visible edge at all */}
        <div className="relative mx-auto -mt-2 mb-2 h-64 w-64 md:h-80 md:w-80">
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

        <h1 className="mt-2 font-display text-4xl leading-tight text-parchment md:text-6xl">
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
