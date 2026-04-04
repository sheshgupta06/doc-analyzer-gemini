#!/bin/bash
echo "========================================"
echo "  AI Document Analyzer - Setup"
echo "  Powered by Google Gemini (FREE)"
echo "========================================"

echo "[1/4] Creating virtual environment..."
python3 -m venv venv

echo "[2/4] Activating virtual environment..."
source venv/bin/activate

echo "[3/4] Installing dependencies..."
pip install -r requirements.txt

echo "[4/4] Setting up .env file..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo ""
    echo "*** IMPORTANT ***"
    echo "Edit .env and add your FREE Gemini API key from:"
    echo "https://aistudio.google.com/apikey"
    echo ""
    echo "Run: nano .env"
fi

echo ""
echo "========================================"
echo "  Setup complete! Run: ./start.sh"
echo "========================================"
