interface KeyboardProps {
    guessedLetters: string[];
    word: string;
    onGuess: (letter: string) => void;
    disabled: boolean;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function Keyboard({ guessedLetters, word, onGuess, disabled }: KeyboardProps) {
    const getButtonClass = (letter: string) => {
        if (!guessedLetters.includes(letter)) return 'letter-btn';
        if (word.includes(letter)) return 'letter-btn correct';
        return 'letter-btn incorrect';
    };

    return (
        <div className="glass rounded-3xl p-6 fade-in">
            <div className="grid grid-cols-7 sm:grid-cols-9 md:grid-cols-13 gap-2 justify-items-center">
                {ALPHABET.map(letter => (
                    <button
                        key={letter}
                        onClick={() => onGuess(letter)}
                        disabled={disabled || guessedLetters.includes(letter)}
                        className={getButtonClass(letter)}
                    >
                        {letter}
                    </button>
                ))}
            </div>
        </div>
    );
}
