import React from "react";
import styles from './Footer.module.scss'
import Section from "../Section";

const Footer: React.FC = () => {
    return (
 <Section>
   <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.container_footer_p}>© 2025 Vitalii Baranov</p>
        </div>
      </footer>
 </Section>
    );
};

export default Footer;