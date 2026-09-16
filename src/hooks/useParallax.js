import { prefersReduced } from "../lib/media";
import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref + transform style that moves an element slower than the page
 * scroll, creating depth between background and foreground.
 *
 * Uses requestAnimationFrame so it never blocks scrolling, and only runs
 * while the section is actually on screen.
 */
export default function useParallax(strength = 0.18) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (prefersReduced()) return;
    const node = ref.current;
    if (!node) return;

    let ticking = false;
    let visible = false;

    const update = () => {
      if (!visible) { ticking = false; return; }
      const rect = node.getBoundingClientRect();
      // Distance of section centre from viewport centre, normalised
      const fromCentre = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(fromCentre * -strength);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) onScroll();
      },
      { threshold: 0 }
    );
    observer.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [strength]);

  return [ref, { transform: `translate3d(0, ${offset}px, 0)` }];
}
