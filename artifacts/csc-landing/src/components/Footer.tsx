import { ShieldCheck, BadgeCheck, Heart, Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const PHONE = "919437000000";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <>
      {/* Pre-footer CTA banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#F06421] via-[#e05010] to-[#c84000] py-14 px-5">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {t("Ready to Skip the Queue?", "ଲାଇନ ଛାଡ଼ିବାକୁ ପ୍ରସ୍ତୁତ?")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-white/85 text-base max-w-lg mx-auto"
          >
            {t(
              "Search your service, upload documents, and receive delivery — our simple 3-step process makes every government service effortless.",
              "ସେବା ଖୋଜନ୍ତୁ, ଦଲିଲ ଅପଲୋଡ କରନ୍ତୁ, ଡେଲିଭରି ପାନ୍ତୁ — ଆମ 3 ପଦକ୍ଷେପ ପ୍ରକ୍ରିୟାରେ।"
            )}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            <motion.a
              href="#services"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 bg-white text-[#F06421] font-extrabold px-8 py-4 rounded-full shadow-2xl shadow-black/20 text-sm sm:text-base hover:bg-gray-50 transition-all duration-200"
            >
              {t("Browse Services", "ସେବା ଦେଖନ୍ତୁ")}
            </motion.a>
            <motion.a
              href="#how-it-works"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 bg-white/15 border border-white/40 text-white font-bold px-8 py-4 rounded-full text-sm sm:text-base hover:bg-white/25 transition-all duration-200 backdrop-blur-sm"
            >
              {t("See How It Works", "କିପରି କାମ କରେ")}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#001f4d] text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F06421] to-[#c84000] flex items-center justify-center font-black text-xl shadow-lg">
                  S
                </div>
                <div>
                  <p className="font-extrabold text-base">{t("Bapi Bhai CSC", "ବାପି ଭାଇ CSC")}</p>
                  <p className="text-xs text-white/50">{t("Balasore, Odisha", "ବାଲେଶ୍ୱର, ଓଡ଼ିଶା")}</p>
                </div>
              </div>
              <p className="text-sm text-white/55 leading-relaxed mb-4">
                {t(
                  "Your trusted digital service center in Balasore — government services, banking, and more.",
                  "ବାଲେଶ୍ୱରରେ ଆପଣଙ୍କ ବିଶ୍ୱସ୍ତ ଡିଜିଟାଲ ସେବା କେନ୍ଦ୍ର।"
                )}
              </p>
              <div className="flex flex-col gap-2">
                <span className="inline-flex items-center gap-2 text-xs text-white/60">
                  <BadgeCheck size={13} className="text-[#F06421]" />
                  {t("Authorized VLE — CSC India", "ଅଧিকৃত VLE — CSC India")}
                </span>
                <span className="inline-flex items-center gap-2 text-xs text-white/60">
                  <ShieldCheck size={13} className="text-[#F06421]" />
                  {t("Verified Bank of Baroda BC Point", "BoB BC ପଏଣ୍ଟ ସ୍ୱୀকৃত")}
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <p className="font-bold text-sm mb-4 text-[#F06421] uppercase tracking-wider">
                {t("Quick Links", "ଦ୍ରୁତ ଲିଙ୍କ")}
              </p>
              <ul className="space-y-2.5 text-sm text-white/60">
                {[
                  { en: "All Services", od: "ସମସ୍ତ ସେবা", href: "#services" },
                  { en: "How It Works", od: "କିପରି କାମ କରେ", href: "#how-it-works" },
                  { en: "About Us", od: "ଆମ ବିଷୟ", href: "#about" },
                  { en: "FAQ", od: "FAQ", href: "#faq" },
                ].map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:text-white hover:translate-x-1 transition-all inline-block">
                      {t(link.en, link.od)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="font-bold text-sm mb-4 text-[#F06421] uppercase tracking-wider">
                {t("Contact", "ଯୋଗାଯୋଗ")}
              </p>
              <div className="space-y-3">
                <a href={`tel:+${PHONE}`} className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors group">
                  <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-[#F06421]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Phone size={13} className="text-[#F06421]" />
                  </div>
                  +91 94370 00000
                </a>
                <a href="mailto:csc.balasore@example.com" className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors group">
                  <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-[#F06421]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Mail size={13} className="text-[#F06421]" />
                  </div>
                  csc.balasore@example.com
                </a>
                <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors group">
                  <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-[#25D366]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <MessageCircle size={13} className="text-[#25D366]" />
                  </div>
                  WhatsApp Us
                </a>
                <div className="flex items-center gap-2.5 text-sm text-white/60">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <MapPin size={13} className="text-[#F06421]" />
                  </div>
                  {t("Near Main Road, Balasore", "ମୁଖ୍ୟ ରାସ୍ତା ନିକଟ, ବାଲେଶ୍ୱର")}
                </div>
              </div>
            </div>

            {/* Hours */}
            <div>
              <p className="font-bold text-sm mb-4 text-[#F06421] uppercase tracking-wider">
                {t("Working Hours", "ଦୁକାନ ସମୟ")}
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <Clock size={14} className="text-[#F06421] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white font-semibold">{t("Monday – Saturday", "ସୋମ – ଶନି")}</p>
                    <p className="text-xs text-white/50 mt-0.5">{t("9:00 AM – 6:00 PM", "ସକାଳ ୯ – ସଂଧ୍ୟା ୬")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock size={14} className="text-white/30 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-white/40 font-semibold">{t("Sunday", "ରବି")}</p>
                    <p className="text-xs text-white/30 mt-0.5">{t("Closed", "ବନ୍ଦ")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-green-400 font-semibold">{t("Currently Open", "ଏବେ ଖୋଲା")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col items-center gap-3">
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-white/35">
                © 2025 Bapi Bhai CSC, Balasore. {t("All rights reserved.", "ସର୍ବস্বত্ব সংরক্ষিত।")}
              </p>
              <p className="text-xs text-white/35 flex items-center gap-1.5">
                {t("Made with", "ତ‌ୈ‌ୟ‌ାର")} <Heart size={11} className="text-[#F06421]" /> {t("for Balasore, Odisha", "ବାଲେଶ୍ୱର ପ‌ାଇଁ")}
              </p>
            </div>
            <p className="text-xs text-white/25 text-center">
              Designed and Developed by{" "}
              <a
                href="https://vextor.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/45 hover:text-white transition-colors underline underline-offset-2"
              >
                Vextor Technologies Pvt Ltd
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
