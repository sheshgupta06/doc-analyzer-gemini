@echo off
echo ========================================
echo   AI Document Analyzer - Setup
echo   Powered by Google Gemini (FREE)
echo ========================================
echo.

echo [1/4] Creating virtual environment...
python -m venv venv
if errorlevel 1 (
    echo ERROR: Python not found. Install from python.org
    pause
    exit /b 1
)

echo [2/4] Activating virtual environment...
call venv\Scripts\activate

echo [3/4] Installing dependencies...
pip install -r requirements.txt

echo [4/4] Setting up .env file...
if not exist .env (
    copy .env.example .env
    echo.
    echo *** IMPORTANT ***
    echo Edit .env and add your FREE Gemini API key from:
    echo https://aistudio.google.com/apikey
    echo.
    echo Opening .env in notepad...
    notepad .env
)

echo.
echo ========================================
echo   Setup complete!
echo   Run start.bat to launch the server
echo ========================================
pause
