# Stopwatch Application

A modern, feature-rich stopwatch application built with Next.js, featuring lap tracking, fastest/slowest lap detection, and a stunning glassmorphism design.

## Features

- ⏱️ **Precision Timing**: Accurate timing down to 10 milliseconds
- 🏁 **Lap Tracking**: Record multiple laps with individual and cumulative times
- 🏆 **Performance Analysis**: Automatically highlights fastest and slowest laps
- 🎨 **Modern Design**: Beautiful glassmorphism UI with gradient effects and smooth animations
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Real-time Updates**: Live time display with smooth animations

## Installation

Due to permission issues, you may need to run the installation with administrator privileges:

### Option 1: Run PowerShell as Administrator

1. Right-click on PowerShell and select "Run as Administrator"
2. Navigate to the project directory:
   ```powershell
   cd "c:\[01] ATP\[02] Project Git\ATP-100Days-100Applications\Stopwatch"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Option 2: Use a Different Terminal

1. Try using Command Prompt (cmd) as Administrator
2. Navigate to the project directory
3. Run:
   ```bash
   npm install
   ```

### Option 3: Manual Installation

If you continue to have permission issues, try:

```bash
npm install --legacy-peer-deps
```

or

```bash
npm install --force
```

## Running the Application

Once dependencies are installed, start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Start/Pause**: Click the green "Start" button to begin timing. Click "Pause" to stop.
2. **Lap**: While the stopwatch is running, click "Lap" to record a lap time.
3. **Reset**: Click "Reset" to clear all times and start over.

### Lap Features

- Each lap shows both the lap time and total elapsed time
- The fastest lap is highlighted in green with a star badge
- The slowest lap is highlighted in red with a badge
- Laps are displayed in reverse chronological order (newest first)

## Technology Stack

- **Next.js 15**: React framework for production
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **CSS Modules**: Scoped styling with modern CSS features

## Design Highlights

- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Gradient Backgrounds**: Dynamic color gradients throughout
- **Smooth Animations**: Fade-in, slide-in, pulse, and glow effects
- **Custom Scrollbar**: Styled scrollbar matching the theme
- **Responsive Layout**: Mobile-first design approach

## Project Structure

```
Stopwatch/
├── app/
│   ├── globals.css          # Global styles and design system
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main page
├── components/
│   ├── Stopwatch.tsx         # Main stopwatch component
│   └── Stopwatch.module.css  # Component-specific styles
├── package.json
├── tsconfig.json
└── next.config.js
```

## Troubleshooting

### Permission Errors

If you encounter EPERM errors during installation:

1. Close any applications that might be locking files (VS Code, file explorers, etc.)
2. Run your terminal as Administrator
3. Try clearing npm cache: `npm cache clean --force`
4. Disable antivirus temporarily during installation
5. Check if the directory is in a cloud-synced folder (OneDrive, Dropbox) and try moving it

### Build Errors

If you encounter build errors:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Try `npm run build` to check for any issues

## License

MIT License - feel free to use this project for learning and development!

## Author

Created as part of the ATP 100 Days 100 Applications challenge.
