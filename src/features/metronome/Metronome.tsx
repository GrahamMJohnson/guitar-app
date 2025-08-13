import React, { useState, useEffect } from "react";

export default function Metronome() {
  const [bpm, setBpm] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beat, setBeat] = useState(false);

  useEffect(() => {
    let interval: number;
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playClick = (volume: number, frequency: number) => {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = "square";
      oscillator.frequency.value = frequency;
      gainNode.gain.value = volume;

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.05); // 50ms click
    };

    if (isPlaying) {
      const msPerBeat = (60 / bpm) * 1000;

      interval = window.setInterval(() => {
        setBeat(true);
        playClick(0.2, 1000); // main beat sound
        setTimeout(() => setBeat(false), 100); // pulse off after 100ms
      }, msPerBeat);
    }

    return () => clearInterval(interval);
  }, [isPlaying, bpm]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        justifyContent: "center",
        backgroundColor: "white",
        color: "black",
        gap: "20px",
      }}
    >
      <h2>Metronome</h2>

      {/* Pulse circle */}
      <div
        style={{
          width: "128px",
          height: "128px",
          borderRadius: "50%",
          backgroundColor: beat ? "#EF4444" : "#F97316",
          transform: beat ? "scale(1.5)" : "scale(1)",
          transition: "all 0.15s ease",
          margin: "20px 0",
        }}
      ></div>

      {/* BPM slider */}
      <div>
        <label>BPM: {bpm}</label>
        <input
          type="range"
          min="40"
          max="200"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
        />
      </div>

      {/* Start/Stop button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          cursor: "pointer",
          backgroundColor: isPlaying ? "#EF4444" : "#10B981",
          color: "white",
          border: "none",
          borderRadius: "6px",
        }}
      >
        {isPlaying ? "Stop" : "Start"}
      </button>
    </div>
  );
}