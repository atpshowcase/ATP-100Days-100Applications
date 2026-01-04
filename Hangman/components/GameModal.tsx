interface GameModalProps {
    won: boolean;
    word: string;
    onPlayAgain: () => void;
}

export default function GameModal({ won, word, onPlayAgain }: GameModalProps) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {won ? (
                    <>
                        <div className="text-7xl mb-4 float">🎉</div>
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                            Congratulations!
                        </h2>
                        <p className="text-xl text-gray-300 mb-6">
                            You guessed the word correctly!
                        </p>
                    </>
                ) : (
                    <>
                        <div className="text-7xl mb-4 float">😢</div>
                        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                            Game Over
                        </h2>
                        <p className="text-xl text-gray-300 mb-2">
                            Better luck next time!
                        </p>
                        <p className="text-lg text-gray-400 mb-6">
                            The word was: <span className="font-bold text-indigo-400">{word}</span>
                        </p>
                    </>
                )}

                <button
                    onClick={onPlayAgain}
                    className="btn btn-primary"
                >
                    🎮 Play Again
                </button>
            </div>
        </div>
    );
}
