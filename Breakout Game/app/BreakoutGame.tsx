'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  alive: boolean;
  points: number;
}

interface Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  speed: number;
}

interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

export default function BreakoutGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameover' | 'won'>('menu');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const animationFrameRef = useRef<number>();
  const keysRef = useRef<{ [key: string]: boolean }>({});

  const gameDataRef = useRef({
    ball: { x: 0, y: 0, dx: 4, dy: -4, radius: 8, speed: 5 } as Ball,
    paddle: { x: 0, y: 0, width: 120, height: 15, speed: 8 } as Paddle,
    bricks: [] as Brick[],
  });

  const colors = ['#ff006e', '#00f5ff', '#8338ec', '#ffbe0b', '#06ffa5'];

  const initializeBricks = useCallback((currentLevel: number) => {
    const bricks: Brick[] = [];
    const rows = Math.min(5 + Math.floor(currentLevel / 2), 8);
    const cols = 10;
    const brickWidth = 75;
    const brickHeight = 25;
    const padding = 5;
    const offsetX = 35;
    const offsetY = 80;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        bricks.push({
          x: offsetX + col * (brickWidth + padding),
          y: offsetY + row * (brickHeight + padding),
          width: brickWidth,
          height: brickHeight,
          color: colors[row % colors.length],
          alive: true,
          points: (rows - row) * 10,
        });
      }
    }

    return bricks;
  }, []);

  const initializeGame = useCallback((currentLevel: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ball = gameDataRef.current.ball;
    const paddle = gameDataRef.current.paddle;

    ball.x = canvas.width / 2;
    ball.y = canvas.height - 100;
    ball.dx = 4 + currentLevel * 0.5;
    ball.dy = -4 - currentLevel * 0.5;
    ball.speed = 5 + currentLevel * 0.3;

    paddle.x = (canvas.width - paddle.width) / 2;
    paddle.y = canvas.height - 40;

    gameDataRef.current.bricks = initializeBricks(currentLevel);
  }, [initializeBricks]);

  const drawBall = (ctx: CanvasRenderingContext2D, ball: Ball) => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#00f5ff';
    ctx.fill();
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#00f5ff';
    ctx.closePath();
    ctx.shadowBlur = 0;
  };

  const drawPaddle = (ctx: CanvasRenderingContext2D, paddle: Paddle) => {
    ctx.fillStyle = '#ff006e';
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#ff006e';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.shadowBlur = 0;
  };

  const drawBricks = (ctx: CanvasRenderingContext2D, bricks: Brick[]) => {
    bricks.forEach(brick => {
      if (brick.alive) {
        ctx.fillStyle = brick.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = brick.color;
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
        ctx.shadowBlur = 0;
      }
    });
  };

  const collisionDetection = useCallback(() => {
    const { ball, bricks } = gameDataRef.current;
    let scoreIncrease = 0;

    bricks.forEach(brick => {
      if (brick.alive) {
        if (
          ball.x + ball.radius > brick.x &&
          ball.x - ball.radius < brick.x + brick.width &&
          ball.y + ball.radius > brick.y &&
          ball.y - ball.radius < brick.y + brick.height
        ) {
          ball.dy = -ball.dy;
          brick.alive = false;
          scoreIncrease += brick.points;
        }
      }
    });

    if (scoreIncrease > 0) {
      setScore(prev => prev + scoreIncrease);
    }

    const allBricksDestroyed = bricks.every(brick => !brick.alive);
    if (allBricksDestroyed) {
      setLevel(prev => prev + 1);
      setGameState('won');
    }
  }, []);

  const updateGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || gameState !== 'playing') return;

    const { ball, paddle } = gameDataRef.current;

    // Move paddle
    if (keysRef.current['ArrowLeft'] && paddle.x > 0) {
      paddle.x -= paddle.speed;
    }
    if (keysRef.current['ArrowRight'] && paddle.x < canvas.width - paddle.width) {
      paddle.x += paddle.speed;
    }

    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
      ball.dy = -ball.dy;
    }

    // Paddle collision
    if (
      ball.y + ball.radius > paddle.y &&
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.width
    ) {
      const hitPos = (ball.x - paddle.x) / paddle.width;
      const angle = (hitPos - 0.5) * Math.PI * 0.6;
      ball.dx = Math.sin(angle) * ball.speed;
      ball.dy = -Math.cos(angle) * ball.speed;
    }

    // Bottom wall - lose life
    if (ball.y + ball.radius > canvas.height) {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameState('gameover');
        } else {
          ball.x = canvas.width / 2;
          ball.y = canvas.height - 100;
          ball.dx = 4 + level * 0.5;
          ball.dy = -4 - level * 0.5;
        }
        return newLives;
      });
    }

    collisionDetection();
  }, [gameState, collisionDetection, level]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid background
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    if (gameState === 'playing' || gameState === 'paused') {
      const { ball, paddle, bricks } = gameDataRef.current;
      drawBricks(ctx, bricks);
      drawBall(ctx, ball);
      drawPaddle(ctx, paddle);

      // Draw HUD
      ctx.font = 'bold 20px Orbitron';
      ctx.fillStyle = '#00f5ff';
      ctx.fillText(`SCORE: ${score}`, 20, 30);
      ctx.fillText(`LIVES: ${lives}`, 20, 55);
      ctx.fillText(`LEVEL: ${level}`, canvas.width - 120, 30);

      if (gameState === 'paused') {
        ctx.font = 'bold 48px Orbitron';
        ctx.fillStyle = '#ff006e';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
        ctx.textAlign = 'left';
      }
    }
  }, [gameState, score, lives, level]);

  const gameLoop = useCallback(() => {
    updateGame();
    draw();
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [updateGame, draw]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setLevel(1);
    initializeGame(1);
  };

  const nextLevel = () => {
    initializeGame(level);
    setGameState('playing');
  };

  const togglePause = () => {
    setGameState(prev => prev === 'paused' ? 'playing' : 'paused');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      if (e.key === 'Escape' && gameState === 'playing') {
        togglePause();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, gameLoop]);

  useEffect(() => {
    initializeGame(level);
  }, [initializeGame, level]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen grid-bg">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="border-4 border-neon-cyan shadow-neon-cyan rounded-lg"
          style={{ backgroundColor: '#0a0a0f' }}
        />

        {gameState === 'menu' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-lg">
            <h1 className="text-7xl font-orbitron font-black text-neon-pink glow-text mb-8">
              NEON BREAKOUT
            </h1>
            <button
              onClick={startGame}
              className="px-12 py-4 text-2xl font-orbitron font-bold bg-neon-cyan text-black hover:bg-neon-pink hover:text-white transition-all shadow-neon-cyan hover:shadow-neon-pink rounded-lg transform hover:scale-110"
            >
              START GAME
            </button>
            <div className="mt-12 text-center font-rajdhani text-neon-cyan">
              <p className="text-xl mb-2">CONTROLS</p>
              <p className="text-lg">← → Arrow Keys to Move</p>
              <p className="text-lg">ESC to Pause</p>
            </div>
          </div>
        )}

        {gameState === 'won' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-lg">
            <h2 className="text-6xl font-orbitron font-black text-neon-green glow-text mb-4">
              LEVEL COMPLETE!
            </h2>
            <p className="text-3xl font-rajdhani text-neon-cyan mb-8">
              Score: {score}
            </p>
            <button
              onClick={nextLevel}
              className="px-12 py-4 text-2xl font-orbitron font-bold bg-neon-green text-black hover:bg-neon-yellow transition-all shadow-neon-cyan rounded-lg transform hover:scale-110"
            >
              NEXT LEVEL
            </button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-lg">
            <h2 className="text-6xl font-orbitron font-black text-neon-pink glow-text mb-4">
              GAME OVER
            </h2>
            <p className="text-3xl font-rajdhani text-neon-cyan mb-2">
              Final Score: {score}
            </p>
            <p className="text-2xl font-rajdhani text-neon-purple mb-8">
              Level Reached: {level}
            </p>
            <button
              onClick={startGame}
              className="px-12 py-4 text-2xl font-orbitron font-bold bg-neon-pink text-white hover:bg-neon-purple transition-all shadow-neon-pink hover:shadow-neon-purple rounded-lg transform hover:scale-110"
            >
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 text-center font-rajdhani text-neon-cyan">
        <p className="text-sm opacity-60">Built with Next.js & TypeScript</p>
      </div>
    </div>
  );
}
