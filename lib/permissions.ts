import type { UserRole } from "@/types/auth";

/** Permissions matrix per role */
const PERMISSIONS = {
  // Employee management
  VIEW_ALL_EMPLOYEES: ["ADMIN", "HR_MANAGER"] as UserRole[],
  VIEW_OWN_PROFILE: ["ADMIN", "HR_MANAGER", "EMPLOYEE"] as UserRole[],
  CREATE_EMPLOYEE: ["ADMIN"] as UserRole[],
  EDIT_EMPLOYEE: ["ADMIN"] as UserRole[],
  DELETE_EMPLOYEE: ["ADMIN"] as UserRole[],

  // Analytics
  VIEW_WORKFORCE_ANALYTICS: ["ADMIN", "HR_MANAGER"] as UserRole[],
  VIEW_RISK_SIGNALS: ["ADMIN", "HR_MANAGER"] as UserRole[],
  VIEW_SKILL_GAPS: ["ADMIN", "HR_MANAGER"] as UserRole[],

  // AI features
  USE_AI: ["ADMIN", "HR_MANAGER", "EMPLOYEE"] as UserRole[],
  USE_AI_DECISION_CENTER: ["ADMIN", "HR_MANAGER"] as UserRole[],
  USE_RECRUITMENT_AI: ["ADMIN", "HR_MANAGER"] as UserRole[],
  VIEW_RECRUITMENT: ["ADMIN", "HR_MANAGER"] as UserRole[],
  USE_POLICY_QUERY: ["ADMIN", "HR_MANAGER", "EMPLOYEE"] as UserRole[],
  VIEW_POLICIES: ["ADMIN", "HR_MANAGER", "EMPLOYEE"] as UserRole[],
  USE_SIMULATION: ["ADMIN", "HR_MANAGER"] as UserRole[],
  RUN_SIMULATION: ["ADMIN", "HR_MANAGER"] as UserRole[],
  USE_ONBOARDING_GENERATOR: ["ADMIN", "HR_MANAGER"] as UserRole[],
  VIEW_ONBOARDING: ["ADMIN", "HR_MANAGER", "EMPLOYEE"] as UserRole[],

  // Career features
  VIEW_OWN_CAREER_PATH: ["ADMIN", "HR_MANAGER", "EMPLOYEE"] as UserRole[],
  VIEW_INTERNAL_MARKETPLACE: ["ADMIN", "HR_MANAGER", "EMPLOYEE"] as UserRole[],
  VIEW_MOBILITY: ["ADMIN", "HR_MANAGER", "EMPLOYEE"] as UserRole[],

  // Admin
  MANAGE_POLICIES: ["ADMIN"] as UserRole[],
  UPLOAD_DOCUMENTS: ["ADMIN"] as UserRole[],
  MANAGE_SETTINGS: ["ADMIN"] as UserRole[],
  MANAGE_SYSTEM: ["ADMIN"] as UserRole[],
  VIEW_GRAPH: ["ADMIN", "HR_MANAGER"] as UserRole[],

  // Voice
  USE_VOICE: ["ADMIN", "HR_MANAGER", "EMPLOYEE"] as UserRole[],
} as const;

export type Permission = keyof typeof PERMISSIONS;

/**
 * Check if a role has a given permission.
 * Use server-side in API routes and layouts.
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  if (role === "ADMIN") return true;
  const allowed = PERMISSIONS[permission] as readonly UserRole[] | undefined;
  if (!allowed) return false;
  return allowed.includes(role);
}

/**
 * Check if a role can access a dashboard route.
 * Returns the required permission for that route.
 */
export function getRoutePermission(pathname: string): Permission | null {
  if (pathname.startsWith("/employees")) return "VIEW_ALL_EMPLOYEES";
  if (pathname.startsWith("/connections")) return "VIEW_GRAPH";
  if (pathname.startsWith("/workforce")) return "VIEW_WORKFORCE_ANALYTICS";
  if (pathname.startsWith("/ai")) return "USE_AI_DECISION_CENTER";
  if (pathname.startsWith("/recruitment")) return "USE_RECRUITMENT_AI";
  if (pathname.startsWith("/onboarding")) return "USE_ONBOARDING_GENERATOR";
  if (pathname.startsWith("/policies")) return "VIEW_POLICIES";
  if (pathname.startsWith("/simulation")) return "USE_SIMULATION";
  if (pathname.startsWith("/mobility")) return "VIEW_INTERNAL_MARKETPLACE";
  if (pathname.startsWith("/settings")) return "MANAGE_SETTINGS";
  return null;
}
