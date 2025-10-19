import React from "react";
import styles from "./Capabilities.module.scss";
import { useLanguage } from "../../useLanguage";

const Capabilities: React.FC = () => {
  const { t } = useLanguage(); // ✅ підключення перекладу

  return (
    <section id="capabilities" className={styles.capabilities}>
      <div className={styles.container}>
        <h2 className={styles.capabilities_h}>
          {t("navCapabilitiesH")}
        </h2>

        <div className={styles.capabilities_right}>
          <p className={styles.capabilities_p}>
            {t("navCapabilitiesP")}
          </p>

          <ul className={styles.capabilities_ul}>
            <li className={styles.capabilities_li}>{t("skillHTML")}</li>
            <li className={styles.capabilities_li}>{t("skillCSS")}</li>
            <li className={styles.capabilities_li}>{t("skillJS")}</li>
            <li className={styles.capabilities_li}>{t("skillFigma")}</li>
            <li className={styles.capabilities_li}>{t("skillVite")}</li>
            <li className={styles.capabilities_li}>{t("skillReact")}</li>
            <li className={styles.capabilities_li}>{t("skillTS")}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
