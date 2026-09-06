import { gemstones } from "../data/gemstones";
import GemIcon from "./GemIcon";

export default function Gemstones({ onInquire }) {
  return (
    <section id="gemstones" className="bg-surface px-6 py-24 md:px-12">
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
              className="group flex flex-col items-start border border-brass/15 p-4 text-left transition-colors hover:border-brass/50"
            >
              {g.image ? (
                <img
                  src={g.image}
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
    </section>
  );
}
