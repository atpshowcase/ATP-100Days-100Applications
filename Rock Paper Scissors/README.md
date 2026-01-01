# Rock Paper Scissors Game

A minimalist Rock Paper Scissors game built with Next.js 14, TypeScript, and clean design principles.

## Features

- 🎮 **Classic Gameplay**: Play Rock, Paper, Scissors against the computer
- 🎨 **Minimalist Design**: Clean, modern interface with smooth animations
- 📊 **Score Tracking**: Keep track of wins, losses, and draws
- 📱 **Responsive**: Works beautifully on all screen sizes
- ⚡ **Fast**: Built with Next.js for optimal performance

## Installation

1. **Install Dependencies**

   Open Command Prompt (not PowerShell) and navigate to the project directory:
   
   ```cmd
   cd "c:\[01] ATP\[02] Project Git\ATP-100Days-100Applications\Rock Paper Scissors"
   npm install
   ```

   Or if you have issues with the path, try:
   
   ```cmd
   cd c:\
   cd "[01] ATP"
   cd "[02] Project Git"
   cd "ATP-100Days-100Applications"
   cd "Rock Paper Scissors"
   npm install
   ```

2. **Run Development Server**

   ```cmd
   npm run dev
   ```

3. **Open in Browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Play

1. Click on one of the three buttons: Rock 🪨, Paper 📄, or Scissors ✂️
2. The computer will randomly choose its move
3. The winner is determined by the classic rules:
   - Rock beats Scissors
   - Scissors beats Paper
   - Paper beats Rock
4. Your score updates automatically
5. Click "Play Again" to start a new round

## Project Structure

```
Rock Paper Scissors/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx             # Main game page
│   └── globals.css          # Global styles
├── components/
│   ├── GameButton.tsx       # Choice button component
│   ├── ScoreBoard.tsx       # Score display component
│   └── GameResult.tsx       # Result display component
├── lib/
│   └── gameLogic.ts         # Game logic and utilities
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
└── next.config.js           # Next.js config
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Vanilla CSS**: Custom styling with CSS variables
- **React Hooks**: State management with useState

## Design Philosophy

This game follows a minimalist design approach:

- **Clean Typography**: System fonts for fast loading
- **Subtle Animations**: Smooth transitions for better UX
- **Generous Spacing**: Breathing room for visual clarity
- **Monochrome Palette**: Simple black, white, and gray with blue accents
- **Responsive Layout**: Adapts to any screen size

## Build for Production

```cmd
npm run build
npm start
```

## License

MIT
