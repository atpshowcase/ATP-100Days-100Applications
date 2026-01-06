@echo off
echo ==================================
echo Typing Speed Test - Setup
echo ==================================
echo.

echo Installing dependencies...
echo.

npm install

if %errorlevel% neq 0 (
    echo.
    echo Installation failed. Trying alternative method...
    echo.
    npm install --legacy-peer-deps
)

if %errorlevel% equ 0 (
    echo.
    echo ======================================
    echo Dependencies installed successfully!
    echo ======================================
    echo.
    echo To start the development server, run:
    echo   npm run dev
    echo.
    echo Then open http://localhost:3000 in your browser
    echo.
) else (
    echo.
    echo ======================================
    echo Installation failed
    echo ======================================
    echo.
    echo Please try:
    echo 1. Run Command Prompt as Administrator
    echo 2. Clear npm cache: npm cache clean --force
    echo 3. Try again: npm install
    echo.
)

pause
