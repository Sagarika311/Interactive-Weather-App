// src/App.jsx
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import WeatherChart from "./components/WeatherChart";
import WeatherBackground from "./components/WeatherBackground";
import { cityCoordinates } from "./utils/cityCoords";
import { weatherMapping } from "./utils/weatherMapping";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("New York");
  const [coords, setCoords] = useState({ lat: 40.7128, lon: -74.006 });
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState("C");
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(true);

  // Celsius ↔ Fahrenheit converter
  const convertTemp = (tempC) =>
    tempC == null ? 0 : unit === "C" ? tempC : tempC * 1.8 + 32;

  // Dark mode class
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // Scroll listener for header shrink
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch weather
  const fetchWeather = useCallback(async (lat, lon) => {
    try {
      setError(null);
      setLoading(true);
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode,relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`
      );
      setWeatherData(res.data);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to fetch weather. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // On load → geolocation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoords({ lat: latitude, lon: longitude });
          fetchWeather(latitude, longitude);
        },
        () => {
          fetchWeather(coords.lat, coords.lon);
        }
      );
    } else {
      fetchWeather(coords.lat, coords.lon);
    }
  }, [fetchWeather]);

  // Update when city changes (preset + Nominatim)
  useEffect(() => {
    const fetchCoords = async (cityName) => {
      try {
        setError(null);

        // Preset cities first
        if (cityCoordinates[cityName]) {
          const c = cityCoordinates[cityName];
          setCoords(c);
          fetchWeather(c.lat, c.lon);
          return;
        }

        // Else fetch from Nominatim
        const res = await axios.get("https://nominatim.openstreetmap.org/search", {
          params: { q: cityName, format: "json", limit: 1 },
        });

        if (!res.data || res.data.length === 0) {
          setError("⚠️ City not found. Try another name or allow location.");
          return;
        }

        const { lat, lon } = res.data[0];
        const parsedLat = parseFloat(lat);
        const parsedLon = parseFloat(lon);

        setCoords({ lat: parsedLat, lon: parsedLon });
        fetchWeather(parsedLat, parsedLon);
      } catch (err) {
        console.error(err);
        setError("❌ Failed to fetch city coordinates. Try again.");
      }
    };

    if (city) fetchCoords(city);
  }, [city, fetchWeather]);

  // Weather mapping
  const currentWeatherCode = weatherData?.current_weather?.weathercode ?? 0;
  const weatherInfo = weatherMapping[currentWeatherCode] || {
    icon: "☀️",
    label: "Clear Sky",
    background: "sunny",
  };

  const currentWeatherType = weatherInfo.background;
  const currentWeatherIcon = weatherInfo.icon;

  return (
    <div className="relative min-h-screen bg-gradient-animated text-gray-900 dark:text-white transition-colors duration-500">
      {/* Background */}
      <WeatherBackground type={currentWeatherType} motionEnabled={motionEnabled} />

      <div className="relative z-10">
        {/* Sticky + Shrinkable Header */}
        <header
          className={`sticky top-0 z-50 flex items-center justify-between 
          backdrop-blur-md bg-white/30 dark:bg-black/30 rounded-b-2xl 
          transition-all duration-300 
          ${scrolled ? "shadow-lg py-2" : "shadow-md py-4"}`}
        >
          {/* Left: Logo / Name */}
          <div className="flex items-center gap-2 px-4">
            <span className="text-2xl">{currentWeatherIcon}</span>
            <span className="text-xl font-bold tracking-wide">SkyCast</span>
          </div>

          {/* Center: Search */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1/2 px-2">
            <SearchBar setCity={setCity} />
          </div>

          {/* Right: Toggles */}
          <div className="flex items-center gap-3 px-4">
            {/* Dark/Light Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="h-10 px-4 rounded-full bg-white/30 dark:bg-black/40 backdrop-blur-md shadow text-sm transition hover:scale-105"
              aria-pressed={darkMode}
            >
              {darkMode ? "🌞 Light" : "🌙 Dark"}
            </button>

            {/* Unit Toggle */}
            <button
              onClick={() => setUnit(unit === "C" ? "F" : "C")}
              className="h-10 px-4 rounded-full bg-white/30 dark:bg-black/40 backdrop-blur-md shadow text-sm font-semibold transition hover:scale-105"
              aria-label="toggle temperature unit"
            >
              °{unit}
            </button>

            {/* Motion Toggle */}
            <button
              onClick={() => setMotionEnabled((prev) => !prev)}
              className="h-10 px-4 rounded-full bg-white/30 dark:bg-black/40 backdrop-blur-md shadow text-sm transition hover:scale-105"
              aria-pressed={motionEnabled}
            >
              {motionEnabled ? "🎬 Motion On" : "⏸ Motion Off"}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto p-6 space-y-8">
          {loading ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-lg animate-pulse"
            >
              ⏳ Loading weather...
            </motion.p>
          ) : error ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-500 font-semibold"
            >
              {error}
            </motion.p>
          ) : weatherData ? (
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <CurrentWeather
                data={weatherData.current_weather}
                daily={weatherData.daily}
                hourly={weatherData.hourly}
                unit={unit}
                convertTemp={convertTemp}
                city={city}
              />
              <HourlyForecast
                data={weatherData.hourly}
                unit={unit}
                convertTemp={convertTemp}
              />
              <DailyForecast
                data={weatherData.daily}
                unit={unit}
                convertTemp={convertTemp}
              />
              <WeatherChart
                data={weatherData.hourly}
                unit={unit}
                convertTemp={convertTemp}
              />
            </motion.div>
          ) : (
            <p className="text-center text-red-500">No weather data found.</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
