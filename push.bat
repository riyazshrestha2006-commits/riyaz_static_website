@echo off
title Portfolio Deployer
echo ===================================================
echo   PORTFOLIO WEBSITE GIT DEPLOYER
echo ===================================================
echo.
echo Deleting old conflicting cached credentials...
cmdkey /delete:git:https://github.com >nul 2>&1
echo.
echo Starting Git Push...
echo A GitHub Login popup window will open on your screen.
echo Please click "Sign in with your browser" and authorize.
echo.
git push -u origin main
echo.
echo ===================================================
echo   DONE! Your code is pushed to GitHub.
echo ===================================================
pause
