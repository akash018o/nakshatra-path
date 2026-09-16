import { useEffect, useRef, useState } from "react";
import { prefersReduced } from "../lib/media";
import { useLang } from "../i18n/LanguageContext";
import zodiacVideo from "../assets/zodiac-wheel.mp4";
import zodiacPoster from "../assets/zodiac-wheel-poster.webp";
import milkyway from "../assets/milkyway-silhouette.webp";
import useParallax from "../hooks/useParallax";
import Ornament from "./Ornament";
import Embers from "./Embers";

/** Splits a line into words that animate in one after another. */
function WordReveal({ text, className = "", baseDelay = 0 }) {
  return (
    <span className={`word-reveal ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} style={{ animationDelay: `${baseDelay + i * 90}ms` }}>
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const videoRef = useRef(null);
  const [bgRef, bgStyle] = useParallax(0.12);
  const { t, lang } = useLang();
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    if (prefersReduced()) return;
    const start = () => setLoadVideo(true);
    const defer = () =>
      (window.requestIdleCallback || window.setTimeout)(start, { timeout: 1200 });
    if (document.readyState === "complete") defer();
    else window.addEventListener("load", defer, { once: true });
  }, []);

  useEffect(() => {
    if (!loadVideo || !videoRef.current) return;
    const el = videoRef.current;
    try {
      el.load();
      const played = el.play();
      if (played && typeof played.catch === "function") played.catch(() => {});
    } catch {
      /* poster remains as the fallback */
    }
  }, [loadVideo]);

  return (
    <section className="relative flex min-h-[94vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div ref={bgRef} className="absolute inset-0 -top-[10%] h-[120%]" style={bgStyle}>
        <img
          src={milkyway}
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          className="h-full w-full object-cover opacity-[0.72]"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(155deg, rgba(240,169,30,0.46) 0%, rgba(196,30,46,0.22) 60%, rgba(18,10,6,0) 100%)",
          mixBlendMode: "overlay",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 58% 68% at 50% 52%, rgba(18,10,6,0.78) 0%, rgba(18,10,6,0.3) 66%, rgba(18,10,6,0) 86%), " +
            "linear-gradient(180deg, rgba(18,10,6,0.55) 0%, rgba(18,10,6,0.1) 28%, rgba(18,10,6,0.9) 100%)",
        }}
      />

      <Embers count={16} />

      <div className="relative z-10 flex max-w-2xl flex-col items-center">
        <p className="eyebrow mb-6 text-saffronLight drop-shadow-[0_1px_4px_rgba(18,10,6,1)]">
          {t.hero.eyebrow}
        </p>

        <div className="relative mx-auto mb-8 h-64 w-64 md:h-80 md:w-80">
          {/* Rotating conic halo — light sweeping around the medallion */}
          <div className="halo-ring absolute inset-[-9%] rounded-full opacity-70" />
          <div
            className="absolute inset-[-16%] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(240,169,30,0.45) 0%, rgba(240,169,30,0) 68%)",
              animation: "float-slow 9s ease-in-out infinite",
            }}
          />
          <div className="absolute inset-[-3%] rounded-full border border-brass/40" />
          <video
            ref={videoRef}
            className="relative h-full w-full rounded-full border-[3px] border-brass object-cover shadow-[0_18px_50px_-12px_rgba(0,0,0,0.85)]"
            autoPlay loop muted playsInline preload="none"
            poster={zodiacPoster}
            aria-hidden="true"
          >
            {loadVideo && <source src={zodiacVideo} type="video/mp4" />}
          </video>
        </div>

        {/* key on lang so the reveal replays when the language changes */}
        <h1
          key={lang}
          className="font-display text-[2.6rem] leading-[1.08] text-parchment drop-shadow-[0_2px_14px_rgba(18,10,6,1)] md:text-[4.2rem]"
        >
          <WordReveal text={t.hero.titleLine1} />
          <span className="block bg-gradient-to-r from-brassLight via-saffron to-brassLight bg-clip-text text-transparent">
            <WordReveal text={t.hero.titleLine2} baseDelay={260} />
          </span>
        </h1>

        <Ornament className="my-7 w-full" />

        <p className="font-serif-accent mx-auto max-w-lg text-lg leading-relaxed text-parchment/85 drop-shadow-[0_1px_6px_rgba(18,10,6,1)] md:text-xl">
          {t.hero.subtitle}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#services"
            className="btn-press btn-shimmer inline-block bg-gradient-to-r from-saffron via-brassLight to-saffron px-9 py-3.5 text-sm font-medium tracking-wide text-cosmos shadow-[0_10px_30px_-8px_rgba(240,169,30,0.6)]"
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#contact"
            className="btn-press inline-block border border-brass/50 px-9 py-3.5 text-sm tracking-wide text-brassLight backdrop-blur-sm hover:border-brass hover:bg-brass/10"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
