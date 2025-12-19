@echo off
echo Committing changes to GitHub...

echo.
echo Adding all changes...
git add .

echo.
echo Committing changes...
git commit -m "Restructure project: Separate frontend and backend folders for deployment"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo Changes committed successfully!
pause