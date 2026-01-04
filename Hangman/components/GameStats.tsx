interface GameStatsProps {
    wins: number;
    losses: number;
    onReset: () => void;
}

export default function GameStats({ wins, losses, onReset }: GameStatsProps) {
    const winRate = wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 fade-in">
            <div className="stat-card">
                <div className="stat-value">{wins}</div>
                <div className="stat-label">🏆 Wins</div>
            </div>

            <div className="stat-card">
                <div className="stat-value">{losses}</div>
                <div className="stat-label">💀 Losses</div>
            </div>

            <div className="stat-card">
                <div className="stat-value">{winRate}%</div>
                <div className="stat-label">📊 Win Rate</div>
            </div>
        </div>
    );
}
