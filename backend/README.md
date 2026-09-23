# TalentOS Python AI Backend (Optional Microservice)

This directory contains the Python FastAPI backend for TalentOS.

> **Note**: TalentOS includes native server-side AI reasoning, Neo4j connectivity, and ElevenLabs voice proxying directly inside the Next.js App Router (`app/api/`). This Python service is an optional microservice for deploying heavyweight Python ML models (scikit-learn, XGBoost, PyMuPDF, LangGraph).

## Running the Python Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Or .venv\Scripts\activate on Windows
pip install -r requirements.txt
python app/main.py
```

Runs at `http://localhost:8000`.
Health check: `http://localhost:8000/health`.
