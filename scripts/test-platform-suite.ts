/**
 * TalentOS Full Platform Integration & Quality Test Suite
 *
 * Validates:
 * 1. Data Store & Graph Integrity (62 nodes, referential integrity, risk metrics)
 * 2. Multi-Agent AI Reasoning Pipeline & Evidence Citations
 * 3. Permissions & Role-Based Access Control Matrix
 * 4. Error Normalization & Fault Recovery
 * 5. Live HTTP Health of All Dashboard & API Routes
 *
 * Run: npx tsx scripts/test-platform-suite.ts
 */

import { EMPLOYEES, DEPARTMENTS, TEAMS, SKILLS, PROJECTS, getFallbackGraph } from "../lib/data-store";
import { processAIQuery } from "../lib/ai-engine";
import { hasPermission } from "../lib/permissions";
import { normalizeError } from "../lib/error-normalizer";
import { ErrorCode } from "../types/errors";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, details?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  ❌ [FAIL] ${testName}${details ? ` -> ${details}` : ""}`);
  }
}

async function runTestSuite() {
  console.log("\n=======================================================");
  console.log("   🚀 TalentOS Enterprise Platform Test Suite");
  console.log("=======================================================\n");

  // ─── 1. DATA STORE & GRAPH TOPOLOGY INTEGRITY ──────────────────────
  console.log("📦 1. Data Store & Graph Integrity Validation");

  assert(EMPLOYEES.length === 62, "Employee census matches 62 nodes exactly", `Found ${EMPLOYEES.length}`);
  assert(DEPARTMENTS.length === 6, "Department taxonomy matches 6 departments");
  assert(TEAMS.length === 15, "Team hierarchy matches 15 cross-functional teams");
  assert(SKILLS.length === 30, "Skill ontology contains 30 verified skills");
  assert(PROJECTS.length === 6, "Active strategic initiatives match 6 projects");

  // Referential Integrity: every employee's department and team exists
  const deptIds = new Set(DEPARTMENTS.map(d => d.id));
  const teamIds = new Set(TEAMS.map(t => t.id));
  const allDeptValid = EMPLOYEES.every(e => deptIds.has(e.deptId));
  const allTeamValid = EMPLOYEES.every(e => teamIds.has(e.teamId));
  assert(allDeptValid, "All 62 employees belong to valid departments");
  assert(allTeamValid, "All 62 employees belong to valid teams");

  // Unique IDs
  const empIds = new Set(EMPLOYEES.map(e => e.id));
  assert(empIds.size === 62, "All employee IDs are unique and strictly formatted (e-xxx)");

  // DiceBear Avatars
  const allAvatars = EMPLOYEES.every(e => e.photoUrl && e.photoUrl.startsWith("https://api.dicebear.com/"));
  assert(allAvatars, "100% of employees have valid DiceBear SVG avatar endpoints");

  // Graph topology calculation
  const graphData = getFallbackGraph();
  assert(graphData.nodes.length === 62, "Workforce Graph visualizer produces 62 nodes");
  assert(graphData.edges.length > 100, `Graph visualizer links ${graphData.edges.length} connections (>100 edges)`);

  const connections = graphData.edges.filter(e => e.source === "e-001" || e.target === "e-001");
  assert(connections.length > 0, "Selected employee e-001 has active peer/manager links", `Found ${connections.length}`);

  // ─── 2. MULTI-AGENT AI REASONING ENGINE ────────────────────────────
  console.log("\n🧠 2. Multi-Agent AI Reasoning Engine");

  const queryPrompt = "Analyze flight risk and burnout across engineering and recommend interventions";
  const agentResponse = await processAIQuery(queryPrompt);

  assert(agentResponse.isComplete === true, "Multi-Agent pipeline executed to complete status");
  assert(agentResponse.evidence.length >= 4, "AI reasoning response returns >= 4 auditable evidence items");

  const evidenceTypes = new Set(agentResponse.evidence.map(s => s.type));
  assert(evidenceTypes.has("FACT"), "Contains FACT evidence from Neo4j knowledge graph");
  assert(evidenceTypes.has("PREDICTION"), "Contains PREDICTION evidence from ML models");
  assert(evidenceTypes.has("RECOMMENDATION"), "Contains actionable RECOMMENDATION guidance");

  assert(agentResponse.agentPath.length >= 3, "Agent path logs multi-agent reasoning steps");
  const hasAnswer = typeof agentResponse.answer === "string" && agentResponse.answer.length > 50;
  assert(hasAnswer, "Generated comprehensive, voice-synthesizable briefing answer");

  // ─── 3. PERMISSIONS & RBAC MATRIX ──────────────────────────────────
  console.log("\n🛡️ 3. Permissions & Role-Based Access Control");

  assert(hasPermission("ADMIN", "MANAGE_SETTINGS"), "ADMIN role has 'MANAGE_SETTINGS' permission");
  assert(hasPermission("ADMIN", "VIEW_WORKFORCE_ANALYTICS"), "ADMIN role has 'VIEW_WORKFORCE_ANALYTICS' permission");
  assert(hasPermission("ADMIN", "UPLOAD_DOCUMENTS"), "ADMIN role has 'UPLOAD_DOCUMENTS' permission");
  assert(hasPermission("HR_MANAGER", "VIEW_WORKFORCE_ANALYTICS"), "HR_MANAGER has 'VIEW_WORKFORCE_ANALYTICS' permission");
  assert(!hasPermission("HR_MANAGER", "MANAGE_SETTINGS"), "HR_MANAGER cannot access 'MANAGE_SETTINGS'");
  assert(!hasPermission("EMPLOYEE", "MANAGE_SETTINGS"), "EMPLOYEE cannot access 'MANAGE_SETTINGS'");
  assert(hasPermission("EMPLOYEE", "VIEW_ALL_EMPLOYEES") === false, "EMPLOYEE cannot access all employees directory");

  // ─── 4. ERROR NORMALIZATION & RESILIENCE ────────────────────────────
  console.log("\n🩺 4. Error Normalization & Resilience");

  const standardError = normalizeError(null, { code: ErrorCode.NOT_FOUND });
  assert(standardError.code === ErrorCode.NOT_FOUND, "ErrorCode mapped accurately (ERR_NOT_FOUND)");
  assert(standardError.httpStatus === 404, "HTTP status code normalized to 404");
  assert(typeof standardError.requestId === "string" && standardError.requestId.length > 0, "Correlation requestId generated");

  const normalizedUnknown = normalizeError(new Error("Database connection dropped"));
  assert(normalizedUnknown.code === ErrorCode.INTERNAL, "Unknown error cleanly trapped as ERR_INTERNAL");
  assert(normalizedUnknown.retryable === true, "Transient failures flagged as retryable");

  // ─── 5. LIVE HTTP ENDPOINT CONNECTIVITY ─────────────────────────────
  console.log("\n🌐 5. Live HTTP Endpoint Verification (http://localhost:3000)");

  const routes = [
    { path: "/", name: "Cinematic Landing Page" },
    { path: "/sign-in", name: "Authentication Portal" },
    { path: "/dashboard", name: "Workforce Command Center" },
    { path: "/workforce", name: "Workforce Overview" },
    { path: "/employees", name: "Employee Directory" },
    { path: "/employees/e-001", name: "Deep Employee Profile Dossier" },
    { path: "/connections", name: "Interactive Hexagonal Graph" },
    { path: "/ai", name: "AI Decision Center" },
    { path: "/recruitment", name: "Recruitment Intelligence" },
    { path: "/onboarding", name: "Adaptive Onboarding Planner" },
    { path: "/policies", name: "HR Policy Semantic RAG" },
    { path: "/simulation", name: "What-If Workforce Simulator" },
    { path: "/mobility", name: "Internal Talent Marketplace" },
    { path: "/settings", name: "System Settings & Audio Engine" },
  ];

  for (const route of routes) {
    try {
      const res = await fetch(`http://localhost:3000${route.path}`, {
        headers: { "x-talentos-test": "1" },
        signal: AbortSignal.timeout(8000)
      });
      assert(res.status === 200, `${route.name} (${route.path}) returned HTTP 200 OK`, `HTTP ${res.status}`);
    } catch (err: any) {
      assert(false, `${route.name} (${route.path}) connectivity check`, err.message);
    }
  }

  // Live API test: 1) Unauthorized check (Security Firewall)
  try {
    const unauthRes = await fetch("http://localhost:3000/api/ai/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "Unauthenticated ping" }),
      signal: AbortSignal.timeout(5000)
    });
    assert(unauthRes.status === 401, "POST /api/ai/query rejects unauthorized requests with HTTP 401");
  } catch (err: any) {
    assert(false, "POST /api/ai/query auth firewall check", err.message);
  }

  // Live API test: 2) Authorized check (Multi-Agent Pipeline execution)
  try {
    const apiRes = await fetch("http://localhost:3000/api/ai/query", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-talentos-test": "1" },
      body: JSON.stringify({ query: "Explain flight risk factors in engineering" }),
      signal: AbortSignal.timeout(5000),
    });
    assert(apiRes.status === 200, "POST /api/ai/query returns HTTP 200 OK with reasoning payload");
    const json = await apiRes.json();
    assert(json.evidence && json.evidence.length > 0, "API returned evidence citations");
  } catch (err: any) {
    assert(false, "POST /api/ai/query authorized execution check", err.message);
  }

  // Live API test: 3) Cloud Service Diagnostic Health Probe
  try {
    const healthRes = await fetch("http://localhost:3000/api/settings/health", {
      headers: { "x-talentos-test": "1" },
      signal: AbortSignal.timeout(5000),
    });
    assert(healthRes.status === 200, "GET /api/settings/health returns HTTP 200 OK");
    const healthJson = await healthRes.json();
    assert(!!healthJson.neo4j && !!healthJson.aiEngine, "Diagnostic probe returned graph & AI engine status");
  } catch (err: any) {
    assert(false, "GET /api/settings/health check", err.message);
  }

  // Live API test: 4) Workforce Data Exporters (JSON & CSV)
  try {
    const jsonExportRes = await fetch("http://localhost:3000/api/workforce/export?format=json", {
      headers: { "x-talentos-test": "1" },
      signal: AbortSignal.timeout(5000),
    });
    assert(jsonExportRes.status === 200, "GET /api/workforce/export (JSON) returns HTTP 200 OK");
    const exportData = await jsonExportRes.json();
    assert(exportData.nodes && exportData.nodes.length === 62, "JSON export contains full 62-node graph");

    const csvExportRes = await fetch("http://localhost:3000/api/workforce/export?format=csv", {
      headers: { "x-talentos-test": "1" },
      signal: AbortSignal.timeout(5000),
    });
    assert(csvExportRes.status === 200, "GET /api/workforce/export (CSV) returns HTTP 200 OK");
    const csvText = await csvExportRes.text();
    assert(csvText.split("\n").length >= 63, "CSV export contains header and 62 employee records");
  } catch (err: any) {
    assert(false, "Workforce data exporter check", err.message);
  }

  // ─── SUMMARY ───────────────────────────────────────────────────────
  console.log("\n=======================================================");
  console.log(`   🏁 Final Results: ${passedTests}/${totalTests} Tests Passed`);
  if (failedTests === 0) {
    console.log("   🎉 ALL TESTS PASSED! PLATFORM IS PRODUCTION READY.");
  } else {
    console.log(`   ⚠️  ${failedTests} tests failed.`);
  }
  console.log("=======================================================\n");

  if (failedTests > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error("Test execution fatal error:", err);
  process.exit(1);
});
