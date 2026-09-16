import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#gemstones", label: "Gemstones" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stop the page scrolling behind the open drawer
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-all duration-500 ${
        scrolled
          ? "border-b border-brass/20 bg-cosmos/85 py-3 backdrop-blur-md shadow-lg shadow-black/30"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10">
        <Link to="/" className="group flex items-center gap-2.5">
          <svg viewBox="0 0 40 40" className="h-7 w-7 text-brass transition-transform duration-500 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.3">
            <circle cx="20" cy="20" r="16" />
            <circle cx="20" cy="20" r="7" />
            <path d="M20 4 V12 M20 28 V36 M4 20 H12 M28 20 H36" />
          </svg>
          <span className="font-display text-lg tracking-wide text-parchment md:text-xl">
            Nakshatra Path
          </span>
        </Link>

        <nav className="hidden items-center gap-9 text-sm text-parchment/75 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative py-1 transition-colors hover:text-brassLight"
            >
              {l.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-brass transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="text-parchment md:hidden"
        >
          <Menu size={26} />
        </button>
      </div>

      {/* Dimmed backdrop — tap to close */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/65 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sliding drawer — always mounted so the transform can animate */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-[80%] max-w-xs flex-col border-l border-brass/30 px-6 py-6 shadow-2xl shadow-black/70 transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "linear-gradient(180deg, #3E2415 0%, #21120C 100%)" }}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-lg text-parchment">Menu</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-parchment">
            <X size={24} />
          </button>
        </div>
        <div className="gold-rule mt-5" />
        <nav className="mt-9 flex flex-col gap-7">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-xl text-parchment transition-all duration-300 hover:translate-x-1 hover:text-brassLight"
              style={{
                transitionDelay: open ? `${i * 60 + 120}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(16px)",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
