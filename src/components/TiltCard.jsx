import { prefersReduced, hasHover } from "../lib/media";
import { useRef, useState } from "react";

/**
 * Card that tilts in 3D toward the pointer, with a light glare that tracks
 * the same position. Pointer-driven rather than a canned animation, so it
 * feels like a physical object responding to you.
 *
 * Disabled on touch devices (no hover there) and for reduced-motion users.
 */
export default function TiltCard({ children, className = "", max = 9 }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const canTilt = () =>
    typeof window !== "undefined" &&
    hasHover() &&
    !prefersReduced();

  const handleMove = (e) => {
    if (!canTilt() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    setStyle({
      transform: `rotateY(${(px - 0.5) * max * 2}deg) rotateX(${(0.5 - py) * max * 2}deg) translateY(-6px)`,
    });
    setGlare({ x: px * 100, y: py * 100, opacity: 0.16 });
  };

  const handleLeave = () => {
    setStyle({ transform: "rotateY(0deg) rotateX(0deg) translateY(0)" });
    setGlare((g) => ({ ...g, opacity: 0 }));
  };

  return (
    <div className="tilt-scene h-full">
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={style}
        className={`tilt-card relative h-full overflow-hidden ${className}`}
      >
        {/* Glare follows the pointer across the card face */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(251,219,128,0.9) 0%, rgba(251,219,128,0) 55%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
}
