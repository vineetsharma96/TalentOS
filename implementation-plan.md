# TalentOS — Implementation Plan
*AI Workforce Intelligence & Decision Platform*

---

## 1. Current Repository Audit

### Stack (Confirmed)
| Layer | Technology | Notes |
|---|---|---|
| Framework | **Next.js 16.3.6** (App Router) | This is NOT standard Next.js — read AGENTS.md warning. `params` are now `Promise<{}>`, `LayoutProps` is typed differently |
| UI Runtime | React 19.2.8 | Server Components by default |
| Language | TypeScript 5 | Strict mode via tsconfig |
| Styling | **Tailwind CSS v4** + `tw-animate-css` | `@theme {}` blocks, no tailwind.config.js |
| UI Library | **shadcn** (base-nova style) + **@base-ui/react** | Already installed; components in `components/ui/` |
| Graph Viz | **@xyflow/react** 12.11.6 | Already installed — use for Employee Connections |
| Charts | **recharts** 3.10.1 | Already installed — use for analytics |
| Animation | **motion** (Framer Motion v13) | Already installed |
| Icons | **lucide-react** 1.47.0 | Already installed |
| Utilities | `class-variance-authority`, `cn`, `uuid` | Already installed |
| Database | **Neo4j Aura** (free instance) | Credentials in `.env.example` — this IS the graph DB |
| Backend | `backend/` dir exists but is **empty** | Will be built as Python FastAPI |
| Auth | **None yet** — must implement | No auth provider installed |

### Existing Files Worth Preserving
| File | Status | Action |
|---|---|---|
| `DESIGN.md` | ✅ Source of truth | Read-only reference |
| `Active_Theory_DESIGN.md` | ✅ Design guidance | Read-only reference |
| `Active_Theory_SKILL.md` | ✅ Component rules | Read-only reference |
| `tokens.json` | ✅ Design tokens | Import into CSS |
| `theme.css` | ✅ Tailwind v4 `@theme` block | Import in globals.css |
| `variables.css` | ✅ CSS custom properties | Import in globals.css |
| `components/ui/` | ✅ 8 shadcn components | Extend, do not replace |
| `lib/utils.ts` | ✅ `cn` re-export | Keep |
| `.env.example` | ⚠️ Has real Neo4j credentials | Add more vars, do NOT commit secrets |
| `app/layout.tsx` | ⚠️ Uses `LayoutProps<"/">` | Needs update to Next.js 16 convention |
| `app/page.tsx` | ❌ Default Next.js scaffold | Replace with TalentOS landing |
| `app/globals.css` | ⚠️ Shadcn defaults only | Extend with TalentOS tokens |
| `backend/` | ❌ Empty | Build FastAPI app here |

### Key Finding: Neo4j is Already the Database
The project already has a **Neo4j Aura** instance provisioned. This is the graph database for the workforce knowledge graph. There is **no PostgreSQL** — Neo4j will serve as the primary datastore for all entities and relationships. Where vector search is needed (embeddings for policy/resume RAG), we will use `pgvector` via a secondary lightweight Postgres instance OR use Neo4j's built-in vector index (Neo4j 5+ supports vector search natively). **Decision: Use Neo4j vector indexes** to keep the stack minimal.

### Key Finding: No Authentication System
No auth library is installed. We will use **NextAuth.js v5 (Auth.js)** — the current standard for Next.js App Router. It provides server-side session management, compatible with Next.js 16 App Router, and uses middleware for route protection.

### Key Finding: Backend is Empty
`backend/` is empty. We will build a **Python FastAPI** backend for AI agents, ML models, and document processing. The Next.js app will call it via internal API routes that proxy to FastAPI, keeping all external credentials server-side.

---

## 2. Target Architecture

