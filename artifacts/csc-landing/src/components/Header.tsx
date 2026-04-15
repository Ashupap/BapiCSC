import { useState, useEffect } from "react";
import { Search, ShieldCheck, BadgeCheck, Globe, Menu, X, MessageCircle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  onSearch: (q: string) => void;
  searchQuery: string;
}

const PHONE = "919437000000";

export default function Header({ onSearch, searchQuery }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { labelEn: "Services", labelOd: "ସେବା", href: "#services" },
    { labelEn: "How It Works", labelOd: "କିପରି", href: "#how-it-works" },
    { labelEn: "About", labelOd: "ବିଷୟ", href: "#about" },
    { labelEn: "Contact", labelOd: "ଯୋଗାଯୋଗ", href: "#faq" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_32px_rgba(0,51,102,0.10)]"
            : "bg-white/90 backdrop-blur-md"
        }`}
        style={{ "--header-h": scrolled ? "64px" : "80px" } as React.CSSProperties}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 h-16 sm:h-20">

            {/* Brand */}
            <a href="#" className="flex items-center gap-3 flex-shrink-0 group">
              <div
                className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#F06421] to-[#c84e00] flex items-center justify-center text-white font-black text-lg shadow-lg shadow-orange-200 group-hover:shadow-orange-300 transition-shadow duration-300 select-none"
              >
                S
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#25D366] rounded-full border-2 border-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-extrabold text-[#003366] text-sm leading-tight">
                  {t("Sanjay Kumar CSC", "ସଞ୍ଜୟ କୁମାର CSC")}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-[#F06421] font-semibold">
                    <BadgeCheck size={9} />
                    {t("Authorized VLE", "ଅଧିକୃତ VLE")}
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-[#003366] font-semibold">
                    <ShieldCheck size={9} />
                    {t("BoB BC Point", "BoB BC ପଏଣ୍ଟ")}
                  </span>
                </div>
              </div>
            </a>

            {/* Search bar — always visible */}
            <div className="flex-1 relative max-w-md mx-auto">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#F06421]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder={t(
                  "Search 100+ services…",
                  "100+ ସେବା ଖୋଜନ୍ତୁ…"
                )}
                className="w-full pl-9 pr-4 py-2.5 rounded-full border-2 border-[#003366]/15 focus:border-[#F06421] focus:outline-none text-sm bg-gray-50/80 focus:bg-white transition-all duration-200 shadow-sm"
              />
            </div>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-semibold text-gray-600 hover:text-[#003366] rounded-lg hover:bg-[#003366]/5 transition-all duration-150"
                >
                  {t(link.labelEn, link.labelOd)}
                </a>
              ))}
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Language Toggle */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <Globe size={13} className="text-gray-400 hidden sm:block" />
                <div className="flex items-center rounded-full border border-[#003366]/20 overflow-hidden bg-gray-50 text-xs font-bold">
                  <button
                    onClick={() => setLang("en")}
                    className={`px-2.5 py-1.5 transition-all duration-200 ${
                      lang === "en" ? "bg-[#003366] text-white" : "text-gray-500 hover:text-[#003366]"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLang("od")}
                    className={`px-2.5 py-1.5 transition-all duration-200 ${
                      lang === "od" ? "bg-[#F06421] text-white" : "text-gray-500 hover:text-[#F06421]"
                    }`}
                  >
                    ଓ
                  </button>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${PHONE}?text=Hi, I need help with a CSC service.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-md shadow-green-200 hover:shadow-green-300 hover:bg-[#1da851] transition-all duration-200"
              >
                <MessageCircle size={14} />
                {t("WhatsApp", "WhatsApp")}
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
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
              className="fixed inset-0 bg-black/40 z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-[70] shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b bg-[#003366]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F06421] flex items-center justify-center text-white font-black text-base">
                    S
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{t("Sanjay Kumar CSC", "ସଞ୍ଜୟ CSC")}</p>
                    <p className="text-white/60 text-xs">{t("Balasore, Odisha", "ବାଲେଶ୍ୱର")}</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-[#003366]/5 hover:text-[#003366] transition-colors group"
                  >
                    {t(link.labelEn, link.labelOd)}
                    <ChevronRight size={15} className="text-gray-300 group-hover:text-[#003366] transition-colors" />
                  </a>
                ))}
              </nav>

              <div className="p-4 border-t">
                <a
                  href={`https://wa.me/${PHONE}?text=Hi, I need help with a CSC service.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white font-bold rounded-xl shadow-md hover:bg-[#1da851] transition-colors"
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
