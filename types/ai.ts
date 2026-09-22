export type EvidenceType =
  | "FACT"
  | "PREDICTION"
  | "AI_INTERPRETATION"
  | "RECOMMENDATION";

export interface AIEvidence {
  type: EvidenceType;
  content: string;
  source?: string; // e.g. "Employee graph", "Policy document §3.2"
  confidence?: number; // 0–1, only for PREDICTION
}

export interface AIResponse {
  requestId: string;
  query: string;
  answer: string;
  evidence: AIEvidence[];
  agentPath: string[]; // which agents were invoked
  processingMs: number;
  /** Streaming: true while tokens are still arriving */
  isComplete: boolean;
}

export interface AIQueryRequest {
  query: string;
  context?: {
    employeeId?: string;
    departmentId?: string;
  };
}

export interface RecruitmentAnalysis {
  candidateId: string;
  candidateName: string;
  jobId: string;
  matchScore: number; // 0–1
  matchedSkills: string[];
  missingSkills: string[];
  experience: string;
  summary: string;
  suggestedInterviewQuestions: string[];
  evidence: AIEvidence[];
}

export interface OnboardingPlan {
  employeeId: string;
  employeeName: string;
  role: string;
  department: string;
  days: OnboardingDay[];
}

export interface OnboardingDay {
  day: number;
  label: string; // "Day 1", "Week 2", etc.
  tasks: OnboardingTask[];
}

export interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  type: "MEETING" | "TRAINING" | "DOCUMENTATION" | "SETUP" | "OBJECTIVE";
  durationMins?: number;
  assignedTo?: string; // person responsible
  link?: string;
}

export interface PolicyAnswer {
  query: string;
  answer: string;
  citations: PolicyCitation[];
  confidence: number;
  canAnswer: boolean; // false if docs don't contain info
}

export interface PolicyCitation {
  documentTitle: string;
  section?: string;
  excerpt: string;
  relevanceScore: number;
}

export interface MobilityOpportunity {
  employeeId: string;
  currentRole: string;
  targetRole: string;
  matchScore: number;
  existingSkills: string[];
  requiredSkills: string[];
  gapSkills: string[];
  learningPath: LearningStep[];
  estimatedWeeks: number;
}

export interface LearningStep {
  skillName: string;
  courseName: string;
  provider: string;
  durationHours: number;
  type: "COURSE" | "PROJECT" | "MENTORSHIP" | "WORKSHOP";
}
