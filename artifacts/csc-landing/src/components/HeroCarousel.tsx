import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowDown, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import cscServicesPoster from "@assets/poster_csc_opt.webp";
import aadhaarPoster from "@assets/poster_aadhaar_opt.webp";
import pmWelfarePoster from "@assets/poster_pmwelfare_opt.webp";

const PHONE = "919437000000";

const slides = [
  {
    id: 0,
    gradient: "linear-gradient(135deg, #001f4d 0%, #003366 55%, #004e99 100%)",
    accent: "#F06421",
    titleEn: "Balasore's Trusted\nDigital Gateway",
    titleOd: "ବାଲେଶ୍ୱରର ବିଶ୍ୱସ୍ତ\nଡିଜିଟାଲ ପ୍ରବେଶ",
    subEn: "10+ Years Serving Our Community. One stop for all government & banking services.",
    subOd: "10+ ବର୍ଷ ଧରି ଆମ ସମ୍ପ୍ରଦାୟ ସେବାରେ। ସମସ୍ତ ସରକାରୀ ଓ ବ୍ୟାଙ୍କ ସେବାର ଏକ ଠିକଣା।",
    badge: "CSC • BoB BC Point",
    poster: cscServicesPoster,
    posterLabel: "100+ e-Services",
    posterAccent: "#F06421",
    stats: [{ v: "10+", l: "Years", lOd: "ବଅରଶ" }, { v: "100+", l: "Services", lOd: "ସେବା" }, { v: "5000+", l: "Customers", lOd: "ଗରାହି" }],
    orb1: "#F06421",
    orb2: "#0066cc",
  },
  {
    id: 1,
    gradient: "linear-gradient(135deg, #7c2d00 0%, #c84e00 55%, #c25000 100%)",
    accent: "#fff",
    titleEn: "Skip the Queue.\nGet It Done Fast.",
    titleOd: "ଲାଇନ ଛାଡ଼ନ୍ତୁ।\nଶୀଘ୍ର ସଂପୂର୍ଣ୍ଣ କରନ୍ତୁ।",
    subEn: "Income Certificate, PAN Card, Aadhaar Update — processed same day with WhatsApp updates.",
    subOd: "ଆୟ ପ୍ରମାଣ, PAN, ଆଧାର — ସେଦିନ ପ୍ରସ୍ତୁତ, WhatsApp ଅପଡ଼େଟ ସହ।",
    badge: "Same-Day Processing",
    poster: aadhaarPoster,
    posterLabel: "UCL Aadhaar Services",
    posterAccent: "#ff8844",
    stats: [{ v: "Same Day", l: "Processing", lOd: "କାରଯ୍ଯ" }, { v: "WhatsApp", l: "Updates", lOd: "ଅଦ୍ଯଅତନ" }, { v: "Zero Queue", l: "Guarantee", lOd: "ନିଶ୍ଚିତ" }],
    orb1: "#ff8844",
    orb2: "#ff4400",
  },
  {
    id: 2,
    gradient: "linear-gradient(135deg, #0a2e0a 0%, #0d4d0d 55%, #1a6b1a 100%)",
    accent: "#4ade80",
    titleEn: "Your Data Is\nSafe With Us",
    titleOd: "ଆପଣଙ୍କ ଡ଼ାଟା\nଆମ ସହ ସୁରକ୍ଷିତ",
    subEn: "Government-authorized center. 100% legitimate documents. Your privacy, our priority.",
    subOd: "ସରକାର ଅନୁମୋଦିତ କେନ୍ଦ୍ର। 100% ଆଇନ ଦଲିଲ। ଆପଣଙ୍କ ଗୋପନୀୟତା, ଆମ ଅଗ୍ରାଧିକାର।",
    badge: "Govt. Authorized",
    poster: pmWelfarePoster,
    posterLabel: "PM Welfare Schemes",
    posterAccent: "#22c55e",
    stats: [{ v: "100%", l: "Authorized", lOd: "ଅନୁମୋଦିତ" }, { v: "SSL", l: "Secured", lOd: "ସୁରାକ୍ଶିତ" }, { v: "Private", l: "Data", lOd: "ତଅଥ୍ଯ" }],
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
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused]);

  const slide = slides[current];

  return (
    <section
      className="relative overflow-hidden"
      style={{ paddingTop: "var(--header-h, 68px)", minHeight: "100svh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Backgrounds */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== current}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <div className="absolute inset-0" style={{ background: s.gradient }} />
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.12] blur-3xl pointer-events-none" style={{ backgroundColor: s.orb1 }} />
          <div className="absolute -bottom-48 -left-24 w-[400px] h-[400px] rounded-full opacity-[0.10] blur-3xl pointer-events-none" style={{ backgroundColor: s.orb2 }} />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
        style={{ minHeight: "calc(100svh - var(--header-h, 68px))", paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        {/* ── Left: text ──────────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-center max-w-xl">

          {/* Badge */}
          <motion.div
            key={`badge-${current}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 self-start rounded-full px-4 py-1.5 text-xs font-bold mb-4 border border-white/20 backdrop-blur-md bg-white/10 text-white uppercase tracking-widest"
          >
            <Sparkles size={11} className="opacity-80" />
            {slide.badge}
          </motion.div>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${current}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
              className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black text-white leading-[1.06] tracking-tight whitespace-pre-line"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {t(slide.titleEn, slide.titleOd)}
            </motion.h1>
          </AnimatePresence>

          {/* Accent bar */}
          <motion.div
            key={`bar-${current}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 h-1.5 w-16 rounded-full origin-left"
            style={{ backgroundColor: slide.accent }}
          />

          {/* Subtitle */}
          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="mt-4 text-sm sm:text-base text-white/80 max-w-md leading-relaxed"
          >
            {t(slide.subEn, slide.subOd)}
          </motion.p>

          {/* Stats */}
          <motion.div
            key={`stats-${current}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="mt-5 flex flex-wrap gap-6"
          >
            {slide.stats.map((s, i) => (
              <div key={i}>
                <div className="text-2xl font-black text-white leading-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.v}</div>
                <div className="text-[10px] text-white/50 font-semibold mt-0.5 uppercase tracking-widest">{t(s.l, s.lOd || s.l)}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            key={`cta-${current}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.32 }}
            className="mt-7 flex gap-3 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onBrowse}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#003366] font-extrabold px-7 py-3.5 rounded-full shadow-xl text-sm min-w-[190px] hover:shadow-2xl transition-all"
            >
              {t("Browse Services", "ସେବା ଦେଖନ୍ତୁ")}
              <ArrowDown size={15} />
            </motion.button>
            <motion.a
              href={`https://wa.me/${PHONE}?text=Hi, I need help with a CSC service.`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-extrabold px-7 py-3.5 rounded-full shadow-xl text-sm min-w-[190px] hover:bg-[#1da851] transition-all"
            >
              {t("WhatsApp Us", "WhatsApp ରେ ଯୋଗ")}
            </motion.a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-5 flex flex-wrap gap-2"
          >
            {[
              { en: "Govt. Authorized", od: "ସরকার অনুমোদিত", icon: "🏛️" },
              { en: "BoB BC Point", od: "BoB BC", icon: "🏦" },
              { en: "10+ Years", od: "10+ ବର୍ଷ", icon: "⭐" },
            ].map((b, i) => (
              <div key={i} className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                <span>{b.icon}</span>
                <span>{t(b.en, b.od)}</span>
              </div>
            ))}
          </motion.div>

          {/* Slide controls */}
          <div className="mt-8 flex items-center justify-between max-w-xs">
            <div className="flex items-center gap-2.5">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`}>
                  <div className={`h-1 rounded-full transition-all duration-500 ${i === current ? "w-8 bg-white" : "w-3 bg-white/30 hover:bg-white/50"}`} />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all">
                <ChevronLeft size={16} />
              </button>
              <button onClick={next} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Right: Real poster floating card (desktop only) ── */}
        <div className="hidden lg:flex flex-shrink-0 w-[340px] xl:w-[380px] items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`poster-${current}`}
              initial={{ opacity: 0, x: 40, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: -1.5 }}
              exit={{ opacity: 0, x: -30, rotate: 2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              {/* Glow behind poster */}
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-30"
                style={{ backgroundColor: slide.posterAccent }}
              />

              {/* Poster card */}
              <div className="relative rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.45)] border-2 border-white/20">
                <img
                  src={slide.poster}
                  alt={slide.posterLabel}
                  width={700}
                  height={990}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: "520px", contentVisibility: "auto" }}
                />
                {/* Label overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-gradient-to-t from-black/70 to-transparent">
                  <span className="text-white text-xs font-bold tracking-widest uppercase opacity-90">
                    {slide.posterLabel}
                  </span>
                </div>
              </div>

              {/* Floating "Digital India" pill */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-xl px-4 py-2 flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: `${slide.posterAccent}22` }}>
                  🇮🇳
                </div>
                <div>
                  <div className="text-[10px] font-black text-gray-800 leading-none">Digital India</div>
                  <div className="text-[9px] text-gray-500 leading-none mt-0.5">CSC Programme</div>
                </div>
              </motion.div>

              {/* Floating stat badge */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl px-4 py-2.5"
              >
                <div className="text-lg font-black text-[#003366] leading-none" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {slide.stats[0].v}
                </div>
                <div className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
                  {slide.stats[0].l}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
