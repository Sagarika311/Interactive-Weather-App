// src/components/CurrentWeather.jsx
import React from "react";
import { motion } from "framer-motion";
import { weatherMapping } from "../utils/weatherMapping";

function CurrentWeather({ data, daily, hourly, unit, convertTemp, city }) {
  if (!data) return null;

  // WindSpeed
  const wind = data.windspeed ?? "—";

  // Determine current hour index in hourly data
  const currentTime = new Date(data.time);
  const currentHour = currentTime.getHours();

  // Find closest index in hourly array
  const hourTimes = hourly?.time || [];
  let humidity = "—";
  if (hourly?.relativehumidity_2m && hourTimes.length > 0) {
    const idx = hourTimes.findIndex(
      (t) => new Date(t).getHours() === currentHour
    );
    humidity = idx !== -1 ? hourly.relativehumidity_2m[idx] : hourly.relativehumidity_2m[0];
  }

  // Highest / Lowest → daily
  const tempMax = daily?.temperature_2m_max?.[0] ?? data.temperature;
  const tempMin = daily?.temperature_2m_min?.[0] ?? data.temperature;

  // Weather label & icon from mapping
  const code = data.weathercode;
  const weatherInfo = weatherMapping[code] || { label: "Unknown", icon: "❔" };

  return (
    <motion.div
      className="glass-card p-6 flex flex-col items-center w-full sm:w-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* City Name */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
        {city || "Unknown location"}
      </h2>

      {/* Current Temperature */}
      <p className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mt-2">
        {Math.round(convertTemp(data.temperature))}°{unit}
      </p>

      {/* Weather Icon */}
      <div className="text-6xl mt-2">{weatherInfo.icon}</div>

      {/* Weather Label */}
      <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-1">
        {weatherInfo.label}
      </p>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 mt-6 text-sm w-full justify-items-center text-gray-700 dark:text-gray-300">
        <div className="flex flex-col items-center gap-1">
          <span className="font-semibold">💨 Wind: {wind} km/h</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-semibold">💧 Humidity: {humidity}%</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-semibold">⬆️ Highest: {Math.round(convertTemp(tempMax))}°{unit}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-semibold">⬇️ Lowest: {Math.round(convertTemp(tempMin))}°{unit}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default CurrentWeather;
