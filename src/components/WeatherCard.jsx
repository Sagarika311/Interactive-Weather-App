// src/components/WeatherCard.jsx
import React from "react";
import { motion } from "framer-motion";

const WeatherCard = ({ weather }) => {
  if (!weather) {
    return (
      <div className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-md">
        <p className="text-gray-500 dark:text-gray-300">No weather data available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="flex flex-col items-center">
        <span className="text-6xl">{weather.icon}</span>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">
          {weather.temp !== undefined ? `${weather.temp.toFixed(1)}°C` : "N/A"}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-1">
          {weather.description || "—"}
        </p>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
