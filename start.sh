#!/bin/bash
echo "========================================"
echo "  AI Document Analyzer - Starting..."
echo "========================================"
source venv/bin/activate
echo "Server:   http://localhost:8000"
echo "API Docs: http://localhost:8000/docs"
echo "Press Ctrl+C to stop."
echo ""
cd src
uvicorn main:app --reload --port 8000
