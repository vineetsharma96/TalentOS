# 🎯 TalentOS — Hackathon & Evaluator Demonstration Guide

Welcome to **TalentOS: AI Workforce Intelligence & Decision Platform**.

This guide provides an end-to-end evaluation journey for judges and reviewers to experience the full power of TalentOS across its multi-agent reasoning, interactive knowledge graph, voice synthesis, and predictive simulation engines.

---

## ⚡ 1. Rapid Setup & Launch

1. **Start the local platform**:
   ```bash
   npm run dev
   ```
   Platform URL: **`http://localhost:3000`**

2. **Run the 54-Point Automated Quality & Integration Test Suite**:
   ```bash
   npm test
   ```
   *Validates graph topology (62 nodes, 126 edges), multi-agent reasoning supervisor, auditable evidence tags, RBAC security matrix, error recovery, live health diagnostics, and all 16 live HTTP routes and data exporters.*

---

## 🔑 2. Test Accounts

| Persona | Email | Password | Recommended Evaluation Path |
|---|---|---|---|
| **Executive / Admin** | `admin@talentos.dev` | `demo123` | Full access: Command Center, AI Decision Center, Simulation, Policy RAG, Settings |
| **HR Operations Lead** | `manager@talentos.dev` | `demo123` | Recruitment Intelligence, Adaptive Onboarding, Flight Risk Sentinel |
| **Staff Engineer** | `employee@talentos.dev` | `demo123` | Personal Intelligence Dossier, Internal Talent Marketplace, Mentorship |

---

## 🌟 3. Step-by-Step Evaluation Journey

### Step 1: Cinematic Void Landing Page (`/`)
- Navigate to `http://localhost:3000/`.
- Notice the **Active Theory-inspired cosmic void aesthetic**: particle mesh canvas with physics drift, letter-by-letter header reveal, and ghost controls.
- Click **"Enter Platform"** to proceed to the authentication portal.

### Step 2: Sign-In (`/sign-in`)
- Click any of the **Quick Demo Account buttons** (`Admin`, `HR Lead`, or `Employee`) to autofill credentials instantly.
- Click **"Sign In to TalentOS"**.

### Step 3: Workforce Command Center (`/dashboard`)
- **Key Metrics**: 62 Total Headcount, 6 Cross-Functional Departments, 94.6% Graph Connectivity Density, 3 Critical Flight Hazards.
- **TopNav Graph Status**: Live green status pill confirming Neo4j Aura / In-Memory graph health.
- **Flight Hazard Sentinel**: Real-time risk cards showing critical flight hazards (e.g. *Omar Abdullah - LLM Engineer, 88% risk*).
- Click **"Simulate Impact"** or **"Launch Retention Action"** to trigger automated workflows.

### Step 4: Multi-Agent AI Decision Center (`/ai`)
- Select any of the pre-loaded prompt chips or type your own question:
  - *"Analyze flight risk and burnout across engineering and recommend interventions"*
  - *"Identify skill gaps in our AI/ML team for Project Nova"*
  - *"What are the key policy rules for remote work stipend and eligibility?"*
- Observe the **Execution Trace Pipeline**:
  - `Supervisor Router` classifies intent and delegates to specialized subagents.
  - `Workforce Risk Agent` & `Predictive ML Evaluator` query the graph and run regression models.
  - `Decision Synthesis Agent` aggregates insights into concrete recommendations.
- Inspect the **Auditable Evidence Cards**:
  - `FACT`: Empirical data points from the Neo4j graph.
  - `PREDICTION`: ML model outputs with numerical confidence scores (e.g. 88%).
  - `AI_INTERPRETATION`: Qualitative assessment of team dynamics and burnout factors.
  - `RECOMMENDATION`: Prioritized leadership interventions.
- Click the **Voice Briefing Player** (`VoicePlayer.tsx`):
  - Listen to the synthesized voice briefing generated via the secure server-side ElevenLabs proxy.
  - Test the soundwave audio equalizer and playback toggle.

### Step 5: Interactive Hexagonal Workforce Graph (`/connections`)
- Visualizes all **62 employee nodes** and **126 cross-functional relationships** in an interactive React Flow canvas.
- **Hexagonal SVG Clip Path**: Custom SVG nodes displaying real DiceBear avatars and department color codes.
- **Interactive Highlighting & Dimming**:
  - Click on any employee (e.g. *Elena Vasquez* or *Vikram Sharma*).
  - Notice that all connected peers, managers, and project collaborators remain highlighted while unrelated nodes dim to 20% opacity.
  - The **Sliding Intelligence Profile Drawer** opens from the right with full details, verified skills, and direct link to their deep dossier.
