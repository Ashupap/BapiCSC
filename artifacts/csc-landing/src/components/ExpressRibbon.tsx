import { useLanguage } from "@/contexts/LanguageContext";

export default function ExpressRibbon() {
  const { t } = useLanguage();

  const items = t(
    "⚡ SKIP THE QUEUE · Income Certificate · Caste Certificate · BoB Banking · PAN Card · FASTag · KALIA Yojana · Electricity Bill · Aadhaar Update · Railway Ticket · Voter ID · Passport · GST Registration · Scholarship · Health Card · Driving License · Money Transfer",
    "⚡ ଲæ Line ଛাD়নੁ · ଆয় ਪ੍ਰਮਾਣ · ਜਾਤਿ ਪ੍ਰਮਾਣ · BoB ਬੈਂਕ · PAN ਕਾਰਡ · FASTag · ਕਾਲੀਆ ਯੋਜਨਾ · ਬਿਜਲੀ ਬਿੱਲ · ਆਧਾਰ ਅਪਡੇਟ · ਰੇਲ ਟਿਕਟ · ਵੋਟਰ ID · ਪਾਸਪੋਰਟ"
  );

  return (
    <div
      className="relative overflow-hidden py-3"
      style={{ background: "linear-gradient(90deg, #003366 0%, #004080 40%, #F06421 100%)" }}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-transparent via-white to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />

      <div className="flex items-center">
        {/* Label */}
        <div className="flex-shrink-0 flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-1 border-r border-white/20 z-10">
          <span className="text-[10px] font-black tracking-[0.25em] text-white uppercase">
            {t("EXPRESS", "ਸ਼ੀਘਰ")}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
        </div>

        {/* Scrolling ticker */}
        <div className="overflow-hidden flex-1">
          <div className="flex animate-[marquee_40s_linear_infinite] whitespace-nowrap">
            <span className="text-xs font-semibold text-white/90 px-10 tracking-wide">{items}</span>
            <span className="text-xs font-semibold text-white/90 px-10 tracking-wide" aria-hidden>{items}</span>
            <span className="text-xs font-semibold text-white/90 px-10 tracking-wide" aria-hidden>{items}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
