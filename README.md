# AI Document Analyzer API
> Track 2 — Hackathon Submission | Powered by Google Gemini 1.5 Flash (FREE)

## Description
Intelligent document processing API that extracts, analyses, and summarises content from PDF, DOCX, and image files using Google Gemini AI.

## Tech Stack
- **Language/Framework:** Python 3.10+ / FastAPI
- **AI Model:** Google Gemini 1.5 Flash (free tier via AI Studio)
- **OCR:** Tesseract (via pytesseract) for images
- **PDF Parsing:** PyMuPDF
- **DOCX Parsing:** python-docx
- **Server:** Uvicorn

## Setup Instructions

### 1. Get FREE Gemini API Key
- Go to https://aistudio.google.com/apikey
- Click "Create API Key" — it's completely free!

### 2. Clone & setup
```bash
git clone https://github.com/your-username/doc-analyzer.git
cd doc-analyzer
```

### 3. Windows users — just double-click:
```
setup.bat   ← install everything
start.bat   ← run the server
```

### 4. Mac/Linux users:
```bash
chmod +x setup.sh && ./setup.sh
./start.sh
```

### 5. Add your API key
Edit `.env` file:
```
GEMINI_API_KEY=AIzaSy-your-key-here
MY_API_KEY=sk_track2_987654321
```

### 6. Test
Open browser: http://localhost:8000/docs

---

## API Usage

**POST** `/api/document-analyze`

```bash
curl -X POST http://localhost:8000/api/document-analyze \
  -H "Content-Type: application/json" \
  -H "x-api-key: sk_track2_987654321" \
  -d '{
    "fileName": "invoice.pdf",
    "fileType": "pdf",
    "fileBase64": "<base64-string>"
  }'
```

### Response
```json
{
  "status": "success",
  "fileName": "invoice.pdf",
  "summary": "Invoice from ABC Pvt Ltd to Ravi Kumar for ₹10,000.",
  "entities": {
    "names": ["Ravi Kumar"],
    "dates": ["10 March 2026"],
    "organizations": ["ABC Pvt Ltd"],
    "amounts": ["₹10,000"]
  },
  "sentiment": "Neutral"
}
```

---

## Approach

### Text Extraction
- **PDF** → PyMuPDF (fast, layout-preserving)
- **DOCX** → python-docx (paragraphs + tables)
- **Image** → Tesseract OCR (English)

### AI Analysis
- Extracted text sent to Gemini 1.5 Flash with structured JSON prompt
- Model returns summary, named entities, and sentiment classification
- Regex post-processing ensures clean JSON parsing
