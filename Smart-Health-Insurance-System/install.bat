@echo off
echo =======================================================
echo Smart Health Insurance System - Installation
echo =======================================================
echo Checking if Node.js is installed...
node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed! Please install Node.js from https://nodejs.org/
    pause
    exit /b
)

echo Node.js is installed. Installing dependencies...
cd Smart-Health-Insurance-System
call npm install
echo.
echo =======================================================
echo Installation Complete! You can now run "run.bat"
echo =======================================================
pause