```
talentos/
├── app/                          [NEXT.JS APP ROUTER — keep flat, no monorepo]
│   ├── (marketing)/              [Route group — landing page]
│   │   ├── page.tsx              [Cinematic landing]
│   │   └── loading.tsx
│   ├── (auth)/                   [Route group — auth flows]
│   │   ├── sign-in/page.tsx
│   │   └── unauthorized/page.tsx
│   ├── (dashboard)/              [Route group — main app]
│   │   ├── layout.tsx            [Shell: sidebar + nav + auth guard]
│   │   ├── page.tsx              [Workforce Command Center]
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── workforce/            [Workforce overview]
│   │   ├── employees/            [Employee list + [employeeId] profile]
│   │   ├── connections/          [Employee graph visualizer]
│   │   ├── ai/                   [AI Decision Center]
│   │   ├── recruitment/          [Recruitment Intelligence]
│   │   ├── onboarding/           [Adaptive Onboarding]
│   │   ├── policies/             [HR Policy RAG]
│   │   ├── simulation/           [Workforce Simulation]
│   │   ├── mobility/             [Internal Talent Marketplace]
│   │   └── settings/             [Settings + admin]
│   ├── api/                      [Route Handlers — server-only]
│   │   ├── auth/[...nextauth]/   [NextAuth.js handler]
│   │   ├── employees/            [CRUD + connections]
│   │   ├── workforce/            [graph, skill-gaps, risks]
│   │   ├── skills/
│   │   ├── ai/                   [query, recruitment, onboarding, policy, simulate]
│   │   ├── voice/                [synthesize, transcribe — ElevenLabs proxy]
│   │   └── errors/[code]/        [Safe error metadata]
│   ├── error.tsx                 [App-level error boundary]
│   ├── not-found.tsx             [404 page]
│   ├── global-error.tsx          [Global fallback]
│   ├── layout.tsx                [Root layout]
│   └── globals.css               [Extended with TalentOS tokens]
│
├── components/
│   ├── layout/                   [AppShell, Sidebar, TopNav, Footer]
│   ├── navigation/               [NavItem, NavGroup, Breadcrumb]
│   ├── landing/                  [HeroCanvas, TypewriterTitle, ParticleField]
│   ├── dashboard/                [MetricCard, RiskSignal, CapacityGauge]
│   ├── employees/                [EmployeeCard, EmployeeProfile, SkillBar]
│   ├── connections/              [GraphCanvas, HexNode, ConnectionPanel, Legend]
│   ├── ai/                       [QueryInput, ResponsePanel, EvidenceCard, AgentTrace]
│   ├── recruitment/              [CandidateCard, MatchScore, SkillGap]
│   ├── onboarding/               [OnboardingPlan, DayCard, VoicePlayer]
│   ├── policies/                 [PolicyUpload, PolicyAnswer, CitationCard]
│   ├── simulation/               [ScenarioBuilder, ImpactPreview, TimelineChart]
│   ├── mobility/                 [CareerPath, LearningPath, OpportunityCard]
│   ├── voice/                    [VoiceButton, PlaybackControls, TranscriptDisplay]
│   ├── errors/                   [ErrorPage, ErrorBoundaryFallback, InlineErrorState,
│   │                              ErrorCode, CursorErrorEffect, RetryButton, error-content.ts]
│   └── ui/                       [Existing shadcn components — extend only]
│
├── hooks/
│   ├── use-error-recovery.ts
│   ├── use-cursor-error-effect.ts
│   ├── use-reduced-motion.ts
│   ├── use-voice-playback.ts
│   ├── use-voice-transcription.ts
│   └── use-employee-graph.ts
│
├── lib/
│   ├── api-client.ts             [Typed fetch wrapper with error normalization]
│   ├── error-normalizer.ts       [Shared error shape builder]
│   ├── error-codes.ts            [Typed error code enum]
│   ├── auth.ts                   [NextAuth config]
│   ├── neo4j.ts                  [Neo4j driver singleton]
│   ├── permissions.ts            [Role-based access helpers]
│   ├── telemetry.ts              [Structured logging]
│   ├── motion.ts                 [Shared animation variants]
│   ├── accessibility.ts          [ARIA utilities, announcer]
│   └── voice-client.ts           [Client-side ElevenLabs abstraction]
│
├── types/
│   ├── employee.ts
│   ├── graph.ts
│   ├── workforce.ts
│   ├── ai.ts
│   ├── voice.ts
│   ├── errors.ts
│   └── auth.ts
│
├── backend/                      [Python FastAPI — AI agents + ML]
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── dependencies.py
│   │   ├── middleware/           [auth, errors, correlation, rate_limit]
│   │   ├── routers/              [employees, workforce, skills, ai, voice, etc.]
│   │   ├── schemas/              [Pydantic models]
│   │   ├── services/             [Business logic]
│   │   ├── agents/               [LangGraph agents]
│   │   ├── graph/                [Neo4j query layer]
│   │   ├── ml/                   [Risk + skill-gap models]
│   │   ├── integrations/         [elevenlabs.py, llm.py, embeddings.py]
│   │   └── observability/
│   ├── tests/
│   └── pyproject.toml
│
├── prisma/                       [NOT USED — Neo4j replaces SQL ORM]
│
├── scripts/
│   ├── seed-demo-data.ts         [Seeds Neo4j with 60 employees]
│   └── validate-env.ts
│
├── public/
│   ├── images/
│   ├── avatars/                  [60 generated employee avatars]
│   └── backgrounds/
│
├── DESIGN.md                     [UNCHANGED — source of truth]
├── Active_Theory_DESIGN.md       [UNCHANGED]
├── Active_Theory_SKILL.md        [UNCHANGED]
├── tokens.json                   [UNCHANGED]
├── theme.css                     [UNCHANGED]
├── variables.css                 [UNCHANGED]
└── .env.example                  [EXTENDED with all required vars]
```

