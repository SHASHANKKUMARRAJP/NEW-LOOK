@echo off
title NEW LOOK - Sync to GitHub
echo ==============================================
echo   NEW LOOK BEAUTY PARLOUR - SYNCING TO GITHUB
echo ==============================================
echo.
echo Checking Git status...
git status
echo.
echo Adding changes...
git add .
echo.
echo Committing changes...
git commit -m "Add lunch hour inputs and display to the weekly schedule component"
echo.
echo Pushing to remote repository...
git push
echo.
echo ==============================================
echo   SYNC COMPLETED SUCCESSFULLY
echo ==============================================
pause
