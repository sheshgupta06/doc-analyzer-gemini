@echo off
echo ========================================
echo   AI Document Analyzer - Starting...
echo   Powered by Google Gemini
echo ========================================
echo.
call venv\Scripts\activate
echo Server:   http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop.
echo.
cd src
uvicorn main:app --reload --port 8000
pause
