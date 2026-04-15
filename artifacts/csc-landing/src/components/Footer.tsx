import { ShieldCheck, BadgeCheck, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#003366] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#F06421] flex items-center justify-center font-bold text-lg shadow">
                S
              </div>
              <div>
                <p className="font-bold text-base">{t("Sanjay Kumar CSC", "সঞ্জয় কুমার CSC")}</p>
                <p className="text-xs text-white/60">{t("Balasore, Odisha", "বালেশ্বর, ওড়িশা")}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs text-white/70">
                <BadgeCheck size={13} className="text-[#F06421]" />
                {t("Authorized VLE — CSC India", "অনুমোদিত VLE — CSC India")}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-white/70">
                <ShieldCheck size={13} className="text-[#F06421]" />
                {t("Verified Bank of Baroda BC Point", "স্বীকৃত BoB BC পয়েন্ট")}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-bold text-sm mb-3 text-[#F06421]">
              {t("Quick Links", "দ্রুত লিংক")}
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {t("All Services", "সমস্ত সেবা")}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  {t("How It Works", "কীভাবে কাজ করে")}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {t("About Us", "আমাদের সম্পর্কে")}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {t("FAQ", "FAQ")}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <p className="font-bold text-sm mb-3 text-[#F06421]">
              {t("Working Hours", "কর্মঘণ্টা")}
            </p>
            <div className="space-y-1.5 text-xs text-white/70">
              <p>{t("Monday – Saturday", "সোমবার – শনিবার")}</p>
              <p className="text-white font-semibold text-sm">{t("9:00 AM – 6:00 PM", "সকাল ৯টা – সন্ধ্যা ৬টা")}</p>
              <p className="mt-3">{t("Sunday", "রবিবার")}</p>
              <p className="text-white/50">{t("Closed", "বন্ধ")}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © 2025 Sanjay Kumar CSC, Balasore. {t("All rights reserved.", "সর্বস্বত্ব সংরক্ষিত।")}
          </p>
          <p className="text-xs text-white/40 flex items-center gap-1">
            {t("Made with", "তৈরি করা হয়েছে")} <Heart size={11} className="text-[#F06421]" /> {t("for Balasore", "বালেশ্বরের জন্য")}
          </p>
        </div>
      </div>
    </footer>
  );
}
