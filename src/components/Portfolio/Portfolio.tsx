import React, { useState, useEffect } from "react";
import styles from "./Portfolio.module.scss";
import { projects } from "./projectsData";
import { useLanguage } from "../../useLanguage";
import Section from "../Section";

const Portfolio: React.FC = () => {
  const { t } = useLanguage();

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  const [visibleCount, setVisibleCount] = useState(window.innerWidth >= 1280 ? 3 : 4);

  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 1280;
      setIsDesktop(isNowDesktop);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + (isDesktop ? 3 : 2));
  };

  return (
    <Section>
      <section id="portfolio" className={styles.portfolio}>
        <div className={styles.container}>
          <h3 className={styles.portfolio_h}>{t("navPortfolioH")}</h3>
  
          <div className={styles.portfolio_list}>
            {projects.slice(0, visibleCount).map((project, index) => (
              <div key={index} className={styles.project_card}>
                <h4 className={styles.portfolio_h_4}>{t(project.title)}</h4>
                <p className={styles.portfolio_p}>{t(project.description)}</p>
  
                <img
                  src={project.image}
                  alt={t(project.title)}
                  width={300}
                  height={300}
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

export default Portfolio;
