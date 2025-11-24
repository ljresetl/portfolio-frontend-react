// Імпорт хука useContext з React
// useContext дозволяє отримати доступ до значення контексту всередині будь-якого компонента
import { useContext } from "react";

// Імпорт нашого контексту мови, який ми створили у LanguageContext.tsx
import LanguageContext from "./LanguageContext";

// Створюємо власний хук useLanguage
// Він спрощує роботу з LanguageContext, щоб не писати useContext(LanguageContext) кожного разу
export const useLanguage = () => {
  // Отримуємо значення контексту (lang, setLang, t) через useContext
  const context = useContext(LanguageContext);

  // Якщо контекст не знайдено (наприклад, хук викликано поза LanguageProvider),
  // кидаємо помилку, щоб розробник одразу побачив проблему
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  // Повертаємо контекст — тепер у будь-якому компоненті можна викликати useLanguage()
  // і отримати доступ до lang, setLang та t
  return context;
};
