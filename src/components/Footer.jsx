import Ornament from "./Ornament";
import { useLang } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative border-t border-brass/15 px-6 py-12 text-center md:px-12">
      <Ornament className="mb-6" />
      <p className="font-display text-lg text-brassLight">{t.brand}</p>
      <p className="mt-2 text-xs text-parchment/45">
        {t.footer.tagline}
      </p>
      <p className="mt-6 text-[11px] text-parchment/30">
        © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
      </p>
    </footer>
  );
}
