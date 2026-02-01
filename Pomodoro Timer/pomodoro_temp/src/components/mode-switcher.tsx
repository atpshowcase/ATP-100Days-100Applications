"use client";

import React from 'react';
import { Mode } from '../hooks/use-timer';

interface ModeSwitcherProps {
    currentMode: Mode;
    onChangeMode: (mode: Mode) => void;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ currentMode, onChangeMode }) => {
    return (
        <div className="modes">
            <button
                className={`mode-btn ${currentMode === 'work' ? 'active' : ''}`}
                onClick={() => onChangeMode('work')}
            >
                Focus
            </button>
            <button
                className={`mode-btn ${currentMode === 'short' ? 'active' : ''}`}
                onClick={() => onChangeMode('short')}
            >
                Short Break
            </button>
            <button
                className={`mode-btn ${currentMode === 'long' ? 'active' : ''}`}
                onClick={() => onChangeMode('long')}
            >
                Long Break
            </button>
        </div>
    );
};
