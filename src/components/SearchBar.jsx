import React, { useState, useEffect, useRef } from "react";
import { cityCoordinates } from "../utils/cityCoords";

const SearchBar = ({ setCity, className = "" }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);

  // Fetch live suggestions from Nominatim
  const fetchNominatimSuggestions = async (query) => {
    if (!query) return [];
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      return data.slice(0, 5).map((d) => d.display_name);
    } catch (err) {
      console.error("Nominatim error:", err);
      return [];
    }
  };

  // Update suggestions based on input
  useEffect(() => {
    const updateSuggestions = async () => {
      const presetMatches = Object.keys(cityCoordinates).filter((cityName) =>
        cityName.toLowerCase().includes(input.toLowerCase())
      );

      const liveMatches = await fetchNominatimSuggestions(input);

      // Merge preset + live, remove duplicates
      const combined = [...new Set([...presetMatches, ...liveMatches])];
      setSuggestions(combined);
    };

    if (input.trim() !== "") {
      updateSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [input]);

  // Handle outside click to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setCity(input.trim());
      setInput("");
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setInput("");
    setIsFocused(false);
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search city..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className={`w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 
            bg-white/70 dark:bg-black/40 backdrop-blur-md focus:ring-2 
            focus:ring-blue-400 dark:focus:ring-yellow-300 outline-none 
            text-gray-900 dark:text-white`}
        />
      </form>

      {isFocused && suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 w-full bg-white dark:bg-black/80 backdrop-blur-md border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((cityName, idx) => (
            <li
              key={idx}
              onClick={() => handleSuggestionClick(cityName)}
              className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer transition"
            >
              {cityName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
