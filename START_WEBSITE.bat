@echo off
title Store & Admin Local Server Launcher
color 0b
cls

echo ======================================================
echo          LUXURY STORE - LOCAL SERVER LAUNCHER
echo ======================================================
echo.
echo [1/3] Checking environment...
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js / npm is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [2/3] Preparing to launch Front-End and Admin Back-End...
echo.
echo   * Front-End Store: http://localhost:3000
echo   * Back-End Admin:  http://localhost:3000/admin
echo.

:: Launch browser tabs after a brief delay so Next.js starts up
start "" cmd /c "timeout /t 4 /nobreak >nul & start http://localhost:3000 & timeout /t 1 /nobreak >nul & start http://localhost:3000/admin"

echo [3/3] Starting local server...
echo ------------------------------------------------------
echo (Keep this window open. Press Ctrl+C anytime to stop)
echo ------------------------------------------------------
echo.

npm run dev

pause
