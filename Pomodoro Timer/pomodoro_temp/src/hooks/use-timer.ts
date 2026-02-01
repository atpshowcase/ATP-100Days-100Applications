"use client";

import { useState, useEffect, useRef } from 'react';

export type Mode = 'work' | 'short' | 'long';

const TIMES = {
  work: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

export function useTimer() {
  const [mode, setMode] = useState<Mode>('work');
  const [timeLeft, setTimeLeft] = useState(TIMES.work);
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Basic beep sound
    audioRef.current = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio playback failed", e));
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(TIMES[mode]);
  };

  const changeMode = (newMode: Mode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(TIMES[newMode]);
  };

  // Progress 0 to 100 (Where 100 is complete)
  // For countdown circle, we usually want it to deplete or fill. 
  // Let's say it depletes: Start at 100 (full) -> 0.
  // Or fill: 0 -> 100.
  // Standard is full ring depleting.
  // So progress = percent remaining.
  const percentage = (timeLeft / TIMES[mode]) * 100;

  return {
    mode,
    timeLeft,
    isActive,
    percentage,
    toggleTimer,
    resetTimer,
    changeMode,
    totalTime: TIMES[mode]
  };
}
