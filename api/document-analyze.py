import os
import base64
import json
import re
import io

from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
# pehle wala - wapas karo yahi
import google.generativeai as genai

load_dotenv()

app = FastAPI(title="AI Document Analyzer", version="1.0.0")

# CORS - allow all for hackathon testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load keys from .env
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
MY_API_KEY = os.getenv("MY_API_KEY", "sk_track2_987654321")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.5-flash")  # free tier model


class DocRequest(BaseModel):
    fileName: str
    fileType: str   # pdf / docx / image
    fileBase64: str


# ─── Text Extraction ───────────────────────────────────────────────────────────

def extract_text_from_pdf(data: bytes) -> str:
    try:
        import fitz  # PyMuPDF
        from PIL import Image
        import pytesseract

        doc = fitz.open(stream=data, filetype="pdf")
        text = "\n".join(page.get_text() for page in doc)

        # If no selectable text (scanned PDF), fallback to OCR on page images
        if not text.strip():
            ocr_text = []
            for page in doc:
                pix = page.get_pixmap(alpha=False)
                img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                ocr_text.append(pytesseract.image_to_string(img, lang="eng"))
            text = "\n".join(ocr_text)

        doc.close()
        return text
    except Exception as e:
        raise ValueError(f"PDF extraction failed: {e}")


def extract_text_from_docx(data: bytes) -> str:
    try:
        from docx import Document
        doc = Document(io.BytesIO(data))
        text = "\n".join(
            para.text for para in doc.paragraphs if para.text.strip()
        )
        for table in doc.tables:
            for row in table.rows:
                row_text = " | ".join(cell.text.strip() for cell in row.cells)
                if row_text.strip():
                    text += "\n" + row_text
        return text
    except Exception as e:
        raise ValueError(f"DOCX extraction failed: {e}")


def extract_text_from_image(data: bytes) -> str:
    try:
        import base64 as b64
        image_b64 = b64.b64encode(data).decode('utf-8')

        if data[:4] == b'\x89PNG':
            mime = 'image/png'
        elif data[:2] == b'\xff\xd8':
            mime = 'image/jpeg'
        else:
            mime = 'image/jpeg'

        response = model.generate_content([
            {
                "inline_data": {
                    "mime_type": mime,
                    "data": image_b64
                }
            },
            "Extract all text from this image. Return only the extracted text, nothing else."
        ])
        return response.text.strip()
    except Exception as e:
        raise ValueError(f"Image extraction failed: {e}")

def extract_text(file_type: str, b64: str) -> str:
    data = base64.b64decode(b64)
    ft = file_type.lower().strip()
    if ft == "pdf":
        return extract_text_from_pdf(data)
    elif ft == "docx":
        return extract_text_from_docx(data)
    elif ft in ("image", "png", "jpg", "jpeg", "bmp", "tiff", "gif"):
        return extract_text_from_image(data)
    else:
        raise ValueError(f"Unsupported file type: {file_type}")


# ─── AI Analysis with Gemini ───────────────────────────────────────────────────

def analyze_with_gemini(text: str) -> dict:
    prompt = f"""You are a document analysis expert. Analyze the following document text carefully.

Respond ONLY with a valid JSON object. No explanation, no markdown, no code fences.

Return exactly this structure:
{{
  "summary": "A concise 2-3 sentence summary of the document content.",
  "entities": {{
    "names": ["list of person names found in the document"],
    "dates": ["list of all dates found"],
    "organizations": ["list of company or organization names"],
    "amounts": ["list of monetary amounts with currency symbols"]
  }},
  "sentiment": "Positive"
}}

Rules:
- For sentiment use ONLY one of: Positive, Neutral, Negative
- If no entities of a type are found, return an empty list []
- Keep summary concise and factual

Document text:
{text[:4000]}"""

    response = model.generate_content(prompt)
    raw = response.text.strip()

    # Remove markdown code fences if Gemini adds them
    raw = re.sub(r"```json|```", "", raw).strip()

    # Extract JSON object
    match = re.search(r'\{.*\}', raw, re.DOTALL)
    if match:
        return json.loads(match.group())

    raise ValueError("Gemini did not return valid JSON")


# ─── API Routes ────────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {
        "message": "AI Document Analyzer API is running!",
        "docs": "/docs",
        "powered_by": "Google Gemini 2.5 Flash"
    }


@app.get("/api/document-analyze")
def analyze_document_get():
    return {
        "message": "Use POST to submit a document for analysis.",
        "endpoint": "/api/document-analyze",
        "method": "POST",
        "required_headers": ["Content-Type: application/json", "x-api-key"],
        "body_example": {
            "fileName": "doc.pdf",
            "fileType": "pdf",
            "fileBase64": "..."
        }
    }


@app.post("/api/document-analyze")
async def analyze_document(
    req: DocRequest,
    x_api_key: str = Header(None)
):
    # API key check
    if x_api_key != MY_API_KEY:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized — invalid or missing x-api-key header"
        )

    try:
        # Step 1: Extract text from document
        text = extract_text(req.fileType, req.fileBase64)

        if not text or not text.strip():
            return {
                "status": "error",
                "fileName": req.fileName,
                "message": "No text could be extracted from the document."
            }

        # Step 2: Analyze with Gemini
        result = analyze_with_gemini(text)

        return {
            "status": "success",
            "fileName": req.fileName,
            "summary": result.get("summary", ""),
            "entities": result.get("entities", {
                "names": [],
                "dates": [],
                "organizations": [],
                "amounts": []
            }),
            "sentiment": result.get("sentiment", "Neutral")
        }

    except HTTPException:
        raise
    except Exception as e:
        return {
            "status": "error",
            "fileName": req.fileName,
            "message": str(e)
        }
