interface HangmanDrawingProps {
    mistakes: number;
}

export default function HangmanDrawing({ mistakes }: HangmanDrawingProps) {
    const HEAD = mistakes > 0;
    const BODY = mistakes > 1;
    const LEFT_ARM = mistakes > 2;
    const RIGHT_ARM = mistakes > 3;
    const LEFT_LEG = mistakes > 4;
    const RIGHT_LEG = mistakes > 5;

    return (
        <div className="hangman-svg">
            <svg width="300" height="350" viewBox="0 0 300 350">
                {/* Base */}
                <line
                    x1="20"
                    y1="330"
                    x2="180"
                    y2="330"
                    stroke="url(#gradient1)"
                    strokeWidth="6"
                    strokeLinecap="round"
                />

                {/* Vertical Pole */}
                <line
                    x1="60"
                    y1="330"
                    x2="60"
                    y2="30"
                    stroke="url(#gradient1)"
                    strokeWidth="6"
                    strokeLinecap="round"
                />

                {/* Top Horizontal */}
                <line
                    x1="60"
                    y1="30"
                    x2="180"
                    y2="30"
                    stroke="url(#gradient1)"
                    strokeWidth="6"
                    strokeLinecap="round"
                />

                {/* Rope */}
                <line
                    x1="180"
                    y1="30"
                    x2="180"
                    y2="60"
                    stroke="url(#gradient2)"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                {/* Head */}
                {HEAD && (
                    <circle
                        cx="180"
                        cy="85"
                        r="25"
                        stroke="url(#gradient3)"
                        strokeWidth="5"
                        fill="none"
                        className="hangman-part"
                    />
                )}

                {/* Body */}
                {BODY && (
                    <line
                        x1="180"
                        y1="110"
                        x2="180"
                        y2="200"
                        stroke="url(#gradient3)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="hangman-part"
                    />
                )}

                {/* Left Arm */}
                {LEFT_ARM && (
                    <line
                        x1="180"
                        y1="130"
                        x2="140"
                        y2="170"
                        stroke="url(#gradient3)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="hangman-part"
                    />
                )}

                {/* Right Arm */}
                {RIGHT_ARM && (
                    <line
                        x1="180"
                        y1="130"
                        x2="220"
                        y2="170"
                        stroke="url(#gradient3)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="hangman-part"
                    />
                )}

                {/* Left Leg */}
                {LEFT_LEG && (
                    <line
                        x1="180"
                        y1="200"
                        x2="150"
                        y2="250"
                        stroke="url(#gradient3)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="hangman-part"
                    />
                )}

                {/* Right Leg */}
                {RIGHT_LEG && (
                    <line
                        x1="180"
                        y1="200"
                        x2="210"
                        y2="250"
                        stroke="url(#gradient3)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="hangman-part"
                    />
                )}

                {/* Gradients */}
                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
