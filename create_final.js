const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = 'Shesh Gupta';
pres.title = 'AI Document Analyzer - GUVI Hackathon 2026';

// Colors
const NAVY = "0F1F5C";
const BLUE = "1E4FBD";
const LIGHT_BLUE = "2563EB";
const WHITE = "FFFFFF";
const LIGHT_GRAY = "F0F4FF";
const ACCENT = "00C896";
const DARK = "0A0F2C";
const MUTED = "8B9FCC";

// ─── SLIDE 1: Title ───────────────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: DARK };

  // Top blue accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.08, fill: { color: LIGHT_BLUE }, line: { color: LIGHT_BLUE }
  });

  // Left side accent
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.08, h: 5.625, fill: { color: LIGHT_BLUE }, line: { color: LIGHT_BLUE }
  });

  // Hackathon badge
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 0.4, w: 2.4, h: 0.38, fill: { color: LIGHT_BLUE, transparency: 70 },
    line: { color: LIGHT_BLUE, width: 1 }, rectRadius: 0.1
  });
  slide.addText("⚡ Hackathon Challenge", {
    x: 0.6, y: 0.4, w: 2.4, h: 0.38,
    fontSize: 9, color: "93C5FD", bold: true, align: "center", valign: "middle"
  });

  // Main title
  slide.addText("AI Document Analyzer", {
    x: 0.6, y: 1.1, w: 9, h: 1.1,
    fontSize: 44, color: WHITE, bold: true, fontFace: "Calibri"
  });

  // Subtitle
  slide.addText("Track 2: AI-Powered Document Analysis & Extraction", {
    x: 0.6, y: 2.15, w: 9, h: 0.5,
    fontSize: 18, color: "93C5FD", fontFace: "Calibri"
  });

  // Divider line
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 2.8, w: 4, h: 0.04, fill: { color: ACCENT }, line: { color: ACCENT }
  });

  // Info row
  slide.addText([
    { text: "👨‍💻  Shesh Gupta", options: { color: WHITE, bold: true } },
    { text: "   |   ", options: { color: MUTED } },
    { text: "GCRG Group of Institutions, Lucknow", options: { color: MUTED } }
  ], {
    x: 0.6, y: 3.05, w: 8.5, h: 0.4, fontSize: 13, fontFace: "Calibri"
  });

  // Tech badges
  const badges = ["Python", "FastAPI", "Gemini 2.5 Flash", "Vercel"];
  const badgeColors = ["1E4FBD", "059669", "7C3AED", "000000"];
  badges.forEach((b, i) => {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.6 + i * 2.1, y: 3.7, w: 1.9, h: 0.42,
      fill: { color: badgeColors[i] }, line: { color: badgeColors[i] }, rectRadius: 0.08
    });
    slide.addText(b, {
      x: 0.6 + i * 2.1, y: 3.7, w: 1.9, h: 0.42,
      fontSize: 11, color: WHITE, bold: true, align: "center", valign: "middle"
    });
  });

  // Live URL
  slide.addText("🌐  https://doc-analyzer-gemini.vercel.app", {
    x: 0.6, y: 4.5, w: 8.5, h: 0.4,
    fontSize: 12, color: ACCENT, fontFace: "Calibri"
  });

  // GUVI Hackathon bottom right
  slide.addText("GUVI Hackathon 2026 — Intern Hiring", {
    x: 5.5, y: 5.1, w: 4.3, h: 0.35,
    fontSize: 10, color: MUTED, align: "right"
  });
}

