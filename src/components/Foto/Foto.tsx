// Імпорт React для створення компонентів
import React from "react";

// Імпорт локальних стилів з SCSS-модуля
import styles from "./Foto.module.scss";

// Імпорт кастомного хука для багатомовності
// useLanguage повертає функцію t(), яка використовується для перекладу текстів
import { useLanguage } from "../../useLanguage";

// Імпорт компонента Section — обгортка для секцій сторінки, яка додає стилі та ефекти (blur, gradient)
import Section from "../Section";

// Оголошення функціонального компонента Foto
const Foto: React.FC = () => {
  // Виклик хука useLanguage. Деструктуризація повертає функцію t()
  // t("ключ") повертає перекладений текст для заданого ключа
  const { t } = useLanguage();

  // JSX-розмітка компонента
  return (
    // Обгортка Section додає стилі blur_effect та gradient_effect
    <Section className={`${styles.blur_effect} ${styles.gradient_effect}`}>
      
      {/* Семантичний тег <section> для блоку з фото та текстом "Про мене" */}
      <section className={styles.foto}>
        
        {/* Контейнер для вирівнювання контенту */}
        <div className={styles.container}>
          
          {/* Фото з використанням сучасних атрибутів для оптимізації */}
<img
  srcSet="./images/343.webp 1x, ./images/686.webp 2x"
  sizes="(max-width: 768px) 100vw, 343px"
  src="./images/343.webp"
  width={343}
  height={343}
  alt="front-end"
            loading="eager"
            decoding="auto"
            fetchPriority="high"
  className={styles.my_foto}
/>
  
          {/* Блок з текстом "Про мене" */}
          <div className={styles.about_me_text}>
            
            {/* Заголовок секції */}
            <h1 className={styles.about_me_text_h}>
              {t("navAboutTextH")}
            </h1>
            
            {/* Абзаци з перекладеним текстом */}
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
    </Section>
  );
};

// Експорт компонента, щоб його можна було використати в App.tsx
export default Foto;
