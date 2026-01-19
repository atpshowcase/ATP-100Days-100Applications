'use client'

import { useState, useEffect } from 'react'
import GameBoard from '@/components/GameBoard'
import Header from '@/components/Header'
import Stats from '@/components/Stats'

export default function Home() {
    const [secretNumber, setSecretNumber] = useState<number>(0)
    const [guess, setGuess] = useState<string>('')
    const [attempts, setAttempts] = useState<number>(0)
    const [message, setMessage] = useState<string>('Make your first guess!')
    const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing')
    const [guessHistory, setGuessHistory] = useState<Array<{ guess: number; feedback: string }>>([])
    const [bestScore, setBestScore] = useState<number | null>(null)
    const [gamesPlayed, setGamesPlayed] = useState<number>(0)

    // Initialize game
    useEffect(() => {
        resetGame()
        // Load stats from localStorage
        const savedBestScore = localStorage.getItem('bestScore')
        const savedGamesPlayed = localStorage.getItem('gamesPlayed')
        if (savedBestScore) setBestScore(parseInt(savedBestScore))
        if (savedGamesPlayed) setGamesPlayed(parseInt(savedGamesPlayed))
    }, [])

    const resetGame = () => {
        const newNumber = Math.floor(Math.random() * 100) + 1
        setSecretNumber(newNumber)
        setGuess('')
        setAttempts(0)
        setMessage('Make your first guess!')
        setGameStatus('playing')
        setGuessHistory([])
    }

    const handleGuess = () => {
        if (!guess || isNaN(Number(guess))) {
            setMessage('Please enter a valid number!')
            return
        }

        const guessNum = parseInt(guess)

        if (guessNum < 1 || guessNum > 100) {
            setMessage('Please enter a number between 1 and 100!')
            return
        }

        const newAttempts = attempts + 1
        setAttempts(newAttempts)

        let feedback = ''

        if (guessNum === secretNumber) {
            setMessage(`🎉 Congratulations! You found it in ${newAttempts} attempts!`)
            setGameStatus('won')

            // Update stats
            const newGamesPlayed = gamesPlayed + 1
            setGamesPlayed(newGamesPlayed)
            localStorage.setItem('gamesPlayed', newGamesPlayed.toString())

            if (!bestScore || newAttempts < bestScore) {
                setBestScore(newAttempts)
                localStorage.setItem('bestScore', newAttempts.toString())
            }

            feedback = '🎯 Correct!'
        } else if (guessNum < secretNumber) {
            const diff = secretNumber - guessNum
            if (diff <= 5) {
                setMessage('🔥 Very close! Go higher!')
                feedback = '📈 Too low (very close!)'
            } else if (diff <= 15) {
                setMessage('📈 Close! Try higher!')
                feedback = '📈 Too low (close)'
            } else {
                setMessage('⬆️ Too low! Go much higher!')
                feedback = '⬆️ Too low'
            }
        } else {
            const diff = guessNum - secretNumber
            if (diff <= 5) {
                setMessage('🔥 Very close! Go lower!')
                feedback = '📉 Too high (very close!)'
            } else if (diff <= 15) {
                setMessage('📉 Close! Try lower!')
                feedback = '📉 Too high (close)'
            } else {
                setMessage('⬇️ Too high! Go much lower!')
                feedback = '⬇️ Too high'
            }
        }

        setGuessHistory([...guessHistory, { guess: guessNum, feedback }])
        setGuess('')
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && gameStatus === 'playing') {
            handleGuess()
        }
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="w-full max-w-6xl mx-auto relative z-10">
                <Header />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    {/* Main Game Board */}
                    <div className="lg:col-span-2">
                        <GameBoard
                            guess={guess}
                            setGuess={setGuess}
                            handleGuess={handleGuess}
                            handleKeyPress={handleKeyPress}
                            message={message}
                            attempts={attempts}
                            gameStatus={gameStatus}
                            resetGame={resetGame}
                            guessHistory={guessHistory}
                        />
                    </div>

                    {/* Stats Sidebar */}
                    <div className="lg:col-span-1">
                        <Stats
                            attempts={attempts}
                            bestScore={bestScore}
                            gamesPlayed={gamesPlayed}
                            gameStatus={gameStatus}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}
