import { motion } from "framer-motion";
import { ShieldCheck, Clock, Award, Users, Zap, Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const highlights = [
  {
    icon: Award,
    color: "#F06421",
    en: "10+ Years Experience",
    od: "10+ ବର୍ଷ ଅଭିଜ୍ଞତା",
  },
  {
    icon: Users,
    color: "#003366",
    en: "5000+ Customers Served",
    od: "5000+ ଗ୍ରାହୀ ସେବା",
  },
  {
    icon: Clock,
    color: "#F06421",
    en: "Same-Day Processing",
    od: "ସେଦିନ ପ୍ରକ୍ରିୟାକରଣ",
  },
  {
    icon: ShieldCheck,
    color: "#003366",
    en: "100% Govt. Authorized",
    od: "100% ସରକାର ଅନୁମୋଦିତ",
  },
  {
    icon: Zap,
    color: "#F06421",
    en: "IT Infrastructure Expert",
    od: "IT ଭିତ୍ତିଭୂମି ବିଶେଷଜ୍ଞ",
  },
  {
    icon: Lock,
    color: "#003366",
    en: "Data Security First",
    od: "ଡ଼ାଟା ସୁରକ୍ଷା ପ୍ରଥମ",
  },
];

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="py-14 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold tracking-widest text-[#F06421] uppercase">
              {t("About The Expert", "ବিশেষজ্ঞ সম্পর্কে")}
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#003366] leading-tight">
              {t(
                "Your Digital Custodian in Balasore",
                "ବ֍ালেশ্বরের আপনার ডিজিটাল সংরক্ষক"
              )}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {t(
                "With over 10 years in IT Infrastructure and digital services, I've helped thousands of families in Balasore navigate government procedures without stress. As a Verified Bank of Baroda BC Point and Authorized CSC-VLE, every service I provide is 100% legitimate, fast, and secure.",
                "IT ভিত্তিভূমি ও ডিজিটাল সেবায় ১০+ বছরের অভিজ্ঞতা নিয়ে, আমি বালেশ্বরে হাজারো পরিবারকে সরকারি প্রক্রিয়া ঝামেলামুক্তভাবে সম্পন্ন করতে সাহায্য করেছি। একজন স্বীকৃত BoB BC পয়েন্ট ও অনুমোদিত CSC-VLE হিসেবে, আমার প্রতিটি সেবা ১০০% বৈধ, দ্রুত ও নিরাপদ।"
              )}
            </p>
            <div className="mt-4 p-4 bg-gradient-to-r from-[#003366]/5 to-[#F06421]/5 rounded-xl border border-[#003366]/10">
              <p className="text-[#003366] font-semibold text-sm italic">
                "{t(
                  "Your data stays private. Your time stays yours. I take the queue so you don't have to.",
                  "আপনার তথ্য গোপন থাকে। আপনার সময় আপনার থাকে। আমি লাইনে দাঁড়াই যাতে আপনাকে দাঁড়াতে না হয়।"
                )}"
              </p>
              <p className="mt-2 text-[#F06421] text-xs font-bold">
                — {t("Sanjay Kumar, Founder & VLE", "সঞ্জয় কুমার, প্রতিষ্ঠাতা ও VLE")}
              </p>
            </div>
          </motion.div>

          {/* Right: Highlights grid */}
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
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#F8FAFC] rounded-xl p-4 text-center border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                  style={{ backgroundColor: `${h.color}15` }}
                >
                  <h.icon size={20} style={{ color: h.color }} />
                </div>
                <p className="text-xs font-semibold text-[#003366] leading-tight">
                  {t(h.en, h.od)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
