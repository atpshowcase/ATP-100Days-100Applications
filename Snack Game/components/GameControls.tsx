import React from 'react';
import { GameStatus } from '@/hooks/useGameLogic';

interface GameControlsProps {
    score: number;
    highScore: number;
    gameStatus: GameStatus;
    onStart: () => void;
    onPause: () => void;
    onRestart: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
    score,
    highScore,
    gameStatus,
    onStart,
    onPause,
    onRestart,
}) => {
    return (
        <div className="flex flex-col gap-6 w-full max-w-md">
            {/* Score Display */}
            <div className="score-display flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <span className="text-xs opacity-70">SCORE</span>
                    <span className="text-2xl text-glow">{score}</span>
                </div>
                <div className="flex flex-col gap-2 text-right">
                    <span className="text-xs opacity-70">HIGH SCORE</span>
                    <span className="text-2xl text-nokia-light">{highScore}</span>
                </div>
            </div>

            {/* Game Status */}
            <div className="text-center">
                {gameStatus === 'idle' && (
                    <p className="text-sm pulse">Press any arrow key or click START to begin</p>
                )}
                {gameStatus === 'playing' && (
                    <p className="text-sm text-nokia-light">PLAYING - Press SPACE to pause</p>
                )}
                {gameStatus === 'paused' && (
                    <p className="text-sm text-yellow-400 pulse">PAUSED - Press SPACE to resume</p>
                )}
                {gameStatus === 'gameOver' && (
                    <p className="text-sm text-red-500 pulse">GAME OVER!</p>
                )}
            </div>

            {/* Control Buttons */}
            <div className="flex gap-4 justify-center flex-wrap">
                {gameStatus === 'idle' && (
                    <button onClick={onStart} className="btn">
                        START
                    </button>
                )}

                {gameStatus === 'playing' && (
                    <button onClick={onPause} className="btn">
                        PAUSE
                    </button>
                )}

                {gameStatus === 'paused' && (
                    <button onClick={onPause} className="btn">
                        RESUME
                    </button>
                )}

                {(gameStatus === 'playing' || gameStatus === 'paused' || gameStatus === 'gameOver') && (
                    <button onClick={onRestart} className="btn">
                        RESTART
                    </button>
                )}
            </div>

            {/* Instructions */}
            <div className="score-display">
                <h3 className="text-xs mb-3 text-nokia-light">CONTROLS</h3>
                <div className="text-[10px] leading-relaxed space-y-2 opacity-80">
                    <p>↑ ↓ ← → or W A S D - Move</p>
                    <p>SPACE - Pause/Resume</p>
                    <p>Eat food to grow and score!</p>
                    <p>Don&apos;t hit walls or yourself!</p>
                </div>
            </div>

            {/* Game Info */}
            <div className="text-center text-[8px] opacity-50 mt-4">
                <p>NOKIA SNAKE CLASSIC</p>
                <p className="mt-1">Speed increases every 50 points</p>
            </div>
        </div>
    );
};
