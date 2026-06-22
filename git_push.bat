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
git add src/components/Gallery.jsx src/index.css
echo.
echo Committing changes...
git commit -m "Update gallery layout to vertical portrait swipe view"
echo.
echo Pushing to remote repository...
git push
echo.
echo ==============================================
echo   SYNC COMPLETED SUCCESSFULLY
echo ==============================================
pause
