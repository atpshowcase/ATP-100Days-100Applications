# Hangman Game - Next.js

A modern, interactive Hangman game built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎮 Classic Hangman gameplay
- 🎨 Modern, beautiful UI with glassmorphism effects
- ✨ Smooth animations and transitions
- 📊 Win/Loss statistics tracking
- 🎯 Programming and tech-themed words
- 📱 Fully responsive design
- 🌈 Vibrant gradients and colors

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd "c:\[01] ATP\[02] Project Git\ATP-100Days-100Applications\Hangman"
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Play

1. The game will display blank spaces representing the letters of a hidden word
2. Click on letters from the keyboard to guess
3. Correct guesses will reveal the letters in the word
4. Wrong guesses will add parts to the hangman drawing
5. You have 6 mistakes before the game is over
6. Win by guessing all letters before running out of attempts!

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Poppins)

## Project Structure

```
Hangman/
├── app/
│   ├── globals.css       # Global styles and animations
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main game page
├── components/
│   ├── HangmanDrawing.tsx  # SVG hangman visualization
│   ├── WordDisplay.tsx     # Word letter boxes
│   ├── Keyboard.tsx        # Interactive keyboard
│   ├── GameStats.tsx       # Statistics display
│   └── GameModal.tsx       # Win/Loss modal
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Game Features

### Visual Design
- Glassmorphism UI elements
- Gradient backgrounds and text
- Smooth hover effects
- Animated transitions
- Floating elements
- Pulsing background effects

### Gameplay
- 30 programming-related words
- Real-time mistake tracking
- Letter reveal animations
- Win/Loss detection
- Statistics persistence
- Instant game restart

## Customization

### Adding More Words

Edit the `WORDS` array in `app/page.tsx`:

```typescript
const WORDS = [
  'JAVASCRIPT', 'TYPESCRIPT', 'REACT',
  // Add your words here
];
```

### Changing Difficulty

Modify `MAX_MISTAKES` in `app/page.tsx`:

```typescript
const MAX_MISTAKES = 6; // Change this number
```

## License

MIT License - Feel free to use this project for learning and personal use.

## Author

Created as part of the ATP 100 Days 100 Applications challenge.
