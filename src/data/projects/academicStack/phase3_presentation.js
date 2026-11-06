export const phase3Presentation = {
  title: "Phase 3: Interview Presentation",
  summary: "Tailored interview presentation for AcademicStack using the STAR (Situation, Task, Action, Result) framework.",

  pitches: [
    {
      format: "30-Second Elevator Pitch",
      targetAudience: "Executive / Recruiter / Quick Round",
      duration: "30 Seconds (~75 words)",
      content: `AcademicStack is an end-to-end AI university exam intelligence and publishing engine. It solves pervasive AI hallucination and incorrect mark scaling by implementing a two-stage Retrieval-Augmented Generation pipeline grounded in uploaded syllabus textbooks with page citations. It features an algorithmic blueprint predictor that audits historical papers to forecast upcoming exams, and a custom ReportLab layout engine rendering publication-grade PDFs with Computer Modern LaTeX math cards and auto-repairing Mermaid diagrams.`
    },
    {
      format: "1-Minute Technical Pitch",
      targetAudience: "Engineering Manager / Lead Interviewer",
      duration: "60 Seconds (~160 words)",
      content: `I engineered AcademicStack, a full-stack platform built with FastAPI, PostgreSQL, Qdrant vector database, and React 19 to solve the breakdown between generic LLMs and university examination standards.

Traditional LLMs hallucinate non-syllabus concepts and generate generic 500-word essays that fail mark scaling. I solved this by architecting a dual-stage LangChain pipeline combining a Draft Generator and an Academic Reviewer persona, constrained by rigid dynamic directives: 2-mark answers are strictly capped at 5–7 lines, while 10-mark questions enforce structured ~250-word breakdowns with visual architecture diagrams.

To help students anticipate exam patterns, I built an Exam Blueprint Predictor that extracts text via PyMuPDF or GPT-4o Vision, audits historical paper structures without hardcoded templates, and guarantees choice pool preservation. Finally, I built a publication-grade publishing engine using ReportLab and Matplotlib MathTextParser, rendering pixel-perfect Computer Modern LaTeX math equations and 2-column recall cheatsheets with zero rendering dropouts.`
    },
    {
      format: "2 to 3-Minute Comprehensive Presentation",
      targetAudience: "Senior Full-Stack & System Architecture Interviewers",
      duration: "2–3 Minutes (~350–400 words)",
      framework: "STAR (Situation, Task, Action, Result)",
      content: {
        situation: `Every semester, university students face massive question banks of 50 to 60 heavy questions across past papers. Finding syllabus-verified answers from 500+ page textbooks, calibrating them to university mark weightage (2M, 5M, 10M), and manually drafting diagrams and LaTeX math takes 5 to 6 hours of exhausting labor per subject. When turning to generic AI tools like ChatGPT, answers hallucinate outside course notes, ignore mark budgets, and mangle mathematical formulas.`,
        task: `My goal was to automate this entire workflow: ingest semester lecture notes and question papers, synthesize 100% syllabus-grounded answers scaled to exam mark tiers, and compress what previously took 5 to 6 hours of manual search and formatting into an automated pipeline completing under 15 minutes.`,
        technologies: `FastAPI, PostgreSQL with SQLAlchemy ORM, Qdrant vector database, LangChain, OpenAI GPT-4o/mini, ReportLab, Matplotlib MathTextParser, PyMuPDF, React 19, TailwindCSS, and Zustand.`,
        action: `I approached the architecture in four core layers:
1. Two-Stage Grounded RAG Solver: Integrated Qdrant with subject-isolated payload filtering. Developed a two-stage LLM workflow where Stage 1 drafts answers using syllabus chunks, and Stage 2 acts as a Senior Academic Reviewer enforcing line counts, Markdown comparison tables, and worked solutions for numerical problems.
2. Dynamic Exam Blueprint Predictor: Rather than relying on rigid templates, I built a dynamic audit service that discovers university exam structures (total marks, time allowed, question hierarchies) from past papers, strictly enforcing a Choice Question Mandatory Pool Rule so students don't lose elective flexibility.
3. Publication-Grade Document Publishing: Integrated ReportLab with custom NumberedCanvas two-pass page numbering and Matplotlib's MathTextParser in 'cm' fontset to convert LaTeX equations into 300 DPI raster images aligned to typographic baselines, accompanied by an auto-repairing Mermaid.js syntax corrector with Kroki.io failover.
4. Privacy & Multi-Tenancy: Implemented Bring-Your-Own-Key (BYOK) encryption using Fernet AES-128-CBC, ensuring student API keys are never stored in plaintext.`,
        result: `AcademicStack reduced semester exam preparation time for 50–60 question banks from 5–6 hours down to under 15 minutes—a 95% reduction in manual effort. It delivers 100% syllabus-grounded answers with exact textbook citations, sub-100ms vector retrieval, and publication-grade ReportLab PDFs with zero equation clipping.`
      }
    },
    {
      format: "5-Minute Architectural Deep Dive",
      targetAudience: "Principal Engineer / Staff Interview / Bar Raiser",
      duration: "5 Minutes (~750 words)",
      sections: [
        {
          title: "1. Architectural Vision & Problem Context",
          text: `In academic engineering examinations, precision, grounding, and presentation dictate grading. When students use generic LLMs, they receive generic internet summaries that fail to use standard university textbook keywords, completely disregard mark-weighted length constraints, and mangle math or diagrams. I built AcademicStack as an asynchronous, decoupled system designed around syllabus-isolated semantic retrieval, two-stage adversarial generation, and deterministic document compilation.`
        },
        {
          title: "2. Vector Ingestion & Multi-Tenant Retrieval Engine",
          text: `For document processing, uploaded syllabus PDFs are ingested asynchronously. We use PyMuPDFLoader for rapid text extraction, chunked via RecursiveCharacterTextSplitter at 1000 characters with 200 character overlap. Each chunk is tagged with metadata: resource_id, subject, and chapter. We embed these chunks using OpenAI's text-embedding-3-small into 1536-dimensional dense vectors stored in Qdrant. 
During RAG retrieval, instead of naive global semantic search which risks cross-subject contamination, we apply Qdrant payload filters matching metadata.resource_id. This achieves strict subject isolation with sub-100ms vector search latency.`
        },
        {
          title: "3. Dual-Stage Grounded RAG with Mark Scaling Directives",
          text: `The core AI innovation is the two-stage solver. When a student generates answers, our system first inspects the question text with regex to detect comparisons, pros/cons, diagrams, or numerical calculations.
We construct dynamic directives:
- 2 Marks: Strictly capped at 5 to 7 lines total, comprising one definition sentence and 2-3 bold keyword bullets. Headings and diagrams are prohibited.
- 5 to 7 Marks: Calibrated to 15 to 20 lines with 4 to 6 structured points.
- 10+ Marks: Calibrated to ~220–320 words with standard syllabus bold keywords and a mandatory Mermaid diagram.
Stage 1 (Draft Generator) uses GPT-4o-mini to synthesize the initial response grounded in retrieved chunks.
Stage 2 (Academic Reviewer) passes the draft through a Senior Examiner persona that aggressively trims filler text, enforces line bounds, verifies LaTeX equation formatting ($$ and $), and verifies Mermaid syntax.`
        },
        {
          title: "4. Dynamic Exam Blueprint Audit & Paper Predictor",
          text: `Historical paper analysis typically suffers from rigid assumptions. AcademicStack introduces a template-free Dynamic Blueprint Audit. When 2 to 10 past exam PDFs are uploaded, we extract text using PyMuPDF, falling back to GPT-4o Vision OCR if pages are scanned or image-based.
The model performs a structural audit: detecting course title, maximum marks, duration, and question hierarchies.
Crucially, we enforce the 'Choice Question Mandatory Pool Rule': if Q.1 states 'Answer any four (05 marks each)', our parser ensures all 6 sub-questions (a to f) are synthesized in the options pool, mirroring authentic university exam papers.`
        },
        {
          title: "5. Publication-Grade PDF Engine & Math Typography",
          text: `Standard HTML-to-PDF converters produce misaligned math and clipped tables. We engineered a custom ReportLab pipeline:
1. NumberedCanvas: Overrides showPage and save to execute a two-pass calculation, rendering exact 'Page X of Y' footers.
2. MathTextParser: Matplotlib's 'agg' engine configured with mathtext.fontset = 'cm' parses LaTeX formulas, rendering 300 DPI raster images. We calculate depth_pt to align the image baseline exactly with ReportLab paragraph text.
3. Rapid Recall Cheatsheet: Built using ReportLab's BaseDocTemplate with two balanced Frame objects (COL_W = 269pt, COL_GAP = 14pt) and compact 7.5pt typography, filtering conversational filler words to produce ultra-dense revision printouts.
4. Mermaid Auto-Repair: Sanitizes unclosed brackets, quotes, and headers with regex before routing to Kroki.io for SVG compilation.`
        },
        {
          title: "6. Security, BYOK & Measurable Engineering Impact",
          text: `To address API cost and privacy, we engineered a Bring-Your-Own-Key (BYOK) service. User OpenAI API keys are encrypted at rest with Fernet symmetric AES-128-CBC encryption and decrypted solely in memory per-request. Password hashes use bcrypt, and session authorization uses stateless HS256 JWT tokens.
The system delivers 100% citation grounding, sub-second PDF generation, and complete syllabus isolation, providing university students with an industrial-grade revision ecosystem.`
        }
      ]
    }
  ]
};

