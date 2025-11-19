import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./WeatherBlock.module.scss";
import Section from "../Section";
import WeatherIcon from "./WeatherIcon";
import { useLanguage } from "../../useLanguage"; // ✅ підключаємо переклад

interface WeatherData {
  main: { temp: number };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
  name: string;
}

const WeatherBlock: React.FC = () => {
  const { t } = useLanguage(); // ✅ доступ до перекладу
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fallbackCity, setFallbackCity] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
      },
      () => {
        setCoords({ lat: 50.0755, lon: 14.4378 }); // Прага
        setFallbackCity(t("weatherFallbackCity")); // ✅ переклад fallback міста
      }
    );
  }, [t]);

  useEffect(() => {
    if (coords) {
      const API_KEY = import.meta.env.VITE_WEATHER_KEY as string;
      if (!API_KEY) {
        setError(t("weatherErrorNoKey")); // ✅ переклад
        setLoading(false);
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&lang=uk&appid=${API_KEY}`;

      axios
        .get<WeatherData>(url)
        .then((res) => {
          setWeather(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError(t("weatherErrorApi")); // ✅ переклад
          setLoading(false);
        });
    }
  }, [coords, t]);

  return (
    <Section className={`${styles.blur_effect} ${styles.gradient_effect}`}>
      <section className={styles.weather}>
        <div className={styles.container}>
          <h2>{t("weatherTitle")}</h2>
          {loading && <p>{t("weatherLoading")}</p>}
          {error && !fallbackCity && <p style={{ color: "red" }}>{error}</p>}
          {weather && (
            <div className={styles.info}>
              <p>📍 {t("weatherCity")}: {fallbackCity ? fallbackCity : weather.name}</p>
              <p>🌡 {t("weatherTemp")}: {weather.main.temp} °C</p>
              <p>☁️ {t("weatherConditions")}: {weather.weather[0].description}</p>
              <p>💨 {t("weatherWind")}: {weather.wind.speed} м/с</p>

              <WeatherIcon description={weather.weather[0].description} />
            </div>
          )}
        </div>
      </section>
    </Section>
  );
};

export default WeatherBlock;
