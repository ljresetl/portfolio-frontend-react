import React from "react";
import starSvg from "./hvezda.svg"; // твій SVG
import styles from "./StarsSky.module.scss";

const StarsSky: React.FC = () => {
  return (
    <div className={styles.sky}>
      <div className={styles.stars}></div>
      {Array.from({ length: 12 }).map((_, i) => {
        // випадкові параметри для кожної зірки
        const randomDuration = (Math.random() * 2 + 10).toFixed(1); // 2–4s
        const randomDelay = (Math.random() * 3).toFixed(1); // 0–3s

        return (
          <div
            key={i}
            className={styles.shootingStar}
            style={
              {
                "--i": i, // індекс для left
                animationDuration: `${randomDuration}s`,
                animationDelay: `${randomDelay}s`,
              } as React.CSSProperties
            }
          >
            <div className={styles.core}>
              <img src={starSvg} alt="star" className={styles.starSvg} />
            </div>
            <div className={styles.tail}></div>
          </div>
        );
      })}
    </div>
  );
};

export default StarsSky;
