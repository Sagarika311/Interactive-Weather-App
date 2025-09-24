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

  const formatHour = (time) => {
    const date = new Date(time);
    let hours = date.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours} ${ampm}`;
  };

  return (
    <div className="glass-card relative p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Hourly Forecast</h2>

      {/* scrollable container */}
      <div className="relative">
        {/* left fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-gray-100/80 dark:from-black/60 to-transparent z-10" />
        {/* right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-gray-100/80 dark:from-black/60 to-transparent z-10" />

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-2 px-1 scrollbar-thin scrollbar-thumb-gray-400/40 dark:scrollbar-thumb-gray-600/40">
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
                whileHover={{ scale: 1.08, y: -6 }}
                className="snap-center min-w-[110px] p-4 rounded-2xl bg-white/60 dark:bg-black/40 shadow-md 
                hover:shadow-xl transition-all duration-300 flex flex-col items-center backdrop-blur-md"
                aria-label={`Weather at ${formatHour(time)}: ${Math.round(
                  convertTemp(data.temperature_2m[idx])
                )} degrees ${unit}, ${weatherInfo.label}`}
              >
                <span className="text-2xl">{weatherInfo.icon}</span>
                <p className="mt-1 font-bold text-gray-900 dark:text-gray-100">
                  {Math.round(convertTemp(data.temperature_2m[idx]))}°{unit}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {formatHour(time)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HourlyForecast;
