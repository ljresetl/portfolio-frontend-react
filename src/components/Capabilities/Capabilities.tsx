import React from "react";
import styles from './Capabilities.module.scss';

const Capabilities: React.FC = () => {
    return (

            <section id="capabilities" className={styles.capabilities}>
                <div className={styles.container}>
                    <h2 className={styles.capabilities_h} data-i18n="navCapabilitiesH">
                        Мої навички
                    </h2>
                    <div className={styles.capabilities_right}>
                        <p className={styles.capabilities_p} data-i18n="navCapabilitiesP">
                            Розвиваюся щодня, щоб бути в курсі сучасних технологій і трендів у
                            веб-розробці. Вірю, що наполегливість і постійне навчання
                            допоможуть мені досягти нових вершин у кар'єрі. Готовий братися за
                            складні проєкти та швидко вивчати нові інструменти.
                        </p>
                        <ul className={styles.capabilities_ul}>
                            <li className={styles.capabilities_li}>HTML</li>
                            <li className={styles.capabilities_li}>CSS/SCSS</li>
                            <li className={styles.capabilities_li}>Javascript</li>
                            <li className={styles.capabilities_li}>Figma</li>
                            <li className={styles.capabilities_li}>Vite</li>
                            <li className={styles.capabilities_li}>React</li>
                            <li className={styles.capabilities_li}>TypeScript</li>
                        </ul>
                    </div>
                </div>
            </section>
    );
};

export default Capabilities;
