// Realistic-look 3D gem-cut renders built from layered SVG gradients —
// simulates a studio-lit faceted gem (deep color, top specular highlight,
// side shading, cast shadow) without using any stock photo or AI image.
const STONES = {
  ruby: { deep: "#4A0F1A", mid: "#8B2635", bright: "#D65D6E", highlight: "#FFD9DE" },
  pearl: { deep: "#B8AE99", mid: "#EDE6D6", bright: "#FFFDF6", highlight: "#FFFFFF" },
  coral: { deep: "#6B2013", mid: "#C1442A", bright: "#F0805C", highlight: "#FFD9C7" },
  emerald: { deep: "#0D2E22", mid: "#1E5A45", bright: "#4FBE8F", highlight: "#D4FFEE" },
  "yellow-sapphire": { deep: "#6B4E14", mid: "#C89B3C", bright: "#F3D27A", highlight: "#FFF6DC" },
  diamond: { deep: "#8A93A0", mid: "#D8DEE6", bright: "#FFFFFF", highlight: "#FFFFFF" },
  "blue-sapphire": { deep: "#0D1E33", mid: "#1E3A5F", bright: "#4F7FB8", highlight: "#CFE3FF" },
  hessonite: { deep: "#5C3610", mid: "#A6631B", bright: "#E8A855", highlight: "#FFE7BE" },
  "cats-eye": { deep: "#333D1F", mid: "#5C6B3A", bright: "#9BB268", highlight: "#E8F2CF" },
};

export default function GemIcon({ stoneId, className = "" }) {
  const c = STONES[stoneId] || STONES.ruby;
  const uid = stoneId.replace(/[^a-z]/g, "");

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`body-${uid}`} cx="42%" cy="32%" r="75%">
          <stop offset="0%" stopColor={c.bright} />
          <stop offset="55%" stopColor={c.mid} />
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

      <ellipse cx="50" cy="88" rx="26" ry="6" fill={`url(#shadow-${uid})`} />

      {/* Gem body - octagonal emerald-style cut */}
      <polygon
        points="50,8 72,18 84,38 84,62 72,82 28,82 16,62 16,38 28,18"
        fill={`url(#body-${uid})`}
        stroke={c.deep}
        strokeWidth="1"
      />

      {/* Table facet (flat top) */}
      <polygon
        points="50,22 64,30 64,54 50,62 36,54 36,30"
        fill={`url(#facet-${uid})`}
        stroke={c.bright}
        strokeOpacity="0.4"
        strokeWidth="0.75"
      />

      {/* Facet lines radiating from table */}
      <g stroke={c.highlight} strokeOpacity="0.5" strokeWidth="0.6" fill="none">
        <line x1="50" y1="8" x2="50" y2="22" />
        <line x1="72" y1="18" x2="64" y2="30" />
        <line x1="84" y1="38" x2="64" y2="54" />
        <line x1="84" y1="62" x2="50" y2="62" />
        <line x1="72" y1="82" x2="50" y2="62" />
        <line x1="28" y1="82" x2="36" y2="54" />
        <line x1="16" y1="62" x2="36" y2="54" />
        <line x1="16" y1="38" x2="36" y2="30" />
        <line x1="28" y1="18" x2="36" y2="30" />
      </g>

      {/* Specular highlight */}
      <ellipse cx="42" cy="28" rx="8" ry="5" fill={c.highlight} opacity="0.85" transform="rotate(-20 42 28)" />
      <ellipse cx="58" cy="42" rx="3" ry="9" fill={c.highlight} opacity="0.3" transform="rotate(15 58 42)" />
    </svg>
  );
}
