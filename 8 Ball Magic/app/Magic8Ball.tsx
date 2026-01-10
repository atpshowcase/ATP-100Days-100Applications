'use client';

import { useState, useEffect } from 'react';

const responses = [
  // Positive responses
  'It is certain',
  'Without a doubt',
  'Yes, definitely',
  'You may rely on it',
  'As I see it, yes',
  'Most likely',
  'Outlook good',
  'Yes',
  'Signs point to yes',
  
  // Non-committal responses
  'Reply hazy, try again',
  'Ask again later',
  'Better not tell you now',
  'Cannot predict now',
  'Concentrate and ask again',
  
  // Negative responses
  'Don\'t count on it',
  'My reply is no',
  'My sources say no',
  'Outlook not so good',
  'Very doubtful',
];

export default function Magic8Ball() {
  const [answer, setAnswer] = useState<string>('');
  const [isShaking, setIsShaking] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [question, setQuestion] = useState('');
  const [hasAsked, setHasAsked] = useState(false);

  const shake = () => {
    if (!question.trim()) {
      return;
    }

    setIsShaking(true);
    setShowAnswer(false);
    setHasAsked(true);

    setTimeout(() => {
      const randomAnswer = responses[Math.floor(Math.random() * responses.length)];
      setAnswer(randomAnswer);
      setIsShaking(false);
      
      setTimeout(() => {
        setShowAnswer(true);
      }, 300);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      shake();
    }
  };

  const reset = () => {
    setAnswer('');
    setShowAnswer(false);
    setQuestion('');
    setHasAsked(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="font-cormorant text-7xl md:text-8xl font-light tracking-tight mb-4 text-balance">
            Magic 8 Ball
          </h1>
          <p className="font-work text-sm tracking-widest uppercase text-gray-500">
            Ask a question, seek an answer
          </p>
        </div>

        {/* Input Section */}
        {!hasAsked && (
          <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What would you like to know?"
              className="w-full bg-transparent border-b-2 border-gray-300 focus:border-black outline-none py-4 text-2xl font-cormorant font-light transition-colors duration-300 placeholder:text-gray-400"
              autoFocus
            />
          </div>
        )}

        {/* The Ball */}
        <div className="flex justify-center mb-16">
          <button
            onClick={shake}
            disabled={!question.trim() || isShaking}
            className={`
              relative w-64 h-64 rounded-full bg-black
              transition-all duration-300 
              ${!question.trim() ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'}
              ${isShaking ? 'animate-shake' : hasAsked ? '' : 'animate-float'}
              focus:outline-none focus:ring-4 focus:ring-gray-300
              group
            `}
            style={{ animationDelay: '0.4s' }}
          >
            {/* Inner Circle */}
            <div className="absolute inset-8 rounded-full bg-gray-900 flex items-center justify-center">
              <div className="absolute inset-4 rounded-full bg-black flex items-center justify-center">
                {/* Number 8 */}
                {!showAnswer && (
                  <span className="text-white font-cormorant text-7xl font-bold opacity-20 group-hover:opacity-40 transition-opacity">
                    8
                  </span>
                )}
                
                {/* Answer Window */}
                {showAnswer && (
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <p className="text-white font-work text-center text-sm tracking-wide animate-fade-in leading-relaxed">
                      {answer}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Highlight Effect */}
            <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-white opacity-20 blur-xl"></div>
          </button>
        </div>

        {/* Instructions / Actions */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          {!hasAsked ? (
            <p className="font-work text-sm text-gray-500 tracking-wide">
              {question.trim() ? 'Click the ball or press Enter' : 'Type your question above'}
            </p>
          ) : showAnswer ? (
            <button
              onClick={reset}
              className="font-work text-sm tracking-widest uppercase text-gray-900 hover:text-black transition-colors underline underline-offset-4 decoration-1"
            >
              Ask Another Question
            </button>
          ) : (
            <p className="font-work text-sm text-gray-500 tracking-wide">
              Consulting the spirits...
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="font-work text-xs text-gray-400 tracking-widest uppercase">
            Built with Next.js
          </p>
        </div>
      </div>
    </div>
  );
}
