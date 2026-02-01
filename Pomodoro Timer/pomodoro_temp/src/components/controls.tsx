"use client";

import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface ControlsProps {
    isActive: boolean;
    onToggle: () => void;
    onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ isActive, onToggle, onReset }) => {
    return (
        <div className="controls">
            <button className="btn btn-icon" onClick={onReset} aria-label="Reset Timer">
                <RotateCcw size={24} />
            </button>

            <button className="btn btn-primary" onClick={onToggle} aria-label={isActive ? "Pause" : "Start"}>
                {isActive ? <Pause size={32} /> : <Play size={32} fill="currentColor" />}
            </button>

            {/* Placeholder for symmetry or settings, could add volume control later */}
            <div style={{ width: 48 }}></div>
        </div>
    );
};
