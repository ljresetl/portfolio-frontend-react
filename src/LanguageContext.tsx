import React, { createContext, useState } from "react";
import type { ReactNode } from "react";
import { translations } from "./i18n/translations";

export type Lang = "ua" | "en" | "cz";

// Тип ключів перекладів
export type TranslationKeys = keyof typeof translations["ua"];

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKeys) => string;
}

// Контекст для мови
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Провайдер мови
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const savedLang = (localStorage.getItem("siteLang") as Lang) || "ua";
  const [lang, setLangState] = useState<Lang>(savedLang);

  const setLang = (newLang: Lang) => {
    localStorage.setItem("siteLang", newLang);
    setLangState(newLang);
  };

  const t = (key: TranslationKeys) => {
    const value = translations[lang][key];
    return value ?? key; // якщо перекладу немає, повертає ключ
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
