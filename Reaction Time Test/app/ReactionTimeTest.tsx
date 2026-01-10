'use client';

import { useState, useEffect, useRef } from 'react';

type GameState = 'idle' | 'waiting' | 'ready' | 'tooEarly' | 'result';

export default function ReactionTimeTest() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const getRandomDelay = () => Math.random() * 3000 + 2000; // 2-5 seconds

  const startTest = () => {
    setGameState('waiting');
    setReactionTime(null);

    // Random delay before showing green
    const delay = getRandomDelay();
    timeoutRef.current = setTimeout(() => {
      setGameState('ready');
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleClick = () => {
    if (gameState === 'idle') {
      startTest();
    } else if (gameState === 'waiting') {
      // Clicked too early
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setGameState('tooEarly');
    } else if (gameState === 'ready') {
      // Calculate reaction time
      const endTime = Date.now();
      const reaction = endTime - startTimeRef.current;
      setReactionTime(reaction);
      
      // Update attempts and best time
      const newAttempts = [...attempts, reaction];
      setAttempts(newAttempts);
      
      if (!bestTime || reaction < bestTime) {
        setBestTime(reaction);
      }
      
      setGameState('result');
    } else if (gameState === 'tooEarly' || gameState === 'result') {
      // Restart
      startTest();
    }
  };

  const reset = () => {
    setGameState('idle');
    setReactionTime(null);
    setAttempts([]);
    setBestTime(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const getAverageTime = () => {
    if (attempts.length === 0) return null;
    return Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length);
  };

  const getRating = (time: number) => {
    if (time < 200) return 'EXCEPTIONAL';
    if (time < 250) return 'EXCELLENT';
    if (time < 300) return 'GOOD';
    if (time < 350) return 'AVERAGE';
    return 'SLOW';
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getBackgroundColor = () => {
    switch (gameState) {
      case 'idle':
        return 'bg-gray-100';
      case 'waiting':
        return 'bg-red-500';
      case 'ready':
        return 'bg-green-500';
      case 'tooEarly':
        return 'bg-yellow-400';
      case 'result':
        return 'bg-blue-500';
      default:
        return 'bg-gray-100';
    }
  };

  const getInstruction = () => {
    switch (gameState) {
      case 'idle':
        return 'CLICK TO START';
      case 'waiting':
        return 'WAIT FOR GREEN...';
      case 'ready':
        return 'CLICK NOW!';
      case 'tooEarly':
        return 'TOO EARLY! CLICK TO RETRY';
      case 'result':
        return 'CLICK TO TRY AGAIN';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header Stats */}
        {(attempts.length > 0 || gameState !== 'idle') && (
          <div className="mb-8 grid grid-cols-3 gap-4 font-mono text-xs animate-fade-in">
            <div className="border-2 border-black p-4">
              <div className="text-gray-500 mb-1">ATTEMPTS</div>
              <div className="text-3xl font-bold">{attempts.length}</div>
            </div>
            <div className="border-2 border-black p-4">
              <div className="text-gray-500 mb-1">BEST TIME</div>
              <div className="text-3xl font-bold">
                {bestTime ? `${bestTime}ms` : '---'}
              </div>
            </div>
            <div className="border-2 border-black p-4">
              <div className="text-gray-500 mb-1">AVERAGE</div>
              <div className="text-3xl font-bold">
                {getAverageTime() ? `${getAverageTime()}ms` : '---'}
              </div>
            </div>
          </div>
        )}

        {/* Main Test Area */}
        <div
          onClick={handleClick}
          className={`
            ${getBackgroundColor()}
            min-h-[400px] md:min-h-[500px]
            flex flex-col items-center justify-center
            border-4 border-black
            transition-all duration-200
            clickable-area
            select-none
          `}
        >
          {gameState === 'idle' && (
            <div className="text-center animate-fade-in">
              <h1 className="font-mono text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
                REACTION TIME
              </h1>
              <p className="font-grotesk text-lg md:text-xl mb-12 max-w-md mx-auto">
                Test your reflexes. Click when the screen turns green.
              </p>
              <div className="font-mono text-xl tracking-wider">
                {getInstruction()}
              </div>
            </div>
          )}

          {gameState === 'waiting' && (
            <div className="text-center text-white animate-fade-in">
              <div className="font-mono text-3xl md:text-5xl font-bold tracking-wider">
                {getInstruction()}
              </div>
            </div>
          )}

          {gameState === 'ready' && (
            <div className="text-center text-white animate-fade-in">
              <div className="font-mono text-4xl md:text-6xl font-bold tracking-wider">
                {getInstruction()}
              </div>
            </div>
          )}

          {gameState === 'tooEarly' && (
            <div className="text-center text-black animate-fade-in">
              <div className="text-7xl mb-6">⚠️</div>
              <div className="font-mono text-3xl md:text-5xl font-bold tracking-wider mb-4">
                TOO EARLY
              </div>
              <div className="font-grotesk text-lg">
                Wait for the green screen!
              </div>
            </div>
          )}

          {gameState === 'result' && reactionTime !== null && (
            <div className="text-center text-white animate-fade-in">
              <div className="font-mono text-xs tracking-widest mb-2 opacity-75">
                REACTION TIME
              </div>
              <div className="font-mono text-8xl md:text-9xl font-bold mb-4 tracking-tighter">
                {reactionTime}
              </div>
              <div className="font-mono text-2xl tracking-wider mb-8">
                milliseconds
              </div>
              <div className="font-grotesk text-xl tracking-widest mb-12">
                {getRating(reactionTime)}
              </div>
              <div className="font-mono text-lg tracking-wider">
                {getInstruction()}
              </div>
            </div>
          )}
        </div>

        {/* Instructions & Reset */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-mono text-xs">
          <div className="space-y-1 text-gray-600">
            <div>• CLICK WHEN GREEN APPEARS</div>
            <div>• DON'T CLICK DURING RED</div>
            <div>• AVERAGE HUMAN REACTION: ~250ms</div>
          </div>
          {attempts.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                reset();
              }}
              className="border-2 border-black px-6 py-3 hover:bg-black hover:text-white transition-colors tracking-wider"
            >
              RESET
            </button>
          )}
        </div>

        {/* Attempt History */}
        {attempts.length > 0 && (
          <div className="mt-8 border-2 border-black p-6">
            <div className="font-mono text-xs tracking-wider mb-4 text-gray-500">
              RECENT ATTEMPTS
            </div>
            <div className="flex flex-wrap gap-3">
              {attempts.slice(-10).reverse().map((time, index) => (
                <div
                  key={index}
                  className={`
                    font-mono text-sm px-3 py-2 border border-black
                    ${time === bestTime ? 'bg-black text-white' : 'bg-white'}
                  `}
                >
                  {time}ms
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
