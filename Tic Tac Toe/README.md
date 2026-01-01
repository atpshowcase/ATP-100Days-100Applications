# Tic Tac Toe - Next.js

A minimalist and modern Tic Tac Toe game built with Next.js 14, TypeScript, and CSS Modules.

## Features

- ✨ **Minimalist Design** - Clean, modern interface with dark theme
- 🎮 **Smooth Animations** - Fluid transitions and hover effects
- 📊 **Score Tracking** - Keeps track of wins for X, O, and draws
- 📱 **Responsive** - Works perfectly on all screen sizes
- ⚡ **Fast** - Built with Next.js 14 App Router
- 🎯 **TypeScript** - Fully typed for better development experience

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Open PowerShell as Administrator and run:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

2. Navigate to the project directory:
   ```bash
   cd "c:\[01] ATP\[02] Project Git\ATP-100Days-100Applications\Tic Tac Toe"
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Play

1. Players take turns clicking on empty cells
2. Player X always goes first
3. Get three in a row (horizontally, vertically, or diagonally) to win
4. Click "New Game" to start a new round (scores are preserved)
5. Click "Reset Scores" to clear all scores and start fresh

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules
- **Font:** Inter (Google Fonts)

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── TicTacToe.tsx       # Main game component
│   └── TicTacToe.module.css # Component styles
├── types/
│   └── game.ts             # TypeScript type definitions
├── utils/
│   └── gameLogic.ts        # Game logic utilities
├── package.json
├── tsconfig.json
└── next.config.js
```

## Build for Production

```bash
npm run build
npm start
```

## License

MIT
