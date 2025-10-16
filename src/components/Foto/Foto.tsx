import React from "react";
import styles from './Foto.module.scss';

const Foto: React.FC = () => {
    return (

            <section className={styles.foto}>
                <div className={styles.container}>
                    <img
                        srcSet="./images/343.webp 1x, ./images/686.webp 2x"
                        src="./images/343.webp"
                        width="343"
                        height="343"
                        alt="front-end"
                        className={styles.my_foto}
                        loading="lazy"
                    />
                    <div className={styles.about_me_text}>
                        <h1 className={styles.about_me_text_h} data-i18n="navAboutTextH">
                            Привіт! Я Віталій — Frontend розробник-початківець
                        </h1>
                        <p className={styles.about_me_text_p} data-i18n="navAboutTextP">
                            Наразі я активно вивчаю JavaScript і проходжу курси на Fullstack
                            розробника, щоб стати професіоналом у веб-розробці.
                        </p>
                        <p className={styles.about_me_text_p} data-i18n="navAboutTextPtwo">
                            Маю міцні знання HTML та CSS, вмію створювати адаптивні і
                            привабливі інтерфейси, що працюють на різних пристроях.
                        </p>
                        <p className={styles.about_me_text_p} data-i18n="navAboutTextPthree">
                            Працюю над проектами, щоб покращувати навички і освоювати нові
                            технології крок за кроком.
                        </p>
                        <p className={styles.about_me_text_p} data-i18n="navAboutTextPfour">
                            Вірю, що постійне навчання і практика — це ключ до успіху у
                            IT-сфері.
                        </p>
                        <p className={styles.about_me_text_p} data-i18n="navAboutTextPfive">
                            Я відкритий до нових викликів і готовий долучатися до цікавих
                            проектів, де зможу застосувати свої знання і продовжувати рости.
                        </p>
                        <p className={styles.about_me_text_p} data-i18n="navAboutTextPsix">
                            Якщо шукаєш мотивованого і цілеспрямованого розробника, який
                            швидко вчиться — зв'яжись зі мною!
                        </p>
                    </div>
                </div>
            </section>

    )
}

export default Foto;
