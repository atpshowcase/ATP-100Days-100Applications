import { Choice, getChoiceEmoji, getChoiceName } from '@/lib/gameLogic'

interface GameButtonProps {
    choice: Choice
    onClick: () => void
    disabled: boolean
}

export default function GameButton({ choice, onClick, disabled }: GameButtonProps) {
    return (
        <button
            className="game-button"
            onClick={onClick}
            disabled={disabled}
            aria-label={`Choose ${choice}`}
        >
            <span className="game-button-emoji">{getChoiceEmoji(choice)}</span>
            <span className="game-button-text">{getChoiceName(choice)}</span>
        </button>
    )
}
