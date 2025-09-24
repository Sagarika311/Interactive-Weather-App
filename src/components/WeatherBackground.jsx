import React, { useEffect, useRef, useState } from "react";
import "./WeatherBackground.css";
import { weatherMapping } from "../utils/weatherMapping";

function WeatherBackground({ code, motionEnabled = true }) {
  const videoRef = useRef(null);
  const [background, setBackground] = useState("sunny");

  // Get background type from weatherMapping
  useEffect(() => {
    const weatherInfo = weatherMapping[code] || { background: "sunny" };
    setBackground(weatherInfo.background);
  }, [code]);

  const videoMap = {
    sunny: "/sunny.mp4",
    cloudy: "/cloudy.mp4",
    rainy: "/rainy.mp4",
    snow: "/snow.mp4",
    thunderstorm: "/thunderstorm.mp4", // replace if missing
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {motionEnabled && videoMap[background] ? (
        <video
          key={background} // 🔑 Forces remount on change
          ref={videoRef}
          className="weather-video fade-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoMap[background]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <>
          {background === "sunny" && <div className="sunny-bg fade-video"></div>}
          {background === "cloudy" && <div className="cloudy-bg fade-video"></div>}
          {background === "rainy" && <div className="rainy-bg fade-video"></div>}
          {background === "snow" && <div className="snow-bg fade-video"></div>}
          {background === "thunderstorm" && <div className="rainy-bg fade-video"></div>}
        </>
      )}

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black/20 backdrop-blur-sm"></div>
    </div>
  );
}

export default WeatherBackground;
