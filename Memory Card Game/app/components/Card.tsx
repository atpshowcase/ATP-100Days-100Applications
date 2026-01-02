'use client';

import React from 'react';
import { Card as CardType } from '../types';
import styles from './Card.module.css';

interface CardProps {
    card: CardType;
    onClick: (id: number) => void;
    isDisabled: boolean;
}

export default function Card({ card, onClick, isDisabled }: CardProps) {
    const handleClick = () => {
        if (!isDisabled && !card.isFlipped && !card.isMatched) {
            onClick(card.id);
        }
    };

    return (
        <div
            className={`${styles.cardContainer} ${card.isFlipped || card.isMatched ? styles.flipped : ''} ${card.isMatched ? styles.matched : ''
                }`}
            onClick={handleClick}
        >
            <div className={styles.cardInner}>
                {/* Card Back */}
                <div className={`${styles.cardFace} ${styles.cardBack}`}>
                    <div className={styles.cardPattern}>
                        <div className={styles.patternGrid}>
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className={styles.patternDot} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Card Front */}
                <div className={`${styles.cardFace} ${styles.cardFront}`}>
                    <span className={styles.emoji}>{card.emoji}</span>
                </div>
            </div>
        </div>
    );
}
