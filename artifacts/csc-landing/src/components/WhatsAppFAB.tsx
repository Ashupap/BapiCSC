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
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 220, damping: 20 }}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-4 z-50 flex items-center gap-2.5 bg-[#25D366] text-white rounded-full shadow-xl px-5 py-3.5 font-bold text-sm"
      title="Chat on WhatsApp"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
      <MessageCircle size={20} className="relative z-10 flex-shrink-0" />
      <span className="relative z-10 hidden sm:inline">
        {t("Chat Now", "ଚ୍ୟାଟ")}
      </span>
    </motion.a>
  );
}
