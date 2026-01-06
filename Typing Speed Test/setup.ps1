# Typing Speed Test - Setup Script
# Run this script as Administrator to install dependencies

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Typing Speed Test - Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "⚠️  WARNING: Not running as Administrator" -ForegroundColor Yellow
    Write-Host "Please run PowerShell as Administrator for best results" -ForegroundColor Yellow
    Write-Host ""
}

# Navigate to script directory
Set-Location $PSScriptRoot

Write-Host "📦 Installing dependencies..." -ForegroundColor Green
Write-Host ""

# Try npm install with different flags
$commands = @(
    "npm install",
    "npm install --legacy-peer-deps",
    "npm install --force",
    "npm ci"
)

$success = $false
foreach ($cmd in $commands) {
    Write-Host "Trying: $cmd" -ForegroundColor Cyan
    try {
        Invoke-Expression $cmd
        if ($LASTEXITCODE -eq 0) {
            $success = $true
            break
        }
    } catch {
        Write-Host "  Failed: $_" -ForegroundColor Red
    }
}

if ($success) {
    Write-Host ""
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "To start the development server, run:" -ForegroundColor Cyan
    Write-Host "  npm run dev" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Then open http://localhost:3000 in your browser" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Installation failed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please try the following:" -ForegroundColor Yellow
    Write-Host "1. Run PowerShell as Administrator" -ForegroundColor White
    Write-Host "2. Clear npm cache: npm cache clean --force" -ForegroundColor White
    Write-Host "3. Delete node_modules folder if it exists" -ForegroundColor White
    Write-Host "4. Try again: npm install" -ForegroundColor White
    Write-Host ""
    Write-Host "If the issue persists, check the npm debug log for details" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
