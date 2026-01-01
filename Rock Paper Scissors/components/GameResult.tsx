import { Choice, GameResult, getChoiceEmoji } from '@/lib/gameLogic'

interface GameResultProps {
    playerChoice: Choice | null
    computerChoice: Choice | null
    result: GameResult | null
    onPlayAgain: () => void
}

export default function GameResultDisplay({
    playerChoice,
    computerChoice,
    result,
    onPlayAgain
}: GameResultProps) {
    const getResultMessage = (result: GameResult): string => {
        switch (result) {
            case 'win':
                return 'You Win! 🎉'
            case 'lose':
                return 'You Lose! 😢'
            case 'draw':
                return "It's a Draw! 🤝"
        }
    }

    if (!playerChoice || !computerChoice || !result) {
        return (
            <div className="game-result">
                <p className="result-placeholder">Make your choice to start the game!</p>
            </div>
        )
    }

    return (
        <div className="game-result">
            <div className="result-choices">
                <div className="result-choice">
                    <div className="result-choice-emoji">{getChoiceEmoji(playerChoice)}</div>
                    <div className="result-choice-label">You</div>
                </div>
                <div className="result-vs">VS</div>
                <div className="result-choice">
                    <div className="result-choice-emoji">{getChoiceEmoji(computerChoice)}</div>
                    <div className="result-choice-label">Computer</div>
                </div>
            </div>
            <div className={`result-message ${result}`}>
                {getResultMessage(result)}
            </div>
            <button className="reset-button" onClick={onPlayAgain}>
                Play Again
            </button>
        </div>
    )
}
