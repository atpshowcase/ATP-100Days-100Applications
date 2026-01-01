interface ScoreBoardProps {
    playerScore: number
    computerScore: number
    onReset: () => void
}

export default function ScoreBoard({ playerScore, computerScore, onReset }: ScoreBoardProps) {
    return (
        <div className="scoreboard">
            <div className="score-item">
                <div className="score-label">You</div>
                <div className="score-value">{playerScore}</div>
            </div>
            <div className="score-item">
                <div className="score-label">Computer</div>
                <div className="score-value">{computerScore}</div>
            </div>
        </div>
    )
}
