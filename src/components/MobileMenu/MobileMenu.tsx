import React from "react"; 
// Імпортуємо React, щоб створювати компоненти

import styles from "./MobileMenu.module.scss"; 
// Імпортуємо SCSS-модуль для стилізації компоненту

interface MobileMenuProps {
  isOpen: boolean; 
  // Пропс, який визначає чи меню відкрито
  onClose: () => void; 
  // Пропс - функція для закриття меню
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => { 
  // Створюємо функціональний компонент з типізацією через TypeScript
  return (
    <div className={`${styles.mobile_menu} ${isOpen ? styles.open : ""}`}>
    {/* 
      Контейнер мобільного меню:
      - завжди має клас styles.mobile_menu
      - якщо isOpen === true, додається styles.open для показу
    */}
      
      {/* Кнопка закриття меню */}
      <div className={styles.mobile_menu_btn}>
      {/* Контейнер кнопки закриття, позиціювання через SCSS */}
        <button
          className={styles.close_mobile_menu} 
          // Клас для стилізації кнопки "✕"
          onClick={onClose} 
          // При кліку викликаємо пропс onClose
          aria-label="Закрити меню" 
          // Додаємо доступність для скрінрідерів
        >
          ✕
          {/* Символ хрестика для закриття */}
        </button>
      </div>

      {/* Список пунктів меню */}
      <ul className={styles.mobile_menu_list}>
      {/* Список пунктів меню з вертикальним відображенням */}
        <li>
          <a href="#about" onClick={onClose}>
          {/* Клікабельний пункт, при кліку закриває меню */}
            Про мене
          </a>
        </li>
        <li>
          <a href="#capabilities" onClick={onClose}>
            Досвід
          </a>
        </li>
        <li>
          <a href="#portfolio" onClick={onClose}>
            Портфоліо
          </a>
        </li>
        <li>
          <a href="#connect" onClick={onClose}>
            Контакти
          </a>
        </li>
      </ul>

      {/* Соцмережі */}
      <div className={styles.connect_svg_mobile}>
      {/* Контейнер для блоків з іконками соцмереж */}
        <a
          href="https://www.linkedin.com/in/vitalii-baranov-222439377"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <svg width="32" height="32" className={styles.about_me_svg_link_connect}>
            <use href="./images/icons.svg#icon-linkendin" className={styles.use_connect}></use>
            {/* Іконка LinkedIn */}
          </svg>
        </a>
        <a
          href="https://github.com/ljresetl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <svg width="32" height="32" className={styles.about_me_svg_link_connect}>
            <use href="./images/icons.svg#icon-github" className={styles.use_connect}></use>
            {/* Іконка GitHub */}
          </svg>
        </a>
        <a
          href="https://www.instagram.com/ljresetl/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <svg width="32" height="32" className={styles.about_me_svg_link_connect}>
            <use href="./images/icons.svg#icon-instagram" className={styles.use_connect}></use>
            {/* Іконка Instagram */}
          </svg>
        </a>
      </div>
    </div>
  );
};

export default MobileMenu; 
// Експортуємо компонент, щоб його можна було імпортувати в Header
