import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import {
  Plus, Minus, ShoppingCart, X, CheckCircle2, FileText,
  MessageCircle, Upload, Check, ChevronDown
} from "lucide-react";
import { services, categories, Service } from "@/data/services";
import { useLanguage } from "@/contexts/LanguageContext";

function generateTicketId() {
  return "CSC" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

const PHONE = "919437000000";

interface BasketItem {
  service: Service;
  ticketId: string;
}

interface UploadState {
  [serviceId: string]: {
    status: "idle" | "uploading" | "done";
    progress: number;
  };
}

interface ServiceEngineProps {
  searchQuery: string;
}

export default function ServiceEngine({ searchQuery }: ServiceEngineProps) {
  const { t, lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [basketOpen, setBasketOpen] = useState(false);
  const [uploadStates, setUploadStates] = useState<UploadState>({});
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({});
  const fileRefs = useRef<{ [k: string]: HTMLInputElement | null }>({});

  const fuse = useMemo(
    () =>
      new Fuse(services, {
        keys: ["name", "nameOdia", "category", "categoryOdia", "description"],
        threshold: 0.4,
      }),
    []
  );

  const filtered = useMemo(() => {
    let base = searchQuery
      ? fuse.search(searchQuery).map((r) => r.item)
      : services;
    if (selectedCategory !== "All") {
      base = base.filter((s) => s.category === selectedCategory);
    }
    return base;
  }, [searchQuery, selectedCategory, fuse]);

  function addToBasket(svc: Service) {
    if (!basket.find((b) => b.service.id === svc.id)) {
      setBasket((prev) => [...prev, { service: svc, ticketId: generateTicketId() }]);
      setBasketOpen(true);
    }
  }

  function removeFromBasket(id: string) {
    setBasket((prev) => prev.filter((b) => b.service.id !== id));
  }

  function simulateUpload(serviceId: string) {
    setUploadStates((prev) => ({
      ...prev,
      [serviceId]: { status: "uploading", progress: 0 },
    }));
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20 + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadStates((prev) => ({
          ...prev,
          [serviceId]: { status: "done", progress: 100 },
        }));
      } else {
        setUploadStates((prev) => ({
          ...prev,
          [serviceId]: { status: "uploading", progress },
        }));
      }
    }, 300);
  }

  function getWhatsAppLink(item: BasketItem) {
    const name = lang === "od" ? item.service.nameOdia : item.service.name;
    const msg = encodeURIComponent(
      `Hi, I want to apply for *${name}*. My Ticket ID is *${item.ticketId}*. Please guide me on the next steps.`
    );
    return `https://wa.me/${PHONE}?text=${msg}`;
  }

  function getBasketWhatsAppLink() {
    const names = basket
      .map((b) => (lang === "od" ? b.service.nameOdia : b.service.name))
      .join(", ");
    const ids = basket.map((b) => b.ticketId).join(", ");
    const msg = encodeURIComponent(
      `Hi, I want to apply for: *${names}*. Ticket IDs: *${ids}*. Please guide me.`
    );
    return `https://wa.me/${PHONE}?text=${msg}`;
  }

  const allCats = ["All", ...categories];

  return (
    <section id="services" className="py-14 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold tracking-widest text-[#F06421] uppercase">
            {t("Service Engine", "ସେବା ଇଞ୍ଜିନ")}
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#003366]">
            {t("100+ Government & Banking Services", "100+ ସରକାରୀ ଓ ବ୍ୟାଙ୍କ ସେବା")}
          </h2>
          <p className="mt-2 text-gray-500 text-sm">
            {t(
              "Add services to your basket and get a quote on WhatsApp instantly.",
              "ଝୁଡ଼ିରେ ସେବା ଯୋଡ଼ନ୍ତୁ ଓ WhatsApp ରେ ତୁରନ୍ତ ଉଦ୍ଧୃତ ପାନ୍ତୁ।"
            )}
          </p>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide">
          {allCats.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border ${
                selectedCategory === cat
                  ? "bg-[#003366] text-white border-[#003366]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#003366] hover:text-[#003366]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Basket FAB */}
        {basket.length > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => setBasketOpen(true)}
            className="fixed bottom-20 right-4 z-40 bg-[#003366] text-white rounded-full px-5 py-3 flex items-center gap-2 shadow-2xl hover:bg-[#004488] transition-colors"
          >
            <ShoppingCart size={18} />
            <span className="font-bold text-sm">{basket.length}</span>
            <span className="hidden sm:inline text-sm">
              {t("View Basket", "ଝୁଡ଼ି ଦେଖନ୍ତୁ")}
            </span>
          </motion.button>
        )}

        {/* Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16 text-gray-500"
              >
                <FileText size={40} className="mx-auto mb-3 text-gray-300" />
                <p>{t("No services found. Try a different search.", "କୋଣସି ସେବା ମିଳିଲା ନାହିଁ। ଅଲଗା ଖୋଜ ଚେଷ୍ଟା କରନ୍ତୁ।")}</p>
              </motion.div>
            ) : (
              filtered.map((svc, i) => {
                const inBasket = basket.some((b) => b.service.id === svc.id);
                const upload = uploadStates[svc.id];
                return (
                  <motion.div
                    key={svc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: Math.min(i * 0.03, 0.3) }}
                    className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-all group"
                  >
                    {/* Category tag */}
                    <span className="text-xs font-semibold text-[#F06421] bg-orange-50 px-2.5 py-1 rounded-full">
                      {lang === "od" ? svc.categoryOdia : svc.category}
                    </span>

                    {/* Name */}
                    <h3 className="mt-2.5 font-bold text-[#003366] text-base leading-tight">
                      {lang === "od" ? svc.nameOdia : svc.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-500 mt-1">
                      {lang === "od" ? svc.descriptionOdia : svc.description}
                    </p>

                    {/* Price */}
                    <div className="mt-2 text-sm font-semibold text-[#003366]">
                      {svc.base_price_range}
                    </div>

                    {/* Document Checklist (shows when in basket) */}
                    {inBasket && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 bg-blue-50 rounded-xl p-3 border border-blue-100"
                      >
                        <p className="text-xs font-bold text-[#003366] mb-2">
                          {t("Required Documents:", "ଆବଶ୍ୟକ ଦଲିଲ:")}
                        </p>
                        <div className="space-y-1.5">
                          {(lang === "od" ? svc.required_docs_odia : svc.required_docs).map((doc, di) => {
                            const key = `${svc.id}-${di}`;
                            return (
                              <label key={di} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={!!checklist[key]}
                                  onChange={(e) =>
                                    setChecklist((prev) => ({
                                      ...prev,
                                      [key]: e.target.checked,
                                    }))
                                  }
                                  className="w-3.5 h-3.5 accent-[#003366]"
                                />
                                <span className="text-xs text-gray-700">{doc}</span>
                              </label>
                            );
                          })}
                        </div>

                        {/* Upload Zone */}
                        <div className="mt-3">
                          {!upload || upload.status === "idle" ? (
                            <button
                              onClick={() => simulateUpload(svc.id)}
                              className="w-full border-2 border-dashed border-[#F06421]/40 rounded-lg py-2.5 text-xs text-[#F06421] font-medium hover:bg-orange-50 transition-colors flex items-center justify-center gap-1.5"
                            >
                              <Upload size={14} />
                              {t("Upload Documents", "ଦଲିଲ ଅପଲୋଡ")}
                            </button>
                          ) : upload.status === "uploading" ? (
                            <div>
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>{t("Uploading...", "ଅପଲୋଡ ହେଉଛି...")}</span>
                                <span>{Math.round(upload.progress)}%</span>
                              </div>
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-[#F06421] rounded-full"
                                  animate={{ width: `${upload.progress}%` }}
                                  transition={{ ease: "linear" }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-xs text-green-600 font-medium bg-green-50 rounded-lg px-3 py-2">
                              <CheckCircle2 size={14} />
                              {t("Documents uploaded successfully!", "ଦଲିଲ ସଫଳ ଭାବେ ଅପଲୋଡ!")}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() =>
                          inBasket ? removeFromBasket(svc.id) : addToBasket(svc)
                        }
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          inBasket
                            ? "bg-red-50 text-red-500 border border-red-200 hover:bg-red-100"
                            : "bg-[#003366] text-white hover:bg-[#004488]"
                        }`}
                      >
                        {inBasket ? (
                          <>
                            <Minus size={13} />
                            {t("Remove", "ହଟାନ୍ତୁ")}
                          </>
                        ) : (
                          <>
                            <Plus size={13} />
                            {t("Add to Basket", "ଝୁଡ଼ି ଯୋଡ଼ନ୍ତୁ")}
                          </>
                        )}
                      </button>
                      <a
                        href={getWhatsAppLink(
                          basket.find((b) => b.service.id === svc.id) || {
                            service: svc,
                            ticketId: generateTicketId(),
                          }
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#1da851] transition-colors"
                      >
                        <MessageCircle size={13} />
                        <span className="hidden sm:inline">{t("Quote", "ଉଦ୍ଧୃତ")}</span>
                      </a>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Basket Drawer */}
        <AnimatePresence>
          {basketOpen && basket.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setBasketOpen(false)}
                className="fixed inset-0 bg-black/40 z-40"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col"
              >
                {/* Drawer header */}
                <div className="flex items-center justify-between p-5 border-b bg-[#003366] text-white">
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={20} />
                    <h3 className="font-bold text-lg">
                      {t("Your Basket", "ଆପଣଙ୍କ ଝୁଡ଼ି")} ({basket.length})
                    </h3>
                  </div>
                  <button
                    onClick={() => setBasketOpen(false)}
                    className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {basket.map((item) => (
                    <motion.div
                      key={item.service.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-[#003366] text-sm">
                            {lang === "od" ? item.service.nameOdia : item.service.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.service.base_price_range}
                          </p>
                          <p className="text-xs text-[#F06421] font-mono mt-1">
                            ID: {item.ticketId}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromBasket(item.service.id)}
                          className="text-red-400 hover:text-red-600 p-1 flex-shrink-0"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      {/* Docs summary */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {(lang === "od"
                          ? item.service.required_docs_odia
                          : item.service.required_docs
                        ).map((doc, i) => (
                          <span
                            key={i}
                            className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
                          >
                            {doc}
                          </span>
                        ))}
                      </div>

                      {/* Individual WhatsApp */}
                      <a
                        href={getWhatsAppLink(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 bg-[#25D366] text-white rounded-lg text-xs font-bold hover:bg-[#1da851] transition-colors"
                      >
                        <MessageCircle size={13} />
                        {t("Get Quote", "ଉଦ୍ଧୃତ ପାନ୍ତୁ")}
                      </a>
                    </motion.div>
                  ))}
                </div>

                {/* Footer CTA */}
                <div className="p-4 border-t bg-gray-50">
                  <a
                    href={getBasketWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#1da851] transition-colors shadow-lg"
                  >
                    <MessageCircle size={20} />
                    {t(
                      `Send All ${basket.length} Services to WhatsApp`,
                      `${basket.length}ଟି ସେବା WhatsApp ରେ ପଠାନ୍ତୁ`
                    )}
                  </a>
                  <p className="text-center text-xs text-gray-400 mt-2">
                    {t("We'll reply within 30 minutes", "ଆମ ୩୦ ମିନିଟ ମଧ୍ୟରେ ଉତ୍ତର ଦେବୁ")}
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
