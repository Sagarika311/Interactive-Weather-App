import React from "react";
import { motion } from "framer-motion";

function DailyForecast({ data, unit, convertTemp }) {
  if (!data || !data.time || !data.temperature_2m_max || !data.temperature_2m_min) return null;

  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold mb-4 text-center">7-Day Forecast</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {data.time.slice(0, 7).map((day, idx) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.07, y: -4 }}
            className="p-4 rounded-xl bg-white/70 dark:bg-black/40 shadow hover:scale-105 transition-transform flex flex-col items-center hover:shadow-lg hover:bg-white/50 dark:hover:bg-black/40"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(day).toLocaleDateString("en-US", { weekday: "short" })}
            </p>
            <p className="font-bold text-lg text-gray-900 dark:text-gray-100">
              {Math.round(convertTemp(data.temperature_2m_max[idx]))}°{unit}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(convertTemp(data.temperature_2m_min[idx]))}°{unit}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default DailyForecast;
