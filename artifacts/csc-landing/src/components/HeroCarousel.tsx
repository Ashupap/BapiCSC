import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const slides = [
  {
    id: 0,
    gradient: "linear-gradient(135deg, #001f4d 0%, #003366 50%, #005099 100%)",
    accent: "#F06421",
    emoji: "🏪",
    titleEn: "Balasore's Trusted\nDigital Gateway",
    titleOd: "ବାଲେଶ୍ୱରର ବିଶ୍ୱସ୍ତ\nଡିଜିଟାଲ ପ୍ରବେଶ",
    subEn: "10+ Years Serving Our Community. One stop for all government & banking services.",
    subOd: "10+ ବର୍ଷ ଧରି ଆମ ସମ୍ପ୍ରଦାୟ ସେବାରେ। ସମସ୍ତ ସରକାରୀ ଓ ବ୍ୟାଙ୍କ ସେବାର ଏକ ଠିକଣା।",
    badge: "CSC • BoB BC Point",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=85",
    stats: [{ v: "10+", l: "Years" }, { v: "100+", l: "Services" }, { v: "5000+", l: "Customers" }],
  },
  {
    id: 1,
    gradient: "linear-gradient(135deg, #7c2d00 0%, #c84e00 50%, #F06421 100%)",
    accent: "#fff",
    emoji: "⚡",
    titleEn: "Skip the Queue.\nGet It Done Fast.",
    titleOd: "ଲାଇନ ଛାଡ଼ନ୍ତୁ।\nଶୀଘ୍ର ସଂପୂର୍ଣ୍ଣ କରନ୍ତୁ।",
    subEn: "Income Certificate, Caste Certificate, PAN Card — processed same day with WhatsApp updates.",
    subOd: "ଆୟ ପ୍ରମାଣ, ଜାତି ପ୍ରମାଣ, PAN — ସେଦିନ ପ୍ରସ୍ତୁତ, WhatsApp ଅପଡ଼େଟ ସହ।",
    badge: "Same-Day Processing",
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=85",
    stats: [{ v: "Same Day", l: "Processing" }, { v: "WhatsApp", l: "Updates" }, { v: "Zero Queue", l: "Guarantee" }],
  },
  {
    id: 2,
    gradient: "linear-gradient(135deg, #0a2e0a 0%, #0d4d0d 50%, #1a6b1a 100%)",
    accent: "#4ade80",
    emoji: "🛡️",
    titleEn: "Your Data Is\nSafe With Us",
    titleOd: "ଆପଣଙ୍କ ଡ଼ାଟା\nଆମ ସହ ସୁରକ୍ଷିତ",
    subEn: "Government-authorized center. 100% legitimate documents. Your privacy, our priority.",
    subOd: "ସରକାର ଅନୁମୋଦିତ କେନ୍ଦ୍ର। 100% ଆଇନ ଦଲିଲ। ଆପଣଙ୍କ ଗୋପନୀୟତା, ଆମ ଅଗ୍ରାଧିକାର।",
    badge: "Govt. Authorized",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=85",
    stats: [{ v: "100%", l: "Authorized" }, { v: "SSL", l: "Secured" }, { v: "Private", l: "Data" }],
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
      style={{ paddingTop: "var(--header-h, 88px)", minHeight: "100svh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* All slides stacked — crossfade via opacity only, never disappears */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== current}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          {/* Gradient base */}
          <div className="absolute inset-0" style={{ background: slide.gradient }} />

          {/* Photo overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.img})`,
              opacity: 0.13,
              mixBlendMode: "luminosity",
            }}
          />

          {/* Noise texture for premium feel */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            }}
          />

          {/* Bottom fade for readability */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 flex flex-col justify-center min-h-[calc(100svh-88px)] py-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            key={`badge-${current}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-6 border border-white/25 backdrop-blur-md bg-white/10 text-white uppercase tracking-widest"
          >
            <span>{slides[current].emoji}</span>
            <span>{slides[current].badge}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            key={`title-${current}`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.07, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.08] tracking-tight whitespace-pre-line"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {t(slides[current].titleEn, slides[current].titleOd)}
          </motion.h1>

          {/* Accent underline */}
          <motion.div
            key={`line-${current}`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
            className="mt-4 h-1 w-20 rounded-full origin-left"
            style={{ backgroundColor: slides[current].accent }}
          />

          {/* Subtitle */}
          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
            className="mt-5 text-base sm:text-lg text-white/80 max-w-xl leading-relaxed"
          >
            {t(slides[current].subEn, slides[current].subOd)}
          </motion.p>

          {/* Mini stats */}
          <motion.div
            key={`stats-${current}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: "easeOut" }}
            className="mt-8 flex flex-wrap gap-5"
          >
            {slides[current].stats.map((s, i) => (
              <div key={i} className="text-left">
                <div
                  className="text-2xl font-extrabold text-white leading-none"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {s.v}
                </div>
                <div className="text-xs text-white/60 font-medium mt-0.5 uppercase tracking-wide">{s.l}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.button
            key={`cta-${current}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onBrowse}
            className="mt-8 inline-flex items-center gap-2.5 bg-white text-[#003366] font-bold px-7 py-3.5 rounded-full shadow-2xl text-sm sm:text-base hover:shadow-orange-500/30 transition-all duration-300"
          >
            {t("Browse Services", "ସେବା ଦେଖନ୍ତୁ")}
            <ArrowDown size={17} />
          </motion.button>
        </div>

        {/* Bottom controls row */}
        <div className="mt-auto pt-10 flex items-center justify-between">
          {/* Dot progress */}
          <div className="flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className="group focus:outline-none"
              >
                <div
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === current ? "w-8 bg-white" : "w-3 bg-white/35 hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Arrow controls */}
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
