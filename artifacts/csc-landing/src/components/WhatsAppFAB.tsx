import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PHONE = "919437000000";

export default function WhatsAppFAB() {
  const { t } = useLanguage();
  return (
    <motion.a
      href={`https://wa.me/${PHONE}?text=Hi, I need help with a CSC service in Balasore.`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-4 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-200 px-4 py-3"
      title="Chat on WhatsApp"
    >
      <MessageCircle size={22} />
      <span className="text-sm font-bold hidden sm:inline">
        {t("Chat Now", "এখন কথা বলুন")}
      </span>
    </motion.a>
  );
}
