// Імпорт React для створення компонентів
import React from "react";

// Імпорт локальних стилів з SCSS-модуля
import styles from "./Experience.module.scss";

// Імпорт кастомного хука для багатомовності
// useLanguage повертає функцію t(), яка використовується для перекладу текстів
import { useLanguage } from "../../useLanguage";

// Імпорт компонента Section — обгортка для секцій сторінки, яка додає стилі та ефекти (blur, gradient)
import Section from "../Section";

// Оголошення функціонального компонента Experience
const Experience: React.FC = () => {
  // Виклик хука useLanguage. Деструктуризація повертає функцію t()
  // t("ключ") повертає перекладений текст для заданого ключа
  const { t } = useLanguage();

  // JSX-розмітка компонента
  return (
    // Обгортка Section додає стилі blur_effect та gradient_effect
    <Section className={`${styles.blur_effect} ${styles.gradient_effect}`}>
      
      {/* Семантичний тег <section> для блоку "Досвід" */}
      <section className={styles.experience}>
        
        {/* Контейнер для вирівнювання контенту */}
        <div className={styles.container}>
          
          {/* Заголовок секції. Текст береться з перекладу */}
          <h3 className={styles.experience_h}>
            {t("navExperienceH")}
          </h3>
  
          {/* Права частина секції з текстовим описом досвіду */}
          <div className={styles.experience_right}>
            
            {/* Верхній блок з двома абзацами */}
            <div className={styles.experience_right_top}>
              <p className={styles.experience_p}>
                {t("navExperienceP")}
              </p>
              <p className={styles.experience_p_two}>
                {t("navExperiencePtwo")}
              </p>
            </div>
  
            {/* Окремий абзац з перекладеним текстом */}
            <p className={styles.experience_p_two_two}>
              {t("navExperiencePthree")}
            </p>
  
            {/* Нижній блок з двома абзацами */}
            <div className={styles.experience_right_down}>
              <p className={styles.experience_p_three}>
                {t("navExperiencePfour")}
              </p>
              <p className={styles.experience_p_four_four}>
                {t("navExperiencePsix")}
              </p>
            </div>
  
            {/* Ще один абзац з перекладеним текстом */}
            <p className={styles.experience_p_five}>
              {t("navExperiencePseven")}
            </p>
  
            {/* Абзац з посиланням на GoIT */}
            <p className={styles.experience_p_two}>
              {t("navExperiencePeight")}{" "}
              <a
                href="https://ref.goit.global/5fdde04f" // посилання на GoIT
                className={styles.goit}
                target="_blank" // відкриває у новій вкладці
                rel="noopener noreferrer" // безпека при відкритті нових вкладок
                aria-label="Посилання на GoIT"
              >
                GoIT
              </a>.
            </p>
          </div>
        </div>
      </section>
    </Section>
  );
};

// Експорт компонента, щоб його можна було використати в App.tsx
export default Experience;
