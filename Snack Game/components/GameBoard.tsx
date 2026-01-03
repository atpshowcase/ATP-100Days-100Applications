import React, { useEffect, useRef } from 'react';
import { Position } from '@/hooks/useGameLogic';

interface GameBoardProps {
    snake: Position[];
    food: Position;
    gridSize: number;
}

const CELL_SIZE = 20;

export const GameBoard: React.FC<GameBoardProps> = ({ snake, food, gridSize }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid (subtle)
        ctx.strokeStyle = 'rgba(155, 199, 0, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= gridSize; i++) {
            // Vertical lines
            ctx.beginPath();
            ctx.moveTo(i * CELL_SIZE, 0);
            ctx.lineTo(i * CELL_SIZE, gridSize * CELL_SIZE);
            ctx.stroke();

            // Horizontal lines
            ctx.beginPath();
            ctx.moveTo(0, i * CELL_SIZE);
            ctx.lineTo(gridSize * CELL_SIZE, i * CELL_SIZE);
            ctx.stroke();
        }

        // Draw snake
        snake.forEach((segment, index) => {
            const isHead = index === 0;

            // Snake body gradient
            const gradient = ctx.createRadialGradient(
                segment.x * CELL_SIZE + CELL_SIZE / 2,
                segment.y * CELL_SIZE + CELL_SIZE / 2,
                0,
                segment.x * CELL_SIZE + CELL_SIZE / 2,
                segment.y * CELL_SIZE + CELL_SIZE / 2,
                CELL_SIZE / 2
            );

            if (isHead) {
                gradient.addColorStop(0, '#c7f464');
                gradient.addColorStop(1, '#9bc700');
            } else {
                gradient.addColorStop(0, '#9bc700');
                gradient.addColorStop(1, '#6a8a00');
            }

            ctx.fillStyle = gradient;
            ctx.fillRect(
                segment.x * CELL_SIZE + 1,
                segment.y * CELL_SIZE + 1,
                CELL_SIZE - 2,
                CELL_SIZE - 2
            );

            // Add glow effect to head
            if (isHead) {
                ctx.shadowColor = 'rgba(155, 199, 0, 0.8)';
                ctx.shadowBlur = 15;
                ctx.fillRect(
                    segment.x * CELL_SIZE + 1,
                    segment.y * CELL_SIZE + 1,
                    CELL_SIZE - 2,
                    CELL_SIZE - 2
                );
                ctx.shadowBlur = 0;
            }

            // Add pixel detail
            ctx.fillStyle = isHead ? '#fff' : 'rgba(255, 255, 255, 0.3)';
            ctx.fillRect(
                segment.x * CELL_SIZE + 3,
                segment.y * CELL_SIZE + 3,
                3,
                3
            );
        });

        // Draw food with pulsing effect
        const foodGradient = ctx.createRadialGradient(
            food.x * CELL_SIZE + CELL_SIZE / 2,
            food.y * CELL_SIZE + CELL_SIZE / 2,
            0,
            food.x * CELL_SIZE + CELL_SIZE / 2,
            food.y * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 2
        );
        foodGradient.addColorStop(0, '#ff6b6b');
        foodGradient.addColorStop(1, '#ee5a52');

        ctx.fillStyle = foodGradient;
        ctx.shadowColor = 'rgba(255, 107, 107, 0.8)';
        ctx.shadowBlur = 20;

        // Draw food as circle
        ctx.beginPath();
        ctx.arc(
            food.x * CELL_SIZE + CELL_SIZE / 2,
            food.y * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.shadowBlur = 0;

        // Add highlight to food
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(
            food.x * CELL_SIZE + CELL_SIZE / 2 - 3,
            food.y * CELL_SIZE + CELL_SIZE / 2 - 3,
            3,
            0,
            Math.PI * 2
        );
        ctx.fill();

    }, [snake, food, gridSize]);

    return (
        <canvas
            ref={canvasRef}
            width={gridSize * CELL_SIZE}
            height={gridSize * CELL_SIZE}
            className="game-board"
            style={{
                imageRendering: 'crisp-edges',
            }}
        />
    );
};
