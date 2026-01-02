'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Card from './components/Card';
import { Card as CardType, Difficulty } from './types';
import { generateCards, formatTime, calculateScore } from './utils';
import styles from './page.module.css';

export default function Home() {
    const [difficulty, setDifficulty] = useState<Difficulty>('medium');
    const [cards, setCards] = useState<CardType[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isChecking, setIsChecking] = useState(false);

    const totalPairs = {
        easy: 6,
        medium: 8,
        hard: 12
    };

    // Initialize game
    const initializeGame = useCallback((diff: Difficulty) => {
        const newCards = generateCards(diff);
        setCards(newCards);
        setFlippedCards([]);
        setMoves(0);
        setMatches(0);
        setGameStarted(true);
        setGameWon(false);
        setTimer(0);
        setIsChecking(false);
    }, []);

    // Start new game
    const handleNewGame = (diff: Difficulty) => {
        setDifficulty(diff);
        initializeGame(diff);
    };

    // Timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameStarted && !gameWon) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameStarted, gameWon]);

    // Check for win condition
    useEffect(() => {
        if (matches === totalPairs[difficulty] && gameStarted && matches > 0) {
            setGameWon(true);
            setGameStarted(false);
        }
    }, [matches, difficulty, gameStarted, totalPairs]);

    // Handle card click
    const handleCardClick = useCallback((id: number) => {
        if (isChecking || flippedCards.length >= 2) return;

        const newFlippedCards = [...flippedCards, id];
        setFlippedCards(newFlippedCards);

        // Update card state
        setCards(prevCards =>
            prevCards.map(card =>
                card.id === id ? { ...card, isFlipped: true } : card
            )
        );

        // Check for match when two cards are flipped
        if (newFlippedCards.length === 2) {
            setIsChecking(true);
            setMoves(prev => prev + 1);

            const [firstId, secondId] = newFlippedCards;
            const firstCard = cards.find(c => c.id === firstId);
            const secondCard = cards.find(c => c.id === secondId);

            if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
                // Match found
                setTimeout(() => {
                    setCards(prevCards =>
                        prevCards.map(card =>
                            card.id === firstId || card.id === secondId
                                ? { ...card, isMatched: true }
                                : card
                        )
                    );
                    setMatches(prev => prev + 1);
                    setFlippedCards([]);
                    setIsChecking(false);
                }, 600);
            } else {
                // No match
                setTimeout(() => {
                    setCards(prevCards =>
                        prevCards.map(card =>
                            card.id === firstId || card.id === secondId
                                ? { ...card, isFlipped: false }
                                : card
                        )
                    );
                    setFlippedCards([]);
                    setIsChecking(false);
                }, 1000);
            }
        }
    }, [cards, flippedCards, isChecking]);

    // Initialize game on mount
    useEffect(() => {
        initializeGame(difficulty);
    }, []);

    const score = gameWon ? calculateScore(moves, timer, difficulty) : 0;

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                {/* Header */}
                <header className={styles.header}>
                    <h1 className={styles.title}>
                        <span className={styles.titleGradient}>Memory</span> Card Game
                    </h1>
                    <p className={styles.subtitle}>Match all the pairs to win!</p>
                </header>

                {/* Game Stats */}
                <div className={styles.statsContainer}>
                    <div className={`${styles.statCard} glass-card`}>
                        <div className={styles.statIcon}>⏱️</div>
                        <div className={styles.statValue}>{formatTime(timer)}</div>
                        <div className={styles.statLabel}>Time</div>
                    </div>
                    <div className={`${styles.statCard} glass-card`}>
                        <div className={styles.statIcon}>🎯</div>
                        <div className={styles.statValue}>{moves}</div>
                        <div className={styles.statLabel}>Moves</div>
                    </div>
                    <div className={`${styles.statCard} glass-card`}>
                        <div className={styles.statIcon}>✨</div>
                        <div className={styles.statValue}>{matches}/{totalPairs[difficulty]}</div>
                        <div className={styles.statLabel}>Matches</div>
                    </div>
                </div>

                {/* Difficulty Selector */}
                <div className={styles.difficultyContainer}>
                    <button
                        className={`${styles.difficultyBtn} ${difficulty === 'easy' ? styles.active : ''}`}
                        onClick={() => handleNewGame('easy')}
                    >
                        Easy (6 pairs)
                    </button>
                    <button
                        className={`${styles.difficultyBtn} ${difficulty === 'medium' ? styles.active : ''}`}
                        onClick={() => handleNewGame('medium')}
                    >
                        Medium (8 pairs)
                    </button>
                    <button
                        className={`${styles.difficultyBtn} ${difficulty === 'hard' ? styles.active : ''}`}
                        onClick={() => handleNewGame('hard')}
                    >
                        Hard (12 pairs)
                    </button>
                </div>

                {/* Game Board */}
                <div className={`${styles.gameBoard} ${styles[difficulty]}`}>
                    {cards.map(card => (
                        <Card
                            key={card.id}
                            card={card}
                            onClick={handleCardClick}
                            isDisabled={isChecking}
                        />
                    ))}
                </div>

                {/* Reset Button */}
                <button
                    className={`${styles.resetBtn} btn btn-primary`}
                    onClick={() => handleNewGame(difficulty)}
                >
                    🔄 New Game
                </button>

                {/* Win Modal */}
                {gameWon && (
                    <div className={styles.modalOverlay}>
                        <div className={`${styles.modal} glass-card`}>
                            <div className={styles.modalContent}>
                                <div className={styles.winIcon}>🎉</div>
                                <h2 className={styles.winTitle}>Congratulations!</h2>
                                <p className={styles.winMessage}>You won the game!</p>

                                <div className={styles.winStats}>
                                    <div className={styles.winStat}>
                                        <span className={styles.winStatLabel}>Time:</span>
                                        <span className={styles.winStatValue}>{formatTime(timer)}</span>
                                    </div>
                                    <div className={styles.winStat}>
                                        <span className={styles.winStatLabel}>Moves:</span>
                                        <span className={styles.winStatValue}>{moves}</span>
                                    </div>
                                    <div className={styles.winStat}>
                                        <span className={styles.winStatLabel}>Score:</span>
                                        <span className={styles.winStatValue}>{score}</span>
                                    </div>
                                </div>

                                <button
                                    className={`${styles.playAgainBtn} btn btn-secondary`}
                                    onClick={() => handleNewGame(difficulty)}
                                >
                                    Play Again
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
