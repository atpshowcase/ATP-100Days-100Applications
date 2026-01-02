export interface Card {
    id: number;
    emoji: string;
    isFlipped: boolean;
    isMatched: boolean;
}

export interface GameState {
    cards: Card[];
    flippedCards: number[];
    moves: number;
    matches: number;
    gameStarted: boolean;
    gameWon: boolean;
    timer: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
    pairs: number;
    label: string;
}
