import React from "react";
import styles from "./Connect.module.scss"; // <-- підключення SCSS-модуля

const Connect: React.FC = () => {
  return (
    <section id="connect" className={styles.connect}>
      <div className={styles.container}>
        {/* Ліва частина */}
        <div className={styles.connect_container_one}>
          <h3 className={styles.connect_container_one_h} data-i18n="navСonnect">
            Зв'язок
          </h3>

          {/* Перший параграф */}
          <p className={styles.connect_container_one_p}>
            <span data-i18n="navСonnectP">Скажи привіт тут </span>
            <a
              href="mailto:ljresetl@gmail.com"
              className={styles.connect_span_a}
            >
              ljresetl@gmail.com
            </a>
          </p>

          {/* Другий параграф */}
          <p className={styles.connect_container_one_p}>
            <span data-i18n="navСonnectPtwo">
              Для більшої інформації ось моє </span>
            <a
              data-i18n="navСonnectR"
              className={styles.connect_span_resume}
              href="#resume"
            >
              Резюме
            </a>
          </p>

          {/* Соцмережі */}
          <div className={styles.connect_svg}>
            <a
              href="https://www.linkedin.com/in/vitalii-baranov/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg
                width="32"
                height="32"
                className={styles.about_me_svg_link_connect}
              >
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
              <svg
                width="32"
                height="32"
                className={styles.about_me_svg_link_connect}
              >
                <use
                  href="./images/icons.svg#icon-github"
                  className={styles.use_connect}
                ></use>
              </svg>
            </a>

            <a
              href="https://t.me/ljresetl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className={styles.about_me_a}
            >
              <svg width="24" height="24" className={styles.about_me_svg_link_connect}>
                <use href="./images/icons.svg#icon-telegram"></use>
              </svg>
            </a>

            <a
              href="https://www.instagram.com/ljresetl/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                width="32"
                height="32"
                className={styles.about_me_svg_link_connect}
              >
                <use
                  href="./images/icons.svg#icon-instagram"
                  className={styles.use_connect}
                ></use>
              </svg>
            </a>
          </div>
        </div>

        {/* Права частина (форма) */}
        <div className={styles.connect_container_two}>
          <form
            action="https://formspree.io/f/mzzggoog"
            method="POST"
            className={styles.modal_form}
            id="contact-form"
          >
            <input
              type="hidden"
              name="_subject"
              className={styles.modal_input}
              value="Нове повідомлення з сайту"
            />

            <label
              className={styles.modal_label}
              htmlFor="name"
              data-i18n="navСonnectName"
            >
              І'мя
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className={styles.modal_input}
              required
              placeholder="Your name"
            />

            <label
              className={styles.modal_label}
              htmlFor="phone"
              data-i18n="navСonnectTelefon"
            >
              Телефон
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className={styles.modal_input}
              placeholder="+38 (0XX) XXX-XX-XX"
              required
            />

            <label
              className={styles.modal_label}
              htmlFor="email"
              data-i18n="navСonnectMail"
            >
              Емейл
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={styles.modal_input}
              required
              placeholder="your@email.com"
            />

            <label
              className={styles.modal_label}
              htmlFor="message"
              data-i18n="navСonnectComment"
            >
              Коментар
            </label>
            <textarea
              id="message"
              name="message"
              className={styles.modal_textarea}
              placeholder="Your message"
            ></textarea>

            <button
              type="submit"
              className={styles.modal_button}
              data-i18n="navСonnectButtonSend"
            >
              Послати
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Connect;
