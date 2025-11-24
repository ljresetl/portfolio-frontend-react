// Імпорт React для створення компонентів
import React from "react";

// Імпорт локальних стилів з SCSS-модуля
import styles from "./Connect.module.scss";

// Імпорт кастомного хука для багатомовності
// useLanguage повертає функцію t(), яка використовується для перекладу текстів
import { useLanguage } from "../../useLanguage";

// Імпорт компонента Section — обгортка для секцій сторінки, яка додає стилі та ефекти (blur, gradient)
import Section from "../Section";

// Оголошення функціонального компонента Connect
const Connect: React.FC = () => {
  // Виклик хука useLanguage. Деструктуризація повертає функцію t()
  // t("ключ") повертає перекладений текст для заданого ключа
  const { t } = useLanguage(); // ✅ підключено переклад

  // JSX-розмітка компонента
  return (
    // Обгортка Section додає стилі blur_effect та gradient_effect
    <Section className={`${styles.blur_effect} ${styles.gradient_effect}`}>
      
      {/* Семантичний тег <section> для блоку "Контакти" */}
      <section id="connect" className={styles.connect}>
        
        {/* Контейнер для вирівнювання контенту */}
        <div className={styles.container}>
          
          {/* Ліва частина секції — заголовок, текст і соцмережі */}
          <div className={styles.connect_container_one}>
            
            {/* Заголовок секції */}
            <h3 className={styles.connect_container_one_h}>
              {t("navConnect")}
            </h3>
  
            {/* Перший параграф — контакт через email */}
            <p className={styles.connect_container_one_p}>
              <span>{t("navConnectP")}</span>{" "}
              <a
                href="mailto:ljresetl@gmail.com" // відкриває поштовий клієнт
                className={styles.connect_span_a}
                aria-label="Електронна пошта"
              >
                ljresetl@gmail.com
              </a>
            </p>
  
            {/* Другий параграф — посилання на резюме */}
            <p className={styles.connect_container_one_p}>
              <span>{t("navConnectPtwo")}</span>{" "}
              <a
                className={styles.connect_span_resume}
                href="#resume" // скролить до блоку з id="resume"
                aria-label="Посилання на резюме"
              >
                {t("navConnectR")}
              </a>
            </p>
  
            {/* Соцмережі — набір іконок з посиланнями */}
            <div className={styles.connect_svg}>
              
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/vitalii-baranov/"
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
  
              {/* Telegram */}
              <a
                href="https://t.me/ljresetl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Посилання на Telegram"
              >
                <svg width="24" height="24" className={styles.about_me_svg_link_connect}>
                  <use href="./images/icons.svg#icon-telegram"></use>
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
  
          {/* Права частина секції — форма для контакту */}
          <div className={styles.connect_container_two}>
            
            {/* Форма надсилає дані на Formspree */}
            <form
              action="https://formspree.io/f/mzzggoog" // endpoint для обробки форм
              method="POST"
              className={styles.modal_form}
              id="contact-form"
            >
              {/* Приховане поле для теми повідомлення */}
              <input
                type="hidden"
                name="_subject"
                className={styles.modal_input}
                value={t("navConnectSubject")}
              />
  
              {/* Поле для імені */}
              <label className={styles.modal_label} htmlFor="name">
                {t("navConnectName")}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className={styles.modal_input}
                required
                placeholder={t("navConnectPlaceholderName")}
              />
  
              {/* Поле для телефону */}
              <label className={styles.modal_label} htmlFor="phone">
                {t("navConnectTelefon")}
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className={styles.modal_input}
                placeholder={t("navConnectPlaceholderPhone")}
                required
              />
  
              {/* Поле для email */}
              <label className={styles.modal_label} htmlFor="email">
                {t("navConnectMail")}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={styles.modal_input}
                required
                placeholder={t("navConnectPlaceholderEmail")}
              />
  
              {/* Поле для повідомлення */}
              <label className={styles.modal_label} htmlFor="message">
                {t("navConnectComment")}
              </label>
              <textarea
                id="message"
                name="message"
                className={styles.modal_textarea}
                placeholder={t("navConnectPlaceholderMessage")}
              ></textarea>
  
              {/* Кнопка відправки форми */}
              <button type="submit" className={styles.modal_button}>
                {t("navConnectButtonSend")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Section>
  );
};

// Експорт компонента, щоб його можна було використати в App.tsx
export default Connect;
