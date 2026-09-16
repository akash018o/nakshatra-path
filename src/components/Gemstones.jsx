import { useEffect, useState } from "react";
import { gemstones } from "../data/gemstones";
import { useLang } from "../i18n/LanguageContext";
import { fetchGemstoneImages } from "../lib/gemstoneImages";
import GemIcon from "./GemIcon";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";
import Ornament from "./Ornament";
import useParallax from "../hooks/useParallax";
import gemstoneCluster from "../assets/gemstone-cluster.webp";

export default function Gemstones({ onInquire }) {
  const [images, setImages] = useState({});
  const [bannerRef, bannerStyle] = useParallax(0.14);
  const { t } = useLang();

  useEffect(() => {
    fetchGemstoneImages().then(setImages).catch(() => {});
  }, []);

  return (
    <section id="gemstones" className="relative bg-surface">
      {/* Full-bleed banner with parallax drift */}
      <div className="relative h-[260px] w-full overflow-hidden md:h-[380px]">
        <div ref={bannerRef} className="absolute inset-0 -top-[12%] h-[124%]" style={bannerStyle}>
          <img
            src={gemstoneCluster}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, rgba(240,169,30,0.3) 0%, rgba(196,30,46,0.15) 100%)",
            mixBlendMode: "overlay",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(18,10,6,0.35) 0%, rgba(33,18,12,0.7) 55%, #21120C 100%)" }}
        />
      </div>

      <div className="px-6 pb-28 md:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="-mt-16 text-center">
            <p className="eyebrow text-saffronLight">{t.gemstones.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl text-parchment drop-shadow-[0_2px_10px_rgba(18,10,6,1)] md:text-5xl">
              {t.gemstones.heading}
            </h2>
            <Ornament className="my-6" />
            <p className="font-serif-accent mx-auto max-w-xl text-lg text-parchment/85">
              {t.gemstones.subtitle}
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {gemstones.map((g, i) => (
              <Reveal key={g.id} delay={i * 45} className="h-full">
                <TiltCard className="border border-brass/20 panel-gradient" max={11}>
                  <button
                    onClick={() => onInquire({ ...g, ...t.gemstones.items[g.id] })}
                    className="tilt-inner flex h-full w-full flex-col items-center p-5 text-center"
                  >
                    <div className="relative mb-4">
                      <div
                        className="absolute inset-[-28%] rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(240,169,30,0.3) 0%, rgba(240,169,30,0) 70%)" }}
                      />
                      {images[g.id] ? (
                        <img
                          src={images[g.id]}
                          alt={t.gemstones.items[g.id].name}
                          loading="lazy"
                          className="relative h-20 w-20 rounded-full border-2 border-brass/50 object-cover"
                        />
                      ) : (
                        <GemIcon stoneId={g.id} className="relative h-20 w-20" />
                      )}
                    </div>
                    <p className="font-display text-base leading-tight text-parchment">{t.gemstones.items[g.id].name}</p>
                    <p className="eyebrow mt-2 text-dusk">{t.gemstones.items[g.id].planet}</p>
                    <div className="gold-rule my-3 w-full opacity-50" />
                    <p className="text-xs leading-relaxed text-parchment/65">{t.gemstones.items[g.id].benefit}</p>
                  </button>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
