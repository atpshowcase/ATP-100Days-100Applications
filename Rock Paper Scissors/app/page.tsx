'use client'

import { useState } from 'react'
import { Choice, GameResult, getComputerChoice, determineWinner, getChoiceEmoji } from '@/lib/gameLogic'
import GameButton from '@/components/GameButton'
import ScoreBoard from '@/components/ScoreBoard'
import GameResultDisplay from '@/components/GameResult'

export default function Home() {
    const [playerChoice, setPlayerChoice] = useState<Choice | null>(null)
    const [computerChoice, setComputerChoice] = useState<Choice | null>(null)
    const [result, setResult] = useState<GameResult | null>(null)
    const [playerScore, setPlayerScore] = useState(0)
    const [computerScore, setComputerScore] = useState(0)

    const handleChoice = (choice: Choice) => {
        const computer = getComputerChoice()
        const gameResult = determineWinner(choice, computer)

        setPlayerChoice(choice)
        setComputerChoice(computer)
        setResult(gameResult)

        // Update scores
        if (gameResult === 'win') {
            setPlayerScore(prev => prev + 1)
        } else if (gameResult === 'lose') {
            setComputerScore(prev => prev + 1)
        }
    }

    const resetGame = () => {
        setPlayerChoice(null)
        setComputerChoice(null)
        setResult(null)
    }

    const resetScores = () => {
        setPlayerScore(0)
        setComputerScore(0)
        resetGame()
    }

    return (
        <main className="container">
            <header className="header">
                <h1 className="title">Rock Paper Scissors</h1>
                <p className="subtitle">Choose your weapon</p>
            </header>

            <ScoreBoard
                playerScore={playerScore}
                computerScore={computerScore}
                onReset={resetScores}
            />

            <div className="game-buttons">
                <GameButton
                    choice="rock"
                    onClick={() => handleChoice('rock')}
                    disabled={false}
                />
                <GameButton
                    choice="paper"
                    onClick={() => handleChoice('paper')}
                    disabled={false}
                />
                <GameButton
                    choice="scissors"
                    onClick={() => handleChoice('scissors')}
                    disabled={false}
                />
            </div>

            <GameResultDisplay
                playerChoice={playerChoice}
                computerChoice={computerChoice}
                result={result}
                onPlayAgain={resetGame}
            />
        </main>
    )
}
