import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useLanguage } from "../../useLanguage";
import { FaMoon, FaSun } from "react-icons/fa";

const Header: React.FC = () => {
  // === 🧭 СТАНИ КОМПОНЕНТА ===
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // === 🌐 ХУК МОВИ ===
  const { lang, setLang, t } = useLanguage();

  // === 🍔 ФУНКЦІЇ ДЛЯ МЕНЮ ===
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // === 🚫 Забороняємо прокрутку сторінки при відкритому меню ===
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // === 🎨 ІНІЦІАЛІЗАЦІЯ ТЕМИ ===
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme =
      savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";

    setTheme(initialTheme);
    document.body.classList.add(initialTheme);
  }, []);

  // === 🌓 ПЕРЕМИКАННЯ ТЕМИ ===
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // === 🧱 РЕНДЕР КОМПОНЕНТА ===
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* === 🔗 ГОЛОВНА НАВІГАЦІЯ === */}
        <p className={styles.logo}>FrontEnd</p>

        {/* === 🌙 ПЕРЕМИКАЧІ МОВИ ТА ТЕМИ === */}
        <div className={styles.language_switcher}>
          <nav className={styles.navigation} aria-label="Головне меню">
          
          <ul className={styles.header_ul}>
            <li className={styles.ul_navigation_li}>
              <a href="#about">{t("navAbout")}</a>
            </li>
            <li className={styles.ul_navigation_li}>
              <a href="#capabilities">{t("navCapabilities")}</a>
            </li>
            <li className={styles.ul_navigation_li}>
              <a href="#portfolio">{t("navPortfolio")}</a>
            </li>
            <li className={styles.ul_navigation_li}>
              <a href="#connect">{t("navConnect")}</a>
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
            {theme === "light" ? <FaMoon size={20} color="#161717ff" /> : <FaSun size={20} color="#d5eb0bff" />}
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

export default Header;
