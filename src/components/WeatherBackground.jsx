import React, { useEffect, useRef } from "react";
import "./WeatherBackground.css";
import { weatherMapping } from "../utils/weatherMapping";

function WeatherBackground({ code, motionEnabled = true }) {
  const videoRef = useRef(null);

  // Map weather code → background type
  const weatherInfo = weatherMapping[code] || { background: "sunny" };
  const background = weatherInfo.background;

  const videoMap = {
    sunny: "/sunny.mp4",
    cloudy: "/cloudy.mp4",
    rainy: "/rainy.mp4",
    snow: "/snow.mp4",
    thunderstorm: "/thunderstorm.mp4", // add this if you have it
  };

  useEffect(() => {
    if (!motionEnabled) return;
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const src = videoMap[background];
    if (!src) return;

    if (videoEl.src !== window.location.origin + src) {
      videoEl.src = src;
      videoEl.load();
      videoEl
        .play()
        .catch((err) => console.warn("Video autoplay blocked:", err));
    }
  }, [background, motionEnabled]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {motionEnabled && videoMap[background] ? (
        <video
          ref={videoRef}
          className="weather-video w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
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
          {background === "sunny" && <div className="sunny-bg"></div>}
          {background === "cloudy" && <div className="cloudy-bg"></div>}
          {background === "rainy" && <div className="rainy-bg"></div>}
          {background === "snow" && <div className="snow-bg"></div>}
          {background === "thunderstorm" && <div className="rainy-bg"></div>}
        </>
      )}

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/10 dark:bg-black/20 backdrop-blur-sm"></div>
    </div>
  );
}

export default WeatherBackground;
