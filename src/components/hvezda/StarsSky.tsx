import React from "react";
import starSvg from "./hvezda.svg"; // Імпорт зображення зірки (голова метеора)
import styles from "./StarsSky.module.scss"; // Імпорт стилів модуля

const StarsSky: React.FC = () => {
  return (
    // Головний контейнер для неба
    <div className={styles.sky}>
      {/* Статичний шар зірок (можливо, фон) */}
      <div className={styles.stars}></div>
      
      {/* Створюємо масив з 12 елементів і проходимо по ньому циклом */}
      {Array.from({ length: 12 }).map((_, i) => {
        
        // Генеруємо випадкову тривалість анімації від 10 до 12 секунд
        const randomDuration = (Math.random() * 5 + 1).toFixed(5); 
        
        // Генеруємо випадкову затримку перед початком анімації від 0 до 3 секунд
        const randomDelay = (Math.random() * 5).toFixed(1); 

        return (
          <div
            key={i} // Унікальний ключ для React (обов'язково в циклах)
            className={styles.shootingStar} // Клас, що відповідає за рух зірки
            style={
              {
                "--i": i, // Передаємо індекс в CSS як змінну (для розрахунку позиції left)
                animationDuration: `${randomDuration}s`, // Встановлюємо швидкість польоту
                animationDelay: `${randomDelay}s`, // Встановлюємо затримку появи
              } as React.CSSProperties
            }
          >
            {/* "Голова" зірки, що падає */}
            <div className={styles.core}>
              <img src={starSvg} alt="star" className={styles.starSvg} />
            </div>
            
            {/* "Хвіст" (шлейф) зірки */}
            <div className={styles.tail}></div>
          </div>
        );
      })}
    </div>
  );
};

export default StarsSky;