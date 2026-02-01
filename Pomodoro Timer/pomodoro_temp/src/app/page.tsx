"use client";

import { useTimer } from '../hooks/use-timer';
import { TimerDisplay } from '../components/timer-display';
import { Controls } from '../components/controls';
import { ModeSwitcher } from '../components/mode-switcher';

export default function Home() {
  const {
    mode,
    timeLeft,
    isActive,
    percentage,
    toggleTimer,
    resetTimer,
    changeMode
  } = useTimer();

  return (
    <main>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="app-container">
        <h1>Focus Flow</h1>
        <p className="subtitle">Master your time, master your life.</p>

        <ModeSwitcher currentMode={mode} onChangeMode={changeMode} />

        <TimerDisplay
          timeLeft={timeLeft}
          percentage={percentage}
          mode={mode}
        />

        <Controls
          isActive={isActive}
          onToggle={toggleTimer}
          onReset={resetTimer}
        />
      </div>
    </main>
  );
}
