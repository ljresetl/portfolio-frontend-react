import React from "react";
import styles from "./Capabilities.module.scss";
import { useLanguage } from "../../useLanguage";
import SkillCircle from "./SkillCircle/SkillCircle";
import Section from "../Section";

const Capabilities: React.FC = () => {
  const { t } = useLanguage();

  const skills = [
    { label: t("skillHTML"), level: 80 },
    { label: t("skillCSS"), level: 75 },
    { label: t("skillJS"), level: 40 },
    { label: t("skillFigma"), level: 70 },
    { label: t("skillVite"), level: 55 },
    { label: t("skillReact"), level: 45 },
    { label: t("skillTS"), level: 40 },
  ];

  return (
    <Section className={`${styles.blur_effect} ${styles.gradient_effect}`}>
      <section id="capabilities" className={styles.capabilities}>
        <div className={styles.container}>
          <h2 className={styles.capabilities_h}>
            {t("navCapabilitiesH")}
          </h2>
  
          <div className={styles.capabilities_right}>
            <p className={styles.capabilities_p}>
              {t("navCapabilitiesP")}
            </p>
  
            <div className={styles.capabilities_skills}>
              {skills.map((skill, index) => (
                <SkillCircle key={index} label={skill.label} level={skill.level} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
};

export default Capabilities;
