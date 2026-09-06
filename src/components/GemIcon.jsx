// Real gem-cut shapes per stone type, not one shape recolored:
// - round brilliant (diamond, yellow sapphire): circular, radiating facets
// - oval/cushion cut (ruby, blue sapphire, hessonite): faceted oval
// - emerald step-cut (emerald): clipped-corner rectangle, concentric steps
// - cabochon dome (cat's eye): smooth dome + chatoyant light band, no facets
// - sphere (pearl): smooth glossy ball, no facets
// - tumbled organic bead (coral): irregular rounded bead, not perfectly round

const STONES = {
  ruby: { cut: "oval", deep: "#4A0F1A", mid: "#8B2635", bright: "#D65D6E", highlight: "#FFD9DE" },
  pearl: { cut: "sphere", deep: "#C4B9A0", mid: "#EDE6D6", bright: "#FFFDF6", highlight: "#FFFFFF" },
  coral: { cut: "organic", deep: "#6B2013", mid: "#C1442A", bright: "#F0805C", highlight: "#FFD9C7" },
  emerald: { cut: "emerald", deep: "#0D2E22", mid: "#1E5A45", bright: "#4FBE8F", highlight: "#D4FFEE" },
  "yellow-sapphire": { cut: "round", deep: "#6B4E14", mid: "#C89B3C", bright: "#F3D27A", highlight: "#FFF6DC" },
  diamond: { cut: "round", deep: "#8A93A0", mid: "#D8DEE6", bright: "#FFFFFF", highlight: "#FFFFFF" },
  "blue-sapphire": { cut: "oval", deep: "#0D1E33", mid: "#1E3A5F", bright: "#4F7FB8", highlight: "#CFE3FF" },
  hessonite: { cut: "oval", deep: "#5C3610", mid: "#A6631B", bright: "#E8A855", highlight: "#FFE7BE" },
  "cats-eye": { cut: "cabochon", deep: "#333D1F", mid: "#5C6B3A", bright: "#9BB268", highlight: "#E8F2CF" },
};

function polarPoint(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function RoundBrilliant({ c, uid }) {
  const cx = 50, cy = 50, R = 40, tableR = 16;
  const facetCount = 12;
  const facets = Array.from({ length: facetCount }, (_, i) => {
    const angle = (360 / facetCount) * i;
    const [ox, oy] = polarPoint(cx, cy, R, angle);
    const [ix, iy] = polarPoint(cx, cy, tableR, angle);
    return <line key={i} x1={ix} y1={iy} x2={ox} y2={oy} stroke={c.highlight} strokeOpacity="0.5" strokeWidth="0.6" />;
  });
  return (
    <>
      <circle cx={cx} cy={cy} r={R} fill={`url(#body-${uid})`} stroke={c.deep} strokeWidth="1" />
      <circle cx={cx} cy={cy} r={tableR} fill={`url(#facet-${uid})`} stroke={c.bright} strokeOpacity="0.4" strokeWidth="0.6" />
      {facets}
      <ellipse cx={cx - 10} cy={cy - 14} rx="7" ry="4" fill={c.highlight} opacity="0.85" transform={`rotate(-25 ${cx - 10} ${cy - 14})`} />
    </>
  );
}

function OvalCut({ c, uid }) {
  const cx = 50, cy = 50, rx = 30, ry = 40, trx = 13, tRy = 20;
  const facetCount = 10;
  const facets = Array.from({ length: facetCount }, (_, i) => {
    const angle = (360 / facetCount) * i;
    const rad = (angle * Math.PI) / 180;
    const ox = cx + rx * Math.cos(rad), oy = cy + ry * Math.sin(rad);
    const ix = cx + trx * Math.cos(rad), iy = cy + tRy * Math.sin(rad);
    return <line key={i} x1={ix} y1={iy} x2={ox} y2={oy} stroke={c.highlight} strokeOpacity="0.5" strokeWidth="0.6" />;
  });
  return (
    <>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#body-${uid})`} stroke={c.deep} strokeWidth="1" />
      <ellipse cx={cx} cy={cy} rx={trx} ry={tRy} fill={`url(#facet-${uid})`} stroke={c.bright} strokeOpacity="0.4" strokeWidth="0.6" />
      {facets}
      <ellipse cx={cx - 8} cy={cy - 18} rx="6" ry="9" fill={c.highlight} opacity="0.8" transform={`rotate(-15 ${cx - 8} ${cy - 18})`} />
    </>
  );
}

function EmeraldCut({ c, uid }) {
  const clip = (x, y, w, h, cut) =>
    `${x + cut},${y} ${x + w - cut},${y} ${x + w},${y + cut} ${x + w},${y + h - cut} ${x + w - cut},${y + h} ${x + cut},${y + h} ${x},${y + h - cut} ${x},${y + cut}`;
  return (
    <>
      <polygon points={clip(10, 14, 80, 72, 14)} fill={`url(#body-${uid})`} stroke={c.deep} strokeWidth="1" />
      <polygon points={clip(22, 26, 56, 48, 9)} fill="none" stroke={c.highlight} strokeOpacity="0.45" strokeWidth="0.7" />
      <polygon points={clip(32, 36, 36, 28, 6)} fill={`url(#facet-${uid})`} stroke={c.bright} strokeOpacity="0.4" strokeWidth="0.6" />
      <rect x="26" y="22" width="14" height="8" fill={c.highlight} opacity="0.7" transform="skewX(-10)" />
    </>
  );
}

function Cabochon({ c, uid, catsEye }) {
  const cx = 50, cy = 52, rx = 34, ry = 30;
  return (
    <>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#dome-${uid})`} stroke={c.deep} strokeWidth="1" />
      {catsEye && (
        <ellipse
          cx={cx} cy={cy} rx={rx * 0.85} ry="2.2"
          fill={c.highlight} opacity="0.9" transform={`rotate(8 ${cx} ${cy})`}
        />
      )}
      <ellipse cx={cx - 10} cy={cy - 12} rx="10" ry="6" fill="#ffffff" opacity="0.35" />
    </>
  );
}

function Sphere({ c, uid }) {
  const cx = 50, cy = 52, r = 32;
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={`url(#dome-${uid})`} stroke={c.deep} strokeOpacity="0.3" strokeWidth="0.5" />
      <ellipse cx={cx - 11} cy={cy - 13} rx="9" ry="6" fill="#ffffff" opacity="0.75" transform={`rotate(-20 ${cx - 11} ${cy - 13})`} />
    </>
  );
}

