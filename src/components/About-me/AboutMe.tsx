// Імпорт React для створення компонентів
import React from "react";

// Імпорт стилів із SCSS-модуля. Кожен клас у файлі AboutMe.module.scss стає властивістю об’єкта styles
import styles from "./AboutMe.module.scss";

// Імпорт кастомного хука для багатомовності. Він дає функцію t(), яка повертає перекладений текст
import { useLanguage } from "../../useLanguage";

// Імпорт компонента Section — обгортка для секцій сторінки, яка додає стилі та ефекти (blur, gradient)
import Section from "../Section";

// Оголошення функціонального компонента AboutMe
const AboutMe: React.FC = () => {
  // Виклик хука useLanguage. Деструктуризація повертає функцію t()
  // t("ключ") повертає перекладений текст для заданого ключа
  const { t } = useLanguage(); 

  // JSX-розмітка компонента
  return (
    // Обгортка Section додає стилі blur_effect та gradient_effect
    <Section className={`${styles.blur_effect} ${styles.gradient_effect}`}>
      
      {/* Семантичний тег <section> для блоку "Про мене" */}
      <section className={styles.aboutme} id="about">
        
        {/* Контейнер для вирівнювання контенту */}
        <div className={styles.container}>
          
          {/* Заголовок секції. 
              id="resume" використовується як якір, щоб можна було скролити сюди з інших блоків */}
          <h1 className={styles.about_me_h} id="resume">
            {t("navAboutMe")} {/* Перекладений текст для заголовка */}
          </h1>

          {/* Права частина секції з текстом та кнопками */}
          <div className={styles.about_me_right}>
            
            {/* Перший абзац з перекладеним текстом */}
            <p className={styles.about_me_p}>{t("navAboutMeP")}</p>
            
            {/* Другий абзац з перекладеним текстом */}
            <p className={styles.about_me_p_two}>{t("navAboutMeTwoP")}</p>
  
            {/* Блок кнопок та посилань */}
            <div className={styles.button_a_a}>
              
              {/* Кнопка для завантаження резюме.
                  href вказує шлях до PDF-файлу.
                  download змушує браузер завантажити файл, а не відкривати його.
                  aria-label додає опис для доступності (екранні читалки). */}
              <a
                href="/files/Vitalii_Baranov_Frontend_Developer.pdf"
                download
                className={styles.about_me_button}
                aria-label="Завантажити резюме"
              >
                {t("navButtonResume")} {/* Текст кнопки (переклад) */}
              </a>
  
              {/* Посилання на LinkedIn */}
              <a
                href="https://www.linkedin.com/in/vitalii-baranov/"
                target="_blank" // Відкриває у новій вкладці
                rel="noopener noreferrer" // Безпека при відкритті нових вкладок
                className={styles.about_me_a}
                aria-label="Посилання на LinkedIn"
              >
                {/* SVG-іконка LinkedIn, підключена з icons.svg */}
                <svg width="24" height="24" className={styles.about_me_svg_link}>
                  <use href="./images/icons.svg#icon-linkendin"></use>
                </svg>
              </a>
  
              {/* Посилання на Telegram */}
              <a
                href="https://t.me/ljresetl"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.about_me_a}
                aria-label="Посилання на Telegram"
              >
                {/* SVG-іконка Telegram */}
                <svg width="24" height="24" className={styles.about_me_svg_link}>
                  <use href="./images/icons.svg#icon-telegram"></use>
                </svg>
              </a>
  
              {/* Посилання на GitHub */}
              <a
                href="https://github.com/ljresetl"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.about_me_a}
                aria-label="Посилання на GitHub"
              >
                {/* SVG-іконка GitHub */}
                <svg width="24" height="24" className={styles.about_me_svg_link}>
                  <use href="./images/icons.svg#icon-github"></use>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
};

// Експорт компонента, щоб його можна було використати в App.tsx
export default AboutMe;
