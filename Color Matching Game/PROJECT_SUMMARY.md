# Color Matching Game - Project Summary

## What We Built

A minimalist color matching game built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. The game challenges players to identify matching colors from a set of similar options, testing their color perception skills.

## Key Features

### 🎨 Minimalist Design
- Clean, typography-focused interface
- Monochrome color scheme (black, white, grays)
- Subtle borders and generous white space
- System font stack for native feel
- Dark mode support built-in

### 🎮 Game Mechanics
- **Random Color Generation**: Creates RGB colors and converts to hex
- **Similar Decoys**: Generates 3 similar colors (±30 RGB variance)
- **Instant Feedback**: Shows "Correct! 🎯" or "Try again"
- **Auto-Progression**: Moves to next round after correct answer
- **Shuffled Options**: Randomizes color positions each round

### 📊 Statistics Tracking
- **Score**: Number of correct matches
- **Attempts**: Total selections made
- **Accuracy**: Percentage calculated as (Score / Attempts) × 100

### 💻 Technical Implementation
- **Client-side rendering** with 'use client' directive
- **React Hooks** for state management (useState, useEffect)
- **TypeScript interfaces** for type safety
- **Tailwind CSS** for styling with custom CSS variables
- **Responsive design** that works on all screen sizes

## Project Structure

```
Color Matching Game/
│
├── app/
│   ├── globals.css          # Design system & CSS variables
│   ├── layout.tsx           # SEO metadata & root layout
│   └── page.tsx             # Main entry point
│
├── components/
│   └── ColorMatchingGame.tsx # Core game logic (200+ lines)
│
├── Configuration Files:
│   ├── package.json         # Next.js, React, TypeScript deps
│   ├── tsconfig.json        # TypeScript compiler options
│   ├── tailwind.config.js   # Tailwind CSS setup
│   ├── postcss.config.js    # PostCSS plugins
│   └── next.config.js       # Next.js configuration
│
└── Helper Scripts:
    ├── install.bat          # Dependency installation
    ├── start.bat            # Development server
    └── .gitignore          # Git ignore patterns
```

## How to Run

### Step 1: Install Dependencies
Open PowerShell **as Administrator** and run:
```bash
cd "c:\[01] ATP\[02] Project Git\ATP-100Days-100Applications\Color Matching Game"
npm install
```

Or double-click `install.bat` (run as administrator)

### Step 2: Start Development Server
```bash
npm run dev
```

Or double-click `start.bat`

### Step 3: Open Browser
Navigate to: **http://localhost:3000**

## Game Flow

1. **Start Screen**
   - Title and description
   - "Start Game" button
   - Game instructions table

2. **Game Screen**
   - Stats display (Score, Attempts, Accuracy)
   - Large target color block with hex code
   - 2×2 grid of color options
   - Hover to reveal hex codes
   - Click to make selection

3. **Feedback**
   - "Correct! 🎯" → Auto-advance to next round (1s delay)
   - "Try again" → Stay on current round (1s delay)

4. **Reset**
   - Click "Reset" button to return to start screen
   - Clears all scores and statistics

## Design Philosophy

### Minimalism Principles Applied:
✓ **Content-first**: Game mechanics are clear and unobstructed  
✓ **Typography**: Uses system fonts, proper hierarchy  
✓ **White space**: Generous padding and margins  
✓ **Subtle interactions**: Hover effects, smooth transitions  
✓ **No clutter**: Only essential UI elements  
✓ **Monochrome**: Black and white palette (except game colors)  

### UX Considerations:
- Large click targets for color options
- Immediate visual feedback on selection
- Hex codes displayed for learning
- Clear stat tracking for gamification
- Easy reset to start over

## Technical Highlights

### Color Generation Algorithm
```typescript
// Generates random RGB color
const r = Math.floor(Math.random() * 256)
const g = Math.floor(Math.random() * 256)
const b = Math.floor(Math.random() * 256)
const hex = `#${r.toString(16).padStart(2, '0')}...`

// Creates similar color with ±30 variance
const variance = 30
const r = baseColor.r + Math.floor(Math.random() * 60 - 30)
```

### State Management
- `targetColor`: The color to match
- `options`: Array of 4 colors (1 target + 3 decoys)
- `score`, `attempts`: Tracking statistics
- `feedback`: Success/error messages
- `gameStarted`: Screen toggle

### Responsive Grid
- Uses CSS Grid with `grid-cols-2` and `grid-cols-3`
- Aspect-square color swatches
- Flexbox for centering and spacing

## Customization Options

### Adjust Difficulty
**Easy Mode**: Increase variance to 50-60
```typescript
const variance = 50  // Line 28 in ColorMatchingGame.tsx
```

**Hard Mode**: Decrease variance to 15-20
```typescript
const variance = 15  // More similar colors
```

### Change Number of Options
```typescript
// Line 34 - Change from 3 to desired number
const decoys = Array.from({ length: 5 }, () => ...)  // 6 total options
```

### Modify Design
Edit `app/globals.css` to change:
- `--background`, `--foreground`: Main colors
- `--muted`: Secondary background
- `--border`: Border colors
- `--accent`: Accent color

## Browser Compatibility

✅ Chrome/Edge (Chromium)  
✅ Firefox  
✅ Safari  
✅ Mobile browsers  

Requires modern browser with ES6+ support.

## Performance

- Client-side rendering for instant interactions
- No external API calls
- Lightweight bundle size
- Fast color calculations
- Smooth transitions (200ms)

## Future Enhancements (Optional)

- [ ] Difficulty levels (Easy/Medium/Hard)
- [ ] Timer mode (speed challenge)
- [ ] High score persistence (localStorage)
- [ ] Sound effects toggle
- [ ] Color blindness modes
- [ ] Progressive difficulty
- [ ] Share results on social media
- [ ] Daily challenges

## Troubleshooting

**Issue**: npm install fails  
**Solution**: Run PowerShell as Administrator, try `npm cache clean --force`

**Issue**: Port 3000 in use  
**Solution**: `npm run dev -- -p 3001`

**Issue**: Module not found  
**Solution**: Ensure `npm install` completed successfully

**Issue**: Styles not loading  
**Solution**: Check Tailwind CSS is installed, restart dev server

## Credits

Built with:
- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 3.4

Design inspired by minimalist web aesthetics.

---

**Ready to play?** Run `npm install` then `npm run dev`! 🎨
