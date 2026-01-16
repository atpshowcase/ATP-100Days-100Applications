'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Flashcard from './Flashcard';
import styles from './Deck.module.css';

interface CardData {
    id: string;
    question: string;
    answer: string;
}

interface DeckProps {
    cards: CardData[];
}

const Deck: React.FC<DeckProps> = ({ cards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const currentCard = cards[currentIndex];
    const progress = ((currentIndex + 1) / cards.length) * 100;

    const handleNext = useCallback(() => {
        if (currentIndex < cards.length - 1) {
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(prev => prev + 1), 300); // Wait for flip back if desired, but here we just reset
        }
    }, [currentIndex, cards.length]);

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(prev => prev - 1), 300);
        }
    }, [currentIndex]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === ' ' || e.key === 'Enter') handleFlip();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev, isFlipped]); // isFlipped added to capture current state if needed, but setState handles it.

    if (!cards || cards.length === 0) {
        return <div className="text-white">No cards available.</div>;
    }

    return (
        <div className={styles.deckContainer}>
            <div className={styles.progressContainer}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            </div>

            <div className={styles.counter}>
                Card {currentIndex + 1} of {cards.length}
            </div>

            <Flashcard
                question={currentCard.question}
                answer={currentCard.answer}
                isFlipped={isFlipped}
                onFlip={handleFlip}
            />

            <div className={styles.controls}>
                <button
                    className={styles.button}
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                >
                    ← Prev
                </button>

                <button
                    className={styles.button}
                    onClick={handleNext}
                    disabled={currentIndex === cards.length - 1}
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default Deck;
