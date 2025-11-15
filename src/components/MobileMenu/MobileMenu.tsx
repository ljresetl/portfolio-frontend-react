import React from "react";
import styles from "./MobileMenu.module.scss";
import { useLanguage } from "../../useLanguage";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  return (
    <div className={`${styles.mobile_menu} ${isOpen ? styles.open : ""}`}>
      {/* Кнопка закриття меню */}
      <div className={styles.mobile_menu_btn}>
        <button
          className={styles.close_mobile_menu}
          onClick={onClose}
          aria-label={t("navCloseMenu") || "Закрити меню"}
        >
          ✕
        </button>
      </div>

      {/* Список пунктів меню */}
      <ul className={styles.mobile_menu_list}>
        <li>
          <a href="#about" onClick={onClose} aria-label="Посилання на розділ Про мене">
            {t("navAbout")} 
          </a>
        </li>
        <li>
          <a href="#capabilities" onClick={onClose} aria-label="Посилання на розділ Можливості">
            {t("navExperience")}
          </a>
        </li>
        <li>
          <a href="#portfolio" onClick={onClose} aria-label="Посилання на розділ Портфоліо">
            {t("navPortfolio")}
          </a>
        </li>
        <li>
          <a href="#connect" onClick={onClose} aria-label="Посилання на розділ Зв'язок">
            {t("navConnect")}
          </a>
        </li>
      </ul>

      {/* Соцмережі */}
      <div className={styles.connect_svg_mobile}>
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

export default MobileMenu;
