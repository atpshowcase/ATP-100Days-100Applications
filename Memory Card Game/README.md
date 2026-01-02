# Memory Card Game

A beautiful and engaging memory card game built with Next.js 15, TypeScript, and modern CSS. Test your memory by matching pairs of emoji cards!

## Features

- 🎮 **Three Difficulty Levels**: Easy (6 pairs), Medium (8 pairs), and Hard (12 pairs)
- ⏱️ **Timer & Move Counter**: Track your performance
- 🎨 **Modern Design**: Glassmorphism effects, smooth animations, and vibrant gradients
- 📱 **Fully Responsive**: Works perfectly on desktop, tablet, and mobile
- ✨ **Smooth Animations**: 3D card flip effects and win celebrations
- 🏆 **Score System**: Get scored based on time, moves, and difficulty

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd "Memory Card Game"
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to play the game!

## How to Play

1. **Select Difficulty**: Choose between Easy, Medium, or Hard mode
2. **Click Cards**: Click on any card to flip it and reveal the emoji
3. **Match Pairs**: Find matching pairs by remembering card positions
4. **Win**: Match all pairs to win and see your score!

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **CSS Modules**: Scoped styling with modern CSS features
- **Tailwind CSS**: Utility-first CSS framework

## Project Structure

```
Memory Card Game/
├── app/
│   ├── components/
│   │   ├── Card.tsx          # Card component with flip animation
│   │   └── Card.module.css   # Card styles
│   ├── globals.css            # Global styles and design system
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Main game page
│   ├── page.module.css        # Page styles
│   ├── types.ts               # TypeScript type definitions
│   └── utils.ts               # Game utility functions
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## Build for Production

```bash
npm run build
npm start
```

## License

This project is open source and available for educational purposes.

## Enjoy the Game! 🎉

Challenge yourself and improve your memory skills!
