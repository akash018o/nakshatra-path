import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-5 md:px-12">
      <Link to="/" className="font-display text-xl text-parchment tracking-wide">
        Nakshatra Path
      </Link>
      <nav className="hidden gap-8 text-sm text-parchment/80 md:flex">
        <a href="#services" className="hover:text-brass transition-colors">Services</a>
        <a href="#gemstones" className="hover:text-brass transition-colors">Gemstones</a>
        <a href="#reviews" className="hover:text-brass transition-colors">Reviews</a>
        <a href="#contact" className="hover:text-brass transition-colors">Contact</a>
      </nav>
    </header>
  );
}
