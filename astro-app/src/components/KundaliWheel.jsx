export default function KundaliWheel({ className = "", spin = true }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      aria-hidden="true"
      style={spin ? { animation: "spin 180s linear infinite" } : undefined}
    >
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { svg { animation: none !important; } }
      `}</style>
      <rect x="4" y="4" width="392" height="392" fill="none" stroke="#C89B3C" strokeOpacity="0.35" strokeWidth="1.5" />
      <path
        d="M 200 4 L 396 200 L 200 396 L 4 200 Z"
        fill="none"
        stroke="#C89B3C"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      <path
        d="M 4 4 L 200 200 L 4 396 M 396 4 L 200 200 L 396 396"
        fill="none"
        stroke="#C89B3C"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
      {/* faint house numerals */}
      {[
        [200, 60], [320, 100], [340, 200], [320, 300],
        [200, 340], [80, 300], [60, 200], [80, 100],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#C89B3C" fillOpacity="0.5" />
      ))}
    </svg>
  );
}
