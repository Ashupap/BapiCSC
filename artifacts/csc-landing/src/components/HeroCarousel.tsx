import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowDown, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const slides = [
  {
    id: 0,
    gradient: "linear-gradient(135deg, #001f4d 0%, #003366 55%, #004e99 100%)",
    accent: "#F06421",
    emoji: "🏪",
    titleEn: "Balasore's Trusted\nDigital Gateway",
    titleOd: "ବାଲେଶ୍ୱରର ବିଶ୍ୱସ୍ତ\nଡିଜିଟାଲ ପ୍ରବେଶ",
    subEn: "10+ Years Serving Our Community. One stop for all government & banking services.",
    subOd: "10+ ବର୍ଷ ଧରି ଆମ ସମ୍ପ୍ରଦାୟ ସେବାରେ। ସମସ୍ତ ସରକାରୀ ଓ ବ୍ୟାଙ୍କ ସେବାର ଏକ ଠିକଣା।",
    badge: "CSC • BoB BC Point",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=85",
    stats: [{ v: "10+", l: "Years" }, { v: "100+", l: "Services" }, { v: "5000+", l: "Customers" }],
    orb1: "#F06421",
    orb2: "#0066cc",
  },
  {
    id: 1,
    gradient: "linear-gradient(135deg, #7c2d00 0%, #c84e00 55%, #F06421 100%)",
    accent: "#fff",
    emoji: "⚡",
    titleEn: "Skip the Queue.\nGet It Done Fast.",
    titleOd: "ଲାଇନ ଛାଡ଼ନ୍ତୁ।\nଶୀଘ୍ର ସଂପୂର୍ଣ୍ଣ କରନ୍ତୁ।",
    subEn: "Income Certificate, Caste Certificate, PAN Card — processed same day with WhatsApp updates.",
    subOd: "ଆୟ ପ୍ରମାଣ, ଜାତି ପ୍ରମାଣ, PAN — ସେଦିନ ପ୍ରସ୍ତୁତ, WhatsApp ଅପଡ଼େଟ ସହ।",
    badge: "Same-Day Processing",
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=85",
    stats: [{ v: "Same Day", l: "Processing" }, { v: "WhatsApp", l: "Updates" }, { v: "Zero Queue", l: "Guarantee" }],
    orb1: "#ff8844",
    orb2: "#ff4400",
  },
  {
    id: 2,
    gradient: "linear-gradient(135deg, #0a2e0a 0%, #0d4d0d 55%, #1a6b1a 100%)",
    accent: "#4ade80",
    emoji: "🛡️",
    titleEn: "Your Data Is\nSafe With Us",
    titleOd: "ଆପଣଙ୍କ ଡ଼ାଟା\nଆମ ସହ ସୁରକ୍ଷିତ",
    subEn: "Government-authorized center. 100% legitimate documents. Your privacy, our priority.",
    subOd: "ସରକାର ଅନୁମୋଦିତ କେନ୍ଦ୍ର। 100% ଆଇନ ଦଲିଲ। ଆପଣଙ୍କ ଗୋପନୀୟତା, ଆମ ଅଗ୍ରାଧିକାର।",
    badge: "Govt. Authorized",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=85",
    stats: [{ v: "100%", l: "Authorized" }, { v: "SSL", l: "Secured" }, { v: "Private", l: "Data" }],
    orb1: "#22c55e",
    orb2: "#16a34a",
  },
];

interface HeroCarouselProps {
  onBrowse: () => void;
}

export default function HeroCarousel({ onBrowse }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const { t } = useLanguage();

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next, paused]);

  return (
    <section
      className="relative overflow-hidden"
      style={{ paddingTop: "var(--header-h, 80px)", minHeight: "100svh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide backgrounds */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== current}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <div className="absolute inset-0" style={{ background: slide.gradient }} />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.img})`, opacity: 0.10, mixBlendMode: "luminosity" }}
          />
          {/* Decorative orbs */}
          <div
            className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: slide.orb1 }}
          />
          <div
            className="absolute -bottom-48 -left-24 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
            style={{ backgroundColor: slide.orb2 }}
          />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 flex flex-col justify-center min-h-[calc(100svh-80px)] py-12">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            key={`badge-${current}`}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-6 border border-white/20 backdrop-blur-md bg-white/10 text-white uppercase tracking-widest"
          >
            <Sparkles size={12} className="opacity-80" />
            <span>{slides[current].badge}</span>
          </motion.div>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${current}`}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight whitespace-pre-line"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {t(slides[current].titleEn, slides[current].titleOd)}
            </motion.h1>
          </AnimatePresence>

          {/* Accent underline */}
          <motion.div
            key={`line-${current}`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.22, ease: "easeOut" }}
            className="mt-5 h-1.5 w-24 rounded-full origin-left"
            style={{ backgroundColor: slides[current].accent }}
          />

          {/* Subtitle */}
          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
            className="mt-5 text-base sm:text-lg text-white/80 max-w-lg leading-relaxed"
          >
            {t(slides[current].subEn, slides[current].subOd)}
          </motion.p>

          {/* Stats */}
          <motion.div
            key={`stats-${current}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.27, ease: "easeOut" }}
            className="mt-8 flex flex-wrap gap-6"
          >
            {slides[current].stats.map((s, i) => (
              <div key={i} className="text-left">
                <div className="text-2xl sm:text-3xl font-black text-white leading-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {s.v}
                </div>
                <div className="text-[11px] text-white/55 font-semibold mt-1 uppercase tracking-widest">{s.l}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            key={`cta-${current}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34, ease: "easeOut" }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onBrowse}
              className="inline-flex items-center gap-2 bg-white text-[#003366] font-extrabold px-7 py-3.5 rounded-full shadow-2xl text-sm sm:text-base hover:shadow-orange-400/20 transition-all duration-300"
            >
              {t("Browse Services", "ସେବା ଦେଖନ୍ତୁ")}
              <ArrowDown size={16} />
            </motion.button>
            <motion.a
              href="https://wa.me/919437000000?text=Hi, I need help with a CSC service."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-extrabold px-7 py-3.5 rounded-full shadow-lg text-sm sm:text-base hover:bg-[#1da851] transition-all duration-300"
            >
              {t("WhatsApp Us", "WhatsApp ରେ ଯୋଗ")}
            </motion.a>
          </motion.div>
        </div>

        {/* Trust badges row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          {[
            { en: "Govt. Authorized", od: "ସରକାର ଅନୁମୋଦିତ", icon: "🏛️" },
            { en: "BoB BC Point", od: "BoB BC ପଏଣ୍ଟ", icon: "🏦" },
            { en: "10+ Years Trust", od: "10+ ବର୍ଷ ବିଶ୍ୱାସ", icon: "⭐" },
          ].map((badge, i) => (
            <div key={i} className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full">
              <span>{badge.icon}</span>
              <span>{t(badge.en, badge.od)}</span>
            </div>
          ))}
        </motion.div>

        {/* Bottom controls */}
        <div className="mt-auto pt-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className="group focus:outline-none"
              >
                <div
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === current ? "w-10 bg-white" : "w-3 bg-white/30 hover:bg-white/55"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
