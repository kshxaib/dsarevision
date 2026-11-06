export const phase9Cheatsheet = {
  title: "Phase 9: Final Interview Cheat Sheet",
  summary: "High-yield, rapid-revision guide covering key architectural facts, 10 must-know files, critical numbers, golden interview one-liners, and quick recall flashcards.",

  mentalModel: "AcademicStack = Ingested Textbook Chunks (Qdrant) + Strict Two-Stage Scaled RAG (Draft & Review) + Dynamic Exam Blueprint Predictor + Headless ReportLab Math Publishing (Computer Modern LaTeX + Auto-repair Mermaid).",

  mustKnowFiles: [
    { file: "as-backend/app/main.py", func: "health_check & global_exception_handler", takeaway: "FastAPI setup, CORS regex for preview domains, thread-locked health counters, and DB/Qdrant ping." },
    { file: "as-backend/app/db/models.py", func: "User, Resource, QuestionBank, Question, AnswerSet, Answer", takeaway: "7 SQLAlchemy models with explicit ondelete='CASCADE' and indexed foreign keys." },
    { file: "as-backend/app/rag/service.py", func: "generate_rag_answer & build_answer_directives", takeaway: "Two-stage pipeline: Draft generator (gpt-4o-mini) -> Academic Reviewer (gpt-4o) with mark bounds (2M: 5-7 lines, 10M: ~250 words)." },
    { file: "as-backend/app/rag/retriever.py", func: "retrieve_relevant_documents", takeaway: "Qdrant payload filter on metadata.resource_id matching target syllabus chunks, k=5." },
    { file: "as-backend/app/llm/router.py", func: "call_openai_with_fallback & transcribe_image_with_vision", takeaway: "Automated model fallback (gpt-4o-mini -> gpt-4o), retryDelay regex parsing, and Vision OCR fallback." },
    { file: "as-backend/app/predictor/service.py", func: "analyze_and_predict_paper & extract_text_from_pdf_bytes", takeaway: "Blueprint audit without hardcoded templates; enforces Choice Question Mandatory Pool Rule." },
    { file: "as-backend/app/pdf/generator.py", func: "generate_solved_question_bank_pdf & NumberedCanvas", takeaway: "Two-pass 'Page X of Y' page numbering, Matplotlib 'cm' math cards, and Kroki Mermaid redundancy." },
    { file: "as-backend/app/pdf/cheatsheet_generator.py", func: "generate_exam_cheatsheet_pdf", takeaway: "ReportLab BaseDocTemplate with 2-column Frame (COL_W=269pt), 7.5pt micro-typography, and blacklist filtering." },
    { file: "as-backend/app/pdf/mathrender.py", func: "MathRenderer.render_inline", takeaway: "Matplotlib MathTextParser('agg') rasterizing LaTeX into 300 DPI images with baseline alignment (-depth_pt)." },
    { file: "as-backend/app/utils/encryption.py", func: "encrypt_api_key & decrypt_api_key", takeaway: "Fernet symmetric AES-128-CBC encryption for user-provided OpenAI API keys (BYOK)." }
  ],

  criticalNumbers: [
    { label: "Prep Time Reduction", value: "5–6h → <15m", detail: "Compresses 50–60 question exam solving from 5–6 hours to under 15 minutes (95% reduction)" },
    { label: "Vector Dimension", value: "1536", detail: "OpenAI text-embedding-3-small dense vector length" },
    { label: "Chunk Size", value: "1000 Chars", detail: "RecursiveCharacterTextSplitter paragraph chunk size" },
    { label: "Chunk Overlap", value: "200 Chars", detail: "Preserves theorem and formula boundaries across chunks" },
    { label: "Retrieval Limit (k)", value: "5 Chunks", detail: "Clamped to top 5 most relevant syllabus chunks" },
    { label: "2-Mark Line Limit", value: "5 to 7 Lines", detail: "Strict maximum line budget for 2-mark definitions" },
    { label: "10-Mark Word Budget", value: "~220–320 Words", detail: "Structured depth with mandatory Mermaid visual" },
    { label: "Math Raster DPI", value: "300 DPI", detail: "High-resolution Matplotlib MathTextParser rendering" },
    { label: "Cheatsheet Col Width", value: "269 pt", detail: "2-column balanced Frame layout in ReportLab" },
    { label: "Embedding Rate Limit", value: "60 req/min", detail: "Batching rate limiter (20 chunks/batch) preventing 429 errors" }
  ],

  goldenOneLiners: [
    "AcademicStack reduces semester exam prep for 50–60 question banks from 5–6 hours of manual textbook search down to under 15 minutes with verified syllabus grounding.",
    "AcademicStack eliminates AI hallucination by isolating vector retrieval strictly to user-uploaded syllabus textbooks via Qdrant payload filters.",
    "University mark scaling is enforced through a dual-stage adversarial pipeline: Draft Generator synthesizes, Academic Reviewer trims to line budgets.",
    "2-mark answers are rigidly capped at 5–7 lines with zero headings or diagrams, matching university examination scoring rubrics.",
    "Mathematical formulas are rendered into publication-grade Computer Modern LaTeX images with baseline depth alignment, completely avoiding broken ASCII.",
    "The Exam Blueprint Predictor audits historical papers without hardcoded templates and strictly guarantees Choice Question Pool preservation.",
    "Rapid Recall Cheatsheets condense 40-page solution books into a dense 2-column, 7.5pt printout using ReportLab BaseDocTemplate.",
    "User OpenAI API keys are protected at rest via Fernet AES-128-CBC encryption and decrypted solely in ephemeral memory during requests.",
    "OpenAI API outages and rate limits are mitigated by an automated model fallback chain from gpt-4o-mini to gpt-4o with regex delay parsing.",
    "Corrupted or scanned past exam papers automatically trigger GPT-4o Vision OCR fallback at 150 DPI.",
    "The frontend is a modern React 19 single-page workspace styled with TailwindCSS v4 and modular Zustand state stores."
  ],

  flashcards: [
    {
      q: "Why use Qdrant payload filtering instead of separate collections per subject?",
      a: "Creating separate collections causes memory overhead and connection churn in Qdrant. A single collection with a payload index on metadata.resource_id allows instant filtering with sub-100ms latency without collection sprawl."
    },
    {
      q: "What is the Choice Question Mandatory Pool Rule in the Exam Predictor?",
      a: "If a paper instruction says 'Answer any 4 out of 6', the predictor MUST generate all 6 sub-questions in the pool. Generating only 4 would strip the student of legitimate examination choice."
    },
    {
      q: "How does NumberedCanvas achieve 'Page X of Y' in ReportLab?",
      a: "It overrides showPage to save canvas drawing states in a list. In save(), it counts total pages, iterates through the saved states, draws the footer strings, and flushes to PDF."
    },
    {
      q: "How does depth_pt prevent equation misalignment in mathrender.py?",
      a: "Equations with descenders (like subscripts or integrals) extend below the text baseline. depth_pt measures this descent and sets valign=-depth_pt on the ReportLab <img> tag."
    },
    {
      q: "What prevents student API keys from being leaked in GET profile requests?",
      a: "The API endpoint returns a masked string (e.g. 'sk-...xxxx') or boolean key_configured status, never transmitting the decrypted plaintext key."
    }
  ]
};

