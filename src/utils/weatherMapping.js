// src/utils/weatherMapping.js
export const weatherMapping = {
  0: { label: "Clear Sky", icon: "☀️", background: "sunny" },
  1: { label: "Mainly Clear", icon: "🌤️", background: "sunny" },
  2: { label: "Partly Cloudy", icon: "⛅", background: "cloudy" },
  3: { label: "Overcast", icon: "☁️", background: "cloudy" },
  45: { label: "Fog", icon: "🌫️", background: "cloudy" },
  48: { label: "Depositing Rime Fog", icon: "🌫️", background: "cloudy" },

  51: { label: "Light Drizzle", icon: "🌦️", background: "rainy" },
  53: { label: "Moderate Drizzle", icon: "🌦️", background: "rainy" },
  55: { label: "Dense Drizzle", icon: "🌧️", background: "rainy" },

  61: { label: "Light Rain", icon: "🌧️", background: "rainy" },
  63: { label: "Moderate Rain", icon: "🌧️", background: "rainy" },
  65: { label: "Heavy Rain", icon: "🌧️", background: "rainy" },
  80: { label: "Rain Showers", icon: "🌧️", background: "rainy" },
  81: { label: "Heavy Rain Showers", icon: "🌧️", background: "rainy" },

  71: { label: "Light Snow", icon: "❄️", background: "snow" },
  73: { label: "Moderate Snow", icon: "❄️", background: "snow" },
  75: { label: "Heavy Snow", icon: "❄️", background: "snow" },
  77: { label: "Snow Grains", icon: "❄️", background: "snow" },

  95: { label: "Thunderstorm", icon: "⛈️", background: "thunderstorm" },
  96: { label: "Thunderstorm with Hail", icon: "⛈️", background: "thunderstorm" },
  99: { label: "Severe Thunderstorm", icon: "⛈️", background: "thunderstorm" },
};

//export const weatherMapping = { ... };