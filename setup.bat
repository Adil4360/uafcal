@echo off
echo ====================================
echo UAF CGPA Calculator - Setup Script
echo ====================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed.
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js detected: 
node --version
echo.

:: Install dependencies
echo [INFO] Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [OK] Dependencies installed successfully!
echo.

:: Create .env.local if it doesn't exist
if not exist .env.local (
    echo [INFO] Creating .env.local file...
    copy .env.example .env.local >nul
    echo [OK] .env.local created
) else (
    echo [INFO] .env.local already exists
)

echo.
echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo You can now run the application:
echo.
echo   npm run dev     - Start development server
echo   npm run build   - Build for production
echo   npm start       - Start production server
echo.
echo The app will be available at http://localhost:3000
echo.
echo Made by Adil
echo.
pause
