interface WordDisplayProps {
    word: string;
    guessedLetters: string[];
}

export default function WordDisplay({ word, guessedLetters }: WordDisplayProps) {
    return (
        <div className="word-display">
            {word.split('').map((letter, index) => (
                <div
                    key={index}
                    className={`letter-box ${guessedLetters.includes(letter) ? 'revealed' : ''}`}
                >
                    <span style={{ visibility: guessedLetters.includes(letter) ? 'visible' : 'hidden' }}>
                        {letter}
                    </span>
                </div>
            ))}
        </div>
    );
}
