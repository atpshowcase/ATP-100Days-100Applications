@echo off
echo ===========================================
echo      Stopwatch App - User Setup Script
echo ===========================================
echo.
echo [1/3] Fixing directory permissions...
icacls "%~dp0." /grant Users:F /t
if %errorlevel% neq 0 (
    echo [!] Warning: Failed to update permissions. You might need to run this script as Administrator.
)

echo.
echo [2/3] Installing dependencies...
call npm install --force
if %errorlevel% neq 0 (
    echo [!] Error: npm install failed. Please check the error messages above.
    pause
    exit /b %errorlevel%
)

echo.
echo [3/3] Starting development server...
echo     - The app will likely be available at: http://localhost:3000
echo.
call npm run dev
pause
