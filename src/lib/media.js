// Small guards around matchMedia — it's missing in some non-browser contexts,
// and an unguarded call there takes the whole render down.
export function prefersReduced() {
  return typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasHover() {
  return typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(hover: hover)").matches;
}
