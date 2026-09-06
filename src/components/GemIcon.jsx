// Hand-built faceted gem-cut SVG icons — one shape+color per stone.
// No stock photos, no AI-render look. Swap for a real photo later by
// setting `image` on the gemstone in src/data/gemstones.js.
const FACET_PATH =
  "M50 4 L82 26 L94 58 L74 92 L26 92 L6 58 L18 26 Z " +
  "M50 4 L50 40 M82 26 L50 40 M94 58 L50 40 L74 92 M18 26 L50 40 L26 92 M6 58 L50 40";

const COLORS = {
  ruby: { fill: "#8B2635", light: "#C64F5E" },
  pearl: { fill: "#EDE6D6", light: "#FFFFFF" },
  coral: { fill: "#C1442A", light: "#E56B45" },
  emerald: { fill: "#1E5A45", light: "#3E9B78" },
  "yellow-sapphire": { fill: "#C89B3C", light: "#EAC96B" },
  diamond: { fill: "#D8DEE6", light: "#FFFFFF" },
  "blue-sapphire": { fill: "#1E3A5F", light: "#3E6EA5" },
  hessonite: { fill: "#A6631B", light: "#D68F3F" },
  "cats-eye": { fill: "#5C6B3A", light: "#8FA35C" },
};

export default function GemIcon({ stoneId, className = "" }) {
  const c = COLORS[stoneId] || { fill: "#C89B3C", light: "#DDBD6E" };
  return (
    <svg viewBox="0 0 100 96" className={className} aria-hidden="true">
      <path d={FACET_PATH.split(" M")[0] + "Z"} fill={c.fill} stroke={c.light} strokeWidth="1.5" />
      <path
        d={"M" + FACET_PATH.split(" M").slice(1).join(" M")}
        fill="none"
        stroke={c.light}
        strokeOpacity="0.6"
        strokeWidth="1"
      />
    </svg>
  );
}
