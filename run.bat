@echo off
echo =======================================================
echo Starting Smart Health Insurance System...
echo =======================================================
echo Checking if Node.js is installed...
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed! Please install Node.js from https://nodejs.org/
    pause
    exit /b
)

cd Smart-Health-Insurance-System
echo Starting Development Server...
echo Wait a few seconds, the browser will open automatically or you can click the link.
call npm run dev
pause
