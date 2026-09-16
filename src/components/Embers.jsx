import { useMemo } from "react";
import { prefersReduced } from "../lib/media";

/**
 * Drifting temple sparks. Pure CSS animation on a handful of divs — no canvas,
 * no rAF loop, so it costs essentially nothing even on a low-end phone.
 */
export default function Embers({ count = 14 }) {
  const embers = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: 55 + Math.random() * 45,
        size: 3 + Math.random() * 6,
        dur: 7 + Math.random() * 7,
        delay: Math.random() * 8,
        drift: (Math.random() - 0.5) * 70,
      })),
    [count]
  );

  if (prefersReduced()) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {embers.map((e) => (
        <span
          key={e.id}
          className="ember"
          style={{
            left: `${e.left}%`,
            top: `${e.top}%`,
            width: `${e.size}px`,
            height: `${e.size}px`,
            "--dur": `${e.dur}s`,
            "--delay": `${e.delay}s`,
            "--drift": `${e.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
