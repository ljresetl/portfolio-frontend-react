import React from "react";
import styles from './Footer.module.scss'

const Footer: React.FC = () => {
    return (
 <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.container_footer_p}>© 2025 Vitalii Baranov</p>
      </div>
    </footer>
    );
};

export default Footer;