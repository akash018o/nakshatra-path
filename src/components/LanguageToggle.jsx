import { useLang } from "../i18n/LanguageContext";

export default function LanguageToggle({ className = "" }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={`relative flex items-center rounded-full border border-brass/35 bg-cosmos/50 p-0.5 text-xs backdrop-blur-sm ${className}`}
      role="group"
      aria-label="Language"
    >
      {/* Sliding highlight behind the active option */}
      <span
        aria-hidden="true"
        className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-gradient-to-r from-saffron to-brassLight transition-transform duration-300 ease-out"
        style={{ transform: lang === "en" ? "translateX(0)" : "translateX(100%)" }}
      />
      <button
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`relative z-10 w-11 rounded-full py-1 font-medium transition-colors ${
          lang === "en" ? "text-cosmos" : "text-parchment/70 hover:text-brassLight"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("hi")}
        aria-pressed={lang === "hi"}
        className={`relative z-10 w-11 rounded-full py-1 font-medium transition-colors ${
          lang === "hi" ? "text-cosmos" : "text-parchment/70 hover:text-brassLight"
        }`}
      >
        हिं
      </button>
    </div>
  );
}
