export const phase2Understanding = {
  title: "Phase 2: Project Understanding",
  summary: "Comprehensive technical breakdown of AcademicStack: core problem statement, solved challenges, feature breakdown, database schemas, API specs, and end-to-end user workflows.",

  problemStatement: {
    coreChallenge: "Every semester, university students face massive question banks of 50 to 60 heavy questions across past papers. Finding syllabus-verified answers from 500+ page textbooks and formatting them to mark standards takes 5 to 6 hours of exhausting manual labor per subject. AcademicStack automates this entire pipeline under 15 minutes.",
    criticalPainPoints: [
      {
        title: "5–6 Hours of Manual Exam Prep vs. Under 15 Minutes Automated",
        problem: "At every semester exam, students must solve question banks of 50–60 questions. Searching through 500+ page textbooks, extracting definitions, and formatting answers takes 5–6 hours of manual effort per subject.",
        solution: "AcademicStack ingests the question bank and linked textbooks, runs two-stage grounded RAG synthesis, and delivers completely solved, mark-calibrated answers in under 15 minutes (a 95% time reduction)."
      },
      {
        title: "Pervasive AI Hallucination & Syllabus Drifts",
        problem: "General-purpose LLMs (ChatGPT, Claude) answer questions using broad internet knowledge rather than the university professor's exact syllabus terminology, resulting in penalised exam grades.",
        solution: "AcademicStack implements a strict Retrieval-Augmented Generation (RAG) pipeline with Qdrant vector payload isolation, ensuring answers are 100% grounded in uploaded lecture notes and textbooks with page-specific citations."
      },
      {
        title: "Complete Disregard for University Mark Scaling",
        problem: "Standard AI models generate verbose 500-word essays for simple 2-mark definitions, or brief shallow summaries for comprehensive 10-mark architectural questions, ruining a student's time management in timed exams.",
        solution: "Dual-stage Draft & Review pipeline enforces rigid mark-scaled directives: 2M answers are strictly restricted to 5–7 lines; 5–7M answers are calibrated to 15–20 lines with 4–6 structured points; 10M+ answers deliver crisp, high-yield structure (~220–320 words) with mandatory Mermaid diagrams."
      },
      {
        title: "Broken Mathematical Formulas & Missing Architecture Diagrams",
        problem: "Standard AI exports formulas as broken ASCII text or unreadable plain text (e.g. 'u(A union B) = max(uA(x), uB(x))'), and cannot produce visual architectural diagrams, which are required for full marks in engineering subjects.",
        solution: "Engineered a dual-tier publishing engine integrating Matplotlib Computer Modern ('cm') MathTextParser for publication-grade LaTeX formulas and auto-repairing Mermaid.js workflow/state diagrams with Kroki.io secondary fallback."
      },
      {
        title: "Exhaustive Manual Past Paper Trend Auditing",
        problem: "Students spend dozens of hours reading 5–10 years of past semester exam papers to manually identify repeated questions, mark distributions, and blueprint weights.",
        solution: "Algorithmic Exam Blueprint Predictor that automatically parses multiple historical question papers, calculates question repeat multipliers (2x, 3x), and synthesizes a balanced predicted model exam paper adhering to university choice rules."
      },
      {
        title: "API Cost & Data Privacy Insecurity",
        problem: "Students and universities hesitate to use SaaS platforms due to subscription costs, shared prompt caches, and privacy concerns regarding academic intellectual property.",
        solution: "Bring-Your-Own-Key (BYOK) architecture where user OpenAI keys are encrypted at rest with Fernet AES-128-CBC cryptography and decrypted solely in memory per-request."
      }
    ]
  },

  features: [
    {
      category: "Resource & Ingestion Management",
      items: [
        { name: "Syllabus PDF Ingestion", detail: "Upload and parse semester textbook PDFs and professor slide decks via PyMuPDFLoader." },
        { name: "Semantic Text Chunking", detail: "RecursiveCharacterTextSplitter with 1000 character chunks and 200 character overlap." },
        { name: "Subject & Chapter Metadata Tagging", detail: "Enriches vector embeddings with resource_id, subject, chapter, and visibility flags." },
        { name: "Cloudinary CDN Storage", detail: "Stores original document assets on Cloudinary CDN for instant on-demand retrieval." }
      ]
    },
    {
      category: "Question Paper Extraction & Audit",
      items: [
        { name: "Automatic Question Extraction", detail: "Parses past semester question papers and separates questions into granular records." },
        { name: "Group Header Mark Inheritance", detail: "Detects patterns like 'Q.1 for 2 Marks' and assigns 2 marks to all child questions." },
        { name: "AI Complexity Mark Estimation", detail: "Estimates standard mark tiers (2, 5, or 10 marks) if the exam paper omits explicit mark numbers." },
        { name: "Pre-Solve Review Screen", detail: "Interactive UI (QuestionReview.jsx) allowing students to edit text, alter marks, and delete unwanted questions before generation." }
      ]
    },
    {
      category: "Two-Stage Grounded RAG Solver",
      items: [
        { name: "Isolated Qdrant Semantic Retrieval", detail: "Queries top 5 chunks strictly filtered by the specific syllabus resource IDs." },
        { name: "Mark-Scaled Answer Directives", detail: "Injects strict line-count and word-budget rules dynamically into generation prompts." },
        { name: "Mandatory Markdown Comparison Tables", detail: "Regex detects 'difference/compare' and forces structured Markdown comparison tables." },
        { name: "Full Worked Numerical Solutions", detail: "Regex detects calculation problems and forces step-by-step mathematical working." },
        { name: "Academic Reviewer Second Pass", detail: "Dedicated AI Reviewer persona refines drafts, trims filler phrases, and validates LaTeX and Mermaid syntax." }
      ]
    },
    {
      category: "Algorithmic Exam Paper Predictor",
      items: [
        { name: "Dynamic Blueprint Discovery", detail: "Discovers exact exam hierarchy (maximum marks, time allowed, sub-question count) without hardcoded templates." },
        { name: "Mandatory Choice Pool Preservation", detail: "Ensures all options are generated (e.g. 6 questions for 'answer any 4') to preserve real exam choice." },
        { name: "Vision OCR Fallback", detail: "Employs GPT-4o Vision to transcribe scanned or poorly encoded PDF question papers." },
        { name: "One-Click Conversion to Question Bank", detail: "Instantly converts a predicted paper into a solvable Question Bank." }
      ]
    },
    {
      category: "Publication-Grade PDF Engine",
      items: [
        { name: "Solved Book PDF Generation", detail: "Full question-by-question solution document with ReportLab NumberedCanvas two-pass page numbering." },
        { name: "Rapid Recall 2-Column Cheatsheet", detail: "Ultra-dense two-column revision sheet using BaseDocTemplate with 7.5pt typography and formula highlights." },
        { name: "Computer Modern Math Rendering", detail: "Matplotlib MathTextParser ('agg') converts LaTeX equations into 300 DPI raster images aligned to typography baselines." },
        { name: "Auto-Repairing Mermaid Visuals", detail: "Sanitizes and renders architecture and state diagrams into SVGs via Kroki.io redundancy." }
      ]
    },
    {
      category: "Community & Security Hub",
      items: [
        { name: "Community Resource Sharing", detail: "Public sharing toggle for syllabus documents, solved answer sets, and predicted papers." },
        { name: "Bring Your Own Key (BYOK)", detail: "Fernet AES-128-CBC encryption for user-provided OpenAI keys stored securely in PostgreSQL." },
        { name: "JWT HS256 Authentication", detail: "Stateless bearer token authentication with bcrypt password hashing." },
        { name: "Direct Token Paper Sharing", detail: "Public shareable links for predicted papers accessible even without user login." }
      ]
    }
  ],

  technologyStack: {
    backend: [
      { layer: "API Framework", tech: "FastAPI 0.141.1", role: "Asynchronous REST endpoints, dependency injection, automatic Swagger/OpenAPI docs" },
      { layer: "Relational ORM", tech: "SQLAlchemy 2.0+ & Alembic", role: "Declarative database models, cascade deletions, migration management" },
      { layer: "Relational DB", tech: "PostgreSQL", role: "Persistent storage of users, resources, question banks, questions, and generated answers" },
      { layer: "Vector Database", tech: "Qdrant 1.19.0", role: "HNSW semantic vector indexing with subject-isolated payload filtering" },
      { layer: "LLM Pipeline", tech: "LangChain 1.3.16 & OpenAI", role: "Prompt templates, model chaining, and automated fallback between gpt-4o-mini and gpt-4o" },
      { layer: "Embeddings", tech: "OpenAI text-embedding-3-small", role: "Generates 1536-dimensional dense vector embeddings for syllabus chunks" },
      { layer: "Document Parsing", tech: "PyMuPDF 1.28.2 (fitz)", role: "High-speed PDF text block extraction and coordinate tracking" },
      { layer: "Vision OCR", tech: "OpenAI GPT-4o Vision", role: "Fallback OCR for scanned or image-based university question papers" },
      { layer: "PDF Publishing", tech: "ReportLab 5.0.1", role: "Programmatic PDF layout generation with NumberedCanvas and 2-column frames" },
      { layer: "Math Typography", tech: "Matplotlib MathTextParser ('agg')", role: "Renders LaTeX into Computer Modern ('cm') baseline-aligned math images" },
      { layer: "Security & Encryption", tech: "Cryptography Fernet & Bcrypt", role: "Fernet AES-128-CBC key encryption at rest and bcrypt password hashing" }
    ],
    frontend: [
      { layer: "Core UI Library", tech: "React 19.2.8", role: "Component architecture, memoized renders, and state hooks" },
      { layer: "Build Tool", tech: "Vite 8.2.0", role: "Ultra-fast HMR and optimized production bundle compilation" },
      { layer: "Styling System", tech: "TailwindCSS v4.3.3", role: "Design tokens, responsive dark glassmorphic styling, and HSL colors" },
      { layer: "State Management", tech: "Zustand 5.0.15", role: "Modular domain stores for Auth, Question Banks, Practice, and Theme" },
      { layer: "Math Rendering", tech: "KaTeX 0.18.4 & rehype-katex", role: "Instant client-side mathematical expression rendering" },
      { layer: "Diagram Rendering", tech: "Mermaid.js 11.17.2", role: "Client-side rendering of architecture flows, sequence diagrams, and state machines" },
      { layer: "Icons", tech: "Lucide React 1.33.0", role: "Clean, consistent iconography throughout the workspace" }
    ]
  },

  databaseSchema: [
    {
      tableName: "users",
      description: "Stores user credentials, profile information, and encrypted OpenAI API keys",
      columns: [
        { name: "id", type: "Integer", constraints: "PRIMARY KEY, INDEX", detail: "Unique user identifier" },
        { name: "username", type: "String(100)", constraints: "UNIQUE, INDEX, NOT NULL", detail: "Login username" },
        { name: "password_hash", type: "String(255)", constraints: "NOT NULL", detail: "Bcrypt hashed password" },
        { name: "name", type: "String(100)", constraints: "NOT NULL", detail: "Display name of student" },
        { name: "openai_api_key_encrypted", type: "String", constraints: "NULLABLE", detail: "Fernet encrypted OpenAI API key (BYOK)" },
        { name: "created_at", type: "DateTime", constraints: "NOT NULL, DEFAULT utcnow", detail: "Creation timestamp" },
        { name: "updated_at", type: "DateTime", constraints: "NOT NULL, ON UPDATE utcnow", detail: "Last update timestamp" }
      ]
    },
    {
      tableName: "resources",
      description: "Stores uploaded syllabus textbooks, lecture notes, and slide decks",
      columns: [
        { name: "id", type: "Integer", constraints: "PRIMARY KEY, INDEX", detail: "Unique resource identifier" },
        { name: "user_id", type: "Integer", constraints: "INDEX, NOT NULL", detail: "ID of user who uploaded the document" },
        { name: "name", type: "String(200)", constraints: "NOT NULL", detail: "Document title (e.g. Distributed Systems Textbook)" },
        { name: "subject", type: "String(100)", constraints: "NOT NULL", detail: "Subject/course name (e.g. Operating Systems)" },
        { name: "chapters", type: "String", constraints: "NULLABLE", detail: "Comma-separated chapter names or unit titles" },
        { name: "description", type: "String(1000)", constraints: "NULLABLE", detail: "Brief description of syllabus coverage" },
        { name: "cloudinary_url", type: "String", constraints: "NOT NULL", detail: "Direct HTTPS CDN URL for the PDF asset" },
        { name: "cloudinary_public_id", type: "String", constraints: "UNIQUE, INDEX, NOT NULL", detail: "Cloudinary asset ID" },
        { name: "visibility", type: "String(20)", constraints: "NOT NULL, DEFAULT 'private'", detail: "'private' or 'community'" },
        { name: "status", type: "String(20)", constraints: "NOT NULL, DEFAULT 'uploaded'", detail: "'uploaded', 'indexed', or 'error'" },
        { name: "created_at", type: "DateTime", constraints: "NOT NULL, DEFAULT utcnow", detail: "Creation timestamp" },
        { name: "updated_at", type: "DateTime", constraints: "NOT NULL, ON UPDATE utcnow", detail: "Last update timestamp" }
      ]
    },
    {
      tableName: "question_banks",
      description: "Stores uploaded past exam papers or curated question bank collections",
      columns: [
        { name: "id", type: "Integer", constraints: "PRIMARY KEY, INDEX", detail: "Unique question bank identifier" },
        { name: "user_id", type: "Integer", constraints: "INDEX, NOT NULL", detail: "ID of owner user" },
        { name: "name", type: "String(200)", constraints: "NOT NULL", detail: "Question bank title (e.g. May 2024 Exam Paper)" },
        { name: "subject", type: "String(100)", constraints: "NOT NULL", detail: "Academic course/subject name" },
        { name: "cloudinary_url", type: "String", constraints: "NOT NULL", detail: "Original question paper PDF URL" },
        { name: "cloudinary_public_id", type: "String", constraints: "NOT NULL", detail: "Cloudinary asset identifier" },
        { name: "files_meta", type: "Text", constraints: "NULLABLE", detail: "JSON array of uploaded file metadata" },
        { name: "resource_ids", type: "String", constraints: "NOT NULL", detail: "Comma-separated linked Resource IDs for RAG retrieval" },
        { name: "status", type: "String(20)", constraints: "NOT NULL, DEFAULT 'uploaded'", detail: "'uploaded', 'extracted', or 'error'" },
        { name: "visibility", type: "String(20)", constraints: "NOT NULL, DEFAULT 'private'", detail: "'private' or 'community'" },
        { name: "created_at", type: "DateTime", constraints: "NOT NULL, DEFAULT utcnow", detail: "Creation timestamp" },
        { name: "updated_at", type: "DateTime", constraints: "NOT NULL, ON UPDATE utcnow", detail: "Last update timestamp" }
      ]
    },
    {
      tableName: "questions",
      description: "Individual question entities extracted from a question bank",
      columns: [
        { name: "id", type: "Integer", constraints: "PRIMARY KEY, INDEX", detail: "Unique question identifier" },
        { name: "question_bank_id", type: "Integer", constraints: "FOREIGN KEY (question_banks.id, ON DELETE CASCADE), INDEX, NOT NULL", detail: "Parent question bank" },
        { name: "question_number", type: "Integer", constraints: "NOT NULL", detail: "Sequential question index (1, 2, 3...)" },
        { name: "question_text", type: "Text", constraints: "NOT NULL", detail: "Full question prompt text" },
        { name: "marks", type: "Integer", constraints: "NOT NULL", detail: "Mark allocation (e.g. 2, 5, 10)" },
        { name: "marks_source", type: "String(20)", constraints: "NOT NULL, DEFAULT 'ai_estimated'", detail: "'explicit' or 'ai_estimated'" },
        { name: "repeat_count", type: "Integer", constraints: "NOT NULL, DEFAULT 1", detail: "Number of times question appeared across past papers" },
        { name: "years_appeared", type: "String", constraints: "NULLABLE", detail: "Comma-separated exam session years (e.g. '2021, 2023')" },
        { name: "created_at", type: "DateTime", constraints: "NOT NULL, DEFAULT utcnow", detail: "Creation timestamp" }
      ]
    },
    {
      tableName: "answer_sets",
      description: "Container for a batch of generated answers solving a specific Question Bank",
      columns: [
        { name: "id", type: "Integer", constraints: "PRIMARY KEY, INDEX", detail: "Unique answer set identifier" },
        { name: "question_bank_id", type: "Integer", constraints: "FOREIGN KEY (question_banks.id, ON DELETE CASCADE), INDEX, NOT NULL", detail: "Target question bank" },
        { name: "user_id", type: "Integer", constraints: "INDEX, NOT NULL", detail: "User requesting generation" },
        { name: "status", type: "String(50)", constraints: "NOT NULL, DEFAULT 'generating'", detail: "'generating', 'completed', or 'completed_with_errors'" },
        { name: "total_questions", type: "Integer", constraints: "NOT NULL, DEFAULT 0", detail: "Total questions in the set" },
        { name: "completed_questions", type: "Integer", constraints: "NOT NULL, DEFAULT 0", detail: "Successfully solved questions counter" },
        { name: "visibility", type: "String(20)", constraints: "NOT NULL, DEFAULT 'private'", detail: "'private' or 'community'" },
        { name: "pdf_url", type: "String", constraints: "NULLABLE", detail: "URL of compiled solution book PDF" },
        { name: "created_at", type: "DateTime", constraints: "NOT NULL, DEFAULT utcnow", detail: "Creation timestamp" },
        { name: "updated_at", type: "DateTime", constraints: "NOT NULL, ON UPDATE utcnow", detail: "Last update timestamp" }
      ]
    },
    {
      tableName: "answers",
      description: "Individual generated solution for a question, containing markdown, citations, and error logs",
      columns: [
        { name: "id", type: "Integer", constraints: "PRIMARY KEY, INDEX", detail: "Unique answer identifier" },
        { name: "answer_set_id", type: "Integer", constraints: "FOREIGN KEY (answer_sets.id, ON DELETE CASCADE), INDEX, NOT NULL", detail: "Parent answer set container" },
        { name: "question_id", type: "Integer", constraints: "FOREIGN KEY (questions.id, ON DELETE CASCADE), INDEX, NOT NULL", detail: "Source question" },
        { name: "question_number", type: "Integer", constraints: "NOT NULL", detail: "Question sequence number" },
        { name: "question_text", type: "Text", constraints: "NOT NULL", detail: "Question text snapshot" },
        { name: "marks", type: "Integer", constraints: "NOT NULL", detail: "Marks allocation for scaling" },
        { name: "repeat_count", type: "Integer", constraints: "NOT NULL, DEFAULT 1", detail: "Repeat frequency snapshot" },
        { name: "years_appeared", type: "String", constraints: "NULLABLE", detail: "Historical exam sessions" },
        { name: "content", type: "Text", constraints: "NULLABLE", detail: "Grounded solution markdown with LaTeX & Mermaid" },
        { name: "sources", type: "Text", constraints: "NULLABLE", detail: "JSON stringified array of citations (resource, page, chapter)" },
        { name: "status", type: "String(50)", constraints: "NOT NULL, DEFAULT 'pending'", detail: "'pending', 'generating', 'completed', or 'failed'" },
        { name: "error_message", type: "Text", constraints: "NULLABLE", detail: "Error details if LLM call or parsing failed" },
        { name: "created_at", type: "DateTime", constraints: "NOT NULL, DEFAULT utcnow", detail: "Creation timestamp" },
        { name: "updated_at", type: "DateTime", constraints: "NOT NULL, ON UPDATE utcnow", detail: "Last update timestamp" }
      ]
    },
    {
      tableName: "shared_predicted_papers",
      description: "Stores generated predicted exam papers accessible via share tokens without authentication",
      columns: [
        { name: "id", type: "Integer", constraints: "PRIMARY KEY, INDEX", detail: "Unique record identifier" },
        { name: "share_token", type: "String(64)", constraints: "UNIQUE, INDEX, NOT NULL", detail: "Cryptographic URL slug for public sharing" },
        { name: "user_id", type: "Integer", constraints: "INDEX, NULLABLE", detail: "Creator user ID" },
        { name: "creator_name", type: "String(100)", constraints: "NOT NULL, DEFAULT 'Student Scholar'", detail: "Author display name" },
        { name: "subject", type: "String(100)", constraints: "NOT NULL", detail: "Academic subject name" },
        { name: "title", type: "String(200)", constraints: "NOT NULL", detail: "Exam title (e.g. Predicted BE Model Paper)" },
        { name: "paper_data", type: "Text", constraints: "NOT NULL", detail: "JSON string containing full exam metadata, blueprint, and sections" },
        { name: "views", type: "Integer", constraints: "NOT NULL, DEFAULT 0", detail: "View counter for popularity tracking" },
        { name: "visibility", type: "String(20)", constraints: "NOT NULL, DEFAULT 'private'", detail: "'private' or 'community'" },
        { name: "created_at", type: "DateTime", constraints: "NOT NULL, DEFAULT utcnow", detail: "Creation timestamp" }
      ]
    }
  ],

  apiEndpoints: [
    { method: "POST", path: "/api/users/register", desc: "Register a new user account with bcrypt password hashing" },
    { method: "POST", path: "/api/users/login", desc: "Authenticate user and issue JWT HS256 access token" },
    { method: "GET", path: "/api/users/me", desc: "Retrieve current authenticated user profile" },
    { method: "POST", path: "/api/users/keys", desc: "Save user OpenAI API key encrypted with Fernet AES-128-CBC" },
    { method: "GET", path: "/api/users/keys", desc: "Check configured key status (returns masked string, never plaintext)" },
    { method: "POST", path: "/api/resources", desc: "Upload syllabus PDF to Cloudinary and create Resource row" },
    { method: "GET", path: "/api/resources", desc: "List user's uploaded resources with status ('uploaded', 'indexed')" },
    { method: "DELETE", path: "/api/resources/{id}", desc: "Delete resource, removing Cloudinary asset and Qdrant vector payload" },
    { method: "POST", path: "/api/indexing/resource/{id}", desc: "Trigger text splitting and Qdrant vector indexing for a resource" },
    { method: "POST", path: "/api/question-banks/upload", desc: "Upload question paper PDF and trigger question extraction" },
    { method: "GET", path: "/api/question-banks", desc: "List question banks for authenticated user" },
    { method: "GET", path: "/api/question-banks/{id}", desc: "Retrieve question bank metadata and child questions" },
    { method: "POST", path: "/api/answer-sets/generate", desc: "Initiate two-stage RAG generation loop for all questions in bank" },
    { method: "GET", path: "/api/answer-sets/{id}", desc: "Retrieve answer set with solved content, status, and citations" },
    { method: "GET", path: "/api/answer-sets/{id}/progress", desc: "Polling endpoint returning completion percentage and status" },
    { method: "POST", path: "/api/answers/{id}/retry", desc: "Regenerate single question answer with optional custom directive" },
    { method: "GET", path: "/api/answer-sets/{id}/pdf", desc: "Stream binary ReportLab Solved Question Bank PDF" },
    { method: "GET", path: "/api/answer-sets/{id}/cheatsheet-pdf", desc: "Stream binary 2-column Rapid Recall Cheatsheet PDF" },
    { method: "POST", path: "/api/predictor/generate", desc: "Upload past papers, execute Blueprint Audit, and synthesize predicted paper" },
    { method: "GET", path: "/api/predictor/shared/{token}", desc: "Publicly fetch predicted paper using share token" },
    { method: "POST", path: "/api/predictor/save-as-qb", desc: "Convert a predicted paper into a permanent Question Bank in DB" },
    { method: "GET", path: "/api/community/resources", desc: "List public community study materials" },
    { method: "GET", path: "/api/community/answer-sets", desc: "List public community solved answer sets" },
    { method: "POST", path: "/api/community/answer-sets/{id}/clone", desc: "Clone a community answer set into user's private workspace" },
    { method: "GET", path: "/api/health", desc: "System health check reporting DB, Qdrant, hit count, and server uptime" }
  ]
};

