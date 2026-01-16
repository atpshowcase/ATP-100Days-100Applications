'use client';

import React, { useState, useEffect } from 'react';
import { generateBingoNumbers, checkWin, BingoCell as CellType } from '@/utils/bingoLogic';
import { BingoCell } from './BingoCell';
import styles from './BingoBoard.module.css';
// confetti-canvas is not available, avoiding external dep.

export const BingoBoard = () => {
    const [cells, setCells] = useState<CellType[]>([]);
    const [marked, setMarked] = useState<Set<number>>(new Set([12])); // Center Free space
    const [hasWon, setHasWon] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        startNewGame();
    }, []);

    const startNewGame = () => {
        setCells(generateBingoNumbers());
        setMarked(new Set([12]));
        setHasWon(false);
    };

    const handleCellClick = (index: number) => {
        // Toggle mark
        const newMarked = new Set(marked);
        if (newMarked.has(index)) {
            if (index !== 12) newMarked.delete(index); // prevent unmarking free space
        } else {
            newMarked.add(index);
        }

        setMarked(newMarked);

        if (checkWin(newMarked)) {
            if (!hasWon) {
                // Just won
                setHasWon(true);
            }
        } else {
            setHasWon(false);
        }
    };

    if (!isClient) return null; // Hydration fix

    return (
        <div className={styles.boardContainer}>
            <div className={styles.headerRow}>
                {['B', 'I', 'N', 'G', 'O'].map((char, i) => (
                    <div key={i} className={styles.headerLetter}>
                        {char}
                    </div>
                ))}
            </div>

            <div className={`glass ${styles.grid}`}>
                {hasWon && (
                    <div className={styles.winOverlay}>
                        <div className={styles.winText}>BINGO!</div>
                        <button className="btn" onClick={startNewGame}>
                            Play Again
                        </button>
                    </div>
                )}

                {cells.map((cell) => (
                    <BingoCell
                        key={cell.index}
                        cell={cell}
                        isActive={marked.has(cell.index)}
                        onClick={handleCellClick}
                    />
                ))}
            </div>

            <div className={styles.controls}>
                <button className="btn btn-secondary" onClick={startNewGame}>
                    New Card
                </button>
            </div>
        </div>
    );
};
