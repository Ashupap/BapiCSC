import { useState, useRef } from "react";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ExpressRibbon from "@/components/ExpressRibbon";
import HowItWorks from "@/components/HowItWorks";
import ServiceEngine from "@/components/ServiceEngine";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const servicesRef = useRef<HTMLDivElement>(null);

  function scrollToServices() {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      <HeroCarousel onBrowse={scrollToServices} />
      <ExpressRibbon />
      <HowItWorks />
      <div ref={servicesRef}>
        <ServiceEngine searchQuery={searchQuery} />
      </div>
      <AboutSection />
      <FAQSection />
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
