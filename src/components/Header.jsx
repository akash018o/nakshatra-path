import { useState } from "react";
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

  return (
    <header className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12">
      <Link to="/" className="font-display text-xl text-parchment tracking-wide">
        Nakshatra Path
      </Link>

      <nav className="hidden gap-8 text-sm text-parchment/80 md:flex">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="hover:text-brass transition-colors">
            {l.label}
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

      {/* Backdrop — fades in behind the drawer, tapping it closes the menu */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* The actual sidebar — solid panel, slides in from the right, always
          mounted (not conditionally rendered) so the transition can animate
          instead of just popping on/off */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-[78%] max-w-xs flex-col border-l border-brass/30 px-6 py-5 shadow-2xl shadow-black/60 transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "linear-gradient(180deg, #3A2013 0%, #2B1810 100%)" }}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-lg text-parchment">Menu</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-parchment">
            <X size={24} />
          </button>
        </div>
        <nav className="mt-12 flex flex-col gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-xl text-parchment transition-colors hover:text-brassLight"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
