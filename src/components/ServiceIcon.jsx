// Custom gold-linework icons per service, matching the site's medallion
// aesthetic (thin brass strokes, no fills except accents) — vector, so
// they stay crisp at any size with zero extra load weight.

function Kundali() {
  return (
    <>
      <rect x="14" y="14" width="36" height="36" />
      <path d="M14 14 L50 50 M50 14 L14 50 M32 14 L14 32 M32 14 L50 32 M32 50 L14 32 M32 50 L50 32" />
    </>
  );
}

function Diya() {
  return (
    <>
      <path d="M14 40 Q32 52 50 40 Q46 46 32 46 Q18 46 14 40 Z" />
      <path d="M16 40 Q32 30 48 40" />
      <path d="M32 30 C29 24 30 19 32 14 C34 19 35 24 32 30 Z" fill="currentColor" stroke="none" />
    </>
  );
}

function Love() {
  return (
    <>
      <path d="M32 22 C27 14 15 16 15 26 C15 35 26 42 32 47 C38 42 49 35 49 26 C49 16 37 14 32 22 Z" transform="translate(-4,-2) scale(0.85)" />
      <path d="M32 22 C27 14 15 16 15 26 C15 35 26 42 32 47 C38 42 49 35 49 26 C49 16 37 14 32 22 Z" transform="translate(4,4) scale(0.85)" />
    </>
  );
}

function Career() {
  return (
    <>
      <path d="M14 44 L26 32 L34 38 L50 20" />
      <path d="M40 20 L50 20 L50 30" />
      <circle cx="32" cy="14" r="3" fill="currentColor" stroke="none" />
    </>
  );
}

function Tantra() {
  return (
    <>
      <polygon points="32,14 50,44 14,44" />
      <polygon points="32,50 14,20 50,20" />
    </>
  );
}

function Gemstone() {
  return (
    <>
      <polygon points="32,12 46,20 46,36 32,52 18,36 18,20" />
      <path d="M32 12 L32 24 M46 20 L32 24 M46 36 L32 24 L32 52 M18 36 L32 24 M18 20 L32 24" />
    </>
  );
}

const ICONS = {
  kundali: Kundali,
  remedies: Diya,
  love: Love,
  career: Career,
  tantra: Tantra,
  gemstones: Gemstone,
};

export default function ServiceIcon({ serviceId, className = "" }) {
  const IconPath = ICONS[serviceId] || Gemstone;
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div
        className="absolute inset-[-20%] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(240,169,30,0.35) 0%, rgba(240,169,30,0) 70%)" }}
      />
      <svg
        viewBox="0 0 64 64"
        className="relative h-full w-full rounded-full border-2 border-brass/60 p-3 text-brassLight"
        style={{ background: "linear-gradient(160deg, #3E2415 0%, #21120C 100%)" }}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <IconPath />
      </svg>
    </div>
  );
}
