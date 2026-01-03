import { useState, useEffect, useCallback, useRef } from 'react';

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type Position = { x: number; y: number };
export type GameStatus = 'idle' | 'playing' | 'paused' | 'gameOver';

const GRID_SIZE = 20;
const INITIAL_SNAKE: Position[] = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
];
const INITIAL_DIRECTION: Direction = 'UP';
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 10;

// Sound effect for eating food
const playEatSound = () => {
    try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

        // Create oscillator for the main tone
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Configure the sound (pleasant "pop" effect)
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);

        // Volume envelope
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        // Play the sound
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        // Silently fail if audio context is not supported
        console.warn('Audio not supported:', error);
    }
};

// Sound effect for game over
const playGameOverSound = () => {
    try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

        // Create oscillator for the main tone
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Configure the sound (descending "fail" effect)
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);

        // Volume envelope
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

        // Play the sound
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
        // Silently fail if audio context is not supported
        console.warn('Audio not supported:', error);
    }
};

export const useGameLogic = () => {
    const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
    const [food, setFood] = useState<Position>({ x: 5, y: 5 });
    const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
    const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [speed, setSpeed] = useState(INITIAL_SPEED);

    const directionRef = useRef<Direction>(INITIAL_DIRECTION);
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

    // Load high score from localStorage
    useEffect(() => {
        const savedHighScore = localStorage.getItem('snakeHighScore');
        if (savedHighScore) {
            setHighScore(parseInt(savedHighScore, 10));
        }
    }, []);

    // Generate random food position
    const generateFood = useCallback((currentSnake: Position[]): Position => {
        let newFood: Position;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
        } while (
            currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
        );
        return newFood;
    }, []);

    // Check collision with walls or self
    const checkCollision = useCallback((head: Position, body: Position[]): boolean => {
        // Wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            return true;
        }
        // Self collision
        return body.some((segment) => segment.x === head.x && segment.y === head.y);
    }, []);

    // Move snake
    const moveSnake = useCallback(() => {
        setSnake((prevSnake) => {
            const head = prevSnake[0];
            let newHead: Position;

            switch (directionRef.current) {
                case 'UP':
                    newHead = { x: head.x, y: head.y - 1 };
                    break;
                case 'DOWN':
                    newHead = { x: head.x, y: head.y + 1 };
                    break;
                case 'LEFT':
                    newHead = { x: head.x - 1, y: head.y };
                    break;
                case 'RIGHT':
                    newHead = { x: head.x + 1, y: head.y };
                    break;
            }

            // Check collision
            if (checkCollision(newHead, prevSnake)) {
                // Play game over sound
                playGameOverSound();
                setGameStatus('gameOver');
                return prevSnake;
            }

            const newSnake = [newHead, ...prevSnake];

            // Check if food is eaten
            if (newHead.x === food.x && newHead.y === food.y) {
                // Play eating sound
                playEatSound();

                setScore((prev) => {
                    const newScore = prev + 10;
                    if (newScore > highScore) {
                        setHighScore(newScore);
                        localStorage.setItem('snakeHighScore', newScore.toString());
                    }
                    return newScore;
                });
                setFood(generateFood(newSnake));

                // Increase speed every 5 foods
                if ((score + 10) % 50 === 0) {
                    setSpeed((prev) => Math.max(50, prev - SPEED_INCREMENT));
                }

                return newSnake;
            }

            // Remove tail if no food eaten
            newSnake.pop();
            return newSnake;
        });
    }, [food, score, highScore, checkCollision, generateFood]);

    // Game loop
    useEffect(() => {
        if (gameStatus === 'playing') {
            gameLoopRef.current = setInterval(moveSnake, speed);
        } else {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current);
            }
        }

        return () => {
            if (gameLoopRef.current) {
                clearInterval(gameLoopRef.current);
            }
        };
    }, [gameStatus, speed, moveSnake]);

    // Handle direction change
    const changeDirection = useCallback((newDirection: Direction) => {
        // Prevent reversing
        const opposites: Record<Direction, Direction> = {
            UP: 'DOWN',
            DOWN: 'UP',
            LEFT: 'RIGHT',
            RIGHT: 'LEFT',
        };

        if (opposites[directionRef.current] !== newDirection) {
            directionRef.current = newDirection;
            setDirection(newDirection);
        }
    }, []);

    // Keyboard controls
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (gameStatus === 'idle') {
                startGame();
                return;
            }

            if (e.code === 'Space') {
                e.preventDefault();
                togglePause();
                return;
            }

            if (gameStatus !== 'playing') return;

            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    e.preventDefault();
                    changeDirection('UP');
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    e.preventDefault();
                    changeDirection('DOWN');
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    e.preventDefault();
                    changeDirection('LEFT');
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    e.preventDefault();
                    changeDirection('RIGHT');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameStatus, changeDirection]);

    // Start game
    const startGame = useCallback(() => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        directionRef.current = INITIAL_DIRECTION;
        setFood(generateFood(INITIAL_SNAKE));
        setScore(0);
        setSpeed(INITIAL_SPEED);
        setGameStatus('playing');
    }, [generateFood]);

    // Toggle pause
    const togglePause = useCallback(() => {
        setGameStatus((prev) => (prev === 'playing' ? 'paused' : 'playing'));
    }, []);

    // Restart game
    const restartGame = useCallback(() => {
        startGame();
    }, [startGame]);

    return {
        snake,
        food,
        direction,
        gameStatus,
        score,
        highScore,
        gridSize: GRID_SIZE,
        startGame,
        togglePause,
        restartGame,
        changeDirection,
    };
};
