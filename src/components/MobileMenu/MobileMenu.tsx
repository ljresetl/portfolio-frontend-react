// Імпорт React для створення компонентів
import React from "react";

// Імпорт локальних стилів з SCSS-модуля
import styles from "./MobileMenu.module.scss";

// Імпорт кастомного хука для багатомовності
// useLanguage повертає функцію t(), яка використовується для перекладу текстів
import { useLanguage } from "../../useLanguage";

// Оголошення інтерфейсу пропсів для компонента MobileMenu
interface MobileMenuProps {
  isOpen: boolean;      // чи відкрите меню
  onClose: () => void;  // функція для закриття меню
}

// Функціональний компонент MobileMenu
const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Виклик хука useLanguage. Деструктуризація повертає функцію t()
  // t("ключ") повертає перекладений текст для заданого ключа
  const { t } = useLanguage();

  // JSX-розмітка компонента
  return (
    // Головний контейнер меню. Якщо isOpen === true, додається клас styles.open
    <div className={`${styles.mobile_menu} ${isOpen ? styles.open : ""}`}>
      
      {/* Кнопка закриття меню */}
      <div className={styles.mobile_menu_btn}>
        <button
          className={styles.close_mobile_menu}
          onClick={onClose} // викликає функцію закриття меню
          aria-label={t("navCloseMenu") || "Закрити меню"} // текст для доступності
        >
          ✕ {/* Символ хрестика */}
        </button>
      </div>

      {/* Список пунктів меню */}
      <ul className={styles.mobile_menu_list}>
        <li>
          <a 
            href="#about" 
            onClick={onClose} // закриває меню після кліку
            aria-label="Посилання на розділ Про мене"
          >
            {t("navAbout")} 
          </a>
        </li>
        <li>
          <a 
            href="#capabilities" 
            onClick={onClose} 
            aria-label="Посилання на розділ Можливості"
          >
            {t("navExperience")} {/* тут використовується ключ для досвіду */}
          </a>
        </li>
        <li>
          <a 
            href="#portfolio" 
            onClick={onClose} 
            aria-label="Посилання на розділ Портфоліо"
          >
            {t("navPortfolio")}
          </a>
        </li>
        <li>
          <a 
            href="#connect" 
            onClick={onClose} 
            aria-label="Посилання на розділ Зв'язок"
          >
            {t("navConnect")}
          </a>
        </li>
      </ul>

      {/* Соцмережі */}
      <div className={styles.connect_svg_mobile}>
        
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/vitalii-baranov-222439377"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Посилання на LinkedIn"
        >
          <svg width="32" height="32" className={styles.about_me_svg_link_connect}>
            <use href="./images/icons.svg#icon-linkendin"></use>
          </svg>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/ljresetl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Посилання на GitHub"
        >
          <svg width="32" height="32" className={styles.about_me_svg_link_connect}>
            <use href="./images/icons.svg#icon-github"></use>
          </svg>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/ljresetl/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Посилання на Instagram"
        >
          <svg width="32" height="32" className={styles.about_me_svg_link_connect}>
            <use href="./images/icons.svg#icon-instagram"></use>
          </svg>
        </a>
      </div>
    </div>
  );
};

// Експорт компонента, щоб його можна було використати в Header.tsx
export default MobileMenu;
