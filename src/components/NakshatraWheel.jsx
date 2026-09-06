// Original 27-nakshatra ring, drawn from scratch — division markers around a
// circle, each spanning 13.33deg (360/27). Not a photo, not a stock asset.
export default function NakshatraWheel({ className = "" }) {
  const segments = Array.from({ length: 27 }, (_, i) => i);
  const cx = 200, cy = 200, rOuter = 196, rInner = 160, rLabel = 178;

  const toXY = (angleDeg, r) => {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };

  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke="#C89B3C" strokeOpacity="0.3" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={rInner} fill="none" stroke="#C89B3C" strokeOpacity="0.2" strokeWidth="1" />
      <circle cx={cx} cy={cy} r="4" fill="#C89B3C" fillOpacity="0.4" />

      {segments.map((i) => {
        const angle = i * (360 / 27);
        const [x1, y1] = toXY(angle, rInner);
        const [x2, y2] = toXY(angle, rOuter);
        const [lx, ly] = toXY(angle + 360 / 27 / 2, rLabel);
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C89B3C" strokeOpacity="0.25" strokeWidth="1" />
            <circle cx={lx} cy={ly} r="1.6" fill="#C89B3C" fillOpacity="0.45" />
          </g>
        );
      })}

      {/* 12 rashi divisions, heavier lines, every 30deg */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = i * 30;
        const [x1, y1] = toXY(angle, rInner - 20);
        const [x2, y2] = toXY(angle, rOuter);
        return (
          <line
            key={"rashi-" + i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#C89B3C" strokeOpacity="0.4" strokeWidth="1.5"
          />
        );
      })}
    </svg>
  );
}
