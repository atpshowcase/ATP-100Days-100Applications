# Color Matching Game

A minimalist color matching game built with Next.js and TypeScript.

## Features

- **Color Perception Test**: Match the target color from four similar options
- **Score Tracking**: Keep track of your score, attempts, and accuracy
- **Sound Effects**: Pleasant audio feedback for correct/incorrect answers
- **Sound Toggle**: Easily mute/unmute sounds
- **Minimalist Design**: Clean, distraction-free interface
- **Responsive**: Works on all screen sizes
- **Dark Mode Support**: Automatically adapts to system preferences

## How to Play

1. Click "Start Game" to begin
2. Study the target color shown at the top
3. Select the matching color from the four options below
4. Get instant feedback on your choice
5. Track your accuracy and improve your score

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **React Hooks** - State and effect management

## Game Mechanics

- Target color is randomly generated
- Three similar decoy colors are created with slight variations
- Colors are shuffled for each round
- Accuracy is calculated based on correct matches vs total attempts