function Organic({ c, uid }) {
  // Slightly irregular tumbled-bead outline, not a perfect circle.
  const path = "M50,20 C64,18 76,28 78,42 C80,56 72,70 58,76 C44,82 28,76 22,62 C16,48 20,32 32,24 C38,20 44,20 50,20 Z";
  return (
    <>
      <path d={path} fill={`url(#dome-${uid})`} stroke={c.deep} strokeWidth="1" />
      <ellipse cx="38" cy="36" rx="8" ry="5" fill="#ffffff" opacity="0.4" transform="rotate(-25 38 36)" />
      <ellipse cx="58" cy="54" rx="5" ry="3" fill="#ffffff" opacity="0.25" />
    </>
  );
}

export default function GemIcon({ stoneId, className = "" }) {
  const c = STONES[stoneId] || STONES.ruby;
  const uid = stoneId.replace(/[^a-z]/g, "");

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`body-${uid}`} cx="40%" cy="30%" r="80%">
          <stop offset="0%" stopColor={c.bright} />
          <stop offset="55%" stopColor={c.mid} />
          <stop offset="100%" stopColor={c.deep} />
        </radialGradient>
        <radialGradient id={`dome-${uid}`} cx="38%" cy="28%" r="85%">
          <stop offset="0%" stopColor={c.bright} />
          <stop offset="45%" stopColor={c.mid} />
          <stop offset="100%" stopColor={c.deep} />
        </radialGradient>
        <linearGradient id={`facet-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`shadow-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="50" cy="90" rx="26" ry="6" fill={`url(#shadow-${uid})`} />

      {c.cut === "round" && <RoundBrilliant c={c} uid={uid} />}
      {c.cut === "oval" && <OvalCut c={c} uid={uid} />}
      {c.cut === "emerald" && <EmeraldCut c={c} uid={uid} />}
      {c.cut === "cabochon" && <Cabochon c={c} uid={uid} catsEye />}
      {c.cut === "sphere" && <Sphere c={c} uid={uid} />}
      {c.cut === "organic" && <Organic c={c} uid={uid} />}
    </svg>
  );
}
