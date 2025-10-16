import React from 'react';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
     <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.navigation} aria-label="Головне меню">
          <p className={styles.logo}>FrontEnd</p>
          <ul className={styles.header_ul}>
            <li className={styles.header_li}>
              <a href="#about" data-i18n="navAbout">Про мене</a>
            </li>
            <li className={styles.header_li}>
              <a href="#capabilities" data-i18n="navCapabilities">Досвід</a>
            </li>
            <li className={styles.header_li}>
              <a href="#portfolio" data-i18n="navPortfolio">Портфоліо</a>
            </li>
            <li className={styles.header_li}>
              <a href="#connect" data-i18n="navConnect">Контакти</a>
            </li>
          </ul>
        </nav>
        {/* <!-- кнопки переключення мови початок --> */}
        <div className={styles.language_switcher}>
          {/* <!-- перемикач на свутлу-темну тему сайту --> */}
          <button
            type="button"
            id="theme-toggle"
            className={styles.theme_switcher}
            aria-label="Змінити тему"
          >
            🌙
          </button>
          <button type="button" className={styles.language_switcher_button} data-lang="ua">
            Українська
          </button>
          <button type="button" className={styles.language_switcher_button} data-lang="en">
            English
          </button>
          <button type="button" className={styles.language_switcher_button} data-lang="cz">
            Čeština
          </button>
        </div>
        {/* <!-- кнопки переключення мови кінець --> */}
        {/* <!-- Бургер-меню початок --> */}
        <button className={styles.burger_menu} type="button" aria-label="Відкрити меню">
          <svg className={styles.burger_menu_icon} width="44" height="44">
            <use href="./images/icons.svg#icon-Frame-3"></use>
          </svg>
        </button>
        {/* <!-- Бургер-меню кінець --> */}
        {/* <!-- мобільне меню початок --> */}
        <div className={styles.mobile_menu} id="mobileMenu">
          <div className={styles.mobile_menu_btn}>
            <button
              type="button"
              className={styles.close_mobile_menu}
              id="closeMobileMenu"
              aria-label="Закрити меню"
            >
              <svg width="14" height="14" className={styles.mobile_menu_btn_svg}>
                <use
                  href="./images/icons.svg#icon-close-black"
                  width="12"
                  height="12"
                ></use>
              </svg>
            </button>
          </div>
          <div className={styles.mobile_full_item}>
            <ul className={styles.mobile_menu_list}>
              <li>
                <a href="index.html" className={styles.mobile_menu_link}>FrontEnd</a>
              </li>
              <li>
                <a href="#aboutme" className={styles.menu_link} data-i18n="navAbout"
                  >Про мене</a>
              </li>
              <li>
                <a
                  href="#capabilities"
                  className={styles.mobile_menu_link}
                  data-i18n="navCapabilities"
                  >Досвід</a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className={styles.mobile_menu_link}
                  data-i18n="navPortfolio"
                  >Портфоліо</a>
              </li>
              <li>
                <a
                  href="#connect"
                  className={styles.mobile_menu_link}
                  data-i18n="navConnect"
                  >Контакти</a>
              </li>
            </ul>

            {/* <!-- Ось тут вставка --> */}
            <div className={` ${styles.connect_svg} ${styles.connect_svg_mobile}`}>
              <a
                href="www.linkedin.com/in/vitalii-baranov-222439377"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg width="32" height="32" className={styles.about_me_svg_link_connect}>
                  <use
                    href="./images/icons.svg#icon-linkendin"
                    className={styles.use_connect}
                  ></use>
                </svg>
              </a>
              <a
                href="https://github.com/ljresetl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg width="32" height="32" className={styles.about_me_svg_link_connect}>
                  <use
                    href="./images/icons.svg#icon-github"
                    className={styles.use_connect}
                  ></use>
                </svg>
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X Twitter"
              >
                <svg width="32" height="32" className={styles.about_me_svg_link_connect}>
                  <use
                    href="./images/icons.svg#icon-x"
                    className={styles.use_connect}
                  ></use>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/ljresetl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg width="32" height="32" className={styles.about_me_svg_link_connect}>
                  <use
                    href="./images/icons.svg#icon-instagram"
                    className={styles.use_connect}
                  ></use>
                </svg>
              </a>
            </div>

            {/* <!-- Ось кінець вставки --> */}
          </div>
        </div>

        {/* <!-- мобільне меню кінець --> */}
      </div>
    </header>
  );
};

export default Header;
