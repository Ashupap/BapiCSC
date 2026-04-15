import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "od";

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (en: string, od: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  const t = (en: string, od: string) => (lang === "en" ? en : od);
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be inside LanguageProvider");
  return ctx;
}
