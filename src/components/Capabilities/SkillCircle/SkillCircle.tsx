// Імпорт React для створення компонентів
import React from "react";

// Імпорт компонентів з бібліотеки react-circular-progressbar
// CircularProgressbar — готовий компонент для відображення кругового прогресу
// buildStyles — утиліта для кастомізації стилів прогрес-бара
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

// Імпорт стандартних стилів бібліотеки (щоб прогресбар виглядав правильно)
import "react-circular-progressbar/dist/styles.css";

// Імпорт локальних стилів з SCSS-модуля
import styles from "./SkillCircle.module.scss";

// Оголошення інтерфейсу пропсів для компонента
// label — назва навички (наприклад, "React")
// level — рівень володіння навичкою у відсотках (0–100)
interface SkillCircleProps {
  label: string;
  level: number;
}

// Функціональний компонент SkillCircle
// Приймає пропси label та level
const SkillCircle: React.FC<SkillCircleProps> = ({ label, level }) => {
  return (
    // Контейнер для одного кружка навички
    <div className={styles.skill}>
      
      {/* Компонент CircularProgressbar */}
      <CircularProgressbar
        // Значення прогресу (відсотки)
        value={level}
        
        // Текст усередині кружка (наприклад "80%")
        text={`${level}%`}
        
        // Кастомні стилі для прогрес-бара
        styles={buildStyles({
          // Колір тексту всередині кружка. Використовує CSS-змінну теми
          textColor: "var(--text-color)", 
          
          // Колір заповненої частини (pathColor) залежить від рівня:
          // >70% — зелений (#4caf50)
          // >40% — помаранчевий (#ff9800)
          // ≤40% — червоний (#f44336)
          pathColor: level > 70 ? "#4caf50" : level > 40 ? "#ff9800" : "#f44336",
          
          // Колір незаповненої частини (фон треку)
          trailColor: "#eee",
        })}
      />
      
      {/* Підпис під кружком — назва навички */}
      <div className={styles.label}>{label}</div>
    </div>
  );
};

// Експорт компонента, щоб його можна було використати в інших місцях (наприклад, у списку навичок)
export default SkillCircle;
