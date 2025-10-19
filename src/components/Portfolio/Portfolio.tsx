import React, { useState, useEffect } from "react";
import styles from "./Portfolio.module.scss";
import { projects } from "./projectsData";
import { useLanguage } from "../../useLanguage";

const Portfolio: React.FC = () => {
  const { t } = useLanguage();

  const [visibleCount, setVisibleCount] = useState(4);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);

  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 1280;
      setIsDesktop(isNowDesktop);
      setVisibleCount(isNowDesktop ? 3 : 4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + (isDesktop ? 3 : 2));
  };

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className={styles.container}>
        {/* Заголовок */}
        <h3 className={styles.portfolio_h}>{t("navPortfolioH")}</h3>

        {/* Список проектів */}
        <div className={styles.portfolio_list}>
          {projects.slice(0, visibleCount).map((project, index) => (
            <div key={index} className={styles.project_card}>
              <h4 className={styles.portfolio_h_4}>{t(project.title)}</h4>
              <p className={styles.portfolio_p}>{t(project.description)}</p>

              <img
                src={project.image}
                alt={t(project.title)}
                width={300}
                height={310}
                className={styles.project_image}
              />

              <p className={styles.portfolio_p_t}>{t("navPortfolioT")}</p>

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
                  {t("navPortfolioA")}
                </a>
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.project_button}
                >
                  {t("navPortfolioW")}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка "Показати більше" */}
        {visibleCount < projects.length && (
          <button className={styles.button_loadmore} onClick={loadMore}>
            {t("navPortfolioLoadMore")}
          </button>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
