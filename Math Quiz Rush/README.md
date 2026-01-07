# Math Quiz Rush

A minimalist math quiz game built with Next.js where players match equations with their answers under time pressure.

## Features

- **Quick Matching Gameplay**: Click an equation, then click its matching answer
- **Time Pressure**: 60-second timer keeps you on your toes
- **Streak System**: Build combos for bonus points
- **Clean Minimalist Design**: Black and white aesthetic with smooth transitions
- **Responsive Layout**: Works on desktop and mobile

## How to Play

1. Click "Start Game" to begin
2. Click an equation on the left side
3. Click the matching answer on the right side
4. Match all 4 pairs to get a new set
5. Keep going until time runs out!

## Scoring

- Base points: 10 points per match
- Streak bonus: +2 points per streak level
- Try to build long streaks for maximum scores!

## Installation

If you encounter permission issues with npm, try one of these alternatives:

### Option 1: Run PowerShell as Administrator
```bash
npm install
npm run dev
```

### Option 2: Use pnpm
```bash
npx pnpm install
npx pnpm dev
```

### Option 3: Use yarn
```bash
npm install -g yarn
yarn install
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies

- **Next.js 15** with App Router
- **React 19** for UI
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- Minimalist, performance-focused design

## Project Structure

```
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main game component
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Development

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
```
