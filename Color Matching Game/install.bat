@echo off
echo Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo Installation failed. Trying with --legacy-peer-deps...
    npm install --legacy-peer-deps
)
pause
