'use client';

import { useState, useEffect } from 'react';
import HangmanDrawing from '@/components/HangmanDrawing';
import WordDisplay from '@/components/WordDisplay';
import Keyboard from '@/components/Keyboard';
import GameStats from '@/components/GameStats';
import GameModal from '@/components/GameModal';

const WORDS = [
    'JAVASCRIPT', 'TYPESCRIPT', 'REACT', 'NEXTJS', 'PROGRAMMING',
    'DEVELOPER', 'COMPUTER', 'ALGORITHM', 'DATABASE', 'FRONTEND',
    'BACKEND', 'FULLSTACK', 'WEBSITE', 'APPLICATION', 'SOFTWARE',
    'FRAMEWORK', 'LIBRARY', 'COMPONENT', 'FUNCTION', 'VARIABLE',
    'INTERFACE', 'DEPLOYMENT', 'REPOSITORY', 'DEBUGGING', 'TESTING',
    'RESPONSIVE', 'ANIMATION', 'GRADIENT', 'DESIGN', 'CREATIVE'
];

const MAX_MISTAKES = 6;

export default function Home() {
    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [mistakes, setMistakes] = useState(0);
    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);

    // Initialize game
    useEffect(() => {
        startNewGame();
    }, []);

    // Check win/loss conditions
    useEffect(() => {
        if (!word) return;

        const wordLetters = word.split('');
        const isWon = wordLetters.every(letter => guessedLetters.includes(letter));
        const isLost = mistakes >= MAX_MISTAKES;

        if (isWon && !gameOver) {
            setWon(true);
            setGameOver(true);
            setWins(prev => prev + 1);
        } else if (isLost && !gameOver) {
            setWon(false);
            setGameOver(true);
            setLosses(prev => prev + 1);
        }
    }, [guessedLetters, mistakes, word, gameOver]);

    const startNewGame = () => {
        const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
        setWord(randomWord);
        setGuessedLetters([]);
        setMistakes(0);
        setGameOver(false);
        setWon(false);
    };

    const handleGuess = (letter: string) => {
        if (gameOver || guessedLetters.includes(letter)) return;

        setGuessedLetters(prev => [...prev, letter]);

        if (!word.includes(letter)) {
            setMistakes(prev => prev + 1);
        }
    };

    const resetStats = () => {
        setWins(0);
        setLosses(0);
        startNewGame();
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-6xl">
                {/* Header */}
                <div className="text-center mb-8 fade-in">
                    <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Hangman Game
                    </h1>
                    <p className="text-xl text-gray-300">Guess the word before it's too late!</p>
                </div>

                {/* Stats */}
                <GameStats wins={wins} losses={losses} onReset={resetStats} />

                {/* Game Area */}
                <div className="glass rounded-3xl p-8 mb-6 fade-in">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Hangman Drawing */}
                        <div className="flex justify-center">
                            <HangmanDrawing mistakes={mistakes} />
                        </div>

                        {/* Word Display */}
                        <div className="flex flex-col items-center justify-center">
                            <div className="mb-6">
                                <div className="text-center mb-4">
                                    <span className="text-lg font-semibold text-gray-300">
                                        Mistakes: <span className={mistakes >= MAX_MISTAKES - 2 ? 'text-red-400' : 'text-indigo-400'}>{mistakes}/{MAX_MISTAKES}</span>
                                    </span>
                                </div>
                                <WordDisplay word={word} guessedLetters={guessedLetters} />
                            </div>

                            {/* Hint */}
                            <div className="text-center text-sm text-gray-400 mt-4">
                                <p>💡 Hint: Programming & Tech Related</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Keyboard */}
                <Keyboard
                    guessedLetters={guessedLetters}
                    word={word}
                    onGuess={handleGuess}
                    disabled={gameOver}
                />

                {/* New Game Button */}
                <div className="text-center mt-6">
                    <button
                        onClick={startNewGame}
                        className="btn btn-secondary"
                    >
                        🎮 New Game
                    </button>
                </div>
            </div>

            {/* Game Over Modal */}
            {gameOver && (
                <GameModal
                    won={won}
                    word={word}
                    onPlayAgain={startNewGame}
                />
            )}
        </main>
    );
}
