# ⚡ Reaction Time Test

A brutalist minimalist reaction time tester built with Next.js and TypeScript. Test your reflexes and track your performance.

## ✨ Features

- **Brutalist raw design** with sharp borders, monospace typography, and bold color states
- **Accurate timing** - measures reaction time in milliseconds
- **Performance tracking** - tracks attempts, best time, and average
- **Smart rating system** - rates your performance from EXCEPTIONAL to SLOW
- **Attempt history** - view your last 10 attempts
- **False start detection** - penalizes clicking too early
- **Responsive** - works on all screen sizes

## 🎯 How to Use

1. Click anywhere to start the test
2. The screen turns **RED** - wait patiently
3. When it turns **GREEN** - click as fast as possible!
4. Your reaction time appears in milliseconds
5. Try to beat your best time!

## 📊 Rating System

- **< 200ms** - EXCEPTIONAL (Elite reflexes)
- **200-250ms** - EXCELLENT (Well above average)
- **250-300ms** - GOOD (Above average)
- **300-350ms** - AVERAGE (Normal human reaction)
- **> 350ms** - SLOW (Below average)

Average human reaction time: ~250ms

## 📦 Installation

```bash
npm install
```

## 🚀 Running the App

Development mode:
```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:
```bash
npm run build
npm start
```

## 🎨 Design Philosophy

This reaction time test embraces a brutalist minimalist aesthetic:

- **Raw Typography** - JetBrains Mono for precision, Hanken Grotesk for clarity
- **Bold Color States** - Red (wait), Green (go), Yellow (too early), Blue (result)
- **Sharp Borders** - Heavy black borders throughout
- **Monospace Data Display** - Numbers and stats in monospace for technical feel
- **No Decoration** - Pure function, zero ornamentation
- **Crosshair Cursor** - Precision targeting on interactive area

The design prioritizes clarity, speed, and raw functionality.

## 🎮 Features Breakdown

### Main Test Area
- Full-screen clickable zone
- Color-coded states for instant recognition
- Large, clear instructions
- Millisecond-precise timing

### Statistics Dashboard
- **Attempts** - Total number of tests taken
- **Best Time** - Your fastest reaction time
- **Average** - Your mean reaction time across all attempts

### Attempt History
- Shows last 10 attempts in reverse chronological order
- Highlights your best time with inverted colors
- Quick visual reference of recent performance

### Safety Features
- Prevents clicking too early (false starts)
- Random delay (2-5 seconds) prevents pattern memorization
- Clear feedback for all states

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety for precise timing logic
- **Tailwind CSS** - Utility-first styling
- **Custom Fonts** - JetBrains Mono, Hanken Grotesk

## 🧪 Testing Your Reflexes

Factors that affect reaction time:
- Age (peaks in 20s)
- Alertness and focus
- Practice and familiarity
- Physical fitness
- Caffeine intake
- Time of day

Challenge yourself to improve your best time! ⚡

## 🏆 Pro Tips

1. **Stay focused** - eliminate distractions
2. **Don't anticipate** - wait for the green, don't guess
3. **Stay relaxed** - tension slows you down
4. **Warm up** - first few attempts are usually slower
5. **Find your rhythm** - take multiple tests for accurate average

Good luck beating your best time! 🎯
