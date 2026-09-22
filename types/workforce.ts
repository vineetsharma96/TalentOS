export interface WorkforceSummary {
  totalEmployees: number;
  activeEmployees: number;
  openPositions: number;
  criticalSkillGaps: number;
  riskSignals: number;
  internalMobilityOpportunities: number;
  trainingCompletionRate: number; // 0–1
  departmentBreakdown: DepartmentStat[];
}

export interface DepartmentStat {
  department: string;
  headcount: number;
  openRoles: number;
  avgPerformance: number;
  riskCount: number;
}

export interface SkillGap {
  skillId: string;
  skillName: string;
  category: string;
  currentCoverage: number; // employees with this skill
  requiredCoverage: number; // based on project/role requirements
  gap: number;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  affectedDepartments: string[];
  remediationOptions: RemediationOption[];
}

export interface RemediationOption {
  type: "UPSKILL" | "HIRE" | "CONTRACT";
  label: string;
  candidates?: string[]; // employeeIds for upskill
  timelineWeeks?: number;
}

export interface RiskSignal {
  employeeId: string;
  employeeName: string;
  department: string;
  riskScore: number; // 0–1
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  factors: RiskFactor[];
  /** ML prediction — not a fact */
  confidence: number;
}

export interface RiskFactor {
  name: string;
  contribution: number; // SHAP value proxy
  direction: "POSITIVE" | "NEGATIVE";
}

export interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  type: SimulationType;
  parameters: Record<string, unknown>;
}

export type SimulationType =
  | "HIRE"
  | "ATTRITION"
  | "NEW_DEPARTMENT"
  | "PROJECT_START"
  | "RESTRUCTURE";

export interface SimulationResult {
  scenarioId: string;
  currentState: WorkforceSummary;
  projectedState: WorkforceSummary;
  impacts: SimulationImpact[];
  assumptions: string[];
  recommendedActions: string[];
}

export interface SimulationImpact {
  category: string;
  before: number;
  after: number;
  delta: number;
  severity: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  description: string;
}
