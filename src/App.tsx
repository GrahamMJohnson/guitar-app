import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MainMenu } from "./components/MainMenu";
import { ChordFinder } from "./features/chordFinder/ChordFinder";
import Metronome from "./features/metronome/Metronome";

//Home screen
const Home = () => (
  <div style={{ padding: 20 }}>
    <h2>Welcome to the Guitar App!</h2>
    <p>Select a feature from the menu above</p>
  </div>
);

// Placeholder components for future features
const Tuner = () => <div style={{ padding: 20 }}><h2>Tuner coming soon!</h2></div>;
const Fretboard = () => <div style={{ padding: 20}}><h2>Fretboard coming soon!</h2></div>;

//The menu displayed with the currently selected feature
export default function App() {
  return (
    <BrowserRouter>
      <MainMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chord-finder" element={<ChordFinder />} />
        <Route path="/tuner" element={<Tuner />} />
        <Route path="/metronome" element={<Metronome />} />
        <Route path="/fretboard" element={<Fretboard />} />
      </Routes>
    </BrowserRouter>
  );
}