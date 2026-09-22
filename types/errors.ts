export type UserRole = "ADMIN" | "HR_MANAGER" | "EMPLOYEE";

export interface ApiError {
  code: ErrorCode;
  message: string;
  httpStatus: number;
  requestId: string;
  retryable: boolean;
  retryAfterMs?: number;
  /** Safe additional context — never include stack traces or secrets */
  detail?: string;
}

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

  // AI / domain-specific
  AI_UNAVAILABLE = "ERR_AI_UNAVAILABLE",
  AI_RETRIEVAL_FAILED = "ERR_AI_RETRIEVAL_FAILED",
  GRAPH_LOAD_FAILED = "ERR_GRAPH_LOAD_FAILED",
  VOICE_UNAVAILABLE = "ERR_VOICE_UNAVAILABLE",
  DOCUMENT_REJECTED = "ERR_DOCUMENT_REJECTED",
  SIMULATION_FAILED = "ERR_SIMULATION_FAILED",
  PROFILE_LOAD_FAILED = "ERR_PROFILE_LOAD_FAILED",
}

export function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value &&
    "httpStatus" in value
  );
}
