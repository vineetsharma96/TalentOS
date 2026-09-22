export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  team: string;
  experience: number; // years
  joiningDate: string; // ISO date
  photoUrl: string;
  managerId?: string;
  isActive: boolean;
  bio?: string;
}

export interface EmployeeWithSkills extends Employee {
  skills: EmployeeSkill[];
  projects: EmployeeProject[];
  connections: EmployeeConnection[];
}

export interface EmployeeSkill {
  skillId: string;
  name: string;
  category: string;
  level: SkillLevel;
  verifiedAt?: string;
}

export type SkillLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";

export interface EmployeeProject {
  projectId: string;
  name: string;
  role: string;
  since: string;
  status: "ACTIVE" | "COMPLETED" | "PAUSED";
}

export interface EmployeeConnection {
  employeeId: string;
  name: string;
  role: string;
  department: string;
  photoUrl: string;
  type: ConnectionType;
  label: string;
  projectName?: string;
}

export type ConnectionType =
  | "SAME_TEAM"
  | "SAME_PROJECT"
  | "REPORTS_TO"
  | "MENTORS"
  | "COLLABORATED_WITH";

export interface PerformanceReview {
  id: string;
  period: string;
  rating: number; // 1–5
  summary: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description?: string;
}

export interface CreateEmployeeInput {
  name: string;
  email: string;
  role: string;
  department: string;
  team: string;
  experience: number;
  joiningDate: string;
  managerId?: string;
  skillIds?: string[];
  photoUrl?: string;
}
