import { useState, useEffect } from "react";
import { Search, ShieldCheck, BadgeCheck, Globe, Menu, X, MessageCircle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  onSearch: (q: string) => void;
  searchQuery: string;
}

const PHONE = "919437000000";

const CENTER_PHOTOS = [
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=80&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&h=80&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1573496546038-82f9c39f6365?w=200&h=80&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&h=80&fit=crop&crop=center",
];

const OWNER_PHOTO = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face";

function CSCLogo({ size = "sm" }: { size?: "sm" | "md" }) {
  const h = size === "md" ? "h-9" : "h-7";
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/en/5/5b/CSC_Logo.png"
      alt="CSC India"
      className={`${h} w-auto object-contain`}
      onError={(e) => {
        const el = e.currentTarget;
        el.style.display = "none";
        const span = document.createElement("span");
        span.className = "text-xs font-black text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded";
        span.innerText = "CSC India";
        el.parentElement?.appendChild(span);
      }}
    />
  );
}

function BoBLogo({ size = "sm" }: { size?: "sm" | "md" }) {
  const h = size === "md" ? "h-9" : "h-7";
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Bank_of_Baroda_logo.svg/200px-Bank_of_Baroda_logo.svg.png"
      alt="Bank of Baroda"
      className={`${h} w-auto object-contain`}
      onError={(e) => {
        const el = e.currentTarget;
        el.style.display = "none";
        const span = document.createElement("span");
        span.className = "text-xs font-black text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded";
        span.innerText = "Bank of Baroda";
        el.parentElement?.appendChild(span);
      }}
    />
  );
}

export default function Header({ onSearch, searchQuery }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--header-h", scrolled ? "68px" : "124px");
  }, [scrolled]);

  const navLinks = [
    { labelEn: "Services", labelOd: "ସେବା", href: "#services" },
    { labelEn: "How It Works", labelOd: "କିପରି", href: "#how-it-works" },
    { labelEn: "About", labelOd: "ବିଷୟ", href: "#about" },
    { labelEn: "Contact", labelOd: "ଯୋଗ", href: "#faq" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "bg-white/97 backdrop-blur-xl shadow-[0_2px_24px_rgba(0,51,102,0.12)]"
            : "bg-white shadow-md"
        }`}
      >
        {/* ── Main nav row ─────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-4 h-[68px]">

            {/* Owner avatar + name */}
            <a href="#" className="flex items-center gap-3 flex-shrink-0 group">
              {/* Photo avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={OWNER_PHOTO}
                  alt="Sanjay Kumar"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover shadow-md border-2 border-[#F06421]/30 group-hover:border-[#F06421]/60 transition-all duration-300"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#25D366] rounded-full border-2 border-white shadow-sm" />
              </div>
              {/* Name + badges */}
              <div className="hidden sm:block">
                <div className="font-extrabold text-[#003366] text-sm leading-tight">
                  {t("Sanjay Kumar", "ସଞ୍ଜୟ କୁମାର")}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-[#F06421] font-semibold">
                    <BadgeCheck size={9} />
                    {t("VLE", "VLE")}
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-[#003366] font-semibold">
                    <ShieldCheck size={9} />
                    {t("BoB BC Point", "BoB BC")}
                  </span>
                </div>
              </div>
            </a>

            {/* Search */}
            <div className="flex-1 relative max-w-sm mx-auto">
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

            {/* Right cluster */}
            <div className="flex items-center gap-2 flex-shrink-0">
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

        {/* ── Photo strip + Brand logos row (visible only when NOT scrolled) ── */}
        <AnimatePresence>
          {!scrolled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 56, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-gray-100 bg-gray-50/80"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
                {/* CSC Logo */}
                <div className="flex-shrink-0 hidden sm:flex items-center gap-2 pr-4 border-r border-gray-200">
                  <CSCLogo size="md" />
                </div>

                {/* Photos strip */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
                  {CENTER_PHOTOS.map((src, i) => (
                    <div key={i} className="flex-shrink-0 relative rounded-lg overflow-hidden h-9 w-20 sm:w-28 bg-gray-200">
                      <img
                        src={src}
                        alt={`CSC Center ${i + 1}`}
                        className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {i === 0 && (
                        <div className="absolute inset-0 bg-[#003366]/20 flex items-end px-1.5 pb-1">
                          <span className="text-white text-[9px] font-bold leading-tight">Service Center</span>
                        </div>
                      )}
                      {i === 1 && (
                        <div className="absolute inset-0 bg-[#F06421]/20 flex items-end px-1.5 pb-1">
                          <span className="text-white text-[9px] font-bold leading-tight">Document Help</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* BoB Logo */}
                <div className="flex-shrink-0 hidden sm:flex items-center gap-2 pl-4 border-l border-gray-200">
                  <BoBLogo size="md" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

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
                    alt="Sanjay Kumar"
                    className="w-10 h-10 rounded-xl object-cover border-2 border-white/30"
                  />
                  <div>
                    <p className="font-bold text-white text-sm">{t("Sanjay Kumar CSC", "ସଞ୍ଜୟ CSC")}</p>
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

              {/* Brand logos in mobile drawer */}
              <div className="flex items-center justify-center gap-6 py-3 border-b border-gray-100 bg-gray-50">
                <CSCLogo size="sm" />
                <div className="w-px h-5 bg-gray-200" />
                <BoBLogo size="sm" />
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
