export const fastapiVault = {
  id: 'fastapi',
  title: 'FastAPI & Python Backend',
  shortTitle: 'FastAPI',
  category: 'Web & Frameworks',
  icon: 'Terminal',
  accentColor: '#059669', // teal-600
  description: 'ASGI vs WSGI, Async Request Handling, Pydantic Data Validation, Dependency Injection System, and Background Tasks.',
  tags: ['ASGI', 'Pydantic', 'Dependency Injection', 'Async/Await', 'Background Tasks', 'Python GIL', 'Uvicorn'],
  questions: [
    {
      id: 'fastapi-q1',
      number: '01',
      topic: 'Architecture',
      question: 'ASGI vs WSGI: Why is FastAPI built on ASGI (Uvicorn / Starlette)?',
      interviewTips: 'WSGI is synchronous (one request per thread/process). ASGI is asynchronous and natively supports WebSockets and HTTP/2.',
      answer: `• WSGI (Web Server Gateway Interface - Flask, Django < 3.0):
  - Synchronous standard designed for blocking, linear request/response cycles.
  - Scaling requires adding thread or process workers (Gunicorn); unable to handle long-lived connections (WebSockets, SSE) without high memory overhead.

• ASGI (Asynchronous Server Gateway Interface - FastAPI, Starlette):
  - Built on top of Python's asyncio event loop.
  - Allows single-threaded servers (Uvicorn) to handle thousands of concurrent I/O-bound requests without blocking.
  - Native support for WebSockets, Server-Sent Events (SSE), and background tasks.`
    },
    {
      id: 'fastapi-q2',
      number: '02',
      topic: 'Data Validation',
      question: 'How does Pydantic integrate with FastAPI for serialization and validation?',
      interviewTips: 'Pydantic v2 is rewritten in Rust, delivering up to 20x speedup in schema parsing and serialization.',
      answer: `• Pydantic Integration:
  - In FastAPI, path operation parameters typed with Pydantic BaseModel automatically undergo:
    1. Parsing & Type Coercion: Converts incoming JSON payloads, query params, and headers into Python native types.
    2. Data Validation: Returns clean 422 Unprocessable Entity responses with detailed field-level error messages if validation fails.
    3. Serialization: Response models filter out sensitive fields (e.g. password_hash) using response_model or response_model_exclude.
    4. Auto-Documentation: Automatically generates interactive OpenAPI (Swagger UI at /docs and ReDoc at /redoc).

\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr

app = FastAPI()

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    age: int

@app.post("/users/")
async def create_user(user: UserCreate):
    return {"message": f"User {user.username} created"}
\`\`\``
    },
    {
      id: 'fastapi-q3',
      number: '03',
      topic: 'Dependency Injection',
      question: 'Explain FastAPI\'s Dependency Injection System (Depends) and its benefits.',
      interviewTips: 'Highlight that dependencies can have sub-dependencies and yield can be used for cleanup (like DB session rollback/close).',
      answer: `• Depends() Pattern:
  - Allows sharing database connections, security/auth checks, and business logic cleanly across routes.
  - Supports 'yield' for setup and automatic teardown/cleanup.

\`\`\`python
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

# Dependency with automatic session cleanup
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Dependency for authentication
async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user = authenticate(token, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return user

@app.get("/profile")
def read_profile(current_user: User = Depends(get_current_user)):
    return {"user": current_user.username}
\`\`\``
    }
  ]
};
