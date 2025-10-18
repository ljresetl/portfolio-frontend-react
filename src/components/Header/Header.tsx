import React, { useState, useEffect } from "react"; // Імпорт React і хуків useState та useEffect
import styles from "./Header.module.scss"; // Імпорт модульних стилів SCSS
import MobileMenu from "../MobileMenu/MobileMenu"; // Імпорт компонента мобільного меню

const Header: React.FC = () => {
  // === 🧭 СТАНИ КОМПОНЕНТА ===
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Керує відкриттям/закриттям мобільного меню
  const [theme, setTheme] = useState<"light" | "dark">("dark"); // Керує поточною темою сайту

  // === 🍔 ФУНКЦІЇ ДЛЯ МЕНЮ ===
  const toggleMenu = () => setIsMenuOpen((prev) => !prev); // Перемикає стан меню
  const closeMenu = () => setIsMenuOpen(false); // Закриває меню (використовується у MobileMenu)

  // === 🚫 Забороняємо прокрутку сторінки, коли меню відкрите ===
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto"; // Вимикаємо scroll при відкритому меню
    return () => {
      document.body.style.overflow = "auto"; // При демонтажі повертаємо scroll
    };
  }, [isMenuOpen]); // Виконується при зміні стану меню

  // === 🎨 ІНІЦІАЛІЗАЦІЯ ТЕМИ ПРИ ПЕРШОМУ ЗАПУСКУ ===
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme"); // Отримуємо тему з localStorage
    const initialTheme =
      savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark"; // Якщо немає — ставимо "dark"

    setTheme(initialTheme); // Зберігаємо тему в state
    document.body.classList.add(initialTheme); // Додаємо відповідний клас до <body>
  }, []);

  // === 🌓 ПЕРЕМИКАННЯ ТЕМИ ===
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"; // Якщо зараз світла — робимо темну і навпаки
    setTheme(newTheme); // Оновлюємо state

    // Оновлюємо клас на body
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);

    // Зберігаємо вибір у localStorage, щоб пам’ятався після перезавантаження
    localStorage.setItem("theme", newTheme);
  };

  // === 🧱 РЕНДЕР КОМПОНЕНТА ===
  return (
    <header className={styles.header}> {/* Основний тег шапки сайту */}
      <div className={styles.container}> {/* Контейнер для вирівнювання контенту */}

        {/* === 🔗 ГОЛОВНА НАВІГАЦІЯ === */}
        <nav className={styles.navigation} aria-label="Головне меню"> {/* Семантична навігація */}
          <p className={styles.logo}>FrontEnd</p> {/* Логотип сайту */}

          {/* Пункти меню */}
          <ul className={styles.header_ul}>
            <li className={styles.ul_navigation_li}>
              <a href="#about" data-i18n="navAbout">Про мене</a>
            </li>
            <li className={styles.ul_navigation_li}>
              <a href="#capabilities" data-i18n="navCapabilities">Досвід</a>
            </li>
            <li className={styles.ul_navigation_li}>
              <a href="#portfolio" data-i18n="navPortfolio">Портфоліо</a>
            </li>
            <li className={styles.ul_navigation_li}>
              <a href="#connect" data-i18n="navConnect">Контакти</a>
            </li>
          </ul>
        </nav>

        {/* === 🌙 ПЕРЕМИКАЧІ МОВИ ТА ТЕМИ === */}
        <div className={styles.language_switcher}> {/* Контейнер для кнопок */}

          {/* Кнопка перемикання теми */}
          <button
            id="theme-toggle"
            className={styles.theme_switcher}
            onClick={toggleTheme} // Викликає зміну теми
            aria-label="Змінити тему"
            type="button"
          >
            {theme === "light" ? "🌙" : "☀️"} {/* Іконка залежно від теми */}
          </button>

          {/* Кнопки зміни мови */}
          <button className={styles.language_switcher_button} data-lang="ua">
            Українська
          </button>
          <button className={styles.language_switcher_button} data-lang="en">
            English
          </button>
          <button className={styles.language_switcher_button} data-lang="cz">
            Čeština
          </button>
        </div>

        {/* === 🍔 БУРГЕР-МЕНЮ (тільки на мобільних) === */}
        <button
          className={styles.burger_menu}
          type="button"
          onClick={toggleMenu} // Відкриває або закриває меню
          aria-label="Відкрити меню"
        >
          <svg className={styles.burger_menu_icon} width="44" height="44">
            <use href="./images/icons.svg#icon-Frame-3"></use> {/* Іконка бургер-меню */}
          </svg>
        </button>

        {/* === 📱 МОДАЛЬНЕ МОБІЛЬНЕ МЕНЮ === */}
        <MobileMenu
          isOpen={isMenuOpen} // Стан відкриття меню
          onClose={closeMenu} // Функція закриття меню
        />
      </div>
    </header>
  );
};

export default Header; // Експортуємо компонент для використання у додатку
