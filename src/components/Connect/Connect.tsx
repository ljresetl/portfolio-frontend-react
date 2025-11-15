import React from "react";
import styles from "./Connect.module.scss";
import { useLanguage } from "../../useLanguage";
import Section from "../Section";

const Connect: React.FC = () => {
  const { t } = useLanguage(); // ✅ підключено переклад

  return (
   <Section className={`${styles.blur_effect} ${styles.gradient_effect}`}>
      <section id="connect" className={styles.connect}>
        <div className={styles.container}>
          {/* Ліва частина */}
          <div className={styles.connect_container_one}>
            <h3 className={styles.connect_container_one_h}>
              {t("navConnect")}
            </h3>
  
            {/* Перший параграф */}
            <p className={styles.connect_container_one_p}>
              <span>{t("navConnectP")}</span>{" "}
              <a
                href="mailto:ljresetl@gmail.com"
                className={styles.connect_span_a}
              >
                ljresetl@gmail.com
              </a>
            </p>
  
            {/* Другий параграф */}
            <p className={styles.connect_container_one_p}>
              <span>{t("navConnectPtwo")}</span>{" "}
              <a
                className={styles.connect_span_resume}
                href="#resume"
              >
                {t("navConnectR")}
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
                  <use href="./images/icons.svg#icon-linkendin"></use>
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
                  <use href="./images/icons.svg#icon-github"></use>
                </svg>
              </a>
  
              <a
                href="https://t.me/ljresetl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <svg
                  width="24"
                  height="24"
                  className={styles.about_me_svg_link_connect}
                >
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
                  <use href="./images/icons.svg#icon-instagram"></use>
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
                value={t("navConnectSubject")}
              />
  
              <label
                className={styles.modal_label}
                htmlFor="name"
              >
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
  
              <label
                className={styles.modal_label}
                htmlFor="phone"
              >
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
  
              <label
                className={styles.modal_label}
                htmlFor="email"
              >
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
  
              <label
                className={styles.modal_label}
                htmlFor="message"
              >
                {t("navConnectComment")}
              </label>
              <textarea
                id="message"
                name="message"
                className={styles.modal_textarea}
                placeholder={t("navConnectPlaceholderMessage")}
              ></textarea>
  
              <button
                type="submit"
                className={styles.modal_button}
              >
                {t("navConnectButtonSend")}
              </button>
            </form>
          </div>
        </div>
      </section>
   </Section>
  );
};

export default Connect;
