# 🎨 Color Matching Game - Quick Reference

## 🚀 Getting Started (3 Steps)

### 1️⃣ Install Dependencies
```powershell
# Open PowerShell as Administrator, then:
cd "c:\[01] ATP\[02] Project Git\ATP-100Days-100Applications\Color Matching Game"
npm install
```

### 2️⃣ Start Dev Server
```powershell
npm run dev
```

### 3️⃣ Open Browser
Navigate to: **http://localhost:3000**

---

## 📂 Key Files to Edit

### Want to change the game logic?
📝 `components/ColorMatchingGame.tsx`

### Want to adjust colors/fonts?
🎨 `app/globals.css`

### Want to modify styles?
💅 Use Tailwind CSS classes in components

---

## ⚙️ Common Customizations

### Change Difficulty
**File**: `components/ColorMatchingGame.tsx` (Line 28)

```typescript
// EASY (big color difference)
const variance = 60

// MEDIUM (current)
const variance = 30

// HARD (subtle difference)
const variance = 15
```

### Change Number of Options
**File**: `components/ColorMatchingGame.tsx` (Line 38)

```typescript
// 6 total options (1 target + 5 decoys)
const decoys = Array.from({ length: 5 }, () => generateSimilarColor(target))

// 9 total options (1 target + 8 decoys)
const decoys = Array.from({ length: 8 }, () => generateSimilarColor(target))
```

### Modify Design Colors
**File**: `app/globals.css` (Lines 5-10)

```css
:root {
  --background: #ffffff;    /* Page background */
  --foreground: #0a0a0a;    /* Text color */
  --muted: #f5f5f5;         /* Secondary bg */
  --border: #e5e5e5;        /* Border color */
  --accent: #0a0a0a;        /* Accent color */
}
```

### Change Target Color Size
**File**: `components/ColorMatchingGame.tsx` (Line 155)

```typescript
// Small
className="w-full h-32 border border-gray-200"

// Large (current)
className="w-full h-48 border border-gray-200"

// Extra Large
className="w-full h-64 border border-gray-200"
```

### Customize Sound Effects
**File**: `components/ColorMatchingGame.tsx`

**Correct Sound** (Lines 23-37):
```typescript
// Change frequencies (Hz) for different tones
oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1) // E5
oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2) // G5

// Change volume (0.0 to 1.0)
gainNode.gain.setValueAtTime(0.3, audioContext.currentTime) // Louder
```

**Incorrect Sound** (Lines 50-64):
```typescript
// Change frequencies for different tones
oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.1)

// Change volume
gainNode.gain.setValueAtTime(0.2, audioContext.currentTime) // Softer
```

### Toggle Sound Default State
**File**: `components/ColorMatchingGame.tsx` (Line 18)

```typescript
// Sound ON by default (current)
const [soundEnabled, setSoundEnabled] = useState(true)

// Sound OFF by default
const [soundEnabled, setSoundEnabled] = useState(false)
```

---

## 🎮 Game Flow

```
Start Screen → Click "Start Game"
     ↓
Game Screen (shows target + 4 options)
     ↓
Click a Color Option
     ↓
  ┌─────────────┬──────────────┐
  │   Correct   │  Incorrect   │
  │   +1 Score  │  Try Again   │
  │   New Round │  Same Round  │
  └─────────────┴──────────────┘
     ↓
Continue playing or click "Reset"
```

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| **npm install fails** | Run PowerShell as Admin, try `npm cache clean --force` |
| **Port 3000 in use** | Use `npm run dev -- -p 3001` |
| **Styles not showing** | Restart dev server (Ctrl+C, then `npm run dev`) |
| **TypeScript errors** | Run `npm install` to ensure types are installed |
| **Module not found** | Check import paths use `@/` prefix |

---

## 📊 Game Mechanics

### Color Generation
- **Target**: Random RGB (0-255 for each channel)
- **Decoys**: Target ± random(-30 to +30) per channel
- **Hex conversion**: `#RRGGBB` format

### Scoring
- **Score**: Correct matches
- **Attempts**: Total clicks
- **Accuracy**: `(Score / Attempts) × 100%`

### Feedback
- ✅ **"Correct! 🎯"** → Auto-advance after 1 second
- ❌ **"Try again"** → Clear after 1 second

---

## 📝 Project Commands

```powershell
# Development
npm run dev          # Start dev server (port 3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Utilities
npm run lint         # Run ESLint
npm cache clean --force  # Clear npm cache
```

---

## 🎨 Design Principles

✓ **Minimalist** - Clean, uncluttered interface  
✓ **Typography-focused** - System fonts, hierarchy  
✓ **Monochrome** - Black, white, grays only  
✓ **Responsive** - Works on all screen sizes  
✓ **Accessible** - High contrast, clear labels  
✓ **Fast** - Client-side only, instant feedback  

---

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Runtime**: React 18
- **Font**: System font stack

---

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hooks Guide](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 📄 Documentation Files

- **README.md** - Overview & features
- **SETUP.md** - Installation guide
- **PROJECT_SUMMARY.md** - Technical details
- **FILE_TREE.md** - Project structure
- **QUICK_REFERENCE.md** - This file! ⭐

---

**Need help?** Check the documentation files or review the code comments!

**Ready to play?** Run `npm install` → `npm run dev` → Open browser! 🎯
