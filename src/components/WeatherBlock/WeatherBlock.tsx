import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "./WeatherBlock.module.scss";
import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi";
import citiesData from "../../data/cities.json";

// 🔥 Тип під реальний JSON
interface City {
  name: string;
  lat: string;
  lng: string;
  country: string;
  admin1?: string;
  admin2?: string;
}

interface ForecastItem {
  dt_txt: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

interface ForecastResponse {
  cod: string;
  list: ForecastItem[];
  city: { name: string };
}

interface TickerDay {
  date: string;
  desc: string;
  tmin: number;
  tmax: number;
  icon: string;
}

const WeatherTicker: React.FC = () => {
  const API_KEY = import.meta.env.VITE_WEATHER_KEY as string;

  const [cities, setCities] = useState<City[]>([]);
  const [city, setCity] = useState("Prague");
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<City[]>([]);
  const [days, setDays] = useState<TickerDay[]>([]);
  const [bgClass, setBgClass] = useState("defaultBg");

  // 🔥 Завантаження міст без fetch
  useEffect(() => {
    setCities(citiesData as City[]);
  }, []);

  const weatherIcon = (code: string) => {
    if (code.includes("01")) return <WiDaySunny size={22} color="#facc15" />;
    if (code.includes("02") || code.includes("03")) return <WiCloud size={22} color="#64748b" />;
    if (code.includes("09") || code.includes("10")) return <WiRain size={22} color="#3b82f6" />;
    if (code.includes("13")) return <WiSnow size={22} color="#60a5fa" />;
    return <WiCloud size={22} color="#94a3b8" />;
  };

  const getWeather = useCallback(
    async (selectedCity: string) => {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${API_KEY}&units=metric&lang=en`;

      try {
        const res = await axios.get<ForecastResponse>(url);

        if (res.data.cod === "200") {
          const grouped: Record<string, ForecastItem[]> = {};

          res.data.list.forEach(item => {
            const date = item.dt_txt.split(" ")[0];
            if (!grouped[date]) grouped[date] = [];
            grouped[date].push(item);
          });

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

          setDays(result);

          const code = result[0]?.icon || "";
          if (code.includes("01")) setBgClass("clearBg");
          else if (code.includes("02") || code.includes("03")) setBgClass("cloudBg");
          else if (code.includes("09") || code.includes("10")) setBgClass("rainBg");
          else if (code.includes("13")) setBgClass("snowBg");
          else setBgClass("defaultBg");
        }
      } catch {
        setDays([{ date: "—", desc: "Error loading forecast", tmin: 0, tmax: 0, icon: "01d" }]);
      }
    },
    [API_KEY]
  );

  useEffect(() => {
    getWeather(city);
  }, [city, getWeather]);

  // Автодоповнення
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setMatches([]);
      return;
    }

    const q = query.toLowerCase();
    const filtered = cities
      .filter(c => c.name.toLowerCase().includes(q))
      .slice(0, 10);

    setMatches(filtered);
  }, [query, cities]);

  const handlePickCity = (c: City) => {
    setCity(c.name);
    setQuery(c.name);
    setMatches([]);
    getWeather(c.name);
  };

  return (
    <div className={`${styles.tickerWrapper} ${styles[bgClass]}`}>
      <div className={styles.citySearch}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter city"
          className={styles.cityInput}
        />

        {matches.length > 0 && (
          <ul className={styles.autocompleteList}>
            {matches.map(c => (
              <li key={c.name} onClick={() => handlePickCity(c)}>
                {c.name}, {c.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.ticker}>
        <div className={styles.tickerContent}>
          <span className={styles.cityLabel}>{city}</span>

          {days.map((d, idx) => (
            <span key={idx} className={styles.dayChip}>
              {weatherIcon(d.icon)}
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
