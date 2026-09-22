import crypto from "crypto";

export interface Department {
  id: string;
  name: string;
}

export interface Team {
  id: string;
  name: string;
  deptId: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface Project {
  id: string;
  name: string;
  status: "ACTIVE" | "COMPLETED" | "PAUSED";
}

export interface EmployeeRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  teamId: string;
  deptId: string;
  department: string;
  team: string;
  experience: number;
  joiningDate: string;
  skills: string[];
  managerId: string | null;
  photoUrl: string;
  flightRisk?: "LOW" | "MEDIUM" | "HIGH";
  riskScore?: number;
  riskFactor?: string;
  performanceRating?: number;
  bio?: string;
}

export const DEPARTMENTS: Department[] = [
  { id: "dept-eng", name: "Engineering" },
  { id: "dept-product", name: "Product" },
  { id: "dept-data", name: "Data & Analytics" },
  { id: "dept-people", name: "People & Culture" },
  { id: "dept-sales", name: "Sales & GTM" },
  { id: "dept-ops", name: "Operations" },
];

export const TEAMS: Team[] = [
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

export const SKILLS: Skill[] = [
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

export const PROJECTS: Project[] = [
  { id: "proj-phoenix", name: "Project Phoenix", status: "ACTIVE" },
  { id: "proj-atlas", name: "Atlas Platform", status: "ACTIVE" },
  { id: "proj-nova", name: "Nova ML Pipeline", status: "ACTIVE" },
  { id: "proj-horizon", name: "Horizon Dashboard", status: "COMPLETED" },
  { id: "proj-pulse", name: "Pulse Analytics", status: "ACTIVE" },
  { id: "proj-forge", name: "DevForge", status: "PAUSED" },
];

export const PROJECT_MEMBERS: Array<{ projId: string; empIds: string[] }> = [
  { projId: "proj-phoenix", empIds: ["e-001", "e-002", "e-006", "e-007", "e-016", "e-021", "e-026", "e-031", "e-011", "e-014"] },
  { projId: "proj-atlas", empIds: ["e-011", "e-012", "e-013", "e-003", "e-009", "e-014", "e-035", "e-036"] },
  { projId: "proj-nova", empIds: ["e-016", "e-017", "e-018", "e-019", "e-031", "e-032", "e-033"] },
  { projId: "proj-horizon", empIds: ["e-004", "e-005", "e-022", "e-023", "e-024", "e-026", "e-027"] },
  { projId: "proj-pulse", empIds: ["e-035", "e-036", "e-037", "e-050", "e-052", "e-029"] },
  { projId: "proj-forge", empIds: ["e-008", "e-009", "e-012", "e-061", "e-062"] },
];

export const MENTORS: Array<{ mentorId: string; menteeId: string }> = [
  { mentorId: "e-020", menteeId: "e-018" },
  { mentorId: "e-015", menteeId: "e-011" },
  { mentorId: "e-005", menteeId: "e-002" },
  { mentorId: "e-034", menteeId: "e-031" },
  { mentorId: "e-025", menteeId: "e-023" },
];

const RAW_EMPLOYEES = [
  // Engineering — Frontend
  { id: "e-001", name: "Arjun Mehta", email: "arjun.mehta@talentos.dev", role: "Senior Frontend Engineer", teamId: "team-frontend", deptId: "dept-eng", exp: 6, joining: "2020-03-15", skills: ["sk-react", "sk-typescript", "sk-nextjs", "sk-figma"], managerId: "e-005", risk: "LOW", score: 0.12, rating: 4.8 },
  { id: "e-002", name: "Priya Sharma", email: "priya.sharma@talentos.dev", role: "Frontend Engineer", teamId: "team-frontend", deptId: "dept-eng", exp: 3, joining: "2022-07-01", skills: ["sk-react", "sk-typescript"], managerId: "e-005", risk: "LOW", score: 0.22, rating: 4.5 },
  { id: "e-003", name: "Carlos Rivera", email: "carlos.rivera@talentos.dev", role: "Frontend Engineer", teamId: "team-frontend", deptId: "dept-eng", exp: 4, joining: "2021-11-08", skills: ["sk-react", "sk-typescript", "sk-nextjs"], managerId: "e-005", risk: "HIGH", score: 0.84, riskFactor: "Compensation band mismatch & high recruiter activity", rating: 4.6 },
  { id: "e-004", name: "Yuki Tanaka", email: "yuki.tanaka@talentos.dev", role: "UI Engineer", teamId: "team-frontend", deptId: "dept-eng", exp: 2, joining: "2023-02-20", skills: ["sk-react", "sk-figma", "sk-typescript"], managerId: "e-005", risk: "LOW", score: 0.15, rating: 4.3 },
  { id: "e-005", name: "Sarah Chen", email: "sarah.chen@talentos.dev", role: "Engineering Manager", teamId: "team-frontend", deptId: "dept-eng", exp: 9, joining: "2018-05-01", skills: ["sk-react", "sk-typescript", "sk-leadership", "sk-agile"], managerId: "e-020", risk: "LOW", score: 0.08, rating: 4.9 },

  // Engineering — Backend
  { id: "e-006", name: "David Kim", email: "david.kim@talentos.dev", role: "Senior Backend Engineer", teamId: "team-backend", deptId: "dept-eng", exp: 7, joining: "2019-09-10", skills: ["sk-go", "sk-python", "sk-postgres", "sk-docker"], managerId: "e-010", risk: "MEDIUM", score: 0.58, riskFactor: "Project bottleneck workload > 55h/week", rating: 4.7 },
  { id: "e-007", name: "Amara Osei", email: "amara.osei@talentos.dev", role: "Backend Engineer", teamId: "team-backend", deptId: "dept-eng", exp: 4, joining: "2021-04-15", skills: ["sk-python", "sk-nodejs", "sk-postgres", "sk-docker"], managerId: "e-010", risk: "LOW", score: 0.19, rating: 4.4 },
  { id: "e-008", name: "Lucas Fontaine", email: "lucas.fontaine@talentos.dev", role: "Backend Engineer", teamId: "team-backend", deptId: "dept-eng", exp: 3, joining: "2022-01-10", skills: ["sk-java", "sk-postgres", "sk-docker"], managerId: "e-010", risk: "LOW", score: 0.14, rating: 4.2 },
  { id: "e-009", name: "Meera Nair", email: "meera.nair@talentos.dev", role: "API Engineer", teamId: "team-backend", deptId: "dept-eng", exp: 5, joining: "2020-08-01", skills: ["sk-nodejs", "sk-typescript", "sk-postgres"], managerId: "e-010", risk: "LOW", score: 0.25, rating: 4.6 },
  { id: "e-010", name: "James Okonkwo", email: "james.okonkwo@talentos.dev", role: "Engineering Manager", teamId: "team-backend", deptId: "dept-eng", exp: 10, joining: "2017-06-01", skills: ["sk-go", "sk-python", "sk-leadership", "sk-agile"], managerId: "e-020", risk: "LOW", score: 0.11, rating: 4.8 },

  // Engineering — Platform
  { id: "e-011", name: "Ana Kovač", email: "ana.kovac@talentos.dev", role: "Platform Engineer", teamId: "team-platform", deptId: "dept-eng", exp: 6, joining: "2020-01-15", skills: ["sk-kubernetes", "sk-terraform", "sk-aws", "sk-docker"], managerId: "e-015", risk: "LOW", score: 0.18, rating: 4.7 },
  { id: "e-012", name: "Noah Thompson", email: "noah.thompson@talentos.dev", role: "DevOps Engineer", teamId: "team-platform", deptId: "dept-eng", exp: 4, joining: "2021-09-01", skills: ["sk-kubernetes", "sk-docker", "sk-gcp"], managerId: "e-015", risk: "LOW", score: 0.21, rating: 4.4 },
  { id: "e-013", name: "Fatima Al-Hassan", email: "fatima.alhassan@talentos.dev", role: "Cloud Engineer", teamId: "team-platform", deptId: "dept-eng", exp: 5, joining: "2020-11-15", skills: ["sk-aws", "sk-terraform", "sk-python"], managerId: "e-015", risk: "LOW", score: 0.16, rating: 4.5 },
  { id: "e-014", name: "Raj Patel", email: "raj.patel@talentos.dev", role: "SRE", teamId: "team-platform", deptId: "dept-eng", exp: 7, joining: "2019-03-01", skills: ["sk-kubernetes", "sk-go", "sk-python", "sk-aws"], managerId: "e-015", risk: "HIGH", score: 0.79, riskFactor: "On-call fatigue & missed promotion review", rating: 4.8 },
  { id: "e-015", name: "Elena Vasquez", email: "elena.vasquez@talentos.dev", role: "Principal Engineer", teamId: "team-platform", deptId: "dept-eng", exp: 12, joining: "2016-07-01", skills: ["sk-kubernetes", "sk-terraform", "sk-leadership", "sk-aws", "sk-rust"], managerId: "e-020", risk: "LOW", score: 0.05, rating: 5.0 },

  // Engineering — AI/ML
  { id: "e-016", name: "Ben Zhou", email: "ben.zhou@talentos.dev", role: "ML Engineer", teamId: "team-aiml", deptId: "dept-eng", exp: 5, joining: "2020-06-01", skills: ["sk-python", "sk-ml", "sk-mlops", "sk-aws"], managerId: "e-020", risk: "LOW", score: 0.20, rating: 4.7 },
  { id: "e-017", name: "Ingrid Lindström", email: "ingrid.lindstrom@talentos.dev", role: "ML Engineer", teamId: "team-aiml", deptId: "dept-eng", exp: 4, joining: "2021-07-15", skills: ["sk-python", "sk-ml", "sk-llm"], managerId: "e-020", risk: "LOW", score: 0.23, rating: 4.5 },
  { id: "e-018", name: "Omar Abdullah", email: "omar.abdullah@talentos.dev", role: "LLM Engineer", teamId: "team-aiml", deptId: "dept-eng", exp: 3, joining: "2022-09-01", skills: ["sk-python", "sk-llm", "sk-mlops"], managerId: "e-020", risk: "HIGH", score: 0.88, riskFactor: "Extreme market demand for LLM engineers + low equity stake", rating: 4.9 },
  { id: "e-019", name: "Chioma Eze", email: "chioma.eze@talentos.dev", role: "Research Scientist", teamId: "team-aiml", deptId: "dept-eng", exp: 6, joining: "2019-10-01", skills: ["sk-python", "sk-ml", "sk-llm", "sk-spark"], managerId: "e-020", risk: "LOW", score: 0.17, rating: 4.9 },
  { id: "e-020", name: "Max Wenger", email: "max.wenger@talentos.dev", role: "VP of Engineering", teamId: "team-aiml", deptId: "dept-eng", exp: 15, joining: "2015-01-01", skills: ["sk-python", "sk-leadership", "sk-agile", "sk-ml"], managerId: null, risk: "LOW", score: 0.04, rating: 5.0 },

  // Product — Design
  { id: "e-021", name: "Sofia Martinez", email: "sofia.martinez@talentos.dev", role: "Product Designer", teamId: "team-design", deptId: "dept-product", exp: 5, joining: "2020-04-01", skills: ["sk-figma", "sk-ux", "sk-react"], managerId: "e-025", risk: "LOW", score: 0.15, rating: 4.6 },
  { id: "e-022", name: "Kai Nakamura", email: "kai.nakamura@talentos.dev", role: "UX Designer", teamId: "team-design", deptId: "dept-product", exp: 4, joining: "2021-02-15", skills: ["sk-figma", "sk-ux"], managerId: "e-025", risk: "LOW", score: 0.18, rating: 4.4 },
  { id: "e-023", name: "Grace O'Brien", email: "grace.obrien@talentos.dev", role: "Motion Designer", teamId: "team-design", deptId: "dept-product", exp: 3, joining: "2022-06-01", skills: ["sk-figma", "sk-react"], managerId: "e-025", risk: "LOW", score: 0.22, rating: 4.5 },
  { id: "e-024", name: "Liam Adeyemi", email: "liam.adeyemi@talentos.dev", role: "Design Technologist", teamId: "team-design", deptId: "dept-product", exp: 5, joining: "2020-09-15", skills: ["sk-figma", "sk-react", "sk-typescript"], managerId: "e-025", risk: "LOW", score: 0.16, rating: 4.7 },
  { id: "e-025", name: "Nadia Petrov", email: "nadia.petrov@talentos.dev", role: "Head of Design", teamId: "team-design", deptId: "dept-product", exp: 10, joining: "2017-03-01", skills: ["sk-figma", "sk-ux", "sk-leadership", "sk-product"], managerId: "e-030", risk: "LOW", score: 0.09, rating: 4.9 },

  // Product — PM
  { id: "e-026", name: "Tom Bradley", email: "tom.bradley@talentos.dev", role: "Product Manager", teamId: "team-pm", deptId: "dept-product", exp: 5, joining: "2020-02-01", skills: ["sk-product", "sk-agile", "sk-sql"], managerId: "e-030", risk: "LOW", score: 0.25, rating: 4.5 },
  { id: "e-027", name: "Aiko Yamamoto", email: "aiko.yamamoto@talentos.dev", role: "Senior PM", teamId: "team-pm", deptId: "dept-product", exp: 7, joining: "2019-05-15", skills: ["sk-product", "sk-agile", "sk-sql", "sk-leadership"], managerId: "e-030", risk: "LOW", score: 0.13, rating: 4.8 },
  { id: "e-028", name: "Felix Braun", email: "felix.braun@talentos.dev", role: "PM", teamId: "team-pm", deptId: "dept-product", exp: 3, joining: "2022-08-01", skills: ["sk-product", "sk-agile"], managerId: "e-030", risk: "MEDIUM", score: 0.45, riskFactor: "Under-resourced project scope", rating: 4.3 },
  { id: "e-029", name: "Zara Ahmed", email: "zara.ahmed@talentos.dev", role: "Growth PM", teamId: "team-pm", deptId: "dept-product", exp: 4, joining: "2021-11-01", skills: ["sk-product", "sk-marketing", "sk-sql"], managerId: "e-030", risk: "LOW", score: 0.20, rating: 4.6 },
  { id: "e-030", name: "Rachel Green", email: "rachel.green@talentos.dev", role: "VP of Product", teamId: "team-pm", deptId: "dept-product", exp: 12, joining: "2016-04-01", skills: ["sk-product", "sk-leadership", "sk-agile"], managerId: null, risk: "LOW", score: 0.06, rating: 4.9 },

  // Data & Analytics
  { id: "e-031", name: "Paulo Ferreira", email: "paulo.ferreira@talentos.dev", role: "Data Scientist", teamId: "team-datascience", deptId: "dept-data", exp: 5, joining: "2020-07-01", skills: ["sk-python", "sk-ml", "sk-sql", "sk-spark"], managerId: "e-034", risk: "LOW", score: 0.15, rating: 4.6 },
  { id: "e-032", name: "Yuna Park", email: "yuna.park@talentos.dev", role: "Data Scientist", teamId: "team-datascience", deptId: "dept-data", exp: 4, joining: "2021-03-15", skills: ["sk-python", "sk-ml", "sk-sql"], managerId: "e-034", risk: "LOW", score: 0.18, rating: 4.4 },
  { id: "e-033", name: "Miguel Santos", email: "miguel.santos@talentos.dev", role: "Senior Data Scientist", teamId: "team-datascience", deptId: "dept-data", exp: 7, joining: "2019-01-15", skills: ["sk-python", "sk-ml", "sk-spark", "sk-mlops"], managerId: "e-034", risk: "LOW", score: 0.12, rating: 4.8 },
  { id: "e-034", name: "Layla Hassan", email: "layla.hassan@talentos.dev", role: "Head of Data Science", teamId: "team-datascience", deptId: "dept-data", exp: 10, joining: "2017-08-01", skills: ["sk-python", "sk-ml", "sk-leadership", "sk-sql"], managerId: null, risk: "LOW", score: 0.07, rating: 5.0 },
  { id: "e-035", name: "Alex Turner", email: "alex.turner@talentos.dev", role: "Analytics Engineer", teamId: "team-analyticseng", deptId: "dept-data", exp: 4, joining: "2021-05-01", skills: ["sk-sql", "sk-dbt", "sk-python"], managerId: "e-038", risk: "LOW", score: 0.22, rating: 4.5 },
  { id: "e-036", name: "Nina Kowalski", email: "nina.kowalski@talentos.dev", role: "Analytics Engineer", teamId: "team-analyticseng", deptId: "dept-data", exp: 3, joining: "2022-04-01", skills: ["sk-sql", "sk-dbt", "sk-spark"], managerId: "e-038", risk: "LOW", score: 0.16, rating: 4.3 },
  { id: "e-037", name: "Derek Jackson", email: "derek.jackson@talentos.dev", role: "Senior Analytics Engineer", teamId: "team-analyticseng", deptId: "dept-data", exp: 6, joining: "2020-01-15", skills: ["sk-sql", "sk-dbt", "sk-python", "sk-spark"], managerId: "e-038", risk: "LOW", score: 0.14, rating: 4.7 },
  { id: "e-038", name: "Priti Shah", email: "priti.shah@talentos.dev", role: "Data Platform Lead", teamId: "team-analyticseng", deptId: "dept-data", exp: 9, joining: "2018-03-01", skills: ["sk-sql", "sk-spark", "sk-dbt", "sk-leadership"], managerId: "e-034", risk: "LOW", score: 0.08, rating: 4.8 },

  // People & Culture
  { id: "e-039", name: "Jordan Lee", email: "jordan.lee@talentos.dev", role: "Recruiter", teamId: "team-recruiting", deptId: "dept-people", exp: 4, joining: "2021-06-01", skills: ["sk-agile"], managerId: "e-043", risk: "LOW", score: 0.19, rating: 4.4 },
  { id: "e-040", name: "Isabelle Dumont", email: "isabelle.dumont@talentos.dev", role: "Senior Recruiter", teamId: "team-recruiting", deptId: "dept-people", exp: 6, joining: "2019-11-15", skills: ["sk-agile", "sk-leadership"], managerId: "e-043", risk: "LOW", score: 0.11, rating: 4.7 },
  { id: "e-041", name: "Kwame Asante", email: "kwame.asante@talentos.dev", role: "L&D Specialist", teamId: "team-ld", deptId: "dept-people", exp: 5, joining: "2020-09-01", skills: ["sk-agile", "sk-product"], managerId: "e-043", risk: "LOW", score: 0.15, rating: 4.5 },
  { id: "e-042", name: "Tessa Morgan", email: "tessa.morgan@talentos.dev", role: "L&D Manager", teamId: "team-ld", deptId: "dept-people", exp: 7, joining: "2019-02-01", skills: ["sk-leadership", "sk-agile"], managerId: "e-043", risk: "LOW", score: 0.10, rating: 4.8 },
  { id: "e-043", name: "Carmen Silva", email: "carmen.silva@talentos.dev", role: "VP of People", teamId: "team-recruiting", deptId: "dept-people", exp: 12, joining: "2016-01-01", skills: ["sk-leadership", "sk-agile"], managerId: null, risk: "LOW", score: 0.05, rating: 5.0 },
  { id: "e-044", name: "Ethan Price", email: "ethan.price@talentos.dev", role: "HR Business Partner", teamId: "team-recruiting", deptId: "dept-people", exp: 5, joining: "2020-10-15", skills: ["sk-agile"], managerId: "e-043", risk: "LOW", score: 0.16, rating: 4.6 },

  // Sales & GTM
  { id: "e-045", name: "Valentina Cruz", email: "valentina.cruz@talentos.dev", role: "Account Executive", teamId: "team-enterprise", deptId: "dept-sales", exp: 5, joining: "2020-03-01", skills: ["sk-sales"], managerId: "e-049", risk: "LOW", score: 0.20, rating: 4.7 },
  { id: "e-046", name: "Jason Wu", email: "jason.wu@talentos.dev", role: "Account Executive", teamId: "team-enterprise", deptId: "dept-sales", exp: 6, joining: "2019-08-15", skills: ["sk-sales", "sk-leadership"], managerId: "e-049", risk: "LOW", score: 0.13, rating: 4.8 },
  { id: "e-047", name: "Amelia Scott", email: "amelia.scott@talentos.dev", role: "Sales Engineer", teamId: "team-enterprise", deptId: "dept-sales", exp: 4, joining: "2021-01-15", skills: ["sk-sales", "sk-python"], managerId: "e-049", risk: "LOW", score: 0.17, rating: 4.6 },
  { id: "e-048", name: "Louis Petit", email: "louis.petit@talentos.dev", role: "SDR", teamId: "team-enterprise", deptId: "dept-sales", exp: 2, joining: "2023-06-01", skills: ["sk-sales"], managerId: "e-049", risk: "MEDIUM", score: 0.42, riskFactor: "Quota ramp-up pressure", rating: 4.1 },
  { id: "e-049", name: "Marcus Johnson", email: "marcus.johnson@talentos.dev", role: "VP of Sales", teamId: "team-enterprise", deptId: "dept-sales", exp: 13, joining: "2015-06-01", skills: ["sk-sales", "sk-leadership"], managerId: null, risk: "LOW", score: 0.05, rating: 4.9 },
  { id: "e-050", name: "Hannah Park", email: "hannah.park@talentos.dev", role: "Marketing Manager", teamId: "team-marketing", deptId: "dept-sales", exp: 5, joining: "2020-05-15", skills: ["sk-marketing", "sk-sql"], managerId: "e-054", risk: "LOW", score: 0.18, rating: 4.6 },
  { id: "e-051", name: "Ravi Kumar", email: "ravi.kumar@talentos.dev", role: "Content Strategist", teamId: "team-marketing", deptId: "dept-sales", exp: 4, joining: "2021-07-01", skills: ["sk-marketing"], managerId: "e-054", risk: "LOW", score: 0.14, rating: 4.5 },
  { id: "e-052", name: "Olivia Brown", email: "olivia.brown@talentos.dev", role: "Growth Analyst", teamId: "team-marketing", deptId: "dept-sales", exp: 3, joining: "2022-09-15", skills: ["sk-marketing", "sk-sql", "sk-python"], managerId: "e-054", risk: "LOW", score: 0.22, rating: 4.4 },
  { id: "e-053", name: "Ibrahim Diallo", email: "ibrahim.diallo@talentos.dev", role: "Demand Gen Manager", teamId: "team-marketing", deptId: "dept-sales", exp: 6, joining: "2019-12-01", skills: ["sk-marketing", "sk-sql"], managerId: "e-054", risk: "LOW", score: 0.12, rating: 4.7 },
  { id: "e-054", name: "Victoria Hall", email: "victoria.hall@talentos.dev", role: "CMO", teamId: "team-marketing", deptId: "dept-sales", exp: 14, joining: "2015-09-01", skills: ["sk-marketing", "sk-leadership", "sk-product"], managerId: null, risk: "LOW", score: 0.05, rating: 4.9 },

  // Operations
  { id: "e-055", name: "Aaron Mitchell", email: "aaron.mitchell@talentos.dev", role: "Financial Analyst", teamId: "team-finance", deptId: "dept-ops", exp: 4, joining: "2021-03-01", skills: ["sk-finance", "sk-sql"], managerId: "e-058", risk: "LOW", score: 0.17, rating: 4.5 },
  { id: "e-056", name: "Diana Chen", email: "diana.chen@talentos.dev", role: "Finance Manager", teamId: "team-finance", deptId: "dept-ops", exp: 8, joining: "2018-07-01", skills: ["sk-finance", "sk-leadership"], managerId: "e-058", risk: "LOW", score: 0.09, rating: 4.8 },
  { id: "e-057", name: "Samuel Obi", email: "samuel.obi@talentos.dev", role: "FP&A", teamId: "team-finance", deptId: "dept-ops", exp: 5, joining: "2020-06-15", skills: ["sk-finance", "sk-sql", "sk-python"], managerId: "e-058", risk: "LOW", score: 0.15, rating: 4.6 },
  { id: "e-058", name: "Robert Chang", email: "robert.chang@talentos.dev", role: "CFO", teamId: "team-finance", deptId: "dept-ops", exp: 16, joining: "2014-01-01", skills: ["sk-finance", "sk-leadership"], managerId: null, risk: "LOW", score: 0.04, rating: 5.0 },
  { id: "e-059", name: "Claudia Weber", email: "claudia.weber@talentos.dev", role: "Legal Counsel", teamId: "team-legal", deptId: "dept-ops", exp: 7, joining: "2019-04-15", skills: ["sk-legal"], managerId: "e-060", risk: "LOW", score: 0.12, rating: 4.8 },
  { id: "e-060", name: "Patrick Moore", email: "patrick.moore@talentos.dev", role: "General Counsel", teamId: "team-legal", deptId: "dept-ops", exp: 14, joining: "2015-07-01", skills: ["sk-legal", "sk-leadership"], managerId: null, risk: "LOW", score: 0.04, rating: 4.9 },
  { id: "e-061", name: "Sven Andersen", email: "sven.andersen@talentos.dev", role: "IT Manager", teamId: "team-it", deptId: "dept-ops", exp: 8, joining: "2018-10-01", skills: ["sk-kubernetes", "sk-aws", "sk-leadership"], managerId: null, risk: "LOW", score: 0.11, rating: 4.7 },
  { id: "e-062", name: "Mei Lin", email: "mei.lin@talentos.dev", role: "IT Engineer", teamId: "team-it", deptId: "dept-ops", exp: 3, joining: "2022-11-15", skills: ["sk-docker", "sk-aws"], managerId: "e-061", risk: "LOW", score: 0.20, rating: 4.4 },
];

export const EMPLOYEES: EmployeeRecord[] = RAW_EMPLOYEES.map((e) => {
  const dept = DEPARTMENTS.find((d) => d.id === e.deptId)?.name ?? "Unknown";
  const team = TEAMS.find((t) => t.id === e.teamId)?.name ?? "Unknown";
  const photoUrl = `https://api.dicebear.com/9.x/avataaars/svg?seed=${e.id}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
  return {
    id: e.id,
    name: e.name,
    email: e.email,
    role: e.role,
    teamId: e.teamId,
    deptId: e.deptId,
    department: dept,
    team: team,
    experience: e.exp,
    joiningDate: e.joining,
    skills: e.skills,
    managerId: e.managerId,
    photoUrl,
    flightRisk: (e.risk as "LOW" | "MEDIUM" | "HIGH") ?? "LOW",
    riskScore: e.score ?? 0.1,
    riskFactor: e.riskFactor,
    performanceRating: e.rating ?? 4.5,
    bio: `${e.role} in ${team} (${dept}) with ${e.exp} years of industry experience. Leading key projects and mentoring peer engineers.`,
  };
});

export const DEMO_USERS = [
  {
    id: "usr-admin",
    name: "Vikram Admin",
    email: "admin@talentos.dev",
    role: "ADMIN" as const,
    department: "Engineering",
    passwordHash: "demo123",
  },
  {
    id: "usr-manager",
    name: "Sarah Chen (HR Lead)",
    email: "manager@talentos.dev",
    role: "HR_MANAGER" as const,
    department: "People & Culture",
    passwordHash: "demo123",
  },
  {
    id: "usr-employee",
    name: "Arjun Mehta",
    email: "employee@talentos.dev",
    role: "EMPLOYEE" as const,
    department: "Engineering",
    passwordHash: "demo123",
  },
];

export function getFallbackGraph() {
  const nodes = EMPLOYEES.map((e, i) => ({
    id: e.id,
    type: "hexEmployee" as const,
    position: {
      x: (i % 10) * 190 + (Math.floor(i / 10) % 2 === 1 ? 95 : 0),
      y: Math.floor(i / 10) * 180,
    },
    data: {
      employeeId: e.id,
      name: e.name,
      role: e.role,
      department: e.department,
      photoUrl: e.photoUrl,
      state: "default" as const,
    },
  }));

  const edges: Array<{
    id: string;
    source: string;
    target: string;
    type: "smoothstep";
    data: {
      connectionType: "REPORTS_TO" | "MENTORS" | "COLLABORATED_WITH" | "SAME_TEAM";
      label: string;
      projectName?: string;
      state: "default";
    };
  }> = [];

  // Manager relationships
  EMPLOYEES.forEach((emp, i) => {
    if (emp.managerId) {
      edges.push({
        id: `mgr-${i}`,
        source: emp.id,
        target: emp.managerId,
        type: "smoothstep",
        data: {
          connectionType: "REPORTS_TO",
          label: "Reports to",
          state: "default",
        },
      });
    }
  });

  // Mentors
  MENTORS.forEach((m, i) => {
    edges.push({
      id: `men-${i}`,
      source: m.mentorId,
      target: m.menteeId,
      type: "smoothstep",
      data: {
        connectionType: "MENTORS",
        label: "Mentors",
        state: "default",
      },
    });
  });

  // Project collaborations
  let collIdx = 0;
  PROJECT_MEMBERS.forEach((pm) => {
    const proj = PROJECTS.find((p) => p.id === pm.projId);
    for (let i = 0; i < pm.empIds.length; i++) {
      for (let j = i + 1; j < Math.min(pm.empIds.length, i + 3); j++) {
        edges.push({
          id: `proj-${collIdx++}`,
          source: pm.empIds[i],
          target: pm.empIds[j],
          type: "smoothstep",
          data: {
            connectionType: "COLLABORATED_WITH",
            label: "Collaborated",
            projectName: proj?.name ?? "Project",
            state: "default",
          },
        });
      }
    }
  });

  const departments = [...new Set(EMPLOYEES.map((e) => e.department))];

  return {
    nodes,
    edges,
    meta: {
      totalEmployees: nodes.length,
      totalConnections: edges.length,
      departments,
    },
  };
}

export function getFallbackDashboardMetrics() {
  const total = EMPLOYEES.length;
  const deptCounts: Record<string, number> = {};
  EMPLOYEES.forEach((e) => {
    deptCounts[e.department] = (deptCounts[e.department] || 0) + 1;
  });

  const departments = Object.entries(deptCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const skillCounts: Record<string, number> = {};
  EMPLOYEES.forEach((e) => {
    e.skills.forEach((sId) => {
      const skillName = SKILLS.find((s) => s.id === sId)?.name ?? sId;
      skillCounts[skillName] = (skillCounts[skillName] || 0) + 1;
    });
  });

  const topSkills = Object.entries(skillCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const highRisks = EMPLOYEES.filter((e) => e.flightRisk === "HIGH");

  return {
    total,
    departments,
    topSkills,
    highRisks,
    activeProjects: PROJECTS.filter((p) => p.status === "ACTIVE").length,
    graphDensity: 94.6,
  };
}
