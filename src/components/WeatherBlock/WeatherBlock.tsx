import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./WeatherBlock.module.scss";
import Section from "../Section";
import { useLanguage } from "../../useLanguage"; 
import { FaMapMarkerAlt } from "react-icons/fa";
import { WiThermometer, WiCloud, WiStrongWind } from "react-icons/wi";

// Інтерфейс для структури даних погоди з API
interface WeatherData {
  main: { temp: number }; // температура
  weather: { description: string; icon: string }[]; // опис та іконка
  wind: { speed: number }; // швидкість вітру
  name: string; // назва міста
}

const WeatherBlock: React.FC = () => {
  const { t } = useLanguage(); 

  // 🧭 СТАНИ
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null); // координати
  const [weather, setWeather] = useState<WeatherData | null>(null); // дані погоди
  const [loading, setLoading] = useState(false); // стан завантаження
  const [error, setError] = useState<string | null>(null); // помилка
  const [fallbackCity, setFallbackCity] = useState<string | null>("Прага"); // запасне місто
  const [showNotice, setShowNotice] = useState(false); // показ повідомлення у кутку

  // 🌦️ Запит до API тільки якщо є координати
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
          setWeather(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError(t("weatherErrorApi"));
          setLoading(false);
        });
    }
  }, [coords, t]);

  // 📍 Функція для отримання геолокації
  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // ✅ Якщо користувач дозволив
        setCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
        setFallbackCity(null);
        setShowNotice(false); // повідомлення не показуємо
      },
      () => {
        // ❌ Якщо користувач відхилив
        setCoords({ lat: 50.0755, lon: 14.4378 }); // Прага
        setFallbackCity("Praha");
        setShowNotice(true); // показати повідомлення

        // ⏱️ Приховати повідомлення через 5 секунд
        setTimeout(() => setShowNotice(false), 5000);
      }
    );
  };

  // 🧱 РЕНДЕР
  return (
    <Section className={`${styles.blur_effect} ${styles.gradient_effect}`}>
      <section className={styles.weather}>
        <div className={styles.container}>
          <h2>{t("weatherTitle")}</h2>

          {/* Кнопка для отримання геолокації */}
          {!coords && (
            <button onClick={requestLocation} className={styles.button}>
              {t("weatherGetLocation")}
            </button>
          )}

          {/* Повідомлення у кутку */}
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
