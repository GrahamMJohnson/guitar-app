import React from "react";
import { ChordFinder } from "./features/chordFinder/ChordFinder";

export default function App() {
  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 24 }}>
      <h1>Guitar App</h1>
      <ChordFinder />
    </div>
  );
}
