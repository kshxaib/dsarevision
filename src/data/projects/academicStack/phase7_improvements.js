export const phase7Improvements = {
  title: "Phase 7: Project Improvements & Codebase Audit",
  summary: "Comprehensive technical audit of actual limitations, potential bugs, security vulnerabilities, bottlenecks, and proposed production refactorings for AcademicStack (without modifying original source code).",

  auditCategories: [
    {
      category: "Critical Performance Bottlenecks",
      items: [
        {
          id: "bot-1",
          title: "Synchronous In-Request Answer Generation Loop",
          severity: "High",
          location: "as-backend/app/answers/service.py:generate_answer_set (Lines 65-88)",
          currentBehavior: "POST /api/answer-sets/generate iterates through all questions in a synchronous for-loop, blocking the FastAPI worker thread for 30–90 seconds while awaiting OpenAI API responses. While the frontend polls /progress, concurrent HTTP requests can saturate ASGI worker pools.",
          impact: "Under 20+ concurrent users, the application risks HTTP 504 Gateway Timeouts from reverse proxies (Nginx, Cloudflare) and thread starvation for basic endpoints like /api/users/me.",
          proposedFix: `
// Decouple generation into Celery or ARQ background task
@router.post("/answer-sets/generate", status_code=202)
async def generate_answer_set_endpoint(payload: GenerateAnswerSetRequest, db: Session = Depends(get_db)):
    task = generate_answers_task.delay(payload.question_bank_id, payload.user_id)
    return {"task_id": task.id, "status": "enqueued"}`
        },
        {
          id: "bot-2",
          title: "Missing Payload Index on Qdrant metadata.resource_id",
          severity: "Medium",
          location: "as-backend/app/vector_store/qdrant.py:ensure_collection",
          currentBehavior: "The Qdrant collection is created with Cosine distance and vector dimension 1536, but does not explicitly register a payload keyword index on 'metadata.resource_id'.",
          impact: "As collection size grows beyond 500,000 vectors, filtering vectors by resource_id requires scanning metadata payloads sequentially rather than utilizing an inverted keyword index, increasing search latency from 15ms to 120ms+.",
          proposedFix: `
client.create_payload_index(
    collection_name=collection_name,
    field_name="metadata.resource_id",
    field_schema=models.PayloadSchemaType.KEYWORD
)`
        }
      ]
    },
    {
      id: "security-risks",
      category: "Security & Privacy Vulnerabilities",
      items: [
        {
          id: "sec-1",
          title: "Static Single-Key Fernet Encryption without Key Rotation",
          severity: "High",
          location: "as-backend/app/utils/encryption.py (Lines 8-16)",
          currentBehavior: "User OpenAI API keys are encrypted using a single static ENCRYPTION_KEY loaded from .env. There is no key versioning or rotation mechanism.",
          impact: "If the server's environment variable is compromised, all user keys are exposed. If the key needs rotation, existing database tokens cannot be decrypted without custom migration scripts.",
          proposedFix: `
Use MultiFernet with a list of keys:
keys = [Fernet(k.encode()) for k in os.getenv("ENCRYPTION_KEYS").split(",")]
f = MultiFernet(keys)
# MultiFernet decrypts with any valid key and re-encrypts with the primary key automatically.`
        },
        {
          id: "sec-2",
          title: "Direct Raw Exception Detail Exposed in 500 Responses",
          severity: "Medium",
          location: "as-backend/app/main.py:global_exception_handler (Lines 75-81)",
          currentBehavior: "Returns {'detail': f'Internal server error: {str(exc)}'} directly to the client on unhandled exceptions.",
          impact: "Can leak internal database connection strings, file paths, or third-party service credentials in error messages to malicious actors.",
          proposedFix: `
Log the exact stack trace internally via logger.exception(exc) and return a generic error message:
return JSONResponse(status_code=500, content={"detail": "An internal server error occurred. Please contact support."})`
        }
      ]
    },
    {
      id: "code-quality",
      category: "Code Quality, Reliability & Edge Cases",
      items: [
        {
          id: "code-1",
          title: "Unindexed Foreign Keys in PostgreSQL Schema",
          severity: "Medium",
          location: "as-backend/app/db/models.py",
          currentBehavior: "While primary keys and some foreign keys have index=True, queries filtering questions by question_bank_id or answers by answer_set_id rely on foreign key indexes that should be verified across all junction queries.",
          impact: "Slow JOIN operations and cascade delete operations when cleaning up large question banks.",
          proposedFix: "Ensure all ForeignKey columns explicitly declare index=True and consider composite indexes on (answer_set_id, status)."
        },
        {
          id: "code-2",
          title: "Lack of Server-Sent Events (SSE) for Real-Time Answer Streaming",
          severity: "Medium",
          location: "as-frontend/src/components/SolutionViewer.jsx",
          currentBehavior: "The frontend polls the backend progress endpoint every 2 seconds via setInterval until status is 'completed'.",
          impact: "Creates unnecessary network chatter and prevents students from seeing live token-by-token generation as answers are being written.",
          proposedFix: "Implement an SSE endpoint (`/api/answer-sets/{id}/stream`) yielding chunk updates in real time, reducing polling load to zero."
        }
      ]
    }
  ]
};

