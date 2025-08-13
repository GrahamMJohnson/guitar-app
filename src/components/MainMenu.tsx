import React from "react";
import { Link, useLocation } from "react-router-dom";

//All menu buttons(features)
const menuItems = [
  { name: "Home", path: "/" },
  { name: "Chord Finder", path: "/chord-finder" },
  { name: "Tuner", path: "/tuner" },
  { name: "Metronome", path: "/metronome" },
  { name: "Fretboard", path: "/fretboard"},
];

//The menu containing buttons for each feature
export const MainMenu = () => {
  const location = useLocation();

  return (
    <nav style={{ padding: 20, backgroundColor: "#EEF2FF", display: "flex", gap: 12 }}>
      {menuItems.map(({ name, path }) => {
        const isActive = location.pathname === path;
        return (
          <Link key={path} to={path} style={{ textDecoration: "none" }}>
            <button
              style={{
                padding: "10px 20px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                backgroundColor: isActive ? "#EF4444" : "#2563EB",
                color: "white",
                boxShadow: isActive
                  ? "0 4px 8px rgba(239, 68, 68, 0.5)"
                  : "0 2px 4px rgba(37, 99, 235, 0.4)",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.backgroundColor = "#1D4ED8";
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.backgroundColor = "#2563EB";
              }}
            >
              {name}
            </button>
          </Link>
        );
      })}
    </nav>
  );
};