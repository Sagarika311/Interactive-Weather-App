// src/components/WeatherChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend
);

function WeatherChart({ data, unit, convertTemp }) {
  if (!data || !data.time || !data.temperature_2m) return null;

  const count = Math.min(24, data.time.length, data.temperature_2m.length);

  const chartData = {
    labels: data.time
      .slice(0, count)
      .map((t) => `${new Date(t).getHours()}:00`),
    datasets: [
      {
        label: `Temperature (°${unit})`,
        data: data.temperature_2m
          .slice(0, count)
          .map((t) => Math.round(convertTemp(t))),
        fill: true,
        backgroundColor: "rgba(66,153,225,0.14)",
        borderColor: "#4299e1",
        tension: 0.4, // smoother curve
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: getComputedStyle(document.documentElement).getPropertyValue("--chart-text") },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0,0,0,0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#4299e1",
        borderWidth: 1,
      },
    },
    interaction: { intersect: false, mode: "index" },
    scales: {
      x: {
        ticks: { color: getComputedStyle(document.documentElement).getPropertyValue("--chart-text") },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: getComputedStyle(document.documentElement).getPropertyValue("--chart-text") },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-bold mb-4 text-center">
        Temperature Chart
      </h2>
      <Line data={chartData} options={options} />
    </motion.div>
  );
}

export default WeatherChart;
