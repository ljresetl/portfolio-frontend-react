// src/components/WeatherIcon.tsx
import React from "react";

interface WeatherIconProps {
  description: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ description }) => {
  const lowerDesc = description.toLowerCase();

  if (lowerDesc.includes("дощ")) {
    return <span style={{ fontSize: "40px" }}>🌧</span>;
  }
  if (lowerDesc.includes("хмар")) {
    return <span style={{ fontSize: "40px" }}>☁️</span>;
  }
  if (lowerDesc.includes("сонце") || lowerDesc.includes("ясно")) {
    return <span style={{ fontSize: "40px" }}>🌞</span>;
  }

  // fallback
  return <span style={{ fontSize: "40px" }}>🌡</span>;
};

export default WeatherIcon;
