import React from "react";
import styles from "./Experience.module.scss";
import { useLanguage } from "../../useLanguage";

const Experience: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.experience}>
      <div className={styles.container}>
        <h3 className={styles.experience_h}>
          {t("navExperienceH")}
        </h3>

        <div className={styles.experience_right}>
          <div className={styles.experience_right_top}>
            <p className={styles.experience_p}>
              {t("navExperienceP")}
            </p>
            <p className={styles.experience_p_two}>
              {t("navExperiencePtwo")}
            </p>
          </div>

          <p className={styles.experience_p_two_two}>
            {t("navExperiencePthree")}
          </p>

          <div className={styles.experience_right_down}>
            <p className={styles.experience_p_three}>
              {t("navExperiencePfour")}
            </p>
            <p className={styles.experience_p_four_four}>
              {t("navExperiencePsix")}
            </p>
          </div>

          <p className={styles.experience_p_five}>
            {t("navExperiencePseven")}
          </p>

          <p className={styles.experience_p_two}>
            {t("navExperiencePeight")}{" "}
            <span className={styles.goit}>GoIT</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Experience;
