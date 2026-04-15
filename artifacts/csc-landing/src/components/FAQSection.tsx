import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const faqs = [
  {
    qEn: "Is my Aadhaar information safe with you?",
    qOd: "ମୋ ଆଧାର ତଥ୍ୟ ଆପଣଙ୍କ ସହ ସୁରକ୍ଷିତ?",
    aEn: "Absolutely. We are a government-authorized CSC center. Your Aadhaar data is only used for the specific service you request and is never stored or shared with third parties. We follow UIDAI guidelines strictly.",
    aOd: "ନିଶ୍ଚୟ। ଆମ ଏକ ସରକାର ଅନୁମୋଦିତ CSC କେନ୍ଦ୍ର। ଆପଣଙ୍କ ଆଧାର ଡ଼ାଟା ଶୁଧୁ ଆପଣ ଅନୁରୋଧ କରିଥିବା ନିର୍ଦ୍ଦିଷ୍ଟ ସେବା ପାଇଁ ବ୍ୟବହୃତ, କଦାପି ସଂରଚିତ ନ ହୁଏ।",
  },
  {
    qEn: "How long does an Income Certificate take?",
    qOd: "ଆୟ ପ୍ରମାଣପତ୍ର କେତେ ଦିନ ଲାଗେ?",
    aEn: "Typically 3-7 working days for government-issued certificates. We provide WhatsApp status updates at every stage so you always know where your application stands.",
    aOd: "ସରକାର ଦ୍ୱାରା ଜାରି ପ୍ରମାଣ ସାଧାରଣତଃ ୩-୭ ଦିନ ଲାଗେ। ଆମ ପ୍ରତ୍ୟେକ ଧାପରେ WhatsApp ଅଦ୍ୟତନ ଦେଉ।",
  },
  {
    qEn: "Can I apply for multiple services at once?",
    qOd: "ଆମ ଏକ ସଙ୍ଗେ ଏକାଧିକ ସେବା ଆବେଦନ କରିପାରି?",
    aEn: "Yes! Add multiple services to your basket and send one WhatsApp message. We handle all of them together, saving you multiple trips.",
    aOd: "ହଁ! ଆପଣଙ୍କ ଝୁଡ଼ିରେ ଏକାଧିକ ସେবା ଯୋଡ଼ନ୍ତୁ ଓ ଏକ WhatsApp ବାର୍ତ୍ତା ପଠାନ୍ତୁ। ଆମ ସବୁ ଏକ ସାଥ ସଂଭାଳୁ।",
  },
  {
    qEn: "What payment methods do you accept?",
    qOd: "ଆପଣ କେଉଁ ଦେୟ ପ୍ରଣାଳୀ ଗ୍ରହଣ କରନ୍ତି?",
    aEn: "We accept cash, UPI (PhonePe, GPay, Paytm), and bank transfer. Payment details are confirmed over WhatsApp before you pay anything.",
    aOd: "ଆମ ନଗଦ, UPI (PhonePe, GPay, Paytm), ଓ ବ୍ୟାଙ୍କ ଟ୍ରାନ୍ସଫର ଗ୍ରହଣ କରୁ। ଦେୟ ବୃତ୍ତାନ୍ତ WhatsApp ରେ ଦୃଢ଼ ହୁଏ।",
  },
  {
    qEn: "Do I need to visit your office in person?",
    qOd: "ମୋ ଆପଣଙ୍କ ଅଫିସ ବ୍ୟକ୍ତିଗତ ଭାବେ ପରିଦର୍ଶନ କରିବାକୁ ପଡ଼ିବ?",
    aEn: "For most digital services, your documents can be submitted via WhatsApp. For biometric services (Aadhaar, banking) a brief in-person visit may be needed. We'll confirm over WhatsApp first.",
    aOd: "ଅଧିକାଂଶ ଡ଼ିଜ଼ିଟାଲ ସେବା ପାଇଁ ଦଲିଲ WhatsApp ଦ୍ୱାରା ଦେୟ। ବାୟୋ-ମେଟ୍ରିକ ସେବା ପାଇଁ ଏକ ସଂକ୍ଷିପ୍ତ ବ୍ୟକ୍ତିଗତ ଆବଶ୍ୟକ।",
  },
  {
    qEn: "Is this service available only in Balasore?",
    qOd: "ଏହି ସେବା ଶୁଧୁ ବ֍ালেশ্বরে উপলব্ধ?",
    aEn: "Our physical center is in Balasore, Odisha. However, for most digital services like PAN card, scholarship, railway booking — we can assist clients remotely via WhatsApp from anywhere in Odisha.",
    aOd: "ଆମ ଭୌତିକ କେନ୍ଦ୍ର ବ֍ালেশ্বরে। কিন্তু অধিকাংশ ডিজিটাল সেবার জন্য আমরা ওড়িশার যেকোনো জায়গা থেকে WhatsApp-এ সহায়তা করতে পারি।",
  },
];

