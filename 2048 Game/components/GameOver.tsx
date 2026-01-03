import React from 'react';

interface GameOverProps {
    isWon: boolean;
    score: number;
    onRestart: () => void;
    onContinue?: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ isWon, score, onRestart, onContinue }) => {
    return (
        <div className="game-over-overlay">
            <div className="game-over-content">
                <h2 className="game-over-title">
                    {isWon ? '🎉 You Win!' : 'Game Over'}
                </h2>
                <p className="game-over-score">Final Score: {score}</p>
                <div className="game-over-buttons">
                    <button className="btn-restart" onClick={onRestart}>
                        New Game
                    </button>
                    {isWon && onContinue && (
                        <button className="btn-continue" onClick={onContinue}>
                            Continue
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameOver;
