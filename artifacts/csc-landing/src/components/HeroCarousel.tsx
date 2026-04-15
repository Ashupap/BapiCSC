import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const slides = [
  {
    id: 1,
    bg: "from-[#003366] to-[#005099]",
    emoji: "🏪",
    titleEn: "Balasore's Trusted Digital Gateway",
    titleOd: "ବାଲେଶ୍ୱରର ବିଶ୍ୱସ୍ତ ଡିଜିଟାଲ ପ୍ରବେଶ",
    subEn: "10+ Years Serving Our Community. One stop for all government & banking services.",
    subOd: "10+ ବର୍ଷ ଧରି ଆମ ସମ୍ପ୍ରଦାୟ ସେବାରେ। ସମସ୍ତ ସରକାରୀ ଓ ବ୍ୟାଙ୍କ ସେବାର ଏକ ଠିକଣା।",
    badge: "CSC • BoB BC Point",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  },
  {
    id: 2,
    bg: "from-[#F06421] to-[#e05010]",
    emoji: "⚡",
    titleEn: "Skip the Queue. Get It Done Fast.",
    titleOd: "ଲାଇନ ଛାଡ଼ନ୍ତୁ। ଶୀଘ୍ର ସଂପୂର୍ଣ୍ଣ କରନ୍ତୁ।",
    subEn: "Income Certificate, Caste Certificate, PAN Card — processed same day with WhatsApp updates.",
    subOd: "ଆୟ ପ୍ରମାଣ, ଜାତି ପ୍ରମାଣ, PAN — ସେଦିନ ପ୍ରସ୍ତୁତ, WhatsApp ଅପଡ଼େଟ ସହ।",
    badge: "Same-Day Processing",
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
  },
  {
    id: 3,
    bg: "from-[#1a5a1a] to-[#0d4d0d]",
    emoji: "🛡️",
    titleEn: "Your Data Is Safe With Us",
    titleOd: "ଆପଣଙ୍କ ଡ଼ାଟା ଆମ ସହ ସୁରକ୍ଷିତ",
    subEn: "Government-authorized center. 100% legitimate documents. Your privacy, our priority.",
    subOd: "ସରକାର ଅନୁମୋଦିତ କେନ୍ଦ୍ର। 100% ଆଇନ ଦଲିଲ। ଆପଣଙ୍କ ଗୋପନୀୟତା, ଆମ ଅଗ୍ରାଧିକାର।",
    badge: "Govt. Authorized",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
  },
];

interface HeroCarouselProps {
  onBrowse: () => void;
}

export default function HeroCarousel({ onBrowse }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const slide = slides[current];

  return (
    <section className="relative pt-[128px] overflow-hidden min-h-[520px] sm:min-h-[580px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bg}`}
        />
      </AnimatePresence>

      {/* Background image overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`img-${slide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.img})` }}
        />
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center text-center text-white">
        {/* Badge */}
        <motion.div
          key={`badge-${slide.id}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-5 border border-white/30"
        >
          <span>{slide.emoji}</span>
          <span>{slide.badge}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          key={`title-${slide.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight max-w-3xl drop-shadow-lg"
        >
          {t(slide.titleEn, slide.titleOd)}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          key={`sub-${slide.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-base sm:text-lg text-white/85 max-w-xl"
        >
          {t(slide.subEn, slide.subOd)}
        </motion.p>

        {/* CTA */}
        <motion.button
          key={`cta-${slide.id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onBrowse}
          className="mt-8 inline-flex items-center gap-2 bg-white text-[#003366] font-bold px-8 py-3.5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 text-base"
        >
          {t("Browse Services", "ସେବା ଦେଖନ୍ତୁ")}
          <ArrowDown size={18} />
        </motion.button>

        {/* Dots */}
        <div className="flex gap-2 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? "w-8 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2.5 text-white transition-all"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2.5 text-white transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </section>
  );
}
