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
  const [fallbackCity, setFallbackCity] = useState<string | null>("Прага"); // запасне місто
  const [showNotice, setShowNotice] = useState(false); // показ повідомлення у кутку

  // 🌦️ Виконуємо запит до API тільки якщо є координати
  useEffect(() => {
    if (coords) {
      const API_KEY = import.meta.env.VITE_WEATHER_KEY as string;
      if (!API_KEY) {
        setError(t("weatherErrorNoKey"));
        return;
      }

      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&lang=en&appid=${API_KEY}`;

      axios
        .get<WeatherData>(url)
        .then((res) => {
          console.log("✅ Отримано дані погоди:", res.data);
          setWeather(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("❌ Помилка при запиті до API:", err);
          setError(t("weatherErrorApi"));
          setLoading(false);
        });
    }
  }, [coords, t]);

  // 📍 Функція для отримання геолокації
  const requestLocation = () => {
    console.log("📍 Запит на геолокацію...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("✅ Геолокація дозволена:", position.coords);
        setCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
        setFallbackCity(null);
        setShowNotice(false);
      },
      (error) => {
        console.warn("❌ Геолокація відхилена або помилка:", error);
        if (error.code === 1) {
          console.warn("⛔ PERMISSION_DENIED");
        } else if (error.code === 2) {
          console.warn("📡 POSITION_UNAVAILABLE");
        } else if (error.code === 3) {
          console.warn("⏱️ TIMEOUT");
        }

        setCoords(null);
        setFallbackCity("Praha");
        setWeather({
          main: { temp: 0 },
          weather: [{ description: "clear sky", icon: "" }],
          wind: { speed: 0 },
          name: "Praha"
        });
        setShowNotice(true);
        setTimeout(() => setShowNotice(false), 5000);
      }
    );
  };

  // 🧱 РЕНДЕР КОМПОНЕНТА
  return (
    <Section className={`${styles.blur_effect} ${styles.gradient_effect}`}>
      <section className={styles.weather}>
        <div className={styles.container}>
          <h2>{t("weatherTitle")}</h2>

          {!coords && (
            <button onClick={requestLocation} className={styles.button}>
              {t("weatherGetLocation")}
            </button>
          )}

          {showNotice && (
            <div className={styles.locationNotice}>
              <p>{t("weatherErrorDenied")}</p>
            </div>
          )}

          {loading && <p>{t("weatherLoading")}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {weather && (
            <div className={styles.info}>
              <p>
                <FaMapMarkerAlt size={16} color="#256835" />{" "}
                {t("weatherCity")}: {fallbackCity ? fallbackCity : weather.name}
              </p>
              <p>
                <WiThermometer size={18} color="#e63946" />{" "}
                {t("weatherTemp")}: {weather.main.temp} °C
              </p>
              <p>
                <WiCloud size={18} color="#457b9d" />{" "}
                {t("weatherConditions")}: {t(weather.weather[0].description as string)}
              </p>
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

export default WeatherBlock;
