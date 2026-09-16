import { useEffect, useRef, useState } from "react";
import { prefersReduced, hasHover } from "../lib/media";

/**
 * 3D card with two input modes:
 *
 *  - Desktop (has a pointer): tilts toward the cursor, with a glare that
 *    tracks the same position.
 *  - Touch (no pointer): tilts based on where the card sits in the viewport,
 *    so the 3D still reads while scrolling. Cards lean as they rise into view
 *    and settle flat at centre screen. Costs nothing while offscreen.
 */
export default function TiltCard({ children, className = "", max = 9 }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const canPointerTilt = () => hasHover() && !prefersReduced();

  useEffect(() => {
    if (hasHover() || prefersReduced()) return;
    const node = ref.current;
    if (!node) return;

    let ticking = false;
    let visible = false;

    const update = () => {
      ticking = false;
      if (!visible) return;
      const rect = node.getBoundingClientRect();
      const centre = rect.top + rect.height / 2;
      const progress = (window.innerHeight / 2 - centre) / (window.innerHeight / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      setStyle({
        transform: `perspective(900px) rotateX(${clamped * -6}deg) scale(${1 - Math.abs(clamped) * 0.02})`,
      });
    };

    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };

    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; if (visible) onScroll(); },
      { threshold: 0 }
    );
    observer.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleMove = (e) => {
    if (!canPointerTilt() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setStyle({
      transform: `rotateY(${(px - 0.5) * max * 2}deg) rotateX(${(0.5 - py) * max * 2}deg) translateY(-6px)`,
    });
    setGlare({ x: px * 100, y: py * 100, opacity: 0.16 });
  };

  const handleLeave = () => {
    if (!canPointerTilt()) return;
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
