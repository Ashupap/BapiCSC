import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import {
  Plus, Minus, ShoppingCart, X, CheckCircle2, FileText,
  MessageCircle, Upload, ChevronLeft, ChevronRight
} from "lucide-react";
import { services, categories, Service } from "@/data/services";
import { useLanguage } from "@/contexts/LanguageContext";

const PAGE_SIZE = 12;

const CATEGORY_META: Record<string, { emoji: string; color: string; bg: string }> = {
  All:           { emoji: "🔍", color: "#003366", bg: "#EEF4FF" },
  Identity:      { emoji: "🪪", color: "#1d4ed8", bg: "#EFF6FF" },
  Certificates:  { emoji: "📜", color: "#7c3aed", bg: "#F5F3FF" },
  "Govt Schemes":{ emoji: "🏛️", color: "#0369a1", bg: "#F0F9FF" },
  "Bill Payments":{ emoji: "⚡", color: "#d97706", bg: "#FFFBEB" },
  Banking:       { emoji: "🏦", color: "#F06421", bg: "#FFF7ED" },
  Education:     { emoji: "🎓", color: "#059669", bg: "#ECFDF5" },
  Agriculture:   { emoji: "🌾", color: "#65a30d", bg: "#F7FEE7" },
  "Travel & Booking": { emoji: "🚂", color: "#dc2626", bg: "#FEF2F2" },
  Business:      { emoji: "💼", color: "#1e40af", bg: "#EFF6FF" },
  "Digital Payments": { emoji: "💳", color: "#7c3aed", bg: "#F5F3FF" },
  Insurance:     { emoji: "🛡️", color: "#0f766e", bg: "#F0FDFA" },
  Other:         { emoji: "🔧", color: "#6b7280", bg: "#F9FAFB" },
};

