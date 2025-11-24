// Імпорт React та необхідних хуків
import React, { createContext, useState } from "react";

// Імпорт типу ReactNode — це будь-який допустимий дочірній елемент React (JSX, текст, компонент)
import type { ReactNode } from "react";

// Імпорт об’єкта з перекладами
import { translations } from "./i18n/translations";

// Тип для мов, які підтримуються у додатку
export type Lang = "ua" | "en" | "cz";

// Тип ключів перекладів
// keyof typeof translations["ua"] означає: візьми всі ключі з об’єкта перекладів для української мови
export type TranslationKeys = keyof typeof translations["ua"];

// Інтерфейс для контексту мови
interface LanguageContextType {
  lang: Lang; // поточна мова
  setLang: (lang: Lang) => void; // функція для зміни мови
  t: (key: TranslationKeys) => string; // функція для отримання перекладу за ключем
}

// Створюємо контекст для мови
// Початкове значення undefined, бо ми будемо його задавати через провайдер
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Інтерфейс для пропсів провайдера мови
interface LanguageProviderProps {
  children: ReactNode; // дочірні елементи, які будуть обгорнуті провайдером
}

// Провайдер мови — компонент, який забезпечує доступ до контексту мови
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Зчитуємо збережену мову з localStorage, якщо її немає — за замовчуванням "ua"
  const savedLang = (localStorage.getItem("siteLang") as Lang) || "ua";

  // Створюємо стан для поточної мови
  const [lang, setLangState] = useState<Lang>(savedLang);

  // Функція для зміни мови
  const setLang = (newLang: Lang) => {
    localStorage.setItem("siteLang", newLang); // зберігаємо нову мову у localStorage
    setLangState(newLang); // оновлюємо стан
  };

  // Функція для отримання перекладу за ключем
  const t = (key: TranslationKeys) => {
    const value = translations[lang][key]; // беремо переклад для поточної мови
    return value ?? key; // якщо перекладу немає, повертаємо сам ключ
  };

  // Повертаємо провайдер контексту
  // У value передаємо поточну мову, функцію зміни мови та функцію перекладу
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Експортуємо контекст, щоб його можна було використовувати у хуку useLanguage
export default LanguageContext;
