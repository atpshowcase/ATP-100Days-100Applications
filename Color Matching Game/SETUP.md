# Color Matching Game - Setup Guide

## Project Overview
A minimalist color matching game built with Next.js and TypeScript. Test your color perception by matching target colors from similar options.

## Installation Instructions

### Method 1: Using npm (Recommended)
1. Open PowerShell or Command Prompt **as Administrator**
2. Navigate to the project directory:
   ```
   cd "c:\[01] ATP\[02] Project Git\ATP-100Days-100Applications\Color Matching Game"
   ```
3. Install dependencies:
   ```
   npm install
   ```

### Method 2: Using the batch file
1. Right-click on `install.bat` in the project folder
2. Select "Run as administrator"

### Method 3: Manual installation (if permissions issues persist)
If you encounter EPERM errors, try these steps:
1. Close any running Node processes
2. Delete the `package-lock.json` file (if it exists)
3. Run: `npm cache clean --force`
4. Run: `npm install --legacy-peer-deps`

## Running the Application

Once dependencies are installed:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

✨ **Minimalist Design**
- Clean, distraction-free interface
- Monochrome color scheme
- Subtle borders and spacing
- Responsive layout

🎮 **Game Mechanics**
- Random color generation
- Similar decoy colors with slight variations
- Instant feedback on selections
- Score and accuracy tracking

📊 **Statistics**
- Score counter
- Total attempts
- Accuracy percentage

🎨 **User Experience**
- Smooth transitions
- Hover effects on color options
- Hex code display
- Clear visual feedback

## Project Structure

```
Color Matching Game/
├── app/
│   ├── globals.css          # Global styles with minimalist design system
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page
├── components/
│   └── ColorMatchingGame.tsx # Game logic and UI
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS setup
└── next.config.js           # Next.js configuration
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Hooks** - State management

## Troubleshooting

### npm install fails with EPERM error
- Run PowerShell/CMD as Administrator
- Close all Node.js processes
- Try: `npm cache clean --force`
- Use: `npm install --legacy-peer-deps`

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Module not found errors
Make sure all dependencies are installed:
```bash
npm install
```

## How to Play

1. Click **"Start Game"** to begin
2. Study the **target color** displayed at the top
3. Select the matching color from the **four options** below
4. Receive instant feedback
5. Track your score and accuracy
6. Click **"Reset"** to start over

## Game Strategy

- Study the target color carefully before selecting
- Pay attention to subtle differences in hue, saturation, and brightness
- The decoy colors are within ±30 RGB units of the target
- Accuracy is calculated as: (Correct / Total Attempts) × 100

## Customization

### Difficulty Levels
Edit `components/ColorMatchingGame.tsx`:
- Easy: Increase `variance` to 50-60 (line 28)
- Hard: Decrease `variance` to 15-20 (line 28)

### Number of Options
Change `Array.from({ length: 3 })` to adjust decoy count (line 34)

### Color Display Size
Modify `h-48` in target color div (line 147) for different heights

## Building for Production

```bash
npm run build
npm start
```

## License

This project is open source and available for educational purposes.
