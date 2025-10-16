import React from "react";
import styles from './Experience.module.scss';

const Experience: React.FC = () => {
    return (

            <section className={styles.experience}>
                <div className={styles.container}>
                    <h3 className={styles.experience_h} data-i18n="navExperienceH">
                        Мій досвід
                    </h3>
                    <div className={styles.experience_right}>
                        <div className={styles.experience_right_top}>
                            <p className={styles.experience_p} data-i18n="navExperienceP">
                                Самостійне навчання та практичні проєкти
                            </p>
                            <p className={styles.experience_p_two} data-i18n="navExperiencePtwo">
                                2024 — теперішній час
                            </p>
                        </div>
                        <p className={styles.experience_p_two_two} data-i18n="navExperiencePthree">
                            Активно вивчаю фронтенд-розробку, працюю над навчальними й
                            особистими проєктами для закріплення знань на практиці. Опановую
                            сучасні технології (HTML, CSS, JavaScript) та поступово розширюю
                            компетенції у сфері веброзробки. Приклади моїх проектів можна
                            побачити нижче.
                        </p>
                        <div className={styles.experience_right_down}>
                            <p className={styles.experience_p_three} data-i18n="navExperiencePfour">
                                Курси та онлайн-навчання
                            </p>
                            <p className={styles.experience_p_four_four} data-i18n="navExperiencePsix">
                                2024 — теперішній час
                            </p>
                        </div>
                        <p className={styles.experience_p_five} data-i18n="navExperiencePseven">
                            Самоосвіта
                        </p>
                        <p className={styles.experience_p_two} data-i18n="navExperiencePeight">
                            Проходжу навчальні програми та онлайн-курси, які допомагають
                            розвивати практичні навички створення адаптивних і доступних
                            інтерфейсів. Регулярно практикуюся у написанні коду, реалізовую
                            власні мініпроєкти та вдосконалюю вміння працювати з сучасними
                            інструментами веброзробки. У 2024 році розпочав курси Fullstack
                            розробки у компанії <span className={styles.goit}>GoIT</span> і продовжую
                            навчання до сьогодні.
                        </p>
                    </div>
                </div>
            </section>
    );
};

export default Experience;
