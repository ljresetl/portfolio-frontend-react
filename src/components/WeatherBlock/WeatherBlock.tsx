import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "./WeatherBlock.module.scss";
import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi"; // 🔹 Іконки погоди з react-icons

// 🔹 Тип для міста з JSON
interface City {
  id: number;
  name: string;
  country: string;
  cs?: string;
  uk?: string;
}

// 🔹 Тип для одного елемента прогнозу
interface ForecastItem {
  dt_txt: string; // дата та час прогнозу
  main: { temp: number }; // температура
  weather: { description: string; icon: string }[]; // опис та код іконки
}

// 🔹 Тип для відповіді від API
interface ForecastResponse {
  cod: string; // код відповіді (200 = успіх)
  list: ForecastItem[]; // список прогнозів
  city: { name: string }; // назва міста
}

// 🔹 Тип для даних, які ми показуємо у тікері
interface TickerDay {
  date: string; // дата (форматована)
  desc: string; // опис погоди
  tmin: number; // мінімальна температура
  tmax: number; // максимальна температура
  icon: string; // код іконки (наприклад "10d")
}

const WeatherTicker: React.FC = () => {
  // 🔹 API ключ із .env
  const API_KEY = import.meta.env.VITE_WEATHER_KEY as string;

  // 🔹 Стан для списку міст
  const [cities, setCities] = useState<City[]>([]);
  // 🔹 Поточне вибране місто
  const [city, setCity] = useState("Prague");
  // 🔹 Текст, який вводить користувач
  const [query, setQuery] = useState("");
  // 🔹 Підказки для автодоповнення
  const [matches, setMatches] = useState<City[]>([]);
  // 🔹 Прогноз на кілька днів
  const [days, setDays] = useState<TickerDay[]>([]);
  // 🔹 Клас для фону (clearBg, cloudBg, rainBg, snowBg)
  const [bgClass, setBgClass] = useState("defaultBg");

  // 🔹 Завантаження списку міст з GitHub
  useEffect(() => {
    fetch("/cities.json")
      .then(res => res.json()) // перетворюємо відповідь у JSON
      .then((data: City[]) => setCities(data)) // зберігаємо у стан
      .catch(() => console.error("Не вдалося завантажити список міст"));
  }, []);

  // 🔹 Функція для вибору іконки залежно від коду погоди
  const weatherIcon = (code: string) => {
    if (code.includes("01")) return <WiDaySunny size={22} color="#facc15" />;
    if (code.includes("02") || code.includes("03")) return <WiCloud size={22} color="#64748b" />;
    if (code.includes("09") || code.includes("10")) return <WiRain size={22} color="#3b82f6" />;
    if (code.includes("13")) return <WiSnow size={22} color="#60a5fa" />;
    return <WiCloud size={22} color="#94a3b8" />;
  };

  // 🔹 Завантаження погоди для вибраного міста
  const getWeather = useCallback(async (selectedCity: string) => {
    // Формуємо URL для OpenWeather API
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${API_KEY}&units=metric&lang=en`;
    try {
      const res = await axios.get<ForecastResponse>(url); // робимо запит
      if (res.data.cod === "200") {
        // групуємо дані по датах
        const grouped: Record<string, ForecastItem[]> = {};
        res.data.list.forEach(item => {
          const date = item.dt_txt.split(" ")[0]; // беремо тільки дату
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(item);
        });

        // беремо перші 5 днів
        const next5 = Object.keys(grouped).slice(0, 5);
        const result: TickerDay[] = next5.map(d => {
          const items = grouped[d];
          const temps = items.map(i => i.main.temp);
          const tmin = Math.round(Math.min(...temps));
          const tmax = Math.round(Math.max(...temps));
          const first = items[0];
          return {
            date: new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
            desc: first.weather[0].description,
            tmin,
            tmax,
            icon: first.weather[0].icon
          };
        });

        setDays(result); // зберігаємо прогноз у стан

        // міняємо фон за першим днем
        const code = result[0]?.icon || "";
        if (code.includes("01")) setBgClass("clearBg");
        else if (code.includes("02") || code.includes("03")) setBgClass("cloudBg");
        else if (code.includes("09") || code.includes("10")) setBgClass("rainBg");
        else if (code.includes("13")) setBgClass("snowBg");
        else setBgClass("defaultBg");
      }
    } catch {
      // якщо помилка — показуємо повідомлення
      setDays([{ date: "—", desc: "Error loading forecast", tmin: 0, tmax: 0, icon: "01d" }]);
    }
  }, [API_KEY]);

  // 🔹 Викликаємо getWeather при старті та зміні міста
  useEffect(() => {
    getWeather(city);
  }, [city, getWeather]);

  // 🔹 Автодоповнення: шукаємо міста по введеному тексту
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setMatches([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = cities
      .filter(c =>
        c.name.toLowerCase().includes(q) ||
        (c.cs && c.cs.toLowerCase().includes(q)) ||
        (c.uk && c.uk.toLowerCase().includes(q))
      )
      .slice(0, 10); // показуємо максимум 10 варіантів
    setMatches(filtered);
  }, [query, cities]);

  // 🔹 Обробка кліку по місту з автодоповнення
  const handlePickCity = (c: City) => {
    setCity(c.name); // змінюємо місто
    setQuery(c.name); // вставляємо назву у поле вводу
    setMatches([]); // очищаємо список підказок
    getWeather(c.name); // завантажуємо прогноз
  };

  return (
    <div className={`${styles.tickerWrapper} ${styles[bgClass]}`}>
      {/* Поле пошуку міста */}
      <div className={styles.citySearch}>
        <input
          type="text"
          value={query} // значення поля
          onChange={e => setQuery(e.target.value)} // оновлюємо query при вводі
          placeholder="Enter city"
          className={styles.cityInput}
        />
        {/* Показуємо список підказок */}
        {matches.length > 0 && (
          <ul className={styles.autocompleteList}>
            {matches.map(c => (
              <li key={c.id} onClick={() => handlePickCity(c)}>
                {c.name}, {c.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Бігучий рядок з прогнозом */}
      <div className={styles.ticker}>
        <div className={styles.tickerContent}>
          <span className={styles.cityLabel}>{city}</span>
          {days.map((d, idx) => (
            <span key={idx} className={styles.dayChip}>
              {weatherIcon(d.icon)} {/* показуємо іконку */}
              <span className={styles.dayText}>
                {d.date}: {d.desc}, {d.tmin}°/{d.tmax}°
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherTicker;