function getCategoryMeta(cat: string) {
  return CATEGORY_META[cat] ?? { emoji: "📋", color: "#003366", bg: "#EEF4FF" };
}

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
  const [currentPage, setCurrentPage] = useState(1);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function goToPage(p: number) {
    setCurrentPage(Math.max(1, Math.min(p, totalPages)));
  }

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
    <section id="services" className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold tracking-[0.2em] text-[#F06421] uppercase mb-3"
          >
            {t("Service Engine", "ସେବା ଇଞ୍ଜିନ")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07 }}
            className="text-3xl sm:text-4xl font-extrabold text-[#003366]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {t("100+ Government & Banking Services", "100+ ସরکারী ও ব্যাংক সেবা")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="mt-2 text-gray-500 text-sm max-w-md mx-auto"
          >
            {t(
              "Add services to your basket and get a quote on WhatsApp instantly.",
              "ଝୁଡ଼ିରେ ସେବା ଯୋଡ଼ନ୍ତୁ ଓ WhatsApp ରେ ତୁରନ୍ତ ଉଦ୍ଧୃତ ପାନ୍ତୁ।"
            )}
          </motion.p>
        </div>

        {/* Category filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
          {allCats.map((cat) => {
            const meta = getCategoryMeta(cat);
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border whitespace-nowrap ${
                  isActive
                    ? "bg-[#003366] text-white border-[#003366] shadow-md shadow-blue-900/20"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#003366]/30 hover:text-[#003366] hover:shadow-sm"
                }`}
              >
                <span className="text-sm leading-none">{meta.emoji}</span>
                {cat}
              </button>
            );
          })}
        </div>

        {/* Basket FAB */}
        {basket.length > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={() => setBasketOpen(true)}
            className="fixed bottom-20 right-4 z-40 bg-[#003366] text-white rounded-full px-5 py-3.5 flex items-center gap-2.5 shadow-2xl hover:bg-[#004080] transition-colors"
          >
            <ShoppingCart size={18} />
            <span className="font-extrabold text-sm">{basket.length}</span>
            <span className="hidden sm:inline text-sm font-semibold">
              {t("View Basket", "ଝୁଡ଼ି ଦেখনੁ")}
            </span>
          </motion.button>
        )}

        {/* Service Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20 text-gray-400"
              >
                <FileText size={44} className="mx-auto mb-3 text-gray-200" />
                <p className="font-semibold text-gray-500">{t("No services found.", "କୋणসি ସेবা ମিলিলা ନাহিঁ।")}</p>
                <p className="text-sm text-gray-400 mt-1">{t("Try a different search or category.", "ଅলগা ଖোজ ଚেষ্টা করনੁ।")}</p>
              </motion.div>
            ) : (
              visible.map((svc, i) => {
                const inBasket = basket.some((b) => b.service.id === svc.id);
                const upload = uploadStates[svc.id];
                const meta = getCategoryMeta(svc.category);
                return (
                  <motion.div
                    key={svc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: Math.min(i * 0.025, 0.25) }}
                    whileHover={{ y: inBasket ? 0 : -3, transition: { duration: 0.15 } }}
                    className={`bg-white rounded-2xl p-4 border transition-all duration-200 flex flex-col group ${
                      inBasket
                        ? "border-[#003366]/30 shadow-md shadow-blue-50 ring-1 ring-[#003366]/10"
                        : "border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100"
                    }`}
                  >
                    {/* Top: emoji + category */}
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                        style={{ backgroundColor: meta.bg }}
                      >
                        {meta.emoji}
                      </div>
                      {inBasket && (
                        <div className="w-5 h-5 rounded-full bg-[#003366] flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 size={12} className="text-white" />
                        </div>
                      )}
                    </div>

                    {/* Category tag */}
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full self-start leading-5 mb-1.5"
                      style={{ color: meta.color, backgroundColor: meta.bg }}
                    >
                      {lang === "od" ? svc.categoryOdia : svc.category}
                    </span>

                    {/* Name */}
                    <h3 className="font-bold text-[#003366] text-sm leading-snug flex-1">
                      {lang === "od" ? svc.nameOdia : svc.name}
                    </h3>

                    {/* Price */}
                    <p className="text-xs text-gray-400 font-medium mt-1.5 mb-2">{svc.base_price_range}</p>

                    {/* Document Checklist (shows when in basket) */}
                    {inBasket && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-1 mb-3 bg-[#EEF4FF] rounded-xl p-3 border border-[#003366]/10"
                      >
                        <p className="text-[10px] font-bold text-[#003366] mb-2 uppercase tracking-wide">
                          {t("Required Documents:", "ଆବଶ୍ୟକ ଦлिল:")}
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
                                  className="w-3.5 h-3.5 accent-[#003366] flex-shrink-0"
                                />
                                <span className={`text-xs leading-tight ${checklist[key] ? "text-gray-400 line-through" : "text-gray-700"}`}>{doc}</span>
                              </label>
                            );
                          })}
                        </div>

                        {/* Upload Zone */}
                        <div className="mt-3">
                          {!upload || upload.status === "idle" ? (
                            <button
                              onClick={() => simulateUpload(svc.id)}
                              className="w-full border-2 border-dashed border-[#F06421]/40 rounded-xl py-2.5 text-xs text-[#F06421] font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-1.5"
                            >
                              <Upload size={13} />
                              {t("Upload Documents", "ଦलিল ଅपलোड")}
                            </button>
                          ) : upload.status === "uploading" ? (
                            <div>
                              <div className="flex justify-between text-[10px] text-gray-500 mb-1.5 font-medium">
                                <span>{t("Uploading…", "ଅपलোड ହेउছি...")}</span>
                                <span>{Math.round(upload.progress)}%</span>
                              </div>
                              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ background: "linear-gradient(90deg, #F06421, #e05010)" }}
                                  animate={{ width: `${upload.progress}%` }}
                                  transition={{ ease: "linear" }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-xs text-green-700 font-semibold bg-green-50 border border-green-100 rounded-xl px-3 py-2">
                              <CheckCircle2 size={13} />
                              {t("Uploaded!", "ଅपलোড ସফਲ!")}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Actions */}
                    <div className="mt-auto flex gap-1.5">
                      <button
                        onClick={() =>
                          inBasket ? removeFromBasket(svc.id) : addToBasket(svc)
                        }
                        className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-[11px] font-bold transition-all ${
                          inBasket
                            ? "bg-red-50 text-red-500 border border-red-200 hover:bg-red-100"
                            : "bg-[#003366] text-white hover:bg-[#004080] shadow-sm"
                        }`}
                      >
                        {inBasket ? (
                          <><Minus size={11} />{t("Remove", "ହटाउ")}</>
                        ) : (
                          <><Plus size={11} />{t("Add", "ଯੋड़ु")}</>
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
                        className="w-9 flex items-center justify-center rounded-xl bg-[#25D366] text-white hover:bg-[#1da851] transition-colors shadow-sm"
                        title="WhatsApp"
                      >
                        <MessageCircle size={14} />
                      </a>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col items-center gap-3">
            <p className="text-xs text-gray-400 font-medium">
              {t(
                `Page ${safePage} of ${totalPages} · ${filtered.length} services`,
                `ପৃষ্ঠা ${safePage} / ${totalPages} · ${filtered.length} সেবা`
              )}
            </p>
            <div className="flex items-center gap-1">
              <motion.button
                whileTap={{ scale: 0.93 }}
                disabled={safePage === 1}
                onClick={() => goToPage(safePage - 1)}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </motion.button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                const isActive = p === safePage;
                const isNear = Math.abs(p - safePage) <= 1 || p === 1 || p === totalPages;
                if (!isNear) {
                  if (p === safePage - 2 || p === safePage + 2) {
                    return <span key={p} className="text-gray-400 text-xs px-1">&hellip;</span>;
                  }
                  return null;
                }
                return (
                  <motion.button
                    key={p}
                    whileTap={{ scale: 0.93 }}
                    onClick={() => goToPage(p)}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#003366] text-white shadow-md"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </motion.button>
                );
              })}

              <motion.button
                whileTap={{ scale: 0.93 }}
                disabled={safePage === totalPages}
                onClick={() => goToPage(safePage + 1)}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </div>
        )}

        {/* Basket Drawer */}
        <AnimatePresence>
          {basketOpen && basket.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setBasketOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 26, stiffness: 220 }}
                className="fixed right-0 top-0 bottom-0 w-full sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col"
              >
                {/* Drawer header */}
                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-[#003366] to-[#004080] text-white">
                  <div className="flex items-center gap-2.5">
                    <ShoppingCart size={20} />
                    <h3 className="font-extrabold text-lg">
                      {t("Your Basket", "ଆপণঙ୍କ ଝুड़ি")}
                    </h3>
                    <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">{basket.length}</span>
                  </div>
                  <button
                    onClick={() => setBasketOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {basket.map((item) => {
                    const meta = getCategoryMeta(item.service.category);
                    return (
                      <motion.div
                        key={item.service.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="bg-gray-50 rounded-2xl p-4 border border-gray-100"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                            style={{ backgroundColor: meta.bg }}
                          >
                            {meta.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-[#003366] text-sm leading-tight truncate">
                              {lang === "od" ? item.service.nameOdia : item.service.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">{item.service.base_price_range}</p>
                            <p className="text-xs text-[#F06421] font-mono mt-1 font-semibold">ID: {item.ticketId}</p>
                          </div>
                          <button
                            onClick={() => removeFromBasket(item.service.id)}
                            className="text-red-400 hover:text-red-600 p-1 flex-shrink-0 transition-colors"
                          >
                            <X size={15} />
                          </button>
                        </div>

                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {(lang === "od"
                            ? item.service.required_docs_odia
                            : item.service.required_docs
                          ).map((doc, i) => (
                            <span key={i} className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full font-medium">
                              {doc}
                            </span>
                          ))}
                        </div>

                        <a
                          href={getWhatsAppLink(item)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#25D366] text-white rounded-xl text-xs font-bold hover:bg-[#1da851] transition-colors"
                        >
                          <MessageCircle size={13} />
                          {t("Get Quote", "ଉद्धृत পান")}
                        </a>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer CTA */}
                <div className="p-4 border-t bg-gray-50/80">
                  <a
                    href={getBasketWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full py-4 bg-[#25D366] text-white rounded-2xl font-extrabold hover:bg-[#1da851] transition-colors shadow-lg shadow-green-200 text-sm"
                  >
                    <MessageCircle size={20} />
                    {t(
                      `Send All ${basket.length} Services to WhatsApp`,
                      `${basket.length}ਟੀ ਸੇਵਾ WhatsApp ਰੇ ਪਠਾਨੁ`
                    )}
                  </a>
                  <p className="text-center text-xs text-gray-400 mt-2 font-medium">
                    {t("We'll reply within 30 minutes", "ଆমे ৩০ মিনিটে উত্তর দেবু")}
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
