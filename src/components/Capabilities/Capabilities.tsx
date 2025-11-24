// Імпорт React для створення компонентів
import React from "react";

// Імпорт локальних стилів з SCSS-модуля
import styles from "./Capabilities.module.scss";

// Імпорт кастомного хука для багатомовності
// useLanguage повертає функцію t(), яка використовується для перекладу текстів
import { useLanguage } from "../../useLanguage";

// Імпорт дочірнього компонента SkillCircle — відображає одну навичку у вигляді кругового прогрес-бара
import SkillCircle from "./SkillCircle/SkillCircle";

// Імпорт компонента Section — обгортка для секцій сторінки, яка додає стилі та ефекти (blur, gradient)
import Section from "../Section";

// Оголошення функціонального компонента Capabilities
const Capabilities: React.FC = () => {
  // Виклик хука useLanguage. Деструктуризація повертає функцію t()
  // t("ключ") повертає перекладений текст для заданого ключа
  const { t } = useLanguage();

  // Масив навичок. Кожен елемент має label (назва навички) та level (рівень у відсотках)
  // label береться через t(), щоб текст був багатомовним
  const skills = [
    { label: t("skillHTML"), level: 80 },
    { label: t("skillCSS"), level: 75 },
    { label: t("skillJS"), level: 40 },
    { label: t("skillFigma"), level: 70 },
    { label: t("skillVite"), level: 55 },
    { label: t("skillReact"), level: 45 },
    { label: t("skillTS"), level: 40 },
  ];

  // JSX-розмітка компонента
  return (
    // Обгортка Section додає стилі blur_effect та gradient_effect
    <Section className={`${styles.blur_effect} ${styles.gradient_effect}`}>
      
      {/* Семантичний тег <section> для блоку "Навички" */}
      <section id="capabilities" className={styles.capabilities}>
        
        {/* Контейнер для вирівнювання контенту */}
        <div className={styles.container}>
          
          {/* Заголовок секції. Текст береться з перекладу */}
          <h2 className={styles.capabilities_h}>
            {t("navCapabilitiesH")}
          </h2>
  
          {/* Права частина секції з описом та списком навичок */}
          <div className={styles.capabilities_right}>
            
            {/* Абзац з описом секції. Текст перекладається */}
            <p className={styles.capabilities_p}>
              {t("navCapabilitiesP")}
            </p>
  
            {/* Блок зі списком навичок */}
            <div className={styles.capabilities_skills}>
              {/* Перебір масиву skills через map.
                  Для кожної навички створюється компонент SkillCircle.
                  key={index} — унікальний ключ для кожного елемента списку.
                  label — назва навички.
                  level — рівень володіння навичкою у відсотках. */}
              {skills.map((skill, index) => (
                <SkillCircle 
                  key={index} 
                  label={skill.label} 
                  level={skill.level} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
};

// Експорт компонента, щоб його можна було використати в App.tsx
export default Capabilities;
