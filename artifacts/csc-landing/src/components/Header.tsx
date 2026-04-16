import { useState, useEffect, useRef } from "react";
import { Search, ShieldCheck, BadgeCheck, Globe, Menu, X, MessageCircle, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import cscKioskLogo from "@assets/CSC-Kiosk-Logo_1776321648152.png";
import bobLogo from "@assets/BankOfBarodaLogo_1776323550390.png";

interface HeaderProps {
  onSearch: (q: string) => void;
  searchQuery: string;
}

const PHONE = "919437000000";
const OWNER_PHOTO = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face";

const QUICK_SUGGESTIONS = [
  "Aadhaar", "PAN Card", "Passport", "Income Certificate",
  "Bank Account", "Insurance", "Pension", "Driving Licence",
];

export default function Header({ onSearch, searchQuery }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const overlayInputRef = useRef<HTMLInputElement>(null);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--header-h", "68px");
  }, []);

  useEffect(() => {
    if (mobileSearchOpen) {
      setTimeout(() => overlayInputRef.current?.focus(), 120);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileSearchOpen]);

  const handleOverlaySearch = (q: string) => {
    setLocalQuery(q);
    onSearch(q);
  };

  const handleSuggestion = (s: string) => {
    setLocalQuery(s);
    onSearch(s);
    setMobileSearchOpen(false);
    setTimeout(() => {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleOverlayClose = () => {
    setMobileSearchOpen(false);
  };

  const navLinks = [
    { labelEn: "Services", labelOd: "ସେବା", href: "#services" },
    { labelEn: "How It Works", labelOd: "କିପରି", href: "#how-it-works" },
    { labelEn: "About", labelOd: "ବିଷୟ", href: "#about" },
    { labelEn: "Contact", labelOd: "ଯୋଗ", href: "#faq" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/97 backdrop-blur-xl shadow-[0_2px_24px_rgba(0,51,102,0.12)]"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-4 h-[68px]">

            {/* Brand */}
            <a href="#" className="flex items-center gap-3 flex-shrink-0 group">
              <div className="relative flex-shrink-0">
                <img
                  src={OWNER_PHOTO}
                  alt="Bapi Bhai"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-[#F06421]/40 shadow-md group-hover:border-[#F06421] transition-all duration-300"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#25D366] rounded-full border-2 border-white shadow-sm" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="font-extrabold text-[#003366] text-sm leading-tight">
                  {t("Bapi Bhai CSC", "ବାପି ଭାଇ CSC")}
                </div>
                <div className="text-[10px] text-gray-500 leading-tight mt-0.5 hidden sm:block">
                  {t("Balasore, Odisha", "ବାଲେଶ୍ୱର, ଓଡ଼ିଶା")}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-[#F06421] font-bold">
                    <BadgeCheck size={9} />VLE
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-[#003366] font-bold">
                    <ShieldCheck size={9} />BoB BC
                  </span>
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-2 ml-1">
                <img src={cscKioskLogo} alt="CSC Kiosk" className="h-8 w-auto object-contain" />
                <div className="w-px h-6 bg-gray-200" />
                <img src={bobLogo} alt="Bank of Baroda" className="h-7 w-auto object-contain" />
              </div>
            </a>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-gray-200 flex-shrink-0" />

            {/* Search — desktop/tablet only */}
            <div className="hidden sm:block flex-1 relative max-w-sm mx-auto">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F06421]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder={t("Search 100+ services…", "100+ ସେବା ଖୋଜନ୍ତୁ…")}
                className="w-full pl-9 pr-4 py-2.5 rounded-full border-2 border-[#003366]/15 focus:border-[#F06421] focus:outline-none text-sm bg-gray-50 focus:bg-white transition-all duration-200"
              />
            </div>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-semibold text-gray-600 hover:text-[#003366] rounded-lg hover:bg-[#003366]/5 transition-all"
                >
                  {t(link.labelEn, link.labelOd)}
                </a>
              ))}
            </nav>

            {/* Right cluster — ml-auto pushes it to the far right on mobile (where no flex-1 search exists) */}
            <div className="flex items-center gap-2 flex-shrink-0 ml-auto sm:ml-0">
              <Globe size={13} className="text-gray-400 hidden sm:block" />
              <div className="flex items-center rounded-full border border-[#003366]/20 overflow-hidden bg-gray-50 text-xs font-bold">
                <button
                  onClick={() => setLang("en")}
                  className={`px-2.5 py-1.5 transition-all ${lang === "en" ? "bg-[#003366] text-white" : "text-gray-500"}`}
                >EN</button>
                <button
                  onClick={() => setLang("od")}
                  className={`px-2.5 py-1.5 transition-all ${lang === "od" ? "bg-[#F06421] text-white" : "text-gray-500"}`}
                >ଓ</button>
              </div>

              <a
                href={`https://wa.me/${PHONE}?text=Hi, I need help with a CSC service.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md hover:bg-[#1da851] transition-all"
              >
                <MessageCircle size={14} />
                {t("WhatsApp", "WhatsApp")}
              </a>

              <button
                onClick={() => setMobileOpen(true)}
                className="xl:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-600"
              >
                <Menu size={20} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Floating search pill — mobile only ───────────────────────── */}
      <AnimatePresence>
        {!mobileSearchOpen && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 260, delay: 0.3 }}
            className="sm:hidden fixed bottom-5 left-4 right-4 z-40"
          >
            <button
              onClick={() => setMobileSearchOpen(true)}
              className="w-full flex items-center gap-3 px-4 py-3.5 bg-[#F06421] rounded-2xl shadow-[0_8px_32px_rgba(240,100,33,0.45)] active:scale-[0.98] transition-transform"
            >
              {/* Icon bubble */}
              <span className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/20 flex-shrink-0">
                <Search size={17} className="text-white" />
              </span>

              {/* Placeholder text */}
              <span className="flex-1 text-left">
                <span className="block text-sm font-semibold text-white">
                  {searchQuery
                    ? searchQuery
                    : t("Search 100+ services…", "100+ ସେବା ଖୋଜନ୍ତୁ…")}
                </span>
                <span className="block text-[11px] text-white/70 mt-0.5">
                  {t("Aadhaar · PAN · Passport · Bank & more", "ଆଧାର · PAN · ପାସପୋର୍ଟ · ବ୍ୟାଙ୍କ")}
                </span>
              </span>

              {/* Active query badge */}
              {searchQuery && (
                <span className="flex-shrink-0 text-[10px] font-bold bg-white/25 text-white px-2 py-0.5 rounded-full">
                  {t("Active", "ସଦ୍ୟ")}
                </span>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Full-screen search overlay — mobile only ──────────────────── */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="sm:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[80]"
              onClick={handleOverlayClose}
            />

            {/* Panel — slides up from bottom */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="sm:hidden fixed bottom-0 left-0 right-0 z-[90] bg-white rounded-t-3xl shadow-2xl"
              style={{ maxHeight: "88vh" }}
            >
              {/* Handle bar */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-gray-200" />
              </div>

              {/* Search input row */}
              <div className="px-4 pt-2 pb-3 flex items-center gap-3">
                <div className="flex-1 relative">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F06421]" />
                  <input
                    ref={overlayInputRef}
                    type="search"
                    value={localQuery}
                    onChange={(e) => handleOverlaySearch(e.target.value)}
                    placeholder={t("Search 100+ services…", "100+ ସେବା ଖୋଜନ୍ତୁ…")}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#F06421]/40 focus:border-[#F06421] focus:outline-none text-sm bg-gray-50 focus:bg-white transition-all duration-200"
                  />
                </div>
                <button
                  onClick={handleOverlayClose}
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-500 active:bg-gray-200"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100 mx-4" />

              {/* Quick suggestions */}
              <div className="px-4 pt-4 pb-2">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles size={11} className="text-[#F06421]" />
                  {t("Popular services", "ଲୋକପ୍ରିୟ ସେବା")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestion(s)}
                      className="px-3 py-1.5 rounded-full border border-[#003366]/15 text-xs font-semibold text-[#003366] bg-[#003366]/5 hover:bg-[#003366]/10 active:scale-95 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA row */}
              <div className="px-4 pt-4 pb-6">
                <button
                  onClick={() => {
                    handleOverlayClose();
                    setTimeout(() => {
                      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="w-full py-3.5 bg-[#003366] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
                >
                  <Search size={15} />
                  {localQuery
                    ? t(`Search for "${localQuery}"`, `"${localQuery}" ଖୋଜନ୍ତୁ`)
                    : t("Browse All Services", "ସମସ୍ତ ସେବା ଦେଖନ୍ତୁ")}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b bg-[#003366]">
                <div className="flex items-center gap-3">
                  <img
                    src={OWNER_PHOTO}
                    alt="Bapi Bhai"
                    className="w-10 h-10 rounded-xl object-cover border-2 border-white/30"
                  />
                  <div>
                    <p className="font-bold text-white text-sm">{t("Bapi Bhai CSC", "ବାପି ଭାଇ CSC")}</p>
                    <p className="text-white/60 text-xs">{t("Balasore, Odisha", "ବାଲେଶ୍ୱର")}</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 py-3 border-b border-gray-100 bg-gray-50">
                <img src={cscKioskLogo} alt="CSC Kiosk" className="h-9 w-auto object-contain" />
                <div className="w-px h-6 bg-gray-200" />
                <img src={bobLogo} alt="Bank of Baroda" className="h-8 w-auto object-contain" />
              </div>

              <nav className="flex-1 p-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-[#003366]/5 hover:text-[#003366] group"
                  >
                    {t(link.labelEn, link.labelOd)}
                    <ChevronRight size={15} className="text-gray-300 group-hover:text-[#003366]" />
                  </a>
                ))}
              </nav>

              <div className="p-4 border-t">
                <a
                  href={`https://wa.me/${PHONE}?text=Hi, I need help with a CSC service.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white font-bold rounded-xl shadow-md hover:bg-[#1da851]"
                >
                  <MessageCircle size={18} />
                  {t("Chat on WhatsApp", "WhatsApp ରେ ଚ୍ୟାଟ")}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
