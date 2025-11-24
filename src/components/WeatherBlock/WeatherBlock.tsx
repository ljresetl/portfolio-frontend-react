// Імпорт React та хуків useEffect, useState
import React, { useEffect, useState } from "react";

// Імпорт бібліотеки axios для HTTP-запитів
import axios from "axios";

// Імпорт локальних стилів з SCSS-модуля
import styles from "./WeatherBlock.module.scss";

// Імпорт компонента Section — обгортка для секцій сторінки, яка додає стилі та ефекти (blur, gradient)
import Section from "../Section";

// Імпорт кастомного хука для багатомовності
// useLanguage повертає функцію t(), яка використовується для перекладу текстів
import { useLanguage } from "../../useLanguage"; 

// Імпорт іконок для відображення погоди
import { FaMapMarkerAlt } from "react-icons/fa";
import { WiThermometer, WiCloud, WiStrongWind } from "react-icons/wi";

// Інтерфейс для структури даних погоди, які приходять з API
interface WeatherData {
  main: { temp: number }; // температура
  weather: { description: string; icon: string }[]; // опис та іконка
  wind: { speed: number }; // швидкість вітру
  name: string; // назва міста
}

// Функціональний компонент WeatherBlock
const WeatherBlock: React.FC = () => {
  // Виклик хука useLanguage. Деструктуризація повертає функцію t()
  const { t } = useLanguage(); 

  // === 🧭 СТАНИ КОМПОНЕНТА ===
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null); // координати користувача
  const [weather, setWeather] = useState<WeatherData | null>(null); // дані погоди
  const [loading, setLoading] = useState(false); // стан завантаження
  const [error, setError] = useState<string | null>(null); // помилка
  const [fallbackCity, setFallbackCity] = useState<string | null>("Прага"); // запасне місто (за замовчуванням Прага)

  // === 🌦️ ОТРИМАННЯ ДАНИХ ПОГОДИ З API ===
  useEffect(() => {
    // Виконується тільки якщо є координати
    if (coords) {
      const API_KEY = import.meta.env.VITE_WEATHER_KEY as string; // ключ з .env
      if (!API_KEY) {
        setError(t("weatherErrorNoKey")); // помилка, якщо ключа немає
        return;
      }

      setLoading(true); // вмикаємо стан завантаження
      // Формуємо URL для запиту до OpenWeather API
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&lang=en&appid=${API_KEY}`;

      // Запит до API
      axios
        .get<WeatherData>(url)
        .then((res) => {
          setWeather(res.data); // зберігаємо дані погоди
          setLoading(false);    // вимикаємо стан завантаження
        })
        .catch(() => {
          setError(t("weatherErrorApi")); // помилка при запиті
          setLoading(false);
        });
    }
  }, [coords, t]); // залежності — координати та функція перекладу

  // === 📍 ФУНКЦІЯ ДЛЯ ОТРИМАННЯ ГЕОЛОКАЦІЇ ===
  // Викликається тільки після кліку на кнопку
  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Якщо користувач дозволив геолокацію — зберігаємо координати
        setCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
        setFallbackCity(null); // якщо є координати, запасне місто не потрібне
      },
      () => {
        // Якщо користувач відмовив або сталася помилка
        setError(t("weatherErrorDenied"));
      }
    );
  };

  // === 🧱 РЕНДЕР КОМПОНЕНТА ===
  return (
    <Section className={`${styles.blur_effect} ${styles.gradient_effect}`}>
      <section className={styles.weather}>
        <div className={styles.container}>
          
          {/* Заголовок секції */}
          <h2>{t("weatherTitle")}</h2>

          {/* Повідомлення та кнопка для користувача */}
          {!coords && (
            <div className={styles.info}>
              <p>{t("weatherExplainLocation")}</p>
              <button onClick={requestLocation} className={styles.button}>
                {t("weatherGetLocation")}
              </button>
            </div>
          )}

          {/* Якщо дані ще завантажуються */}
          {loading && <p>{t("weatherLoading")}</p>}

          {/* Якщо сталася помилка */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Якщо дані погоди отримані */}
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

// Експорт компонента, щоб його можна було використати в App.tsx
export default WeatherBlock;
