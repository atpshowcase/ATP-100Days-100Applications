"use client";

import { useState } from "react";
import { Chess, Move, Square } from "chess.js";
import styles from "./Game.module.css";
import { getPieceIcon } from "./PieceIcons";

export default function Game() {
    // Game state
    const [game, setGame] = useState(new Chess());
    // Helper state to force re-render
    const [fen, setFen] = useState(game.fen());

    const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
    const [optionSquares, setOptionSquares] = useState<Square[]>([]);

    function makeMove(move: { from: Square; to: Square; promotion?: string }) {
        try {
            const result = game.move(move);
            // If move successful, result is a Move object
            if (result) {
                setFen(game.fen());
                setSelectedSquare(null);
                setOptionSquares([]);
                return true;
            }
        } catch (e) {
            return false;
        }
        return false;
    }

    function onSquareClick(square: Square) {
        if (game.isGameOver()) return;

        // 1. If currently selecting a square (selectedSquare is set)
        if (selectedSquare) {
            // If clicking the same square, deselect
            if (selectedSquare === square) {
                setSelectedSquare(null);
                setOptionSquares([]);
                return;
            }

            // Try to move
            const moved = makeMove({
                from: selectedSquare,
                to: square,
                promotion: "q", // Auto-promote to Queen for MVP
            });

            if (moved) return;

            // If move failed, check if we clicked on our own piece to switch selection
            const piece = game.get(square);
            if (piece && piece.color === game.turn()) {
                setSelectedSquare(square);
                const moves = game.moves({ square, verbose: true }) as Move[];
                setOptionSquares(moves.map(m => m.to as Square));
                return;
            }

            // If clicked empty square or enemy piece but invalid move, deselect
            setSelectedSquare(null);
            setOptionSquares([]);
            return;
        }

        // 2. No square selected: Select if it's our piece
        const piece = game.get(square);
        if (piece && piece.color === game.turn()) {
            setSelectedSquare(square);
            const moves = game.moves({ square, verbose: true }) as Move[];
            setOptionSquares(moves.map(m => m.to as Square));
        }
    }

    function resetGame() {
        game.reset();
        setFen(game.fen());
        setSelectedSquare(null);
        setOptionSquares([]);
    }

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

    // Helper to find king for check highlighting
    const findKing = (color: 'w' | 'b'): Square | null => {
        const board = game.board(); // 8x8 array of {square, type, color} | null
        for (let row of board) {
            for (let piece of row) {
                if (piece && piece.type === 'k' && piece.color === color) {
                    return piece.square;
                }
            }
        }
        return null;
    };

    const isCheck = game.inCheck();
    const kingSquare = isCheck ? findKing(game.turn()) : null;
    const turnColor = game.turn() === 'w' ? 'White' : 'Black';

    return (
        <div className={styles.gameContainer}>
            <div className={styles.status}>
                {game.isGameOver()
                    ? (game.isCheckmate() ? `Checkmate! ${turnColor === 'White' ? 'Black' : 'White'} wins` : 'Game Over (Draw)')
                    : `${turnColor}'s Turn ${isCheck ? '(CHECK!)' : ''}`}
            </div>

            <div className={styles.board}>
                {ranks.map((rank, rIndex) =>
                    files.map((file, fIndex) => {
                        const square = `${file}${rank}` as Square;
                        const isLight = (rIndex + fIndex) % 2 === 0;
                        const piece = game.get(square);
                        const isSelected = selectedSquare === square;
                        const isOption = optionSquares.includes(square);
                        const isCapture = isOption && piece;
                        const isKingInCheck = square === kingSquare;

                        return (
                            <div
                                key={square}
                                onClick={() => onSquareClick(square)}
                                className={`
                    ${styles.square} 
                    ${isLight ? styles.whiteSquare : styles.blackSquare}
                    ${isSelected ? styles.selected : ''}
                    ${isOption ? styles.possibleMove : ''}
                    ${isCapture ? styles.captureMove : ''}
                    ${isKingInCheck ? styles.inCheck : ''}
                 `}
                            >
                                {piece && (
                                    <div className={styles.pieceWrapper}>
                                        {getPieceIcon(piece)}
                                    </div>
                                )}
                            </div>
                        )
                    })
                )}
            </div>

            <div className={styles.controls}>
                <button className={styles.button} onClick={resetGame}>
                    Reset Game
                </button>
                <div style={{ color: '#aaa', fontSize: '0.8rem' }}>
                    {fen}
                </div>
            </div>
        </div>
    );
}
