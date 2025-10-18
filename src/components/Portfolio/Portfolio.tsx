import React, { useState, useEffect } from "react"; // Імпортуємо React і хуки useState, useEffect
import styles from './Portfolio.module.scss'; // Імпортуємо CSS модулі для стилів компонента
import { projects } from "./projectsData"; // Імпортуємо масив проектів із зовнішнього файлу

// Створюємо функціональний компонент Portfolio
const Portfolio: React.FC = () => {
  // Стан: скільки карток проектів показувати на даний момент
  const [visibleCount, setVisibleCount] = useState(4); // Значення за замовчуванням (для мобільних/планшетів)

  // Використовуємо useEffect, щоб змінювати кількість карток при зміні розміру екрана
  useEffect(() => {
    const updateVisibleCount = () => {
      // Якщо ширина екрана 1280px і більше → десктоп
      if (window.innerWidth >= 1280) {
        setVisibleCount(3);
      } else {
        // Інакше (планшет або мобільний)
        setVisibleCount(4);
      }
    };

    // Викликаємо одразу при першому рендері
    updateVisibleCount();

    // Додаємо слухач події зміни розміру екрана
    window.addEventListener("resize", updateVisibleCount);

    // При демонтажі компонента прибираємо слухач
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Функція для збільшення кількості видимих карток при натисканні на кнопку "Показати більше"
  const loadMore = () => setVisibleCount((prev) => prev + 2);

  return (
    // Основна секція з id="portfolio" для переходів по якорю
    <section id="portfolio" className={styles.portfolio}>
      {/* Контейнер для центрування контенту і відступів */}
      <div className={styles.container}>
       
        {/* Заголовок секції */}
        <h3 className={styles.portfolio_h}>Приклади робіт</h3>
  
        {/* Список карток проектів */}
        <div className={styles.portfolio_list}>
          {/* Відображаємо тільки ті проекти, що в межах visibleCount */}
          {projects.slice(0, visibleCount).map((project, index) => (
            // Кожна картка проекту
            <div key={index} className={styles.project_card}>
              
              {/* Заголовок проекту */}
              <h4 className={styles.portfolio_h_4}>{project.title}</h4>

              {/* Опис проекту */}
              <p className={styles.portfolio_p}>{project.description}</p>

              {/* Зображення проекту */}
              <img
                src={project.image} // шлях до зображення
                alt={project.title} // альтернативний текст
                width={300} // ширина (в px)
                height={310} // висота (в px)
                className={styles.project_image} // стилі CSS
              />

              {/* Підзаголовок для списку технологій */}
              <p className={styles.portfolio_p_t}>Технології:</p>

              {/* Список технологій проекту */}
              <ul className={styles.project_tech}>
                {project.technologies.map((tech, i) => (
                  <li key={i}>{tech}</li> // Кожен елемент списку з унікальним ключем
                ))}
              </ul>

              {/* Посилання на GitHub і вебсайт проекту */}
              <div className={styles.project_links}>
                <a
                  href={project.github} // посилання на репозиторій GitHub
                  target="_blank" // відкривається у новому вікні
                  rel="noopener noreferrer" // безпечний атрибут
                  className={styles.project_button} // стилі кнопки
                >
                  GitHub
                </a>
                <a
                  href={project.website} // посилання на вебсайт проекту
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
  
        {/* Кнопка "Показати більше", зʼявляється якщо visibleCount менше загальної кількості проектів */}
        {visibleCount < projects.length && (
          <button
            className={styles.button_loadmore} // стилі кнопки
            onClick={loadMore} // при кліку викликаємо loadMore
          >
            Показати більше
          </button>
        )}
      </div>
    </section>
  );
};

// Експортуємо компонент для використання в інших файлах
export default Portfolio;