- Filter by department using the top pills (`Engineering`, `Product`, `Data & Analytics`, etc.).

### Step 6: Deep Employee Dossier (`/employees/[id]`)
- Navigate to `/employees` and click on any employee (e.g. `Carlos Rivera` or `Omar Abdullah`).
- Inspect the deep intelligence profile dossier:
  - **AI Performance & Risk Assessment**: Summary of role trajectory, on-call fatigue, and flight risk factors.
  - **Manager & Peer Reporting Tree**: Visual hierarchy of direct manager and collaborative colleagues.
  - **Verified Skill Inventory**: Rated proficiency bars across technical competencies.
  - **Voice Bio Briefing**: Click to hear an audio briefing of the employee's background.

### Step 7: Recruitment Intelligence & Voice Rehearsal (`/recruitment`)
- View active candidates in the recruitment pipeline mapped against open requisitions.
- Click **"Analyze Fit"** to inspect:
  - Semantic match percentage calculated against role requirements.
  - Missing skill deficit diagnosis (e.g. missing *Kubernetes* or *Spark*).
  - **AI-Generated Interview Questions**: Click the voice player next to any question to rehearse questions with audio synthesis.

### Step 8: Adaptive Onboarding Planner (`/onboarding`)
- Tailored **30-60-90 Day Milestone Roadmap** dynamically adapted to the hire's department and seniority.
- Tasks categorised into *Setup*, *Meeting*, *Training*, and *Objective*.
- Click **"Play Audio Walkthrough"** to hear an executive welcome and onboarding orientation guide.

### Step 9: HR Policy Semantic RAG (`/policies`)
- Grounded policy reasoning engine.
- Ask questions regarding company benefits, parental leave, or remote work stipends.
- Every answer cites exact handbook sections (e.g. *§4.2 Remote Work & Ergonomic Stipend Policy*) with confidence ratings.

### Step 10: What-If Workforce Simulation Center (`/simulation`)
- Test organizational restructuring scenarios before taking real-world action:
  - **Scenario 1**: *Critical Technical Flight* (simulates loss of senior ML & SRE leaders).
  - **Scenario 2**: *Headcount Expansion* (+20% engineering scaling).
  - **Scenario 3**: *Sales & GTM Rebalance*.
- Observe projected delta metrics:
  - Sprint Velocity Impact (-24%)
  - Secondary Attrition Risk Spillover (+18%)
  - Budget Reallocation & Equity Pool Impact

### Step 11: Internal Talent Marketplace (`/mobility`)
- AI-driven internal mobility matching employees with strategic projects and lateral career shifts based on skill adjacencies.
- Mentorship matching engine linking senior engineers with high-potential junior talent.

### Step 12: System Health & Configuration (`/settings`)
- Live telemetry health check indicators for **Neo4j Aura Graph Database**, **ElevenLabs Voice AI**, and **Multi-Agent Engine**.
- Voice model selector (Adam, Rachel, Nicole, Antoni) and speech rate sliders.

---

## 🛡️ 4. Key Architectural Highlights for Technical Reviewers

1. **Next.js 16 (App Router) + React 19 Strict Compliance**:
   - Modern `proxy.ts` implementation replacing deprecated `middleware.ts`.
   - Dynamic asynchronous route parameters (`params: Promise<{ id: string }>`) across all dynamic pages.
   - Suspense-wrapped client search param boundaries for prerendering optimization.

2. **Auditable Multi-Agent Reasoning Architecture**:
   - Supervisor pattern routing through typed agent nodes.
   - Every claim is tagged with explicit evidence classification (`FACT`, `PREDICTION`, `AI_INTERPRETATION`, `RECOMMENDATION`).

3. **Secure ElevenLabs Voice Integration**:
   - Strictly isolated server-side proxy (`/api/voice/synthesize`).
   - Zero API key exposure to browser JavaScript bundles.
   - Built-in graceful degradation to the browser Web Speech API.

4. **Resilient Dual-Mode Graph Data Store**:
   - Queries live Neo4j Aura cloud instances when credentials are provided.
   - Seamlessly falls back to a deterministic 62-node in-memory graph repository with zero runtime disruption if credentials are in demo mode.