// ─── SLIDE 2: Problem Statement ───────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: WHITE };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: NAVY }, line: { color: NAVY }
  });
  slide.addText("Problem Statement", {
    x: 0.5, y: 0, w: 9, h: 1.1,
    fontSize: 32, color: WHITE, bold: true, valign: "middle", fontFace: "Calibri"
  });

  // 3 cards
  const cards = [
    { icon: "📄", title: "Multi-Format Docs", desc: "Organizations deal with PDFs, Word documents, and scanned images daily — extracting info manually is slow and error-prone." },
    { icon: "🤖", title: "Manual Analysis", desc: "Key entities like names, dates, amounts, and organizations are buried in documents — finding them takes hours." },
    { icon: "📊", title: "No Insights", desc: "Documents contain sentiment and structured data that goes unanalyzed — valuable business intelligence is lost." }
  ];

  cards.forEach((c, i) => {
    const x = 0.3 + i * 3.25;
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.3, w: 3.1, h: 3.6,
      fill: { color: LIGHT_GRAY }, line: { color: "DBEAFE", width: 1 },
      shadow: { type: "outer", color: "000000", blur: 8, offset: 2, angle: 135, opacity: 0.08 }
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.3, w: 3.1, h: 0.06,
      fill: { color: LIGHT_BLUE }, line: { color: LIGHT_BLUE }
    });
    slide.addText(c.icon, {
      x, y: 1.5, w: 3.1, h: 0.7, fontSize: 32, align: "center"
    });
    slide.addText(c.title, {
      x: x + 0.15, y: 2.3, w: 2.8, h: 0.5,
      fontSize: 15, color: NAVY, bold: true, align: "center", fontFace: "Calibri"
    });
    slide.addText(c.desc, {
      x: x + 0.15, y: 2.9, w: 2.8, h: 1.8,
      fontSize: 11.5, color: "374151", align: "left", fontFace: "Calibri", valign: "top"
    });
  });

  slide.addText("GUVI Hackathon 2026 — Track 2", {
    x: 0, y: 5.3, w: 10, h: 0.25,
    fontSize: 9, color: MUTED, align: "center"
  });
}

// ─── SLIDE 3: Solution ────────────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: DARK };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: NAVY }, line: { color: NAVY }
  });
  slide.addText("Our Solution", {
    x: 0.5, y: 0, w: 9, h: 1.1,
    fontSize: 32, color: WHITE, bold: true, valign: "middle"
  });

  // Flow arrows
  const steps = [
    { icon: "📤", label: "Upload", sub: "PDF / DOCX / Image" },
    { icon: "⚙️", label: "Extract", sub: "Text & Layout" },
    { icon: "🧠", label: "Analyze", sub: "Gemini 2.5 Flash" },
    { icon: "📋", label: "Results", sub: "JSON Response" }
  ];

  steps.forEach((s, i) => {
    const x = 0.5 + i * 2.35;
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.4, w: 2.0, h: 2.2,
      fill: { color: "1E3A6E" }, line: { color: "3B5BA5", width: 1 }
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.4, w: 2.0, h: 0.06,
      fill: { color: ACCENT }, line: { color: ACCENT }
    });
    slide.addText(s.icon, { x, y: 1.55, w: 2.0, h: 0.7, fontSize: 28, align: "center" });
    slide.addText(s.label, {
      x, y: 2.35, w: 2.0, h: 0.4,
      fontSize: 15, color: WHITE, bold: true, align: "center"
    });
    slide.addText(s.sub, {
      x, y: 2.8, w: 2.0, h: 0.5,
      fontSize: 11, color: "93C5FD", align: "center"
    });

    // Arrow
    if (i < 3) {
      slide.addText("→", {
        x: x + 2.05, y: 2.0, w: 0.25, h: 0.6,
        fontSize: 20, color: ACCENT, align: "center", valign: "middle"
      });
    }
  });

  // Features
  slide.addText("Key Features", {
    x: 0.5, y: 3.85, w: 9, h: 0.4,
    fontSize: 16, color: ACCENT, bold: true
  });

  const features = [
    "✅  Multi-format: PDF, DOCX, Image (OCR)",
    "✅  AI-powered summarisation",
    "✅  Named entity extraction",
    "✅  Sentiment analysis (Positive/Neutral/Negative)",
    "✅  REST API with authentication"
  ];

  slide.addText(features.map(f => ({ text: f, options: { breakLine: true } })), {
    x: 0.5, y: 4.3, w: 9.2, h: 1.0,
    fontSize: 12, color: "D1D5DB", fontFace: "Calibri"
  });
}

