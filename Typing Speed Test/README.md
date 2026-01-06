# Typing Speed Test

A minimalist typing speed test application built with Next.js and React.

## Features

- ✨ Clean, minimalist design
- ⚡ Real-time WPM (Words Per Minute) calculation
- 🎯 Accuracy tracking
- 📊 Error counting
- 🎨 Visual feedback for correct/incorrect characters
- 🔄 Multiple sample texts
- 📱 Responsive design
- 🎉 Results modal with detailed stats

## Installation

⚠️ **IMPORTANT**: There is a permission issue with npm on your system. Please follow these steps carefully:

### 🔧 Quick Fix - Recommended

**Option 1: Use Command Prompt as Administrator**
1. Press `Win + X` and select "Command Prompt (Admin)" or "Terminal (Admin)"
2. Navigate to the project directory:
   ```bash
   cd "c:\[01] ATP\[02] Project Git\ATP-100Days-100Applications\Typing Speed Test"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

**Option 2: Use the Setup Script**
1. Right-click on `setup.bat` in the project folder
2. Select "Run as administrator"
3. Wait for the installation to complete

**Option 3: Fix npm Permissions**
1. Open PowerShell/Command Prompt as Administrator
2. Run these commands:
   ```bash
   npm cache clean --force
   npm config set strict-ssl false
   cd "c:\[01] ATP\[02] Project Git\ATP-100Days-100Applications\Typing Speed Test"
   npm install --legacy-peer-deps
   ```

**Option 4: Use VSCode Terminal**
1. Open the project folder in Visual Studio Code
2. Open a new terminal (Terminal → New Terminal)
3. Run: `npm install`
4. If that fails, try: `npm install --legacy-peer-deps`

### 🐛 If Installation Still Fails

1. **Check Antivirus**: Temporarily disable your antivirus software
2. **Check Node Version**: Run `node --version` (should be v18 or higher)
3. **Clean Install**:
   ```bash
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```
4. **Use Different Directory**: Try moving the project to a simpler path like `C:\projects\typing-test`

## Running the Application

Once dependencies are installed, run:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. Click on the text area to focus
2. Start typing the displayed text
3. Your WPM, accuracy, and errors will update in real-time
4. Complete the text to see your final results
5. Click "Try Again" or "Reset" to start a new test

## Technology Stack

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

## Project Structure

```
typing-speed-test/
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   └── TypingTest.tsx    # Main typing test component
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## Features Explained

### WPM Calculation
Words Per Minute is calculated using the formula:
```
WPM = (Total Words Typed / Time in Minutes)
```

### Accuracy Tracking
Accuracy percentage is calculated as:
```
Accuracy = ((Correct Characters / Total Characters Typed) × 100)
```

### Visual Feedback
- **Green highlight**: Correct character
- **Red highlight**: Incorrect character
- **Gray**: Not yet typed

## Customization

You can customize the application by:

1. **Adding more sample texts**: Edit the `SAMPLE_TEXTS` array in `components/TypingTest.tsx`
2. **Changing colors**: Modify the CSS variables in `app/globals.css`
3. **Adjusting difficulty**: Add longer or more complex texts

## License

MIT
