import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);
const STORAGE_KEY = "nakshatra-lang";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "hi") return saved;
      // Default to Hindi for Hindi-locale browsers, English otherwise
      if (typeof navigator !== "undefined" && navigator.language?.startsWith("hi")) return "hi";
    } catch {
      /* storage can be blocked — fall through to the default */
    }
    return "en";
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* non-fatal */ }
    document.documentElement.lang = lang;
    // Devanagari needs slightly more line-height to breathe; this class
    // lets the stylesheet adjust without every component knowing about it.
    document.documentElement.classList.toggle("lang-hi", lang === "hi");
  }, [lang]);

  const t = translations[lang];
  const toggle = () => setLang((l) => (l === "en" ? "hi" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
