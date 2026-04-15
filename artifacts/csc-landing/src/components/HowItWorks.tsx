import { motion } from "framer-motion";
import { Search, Upload, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const steps = [
  {
    icon: Search,
    color: "#003366",
    stepEn: "1. Search",
    stepOd: "୧. ଖୋଜନ୍ତୁ",
    titleEn: "Find Your Service",
    titleOd: "ଆପଣଙ୍କ ସେବା ଖୋଜନ୍ତୁ",
    descEn: "Use our smart search to find from 100+ services. View exact documents required instantly.",
    descOd: "100+ ସେବା ମଧ୍ୟରୁ ଆପଣଙ୍କ ଆବଶ୍ୟକ ସେବା ଖୋଜନ୍ତୁ। ଆବଶ୍ୟକ ଦଲିଲ ତୁରନ୍ତ ଦେଖନ୍ତୁ।",
  },
  {
    icon: Upload,
    color: "#F06421",
    stepEn: "2. Upload",
    stepOd: "୨. ଅପଲୋଡ",
    titleEn: "Upload Documents",
    titleOd: "ଦଲିଲ ଅପଲୋଡ କରନ୍ତୁ",
    descEn: "Snap photos of your documents and upload securely. Progress tracked in real-time.",
    descOd: "ଦଲିଲ ଫୋଟୋ ଉଠାଇ ନିରାପଦରେ ଅପଲୋଡ କରନ୍ତୁ। ଅଗ୍ରଗତି ତୁରନ୍ତ ଦେଖନ୍ତୁ।",
  },
  {
    icon: MessageCircle,
    color: "#25D366",
    stepEn: "3. WhatsApp",
    stepOd: "୩. WhatsApp",
    titleEn: "Get Quote on WhatsApp",
    titleOd: "WhatsApp ରେ ଉଦ୍ଧୃତ ପାନ୍ତୁ",
    descEn: "Receive your quote and digital delivery directly on WhatsApp. Fast. Simple. Trusted.",
    descOd: "ଆପଣଙ୍କ ଉଦ୍ଧୃତ ଓ ଡିଜିଟାଲ ଡେଲିଭରି WhatsApp ରେ। ଶୀଘ୍ର। ସରଳ। ବିଶ୍ୱସ୍ତ।",
  },
];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section className="py-14 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-[#F06421] uppercase">
            {t("How It Works", "ଏହା କିପରି କାର୍ଯ୍ୟ କରେ")}
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#003366]">
            {t("3 Simple Steps to Get Your Work Done", "ଆପଣଙ୍କ କାମ ୩ ସହଜ ପଦକ୍ଷେପରେ")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
          {/* Connector line on desktop */}
          <div className="hidden sm:block absolute top-12 left-[22%] right-[22%] h-0.5 bg-gradient-to-r from-[#003366] via-[#F06421] to-[#25D366] opacity-20 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative z-10 bg-[#F8FAFC] rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md"
                style={{ backgroundColor: step.color }}
              >
                <step.icon size={28} className="text-white" />
              </div>
              <div className="text-xs font-bold tracking-wider mb-1" style={{ color: step.color }}>
                {t(step.stepEn, step.stepOd)}
              </div>
              <h3 className="text-lg font-bold text-[#003366] mb-2">
                {t(step.titleEn, step.titleOd)}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t(step.descEn, step.descOd)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
