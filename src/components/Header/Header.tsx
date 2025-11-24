// Імпорт React та хуків useState, useEffect
import React, { useState, useEffect } from "react";

// Імпорт локальних стилів з SCSS-модуля
import styles from "./Header.module.scss";

// Імпорт компонента MobileMenu — модальне меню для мобільних пристроїв
import MobileMenu from "../MobileMenu/MobileMenu";

// Імпорт кастомного хука для багатомовності
// useLanguage повертає функції для роботи з мовою та перекладом
import { useLanguage } from "../../useLanguage";

// Імпорт іконок для перемикання теми (місяць і сонце)
import { FaMoon, FaSun } from "react-icons/fa";

// Оголошення функціонального компонента Header
const Header: React.FC = () => {
  // === 🧭 СТАНИ КОМПОНЕНТА ===
  // isMenuOpen — чи відкрите мобільне меню
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // theme — поточна тема сайту ("light" або "dark")
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // === 🌐 ХУК МОВИ ===
  // lang — поточна мова
  // setLang — функція для зміни мови
  // t — функція для перекладу текстів
  const { lang, setLang, t } = useLanguage();

  // === 🍔 ФУНКЦІЇ ДЛЯ МЕНЮ ===
  // toggleMenu — відкриває/закриває мобільне меню
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  // closeMenu — закриває мобільне меню
  const closeMenu = () => setIsMenuOpen(false);

  // === 🚫 Забороняємо прокрутку сторінки при відкритому меню ===
  useEffect(() => {
    // Якщо меню відкрите — блокуємо прокрутку body
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    // При розмонтуванні компонента повертаємо прокрутку
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // === 🎨 ІНІЦІАЛІЗАЦІЯ ТЕМИ ===
  useEffect(() => {
    // Отримуємо збережену тему з localStorage
    const savedTheme = localStorage.getItem("theme");
    // Якщо тема валідна (light/dark) — використовуємо її, інакше "dark"
    const initialTheme =
      savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";

    // Встановлюємо тему у стан
    setTheme(initialTheme);
    // Додаємо клас теми до body
    document.body.classList.add(initialTheme);
  }, []);

  // === 🌓 ПЕРЕМИКАННЯ ТЕМИ ===
  const toggleTheme = () => {
    // Визначаємо нову тему
    const newTheme = theme === "light" ? "dark" : "light";
    // Оновлюємо стан
    setTheme(newTheme);
    // Видаляємо старий клас теми з body
    document.body.classList.remove(theme);
    // Додаємо новий клас теми до body
    document.body.classList.add(newTheme);
    // Зберігаємо тему у localStorage
    localStorage.setItem("theme", newTheme);
  };

  // === 🧱 РЕНДЕР КОМПОНЕНТА ===
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        {/* === 🔗 ЛОГОТИП === */}
        <p className={styles.logo}>FrontEnd</p>

        {/* === 🌙 ПЕРЕМИКАЧІ МОВИ ТА ТЕМИ === */}
        <div className={styles.language_switcher}>
          
          {/* Головна навігація */}
          <nav className={styles.navigation} aria-label="Головне меню">
            <ul className={styles.header_ul}>
              <li className={styles.ul_navigation_li}>
                <a href="#about" aria-label="Посилання на розділ Про мене">
                  {t("navAbout")}
                </a>
              </li>
              <li className={styles.ul_navigation_li}>
                <a href="#capabilities" aria-label="Посилання на розділ Можливості">
                  {t("navCapabilities")}
                </a>
              </li>
              <li className={styles.ul_navigation_li}>
                <a href="#portfolio" aria-label="Посилання на розділ Портфоліо">
                  {t("navPortfolio")}
                </a>
              </li>
              <li className={styles.ul_navigation_li}>
                <a href="#connect" aria-label="Посилання на розділ Зв'язок">
                  {t("navConnect")}
                </a>
              </li>
            </ul>
          </nav>

          {/* Кнопки зміни мови */}
          <button
            className={styles.language_switcher_button}
            onClick={() => setLang("ua")}
            disabled={lang === "ua"}
          >
            Українська
          </button>
          <button
            className={styles.language_switcher_button}
            onClick={() => setLang("en")}
            disabled={lang === "en"}
          >
            English
          </button>
          <button
            className={styles.language_switcher_button}
            onClick={() => setLang("cz")}
            disabled={lang === "cz"}
          >
            Čeština
          </button>

          {/* Кнопка перемикання теми */}
          <button
            id="theme-toggle"
            className={styles.theme_switcher}
            onClick={toggleTheme}
            aria-label="Змінити тему"
            type="button"
          >
            {/* Якщо тема light — показуємо іконку місяця, якщо dark — сонце */}
            {theme === "light" 
              ? <FaMoon size={20} color="#161717ff" /> 
              : <FaSun size={20} color="#d5eb0bff" />}
          </button>
        </div>

        {/* === 🍔 БУРГЕР-МЕНЮ === */}
        <button
          className={styles.burger_menu}
          type="button"
          onClick={toggleMenu}
          aria-label="Відкрити меню"
        >
          <svg className={styles.burger_menu_icon} width="44" height="44">
            <use href="./images/icons.svg#icon-Frame-3"></use>
          </svg>
        </button>

        {/* === 📱 МОДАЛЬНЕ МОБІЛЬНЕ МЕНЮ === */}
        <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      </div>
    </header>
  );
};

// Експорт компонента, щоб його можна було використати в App.tsx
export default Header;
