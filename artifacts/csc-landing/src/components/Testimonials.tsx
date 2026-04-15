import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = [
  {
    nameEn: "Priya Mohanty",
    nameOd: "ପ୍ରିୟା ମୋହାନ୍ତି",
    locationEn: "Balasore",
    locationOd: "ବାଲେଶ୍ୱର",
    avatarColor: "#F06421",
    initials: "PM",
    rating: 5,
    textEn: "Got my Income Certificate done in 4 days! I used to spend hours at government offices. Now I just WhatsApp Sanjay and it's done. Highly recommended to everyone in Balasore.",
    textOd: "ମୋ ଆୟ ପ୍ରମାଣ ୪ ଦିନ ମଧ୍ୟରେ ପ୍ରସ୍ତୁତ! ଆଗ ସରକାରୀ ଦଫ୍ତରରେ ଘଣ୍ଟା ଖର୍ଚ ହୁଏ। ଏବେ WhatsApp ରେ ପଠାଇ କାମ ସରେ।",
    serviceEn: "Income Certificate",
    serviceOd: "ଆୟ ପ୍ରମାଣପତ୍ର",
  },
  {
    nameEn: "Ramesh Panda",
    nameOd: "ରମେଶ ପଣ୍ଡା",
    locationEn: "Nilgiri, Balasore",
    locationOd: "ନୀଳଗିରି, ବାଲେଶ୍ୱର",
    avatarColor: "#003366",
    initials: "RP",
    rating: 5,
    textEn: "Opened a Bank of Baroda account and got my KALIA scheme linked — all in one visit! Sanjay sir explained everything patiently. This center is a blessing for our village.",
    textOd: "Bank of Baroda ଖାତା ଖୋଲିଲୁ ଏବଂ KALIA ଯୋଜନା ଲିଙ୍କ ହେଲା — ଏକ ଯାତ୍ରାରେ! ସଞ୍ଜୟ ସାର ସ୍ଥିରରେ ବୁଝାଇଲେ।",
    serviceEn: "Banking + KALIA Yojana",
    serviceOd: "ବ୍ୟାଙ୍କ + KALIA ଯୋଜନା",
  },
  {
    nameEn: "Sunita Sahoo",
    nameOd: "ସୁନୀତା ସାହୁ",
    locationEn: "Basta, Balasore",
    locationOd: "ବାସ୍ତା, ବାଲେଶ୍ୱର",
    avatarColor: "#F06421",
    initials: "SS",
    rating: 5,
    textEn: "Applied for my daughter's scholarship and PAN card both at once. Got WhatsApp updates throughout. The price is very fair and service is genuinely fast!",
    textOd: "ମୋ ଝିଅ ଛାତ୍ରବୃତ୍ତି ଓ PAN ଉଭୟ ଏକ ସାଥ ଆବେଦନ ହେଲା। WhatsApp ଅଦ୍ୟତନ ମିଳିଲା। ଦର ଠିକ ଓ ସେବା ଶୀଘ୍ର!",
    serviceEn: "Scholarship + PAN Card",
    serviceOd: "ଛାତ୍ରବୃତ୍ତି + PAN",
  },
];

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-[#F8FAFC] to-[#EEF4FF] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold tracking-[0.2em] text-[#F06421] uppercase mb-3"
          >
            {t("Customer Stories", "ଗ୍ରାହୀ ଅଭିଜ୍ଞତା")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl font-extrabold text-[#003366] leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {t("Trusted by 5000+ Families", "5000+ ପରିବାରଙ୍କ ବିଶ୍ୱାସ")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-3 text-gray-500 text-sm max-w-md mx-auto"
          >
            {t(
              "Real experiences from our community members in Balasore.",
              "ବାଲେଶ୍ୱରର ସମ୍ପ୍ରଦାୟ ସଦସ୍ୟଙ୍କ ବାସ୍ତବ ଅଭିଜ୍ଞତା।"
            )}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t_item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 flex flex-col relative"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote size={36} className="text-[#003366]" />
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t_item.rating }).map((_, si) => (
                  <Star key={si} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                {t(t_item.textEn, t_item.textOd)}
              </p>

              {/* Service tag */}
              <div className="mt-4 mb-5">
                <span className="inline-block text-xs font-semibold text-[#F06421] bg-orange-50 border border-orange-100 px-3 py-1 rounded-full">
                  {t(t_item.serviceEn, t_item.serviceOd)}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-gray-50 pt-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: t_item.avatarColor }}
                >
                  {t_item.initials}
                </div>
                <div>
                  <p className="font-bold text-[#003366] text-sm">{t(t_item.nameEn, t_item.nameOd)}</p>
                  <p className="text-xs text-gray-400">{t(t_item.locationEn, t_item.locationOd)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-5 max-w-md mx-auto"
        >
          <div className="text-center">
            <div className="text-4xl font-black text-[#003366]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>4.9</div>
            <div className="flex gap-0.5 justify-center mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
          </div>
          <div className="w-px h-10 bg-gray-100 hidden sm:block" />
          <div className="text-center sm:text-left">
            <p className="font-bold text-[#003366] text-sm">{t("Average Rating", "ହାରାହারি রেটিং")}</p>
            <p className="text-gray-400 text-xs mt-0.5">{t("Based on 5000+ customers served", "5000+ ଗ୍ରାହୀ ଅଭିଜ୍ଞତା")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
