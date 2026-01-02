import { Card, Difficulty } from './types';

// Emoji sets for different difficulties
const EMOJI_SETS = {
    easy: ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸'],
    medium: ['🚀', '⚡', '🌟', '💎', '🔥', '🌈', '⭐', '💫'],
    hard: ['🦄', '🐉', '🦋', '🌺', '🍀', '🎃', '🌙', '☀️', '🌊', '🏔️', '🌸', '🎄']
};

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/**
 * Generates a deck of cards based on difficulty
 */
export function generateCards(difficulty: Difficulty): Card[] {
    const emojis = EMOJI_SETS[difficulty];
    const pairs = emojis.map((emoji, index) => [
        { id: index * 2, emoji, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, emoji, isFlipped: false, isMatched: false }
    ]).flat();

    return shuffleArray(pairs);
}

/**
 * Formats time in MM:SS format
 */
export function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Calculates score based on moves and time
 */
export function calculateScore(moves: number, time: number, difficulty: Difficulty): number {
    const difficultyMultiplier = {
        easy: 1,
        medium: 1.5,
        hard: 2
    };

    const baseScore = 1000;
    const movePenalty = moves * 5;
    const timePenalty = Math.floor(time / 10);
    const multiplier = difficultyMultiplier[difficulty];

    return Math.max(0, Math.floor((baseScore - movePenalty - timePenalty) * multiplier));
}
