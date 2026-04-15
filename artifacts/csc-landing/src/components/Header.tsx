import { useState, useEffect } from "react";
import { Search, ShieldCheck, BadgeCheck, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  onSearch: (q: string) => void;
  searchQuery: string;
}

export default function Header({ onSearch, searchQuery }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Single flex row: avatar | info + search | lang toggle */}
        <div className="flex items-center gap-3 sm:gap-4 py-2.5">

          {/* Avatar — centered vertically in the full header row */}
          <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-[#F06421] to-[#e05010] flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-md border-[3px] border-white ring-2 ring-[#F06421]/30 flex-shrink-0 select-none"
            style={{ width: "clamp(52px,8vw,72px)", height: "clamp(52px,8vw,72px)", fontSize: "clamp(1.25rem,3vw,1.875rem)" }}>
            S
          </div>

          {/* Middle column: owner info + search bar stacked */}
          <div className="flex-1 flex flex-col gap-1.5 min-w-0">
            {/* Owner name + badges row */}
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="font-bold text-[#003366] text-sm sm:text-base leading-tight truncate">
                  {t("Sanjay Kumar CSC", "ସଞ୍ଜୟ କୁମାର CSC")}
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="inline-flex items-center gap-0.5 text-[10px] sm:text-xs text-[#F06421] font-medium">
                    <BadgeCheck size={11} />
                    {t("Authorized VLE", "ଅଧିକୃତ VLE")}
                  </span>
                  <span className="text-gray-300 text-xs">|</span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] sm:text-xs text-[#003366] font-medium">
                    <ShieldCheck size={11} />
                    {t("Verified BoB BC Point", "BoB BC ପଏଣ୍ଟ ସ୍ୱୀକୃତ")}
                  </span>
                </div>
              </div>

              {/* Language Toggle */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Globe size={14} className="text-gray-400 hidden sm:block" />
                <div className="flex items-center rounded-full border-2 border-[#003366]/20 overflow-hidden bg-gray-50">
                  <button
                    onClick={() => setLang("en")}
                    className={`px-2.5 py-1 text-[10px] sm:text-xs font-semibold transition-all duration-200 ${
                      lang === "en"
                        ? "bg-[#003366] text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLang("od")}
                    className={`px-2.5 py-1 text-[10px] sm:text-xs font-semibold transition-all duration-200 ${
                      lang === "od"
                        ? "bg-[#F06421] text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    ଓଡ଼ିଆ
                  </button>
                </div>
              </div>
            </div>

            {/* Search bar */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F06421]"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder={t(
                  "Search 100+ services: Income Certificate, PAN Card, Banking...",
                  "100+ ସେବା ଖୋଜନ୍ତୁ: ଆୟ ପ୍ରମାଣ, PAN, ବ୍ୟାଙ୍କିଂ..."
                )}
                className="w-full pl-9 pr-3 py-2 rounded-xl border-2 border-[#003366]/20 focus:border-[#F06421] focus:outline-none text-xs sm:text-sm bg-gray-50 focus:bg-white transition-all"
              />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
