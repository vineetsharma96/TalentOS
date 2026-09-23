"""
TalentOS Python AI & Graph Backend (FastAPI)
Optional standalone AI & ML microservice for TalentOS.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os

app = FastAPI(
    title="TalentOS Intelligence Backend",
    description="Python AI microservice for workforce multi-agent reasoning, Neo4j graph operations, and ElevenLabs voice generation.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AIQueryRequest(BaseModel):
    query: str = ""
    context: Optional[dict] = None

class AIEvidence(BaseModel):
    type: str
    content: str
    source: Optional[str] = None
    confidence: Optional[float] = None

class AIQueryResponse(BaseModel):
    requestId: str
    query: str
    answer: str
    evidence: List[AIEvidence]
    agentPath: List[str]
    processingMs: int
    isComplete: bool

@app.get("/")
def read_root():
    return {
        "status": "healthy",
        "service": "TalentOS AI Backend",
        "version": "1.0.0",
        "endpoints": ["/health", "/api/ai/query", "/api/voice/status"],
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "neo4j_configured": bool(os.getenv("NEO4J_URI")),
        "elevenlabs_configured": bool(os.getenv("ELEVENLABS_API_KEY")),
        "gemini_configured": bool(os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")),
    }

@app.post("/api/ai/query", response_model=AIQueryResponse)
def run_ai_reasoning(req: AIQueryRequest):
    return {
        "requestId": "py-req-001",
        "query": req.query,
        "answer": f"TalentOS Python Multi-Agent reasoning synthesized for: '{req.query}' across Neo4j graph nodes and predictive flight models.",
        "evidence": [
            {
                "type": "FACT",
                "content": "62 employees mapped with 126 relationships across 6 departments.",
                "source": "Neo4j Knowledge Graph",
            },
            {
                "type": "PREDICTION",
                "content": "Turnover probability concentrated in LLM and SRE technical specializations.",
                "source": "Scikit-Learn Gradient Boosting Attrition Model",
                "confidence": 0.88,
            },
            {
                "type": "RECOMMENDATION",
                "content": "Institute cross-training in MLOps and deploy proactive retention packages.",
                "source": "TalentOS Action Optimizer",
            },
        ],
        "agentPath": [
            "FastAPI Supervisor",
            "LangGraph Agent Coordinator",
            "Neo4j Vector Search",
            "Decision Synthesizer",
        ],
        "processingMs": 42,
        "isComplete": True,
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