> [!IMPORTANT]
> **No monorepo.** The prompt suggests `apps/web/` and `apps/api/` paths, but the existing project is a flat Next.js app. Migrating to a monorepo structure would break the existing framework. We keep the flat structure and place the Python backend in `backend/`.

---

## 3. Data Architecture

### Primary Store: Neo4j Aura (Graph Database)

Neo4j is already provisioned. All entities and relationships live here.

#### Node Labels
```
(:Employee {id, name, email, role, department, team, experience, joiningDate, photoUrl, isActive, managerId})
(:Skill {id, name, category, level})
(:Department {id, name, headId})
(:Team {id, name, departmentId})
(:Project {id, name, status, startDate, endDate})
(:Role {id, title, level, departmentId})
(:Job {id, title, departmentId, status, postedDate})
(:Candidate {id, name, email, resumeUrl, status})
(:Course {id, name, provider, skillId, duration})
(:PerformanceReview {id, employeeId, period, rating, summary})
(:Policy {id, title, category, content, embeddingId})
(:Interview {id, candidateId, jobId, date, score})
```

#### Relationship Types
```
(Employee)-[:HAS_SKILL {level, verifiedAt}]->(Skill)
(Employee)-[:WORKS_ON {role, since}]->(Project)
(Employee)-[:MEMBER_OF {since}]->(Team)
(Employee)-[:REPORTS_TO]->(Employee)
(Employee)-[:MENTORS]->(Employee)
(Employee)-[:COLLABORATED_WITH {projectId}]->(Employee)
(Employee)-[:COMPLETED {completedAt, score}]->(Course)
(Employee)-[:POTENTIAL_FOR]->(Role)
(Team)-[:BELONGS_TO]->(Department)
(Role)-[:REQUIRES {level}]->(Skill)
(Project)-[:NEEDS]->(Skill)
(Project)-[:OWNED_BY]->(Team)
(Candidate)-[:APPLIED_FOR]->(Job)
(Candidate)-[:HAS_SKILL]->(Skill)
(Job)-[:REQUIRES]->(Skill)
(Job)-[:POSTED_BY]->(Department)
```

#### Vector Indexes (Neo4j 5+ built-in)
- `policy_embedding` — Policy chunks for RAG
- `resume_embedding` — Candidate resume embeddings
- `skill_embedding` — Skill description embeddings

### Auth Store: NextAuth.js
Server-side sessions via JWT or database adapter. Admin accounts stored as Neo4j `(:User)` nodes with bcrypt-hashed passwords and role assignments.

---

## 4. API Architecture

### Next.js Route Handlers (app/api/)

All route handlers are **server-only**. They:
1. Validate authentication via `auth()` from NextAuth
2. Check permissions via `lib/permissions.ts`
3. Either query Neo4j directly (lightweight reads) or proxy to FastAPI (AI/ML work)
4. Normalize errors via `lib/error-normalizer.ts`
5. Never expose stack traces or credentials

| Route | Method | Auth | Description |
|---|---|---|---|
| `/api/auth/[...nextauth]` | GET/POST | — | NextAuth handler |
| `/api/employees` | GET, POST | HR+ | List / create employees |
| `/api/employees/[id]` | GET, PATCH, DELETE | HR+/Admin | Employee CRUD |
| `/api/employees/[id]/connections` | GET | HR+ | Graph connections |
| `/api/workforce/graph` | GET | HR+ | Full graph for visualizer |
| `/api/workforce/skill-gaps` | GET | HR+ | Skill gap analysis |
| `/api/workforce/risks` | GET | HR+ | Attrition risk signals |
| `/api/skills` | GET | HR+ | Skill catalog |
| `/api/ai/query` | POST | HR+ | AI Decision Center query |
| `/api/ai/recruitment/analyze` | POST | HR+ | Resume analysis |
| `/api/ai/onboarding/generate` | POST | HR+ | Generate onboarding plan |
| `/api/ai/policy/query` | POST | HR+ | Policy RAG query |
| `/api/ai/workforce/simulate` | POST | HR+ | Workforce simulation |
| `/api/voice/synthesize` | POST | HR+ | ElevenLabs TTS proxy |
| `/api/voice/transcribe` | POST | HR+ | ElevenLabs STT proxy |
| `/api/errors/[code]` | GET | Public | Safe error metadata |

### Normalized Error Response Shape
```typescript
interface ApiError {
  code: string;          // e.g. "ERR_NOT_FOUND", "ERR_UNAUTHORIZED"
  message: string;       // Human-readable, safe for display
  httpStatus: number;    // 404, 401, etc.
  requestId: string;     // Correlation ID for logs
  retryable: boolean;    // Whether client should offer retry
  retryAfterMs?: number; // For 429 responses
}
```