// ─── SLIDE 4: Tech Stack ──────────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: WHITE };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: NAVY }, line: { color: NAVY }
  });
  slide.addText("Tech Stack", {
    x: 0.5, y: 0, w: 9, h: 1.1,
    fontSize: 32, color: WHITE, bold: true, valign: "middle"
  });

  const techs = [
    { icon: "🐍", name: "Python 3.11", desc: "Core backend language", color: "1E4FBD" },
    { icon: "⚡", name: "FastAPI", desc: "High-performance REST API", color: "059669" },
    { icon: "🧠", name: "Gemini 2.5 Flash", desc: "AI summarization & OCR", color: "7C3AED" },
    { icon: "📄", name: "PyMuPDF", desc: "PDF text extraction", color: "DC2626" },
    { icon: "📝", name: "python-docx", desc: "DOCX parsing", color: "2563EB" },
    { icon: "🌐", name: "Vercel", desc: "Cloud deployment", color: "000000" },
  ];

  techs.forEach((t, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.4 + col * 3.15;
    const y = 1.35 + row * 1.85;

    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.9, h: 1.6,
      fill: { color: LIGHT_GRAY }, line: { color: "E5E7EB", width: 1 },
      shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.07 }
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.07, h: 1.6,
      fill: { color: t.color }, line: { color: t.color }
    });
    slide.addText(t.icon, { x: x + 0.15, y: y + 0.2, w: 0.6, h: 0.6, fontSize: 24 });
    slide.addText(t.name, {
      x: x + 0.8, y: y + 0.2, w: 2.0, h: 0.45,
      fontSize: 13, color: NAVY, bold: true, fontFace: "Calibri"
    });
    slide.addText(t.desc, {
      x: x + 0.8, y: y + 0.7, w: 2.0, h: 0.7,
      fontSize: 11, color: "6B7280", fontFace: "Calibri"
    });
  });
}

// ─── SLIDE 5: API Design ──────────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: DARK };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: NAVY }, line: { color: NAVY }
  });
  slide.addText("API Design", {
    x: 0.5, y: 0, w: 9, h: 1.1,
    fontSize: 32, color: WHITE, bold: true, valign: "middle"
  });

  // Left: Request
  slide.addText("📨  Request", {
    x: 0.4, y: 1.2, w: 4.4, h: 0.4, fontSize: 14, color: ACCENT, bold: true
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.6, w: 4.4, h: 2.8, fill: { color: "0A1628" }, line: { color: "1E3A6E", width: 1 }
  });
  slide.addText(
    'POST /api/document-analyze\n\nHeaders:\n  x-api-key: YOUR_KEY\n\nBody:\n{\n  "fileName": "doc.pdf",\n  "fileType": "pdf",\n  "fileBase64": "..."\n}',
    {
      x: 0.55, y: 1.7, w: 4.1, h: 2.6,
      fontSize: 10.5, color: "93C5FD", fontFace: "Consolas", valign: "top"
    }
  );

  // Right: Response
  slide.addText("📩  Response", {
    x: 5.2, y: 1.2, w: 4.4, h: 0.4, fontSize: 14, color: ACCENT, bold: true
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 1.6, w: 4.4, h: 2.8, fill: { color: "0A1628" }, line: { color: "1E3A6E", width: 1 }
  });
  slide.addText(
    '{\n  "status": "success",\n  "fileName": "doc.pdf",\n  "summary": "...",\n  "entities": {\n    "names": [...],\n    "dates": [...],\n    "organizations":[...],\n    "amounts": [...]\n  },\n  "sentiment": "Neutral"\n}',
    {
      x: 5.35, y: 1.7, w: 4.1, h: 2.6,
      fontSize: 10.5, color: "86EFAC", fontFace: "Consolas", valign: "top"
    }
  );

  // Auth note
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 4.6, w: 9.2, h: 0.55,
    fill: { color: "1E3A6E" }, line: { color: "3B5BA5", width: 1 }
  });
  slide.addText("🔐  Requests without a valid API key are rejected with 401 Unauthorized", {
    x: 0.55, y: 4.6, w: 9.0, h: 0.55,
    fontSize: 12, color: "FCD34D", valign: "middle"
  });
}

