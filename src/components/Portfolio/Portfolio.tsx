import React, { useState, useEffect } from "react"; // Імпортуємо React і хуки useState, useEffect
import styles from './Portfolio.module.scss'; // Імпортуємо CSS модулі для стилів компонента
import { projects } from "./projectsData"; // Імпортуємо масив проектів із зовнішнього файлу

// Створюємо функціональний компонент Portfolio
const Portfolio: React.FC = () => {
  // Стан: скільки карток проектів показувати
  const [visibleCount, setVisibleCount] = useState(4); // Стартове значення для мобільних/планшетів
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280); // Стан: чи зараз десктоп

  // Використовуємо useEffect для оновлення станів при зміні розміру вікна
  useEffect(() => {
    const handleResize = () => {
      // Якщо екран ширше або дорівнює 1280px → десктоп
      const isNowDesktop = window.innerWidth >= 1280;
      setIsDesktop(isNowDesktop);

      // Встановлюємо кількість видимих карток при зміні типу пристрою
      if (isNowDesktop) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };

    // Викликаємо при першому рендері
    handleResize();

    // Додаємо слухача події
    window.addEventListener("resize", handleResize);

    // При демонтажі прибираємо
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Функція "Показати більше"
  const loadMore = () => {
    // Якщо десктоп — додаємо 3 картки, інакше 2
    setVisibleCount((prev) => prev + (isDesktop ? 3 : 2));
  };

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={styles.container}>
        <h3 className={styles.portfolio_h}>Приклади робіт</h3>

        {/* Список проектів */}
        <div className={styles.portfolio_list}>
          {projects.slice(0, visibleCount).map((project, index) => (
            <div key={index} className={styles.project_card}>
              <h4 className={styles.portfolio_h_4}>{project.title}</h4>
              <p className={styles.portfolio_p}>{project.description}</p>

              <img
                src={project.image}
                alt={project.title}
                width={300}
                height={310}
                className={styles.project_image}
              />

              <p className={styles.portfolio_p_t}>Технології:</p>

              <ul className={styles.project_tech}>
                {project.technologies.map((tech, i) => (
                  <li key={i}>{tech}</li>
                ))}
              </ul>

              <div className={styles.project_links}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.project_button}
                >
                  GitHub
                </a>
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.project_button}
                >
                  Вебсайт
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка "Показати більше" */}
        {visibleCount < projects.length && (
          <button
            className={styles.button_loadmore}
            onClick={loadMore}
          >
            Показати більше
          </button>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
