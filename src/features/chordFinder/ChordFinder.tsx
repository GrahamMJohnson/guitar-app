import React, { useState } from "react";
import { NOTES, CHORDS } from "./ChordData";

function getChordNotes(root: string, chordType: keyof typeof CHORDS) {
  const rootIndex = NOTES.indexOf(root);
  const intervals = CHORDS[chordType];
  return intervals.map(i => NOTES[(rootIndex + i) % NOTES.length]);
}

export const ChordFinder = () => {
  const [root, setRoot] = useState("C");
  const [chordType, setChordType] = useState<keyof typeof CHORDS>("Major");

  const chordNotes = getChordNotes(root, chordType);
  const chordName = `${root} ${chordType}`;

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Chord Finder</h2>

      <label>
        Root Note:{" "}
        <select value={root} onChange={e => setRoot(e.target.value)}>
          {NOTES.map(note => (
            <option key={note} value={note}>{note}</option>
          ))}
        </select>
      </label>

      <label style={{ marginLeft: 20 }}>
        Chord Type:{" "}
        <select value={chordType} onChange={e => setChordType(e.target.value as keyof typeof CHORDS)}>
          {Object.keys(CHORDS).map(chord => (
            <option key={chord} value={chord}>{chord}</option>
          ))}
        </select>
      </label>

      <div style={{ marginTop: 20 }}>
        <strong>Notes:</strong> {chordNotes.join(", ")}
      </div>

      <div>
        <strong>Chord:</strong> {chordName}
      </div>
    </div>
  );
};