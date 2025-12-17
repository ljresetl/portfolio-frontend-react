import React from "react";
import starSvg from "./hvezda.svg"; 
import styles from "./StarsSky.module.scss";

const StarsSky: React.FC = () => {
  const starsCount = 12; // Кількість зірок

  return (
    <div className={styles.sky}>
      {/* Фонові статичні зорі */}
      <div className={styles.stars}></div>
      
      {Array.from({ length: starsCount }).map((_, i) => {
        // Однакова швидкість для всіх для стабільного кута 45°
        const fixedDuration = "8.0"; 
        // Випадкова затримка, щоб вони не летіли одночасно
        const randomDelay = (Math.random() * 8).toFixed(1); 

        return (
          <div
            key={i}
            className={styles.shootingStar}
            style={
              {
                "--i": i, 
                "--total": starsCount,
                animationDuration: `${fixedDuration}s`,
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