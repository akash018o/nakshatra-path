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

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col bg-cosmos/98 px-6 py-5 md:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl text-parchment">Nakshatra Path</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-parchment">
              <X size={26} />
            </button>
          </div>
          <nav className="mt-16 flex flex-col gap-8 text-center">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl text-parchment hover:text-brass transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
