// Імпорт React для створення компонентів
import React from "react";

// Імпорт локальних стилів з SCSS-модуля
import styles from './Footer.module.scss'

// Імпорт компонента Section — обгортка для секцій сторінки, яка додає стилі та ефекти (blur, gradient)
import Section from "../Section";

// Оголошення функціонального компонента Footer
const Footer: React.FC = () => {
    // JSX-розмітка компонента
    return (
        // Обгортка Section додає стилі blur_effect та gradient_effect
        <Section className={`${styles.blur_effect} ${styles.gradient_effect}`}>
          
          {/* Семантичний тег <footer> для нижньої частини сайту */}
          <footer className={styles.footer}>
            
            {/* Контейнер для вирівнювання контенту */}
            <div className={styles.container}>
              
              {/* Абзац з текстом © та ім’ям автора */}
              <p className={styles.container_footer_p}>
                © 2025 Vitalii Baranov
              </p>
            </div>
          </footer>
        </Section>
    );
};

// Експорт компонента, щоб його можна було використати в App.tsx
export default Footer;
