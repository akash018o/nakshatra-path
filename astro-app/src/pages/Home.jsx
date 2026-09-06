import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Gemstones from "../components/Gemstones";
import Reviews from "../components/Reviews";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";

export default function Home() {
  const [activeService, setActiveService] = useState(null);

  return (
    <div className="min-h-screen bg-cosmos font-body">
      <Header />
      <Hero />
      <Services onBook={setActiveService} />
      <Gemstones
        onInquire={(gem) =>
          setActiveService({
            id: "gemstones",
            name: `Gemstone inquiry — ${gem.name}`,
            tagline: `${gem.planet} · ${gem.benefit}`,
          })
        }
      />
      <Reviews />
      <Contact />
      <Footer />

      <BookingModal service={activeService} onClose={() => setActiveService(null)} />
    </div>
  );
}
