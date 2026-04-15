import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Phone, Mail, MessageCircle, HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const faqs = [
  {
    qEn: "Is my Aadhaar information safe with you?",
    qOd: "ମୋ ଆଧار ତথ୍ୟ ଆপণঙ୍କ ସহ ସূرক্ষিত?",
    aEn: "Absolutely. We are a government-authorized CSC center. Your Aadhaar data is only used for the specific service you request and is never stored or shared with third parties. We follow UIDAI guidelines strictly.",
    aOd: "ନিশ্চয়। ঙ্গামে এক সরকার অনুমোদিত CSC কেন্দ্র। আপণঙ্কর আধার ডাটা শুধু ঙ্গাপণ অনুরোধ করিথিবা নির্দিষ্ট সেবা পাইঁ ব্যবহৃত।",
  },
  {
    qEn: "How long does an Income Certificate take?",
    qOd: "আয় প্রমাণপত্র কেতে দিন লাগে?",
    aEn: "Typically 3-7 working days for government-issued certificates. We provide WhatsApp status updates at every stage so you always know where your application stands.",
    aOd: "সাধারণতঃ ৩-৭ দিন লাগে। ঙ্গামে প্রত্যেক ধাপরে WhatsApp আপডেট দেউ।",
  },
  {
    qEn: "Can I apply for multiple services at once?",
    qOd: "ঙ্গামে একসঙ্গে একাধিক সেবা আবেদন করিপারি?",
    aEn: "Yes! Add multiple services to your basket and send one WhatsApp message. We handle all of them together, saving you multiple trips.",
    aOd: "ହঁ! ঝুড়িরে একাধিক সেবা যোড়নু ও এক WhatsApp বার্তা পঠানু। ঙ্গামে সব একসাথে সম্ভা঳ু।",
  },
  {
    qEn: "What payment methods do you accept?",
    qOd: "ঙ্গাপণ কেউঁ দেয় প্রণালী গ্রহণ করনতি?",
    aEn: "We accept cash, UPI (PhonePe, GPay, Paytm), and bank transfer. Payment details are confirmed over WhatsApp before you pay anything.",
    aOd: "ঙ্গামে নগদ, UPI (PhonePe, GPay, Paytm), ও ব্যাংক ট্রান্সফার গ্রহণ করু।",
  },
  {
    qEn: "Do I need to visit your office in person?",
    qOd: "মো ঙ্গাপণঙ্কর অফিস ব্যক্তিগত ভাবে পরিদর্শন করিবাকু পড়িব?",
    aEn: "For most digital services, your documents can be submitted via WhatsApp. For biometric services (Aadhaar, banking) a brief in-person visit may be needed. We'll confirm over WhatsApp first.",
    aOd: "অধিকাংশ ডিজিটাল সেবা পাইঁ দলিল WhatsApp দ্বারা দেয়। বায়ো-মেট্রিক সেবা পাইঁ এক সংক্ষিপ্ত ব্যক্তিগত আবশ্যক।",
  },
  {
    qEn: "Is this service available only in Balasore?",
    qOd: "এহি সেবা শুধু বালেশ্বরে উপলব্ধ?",
    aEn: "Our physical center is in Balasore, Odisha. However, for most digital services like PAN card, scholarship, railway booking — we can assist clients remotely via WhatsApp from anywhere in Odisha.",
    aOd: "ঙ্গামর ভৌতিক কেন্দ্র বালেশ্বরে। কিন্তু অধিকাংশ ডিজিটাল সেবার জন্য ওড়িশার যেকোনো জায়গা থেকে WhatsApp-এ সহায়তা করিপারু।",
  },
];

const PHONE = "919437000000";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-[#F8FAFC]" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#F06421] uppercase mb-3"
          >
            <HelpCircle size={13} />
            {t("Frequently Asked", "ਅਧਿਕ ਪ੍ਰਸ਼ਨ")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl font-extrabold text-[#003366]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {t("Common Questions", "ਸਾਧਾਰਣ ਪ੍ਰਸ਼ਨ")}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* FAQ list — takes 2 cols */}
          <div className="lg:col-span-2 space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                >
                  <span className="font-semibold text-[#003366] text-sm sm:text-base">
                    {t(faq.qEn, faq.qOd)}
                  </span>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      open === i ? "bg-[#F06421] text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <ChevronDown size={15} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                        {t(faq.aEn, faq.aOd)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact card — sticky sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-24 space-y-4"
          >
            {/* Map card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="bg-[#003366] px-5 py-3 flex items-center gap-2 text-white">
                <MapPin size={15} />
                <span className="font-bold text-sm">{t("Find Us", "ঙ্গামাকু খোজনু")}</span>
              </div>
              <div className="h-40 bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center gap-2 p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
                  <MapPin size={22} className="text-[#F06421]" />
                </div>
                <p className="text-sm font-bold text-[#003366]">
                  {t("CSC Center, Balasore", "CSC কেন্দ্ৰ, বালেশ্বর")}
                </p>
                <p className="text-xs text-gray-400">{t("Near Main Road, Balasore – 756001", "মূল রাস্তা নিকট – 756001")}</p>
                <a
                  href="https://maps.google.com/?q=Balasore+Odisha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-xs font-bold text-[#F06421] border border-[#F06421]/30 px-4 py-1 rounded-full hover:bg-[#F06421] hover:text-white transition-colors"
                >
                  {t("Open in Maps", "Maps-এ খোলু")}
                </a>
              </div>
            </div>

            {/* Contact card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-extrabold text-[#003366] text-base mb-4">{t("Contact Us", "যোগাযোগ করু")}</h3>
              <div className="space-y-3">
                <a href={`tel:+${PHONE}`} className="flex items-center gap-3 text-gray-700 hover:text-[#003366] transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-[#003366]/8 group-hover:bg-[#003366]/15 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Phone size={16} className="text-[#003366]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{t("Phone", "ফোন")}</p>
                    <p className="text-sm font-bold">+91 94370 00000</p>
                  </div>
                </a>
                <a href="mailto:csc.balasore@example.com" className="flex items-center gap-3 text-gray-700 hover:text-[#F06421] transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-[#F06421]/8 group-hover:bg-[#F06421]/15 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Mail size={16} className="text-[#F06421]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{t("Email", "ইমেল")}</p>
                    <p className="text-sm font-bold">csc.balasore@example.com</p>
                  </div>
                </a>
                <a
                  href={`https://wa.me/${PHONE}?text=Hi, I need help with a CSC service.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-700 hover:text-[#25D366] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#25D366]/10 group-hover:bg-[#25D366]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <MessageCircle size={16} className="text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">WhatsApp</p>
                    <p className="text-sm font-bold">+91 94370 00000</p>
                  </div>
                </a>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-xl">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                {t("Open Mon–Sat, 9 AM – 6 PM", "সোম–শনি, সকাল ৯টা – সন্ধ্যা ৬টা")}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
