'use client';

import { useState, useEffect } from 'react';
import { Player } from '@/types/game';
import { checkWinner, isBoardFull } from '@/utils/gameLogic';
import styles from './TicTacToe.module.css';

export default function TicTacToe() {
    const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
    const [winner, setWinner] = useState<Player>(null);
    const [winningLine, setWinningLine] = useState<number[] | null>(null);
    const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
    const [isDraw, setIsDraw] = useState(false);

    useEffect(() => {
        const result = checkWinner(board);
        if (result.winner) {
            setWinner(result.winner);
            setWinningLine(result.line);
            setScores((prev) => ({
                ...prev,
                [result.winner as 'X' | 'O']: prev[result.winner as 'X' | 'O'] + 1,
            }));
        } else if (isBoardFull(board) && !winner) {
            setIsDraw(true);
            setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
        }
    }, [board, winner]);

    const handleCellClick = (index: number) => {
        if (board[index] || winner || isDraw) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer('X');
        setWinner(null);
        setWinningLine(null);
        setIsDraw(false);
    };

    const resetScores = () => {
        setScores({ X: 0, O: 0, draws: 0 });
        resetGame();
    };

    const getCellClassName = (index: number) => {
        let className = styles.cell;
        if (board[index]) className += ` ${styles.filled}`;
        if (winningLine?.includes(index)) className += ` ${styles.winning}`;
        return className;
    };

    return (
        <div className={styles.container}>
            <div className={styles.gameCard}>
                <h1 className={styles.title}>Tic Tac Toe</h1>

                {/* Score Board */}
                <div className={styles.scoreBoard}>
                    <div className={styles.scoreItem}>
                        <span className={styles.scoreLabel}>Player X</span>
                        <span className={`${styles.scoreValue} ${styles.scoreX}`}>{scores.X}</span>
                    </div>
                    <div className={styles.scoreItem}>
                        <span className={styles.scoreLabel}>Draws</span>
                        <span className={styles.scoreValue}>{scores.draws}</span>
                    </div>
                    <div className={styles.scoreItem}>
                        <span className={styles.scoreLabel}>Player O</span>
                        <span className={`${styles.scoreValue} ${styles.scoreO}`}>{scores.O}</span>
                    </div>
                </div>

                {/* Status */}
                <div className={styles.status}>
                    {winner ? (
                        <p className={styles.statusText}>
                            🎉 Player <span className={winner === 'X' ? styles.playerX : styles.playerO}>{winner}</span> wins!
                        </p>
                    ) : isDraw ? (
                        <p className={styles.statusText}>It&apos;s a draw! 🤝</p>
                    ) : (
                        <p className={styles.statusText}>
                            Current turn: <span className={currentPlayer === 'X' ? styles.playerX : styles.playerO}>{currentPlayer}</span>
                        </p>
                    )}
                </div>

                {/* Game Board */}
                <div className={styles.board}>
                    {board.map((cell, index) => (
                        <button
                            key={index}
                            className={getCellClassName(index)}
                            onClick={() => handleCellClick(index)}
                            disabled={!!cell || !!winner || isDraw}
                        >
                            {cell && (
                                <span className={cell === 'X' ? styles.playerX : styles.playerO}>
                                    {cell}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className={styles.actions}>
                    <button className={styles.resetButton} onClick={resetGame}>
                        New Game
                    </button>
                    <button className={styles.clearButton} onClick={resetScores}>
                        Reset Scores
                    </button>
                </div>
            </div>
        </div>
    );
}
