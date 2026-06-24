@echo off
title NEW LOOK Beauty Parlour - Setup & Launch
echo ===================================================
echo   NEW LOOK BEAUTY PARLOUR - PRESTIGE WEB APP SETUP
echo ===================================================
echo.

:: Check Node.js installation
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/ before running this script.
    echo.
    pause
    exit /b 1
)

echo [1/3] Copying premium image assets to public directory...
if not exist public mkdir public
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\premium_spa_hero_*.png" "%~dp0public\premium_spa_hero.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_facial_*.png" "%~dp0public\service_facial.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_hair_*.png" "%~dp0public\service_hair.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_makeup_*.png" "%~dp0public\service_makeup.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_eyelash_*.png" "%~dp0public\service_eyelash.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_balayage_*.png" "%~dp0public\service_balayage.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_keratin_*.png" "%~dp0public\service_keratin.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_hydrafacial_*.png" "%~dp0public\service_hydrafacial.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_lift_facial_*.png" "%~dp0public\service_lift_facial.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_gold_facial_*.png" "%~dp0public\service_gold_facial.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_bridal_makeup_*.png" "%~dp0public\service_bridal_makeup.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_bridal_hair_*.png" "%~dp0public\service_bridal_hair.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_bridal_spa_*.png" "%~dp0public\service_bridal_spa.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\0b83d3f9-0d42-4fd2-8f18-238bae16c9b9\gallery_traditional_bride_1782300488912.png" "%~dp0public\gallery_traditional_bride.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\0b83d3f9-0d42-4fd2-8f18-238bae16c9b9\bridal_glow_spa_1782301040651.png" "%~dp0public\service_pre_bridal_glow.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_bridal_companion_*.png" "%~dp0public\service_bridal_companion.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_glamour_makeup_*.png" "%~dp0public\service_glamour_makeup.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_airbrush_*.png" "%~dp0public\service_airbrush.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\4f2052f4-ef77-4b7e-8ab8-9fc536328b17\luxury_parlour_bg_*.png" "%~dp0public\luxury_parlour_bg.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\4f2052f4-ef77-4b7e-8ab8-9fc536328b17\stylist_samantha_*.png" "%~dp0public\stylist_samantha.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\4f2052f4-ef77-4b7e-8ab8-9fc536328b17\stylist_victoria_*.png" "%~dp0public\stylist_victoria.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\4f2052f4-ef77-4b7e-8ab8-9fc536328b17\stylist_marcus_*.png" "%~dp0public\stylist_marcus.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\4f2052f4-ef77-4b7e-8ab8-9fc536328b17\gallery_hair_*.png" "%~dp0public\gallery_hair.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\4f2052f4-ef77-4b7e-8ab8-9fc536328b17\gallery_makeup_*.png" "%~dp0public\gallery_makeup.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\4f2052f4-ef77-4b7e-8ab8-9fc536328b17\gallery_bridal_*.png" "%~dp0public\gallery_bridal.png" >nul 2>nul
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\4f2052f4-ef77-4b7e-8ab8-9fc536328b17\gallery_nails_*.png" "%~dp0public\gallery_nails.png" >nul 2>nul
echo Assets copied successfully.
echo.

echo [2/3] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Dependency installation failed.
    echo Please check the error above and try running "npm install" manually.
    echo.
    pause
    exit /b 1
)

echo.
echo [3/3] Launching Vite development server...
echo.
echo The app will open shortly in your default web browser.
echo Press Ctrl+C in this window to stop the server.
echo.
call npm run dev
pause
