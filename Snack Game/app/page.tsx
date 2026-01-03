'use client';

import React from 'react';
import { GameBoard } from '@/components/GameBoard';
import { GameControls } from '@/components/GameControls';
import { useGameLogic } from '@/hooks/useGameLogic';

export default function Home() {
    const {
        snake,
        food,
        gameStatus,
        score,
        highScore,
        gridSize,
        startGame,
        togglePause,
        restartGame,
    } = useGameLogic();

    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
                {/* Game Title */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 lg:hidden">
                    <h1 className="text-2xl text-center text-glow slide-in">
                        SNAKE
                    </h1>
                    <p className="text-[8px] text-center mt-2 opacity-70">NOKIA CLASSIC</p>
                </div>

                {/* Desktop Title */}
                <div className="hidden lg:flex flex-col items-center justify-center">
                    <h1 className="text-4xl text-glow slide-in mb-4">
                        SNAKE
                    </h1>
                    <p className="text-xs opacity-70 mb-8">NOKIA CLASSIC</p>

                    {/* Decorative elements */}
                    <div className="flex flex-col gap-4 items-center">
                        <div className="w-16 h-1 bg-nokia-green glow"></div>
                        <div className="text-[10px] text-center opacity-50 max-w-[200px] leading-relaxed">
                            Relive the classic mobile gaming experience
                        </div>
                        <div className="w-16 h-1 bg-nokia-green glow"></div>
                    </div>
                </div>

                {/* Game Board */}
                <div className="slide-in mt-16 lg:mt-0">
                    <GameBoard snake={snake} food={food} gridSize={gridSize} />
                </div>

                {/* Game Controls */}
                <div className="slide-in w-full lg:w-auto">
                    <GameControls
                        score={score}
                        highScore={highScore}
                        gameStatus={gameStatus}
                        onStart={startGame}
                        onPause={togglePause}
                        onRestart={restartGame}
                    />
                </div>
            </div>

            {/* Background decoration */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nokia-green opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-nokia-light opacity-5 rounded-full blur-3xl"></div>
            </div>
        </main>
    );
}