### FastAPI Backend (backend/)

The Python backend handles computationally intensive work:
- AI agent orchestration (LangGraph)
- LLM calls (Google Gemini via `google-genai`)
- ML model inference (scikit-learn, SHAP)
- Document processing (PyMuPDF, python-docx)
- Embedding generation

The Next.js app calls FastAPI at `FASTAPI_INTERNAL_URL` (env var, never exposed to client).

---

## 5. AI Architecture

### Multi-Agent System (LangGraph)

```
User Query
    │
    ▼
┌─────────────────────────────┐
│   Supervisor / Orchestrator  │  — Intent detection, agent routing
└─────────────────────────────┘
    │
    ├─→ Recruitment Agent       — Resume analysis, job matching, interview prep
    ├─→ Policy Agent            — Policy RAG, citations, confidence scores
    ├─→ Employee Intelligence   — Profile analysis, performance, career paths
    ├─→ Onboarding Agent        — Personalized onboarding plan generation
    ├─→ Interview Agent         — Question generation, response evaluation
    ├─→ Career/Mobility Agent   — Internal opportunity matching, skill gap paths
    ├─→ Workforce Planning      — Capacity, skill gaps, hiring needs
    └─→ Decision Agent          — Multi-source synthesis, evidence-backed recommendations
```

### Agent Tools (LangGraph Tool Nodes)
Each agent has access to typed tools:
- `query_neo4j(cypher)` — Graph database queries
- `semantic_search(query, index)` — Neo4j vector search
- `get_employee_profile(id)` — Employee data retrieval
- `get_skill_gaps(department)` — Computed skill analysis
- `run_risk_model(employee_ids)` — ML inference
- `process_document(content)` — Text extraction + chunking

### Response Trust Labels
Every AI response includes a `sources` array with typed evidence:
```typescript
type EvidenceType = "FACT" | "PREDICTION" | "AI_INTERPRETATION" | "RECOMMENDATION";
```

The UI renders each piece of evidence with its type clearly labeled.

---

## 6. Graph Architecture (Employee Connections)

### Data Shape (API Response)
```typescript
interface WorkforceGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

interface GraphNode {
  id: string;
  employeeId: string;
  name: string;
  role: string;
  department: string;
  photoUrl: string;         // Required — no placeholder allowed
  position?: { x: number; y: number }; // Optional layout hint
}

interface GraphEdge {
  id: string;
  source: string;           // employeeId
  target: string;           // employeeId
  type: ConnectionType;     // "SAME_TEAM" | "SAME_PROJECT" | "REPORTS_TO" | "MENTORS" | "COLLABORATED_WITH"
  label: string;            // Human-readable relationship label
  projectName?: string;     // Context for project-based connections
}
```

### React Flow Implementation
- **@xyflow/react** is already installed — use it
- Custom `HexNode` component: SVG hexagonal clip mask + employee photo
- Node states: `default`, `selected`, `connected`, `dimmed`
- Edge states: `default`, `highlighted`, `dimmed`
- Layout algorithm: force-directed (d3-force) seeded by Neo4j position hints
- Accessible fallback: `<table>` listing all employees and their connections (visually hidden, screen-reader accessible)

### Interaction Model
1. **Default state**: All nodes visible at medium opacity, edges faint
2. **Hover**: Node scales slightly, tooltip shows name/role
3. **Click employee node**:
   - Selected node: full opacity + glow ring
   - Connected nodes: full opacity, no dimming
   - Connecting edges: highlighted color + label visible
   - All other nodes: dimmed to 20% opacity
   - Profile side panel slides in from right
4. **Close profile / click canvas**: Graph resets to default state
5. **Zoom/Pan**: Native React Flow behavior
6. **Mobile**: Focused single-node view, bottom sheet profile

---

## 7. Authentication & Authorization

### Provider: NextAuth.js v5 (Auth.js)

```typescript
// Roles
type UserRole = "ADMIN" | "HR_MANAGER" | "EMPLOYEE";

// ADMIN: full CRUD, analytics, simulation, document upload
// HR_MANAGER: view all, AI features, recruitment, onboarding
// EMPLOYEE: own profile, career features, permitted AI
```

### Route Protection Strategy
1. **Middleware** (`middleware.ts`): Redirects unauthenticated users to `/sign-in`
2. **Layout guard** (`(dashboard)/layout.tsx`): Checks session and role
3. **API route handlers**: All check `auth()` before any DB access
4. **Server Components**: Use `auth()` to conditionally render sensitive data

