'use client';

import { useState, useEffect, useRef } from 'react';

const SAMPLE_TEXTS = [
    "The quick brown fox jumps over the lazy dog near the riverbank.",
    "Programming is the art of telling another human what one wants the computer to do.",
    "In the midst of chaos there is also opportunity to create something beautiful.",
    "Success is not final failure is not fatal it is the courage to continue that counts.",
    "The only way to do great work is to love what you do and never stop learning.",
    "Technology is best when it brings people together and makes lives easier.",
    "Design is not just what it looks like design is how it works and feels.",
    "Innovation distinguishes between a leader and a follower in any field.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Simplicity is the ultimate sophistication in both design and function."
];

export default function TypingTest() {
    const [text, setText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [errors, setErrors] = useState(0);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        resetTest();
    }, []);

    const resetTest = () => {
        const randomText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
        setText(randomText);
        setUserInput('');
        setStartTime(null);
        setEndTime(null);
        setIsActive(false);
        setWpm(0);
        setAccuracy(100);
        setErrors(0);
        inputRef.current?.focus();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        // Start timer on first character
        if (!startTime && value.length === 1) {
            setStartTime(Date.now());
            setIsActive(true);
        }

        // Don't allow input beyond text length
        if (value.length <= text.length) {
            setUserInput(value);

            // Calculate errors
            let errorCount = 0;
            for (let i = 0; i < value.length; i++) {
                if (value[i] !== text[i]) {
                    errorCount++;
                }
            }
            setErrors(errorCount);

            // Calculate accuracy
            const acc = value.length > 0
                ? Math.round(((value.length - errorCount) / value.length) * 100)
                : 100;
            setAccuracy(acc);

            // Check if completed
            if (value.length === text.length) {
                finishTest(value);
            }
        }
    };

    const finishTest = (finalInput: string) => {
        if (!startTime) return;

        const endT = Date.now();
        setEndTime(endT);
        setIsActive(false);

        const timeInMinutes = (endT - startTime) / 1000 / 60;
        const words = finalInput.trim().split(/\s+/).length;
        const calculatedWpm = Math.round(words / timeInMinutes);
        setWpm(calculatedWpm);
    };

    const getCharacterClass = (index: number) => {
        if (index >= userInput.length) {
            return 'text-gray-400';
        }
        return userInput[index] === text[index]
            ? 'text-green-600 bg-green-50'
            : 'text-red-600 bg-red-50';
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-gray-100">
            <div className="w-full max-w-3xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 text-gray-900">
                        Typing Speed Test
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Test your typing speed and accuracy
                    </p>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                            {wpm}
                        </div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide">
                            WPM
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                            {accuracy}%
                        </div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide">
                            Accuracy
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                            {errors}
                        </div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide">
                            Errors
                        </div>
                    </div>
                </div>

                {/* Text Display */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-6">
                    <div className="text-2xl leading-relaxed font-mono select-none mb-6">
                        {text.split('').map((char, index) => (
                            <span
                                key={index}
                                className={`${getCharacterClass(index)} transition-colors duration-100 px-0.5 rounded`}
                            >
                                {char}
                            </span>
                        ))}
                    </div>

                    {/* Input Area */}
                    <textarea
                        ref={inputRef}
                        value={userInput}
                        onChange={handleInputChange}
                        className="w-full p-4 text-xl font-mono border-2 border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 resize-none transition-colors"
                        placeholder={isActive ? "Keep typing..." : "Click here and start typing..."}
                        rows={3}
                        disabled={endTime !== null}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={resetTest}
                        className="px-8 py-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
                    >
                        {endTime ? 'Try Again' : 'Reset'}
                    </button>
                </div>

                {/* Results Modal */}
                {endTime && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
                        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all">
                            <div className="text-center">
                                <div className="mb-6">
                                    <div className="text-6xl mb-2">🎉</div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                        Test Complete!
                                    </h2>
                                    <p className="text-gray-600">
                                        Here are your results
                                    </p>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                                        <div className="text-5xl font-bold text-gray-900 mb-1">
                                            {wpm}
                                        </div>
                                        <div className="text-gray-600 font-medium">
                                            Words Per Minute
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-green-50 rounded-xl p-4">
                                            <div className="text-3xl font-bold text-gray-900 mb-1">
                                                {accuracy}%
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Accuracy
                                            </div>
                                        </div>
                                        <div className="bg-red-50 rounded-xl p-4">
                                            <div className="text-3xl font-bold text-gray-900 mb-1">
                                                {errors}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                Errors
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={resetTest}
                                    className="w-full px-8 py-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 hover:shadow-lg"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="text-center mt-12 text-gray-500 text-sm">
                    <p>Press Reset to start over • Focus and type accurately for best results</p>
                </div>
            </div>
        </div>
    );
}
