@echo off
echo =======================================================
echo Smart Health Insurance System - Portable Runner
echo =======================================================
echo This script will try to run the compiled production build
echo locally without needing a full Vite development server.
echo.

:: Try Node.js first
node -v >nul 2>&1
IF %ERRORLEVEL% EQU 0 (
    echo [Node.js Detected] Starting local server via npx...
    echo The app will be running at http://localhost:3000
    cd Smart-Health-Insurance-System
    call npx serve -s dist
    pause
    exit /b
)

:: Try Python if Node is not available
python --version >nul 2>&1
IF %ERRORLEVEL% EQU 0 (
    echo [Python Detected] Node.js is missing, but Python is available!
    echo Starting local Python web server...
    echo Please open your browser and go to http://localhost:8000
    cd Smart-Health-Insurance-System\dist
    python -m http.server 8000
    pause
    exit /b
)

:: If neither is installed
echo.
echo [ERROR] Neither Node.js nor Python is installed on this PC!
echo You cannot run a local web server without one of them.
echo.
echo PORTABLE SOLUTION:
echo Just open the "dist\index.html" file directly in your Chrome browser!
echo It might not work perfectly due to browser security policies for local files,
echo but it's the only option left.
echo.
pause