### Demo Accounts (seeded, credentials in `.env.local`)
```
admin@talentos.dev / (from TALENTOS_ADMIN_PASSWORD env var)
manager@talentos.dev / (from TALENTOS_MANAGER_PASSWORD env var)
employee@talentos.dev / (from TALENTOS_EMPLOYEE_PASSWORD env var)
```

---

## 8. UI Pages

| Route | Page | Auth | Key Features |
|---|---|---|---|
| `/` | Cinematic Landing | Public | WebGL-style particle field, animated hero, enter CTA |
| `/sign-in` | Sign In | Public | Ghost card form, branded |
| `/dashboard` | Workforce Command Center | HR+ | KPI metrics, risk signals, org health |
| `/workforce` | Workforce Overview | HR+ | Dept breakdown, capacity, skill coverage |
| `/employees` | Employee Directory | HR+ | Searchable list, add/delete (Admin) |
| `/employees/[id]` | Employee Profile | HR+ | Full profile, skills, projects, AI insights |
| `/connections` | Employee Connections | HR+ | Interactive hexagonal graph |
| `/ai` | AI Decision Center | HR+ | Conversational AI, evidence, voice |
| `/recruitment` | Recruitment Intelligence | HR+ | Pipeline, resume analysis, candidates |
| `/onboarding` | Adaptive Onboarding | HR+ | Plan generator, voice narration |
| `/policies` | HR Policy Reasoning | Admin | Upload, query, citations |
| `/simulation` | Workforce Simulation | HR+ | What-if scenarios, impact modeling |
| `/mobility` | Internal Talent Marketplace | All | Career paths, skill gaps |
| `/settings` | Settings | Admin | System config, voice settings |
| `/unauthorized` | 403 Error | Public | Access denied experience |

---

## 9. Animation Strategy

### Motion Library: `motion` (Framer Motion v13)

#### Shared Variants (lib/motion.ts)
```typescript
export const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
export const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
export const scaleIn = { hidden: { scale: 0.95, opacity: 0 }, visible: { scale: 1, opacity: 1 } };
export const blurIn = { hidden: { filter: "blur(12px)", opacity: 0 }, visible: { filter: "blur(0px)", opacity: 1 } };
export const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
```

#### Timing Guidelines (from DESIGN.md)
- Micro-interactions: `0.2–0.4s ease-out`
- Page transitions: `0.6–0.8s ease`
- Cinematic/scene: `0.8–9s ease or linear`
- Primary property: **opacity** (fade is the dominant pattern)

#### Landing Page Sequence
1. `t=0`: Black void
2. `t=0.5`: "TALENTOS" fades in, letter by letter
3. `t=1.5`: Subtitle blurs in — "THE INTELLIGENCE LAYER FOR YOUR WORKFORCE"
4. `t=2.5`: Particle field fades in (CSS + requestAnimationFrame)
5. `t=3.5`: CTA button slides up
6. `t=4+`: Idle loop — subtle particle drift

#### Page Transitions
- Route change: outgoing page `opacity: 0, scale: 0.98` then incoming `opacity: 1, scale: 1`
- Use `AnimatePresence` from `motion/react`

---

## 10. Error Handling Architecture

### Error Code System (`lib/error-codes.ts`)

```typescript
export enum ErrorCode {
  // Client errors
  NOT_FOUND = "ERR_NOT_FOUND",
  UNAUTHORIZED = "ERR_UNAUTHORIZED",
  FORBIDDEN = "ERR_FORBIDDEN",
  VALIDATION = "ERR_VALIDATION",
  RATE_LIMITED = "ERR_RATE_LIMITED",
  TIMEOUT = "ERR_TIMEOUT",
  OFFLINE = "ERR_OFFLINE",

  // Server errors
  INTERNAL = "ERR_INTERNAL",
  SERVICE_UNAVAILABLE = "ERR_SERVICE_UNAVAILABLE",
  BAD_GATEWAY = "ERR_BAD_GATEWAY",

  // Domain-specific
  AI_UNAVAILABLE = "ERR_AI_UNAVAILABLE",
  AI_RETRIEVAL_FAILED = "ERR_AI_RETRIEVAL_FAILED",
  GRAPH_LOAD_FAILED = "ERR_GRAPH_LOAD_FAILED",
  VOICE_UNAVAILABLE = "ERR_VOICE_UNAVAILABLE",
  DOCUMENT_REJECTED = "ERR_DOCUMENT_REJECTED",
  SIMULATION_FAILED = "ERR_SIMULATION_FAILED",
}
```

