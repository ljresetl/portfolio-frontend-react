import React from "react";
import styles from "./Foto.module.scss";
import { useLanguage } from "../../useLanguage";

const Foto: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.foto}>
      <div className={styles.container}>
        <img
          srcSet="./images/343.webp 1x, ./images/686.webp 2x"
          src="./images/343.webp"
          width="343"
          height="343"
          alt="front-end"
          className={styles.my_foto}
          loading="lazy"
        />

        <div className={styles.about_me_text}>
          <h1 className={styles.about_me_text_h}>
            {t("navAboutTextH")}
          </h1>
          <p className={styles.about_me_text_p}>
            {t("navAboutTextP")}
          </p>
          <p className={styles.about_me_text_p}>
            {t("navAboutTextPtwo")}
          </p>
          <p className={styles.about_me_text_p}>
            {t("navAboutTextPthree")}
          </p>
          <p className={styles.about_me_text_p}>
            {t("navAboutTextPfour")}
          </p>
          <p className={styles.about_me_text_p}>
            {t("navAboutTextPfive")}
          </p>
          <p className={styles.about_me_text_p}>
            {t("navAboutTextPsix")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Foto;