// ─── SLIDE 6: Live Demo Results ───────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: WHITE };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: NAVY }, line: { color: NAVY }
  });
  slide.addText("Live Demo — Results", {
    x: 0.5, y: 0, w: 9, h: 1.1,
    fontSize: 32, color: WHITE, bold: true, valign: "middle"
  });

  // Success badge
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.2, w: 1.4, h: 0.38,
    fill: { color: "D1FAE5" }, line: { color: "059669", width: 1 }, rectRadius: 0.08
  });
  slide.addText("✅ Success", {
    x: 0.4, y: 1.2, w: 1.4, h: 0.38,
    fontSize: 11, color: "065F46", bold: true, align: "center", valign: "middle"
  });
  slide.addText("sample3.jpg — Image Analysis", {
    x: 2.0, y: 1.2, w: 7.5, h: 0.38,
    fontSize: 12, color: "374151"
  });

  // Summary box
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.7, w: 0.06, h: 0.9,
    fill: { color: LIGHT_BLUE }, line: { color: LIGHT_BLUE }
  });
  slide.addText("SUMMARY", {
    x: 0.6, y: 1.7, w: 2, h: 0.3, fontSize: 9, color: MUTED, bold: true
  });
  slide.addText("Nina Lane is a creative graphic designer with over 5 years of experience in impactful print and digital visuals, specializing in brand identity and packaging design.", {
    x: 0.6, y: 2.0, w: 9.0, h: 0.55,
    fontSize: 11, color: "374151", fontFace: "Calibri"
  });

  // Entities grid
  const entities = [
    { label: "👤 NAMES", value: "Nina Lane", color: "EFF6FF", border: "BFDBFE" },
    { label: "📅 DATES", value: "June 2020 – Present\nMarch 2017 – May 2020\n2017", color: "F0FDF4", border: "BBF7D0" },
    { label: "🏢 ORGANIZATIONS", value: "Brightline Agency\nBlue Horizon Media\nParsons School of Design", color: "FAF5FF", border: "E9D5FF" },
    { label: "💰 AMOUNTS", value: "(none detected)", color: "FFFBEB", border: "FDE68A" },
  ];

  entities.forEach((e, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 4.7;
    const y = 2.75 + row * 1.25;
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.4, h: 1.1,
      fill: { color: e.color }, line: { color: e.border, width: 1 }
    });
    slide.addText(e.label, {
      x: x + 0.15, y: y + 0.08, w: 4.1, h: 0.28,
      fontSize: 9.5, color: NAVY, bold: true
    });
    slide.addText(e.value, {
      x: x + 0.15, y: y + 0.38, w: 4.1, h: 0.65,
      fontSize: 11, color: "374151", fontFace: "Calibri", valign: "top"
    });
  });

  // Sentiment
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 5.15, w: 2.0, h: 0.35,
    fill: { color: "D1FAE5" }, line: { color: "059669" }, rectRadius: 0.08
  });
  slide.addText("😊 Sentiment: Positive", {
    x: 0.4, y: 5.15, w: 2.0, h: 0.35,
    fontSize: 11, color: "065F46", bold: true, align: "center", valign: "middle"
  });
}

