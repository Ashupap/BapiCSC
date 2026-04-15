import { motion } from "framer-motion";
import { ShieldCheck, Clock, Award, Users, Zap, Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const stats = [
  { value: "10+", labelEn: "Years Experience", labelOd: "ବର୍ଷ ଅଭିଜ୍ଞତା", icon: Award, color: "#F06421" },
  { value: "5000+", labelEn: "Customers Served", labelOd: "ଗ୍ରାହୀ ସେବା", icon: Users, color: "#003366" },
  { value: "100+", labelEn: "Services Available", labelOd: "ସେବା ଉପଲବ୍ଧ", icon: Zap, color: "#F06421" },
  { value: "Same Day", labelEn: "Processing", labelOd: "ପ୍ରକ୍ରିୟାକରଣ", icon: Clock, color: "#003366" },
];

const highlights = [
  { icon: ShieldCheck, color: "#003366", en: "100% Govt. Authorized", od: "100% ସରକାର ଅନୁମୋଦିତ" },
  { icon: Lock, color: "#F06421", en: "Data Security First", od: "ଡ଼ାଟା ସୁରକ୍ଷା ପ୍ରଥମ" },
  { icon: Award, color: "#003366", en: "10+ Years Expertise", od: "10+ ବର୍ଷ ଅଭିଜ୍ଞତା" },
  { icon: Users, color: "#F06421", en: "5000+ Happy Clients", od: "5000+ ସନ୍ତୁଷ୍ଟ ଗ୍ରାହୀ" },
  { icon: Zap, color: "#003366", en: "Same-Day Processing", od: "ସେଦିନ ପ୍ରକ୍ରିୟାକରଣ" },
  { icon: ShieldCheck, color: "#F06421", en: "IT Infrastructure Expert", od: "IT ଭିତ୍ତିଭୂମି ବିଶେଷଜ୍ଞ" },
];

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <>
      {/* Stats strip */}
      <section className="bg-[#003366] py-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center justify-center py-7 px-4 text-center"
              >
                <div
                  className="text-3xl sm:text-4xl font-extrabold text-white mb-1 leading-none"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-white/55 font-medium tracking-wide uppercase">
                  {t(s.labelEn, s.labelOd)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About content */}
      <section className="py-20 bg-[#F8FAFC]" id="about">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-bold tracking-[0.2em] text-[#F06421] uppercase mb-3">
                {t("About The Expert", "ବିଶେଷଜ୍ଞ ବିଷୟରେ")}
              </span>
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-[#003366] leading-tight mb-5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {t("Your Digital Custodian\nin Balasore", "ବାଲେଶ୍ୱରରେ ଆପଣଙ୍କ\nଡିଜିଟାଲ ସଂରକ୍ଷକ")}
              </h2>
              <p className="text-gray-600 leading-relaxed text-base mb-6">
                {t(
                  "With over 10 years in IT Infrastructure and digital services, I've helped thousands of families in Balasore navigate government procedures without stress. As a Verified Bank of Baroda BC Point and Authorized CSC-VLE, every service I provide is 100% legitimate, fast, and secure.",
                  "IT ଭିତ୍ତିଭୂମି ଓ ଡିଜିଟାଲ ସେବାରେ 10+ ବର୍ଷ ଅଭିଜ୍ଞତା ସହ, ଆମେ ବାଲେଶ୍ୱରର ହଜାରେ ପରିବାରଙ୍କୁ ଚିନ୍ତାମୁକ୍ତ ଭାବରେ ସରକାରୀ ପ୍ରକ୍ରିୟା ସଂପୂର୍ଣ୍ଣ କରିବାରେ ସାହାଯ୍ୟ କରିଛୁ।"
                )}
              </p>

              {/* Quote card */}
              <div className="relative pl-5 border-l-4 border-[#F06421]">
                <p className="text-[#003366] font-semibold text-base italic leading-relaxed">
                  "{t(
                    "Your data stays private. Your time stays yours. I take the queue so you don't have to.",
                    "ଆପଣଙ୍କ ଡ଼ାଟା ଗୋପନ ରହେ। ଆପଣଙ୍କ ସମୟ ଆପଣଙ୍କ ନିଜ। ମୁଁ ଲାଇନ ଦିଏ ଯାହାଫଳରେ ଆପଣଙ୍କୁ ଦେବାକୁ ପଡ଼ୁ ନ ଥାଏ।"
                  )}"
                </p>
                <p className="mt-3 text-[#F06421] text-sm font-bold">
                  — {t("Sanjay Kumar, Founder & VLE", "ସଞ୍ଜୟ କୁମାର, ପ୍ରତିଷ୍ଠାତା ଓ VLE")}
                </p>
              </div>
            </motion.div>

            {/* Right: Credential grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-5 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: `${h.color}12` }}
                  >
                    <h.icon size={22} style={{ color: h.color }} />
                  </div>
                  <p className="text-xs font-semibold text-[#003366] leading-snug">
                    {t(h.en, h.od)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
