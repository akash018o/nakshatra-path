import Ornament from "./Ornament";

export default function Footer() {
  return (
    <footer className="relative border-t border-brass/15 px-6 py-12 text-center md:px-12">
      <Ornament className="mb-6" />
      <p className="font-display text-lg text-brassLight">Nakshatra Path</p>
      <p className="mt-2 text-xs text-parchment/45">
        Guidance based on your birth chart.
      </p>
      <p className="mt-6 text-[11px] text-parchment/30">
        © {new Date().getFullYear()} Nakshatra Path. All rights reserved.
      </p>
    </footer>
  );
}