// ─── SLIDE 7: Scoring ─────────────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: DARK };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 1.1, fill: { color: NAVY }, line: { color: NAVY }
  });
  slide.addText("Scoring Rubric — 100 Points", {
    x: 0.5, y: 0, w: 9, h: 1.1,
    fontSize: 32, color: WHITE, bold: true, valign: "middle"
  });

  // Main score card
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.3, w: 9.2, h: 1.2,
    fill: { color: "1E3A6E" }, line: { color: "3B5BA5" }
  });
  slide.addText("API Functionality & Accuracy", {
    x: 0.7, y: 1.4, w: 6, h: 0.45,
    fontSize: 16, color: WHITE, bold: true
  });
  slide.addText("90 pts", {
    x: 7.5, y: 1.4, w: 1.9, h: 0.45,
    fontSize: 24, color: ACCENT, bold: true, align: "right"
  });
  slide.addText("15 test cases × 10 pts each  (5 PDF + 5 DOCX + 5 Images)", {
    x: 0.7, y: 1.9, w: 8.5, h: 0.35,
    fontSize: 12, color: "93C5FD"
  });

  // Sub scores
  const subs = [
    { label: "📝  Summary", pts: "2 pts / test", desc: "Concise & accurate summary" },
    { label: "🏷️  Entity Extraction", pts: "4 pts / test", desc: "Names, dates, orgs, amounts" },
    { label: "😊  Sentiment", pts: "4 pts / test", desc: "Positive / Neutral / Negative" },
  ];
  subs.forEach((s, i) => {
    const x = 0.4 + i * 3.1;
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.7, w: 2.9, h: 1.3,
      fill: { color: "0F1F5C" }, line: { color: "1E4FBD" }
    });
    slide.addText(s.label, {
      x: x + 0.15, y: 2.8, w: 2.6, h: 0.4,
      fontSize: 13, color: WHITE, bold: true
    });
    slide.addText(s.pts, {
      x: x + 0.15, y: 3.2, w: 2.6, h: 0.35,
      fontSize: 14, color: ACCENT, bold: true
    });
    slide.addText(s.desc, {
      x: x + 0.15, y: 3.55, w: 2.6, h: 0.35,
      fontSize: 10, color: MUTED
    });
  });

  // Code quality
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 4.15, w: 9.2, h: 0.7,
    fill: { color: "1E3A6E" }, line: { color: "3B5BA5" }
  });
  slide.addText("GitHub Repository Code Quality", {
    x: 0.7, y: 4.25, w: 6, h: 0.4,
    fontSize: 14, color: WHITE, bold: true
  });
  slide.addText("10 pts", {
    x: 7.5, y: 4.25, w: 1.9, h: 0.4,
    fontSize: 20, color: "FCD34D", bold: true, align: "right"
  });

  // Formula
  slide.addText("Final Score = (Total Score / 150) × 90  +  Code Quality (10)", {
    x: 0.4, y: 5.05, w: 9.2, h: 0.4,
    fontSize: 12, color: ACCENT, align: "center", bold: true
  });
}

// ─── SLIDE 8: Thank You ───────────────────────────────────────────────────────
{
  const slide = pres.addSlide();
  slide.background = { color: DARK };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.08, fill: { color: ACCENT }, line: { color: ACCENT }
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.545, w: 10, h: 0.08, fill: { color: ACCENT }, line: { color: ACCENT }
  });

  slide.addText("🚀", { x: 0, y: 1.0, w: 10, h: 1.0, fontSize: 48, align: "center" });

  slide.addText("Thank You!", {
    x: 0, y: 2.0, w: 10, h: 1.0,
    fontSize: 48, color: WHITE, bold: true, align: "center", fontFace: "Calibri"
  });

  slide.addText("AI Document Analyzer — GUVI Hackathon 2026", {
    x: 0, y: 3.1, w: 10, h: 0.45,
    fontSize: 16, color: "93C5FD", align: "center"
  });

  // Info cards
  const infos = [
    { icon: "🌐", label: "Live URL", val: "doc-analyzer-gemini.vercel.app" },
    { icon: "💻", label: "GitHub", val: "github.com/sheshgupta06/doc-analyzer-gemini" },
    { icon: "👨‍💻", label: "Developer", val: "Shesh Gupta — GCRG Lucknow" },
  ];
  infos.forEach((info, i) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5 + i * 3.1, y: 3.75, w: 2.85, h: 1.2,
      fill: { color: "1E3A6E" }, line: { color: "3B5BA5" }
    });
    slide.addText(info.icon + "  " + info.label, {
      x: 0.65 + i * 3.1, y: 3.85, w: 2.55, h: 0.35,
      fontSize: 12, color: ACCENT, bold: true
    });
    slide.addText(info.val, {
      x: 0.65 + i * 3.1, y: 4.25, w: 2.55, h: 0.55,
      fontSize: 10, color: "D1D5DB", fontFace: "Calibri"
    });
  });
}

pres.writeFile({ fileName: "AI_Shesh_Document_Analyzer.pptx" })
  .then(() => console.log("PPT created!"))
  .catch(e => console.error(e));