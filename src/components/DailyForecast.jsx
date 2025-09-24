import React from "react";
import { motion } from "framer-motion";
import { weatherMapping } from "../utils/weatherMapping";

function DailyForecast({ data, unit, convertTemp }) {
  if (!data || !data.time || !data.temperature_2m_max || !data.temperature_2m_min || !data.weathercode)
    return null;

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold mb-4 text-center">7-Day Forecast</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {data.time.slice(0, 7).map((day, idx) => {
          const weatherInfo = weatherMapping[data.weathercode[idx]] || {
            icon: "☀️",
            label: "Clear",
          };

          return (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.08, y: -6 }}
              className="rounded-2xl bg-white/60 dark:bg-black/40 shadow-md 
              hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-between p-4 backdrop-blur-md"
              aria-label={`Weather on ${new Date(day).toLocaleDateString("en-US", {
                weekday: "long",
              })}: High ${Math.round(convertTemp(data.temperature_2m_max[idx]))}°${unit}, 
              Low ${Math.round(convertTemp(data.temperature_2m_min[idx]))}°${unit}, ${weatherInfo.label}`}
            >
              {/* Day name */}
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {new Date(day).toLocaleDateString("en-US", { weekday: "short" })}
              </p>

              {/* Weather icon */}
              <span className="text-2xl my-2">{weatherInfo.icon}</span>

              {/* Temps */}
              <div className="flex flex-col items-center gap-1">
                <p className="font-bold text-lg text-gray-900 dark:text-gray-100">
                  {Math.round(convertTemp(data.temperature_2m_max[idx]))}°{unit}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.round(convertTemp(data.temperature_2m_min[idx]))}°{unit}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default DailyForecast;
