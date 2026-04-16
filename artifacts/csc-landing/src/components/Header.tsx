import { useState, useEffect } from "react";
import { Search, ShieldCheck, BadgeCheck, Globe, Menu, X, MessageCircle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import cscKioskLogo from "@assets/CSC-Kiosk-Logo_1776321648152.png";

interface HeaderProps {
  onSearch: (q: string) => void;
  searchQuery: string;
}

const PHONE = "919437000000";
const OWNER_PHOTO = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face";

export default function Header({ onSearch, searchQuery }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--header-h", "68px");
  }, []);

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

            {/* Brand: CSC Kiosk logo + owner photo + name */}
            <a href="#" className="flex items-center gap-3 flex-shrink-0 group">
              {/* Owner photo */}
              <div className="relative flex-shrink-0">
                <img
                  src={OWNER_PHOTO}
                  alt="Sanjay Kumar"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border-2 border-[#F06421]/30 shadow-sm group-hover:border-[#F06421]/60 transition-all duration-300"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#25D366] rounded-full border-2 border-white" />
              </div>

              {/* CSC Kiosk logo */}
              <img
                src={cscKioskLogo}
                alt="CSC — Your Trusted Neighbourhood Kiosk"
                className="hidden sm:block h-9 w-auto object-contain"
              />

              {/* Name tag on mobile */}
              <div className="sm:hidden">
                <div className="font-extrabold text-[#003366] text-sm leading-tight">Sanjay Kumar</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <BadgeCheck size={9} className="text-[#F06421]" />
                  <span className="text-[10px] text-[#F06421] font-semibold">VLE</span>
                </div>
              </div>
            </a>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-gray-200 flex-shrink-0" />

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

              {/* CSC Kiosk logo in drawer */}
              <div className="flex items-center justify-center py-3 border-b border-gray-100 bg-gray-50">
                <img src={cscKioskLogo} alt="CSC Kiosk" className="h-10 w-auto object-contain" />
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
