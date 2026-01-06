"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './Game.module.css';
import birdStyles from './Bird.module.css';
import pipeStyles from './Pipe.module.css';

const GRAVITY = 0.6;
const JUMP_STRENGTH = -8;
const PIPE_SPEED = 3;
const PIPE_SPAWN_RATE = 1500; // ms
const PIPE_WIDTH = 50;
const BIRD_SIZE = 20;

interface PipeData {
    x: number;
    topHeight: number;
    gap: number;
    passed: boolean;
    id: number;
}

export default function Game() {
    const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAME_OVER'>('START');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [tick, setTick] = useState(0); // For forcing re-render

    const birdY = useRef(300);
    const birdVelocity = useRef(0);
    const pipes = useRef<PipeData[]>([]);
    const lastPipeTime = useRef(0);
    const gameLoopRef = useRef<number | null>(null);
    const gameAreaRef = useRef<HTMLDivElement>(null);

    // Ref to hold the loop logic to avoid closure issues if we used direct function
    const loopRef = useRef<(timestamp: number) => void>(null);

    // Sound Logic using Web Audio API
    const playSound = useCallback((type: 'jump' | 'score' | 'gameover') => {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        if (type === 'jump') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(500, now + 0.1);
            gain.gain.setValueAtTime(0.3, now); // reduced volume
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'score') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            gain.gain.setValueAtTime(0.3, now); // reduced volume
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'gameover') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
            gain.gain.setValueAtTime(0.3, now); // reduced volume
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        }
    }, []);

    const startGame = useCallback(() => {
        setGameState('PLAYING');
        setScore(0);
        birdY.current = 300;
        birdVelocity.current = 0;
        pipes.current = [];
        lastPipeTime.current = performance.now();
    }, []);

    const jump = useCallback(() => {
        if (gameState === 'PLAYING') {
            birdVelocity.current = JUMP_STRENGTH;
            playSound('jump');
        } else if (gameState === 'START' || gameState === 'GAME_OVER') {
            startGame();
        }
    }, [gameState, startGame, playSound]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                jump();
            }
        };

        const handleClick = () => {
            jump();
        }

        window.addEventListener('keydown', handleKeyDown);
        if (gameAreaRef.current) {
            // Attaching to window to ensure clicks work everywhere
            window.addEventListener('mousedown', handleClick);
            window.addEventListener('touchstart', handleClick);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handleClick);
            window.removeEventListener('touchstart', handleClick);
        };
    }, [jump]);

    useEffect(() => {
        if (gameState === 'PLAYING' && loopRef.current) {
            gameLoopRef.current = requestAnimationFrame(loopRef.current);
        }
        return () => {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
        };
    }, [gameState]);

    // Game Loop Logic
    loopRef.current = (timestamp: number) => {
        if (gameState !== 'PLAYING') return;

        // Physics
        birdVelocity.current += GRAVITY;
        birdY.current += birdVelocity.current;

        // Pipes
        if (timestamp - lastPipeTime.current > PIPE_SPAWN_RATE) {
            const gameHeight = gameAreaRef.current ? gameAreaRef.current.clientHeight : 600;
            const gapHeight = 150;
            const minPipeHeight = 50;
            const maxPipeTop = gameHeight - gapHeight - minPipeHeight;
            const pipeTopHeight = Math.floor(Math.random() * (maxPipeTop - minPipeHeight + 1)) + minPipeHeight;

            pipes.current.push({
                x: gameAreaRef.current ? gameAreaRef.current.clientWidth : 400,
                topHeight: pipeTopHeight,
                gap: gapHeight,
                passed: false,
                id: Date.now()
            });
            lastPipeTime.current = timestamp;
        }

        pipes.current.forEach(pipe => {
            pipe.x -= PIPE_SPEED;
        });

        if (pipes.current.length > 0 && pipes.current[0].x + PIPE_WIDTH < 0) {
            pipes.current.shift();
        }

        // Collisions
        const gameHeight = gameAreaRef.current ? gameAreaRef.current.clientHeight : 600;

        if (birdY.current + BIRD_SIZE > gameHeight || birdY.current < 0) {
            gameOver();
            return;
        }

        const birdRect = { x: 50, y: birdY.current, width: BIRD_SIZE, height: BIRD_SIZE };

        // Check pipe collisions
        let collision = false;
        pipes.current.forEach(pipe => {
            const pipeLeft = pipe.x;
            const pipeRight = pipe.x + PIPE_WIDTH;

            if (birdRect.x + birdRect.width > pipeLeft && birdRect.x < pipeRight) {
                if (birdRect.y < pipe.topHeight || birdRect.y + birdRect.height > pipe.topHeight + pipe.gap) {
                    collision = true;
                }
            }

            if (!pipe.passed && birdRect.x > pipeRight) {
                pipe.passed = true;
                setScore(s => s + 1);
                playSound('score');
            }
        });

        if (collision) {
            gameOver();
            return;
        }

        setTick(t => t + 1); // Render
        if (loopRef.current) {
            gameLoopRef.current = requestAnimationFrame(loopRef.current);
        }
    };

    const gameOver = () => {
        playSound('gameover');
        setGameState('GAME_OVER');
        if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
        // Don't modify state inside render loop directly if feasible, but here we are in rAF callback using Refs.
        // However, calling setHighScore is valid.
        // score is state, but we can read it? No, score closure might be stale in loopRef assignment if we weren't re-assigning it.
        // loopRef.current IS re-assigned every render, so it captures current scope?
        // Yes, but `score` state might be stale if we don't depend on it properly.
        // Actually we only need score for highScore check.
        setHighScore(prev => {
            // We use functional update to get latest highScore
            // But we need latest `score`. 
            // We can use a ref for score if we want to be safe, or just rely on setScore updating it.
            // Actually, we are setting score in the loop.
            // Better: use a scoreRef for logic.
            return prev;
        });
        // We update highscore based on state score... this is tricky with stale closures.
        // Let's use a scoreRef to track score accurately for logic.
    };

    // Sync scoreRef because I didn't add it globally yet? 
    // Let's just blindly update high score based on the setScore we just did?
    // Actually, simpler: `setHighScore(h => Math.max(h, currentScore))`
    // But currentScore is not available easily in the loop unless we use ref.
    // I'll add scoreRef.

    // NOTE: I'm not adding scoreRef in this pass to minimize changes/errors, 
    // instead I'll just check `pipes` passed count or similar? 
    // No, I'll just trust that `score` state is updated enough or just set high score in the effect?
    // Let's fix gameOver to be simple.

    useEffect(() => {
        if (gameState === 'GAME_OVER') {
            setHighScore(h => Math.max(h, score));
        }
    }, [gameState, score]);

    return (
        <div className={styles.container} ref={gameAreaRef}>
            <div className={styles.scoreBoard}>
                <div className={styles.score}>{score}</div>
                {highScore > 0 && <div className={styles.highScore}>Best: {highScore}</div>}
            </div>

            <div
                className={birdStyles.bird}
                style={{
                    top: birdY.current,
                    width: BIRD_SIZE,
                    height: BIRD_SIZE,
                    transform: `rotate(${Math.min(Math.max(birdVelocity.current * 5, -30), 30)}deg)`
                }}
            />

            {pipes.current.map(pipe => (
                <React.Fragment key={pipe.id}>
                    <div
                        className={pipeStyles.pipeTop}
                        style={{
                            left: pipe.x,
                            height: pipe.topHeight,
                            width: PIPE_WIDTH
                        }}
                    />
                    <div
                        className={pipeStyles.pipeBottom}
                        style={{
                            left: pipe.x,
                            top: pipe.topHeight + pipe.gap,
                            bottom: 0,
                            width: PIPE_WIDTH
                        }}
                    />
                </React.Fragment>
            ))}

            {gameState !== 'PLAYING' && (
                <div className={styles.overlay}>
                    <div className={styles.menu}>
                        {gameState === 'GAME_OVER' && <h2>Game Over</h2>}
                        <button onClick={startGame} className={styles.button}>
                            {gameState === 'START' ? 'Start Game' : 'Try Again'}
                        </button>
                        <p className={styles.instruction}>Space or Click to Jump</p>
                    </div>
                </div>
            )}
        </div>
    );
}
