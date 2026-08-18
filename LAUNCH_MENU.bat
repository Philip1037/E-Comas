@echo off
title Store & Admin Manager
color 0a
:menu
cls
echo ======================================================
echo           LUXURY STORE - QUICK LAUNCHER
echo ======================================================
echo.
echo  [1] Start Server & Open BOTH Front-End + Admin Back-End
echo  [2] Start Server & Open FRONT-END Store only (localhost:3000)
echo  [3] Start Server & Open BACK-END Admin only (localhost:3000/admin)
echo  [4] Install / Update Dependencies (npm install)
echo  [5] Exit
echo.
echo ======================================================
set /p choice="Select an option (1-5): "

if "%choice%"=="1" goto launch_both
if "%choice%"=="2" goto launch_front
if "%choice%"=="3" goto launch_admin
if "%choice%"=="4" goto install_deps
if "%choice%"=="5" exit /b 0

echo Invalid choice. Try again.
timeout /t 2 >nul
goto menu

:launch_both
cls
echo Starting Server and opening Front-End + Admin...
start "" cmd /c "timeout /t 4 /nobreak >nul & start http://localhost:3000 & timeout /t 1 /nobreak >nul & start http://localhost:3000/admin"
npm run dev
pause
goto menu

:launch_front
cls
echo Starting Server and opening Front-End Store...
start "" cmd /c "timeout /t 4 /nobreak >nul & start http://localhost:3000"
npm run dev
pause
goto menu

:launch_admin
cls
echo Starting Server and opening Back-End Admin...
start "" cmd /c "timeout /t 4 /nobreak >nul & start http://localhost:3000/admin"
npm run dev
pause
goto menu

:install_deps
cls
echo Installing dependencies...
npm install
echo Done.
pause
goto menu
