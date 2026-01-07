# Quick Start Instructions

## There's a permission issue with npm. Please try one of these methods:

### Method 1: Run as Administrator (Recommended)
1. Open PowerShell as Administrator (Right-click → Run as Administrator)
2. Navigate to this directory:
   ```
   cd "c:\[01] ATP\[02] Project Git\ATP-100Days-100Applications\Math Quiz Rush"
   ```
3. Run:
   ```
   npm install
   npm run dev
   ```

### Method 2: Use Yarn
```bash
npm install -g yarn
yarn install
yarn dev
```

### Method 3: Clear npm cache and retry
```bash
npm cache clean --force
npm install --legacy-peer-deps
npm run dev
```

### Method 4: Install Bun (fastest option)
```bash
# Install Bun
powershell -c "irm bun.sh/install.ps1|iex"

# Then install and run
bun install
bun dev
```

Once installed, the app will be available at **http://localhost:3000**
