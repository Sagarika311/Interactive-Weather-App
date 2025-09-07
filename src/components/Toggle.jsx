import React from "react";

export default function Toggle({ unit, setUnit }) {
  return (
    <div className="flex gap-2 bg-white/30 dark:bg-black/30 backdrop-blur-lg p-2 rounded-xl shadow-md">
      <button
        className={`px-3 py-1 rounded-lg font-semibold ${
          unit === "C" ? "bg-blue-500 text-white" : "text-gray-700 dark:text-gray-300"
        }`}
        onClick={() => setUnit("C")}
      >
        °C
      </button>
      <button
        className={`px-3 py-1 rounded-lg font-semibold ${
          unit === "F" ? "bg-blue-500 text-white" : "text-gray-700 dark:text-gray-300"
        }`}
        onClick={() => setUnit("F")}
      >
        °F
      </button>
    </div>
  );
}
