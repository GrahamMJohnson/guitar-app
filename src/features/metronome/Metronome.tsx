import React, { useState, useRef } from "react";

const Metronome: React.FC = () => {
  const [bpm, setBpm] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const playClick = () => {
    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime); // frequency in Hz
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05); // short click
  };

  const startMetronome = () => {
    if (!isPlaying) {
      playClick();
      const interval = window.setInterval(playClick, (60 / bpm) * 1000);
      intervalRef.current = interval;
      setIsPlaying(true);
    }
  };

  const stopMetronome = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-xl font-bold">Metronome</h2>
      <label className="flex items-center gap-2">
        BPM:
        <input
          type="number"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="border rounded p-1 w-20 text-center"
        />
      </label>
      <div className="flex gap-4">
        <button
          onClick={startMetronome}
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={isPlaying}
        >
          Start
        </button>
        <button
          onClick={stopMetronome}
          className="bg-red-500 text-white px-4 py-2 rounded"
          disabled={!isPlaying}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default Metronome;