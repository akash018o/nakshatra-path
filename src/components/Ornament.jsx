/**
 * Traditional divider motif — a lotus-diamond flanked by tapering gold rules.
 * Gives sections a deliberate beginning and end instead of just stacking.
 */
export default function Ornament({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <div className="gold-rule w-16 sm:w-28" />
      <svg viewBox="0 0 40 40" className="h-5 w-5 flex-shrink-0 text-brass" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M20 4 L30 20 L20 36 L10 20 Z" />
        <path d="M20 11 L25.5 20 L20 29 L14.5 20 Z" />
        <circle cx="20" cy="20" r="1.8" fill="currentColor" stroke="none" />
      </svg>
      <div className="gold-rule w-16 sm:w-28" />
    </div>
  );
}
