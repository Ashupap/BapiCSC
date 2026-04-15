import { useLanguage } from "@/contexts/LanguageContext";

export default function ExpressRibbon() {
  const { t } = useLanguage();

  const items = t(
    "SKIP THE QUEUE: Income Certificate | Caste Certificate | BoB Banking | PAN Card | FASTag | KALIA Yojana | Electricity Bill | Aadhaar Update | Railway Ticket | Voter ID | Passport | GST Registration | Scholarship | Health Card | Driving License | Money Transfer",
    "ଲାଇନ ଛାଡ଼ନ୍ତୁ: ଆୟ ପ୍ରମାଣ | ଜାତି ପ୍ରମାଣ | BoB ବ୍ୟାଙ୍କ | PAN କାର୍ଡ | FASTag | କାଳିଆ ଯୋଜନା | ବିଦ୍ୟୁତ ବିଲ | ଆଧାର ଅଦ୍ୟତନ | ରେଳ ଟିକଟ | ଭୋଟର ଆଇଡି | ପାସପୋର୍ଟ | GST ନିବନ୍ଧନ | ବୃତ୍ତି | ସ୍ୱାସ୍ଥ୍ୟ କାର୍ଡ"
  );

  return (
    <div className="bg-[#F06421] text-white py-2.5 overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-[#003366] px-4 py-1 text-xs font-bold tracking-wider z-10">
          {t("EXPRESS", "ଶୀଘ୍ର")}
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex animate-[marquee_35s_linear_infinite] whitespace-nowrap">
            <span className="text-xs font-medium px-8">{items}</span>
            <span className="text-xs font-medium px-8" aria-hidden>{items}</span>
            <span className="text-xs font-medium px-8" aria-hidden>{items}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
