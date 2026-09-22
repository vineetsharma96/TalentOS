/**
 * TalentOS Demo Data Seeder
 *
 * Seeds Neo4j Aura with 62 fictional employees, skills, teams,
 * departments, projects, and relationships.
 *
 * Run: npx tsx scripts/seed-demo-data.ts
 *
 * Requires: .env.local with NEO4J_* variables set
 */

import neo4j from "neo4j-driver";
import crypto from "crypto";

// ─── Load env ─────────────────────────────────────────────────────────────────
import { config } from "dotenv";
config({ path: ".env.local" });

const NEO4J_URI = process.env.NEO4J_URI!;
const NEO4J_USERNAME = process.env.NEO4J_USERNAME!;
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD!;
const NEO4J_DATABASE = process.env.NEO4J_DATABASE ?? "neo4j";
const ADMIN_PASSWORD = process.env.TALENTOS_ADMIN_PASSWORD ?? "demo123";
const MANAGER_PASSWORD = process.env.TALENTOS_MANAGER_PASSWORD ?? "demo123";
const EMPLOYEE_PASSWORD = process.env.TALENTOS_EMPLOYEE_PASSWORD ?? "demo123";

function hash(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function uid(): string {
  return crypto.randomUUID();
}

// ─── Data Definitions ─────────────────────────────────────────────────────────

const DEPARTMENTS = [
  { id: "dept-eng", name: "Engineering" },
  { id: "dept-product", name: "Product" },
  { id: "dept-data", name: "Data & Analytics" },
  { id: "dept-people", name: "People & Culture" },
  { id: "dept-sales", name: "Sales & GTM" },
  { id: "dept-ops", name: "Operations" },
];

const TEAMS = [
  { id: "team-frontend", name: "Frontend", deptId: "dept-eng" },
  { id: "team-backend", name: "Backend", deptId: "dept-eng" },
  { id: "team-platform", name: "Platform", deptId: "dept-eng" },
  { id: "team-aiml", name: "AI/ML", deptId: "dept-eng" },
  { id: "team-design", name: "Product Design", deptId: "dept-product" },
  { id: "team-pm", name: "Product Management", deptId: "dept-product" },
  { id: "team-datascience", name: "Data Science", deptId: "dept-data" },
  { id: "team-analyticseng", name: "Analytics Engineering", deptId: "dept-data" },
  { id: "team-recruiting", name: "Recruiting", deptId: "dept-people" },
  { id: "team-ld", name: "L&D", deptId: "dept-people" },
  { id: "team-enterprise", name: "Enterprise Sales", deptId: "dept-sales" },
  { id: "team-marketing", name: "Marketing", deptId: "dept-sales" },
  { id: "team-finance", name: "Finance", deptId: "dept-ops" },
  { id: "team-legal", name: "Legal", deptId: "dept-ops" },
  { id: "team-it", name: "IT", deptId: "dept-ops" },
];

const SKILLS = [
  { id: "sk-python", name: "Python", category: "Programming" },
  { id: "sk-typescript", name: "TypeScript", category: "Programming" },
  { id: "sk-react", name: "React", category: "Frontend" },
  { id: "sk-nextjs", name: "Next.js", category: "Frontend" },
  { id: "sk-nodejs", name: "Node.js", category: "Backend" },
  { id: "sk-go", name: "Go", category: "Programming" },
  { id: "sk-rust", name: "Rust", category: "Programming" },
  { id: "sk-java", name: "Java", category: "Programming" },
  { id: "sk-kubernetes", name: "Kubernetes", category: "DevOps" },
  { id: "sk-docker", name: "Docker", category: "DevOps" },
  { id: "sk-aws", name: "AWS", category: "Cloud" },
  { id: "sk-gcp", name: "GCP", category: "Cloud" },
  { id: "sk-terraform", name: "Terraform", category: "DevOps" },
  { id: "sk-ml", name: "Machine Learning", category: "AI/ML" },
  { id: "sk-llm", name: "LLM Engineering", category: "AI/ML" },
  { id: "sk-mlops", name: "MLOps", category: "AI/ML" },
  { id: "sk-sql", name: "SQL", category: "Data" },
  { id: "sk-spark", name: "Apache Spark", category: "Data" },
  { id: "sk-dbt", name: "dbt", category: "Data" },
  { id: "sk-neo4j", name: "Neo4j", category: "Database" },
  { id: "sk-postgres", name: "PostgreSQL", category: "Database" },
  { id: "sk-figma", name: "Figma", category: "Design" },
  { id: "sk-ux", name: "UX Research", category: "Design" },
  { id: "sk-product", name: "Product Strategy", category: "Product" },
  { id: "sk-agile", name: "Agile/Scrum", category: "Process" },
  { id: "sk-leadership", name: "Engineering Leadership", category: "Leadership" },
  { id: "sk-sales", name: "Enterprise Sales", category: "Sales" },
  { id: "sk-marketing", name: "Growth Marketing", category: "Marketing" },
  { id: "sk-finance", name: "Financial Analysis", category: "Finance" },
  { id: "sk-legal", name: "Contract Law", category: "Legal" },
];

const PROJECTS = [
  { id: "proj-phoenix", name: "Project Phoenix", status: "ACTIVE" },
  { id: "proj-atlas", name: "Atlas Platform", status: "ACTIVE" },
  { id: "proj-nova", name: "Nova ML Pipeline", status: "ACTIVE" },
  { id: "proj-horizon", name: "Horizon Dashboard", status: "COMPLETED" },
  { id: "proj-pulse", name: "Pulse Analytics", status: "ACTIVE" },
  { id: "proj-forge", name: "DevForge", status: "PAUSED" },
];

const EMPLOYEES = [
  // Engineering — Frontend (5)
  { id: "e-001", name: "Arjun Mehta", email: "arjun.mehta@talentos.dev", role: "Senior Frontend Engineer", teamId: "team-frontend", deptId: "dept-eng", exp: 6, joining: "2020-03-15", skills: ["sk-react", "sk-typescript", "sk-nextjs", "sk-figma"], managerId: "e-005" },
  { id: "e-002", name: "Priya Sharma", email: "priya.sharma@talentos.dev", role: "Frontend Engineer", teamId: "team-frontend", deptId: "dept-eng", exp: 3, joining: "2022-07-01", skills: ["sk-react", "sk-typescript", "sk-css"], managerId: "e-005" },
  { id: "e-003", name: "Carlos Rivera", email: "carlos.rivera@talentos.dev", role: "Frontend Engineer", teamId: "team-frontend", deptId: "dept-eng", exp: 4, joining: "2021-11-08", skills: ["sk-react", "sk-typescript", "sk-nextjs"], managerId: "e-005" },
  { id: "e-004", name: "Yuki Tanaka", email: "yuki.tanaka@talentos.dev", role: "UI Engineer", teamId: "team-frontend", deptId: "dept-eng", exp: 2, joining: "2023-02-20", skills: ["sk-react", "sk-figma", "sk-typescript"], managerId: "e-005" },
  { id: "e-005", name: "Sarah Chen", email: "sarah.chen@talentos.dev", role: "Engineering Manager", teamId: "team-frontend", deptId: "dept-eng", exp: 9, joining: "2018-05-01", skills: ["sk-react", "sk-typescript", "sk-leadership", "sk-agile"], managerId: "e-020" },

  // Engineering — Backend (5)
  { id: "e-006", name: "David Kim", email: "david.kim@talentos.dev", role: "Senior Backend Engineer", teamId: "team-backend", deptId: "dept-eng", exp: 7, joining: "2019-09-10", skills: ["sk-go", "sk-python", "sk-postgres", "sk-docker"], managerId: "e-010" },
  { id: "e-007", name: "Amara Osei", email: "amara.osei@talentos.dev", role: "Backend Engineer", teamId: "team-backend", deptId: "dept-eng", exp: 4, joining: "2021-04-15", skills: ["sk-python", "sk-nodejs", "sk-postgres", "sk-docker"], managerId: "e-010" },
  { id: "e-008", name: "Lucas Fontaine", email: "lucas.fontaine@talentos.dev", role: "Backend Engineer", teamId: "team-backend", deptId: "dept-eng", exp: 3, joining: "2022-01-10", skills: ["sk-java", "sk-postgres", "sk-docker"], managerId: "e-010" },
  { id: "e-009", name: "Meera Nair", email: "meera.nair@talentos.dev", role: "API Engineer", teamId: "team-backend", deptId: "dept-eng", exp: 5, joining: "2020-08-01", skills: ["sk-nodejs", "sk-typescript", "sk-postgres"], managerId: "e-010" },
  { id: "e-010", name: "James Okonkwo", email: "james.okonkwo@talentos.dev", role: "Engineering Manager", teamId: "team-backend", deptId: "dept-eng", exp: 10, joining: "2017-06-01", skills: ["sk-go", "sk-python", "sk-leadership", "sk-agile"], managerId: "e-020" },

  // Engineering — Platform (5)
  { id: "e-011", name: "Ana Kovač", email: "ana.kovac@talentos.dev", role: "Platform Engineer", teamId: "team-platform", deptId: "dept-eng", exp: 6, joining: "2020-01-15", skills: ["sk-kubernetes", "sk-terraform", "sk-aws", "sk-docker"], managerId: "e-015" },
  { id: "e-012", name: "Noah Thompson", email: "noah.thompson@talentos.dev", role: "DevOps Engineer", teamId: "team-platform", deptId: "dept-eng", exp: 4, joining: "2021-09-01", skills: ["sk-kubernetes", "sk-docker", "sk-gcp"], managerId: "e-015" },
  { id: "e-013", name: "Fatima Al-Hassan", email: "fatima.alhassan@talentos.dev", role: "Cloud Engineer", teamId: "team-platform", deptId: "dept-eng", exp: 5, joining: "2020-11-15", skills: ["sk-aws", "sk-terraform", "sk-python"], managerId: "e-015" },
  { id: "e-014", name: "Raj Patel", email: "raj.patel@talentos.dev", role: "SRE", teamId: "team-platform", deptId: "dept-eng", exp: 7, joining: "2019-03-01", skills: ["sk-kubernetes", "sk-go", "sk-python", "sk-aws"], managerId: "e-015" },
  { id: "e-015", name: "Elena Vasquez", email: "elena.vasquez@talentos.dev", role: "Principal Engineer", teamId: "team-platform", deptId: "dept-eng", exp: 12, joining: "2016-07-01", skills: ["sk-kubernetes", "sk-terraform", "sk-leadership", "sk-aws", "sk-rust"], managerId: "e-020" },

  // Engineering — AI/ML (5)
  { id: "e-016", name: "Ben Zhou", email: "ben.zhou@talentos.dev", role: "ML Engineer", teamId: "team-aiml", deptId: "dept-eng", exp: 5, joining: "2020-06-01", skills: ["sk-python", "sk-ml", "sk-mlops", "sk-aws"], managerId: "e-020" },
  { id: "e-017", name: "Ingrid Lindström", email: "ingrid.lindstrom@talentos.dev", role: "ML Engineer", teamId: "team-aiml", deptId: "dept-eng", exp: 4, joining: "2021-07-15", skills: ["sk-python", "sk-ml", "sk-llm"], managerId: "e-020" },
  { id: "e-018", name: "Omar Abdullah", email: "omar.abdullah@talentos.dev", role: "LLM Engineer", teamId: "team-aiml", deptId: "dept-eng", exp: 3, joining: "2022-09-01", skills: ["sk-python", "sk-llm", "sk-mlops"], managerId: "e-020" },
  { id: "e-019", name: "Chioma Eze", email: "chioma.eze@talentos.dev", role: "Research Scientist", teamId: "team-aiml", deptId: "dept-eng", exp: 6, joining: "2019-10-01", skills: ["sk-python", "sk-ml", "sk-llm", "sk-spark"], managerId: "e-020" },
  { id: "e-020", name: "Max Wenger", email: "max.wenger@talentos.dev", role: "VP of Engineering", teamId: "team-aiml", deptId: "dept-eng", exp: 15, joining: "2015-01-01", skills: ["sk-python", "sk-leadership", "sk-agile", "sk-ml"], managerId: null },

  // Product — Design (5)
  { id: "e-021", name: "Sofia Martinez", email: "sofia.martinez@talentos.dev", role: "Product Designer", teamId: "team-design", deptId: "dept-product", exp: 5, joining: "2020-04-01", skills: ["sk-figma", "sk-ux", "sk-react"], managerId: "e-025" },
  { id: "e-022", name: "Kai Nakamura", email: "kai.nakamura@talentos.dev", role: "UX Designer", teamId: "team-design", deptId: "dept-product", exp: 4, joining: "2021-02-15", skills: ["sk-figma", "sk-ux"], managerId: "e-025" },
  { id: "e-023", name: "Grace O'Brien", email: "grace.obrien@talentos.dev", role: "Motion Designer", teamId: "team-design", deptId: "dept-product", exp: 3, joining: "2022-06-01", skills: ["sk-figma", "sk-react"], managerId: "e-025" },
  { id: "e-024", name: "Liam Adeyemi", email: "liam.adeyemi@talentos.dev", role: "Design Technologist", teamId: "team-design", deptId: "dept-product", exp: 5, joining: "2020-09-15", skills: ["sk-figma", "sk-react", "sk-typescript"], managerId: "e-025" },
  { id: "e-025", name: "Nadia Petrov", email: "nadia.petrov@talentos.dev", role: "Head of Design", teamId: "team-design", deptId: "dept-product", exp: 10, joining: "2017-03-01", skills: ["sk-figma", "sk-ux", "sk-leadership", "sk-product"], managerId: "e-030" },

  // Product — PM (5)
  { id: "e-026", name: "Tom Bradley", email: "tom.bradley@talentos.dev", role: "Product Manager", teamId: "team-pm", deptId: "dept-product", exp: 5, joining: "2020-02-01", skills: ["sk-product", "sk-agile", "sk-sql"], managerId: "e-030" },
  { id: "e-027", name: "Aiko Yamamoto", email: "aiko.yamamoto@talentos.dev", role: "Senior PM", teamId: "team-pm", deptId: "dept-product", exp: 7, joining: "2019-05-15", skills: ["sk-product", "sk-agile", "sk-sql", "sk-leadership"], managerId: "e-030" },
  { id: "e-028", name: "Felix Braun", email: "felix.braun@talentos.dev", role: "PM", teamId: "team-pm", deptId: "dept-product", exp: 3, joining: "2022-08-01", skills: ["sk-product", "sk-agile"], managerId: "e-030" },
  { id: "e-029", name: "Zara Ahmed", email: "zara.ahmed@talentos.dev", role: "Growth PM", teamId: "team-pm", deptId: "dept-product", exp: 4, joining: "2021-11-01", skills: ["sk-product", "sk-marketing", "sk-sql"], managerId: "e-030" },
  { id: "e-030", name: "Rachel Green", email: "rachel.green@talentos.dev", role: "VP of Product", teamId: "team-pm", deptId: "dept-product", exp: 12, joining: "2016-04-01", skills: ["sk-product", "sk-leadership", "sk-agile"], managerId: null },

  // Data & Analytics — Data Science (4)
  { id: "e-031", name: "Paulo Ferreira", email: "paulo.ferreira@talentos.dev", role: "Data Scientist", teamId: "team-datascience", deptId: "dept-data", exp: 5, joining: "2020-07-01", skills: ["sk-python", "sk-ml", "sk-sql", "sk-spark"], managerId: "e-034" },
  { id: "e-032", name: "Yuna Park", email: "yuna.park@talentos.dev", role: "Data Scientist", teamId: "team-datascience", deptId: "dept-data", exp: 4, joining: "2021-03-15", skills: ["sk-python", "sk-ml", "sk-sql"], managerId: "e-034" },
  { id: "e-033", name: "Miguel Santos", email: "miguel.santos@talentos.dev", role: "Senior Data Scientist", teamId: "team-datascience", deptId: "dept-data", exp: 7, joining: "2019-01-15", skills: ["sk-python", "sk-ml", "sk-spark", "sk-mlops"], managerId: "e-034" },
  { id: "e-034", name: "Layla Hassan", email: "layla.hassan@talentos.dev", role: "Head of Data Science", teamId: "team-datascience", deptId: "dept-data", exp: 10, joining: "2017-08-01", skills: ["sk-python", "sk-ml", "sk-leadership", "sk-sql"], managerId: null },

  // Data & Analytics — Analytics Engineering (4)
  { id: "e-035", name: "Alex Turner", email: "alex.turner@talentos.dev", role: "Analytics Engineer", teamId: "team-analyticseng", deptId: "dept-data", exp: 4, joining: "2021-05-01", skills: ["sk-sql", "sk-dbt", "sk-python"], managerId: "e-038" },
  { id: "e-036", name: "Nina Kowalski", email: "nina.kowalski@talentos.dev", role: "Analytics Engineer", teamId: "team-analyticseng", deptId: "dept-data", exp: 3, joining: "2022-04-01", skills: ["sk-sql", "sk-dbt", "sk-spark"], managerId: "e-038" },
  { id: "e-037", name: "Derek Jackson", email: "derek.jackson@talentos.dev", role: "Senior Analytics Engineer", teamId: "team-analyticseng", deptId: "dept-data", exp: 6, joining: "2020-01-15", skills: ["sk-sql", "sk-dbt", "sk-python", "sk-spark"], managerId: "e-038" },
  { id: "e-038", name: "Priti Shah", email: "priti.shah@talentos.dev", role: "Data Platform Lead", teamId: "team-analyticseng", deptId: "dept-data", exp: 9, joining: "2018-03-01", skills: ["sk-sql", "sk-spark", "sk-dbt", "sk-leadership"], managerId: "e-034" },

  // People & Culture (6)
  { id: "e-039", name: "Jordan Lee", email: "jordan.lee@talentos.dev", role: "Recruiter", teamId: "team-recruiting", deptId: "dept-people", exp: 4, joining: "2021-06-01", skills: ["sk-agile"], managerId: "e-043" },
  { id: "e-040", name: "Isabelle Dumont", email: "isabelle.dumont@talentos.dev", role: "Senior Recruiter", teamId: "team-recruiting", deptId: "dept-people", exp: 6, joining: "2019-11-15", skills: ["sk-agile", "sk-leadership"], managerId: "e-043" },
  { id: "e-041", name: "Kwame Asante", email: "kwame.asante@talentos.dev", role: "L&D Specialist", teamId: "team-ld", deptId: "dept-people", exp: 5, joining: "2020-09-01", skills: ["sk-agile", "sk-product"], managerId: "e-043" },
  { id: "e-042", name: "Tessa Morgan", email: "tessa.morgan@talentos.dev", role: "L&D Manager", teamId: "team-ld", deptId: "dept-people", exp: 7, joining: "2019-02-01", skills: ["sk-leadership", "sk-agile"], managerId: "e-043" },
  { id: "e-043", name: "Carmen Silva", email: "carmen.silva@talentos.dev", role: "VP of People", teamId: "team-recruiting", deptId: "dept-people", exp: 12, joining: "2016-01-01", skills: ["sk-leadership", "sk-agile"], managerId: null },
  { id: "e-044", name: "Ethan Price", email: "ethan.price@talentos.dev", role: "HR Business Partner", teamId: "team-recruiting", deptId: "dept-people", exp: 5, joining: "2020-10-15", skills: ["sk-agile"], managerId: "e-043" },

  // Sales & GTM (10)
  { id: "e-045", name: "Valentina Cruz", email: "valentina.cruz@talentos.dev", role: "Account Executive", teamId: "team-enterprise", deptId: "dept-sales", exp: 5, joining: "2020-03-01", skills: ["sk-sales"], managerId: "e-049" },
  { id: "e-046", name: "Jason Wu", email: "jason.wu@talentos.dev", role: "Account Executive", teamId: "team-enterprise", deptId: "dept-sales", exp: 6, joining: "2019-08-15", skills: ["sk-sales", "sk-leadership"], managerId: "e-049" },
  { id: "e-047", name: "Amelia Scott", email: "amelia.scott@talentos.dev", role: "Sales Engineer", teamId: "team-enterprise", deptId: "dept-sales", exp: 4, joining: "2021-01-15", skills: ["sk-sales", "sk-python"], managerId: "e-049" },
  { id: "e-048", name: "Louis Petit", email: "louis.petit@talentos.dev", role: "SDR", teamId: "team-enterprise", deptId: "dept-sales", exp: 2, joining: "2023-06-01", skills: ["sk-sales"], managerId: "e-049" },
  { id: "e-049", name: "Marcus Johnson", email: "marcus.johnson@talentos.dev", role: "VP of Sales", teamId: "team-enterprise", deptId: "dept-sales", exp: 13, joining: "2015-06-01", skills: ["sk-sales", "sk-leadership"], managerId: null },
  { id: "e-050", name: "Hannah Park", email: "hannah.park@talentos.dev", role: "Marketing Manager", teamId: "team-marketing", deptId: "dept-sales", exp: 5, joining: "2020-05-15", skills: ["sk-marketing", "sk-sql"], managerId: "e-054" },
  { id: "e-051", name: "Ravi Kumar", email: "ravi.kumar@talentos.dev", role: "Content Strategist", teamId: "team-marketing", deptId: "dept-sales", exp: 4, joining: "2021-07-01", skills: ["sk-marketing"], managerId: "e-054" },
  { id: "e-052", name: "Olivia Brown", email: "olivia.brown@talentos.dev", role: "Growth Analyst", teamId: "team-marketing", deptId: "dept-sales", exp: 3, joining: "2022-09-15", skills: ["sk-marketing", "sk-sql", "sk-python"], managerId: "e-054" },
  { id: "e-053", name: "Ibrahim Diallo", email: "ibrahim.diallo@talentos.dev", role: "Demand Gen Manager", teamId: "team-marketing", deptId: "dept-sales", exp: 6, joining: "2019-12-01", skills: ["sk-marketing", "sk-sql"], managerId: "e-054" },
  { id: "e-054", name: "Victoria Hall", email: "victoria.hall@talentos.dev", role: "CMO", teamId: "team-marketing", deptId: "dept-sales", exp: 14, joining: "2015-09-01", skills: ["sk-marketing", "sk-leadership", "sk-product"], managerId: null },

  // Operations (8)
  { id: "e-055", name: "Aaron Mitchell", email: "aaron.mitchell@talentos.dev", role: "Financial Analyst", teamId: "team-finance", deptId: "dept-ops", exp: 4, joining: "2021-03-01", skills: ["sk-finance", "sk-sql"], managerId: "e-058" },
  { id: "e-056", name: "Diana Chen", email: "diana.chen@talentos.dev", role: "Finance Manager", teamId: "team-finance", deptId: "dept-ops", exp: 8, joining: "2018-07-01", skills: ["sk-finance", "sk-leadership"], managerId: "e-058" },
  { id: "e-057", name: "Samuel Obi", email: "samuel.obi@talentos.dev", role: "FP&A", teamId: "team-finance", deptId: "dept-ops", exp: 5, joining: "2020-06-15", skills: ["sk-finance", "sk-sql", "sk-python"], managerId: "e-058" },
  { id: "e-058", name: "Robert Chang", email: "robert.chang@talentos.dev", role: "CFO", teamId: "team-finance", deptId: "dept-ops", exp: 16, joining: "2014-01-01", skills: ["sk-finance", "sk-leadership"], managerId: null },
  { id: "e-059", name: "Claudia Weber", email: "claudia.weber@talentos.dev", role: "Legal Counsel", teamId: "team-legal", deptId: "dept-ops", exp: 7, joining: "2019-04-15", skills: ["sk-legal"], managerId: "e-060" },
  { id: "e-060", name: "Patrick Moore", email: "patrick.moore@talentos.dev", role: "General Counsel", teamId: "team-legal", deptId: "dept-ops", exp: 14, joining: "2015-07-01", skills: ["sk-legal", "sk-leadership"], managerId: null },
  { id: "e-061", name: "Sven Andersen", email: "sven.andersen@talentos.dev", role: "IT Manager", teamId: "team-it", deptId: "dept-ops", exp: 8, joining: "2018-10-01", skills: ["sk-kubernetes", "sk-aws", "sk-leadership"], managerId: null },
  { id: "e-062", name: "Mei Lin", email: "mei.lin@talentos.dev", role: "IT Engineer", teamId: "team-it", deptId: "dept-ops", exp: 3, joining: "2022-11-15", skills: ["sk-docker", "sk-aws"], managerId: "e-061" },
];

// Project membership — who works on which project
const PROJECT_MEMBERS: Array<{ projId: string; empIds: string[] }> = [
  { projId: "proj-phoenix", empIds: ["e-001", "e-002", "e-006", "e-007", "e-016", "e-021", "e-026", "e-031", "e-011", "e-014"] },
  { projId: "proj-atlas", empIds: ["e-011", "e-012", "e-013", "e-003", "e-009", "e-014", "e-035", "e-036"] },
  { projId: "proj-nova", empIds: ["e-016", "e-017", "e-018", "e-019", "e-031", "e-032", "e-033"] },
  { projId: "proj-horizon", empIds: ["e-004", "e-005", "e-022", "e-023", "e-024", "e-026", "e-027"] },
  { projId: "proj-pulse", empIds: ["e-035", "e-036", "e-037", "e-050", "e-052", "e-029"] },
  { projId: "proj-forge", empIds: ["e-008", "e-009", "e-012", "e-061", "e-062"] },
];

// Mentor relationships
const MENTORS: Array<{ mentorId: string; menteeId: string }> = [
  { mentorId: "e-020", menteeId: "e-018" },
  { mentorId: "e-015", menteeId: "e-011" },
  { mentorId: "e-005", menteeId: "e-002" },
  { mentorId: "e-034", menteeId: "e-031" },
  { mentorId: "e-025", menteeId: "e-023" },
];

// ─── Auth Users ──────────────────────────────────────────────────────────────

const AUTH_USERS = [
  { id: uid(), name: "Admin", email: "admin@talentos.dev", role: "ADMIN", department: "Engineering", passwordHash: hash(ADMIN_PASSWORD) },
  { id: uid(), name: "HR Manager", email: "manager@talentos.dev", role: "HR_MANAGER", department: "People & Culture", passwordHash: hash(MANAGER_PASSWORD) },
  { id: uid(), name: "Employee Demo", email: "employee@talentos.dev", role: "EMPLOYEE", department: "Engineering", passwordHash: hash(EMPLOYEE_PASSWORD) },
];

// ─── Seed Function ───────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 TalentOS Seed Script Starting...");
  console.log(`   Target: ${NEO4J_URI}`);

  const driver = neo4j.driver(
    NEO4J_URI,
    neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
  );
  const session = driver.session({ database: NEO4J_DATABASE });

  try {
    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await session.run("MATCH (n) DETACH DELETE n");

    // Departments
    console.log("🏢 Creating departments...");
    for (const dept of DEPARTMENTS) {
      await session.run(
        "CREATE (:Department {id: $id, name: $name})",
        dept
      );
    }

    // Teams
    console.log("👥 Creating teams...");
    for (const team of TEAMS) {
      await session.run(
        `CREATE (:Team {id: $id, name: $name, departmentId: $deptId})`,
        team
      );
      await session.run(
        `MATCH (t:Team {id: $teamId}), (d:Department {id: $deptId})
         CREATE (t)-[:BELONGS_TO]->(d)`,
        { teamId: team.id, deptId: team.deptId }
      );
    }

    // Skills
    console.log("🛠️  Creating skills...");
    for (const skill of SKILLS) {
      await session.run(
        "CREATE (:Skill {id: $id, name: $name, category: $category})",
        skill
      );
    }

    // Projects
    console.log("📋 Creating projects...");
    for (const proj of PROJECTS) {
      await session.run(
        "CREATE (:Project {id: $id, name: $name, status: $status})",
        proj
      );
    }

    // Employees
    console.log("👤 Creating 62 employees...");
    for (const emp of EMPLOYEES) {
      // Generate DiceBear avatar URL (uses employee ID as seed for consistency)
      const photoUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${emp.id}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

      await session.run(
        `CREATE (:Employee {
          id: $id, name: $name, email: $email,
          role: $role, teamId: $teamId, departmentId: $deptId,
          experience: $exp, joiningDate: $joining,
          photoUrl: $photoUrl, isActive: true,
          managerId: $managerId
        })`,
        { ...emp, photoUrl, managerId: emp.managerId ?? null }
      );

      // Team membership
      await session.run(
        `MATCH (e:Employee {id: $empId}), (t:Team {id: $teamId})
         CREATE (e)-[:MEMBER_OF {since: $since}]->(t)`,
        { empId: emp.id, teamId: emp.teamId, since: emp.joining }
      );

      // Skills
      for (const skillId of emp.skills) {
        const levels = ["INTERMEDIATE", "ADVANCED", "EXPERT"];
        const level = levels[Math.floor(Math.random() * levels.length)];
        await session.run(
          `MATCH (e:Employee {id: $empId}), (s:Skill {id: $skillId})
           CREATE (e)-[:HAS_SKILL {level: $level, verifiedAt: $date}]->(s)`,
          { empId: emp.id, skillId, level, date: emp.joining }
        );
      }

      // Manager relationship
      if (emp.managerId) {
        await session.run(
          `MATCH (e:Employee {id: $empId}), (m:Employee {id: $managerId})
           CREATE (e)-[:REPORTS_TO]->(m)`,
          { empId: emp.id, managerId: emp.managerId }
        );
      }
    }

    // Project memberships
    console.log("📌 Creating project memberships...");
    for (const pm of PROJECT_MEMBERS) {
      for (const empId of pm.empIds) {
        await session.run(
          `MATCH (e:Employee {id: $empId}), (p:Project {id: $projId})
           MERGE (e)-[:WORKS_ON {since: '2023-01-01'}]->(p)`,
          { empId, projId: pm.projId }
        );
      }

      // Create COLLABORATED_WITH relationships between project members
      for (let i = 0; i < pm.empIds.length; i++) {
        for (let j = i + 1; j < pm.empIds.length; j++) {
          await session.run(
            `MATCH (a:Employee {id: $id1}), (b:Employee {id: $id2})
             MERGE (a)-[:COLLABORATED_WITH {projectId: $projId}]->(b)`,
            { id1: pm.empIds[i], id2: pm.empIds[j], projId: pm.projId }
          );
        }
      }
    }

    // Mentor relationships
    console.log("🎓 Creating mentor relationships...");
    for (const m of MENTORS) {
      await session.run(
        `MATCH (mentor:Employee {id: $mentorId}), (mentee:Employee {id: $menteeId})
         CREATE (mentor)-[:MENTORS]->(mentee)`,
        m
      );
    }

    // Auth users
    console.log("🔐 Creating auth users...");
    for (const user of AUTH_USERS) {
      await session.run(
        `CREATE (:User {id: $id, name: $name, email: $email, role: $role, department: $department, passwordHash: $passwordHash, photoUrl: ''})`,
        user
      );
    }

    // Indexes for performance
    console.log("📑 Creating indexes...");
    await session.run("CREATE INDEX employee_id IF NOT EXISTS FOR (e:Employee) ON (e.id)");
    await session.run("CREATE INDEX employee_email IF NOT EXISTS FOR (e:Employee) ON (e.email)");
    await session.run("CREATE INDEX user_email IF NOT EXISTS FOR (u:User) ON (u.email)");
    await session.run("CREATE INDEX skill_name IF NOT EXISTS FOR (s:Skill) ON (s.name)");
    await session.run("CREATE INDEX project_id IF NOT EXISTS FOR (p:Project) ON (p.id)");

    const empCount = await session.run("MATCH (e:Employee) RETURN count(e) AS count");
    const skillCount = await session.run("MATCH (s:Skill) RETURN count(s) AS count");
    const relCount = await session.run("MATCH ()-[r]->() RETURN count(r) AS count");

    console.log("\n✅ Seed complete!");
    console.log(`   Employees: ${empCount.records[0].get("count")}`);
    console.log(`   Skills: ${skillCount.records[0].get("count")}`);
    console.log(`   Relationships: ${relCount.records[0].get("count")}`);
    console.log("\n🔐 Demo accounts:");
    console.log("   admin@talentos.dev / demo123");
    console.log("   manager@talentos.dev / demo123");
    console.log("   employee@talentos.dev / demo123");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await session.close();
    await driver.close();
  }
}

seed();