### Error Component Hierarchy
```
app/global-error.tsx            — Last resort React error boundary
app/error.tsx                   — App segment error boundary
app/(dashboard)/error.tsx       — Dashboard segment boundary
app/(dashboard)/[route]/error.tsx — Route-level boundary

components/errors/ErrorPage.tsx          — Full-page error template
components/errors/InlineErrorState.tsx   — Widget/panel errors
components/errors/ErrorBoundaryFallback.tsx — React error boundary UI
components/errors/CursorErrorEffect.tsx  — Interactive cursor effect
components/errors/RetryButton.tsx        — Bounded retry with feedback
components/errors/error-content.ts       — Safe user messages per code
```

### Error Page Requirements Per Type

| HTTP | Code | User Message | Recovery |
|---|---|---|---|
| 404 | ERR_NOT_FOUND | "This page doesn't exist" | Return to dashboard |
| 401 | ERR_UNAUTHORIZED | "Sign in to continue" | Go to sign-in |
| 403 | ERR_FORBIDDEN | "You don't have access to this" | Return to dashboard |
| 408/timeout | ERR_TIMEOUT | "Request took too long" | Retry |
| Network | ERR_OFFLINE | "Check your connection" | Retry when online |
| 422 | ERR_VALIDATION | "Invalid request" | Edit and retry |
| 429 | ERR_RATE_LIMITED | "Too many requests — wait a moment" | Auto-retry after delay |
| 500 | ERR_INTERNAL | "Something went wrong on our end" | Retry + dashboard |
| 502/503/504 | ERR_SERVICE_UNAVAILABLE | "Service temporarily unavailable" | Retry |

---

## 11. Cursor Error Interaction Strategy

### Implementation (`hooks/use-cursor-error-effect.ts`)

```typescript
// Approach: Spotlight + error-code parallax
// - A radial gradient spotlight follows cursor at 60fps (rAF throttled)
// - Error code (e.g., "404") shifts subtly based on cursor offset (transform: translate)
// - Max displacement: ±20px — never blocks content
// - CSS transform only — no layout triggers
```

### Behavior Matrix
| Input Type | Effect |
|---|---|
| Mouse/trackpad | Full spotlight + parallax |
| Touch device | Ambient pulse animation (no cursor tracking) |
| `prefers-reduced-motion: reduce` | Static gradient, no animation |
| Low-power hint | Disabled entirely |

### Safety Rules
- `pointer-events: none` on effect layer — never blocks clicks
- Cleanup `removeEventListener` on unmount
- `cancelAnimationFrame` on unmount
- `z-index: -1` always beneath content
- Opacity < 0.3 on spotlight — never obscures text

---

## 12. ElevenLabs Integration Strategy

### Architecture (Server-Side Only)

```
Client → Next.js API Route → FastAPI voice service → ElevenLabs API
                ↑                                         ↑
          Auth + rate limit                     API key (env var only)
```

### Endpoints
- `POST /api/voice/synthesize` — Text-to-speech
- `POST /api/voice/transcribe` — Speech-to-text (if available)

### Request/Response Flow
1. Client sends text + optional voice preference
2. Next.js API route validates session + checks role
3. Proxies to FastAPI voice service (`FASTAPI_INTERNAL_URL/voice/synthesize`)
4. FastAPI calls ElevenLabs with API key from `ELEVENLABS_API_KEY` env var
5. Returns audio stream or base64 — **never** the API key
6. Client plays via `useVoicePlayback` hook with cancel support

### Voice Features
| Feature | Voice Use | Fallback |
|---|---|---|
| AI Decision Center responses | Optional TTS | Full written response |
| Onboarding plan narration | Optional TTS with speed/pause | Written plan always first |
| Error page narration | Not used | Text is always primary |

### Safety Rules
- Never expose `ELEVENLABS_API_KEY` to client bundles
- Rate limit: 10 requests/minute per session
- Auth required: HR+ role
- Audio cancels on component unmount
- No autoplay — user must click play
- Text is always rendered before audio is offered

---

## 13. Voice Privacy & Authorization

- Voice generation only allowed for HR+ authenticated users
- Synthesized content = already-authorized AI response text (no additional data access)
- STT: transcribed text is shown to user for edit before AI pipeline submission
- No audio is stored server-side beyond request lifetime
- ElevenLabs provider errors are caught and normalized — never expose provider details
- Rate limits applied per user session, not globally

---

## 14. Demo Data Strategy

### Scale: 62 Employees across 6 Departments

| Department | Employees | Teams |
|---|---|---|
| Engineering | 20 | Frontend, Backend, Platform, AI/ML |
| Product | 10 | Product Design, Product Management |
| Data & Analytics | 8 | Data Science, Analytics Eng |
| People & Culture | 6 | Recruiting, L&D |
| Sales & GTM | 10 | Enterprise Sales, Marketing |
| Operations | 8 | Finance, Legal, IT |

