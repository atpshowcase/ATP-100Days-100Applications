'use client'

import { useState, useEffect } from 'react'

interface ColorOption {
    id: number
    rgb: { r: number; g: number; b: number }
    hex: string
}

export default function ColorMatchingGame() {
    const [targetColor, setTargetColor] = useState<ColorOption | null>(null)
    const [options, setOptions] = useState<ColorOption[]>([])
    const [score, setScore] = useState(0)
    const [attempts, setAttempts] = useState(0)
    const [feedback, setFeedback] = useState<string>('')
    const [gameStarted, setGameStarted] = useState(false)
    const [soundEnabled, setSoundEnabled] = useState(true)

    // Sound effect functions using Web Audio API
    const playCorrectSound = () => {
        if (!soundEnabled) return

        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

            // Create a pleasant ascending tone
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1) // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2) // G5

            oscillator.type = 'sine'
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4)

            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + 0.4)
        } catch (error) {
            console.log('Audio not supported')
        }
    }

    const playIncorrectSound = () => {
        if (!soundEnabled) return

        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

            // Create a subtle descending tone
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.frequency.setValueAtTime(400, audioContext.currentTime) // Lower tone
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.1)

            oscillator.type = 'sine'
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + 0.3)
        } catch (error) {
            console.log('Audio not supported')
        }
    }

    const generateRandomColor = (): ColorOption => {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
        return { id: Math.random(), rgb: { r, g, b }, hex }
    }

    const generateSimilarColor = (baseColor: ColorOption): ColorOption => {
        const variance = 30
        const r = Math.max(0, Math.min(255, baseColor.rgb.r + Math.floor(Math.random() * variance * 2 - variance)))
        const g = Math.max(0, Math.min(255, baseColor.rgb.g + Math.floor(Math.random() * variance * 2 - variance)))
        const b = Math.max(0, Math.min(255, baseColor.rgb.b + Math.floor(Math.random() * variance * 2 - variance)))
        const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
        return { id: Math.random(), rgb: { r, g, b }, hex }
    }

    const startNewRound = () => {
        const target = generateRandomColor()
        const decoys = Array.from({ length: 3 }, () => generateSimilarColor(target))
        const allOptions = [target, ...decoys].sort(() => Math.random() - 0.5)

        setTargetColor(target)
        setOptions(allOptions)
        setFeedback('')
    }

    const handleColorClick = (selectedColor: ColorOption) => {
        if (!targetColor) return

        setAttempts(prev => prev + 1)

        if (selectedColor.hex === targetColor.hex) {
            setScore(prev => prev + 1)
            setFeedback('Correct! 🎯')
            playCorrectSound()
            setTimeout(() => {
                startNewRound()
            }, 1000)
        } else {
            setFeedback('Try again')
            playIncorrectSound()
            setTimeout(() => {
                setFeedback('')
            }, 1000)
        }
    }

    const startGame = () => {
        setGameStarted(true)
        setScore(0)
        setAttempts(0)
        startNewRound()
    }

    const resetGame = () => {
        setGameStarted(false)
        setTargetColor(null)
        setOptions([])
        setScore(0)
        setAttempts(0)
        setFeedback('')
    }

    const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0

    if (!gameStarted) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6">
                <div className="max-w-md w-full text-center space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-light tracking-tight">Color Match</h1>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Test your color perception. Match the target color from four similar options.
                        </p>
                    </div>

                    <button
                        onClick={startGame}
                        className="w-full py-4 px-6 bg-black text-white hover:bg-gray-800 transition-colors duration-200 text-sm font-medium tracking-wide"
                    >
                        Start Game
                    </button>

                    <div className="pt-8 space-y-3 text-xs text-gray-400">
                        <div className="flex items-center justify-between py-2 border-t border-gray-200">
                            <span>Objective</span>
                            <span className="text-right text-gray-600">Match the target color</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-t border-gray-200">
                            <span>Options</span>
                            <span className="text-right text-gray-600">4 similar colors per round</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-t border-gray-200">
                            <span>Scoring</span>
                            <span className="text-right text-gray-600">Track accuracy & score</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <div className="max-w-2xl w-full space-y-12">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-light tracking-tight">Color Match</h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className="text-xs text-gray-400 hover:text-gray-600 transition-colors tracking-wide"
                            title={soundEnabled ? "Mute sounds" : "Enable sounds"}
                        >
                            {soundEnabled ? '🔊 Sound' : '🔇 Muted'}
                        </button>
                        <button
                            onClick={resetGame}
                            className="text-xs text-gray-400 hover:text-gray-600 transition-colors tracking-wide"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                    <div className="text-center space-y-1 pb-4 border-b border-gray-200">
                        <div className="text-3xl font-light tabular-nums">{score}</div>
                        <div className="text-xs text-gray-400 tracking-wide">Score</div>
                    </div>
                    <div className="text-center space-y-1 pb-4 border-b border-gray-200">
                        <div className="text-3xl font-light tabular-nums">{attempts}</div>
                        <div className="text-xs text-gray-400 tracking-wide">Attempts</div>
                    </div>
                    <div className="text-center space-y-1 pb-4 border-b border-gray-200">
                        <div className="text-3xl font-light tabular-nums">{accuracy}%</div>
                        <div className="text-xs text-gray-400 tracking-wide">Accuracy</div>
                    </div>
                </div>

                {/* Target Color */}
                {targetColor && (
                    <div className="space-y-4">
                        <div className="text-sm text-gray-500 tracking-wide">Target Color</div>
                        <div
                            className="w-full h-48 border border-gray-200 transition-all duration-300"
                            style={{ backgroundColor: targetColor.hex }}
                        />
                        <div className="text-xs text-gray-400 font-mono text-center tracking-wider">
                            {targetColor.hex.toUpperCase()}
                        </div>
                    </div>
                )}

                {/* Feedback */}
                <div className="h-6 flex items-center justify-center">
                    {feedback && (
                        <span className="text-sm text-gray-600 tracking-wide">{feedback}</span>
                    )}
                </div>

                {/* Color Options */}
                <div className="space-y-4">
                    <div className="text-sm text-gray-500 tracking-wide">Select Matching Color</div>
                    <div className="grid grid-cols-2 gap-4">
                        {options.map((color, index) => (
                            <button
                                key={color.id}
                                onClick={() => handleColorClick(color)}
                                className="aspect-square border border-gray-200 hover:border-gray-400 transition-all duration-200 relative group"
                                style={{ backgroundColor: color.hex }}
                            >
                                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <span className="text-xs font-mono bg-white/90 px-2 py-1 tracking-wider">
                                        {color.hex.toUpperCase()}
                                    </span>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Instructions */}
                <div className="text-xs text-gray-400 text-center leading-relaxed">
                    Click on the color that matches the target color above
                </div>
            </div>
        </div>
    )
}
