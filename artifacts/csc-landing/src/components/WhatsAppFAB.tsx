import { motion } from "framer-motion";

const PHONE = "919437000000";

export default function WhatsAppFAB() {
  return (
    <motion.a
      href={`https://wa.me/${PHONE}?text=Hi, I need help with a CSC service in Balasore.`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 220, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.93 }}
      className="fixed bottom-6 right-4 z-30 w-12 h-12 flex items-center justify-center bg-[#25D366] rounded-full shadow-lg shadow-black/20"
      title="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
      <svg
        className="relative z-10 w-7 h-7"
        viewBox="0 0 32 32"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.824 1.78 6.848L2 30l7.352-1.754A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Zm0 25.5a11.43 11.43 0 0 1-5.826-1.594l-.418-.248-4.362 1.04 1.062-4.25-.274-.436A11.44 11.44 0 0 1 4.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5Zm6.29-8.594c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.546-.172-.776.172-.23.344-.89 1.118-1.09 1.348-.2.23-.4.258-.744.086-.344-.172-1.452-.536-2.766-1.708-1.022-.912-1.712-2.038-1.912-2.382-.2-.344-.022-.53.15-.702.155-.155.344-.402.516-.603.172-.2.23-.344.344-.574.115-.23.058-.43-.028-.602-.086-.172-.776-1.87-1.062-2.562-.28-.672-.564-.582-.776-.592l-.66-.012c-.23 0-.602.086-.918.43s-1.204 1.176-1.204 2.868 1.232 3.328 1.404 3.558c.172.23 2.424 3.7 5.872 5.19.82.354 1.46.566 1.96.724.824.262 1.574.224 2.167.136.66-.098 2.036-.832 2.322-1.636.286-.804.286-1.494.2-1.636-.086-.143-.316-.229-.66-.401Z" />
      </svg>
    </motion.a>
  );
}
