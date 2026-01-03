'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import GameBoard from '@/components/GameBoard';
import ScoreBoard from '@/components/ScoreBoard';
import GameOver from '@/components/GameOver';
import {
    initializeGame,
    moveGrid,
    addRandomTile,
    isGameWon,
    canMove,
    type Direction,
    type Grid
} from '@/lib/game-logic';

interface TileData {
    id: number;
    value: number;
    row: number;
    col: number;
    isNew: boolean;
}

export default function Home() {
    const [tiles, setTiles] = useState<TileData[]>([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [continueAfterWin, setContinueAfterWin] = useState(false);
    const nextId = useRef(0);
    const tileIdMap = useRef<Map<string, number>>(new Map());

    // Convert grid to tiles with persistent IDs
    const gridToTiles = (newGrid: Grid, markNew: boolean = false): TileData[] => {
        const newTiles: TileData[] = [];
        const newIdMap = new Map<string, number>();

        newGrid.forEach((row, i) => {
            row.forEach((value, j) => {
                if (value !== 0) {
                    const posKey = `${i}-${j}`;

                    // Try to find existing tile ID
                    let tileId = tileIdMap.current.get(posKey);
                    let isNew = false;

                    if (tileId === undefined) {
                        // This is a new tile
                        tileId = nextId.current++;
                        isNew = markNew;
                    }

                    newIdMap.set(posKey, tileId);

                    newTiles.push({
                        id: tileId,
                        value,
                        row: i,
                        col: j,
                        isNew
                    });
                }
            });
        });

        tileIdMap.current = newIdMap;
        return newTiles;
    };

    // Initialize game
    useEffect(() => {
        const savedBestScore = localStorage.getItem('bestScore');
        if (savedBestScore) {
            setBestScore(parseInt(savedBestScore));
        }
        startNewGame();
    }, []);

    const startNewGame = () => {
        nextId.current = 0;
        tileIdMap.current.clear();
        const newGrid = initializeGame();
        const initialTiles = gridToTiles(newGrid, false);
        setTiles(initialTiles);
        setScore(0);
        setGameOver(false);
        setGameWon(false);
        setContinueAfterWin(false);
    };

    const handleMove = useCallback((direction: Direction) => {
        if (gameOver || (gameWon && !continueAfterWin)) return;

        // Get current grid from tiles
        const currentGrid: Grid = Array(4).fill(null).map(() => Array(4).fill(0));
        tiles.forEach(tile => {
            currentGrid[tile.row][tile.col] = tile.value;
        });

        const { grid: movedGrid, score: moveScore, moved } = moveGrid(currentGrid, direction);

        if (!moved) {
            // Add shake animation for invalid move
            const gameContainer = document.querySelector('.game-container');
            if (gameContainer) {
                gameContainer.classList.add('shake');
                setTimeout(() => {
                    gameContainer.classList.remove('shake');
                }, 300);
            }
            return;
        }

        // Add new tile immediately and update everything at once
        const gridWithNewTile = addRandomTile(movedGrid);
        const finalTiles = gridToTiles(gridWithNewTile, true);
        setTiles(finalTiles);

        const newScore = score + moveScore;
        setScore(newScore);

        // Update best score
        if (newScore > bestScore) {
            setBestScore(newScore);
            localStorage.setItem('bestScore', newScore.toString());
        }

        // Check win condition
        if (!gameWon && isGameWon(gridWithNewTile)) {
            setGameWon(true);
        }

        // Check lose condition
        if (!canMove(gridWithNewTile)) {
            setGameOver(true);
        }

    }, [tiles, score, bestScore, gameOver, gameWon, continueAfterWin]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();

                const directionMap: { [key: string]: Direction } = {
                    'ArrowUp': 'up',
                    'ArrowDown': 'down',
                    'ArrowLeft': 'left',
                    'ArrowRight': 'right',
                };

                handleMove(directionMap[e.key]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleMove]);

    // Touch controls
    useEffect(() => {
        let touchStartX = 0;
        let touchStartY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            const minSwipeDistance = 50;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (Math.abs(deltaX) > minSwipeDistance) {
                    handleMove(deltaX > 0 ? 'right' : 'left');
                }
            } else {
                if (Math.abs(deltaY) > minSwipeDistance) {
                    handleMove(deltaY > 0 ? 'down' : 'up');
                }
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleMove]);

    const handleContinue = () => {
        setContinueAfterWin(true);
        setGameWon(false);
    };

    return (
        <main className="main-container">
            <div className="game-wrapper">
                <header className="game-header">
                    <h1 className="game-title">2048</h1>
                    <ScoreBoard score={score} bestScore={bestScore} />
                </header>

                <div className="game-info">
                    <p className="game-description">
                        Join the tiles, get to <strong>2048!</strong>
                    </p>
                    <button className="btn-new-game" onClick={startNewGame}>
                        New Game
                    </button>
                </div>

                <GameBoard tiles={tiles} />

                <div className="game-instructions">
                    <p><strong>How to play:</strong> Use arrow keys to move tiles. Tiles with the same number merge into one when they touch. Add them up to reach 2048!</p>
                </div>

                {(gameOver || (gameWon && !continueAfterWin)) && (
                    <GameOver
                        isWon={gameWon}
                        score={score}
                        onRestart={startNewGame}
                        onContinue={gameWon ? handleContinue : undefined}
                    />
                )}
            </div>
        </main>
    );
}
