import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Phone, Mail, MessageCircle, HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const faqs = [
  {
    qEn: "Is my Aadhaar information safe with you?",
    qOd: "ମୋ ଆଧାର ତଅଥ୍ଯ ଆପନାଙକ ସହ ସୁରାକ୍ଶିତ?",
    aEn: "Absolutely. We are a government-authorized CSC center. Your Aadhaar data is only used for the specific service you request and is never stored or shared. We follow UIDAI guidelines strictly.",
    aOd: "ନିଶ୍ଚଯ। ଆମେ େକ ସରକାର ଅନୁମୋଦିତ CSC କେନ୍ଦର।",
  },
  {
    qEn: "How long does an Income Certificate take?",
    qOd: "ଆଯା ପ୍ରମାଣଅପଅତ୍ର କେତେ ଦିନ ଲାଗେ?",
    aEn: "Typically 3-7 working days for government-issued certificates. We provide WhatsApp status updates at every stage.",
    aOd: "ସାଧାରଣଅତା: 3–7 କାରଯ୍ଯ ଦିବସ ଲାଗେ। ପରଅଥ୍ଯେକ ଧାପଅ WhatsApp ଅଦ୍ଯଅତନ ଦେୋଯାଜାେ।",
  },
  {
    qEn: "Can I apply for multiple services at once?",
    qOd: "େକ ସାଙଗେରେ େକାଧିକ ସେବା ଆବେଦନା କରିପାରିବା?",
    aEn: "Yes! Apply for multiple services via WhatsApp. We handle all of them together.",
    aOd: "ହଅଂ! WhatsApp ଜଅରିଯା େକାଧିକ ସେବା ଆବେଦନା କରିପାରେ।",
  },
  {
    qEn: "What payment methods do you accept?",
    qOd: "କେୁନ ଦେବା ପରଣାଲି ଗରଅହଣଅ କରନ୍ତୁ?",
    aEn: "We accept cash, UPI (PhonePe, GPay, Paytm), and bank transfer. Payment is confirmed over WhatsApp before you pay.",
    aOd: "ନଅକଦା, UPI (PhonePe, GPay, Paytm), Bank ହଅସ୍ତାନ୍ତଅର ଗରଅହଣଅ କରନ୍ତୁ।",
  },
  {
    qEn: "Do I need to visit your office in person?",
    qOd: "ଆପନାଙକ ଦଅଫ୍ତଅର ଜାିବା ଦଅରକାର?",
    aEn: "For most digital services, documents can be submitted via WhatsApp. For biometric services a brief in-person visit may be needed.",
    aOd: "ଅଧିକାଂଶ ଦିଜିତାଲ ସେବା WhatsApp ଜଅରିଯା ଦେୋଯାଯାେ।",
  },
  {
    qEn: "Is this service available only in Balasore?",
    qOd: "େହି ସେବା କେବଅ ବାଲେଶ୍ଵରରେ ୁପଅଲଅବ୍ଧ?",
    aEn: "Our center is in Balasore but for digital services like PAN, scholarship, railway — we assist clients via WhatsApp from anywhere in Odisha.",
    aOd: "ଆମଅର କେନ୍ଦର ବାଲେଶ୍ଵରରେ ଅଚି। PAN ଓ ଆର୍ ସେବା — WhatsApp ଜଅରିଯା ୋଦିଶାର ଆରୁ ସଅହାଯଅତା ଦେୋଯାଯାେ।",
  },
];

const PHONE = "919437000000";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-[#F8FAFC]" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#F06421] uppercase mb-3"
          >
            <HelpCircle size={13} />
            {t("Frequently Asked", "ବାରମ୍ବାର ଜିଜ୍ନାସା")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl font-extrabold text-[#003366]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {t("Common Questions", "ସାଧାରଣ ପ୍ରଶ୍ନ")}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
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

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-24 space-y-4"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="bg-[#003366] px-5 py-3 flex items-center gap-2 text-white">
                <MapPin size={15} />
                <span className="font-bold text-sm">{t("Find Us", "ଆମାକୁ ଖୋଜନ୍ତୁ")}</span>
              </div>
              <div className="h-40 bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center gap-2 p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
                  <MapPin size={22} className="text-[#F06421]" />
                </div>
                <p className="text-sm font-bold text-[#003366]">
                  {t("CSC Center, Balasore", "CSC କେନ୍ଦର, ବାଲେଶ୍ଵର")}
                </p>
                <p className="text-xs text-gray-400">{t("Near Main Road, Balasore – 756001", "ମୁଖଯ ରାସ୍ତା ନିକତ, ବାଲେଶ୍ଵର – 756001")}</p>
                <a
                  href="https://maps.google.com/?q=Balasore+Odisha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-xs font-bold text-[#F06421] border border-[#F06421]/30 px-4 py-1 rounded-full hover:bg-[#F06421] hover:text-white transition-colors"
                >
                  {t("Open in Maps", "Maps ରେ ଖୋଜନ୍ତୁ")}
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-extrabold text-[#003366] text-base mb-4">{t("Contact Us", "ଯୋଗାଯୋଗ କରନ୍ତୁ")}</h3>
              <div className="space-y-3">
                <a href={`tel:+${PHONE}`} className="flex items-center gap-3 text-gray-700 hover:text-[#003366] transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-[#003366]/8 group-hover:bg-[#003366]/15 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Phone size={16} className="text-[#003366]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{t("Phone", "ଫୋନ")}</p>
                    <p className="text-sm font-bold">+91 94370 00000</p>
                  </div>
                </a>
                <a href="mailto:csc.balasore@example.com" className="flex items-center gap-3 text-gray-700 hover:text-[#F06421] transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-[#F06421]/8 group-hover:bg-[#F06421]/15 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Mail size={16} className="text-[#F06421]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">{t("Email", "ିେମେଲ")}</p>
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
                {t("Open Mon–Sat, 9 AM – 6 PM", "ସୋମ–ଶନି, ସାକାଲ 9 – ସଅନ୍ଧଯା 6")}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}