### Employee Profile Coverage
Each employee has:
- Unique ID, name, email (fictional)
- Generated avatar (using DiceBear or similar — saved in `public/avatars/`)
- Role, department, team
- 3–8 skills with levels
- 1–3 project memberships
- Manager relationship
- 2–5 colleague connections
- Optional mentor relationship
- Performance review history
- Joining date

### Interesting Graph Properties
- One mentor graph component (5 people chain)
- One cross-department project (10+ employees)
- Clear skill gap between Engineering and open ML Engineer roles
- 3 employees flagged as flight risks by ML model (low engagement signals)
- 5 employees with internal mobility potential

---

## 15. Testing Strategy

### Frontend Tests
- **Unit**: React Testing Library for components
- **Error boundaries**: Simulate render errors, verify fallback UI
- **Graph interaction**: Click node → verify profile opens, connected nodes highlighted
- **Cursor effect**: Mock `mousemove`, verify rAF cleanup on unmount
- **Voice**: Mock audio API, verify cancel on unmount, text fallback when disabled

### Backend Tests
- **Agent evaluation**: Known policy Q&A, verify correct chunk retrieved
- **Neo4j integration**: Seed test data, verify graph queries
- **Authorization**: Unauthenticated requests return 401, wrong role returns 403
- **Voice endpoint**: Verify ElevenLabs is never called client-side
- **Error normalization**: Every error path returns correct `ApiError` shape

### Manual QA Checklist
- [ ] Landing animation plays without jank
- [ ] All 62 employee photos render in hexagonal nodes
- [ ] Click employee → profile opens + connections highlight
- [ ] Click canvas → graph resets cleanly
- [ ] AI query returns evidence-labeled response
- [ ] Voice play button appears after AI response
- [ ] Voice cancel works mid-playback
- [ ] Error page shows code + cursor effect
- [ ] `prefers-reduced-motion` disables animations
- [ ] Keyboard nav on error page (Tab + Enter on retry/nav)
- [ ] Admin can add/delete employee + graph updates

---

## 16. Environment Variables

### Updated `.env.example`
```bash
# Neo4j Aura (existing)
NEO4J_URI=neo4j+s://...
NEO4J_USERNAME=...
NEO4J_PASSWORD=...
NEO4J_DATABASE=...

# NextAuth
AUTH_SECRET=<random 32-char string>
AUTH_URL=http://localhost:3000

# Demo accounts (seeded)
TALENTOS_ADMIN_PASSWORD=...
TALENTOS_MANAGER_PASSWORD=...
TALENTOS_EMPLOYEE_PASSWORD=...

# FastAPI backend
FASTAPI_INTERNAL_URL=http://localhost:8000

# AI Provider (Google Gemini)
GOOGLE_GENERATIVE_AI_API_KEY=...

# ElevenLabs (server-side only — never expose to client)
ELEVENLABS_API_KEY=...
ELEVENLABS_DEFAULT_VOICE_ID=...

# Optional: OpenAI (fallback LLM)
OPENAI_API_KEY=...
```

---

## 17. Dependencies to Install

### Next.js (npm install)
```bash
npm install next-auth@beta          # Auth.js v5
npm install @auth/core
npm install neo4j-driver             # Neo4j JS driver
npm install zod                      # Schema validation
npm install d3-force                 # Graph layout algorithm
npm install @tanstack/react-query    # Server state / caching
npm install ai                       # Vercel AI SDK (streaming AI responses)
```

### Python Backend (pip)
```bash
pip install fastapi uvicorn pydantic python-dotenv
pip install langchain langgraph langchain-google-genai
pip install neo4j                    # Neo4j Python driver
pip install pymupdf python-docx      # Document processing
pip install scikit-learn xgboost shap  # ML
pip install elevenlabs               # ElevenLabs SDK
pip install sentence-transformers    # Embeddings (local fallback)
pip install pytest httpx             # Testing
```

---

## 18. Implementation Order

### Phase 0 — Audit ✅ DONE
- [x] Repository audit
- [x] Design system review
- [x] Technology stack confirmed
- [x] **This document**

### Phase 1 — Foundation
1. Install dependencies (NextAuth, Neo4j driver, Zod, d3-force, TanStack Query, Vercel AI SDK)
2. Update `globals.css` to import `theme.css` and `variables.css`
3. Update `app/layout.tsx` (fix `LayoutProps`, add TalentOS metadata, font loading)
4. Set up `lib/auth.ts` (NextAuth config with Credentials provider + Neo4j user lookup)
5. Create `middleware.ts` (route protection)
6. Create `lib/neo4j.ts` (driver singleton)
7. Create `lib/error-normalizer.ts`, `lib/error-codes.ts`
8. Create `lib/api-client.ts` (typed fetch with error normalization)
9. Create `lib/motion.ts` (shared animation variants)
10. Create global error boundaries: `app/global-error.tsx`, `app/error.tsx`, `app/not-found.tsx`
11. Create `components/errors/` suite
12. Create `app/(auth)/sign-in/page.tsx`
13. Set up FastAPI `backend/` scaffold with health check

