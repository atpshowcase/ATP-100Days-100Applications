interface StatsProps {
    attempts: number
    bestScore: number | null
    gamesPlayed: number
    gameStatus: 'playing' | 'won' | 'lost'
}

export default function Stats({ attempts, bestScore, gamesPlayed, gameStatus }: StatsProps) {
    return (
        <div className="space-y-4">
            {/* Current Attempts */}
            <div className="glass-effect rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Current Attempts</h3>
                    <span className="text-2xl">🎯</span>
                </div>
                <p className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {attempts}
                </p>
            </div>

            {/* Best Score */}
            <div className="glass-effect rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Best Score</h3>
                    <span className="text-2xl">🏆</span>
                </div>
                <p className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    {bestScore ?? '-'}
                </p>
            </div>

            {/* Games Played */}
            <div className="glass-effect rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Games Played</h3>
                    <span className="text-2xl">🎮</span>
                </div>
                <p className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {gamesPlayed}
                </p>
            </div>

            {/* Tips Card */}
            <div className="glass-effect rounded-2xl p-6 shadow-xl border-2 border-blue-500/30">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">💡</span>
                    <h3 className="text-lg font-semibold text-blue-300">Pro Tips</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">▸</span>
                        <span>Start with 50 to divide the range</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">▸</span>
                        <span>Pay attention to "very close" hints</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">▸</span>
                        <span>Use binary search for best results</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">▸</span>
                        <span>Optimal solution: 7 attempts max</span>
                    </li>
                </ul>
            </div>

            {/* Achievement Badge */}
            {gameStatus === 'won' && attempts <= 7 && (
                <div className="glass-effect rounded-2xl p-6 shadow-xl border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 animate-bounce-slow">
                    <div className="text-center">
                        <span className="text-5xl mb-2 block">🌟</span>
                        <h3 className="text-lg font-bold text-yellow-300 mb-1">Perfect Score!</h3>
                        <p className="text-sm text-gray-300">You're a guessing master!</p>
                    </div>
                </div>
            )}
        </div>
    )
}
