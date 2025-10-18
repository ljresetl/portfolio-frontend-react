import React, { useState, useEffect } from "react"; // Імпортуємо React та хуки useState і useEffect
import styles from "./Header.module.scss"; // Імпортуємо CSS модулі для стилів
import MobileMenu from "../MobileMenu/MobileMenu"; // Імпортуємо компонент мобільного меню

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Стан відкриття/закриття мобільного меню

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Функція перемикання меню
  const closeMenu = () => setIsMenuOpen(false); // Функція закриття меню

  // 🔒 Забороняємо прокрутку сторінки, коли меню відкрито
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Блокуємо прокрутку
    } else {
      document.body.style.overflow = "auto"; // Відновлюємо прокрутку
    }
    return () => {
      document.body.style.overflow = "auto"; // При демонтажі компонента повертаємо прокрутку
    };
  }, [isMenuOpen]); // Виконується при зміні isMenuOpen

  return (
    <header className={styles.header}> {/* Основний тег header */}
      <div className={styles.container}> {/* Контейнер для внутрішнього контенту */}
        
        {/* === Навігація === */}
        <nav className={styles.navigation} aria-label="Головне меню">
          <p className={styles.logo}>FrontEnd</p> {/* Логотип */}
          <ul className={styles.header_ul}> {/* Список пунктів меню */}
            <li className={styles.ul_navigation_li}><a href="#about" data-i18n="navAbout">Про мене</a></li>
            <li className={styles.ul_navigation_li}><a href="#capabilities" data-i18n="navCapabilities">Досвід</a></li>
            <li className={styles.ul_navigation_li}><a href="#portfolio" data-i18n="navPortfolio">Портфоліо</a></li>
            <li className={styles.ul_navigation_li}><a href="#connect" data-i18n="navConnect">Контакти</a></li>
          </ul>
        </nav>

        {/* === Перемикачі мови та теми === */}
        <div className={styles.language_switcher}>
          <button
            id="theme-toggle"
            className={styles.theme_switcher}
            aria-label="Змінити тему"
            type="button"
          >
            🌙
          </button>
          <button className={styles.language_switcher_button} data-lang="ua">Українська</button>
          <button className={styles.language_switcher_button} data-lang="en">English</button>
          <button className={styles.language_switcher_button} data-lang="cz">Čeština</button>
        </div>

        {/* === Бургер-меню === */}
        <button
          className={styles.burger_menu}
          type="button"
          onClick={toggleMenu} // Викликаємо toggleMenu при кліку
          aria-label="Відкрити меню"
        >
          <svg className={styles.burger_menu_icon} width="44" height="44">
            <use href="./images/icons.svg#icon-Frame-3"></use> {/* Іконка бургер-меню */}
          </svg>
        </button>

        {/* === Мобільне меню === */}
        <MobileMenu 
          isOpen={isMenuOpen} // Передаємо стан відкриття
          onClose={closeMenu}  // Передаємо функцію закриття
        />
      </div>
    </header>
  );
};

export default Header; // Експортуємо компонент для використання у інших файлах
