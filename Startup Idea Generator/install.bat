@echo off
echo Installing dependencies for Startup Idea Generator...
echo.
echo If you encounter permission errors, please run this script as Administrator
echo.
cd /d "%~dp0"
npm install
if %errorlevel% neq 0 (
    echo.
    echo Installation failed. Trying alternative method...
    echo.
    npm install --legacy-peer-deps
)
echo.
echo Installation complete!
pause