### Phase 2 — Data Foundation
1. Create all TypeScript types in `types/`
2. Create Neo4j query helpers in `lib/neo4j.ts`
3. Create `scripts/seed-demo-data.ts` (62 employees, relationships)
4. Generate 62 employee avatars (DiceBear API or generated images)
5. Run seed script against Neo4j Aura instance
6. Create API routes: `/api/employees`, `/api/skills`, `/api/workforce/graph`
7. Verify data with Cypher queries

### Phase 3 — Workforce Graph
1. Create `app/(dashboard)/layout.tsx` (AppShell, Sidebar, TopNav)
2. Create `components/connections/HexNode.tsx`
3. Create `components/connections/GraphCanvas.tsx` (React Flow + d3-force layout)
4. Create `components/connections/ConnectionPanel.tsx` (employee profile side panel)
5. Create `app/(dashboard)/connections/page.tsx`
6. Create accessible table fallback
7. Implement all graph interaction states
8. Test with full 62-employee dataset

### Phase 4 — AI Foundation
1. Scaffold FastAPI backend with LangGraph supervisor agent
2. Create `app/api/ai/query/route.ts` (proxy with streaming)
3. Create `components/ai/QueryInput.tsx`, `ResponsePanel.tsx`, `EvidenceCard.tsx`
4. Implement ElevenLabs server-side proxy (`app/api/voice/synthesize/route.ts`)
5. Create `hooks/use-voice-playback.ts`

### Phase 5 — AI Agents
1. Implement each LangGraph agent (Recruitment, Policy, Employee Intelligence, Onboarding, Interview, Career, Workforce Planning, Decision)
2. Connect agents to Neo4j tool nodes
3. Implement Neo4j vector search for Policy RAG
4. Create API routes for each agent endpoint

### Phase 6 — Intelligence Modules
1. Skill gap engine (Cypher-based, no ML needed)
2. Recruitment matching (embeddings + structured matching)
3. Risk model (sklearn gradient boosting + SHAP)
4. Workforce simulation engine
5. Internal mobility matching

### Phase 7 — Command Center
1. Dashboard KPI cards (real Neo4j data)
2. Risk signal panel
3. Org health chart (recharts)
4. Navigation between all modules

### Phase 8 — Landing + Polish
1. Cinematic landing page (`app/(marketing)/page.tsx`)
2. Particle field animation
3. Page transitions (`AnimatePresence`)
4. Typography animations
5. Scroll reveals
6. Error page cursor effect
7. Voice playback polish

### Phase 9 — Quality
1. Performance audit (Lighthouse)
2. Accessibility audit
3. Security audit (env vars, auth, authorization)
4. Responsive audit (mobile/tablet)
5. AI reliability testing
6. Error state testing
7. Fix issues

---

## 19. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Neo4j Aura free tier limitations | Medium | High | Stay within 50k nodes; use efficient Cypher; cache graph responses |
| Next.js 16 breaking changes vs training data | High | Medium | Read docs in `node_modules/next/dist/docs/` before each implementation step |
| LangGraph agent latency | High | Medium | Stream responses via Vercel AI SDK; show progressive UI |
| ElevenLabs API rate limits | Medium | Low | Rate limit proxy; graceful text fallback; no autoplay |
| React Flow performance with 62 nodes | Low | Medium | Virtual rendering for large graphs; level-of-detail on zoom out |
| Auth.js v5 beta instability | Low | High | Pin to specific beta version; test thoroughly |
| FastAPI CORS with Next.js | Low | Medium | Configure CORS for `localhost:3000` in dev; use internal URL in prod |

---

## 20. Open Questions

> [!IMPORTANT]
> **Please review these before execution begins:**

1. **Python Backend**: Should the FastAPI backend be run as a separate process (two terminals) or should we use Next.js API routes for all AI logic (using the Vercel AI SDK + google-genai directly from Next.js)? Using Next.js-only would simplify deployment but limits Python ML libraries.

2. **ElevenLabs API Key**: The `.env.example` does not yet have an ElevenLabs key. Should voice features be built with a placeholder (graceful fallback) and the key filled in later, or is there a key available now?

3. **Avatar Generation**: Should employee avatars be AI-generated images (unique portraits) or use a service like DiceBear (geometric/illustrated)? AI-generated would be more premium but requires generation time.

4. **Deployment Target**: Is this for a local demo or deployed? This affects how the FastAPI backend is hosted (e.g., Render, Railway, or same machine).

5. **LLM Provider**: Google Gemini is assumed (existing Google tooling). Confirm if OpenAI should be a fallback.
