import { useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Gemstones from "../components/Gemstones";
import Reviews from "../components/Reviews";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import FloatingContact from "../components/FloatingContact";
import ScrollProgress from "../components/ScrollProgress";

export default function Home() {
  const [activeService, setActiveService] = useState(null);
  const { t } = useLang();

  return (
    <div className="min-h-screen font-body">
      <ScrollProgress />
      <Header />
      <Hero />
      <Services onBook={setActiveService} />
      <Gemstones
        onInquire={(gem) =>
          setActiveService({
            id: "gemstones",
            name: `${t.gemstones.inquiryPrefix} — ${gem.name}`,
            storageName: `Gemstone inquiry — ${gem.id}`,
            tagline: `${gem.planet} · ${gem.benefit}`,
          })
        }
      />
      <Reviews />
      <Contact />
      <Footer />

      <BookingModal service={activeService} onClose={() => setActiveService(null)} />
      <FloatingContact />
    </div>
  );
}
