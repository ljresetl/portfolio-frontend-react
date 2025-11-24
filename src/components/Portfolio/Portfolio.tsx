// Імпорт React та хуків useState, useEffect
import React, { useState, useEffect } from "react";

// Імпорт локальних стилів з SCSS-модуля
import styles from "./Portfolio.module.scss";

// Імпорт масиву проектів з окремого файлу projectsData.ts
// Кожен проект містить title, description, image, technologies, github, website
import { projects } from "./projectsData";

// Імпорт кастомного хука для багатомовності
// useLanguage повертає функцію t(), яка використовується для перекладу текстів
import { useLanguage } from "../../useLanguage";

// Імпорт компонента Section — обгортка для секцій сторінки, яка додає стилі та ефекти (blur, gradient)
import Section from "../Section";

// Оголошення функціонального компонента Portfolio
const Portfolio: React.FC = () => {
  // Виклик хука useLanguage. Деструктуризація повертає функцію t()
  const { t } = useLanguage();

  // === 🧭 СТАНИ КОМПОНЕНТА ===
  // isDesktop — чи зараз ширина екрана >= 1280px
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);

  // visibleCount — кількість проектів, які показуються на екрані
  // Якщо десктоп — показуємо 3, якщо мобільний/планшет — 4
  const [visibleCount, setVisibleCount] = useState(window.innerWidth >= 1280 ? 3 : 4);

  // === 📐 ХУК useEffect ДЛЯ ВІДСТЕЖЕННЯ РОЗМІРУ ЕКРАНА ===
  useEffect(() => {
    // Функція для перевірки ширини екрану
    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 1280;
      setIsDesktop(isNowDesktop);
    };

    // Додаємо слухач події resize
    window.addEventListener("resize", handleResize);

    // При розмонтуванні компонента видаляємо слухач
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // === 📥 ФУНКЦІЯ "Завантажити більше" ===
  const loadMore = () => {
    // Якщо десктоп — додаємо 3 проекти, якщо мобільний — 2
    setVisibleCount((prev) => prev + (isDesktop ? 3 : 2));
  };

  // === 🧱 РЕНДЕР КОМПОНЕНТА ===
  return (
    <Section className={`${styles.blur_effect} ${styles.gradient_effect}`}>
      {/* Семантичний тег <section> для блоку "Портфоліо" */}
      <section id="portfolio" className={styles.portfolio}>
        <div className={styles.container}>
          
          {/* Заголовок секції */}
          <h3 className={styles.portfolio_h}>{t("navPortfolioH")}</h3>
  
          {/* Список проектів */}
          <div className={styles.portfolio_list}>
            {/* Відображаємо тільки перші visibleCount проектів */}
            {projects.slice(0, visibleCount).map((project, index) => (
              <div key={index} className={styles.project_card}>
                
                {/* Назва проекту */}
                <h4 className={styles.portfolio_h_4}>{t(project.title)}</h4>
                
                {/* Опис проекту */}
                <p className={styles.portfolio_p}>{t(project.description)}</p>
  
                {/* Зображення проекту */}
                <img
                  src={project.image}
                  alt={t(project.title)}
                  width={300}
                  height={300}
                  className={styles.project_image}
                />
  
                {/* Підзаголовок "Технології" */}
                <p className={styles.portfolio_p_t}>{t("navPortfolioT")}</p>
  
                {/* Список технологій проекту */}
                <ul className={styles.project_tech}>
                  {project.technologies.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
  
                {/* Посилання на GitHub та сайт проекту */}
                <div className={styles.project_links}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.project_button} 
                    aria-label={t("navPortfolioAG")}  
                  >
                    {t("navPortfolioA")} {/* Текст кнопки "GitHub" */}
                  </a>
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.project_button}
                    aria-label={t("navPortfolioAW")}
                  >
                    {t("navPortfolioW")} {/* Текст кнопки "Website" */}
                  </a>
                </div>
              </div>
            ))}
          </div>
  
          {/* Кнопка "Завантажити більше" показується тільки якщо ще є проекти */}
          {visibleCount < projects.length && (
            <button className={styles.button_loadmore} onClick={loadMore}>
              {t("navPortfolioLoadMore")}
            </button>
          )}
        </div>
      </section>
    </Section>
  );
};

// Експорт компонента, щоб його можна було використати в App.tsx
export default Portfolio;
