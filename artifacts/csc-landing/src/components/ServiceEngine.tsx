import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import {
  Plus, Minus, ShoppingCart, X, CheckCircle2, FileText,
  MessageCircle, ChevronLeft, ChevronRight, ClipboardList
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
  Travel:        { emoji: "🚂", color: "#dc2626", bg: "#FEF2F2" },
  Healthcare:    { emoji: "🏥", color: "#0f766e", bg: "#F0FDFA" },
  "Land Records":{ emoji: "🗂️", color: "#92400e", bg: "#FEF3C7" },
  "Digital Services": { emoji: "💻", color: "#6d28d9", bg: "#EDE9FE" },
  Telecom:       { emoji: "📱", color: "#0369a1", bg: "#E0F2FE" },
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

interface ServiceEngineProps {
  searchQuery: string;
}

export default function ServiceEngine({ searchQuery }: ServiceEngineProps) {
  const { t, lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [basketOpen, setBasketOpen] = useState(false);
  const [pendingService, setPendingService] = useState<Service | null>(null);
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({});

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

  function confirmAddToBasket() {
    if (!pendingService) return;
    if (!basket.find((b) => b.service.id === pendingService.id)) {
      setBasket((prev) => [...prev, { service: pendingService, ticketId: generateTicketId() }]);
    }
    setPendingService(null);
    setChecklist({});
    setBasketOpen(true);
  }

  function closePendingModal() {
    setPendingService(null);
    setChecklist({});
  }

  function removeFromBasket(id: string) {
    setBasket((prev) => prev.filter((b) => b.service.id !== id));
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

  const pendingDocs = pendingService
    ? (lang === "od" ? pendingService.required_docs_odia : pendingService.required_docs)
    : [];
  const pendingMeta = pendingService ? getCategoryMeta(pendingService.category) : null;

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
              {t("View Basket", "ଝୁଡ଼ି ଦেখनੁ")}
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
                <p className="font-semibold text-gray-500">{t("No services found.", "କোणসি ସেবা ମিলিলা ନাহিঁ।")}</p>
                <p className="text-sm text-gray-400 mt-1">{t("Try a different search or category.", "ଅलगা ଖୋଜ ଚেষ্টা করনੁ।")}</p>
              </motion.div>
            ) : (
              visible.map((svc, i) => {
                const inBasket = basket.some((b) => b.service.id === svc.id);
                const meta = getCategoryMeta(svc.category);
                const docCount = svc.required_docs.length;
                return (
                  <motion.div
                    key={svc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: Math.min(i * 0.025, 0.25) }}
                    whileHover={{ y: inBasket ? 0 : -4, transition: { duration: 0.15 } }}
                    className={`relative bg-white rounded-2xl border overflow-hidden flex flex-col transition-all duration-200 group ${
                      inBasket
                        ? "border-[#003366]/25 shadow-lg shadow-blue-100/60 ring-1 ring-[#003366]/10"
                        : "border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100/80"
                    }`}
                  >
                    {/* Colored top accent bar */}
                    <div
                      className="h-1 w-full flex-shrink-0"
                      style={{ backgroundColor: inBasket ? "#003366" : meta.color }}
                    />

                    <div className="p-4 flex flex-col flex-1">
                      {/* Top row: icon + added badge */}
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm"
                          style={{ backgroundColor: meta.bg }}
                        >
                          {meta.emoji}
                        </div>
                        {inBasket ? (
                          <div className="flex items-center gap-1 bg-[#003366] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                            <CheckCircle2 size={10} />
                            {t("Added", "ଯୋଡ଼ି ହୋଇଛି")}
                          </div>
                        ) : docCount > 0 ? (
                          <div
                            className="text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-0.5"
                            style={{ color: meta.color, backgroundColor: meta.bg }}
                          >
                            <FileText size={9} />
                            {docCount} {t("docs", "ଦলিল")}
                          </div>
                        ) : null}
                      </div>

                      {/* Category tag */}
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full self-start leading-5 mb-2"
                        style={{ color: meta.color, backgroundColor: meta.bg }}
                      >
                        {lang === "od" ? svc.categoryOdia : svc.category}
                      </span>

                      {/* Name */}
                      <h3 className="font-extrabold text-[#003366] text-sm leading-snug mb-1.5">
                        {lang === "od" ? svc.nameOdia : svc.name}
                      </h3>

                      {/* Description */}
                      <p className="text-[11px] text-gray-400 leading-snug line-clamp-2 flex-1 mb-4">
                        {lang === "od" ? svc.descriptionOdia : svc.description}
                      </p>

                      {/* Actions */}
                      <div className="flex gap-1.5">
                        <button
                          onClick={() =>
                            inBasket ? removeFromBasket(svc.id) : setPendingService(svc)
                          }
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-bold transition-all ${
                            inBasket
                              ? "bg-red-50 text-red-500 border border-red-200 hover:bg-red-100"
                              : "bg-[#003366] text-white hover:bg-[#004080] shadow-sm shadow-blue-900/20"
                          }`}
                        >
                          {inBasket ? (
                            <><Minus size={11} />{t("Remove", "ହটाउ")}</>
                          ) : (
                            <><Plus size={11} />{t("Add", "ଯୋड़ु")}</>
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
                          className="w-10 flex items-center justify-center rounded-xl bg-[#25D366] text-white hover:bg-[#1da851] transition-colors shadow-sm"
                          title="WhatsApp"
                        >
                          <MessageCircle size={14} />
                        </a>
                      </div>
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
                `ପୃষ୍ଠା ${safePage} / ${totalPages} · ${filtered.length} সেবা`
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

        {/* ── Required Docs Confirmation Modal ── */}
        <AnimatePresence>
          {pendingService && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closePendingModal}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 24 }}
                transition={{ type: "spring", damping: 24, stiffness: 260 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
              >
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm pointer-events-auto overflow-hidden">
                  {/* Modal header */}
                  <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ backgroundColor: pendingMeta?.bg }}
                      >
                        {pendingMeta?.emoji}
                      </div>
                      <div>
                        <p className="font-extrabold text-[#003366] text-sm leading-tight">
                          {lang === "od" ? pendingService.nameOdia : pendingService.name}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {lang === "od" ? pendingService.categoryOdia : pendingService.category}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={closePendingModal}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors flex-shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Docs list */}
                  <div className="px-5 py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <ClipboardList size={15} className="text-[#003366]" />
                      <p className="text-xs font-extrabold text-[#003366] uppercase tracking-wide">
                        {t("Required Documents", "ଆବଶ୍ୟକ ଦଲিল")}
                      </p>
                    </div>

                    {pendingDocs.length > 0 ? (
                      <div className="space-y-2.5">
                        {pendingDocs.map((doc, i) => {
                          const key = `${pendingService!.id}-${i}`;
                          return (
                            <label key={i} className="flex items-center gap-2.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!checklist[key]}
                                onChange={(e) =>
                                  setChecklist((prev) => ({ ...prev, [key]: e.target.checked }))
                                }
                                className="w-4 h-4 accent-[#003366] flex-shrink-0 cursor-pointer"
                              />
                              <span className={`text-sm leading-snug transition-colors ${checklist[key] ? "text-gray-400 line-through" : "text-gray-700"}`}>
                                {doc}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400 italic">
                        {t("No specific documents required.", "କୌଣସି ଦলিল ଆବଶ୍ୟକ ନାହିଁ।")}
                      </p>
                    )}

                  </div>

                  {/* Action buttons */}
                  <div className="px-5 pb-5 flex gap-2.5">
                    <button
                      onClick={closePendingModal}
                      className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-500 text-sm font-bold hover:bg-gray-50 transition-colors"
                    >
                      {t("Cancel", "ବাতিল")}
                    </button>
                    <button
                      onClick={confirmAddToBasket}
                      className="flex-1 py-3 rounded-2xl bg-[#003366] text-white text-sm font-extrabold hover:bg-[#004080] transition-colors shadow-md shadow-blue-900/20 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={15} />
                      {t("Add to Basket", "ଝুড়িতে ଯোগ করনু")}
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── Basket Drawer ── */}
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
                      {t("Your Basket", "ଆପଣଙ୍କ ଝୁଡ଼ি")}
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
                    const docs = lang === "od" ? item.service.required_docs_odia : item.service.required_docs;
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
                            <p className="text-xs text-[#F06421] font-mono mt-1 font-semibold">ID: {item.ticketId}</p>
                          </div>
                          <button
                            onClick={() => removeFromBasket(item.service.id)}
                            className="text-red-400 hover:text-red-600 p-1 flex-shrink-0 transition-colors"
                          >
                            <X size={15} />
                          </button>
                        </div>

                        {docs.length > 0 && (
                          <div className="mt-3">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">
                              {t("Required Docs", "ଆବଶ୍ୟକ ଦলিল")}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {docs.map((doc, i) => (
                                <span key={i} className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full font-medium">
                                  {doc}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <a
                          href={getWhatsAppLink(item)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#25D366] text-white rounded-xl text-xs font-bold hover:bg-[#1da851] transition-colors"
                        >
                          <MessageCircle size={13} />
                          {t("Get Quote", "ଉद्धृत ପান")}
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
                      `${basket.length}ଟି ସেবা WhatsApp ରে ପଠାନ`
                    )}
                  </a>
                  <p className="text-center text-xs text-gray-400 mt-2 font-medium">
                    {t("We'll reply within 30 minutes", "ଆমে ৩০ মিনিটে উত্তর দেবু")}
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
