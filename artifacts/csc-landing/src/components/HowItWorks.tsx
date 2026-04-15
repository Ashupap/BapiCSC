import { motion } from "framer-motion";
import { Search, Upload, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const steps = [
  {
    icon: Search,
    number: "01",
    accentColor: "#F06421",
    stepEn: "Search",
    stepOd: "ଖୋଜନ୍ତୁ",
    titleEn: "Find Your Service",
    titleOd: "ଆପଣଙ୍କ ସେବା ଖୋଜନ୍ତୁ",
    descEn: "Use our smart search to find from 100+ services. View exact documents required instantly.",
    descOd: "100+ ସେବା ମଧ୍ୟରୁ ଆପଣଙ୍କ ଆବଶ୍ୟକ ସେବା ଖୋଜନ୍ତୁ। ଆବଶ୍ୟକ ଦଲିଲ ତୁରନ୍ତ ଦେଖନ୍ତୁ।",
  },
  {
    icon: Upload,
    number: "02",
    accentColor: "#60a5fa",
    stepEn: "Upload",
    stepOd: "ଅପଲୋଡ",
    titleEn: "Upload Documents",
    titleOd: "ଦଲିଲ ଅପଲୋଡ କରନ୍ତୁ",
    descEn: "Snap photos of your documents and upload securely. Progress tracked in real-time.",
    descOd: "ଦଲିଲ ଫୋଟୋ ଉଠାଇ ନିରାପଦରେ ଅପଲୋଡ କରନ୍ତୁ। ଅଗ୍ରଗତି ତୁରନ୍ତ ଦେଖନ୍ତୁ।",
  },
  {
    icon: MessageCircle,
    number: "03",
    accentColor: "#4ade80",
    stepEn: "WhatsApp",
    stepOd: "WhatsApp",
    titleEn: "Get Quote on WhatsApp",
    titleOd: "WhatsApp ରେ ଉଦ୍ଧୃତ ପାନ୍ତୁ",
    descEn: "Receive your quote and digital delivery directly on WhatsApp. Fast. Simple. Trusted.",
    descOd: "ଆପଣଙ୍କ ଉଦ୍ଧୃତ ଓ ଡିଜିଟାଲ ଡେଲିଭରି WhatsApp ରେ। ଶୀଘ୍ର। ସରଳ। ବିଶ୍ୱସ୍ତ।",
  },
];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section
      className="py-20 relative overflow-hidden"
      id="how-it-works"
      style={{ background: "linear-gradient(135deg, #001a40 0%, #002a5c 60%, #003a7a 100%)" }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold tracking-[0.2em] text-[#F06421] uppercase mb-3"
          >
            {t("Simple Process", "ସରଳ ପ୍ରକ୍ରିୟା")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl font-extrabold text-white leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {t("3 Steps to Done", "3 ପଦକ୍ଷେପରେ ସଂପୂର୍ଣ")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-3 text-white/55 text-sm sm:text-base max-w-md mx-auto"
          >
            {t("From search to delivery — we handle it all.", "ଖୋଜ ଠାରୁ ଡେଲିଭରି — ଆମେ ସବୁ ସ‌ମ୍ଭାଳୁ।")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connector */}
          <div className="hidden sm:block absolute top-14 left-[30%] right-[30%] h-px bg-gradient-to-r from-[#F06421]/60 via-[#60a5fa]/60 to-[#4ade80]/60 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.13, duration: 0.55 }}
              className="relative z-10 group"
            >
              <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-7 h-full hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                {/* Step number */}
                <div
                  className="text-6xl font-black leading-none mb-4 select-none"
                  style={{
                    color: step.accentColor,
                    opacity: 0.15,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 -mt-10"
                  style={{ backgroundColor: `${step.accentColor}20`, border: `1px solid ${step.accentColor}40` }}
                >
                  <step.icon size={22} style={{ color: step.accentColor }} />
                </div>

                <div
                  className="text-[10px] font-bold tracking-[0.15em] uppercase mb-2"
                  style={{ color: step.accentColor }}
                >
                  {t(step.stepEn, step.stepOd)}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {t(step.titleEn, step.titleOd)}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed">
                  {t(step.descEn, step.descOd)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
