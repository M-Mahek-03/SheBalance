@echo off
echo Starting SheBalance Local Development Server...
echo.
echo Server will be available at:
echo http://localhost:3000
echo http://localhost:3000/dashboard.html
echo.
echo Press Ctrl+C to stop the server
echo.
python -m http.server 3000
pause