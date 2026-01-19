interface GameBoardProps {
    guess: string
    setGuess: (value: string) => void
    handleGuess: () => void
    handleKeyPress: (e: React.KeyboardEvent) => void
    message: string
    attempts: number
    gameStatus: 'playing' | 'won' | 'lost'
    resetGame: () => void
    guessHistory: Array<{ guess: number; feedback: string }>
}

export default function GameBoard({
    guess,
    setGuess,
    handleGuess,
    handleKeyPress,
    message,
    attempts,
    gameStatus,
    resetGame,
    guessHistory,
}: GameBoardProps) {
    return (
        <div className="glass-effect rounded-3xl p-8 shadow-2xl">
            {/* Message Display */}
            <div className={`mb-8 p-6 rounded-2xl text-center transition-all duration-300 ${gameStatus === 'won'
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50'
                    : 'bg-white/5 border border-white/10'
                }`}>
                <p className={`text-2xl font-semibold ${gameStatus === 'won' ? 'text-green-300' : 'text-white'
                    }`}>
                    {message}
                </p>
            </div>

            {/* Input Section */}
            {gameStatus === 'playing' && (
                <div className="mb-8">
                    <div className="flex gap-4">
                        <input
                            type="number"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter your guess..."
                            min="1"
                            max="100"
                            className="flex-1 px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white text-xl placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-all duration-300"
                            autoFocus
                        />
                        <button
                            onClick={handleGuess}
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-500/50"
                        >
                            Guess
                        </button>
                    </div>
                    <p className="mt-3 text-sm text-gray-400 text-center">
                        Press <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20">Enter</kbd> to submit
                    </p>
                </div>
            )}

            {/* Game Won - Play Again Button */}
            {gameStatus === 'won' && (
                <div className="mb-8 text-center">
                    <button
                        onClick={resetGame}
                        className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-500/50"
                    >
                        🎮 Play Again
                    </button>
                </div>
            )}

            {/* Guess History */}
            {guessHistory.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-200">Guess History</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                        {guessHistory.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 bg-purple-500/30 rounded-full text-sm font-semibold">
                                        {index + 1}
                                    </span>
                                    <span className="text-lg font-semibold text-white">
                                        {item.guess}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-300">
                                    {item.feedback}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.7);
        }
      `}</style>
        </div>
    )
}
