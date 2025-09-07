import React, { useEffect, useRef, useState } from "react";
import "./WeatherBackground.css";
import { weatherMapping } from "../utils/weatherMapping";

function WeatherBackground({ type, motionEnabled = true }) {
  const videoRef = useRef(null);
  const [currentSrc, setCurrentSrc] = useState(null);

  const videoMap = {
    sunny: "/sunny.mp4",
    cloudy: "/cloudy.mp4",
    rainy: "/rainy.mp4",
    snow: "/snow.mp4",
    thunderstorm: "/rainy.mp4", // fallback for ⛈️, replace with /thunderstorm.mp4 if available
  };

  useEffect(() => {
    if (!motionEnabled) return;

    const videoEl = videoRef.current;
    if (!videoEl) return;

    const src = videoMap[type] || null;
    if (!src) return;

    // Only update if the source actually changes
    if (currentSrc !== src) {
      setCurrentSrc(src);
      videoEl.src = src;
      videoEl.load();
      videoEl
        .play()
        .catch((err) => console.warn("Video autoplay blocked:", err));
    }
  }, [type, motionEnabled, currentSrc]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {motionEnabled && videoMap[type] ? (
        <video
          ref={videoRef}
          key={type}
          className="weather-video w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoMap[type]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <>
          {type === "sunny" && <div className="sunny-bg"></div>}
          {type === "cloudy" && <div className="cloudy-bg"></div>}
          {type === "rainy" && <div className="rainy-bg"></div>}
          {type === "snow" && <div className="snow-bg"></div>}
          {type === "thunderstorm" && <div className="rainy-bg"></div>}
        </>
      )}

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black/20 backdrop-blur-sm"></div>
    </div>
  );
}

export default WeatherBackground;
