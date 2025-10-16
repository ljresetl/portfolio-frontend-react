import React from 'react';
import styles from './AboutMe.module.scss';

const AboutMe: React.FC = () => {
    return (


            <section className={styles.aboutme} id="about">
                <div className={styles.container}>
                    <h1 className={styles.about_me_h} data-i18n="navAboutMe">
                        Про мене
                    </h1>
                    <div className={styles.about_me_right}>
                        <p
                            className={styles.about_me_p}
                            data-i18n="navAboutMeP"
                            id="resume"
                        >
                            Я — фронтенд-розробник із Ліберця, Чехія. Маю технічну освіту у
                            сфері комп’ютерних систем та спеціалізуюся на створенні сучасних
                            вебінтерфейсів. Мої основні пріоритети — це якість коду,
                            адаптивність і доступність для користувачів. Постійно працюю над
                            вдосконаленням навичок і освоєнням нових інструментів.
                        </p>
                        <p className={styles.about_me_p_two} data-i18n="navAboutMeTwoP">
                            У своїй роботі я поєдную прагматичний підхід і креативність, адже
                            вважаю, що кожен інтерфейс має бути не лише функціональним, а й
                            приємним у використанні. З особливим інтересом досліджую
                            JavaScript та сучасні фреймворки, щоб створювати ефективні рішення
                            для складних завдань. Створюю односторінкові сайти, покращую
                            UI/UX, працюю з HTML, CSS, JS, інтегрую зовнішні API. Поза
                            програмуванням надихаюся сім’єю та новими ідеями, які допомагають
                            мені розвиватися як фахівцю й особистості.
                        </p>
                        <div className={styles.button_a_a}>
                            <a
                                href="files/Vitalii_Baranov_Frontend_Developer.pdf"
                                download
                                className={styles.about_me_button}
                                data-i18n="navButtonResume"
                            >
                                Завантажити резюме
                                {/* <svg className={styles.about_me_svg} width="20" height="20">
                                  <use href="./images/icons.svg#icon-bx-downloadsvg"></use>
                                </svg> */}
                            </a>

                            <a
                                href="https://www.linkedin.com/in/vitalii-baranov/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className={styles.about_me_a}
                            >
                                <svg width="24" height="24" className={styles.about_me_svg_link}>
                                    <use href="./images/icons.svg#icon-linkendin"></use>
                                </svg>
                            </a>

                            <a
                                href="https://t.me/ljresetl"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Telegram"
                                className={styles.about_me_a}
                            >
                                <svg width="24" height="24" className={styles.about_me_svg_link}>
                                    <use href="./images/icons.svg#icon-telegram"></use>
                                </svg>
                            </a>

                            <a
                                href="https://github.com/ljresetl"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className={styles.about_me_a}
                            >
                                <svg width="24" height="24" className={styles.about_me_svg_link}>
                                    <use href="./images/icons.svg#icon-github"></use>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
    );
};

export default AboutMe;
