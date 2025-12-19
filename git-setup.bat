@echo off
echo Setting up Git repository...

echo.
echo Initializing Git repository...
git init

echo.
echo Adding remote origin...
git remote add origin https://github.com/shahanaaparveen/mobile_recharge_app.git

echo.
echo Adding all files...
git add .

echo.
echo Creating initial commit...
git commit -m "Initial commit: Mobile recharge app with frontend and backend separation"

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo Git setup complete!
pause