import { useEffect, useState } from "react";
import { gemstones } from "../data/gemstones";
import { fetchGemstoneImages } from "../lib/gemstoneImages";
import GemIcon from "./GemIcon";
import gemstoneCluster from "../assets/gemstone-cluster.webp";

export default function Gemstones({ onInquire }) {
  const [images, setImages] = useState({});

  useEffect(() => {
    fetchGemstoneImages().then(setImages).catch(() => {});
  }, []);

  return (
    <section id="gemstones" className="bg-surface">
      {/* Full-bleed banner photo, gently breathing, fading into the section below */}
      <div className="relative h-[220px] w-full overflow-hidden md:h-[320px]">
        <img
          src={gemstoneCluster}
          alt="A collection of faceted gemstones"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ animation: "gem-breathe 18s ease-in-out infinite" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(27,35,51,0.15) 0%, #1B2333 100%)" }}
        />
        <style>{`
          @keyframes gem-breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.08); }
          }
        `}</style>
      </div>

      <div className="px-6 pb-24 pt-4 md:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-3xl text-parchment md:text-4xl">Gemstones</h2>
          <p className="mt-3 max-w-md text-parchment/60">
            Recommended only after checking your chart. Prices depend on quality and carat.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {gemstones.map((g) => (
              <button
                key={g.id}
                onClick={() => onInquire(g)}
                className="card-lift group flex flex-col items-start border border-brass/15 panel-gradient p-4 text-left"
              >
                {images[g.id] ? (
                  <img
                    src={images[g.id]}
                    alt={g.name}
                    className="mb-3 h-16 w-16 rounded-full border border-brass/40 object-cover"
                  />
                ) : (
                  <GemIcon stoneId={g.id} className="mb-3 h-14 w-14" />
                )}
                <p className="font-display text-base text-parchment">{g.name}</p>
                <p className="mt-1 text-xs text-dusk">{g.planet}</p>
                <p className="mt-2 text-xs text-parchment/60">{g.benefit}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
