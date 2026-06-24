@echo off
title Copy Spa & Service Assets
echo Copying assets to public directory...
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\premium_spa_hero_1782209312276.png" "%~dp0public\premium_spa_hero.png"
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_facial_1782209930285.png" "%~dp0public\service_facial.png"
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_hair_1782209948527.png" "%~dp0public\service_hair.png"
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_makeup_1782209969376.png" "%~dp0public\service_makeup.png"
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\f1460816-ac8a-453c-a6d9-621245bc1adf\service_eyelash_1782209984590.png" "%~dp0public\service_eyelash.png"
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\4f2052f4-ef77-4b7e-8ab8-9fc536328b17\gallery_bridal_1782019863116.png" "%~dp0public\gallery_bridal.png"
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\4f2052f4-ef77-4b7e-8ab8-9fc536328b17\gallery_makeup_1782019849512.png" "%~dp0public\gallery_makeup.png"
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\4f2052f4-ef77-4b7e-8ab8-9fc536328b17\gallery_nails_1782019877566.png" "%~dp0public\gallery_nails.png"
copy "C:\Users\sshas\.gemini\antigravity-ide\brain\0b83d3f9-0d42-4fd2-8f18-238bae16c9b9\gallery_traditional_bride_1782300488912.png" "%~dp0public\gallery_traditional_bride.png"
echo.
echo Checking copied files...
if exist "%~dp0public\premium_spa_hero.png" echo [SUCCESS] premium_spa_hero.png copied!
if exist "%~dp0public\service_facial.png" echo [SUCCESS] service_facial.png copied!
if exist "%~dp0public\service_hair.png" echo [SUCCESS] service_hair.png copied!
if exist "%~dp0public\service_makeup.png" echo [SUCCESS] service_makeup.png copied!
if exist "%~dp0public\service_eyelash.png" echo [SUCCESS] service_eyelash.png copied!
if exist "%~dp0public\gallery_bridal.png" echo [SUCCESS] gallery_bridal.png copied!
if exist "%~dp0public\gallery_makeup.png" echo [SUCCESS] gallery_makeup.png copied!
if exist "%~dp0public\gallery_nails.png" echo [SUCCESS] gallery_nails.png copied!
if exist "%~dp0public\gallery_traditional_bride.png" echo [SUCCESS] gallery_traditional_bride.png copied!
echo.
pause
