import React from "react";
import { motion } from "framer-motion";
import { weatherMapping } from "../utils/weatherMapping";

function HourlyForecast({ data, unit, convertTemp }) {
  if (!data || !data.time || !data.temperature_2m || !data.weathercode) return null;

  const sliceCount = Math.min(
    24,
    data.time.length,
    data.temperature_2m.length,
    data.weathercode.length
  );

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Hourly Forecast</h2>
      <div className="flex gap-4 overflow-x-auto snap-x py-2">
        {data.time.slice(0, sliceCount).map((time, idx) => {
          const weatherInfo = weatherMapping[data.weathercode[idx]] || {
            icon: "☀️",
            label: "Clear",
          };

          return (
            <motion.div
              key={time}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.07, y: -4 }}
              className="snap-center min-w-[120px] p-4 rounded-xl bg-white/70 dark:bg-black/40 shadow hover:scale-105 transition-transform flex flex-col items-center hover:shadow-lg hover:bg-white/50 dark:hover:bg-black/40"
            >
              <span className="text-xl">{weatherInfo.icon}</span>
              <p className="font-bold text-gray-900 dark:text-gray-100">
                {Math.round(convertTemp(data.temperature_2m[idx]))}°{unit}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(time).getHours()}:00
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default HourlyForecast;
