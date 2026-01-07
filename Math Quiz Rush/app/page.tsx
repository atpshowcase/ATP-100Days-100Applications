'use client';

import { useState, useEffect, useCallback } from 'react';

interface Question {
    id: number;
    equation: string;
    answer: number;
}

interface AnswerOption {
    id: number;
    value: number;
}

type GameState = 'idle' | 'playing' | 'finished';

export default function Home() {
    const [gameState, setGameState] = useState<GameState>('idle');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<AnswerOption[]>([]);
    const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [streak, setStreak] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    // Generate random math question
    const generateQuestion = (id: number): Question => {
        const operations = ['+', '-', '×', '÷'];
        const operation = operations[Math.floor(Math.random() * operations.length)];

        let num1, num2, answer, equation;

        switch (operation) {
            case '+':
                num1 = Math.floor(Math.random() * 50) + 1;
                num2 = Math.floor(Math.random() * 50) + 1;
                answer = num1 + num2;
                equation = `${num1} + ${num2}`;
                break;
            case '-':
                num1 = Math.floor(Math.random() * 50) + 20;
                num2 = Math.floor(Math.random() * num1);
                answer = num1 - num2;
                equation = `${num1} - ${num2}`;
                break;
            case '×':
                num1 = Math.floor(Math.random() * 12) + 1;
                num2 = Math.floor(Math.random() * 12) + 1;
                answer = num1 * num2;
                equation = `${num1} × ${num2}`;
                break;
            case '÷':
                num2 = Math.floor(Math.random() * 12) + 1;
                answer = Math.floor(Math.random() * 12) + 1;
                num1 = num2 * answer;
                equation = `${num1} ÷ ${num2}`;
                break;
            default:
                num1 = 1;
                num2 = 1;
                answer = 2;
                equation = '1 + 1';
        }

        return { id, equation, answer };
    };

    // Generate new round
    const generateRound = useCallback(() => {
        const newQuestions = Array.from({ length: 4 }, (_, i) => generateQuestion(i));
        const answers = newQuestions.map((q) => ({ id: q.id, value: q.answer }));

        // Shuffle answers
        const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);

        setQuestions(newQuestions);
        setAnswers(shuffledAnswers);
        setSelectedQuestion(null);
        setSelectedAnswer(null);
    }, []);

    // Start game
    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setTimeLeft(60);
        setStreak(0);
        generateRound();
    };

    // Handle selection
    const handleQuestionClick = (id: number) => {
        if (selectedAnswer !== null) return; // Already matched
        setSelectedQuestion(id);
    };

    const handleAnswerClick = (id: number) => {
        if (selectedQuestion === null) {
            setSelectedAnswer(id);
            return;
        }

        // Check if match is correct
        const question = questions.find((q) => q.id === selectedQuestion);
        const answer = answers.find((a) => a.id === id);

        if (question && answer && question.answer === answer.value) {
            // Correct match!
            const newScore = score + 10 + streak * 2;
            setScore(newScore);
            setStreak(streak + 1);

            // Remove matched pair
            setQuestions(questions.filter((q) => q.id !== selectedQuestion));
            setAnswers(answers.filter((a) => a.id !== id));
            setSelectedQuestion(null);
            setSelectedAnswer(null);

            // Generate new round if all matched
            if (questions.length === 1) {
                setTimeout(generateRound, 300);
            }
        } else {
            // Wrong match
            setStreak(0);
            setSelectedQuestion(null);
            setSelectedAnswer(null);
        }
    };

    // Timer
    useEffect(() => {
        if (gameState !== 'playing') return;

        if (timeLeft <= 0) {
            setGameState('finished');
            if (score > bestScore) {
                setBestScore(score);
            }
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [gameState, timeLeft, score, bestScore]);

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-3xl">
                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-2">
                        Math Quiz Rush
                    </h1>
                    <p className="text-sm text-gray-500 font-light">
                        Match equations with their answers. Be fast, be accurate.
                    </p>
                </header>

                {/* Idle State */}
                {gameState === 'idle' && (
                    <div className="text-center space-y-8">
                        <div className="space-y-4">
                            <div className="border border-gray-200 rounded p-6">
                                <h2 className="text-lg font-light mb-2">How to Play</h2>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Click an equation, then click its matching answer.
                                    Match all pairs before time runs out. Build streaks for bonus points.
                                </p>
                            </div>

                            {bestScore > 0 && (
                                <div className="border border-gray-200 rounded p-4">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Best Score</p>
                                    <p className="text-3xl font-light">{bestScore}</p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={startGame}
                            className="px-8 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-200 text-sm uppercase tracking-wider"
                        >
                            Start Game
                        </button>
                    </div>
                )}

                {/* Playing State */}
                {gameState === 'playing' && (
                    <div className="space-y-8">
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="border border-gray-200 rounded p-4 text-center">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Score</p>
                                <p className="text-2xl font-light">{score}</p>
                            </div>
                            <div className="border border-gray-200 rounded p-4 text-center">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Time</p>
                                <p className="text-2xl font-light">{timeLeft}s</p>
                            </div>
                            <div className="border border-gray-200 rounded p-4 text-center">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Streak</p>
                                <p className="text-2xl font-light">{streak}×</p>
                            </div>
                        </div>

                        {/* Game Board */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Questions */}
                            <div className="space-y-2">
                                <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Equations</h3>
                                <div className="space-y-2">
                                    {questions.map((question) => (
                                        <button
                                            key={question.id}
                                            onClick={() => handleQuestionClick(question.id)}
                                            className={`w-full p-4 border-2 text-left transition-all duration-200 ${selectedQuestion === question.id
                                                    ? 'border-black bg-black text-white'
                                                    : 'border-gray-200 hover:border-gray-400'
                                                }`}
                                        >
                                            <span className="font-mono">{question.equation}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Answers */}
                            <div className="space-y-2">
                                <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Answers</h3>
                                <div className="space-y-2">
                                    {answers.map((answer) => (
                                        <button
                                            key={answer.id}
                                            onClick={() => handleAnswerClick(answer.id)}
                                            className={`w-full p-4 border-2 text-left transition-all duration-200 ${selectedAnswer === answer.id
                                                    ? 'border-black bg-black text-white'
                                                    : 'border-gray-200 hover:border-gray-400'
                                                }`}
                                        >
                                            <span className="font-mono">{answer.value}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Finished State */}
                {gameState === 'finished' && (
                    <div className="text-center space-y-8">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-light">Time's Up!</h2>

                            <div className="border border-gray-200 rounded p-8">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Final Score</p>
                                <p className="text-5xl font-light mb-4">{score}</p>

                                {score > bestScore && (
                                    <p className="text-sm text-gray-600">New best score! 🎉</p>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={startGame}
                            className="px-8 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-200 text-sm uppercase tracking-wider"
                        >
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