const PHONE = "919437000000";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section className="py-14 bg-[#F8FAFC]" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-[#F06421] uppercase">
            {t("Frequently Asked", "ଅଧିକ ପ୍ରଶ୍ନ")}
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#003366]">
            {t("Common Questions", "ସାଧାରଣ ପ୍ରଶ୍ନ")}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-[#003366] text-sm sm:text-base pr-4">
                  {t(faq.qEn, faq.qOd)}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={18} className="text-[#F06421]" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
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

        {/* Map + Contact */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Map placeholder */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="bg-[#003366] px-5 py-3 flex items-center gap-2 text-white">
              <MapPin size={16} />
              <span className="font-semibold text-sm">
                {t("Find Us", "ଆମ ଖୋଜନ୍ତୁ")}
              </span>
            </div>
            <div className="relative h-48 bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="mx-auto text-[#F06421] mb-2" />
                <p className="text-sm font-semibold text-[#003366]">
                  {t("CSC Center, Balasore, Odisha", "CSC କেন্দ্র, বালেশ্বর, ওড়িশা")}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {t("Near Main Road, Balasore – 756001", "মূল রাস্তা নিকট, বালেশ্বর – 756001")}
                </p>
                <a
                  href="https://maps.google.com/?q=Balasore+Odisha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs text-[#F06421] font-semibold border border-[#F06421] rounded-full px-4 py-1 hover:bg-[#F06421] hover:text-white transition-colors"
                >
                  {t("Open in Maps", "ম্যাপে খুলুন")}
                </a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-[#003366] text-lg mb-4">
              {t("Contact Us", "যোগাযোগ করুন")}
            </h3>
            <div className="space-y-3">
              <a
                href={`tel:+${PHONE}`}
                className="flex items-center gap-3 text-gray-700 hover:text-[#003366] transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-[#003366]/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-[#003366]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{t("Phone", "ফোন")}</p>
                  <p className="text-sm font-semibold">+91 94370 00000</p>
                </div>
              </a>
              <a
                href="mailto:csc.balasore@example.com"
                className="flex items-center gap-3 text-gray-700 hover:text-[#003366] transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-[#F06421]/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-[#F06421]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{t("Email", "ইমেল")}</p>
                  <p className="text-sm font-semibold">csc.balasore@example.com</p>
                </div>
              </a>
              <a
                href={`https://wa.me/${PHONE}?text=Hi, I need help with a CSC service.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-700 hover:text-[#25D366] transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={16} className="text-[#25D366]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">WhatsApp</p>
                  <p className="text-sm font-semibold">+91 94370 00000</p>
                </div>
              </a>
            </div>
            <p className="mt-4 text-xs text-gray-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
              {t("Open Mon–Sat, 9 AM – 6 PM", "সোমবার–শনিবার, সকাল ৯টা – সন্ধ্যা ৬টা")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
