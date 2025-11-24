// Імпорт основних бібліотек React
import React, { useEffect, useState } from "react";

// Імпорт axios для виконання HTTP-запитів
import axios from "axios";

// Імпорт стилів з SCSS-модуля (локальні стилі для компонента)
import styles from "./WeatherBlock.module.scss";

// Імпорт компонента Section — обгортка для секцій сторінки (додає ефекти та стилі)
import Section from "../Section";

// Імпорт кастомного хука для багатомовності (повертає функцію t() для перекладу)
import { useLanguage } from "../../useLanguage"; 

// Імпорт іконок для відображення даних погоди
import { FaMapMarkerAlt } from "react-icons/fa";
import { WiThermometer, WiCloud, WiStrongWind } from "react-icons/wi";

// Інтерфейс для структури даних погоди з API
interface WeatherData {
  main: { temp: number }; // температура
  weather: { description: string; icon: string }[]; // опис та іконка
  wind: { speed: number }; // швидкість вітру
  name: string; // назва міста
}

// Основний компонент WeatherBlock
const WeatherBlock: React.FC = () => {
  const { t } = useLanguage(); // отримуємо функцію перекладу t()

  // 🧭 СТАНИ
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null); // координати користувача
  const [weather, setWeather] = useState<WeatherData | null>(null); // дані погоди
  const [loading, setLoading] = useState(false); // стан завантаження
  const [error, setError] = useState<string | null>(null); // повідомлення про помилку
  const [fallbackCity, setFallbackCity] = useState<string | null>("Прага"); // запасне місто (за замовчуванням Прага)
  const [showNotice, setShowNotice] = useState(false); // показ повідомлення у кутку

  // 🌦️ Виконуємо запит до API тільки якщо є координати
  useEffect(() => {
    if (coords) { // якщо координати встановлені
      const API_KEY = import.meta.env.VITE_WEATHER_KEY as string; // ключ API з .env
      if (!API_KEY) { // якщо ключа немає
        setError(t("weatherErrorNoKey")); // показати помилку
        return;
      }

      setLoading(true); // вмикаємо стан завантаження
      // Формуємо URL для запиту до OpenWeather API
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&lang=en&appid=${API_KEY}`;

      // Виконуємо запит
      axios
        .get<WeatherData>(url)
        .then((res) => {
          setWeather(res.data); // зберігаємо дані погоди
          setLoading(false); // вимикаємо стан завантаження
        })
        .catch(() => {
          setError(t("weatherErrorApi")); // якщо сталася помилка
          setLoading(false);
        });
    }
  }, [coords, t]); // залежності — координати та функція перекладу

  // 📍 Функція для отримання геолокації
  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // ✅ Якщо користувач дозволив геолокацію
        setCoords({ lat: position.coords.latitude, lon: position.coords.longitude }); // зберігаємо координати
        setFallbackCity(null); // запасне місто не потрібне
        setShowNotice(false); // повідомлення не показуємо
      },
      () => {
        // ❌ Якщо користувач відхилив геолокацію
        setCoords(null); // координати не ставимо!
        setFallbackCity("Praha"); // fallback місто
        // одразу встановлюємо погоду для Праги як fallback (штучні дані, можна замінити на реальний запит)
        setWeather({
          main: { temp: 0 }, // тимчасове значення температури
          weather: [{ description: "clear sky", icon: "" }], // умовний опис
          wind: { speed: 0 }, // умовна швидкість вітру
          name: "Praha" // fallback місто
        });
        setShowNotice(true); // показати повідомлення
        setTimeout(() => setShowNotice(false), 5000); // ⏱️ Автоматично приховати повідомлення через 5 секунд
      }
    );
  };

  // 🧱 РЕНДЕР КОМПОНЕНТА
  return (
    <Section className={`${styles.blur_effect} ${styles.gradient_effect}`}>
      <section className={styles.weather}>
        <div className={styles.container}>
          {/* Заголовок секції */}
          <h2>{t("weatherTitle")}</h2>

          {/* Кнопка для отримання геолокації */}
          {!coords && (
            <button onClick={requestLocation} className={styles.button}>
              {t("weatherGetLocation")}
            </button>
          )}

          {/* Повідомлення у кутку (показується на кілька секунд) */}
          {showNotice && (
            <div className={styles.locationNotice}>
              <p>{t("weatherErrorDenied")}</p>
            </div>
          )}

          {/* Стан завантаження */}
          {loading && <p>{t("weatherLoading")}</p>}

          {/* Помилка */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Дані погоди */}
          {weather && (
            <div className={styles.info}>
              {/* Місто */}
              <p>
                <FaMapMarkerAlt size={16} color="#256835" />{" "}
                {t("weatherCity")}: {fallbackCity ? fallbackCity : weather.name}
              </p>
              {/* Температура */}
              <p>
                <WiThermometer size={18} color="#e63946" />{" "}
                {t("weatherTemp")}: {weather.main.temp} °C
              </p>
              {/* Умови погоди */}
              <p>
                <WiCloud size={18} color="#457b9d" />{" "}
                {t("weatherConditions")}: {t(weather.weather[0].description as string)}
              </p>
              {/* Вітер */}
              <p>
                <WiStrongWind size={18} color="#1d3557" />{" "}
                {t("weatherWind")}: {weather.wind.speed} м/с
              </p>
            </div>
          )}
        </div>
      </section>
    </Section>
  );
};

// Експорт компонента для використання в інших частинах програми
export default WeatherBlock;
