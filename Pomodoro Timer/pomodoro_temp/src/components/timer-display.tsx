"use client";

import React from 'react';
import { Mode } from '../hooks/use-timer';

interface TimerDisplayProps {
    timeLeft: number;
    percentage: number;
    mode: Mode;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, percentage, mode }) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    // Offset logic: if percentage is 100 (full), offset is 0. If 0 (empty), offset is circumference.
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const strokeColor = mode === 'work' ? 'var(--accent-work)'
        : mode === 'short' ? 'var(--accent-short)'
            : 'var(--accent-long)';

    return (
        <div className="timer-container">
            <div className={`timer-ring-glow`} style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                opacity: 0.2,
                background: `radial-gradient(circle, ${strokeColor} 0%, transparent 70%)`
            }}></div>
            <svg className="timer-svg" viewBox="0 0 280 280">
                <circle
                    cx="140" cy="140" r={radius}
                    className="timer-circle-bg"
                />
                <circle
                    cx="140" cy="140" r={radius}
                    className="timer-circle-progress"
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset,
                        stroke: strokeColor
                    }}
                />
            </svg>
            <div className="time-text">
                {formatTime(timeLeft)}
            </div>
        </div>
    );
};
