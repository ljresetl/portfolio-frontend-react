import React, { useState } from "react";
import styles from './Portfolio.module.scss'
import { projects } from "./projectsData"; // Масив проектів у окремому файлі

const Portfolio: React.FC = () => {
  // Стан: скільки карток показувати
  const [visibleCount, setVisibleCount] = useState(4);

  // Функція збільшення кількості видимих карток
  const loadMore = () => setVisibleCount((prev) => prev + 2);

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={styles.container}>
       <div className={styles.content}>
          <h3 className={styles.portfolio_h}>Приклади робіт</h3>
  
          {/* Рендер карток через map */}
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
                        <a href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.project_button}>
                    GitHub
                  </a>
                        <a href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.project_button}>
                    Вебсайт
                  </a>
                </div>
              </div>
            ))}
          </div>
  
          {/* Кнопка "Показати більше" */}
          {visibleCount < projects.length && (
            <button className={styles.button_loadmore} onClick={loadMore}>
              Показати більше
            </button>
          )}
        </div>
       </div>
    </section>
  );
};

export default Portfolio;
