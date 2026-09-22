import { ErrorCode, type ApiError } from "@/types/errors";
import { randomUUID } from "crypto";

/** Safe user-facing messages per error code */
const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.NOT_FOUND]: "The requested page or resource could not be found.",
  [ErrorCode.UNAUTHORIZED]: "You need to sign in to access this.",
  [ErrorCode.FORBIDDEN]: "You don't have permission to access this resource.",
  [ErrorCode.VALIDATION]: "The submitted information could not be processed.",
  [ErrorCode.RATE_LIMITED]: "Too many requests — please wait a moment.",
  [ErrorCode.TIMEOUT]: "The request took too long. Please try again.",
  [ErrorCode.OFFLINE]: "No internet connection detected. Please check your network.",
  [ErrorCode.INTERNAL]: "TalentOS encountered an unexpected error. Our team has been notified.",
  [ErrorCode.SERVICE_UNAVAILABLE]: "This service is temporarily unavailable. Please try again shortly.",
  [ErrorCode.BAD_GATEWAY]: "A dependent service is not responding. Please try again.",
  [ErrorCode.AI_UNAVAILABLE]: "The AI service is temporarily unavailable. Your query was not processed.",
  [ErrorCode.AI_RETRIEVAL_FAILED]: "The AI could not retrieve the required data. Please try again.",
  [ErrorCode.GRAPH_LOAD_FAILED]: "The workforce graph could not be loaded. Please refresh.",
  [ErrorCode.VOICE_UNAVAILABLE]: "Voice generation is currently unavailable. The text response is shown below.",
  [ErrorCode.DOCUMENT_REJECTED]: "The document could not be processed. Check the format and try again.",
  [ErrorCode.SIMULATION_FAILED]: "The simulation could not complete. Please check your inputs and retry.",
  [ErrorCode.PROFILE_LOAD_FAILED]: "Employee profile could not be loaded. Please try again.",
};

const HTTP_STATUS_TO_CODE: Record<number, ErrorCode> = {
  400: ErrorCode.VALIDATION,
  401: ErrorCode.UNAUTHORIZED,
  403: ErrorCode.FORBIDDEN,
  404: ErrorCode.NOT_FOUND,
  408: ErrorCode.TIMEOUT,
  422: ErrorCode.VALIDATION,
  429: ErrorCode.RATE_LIMITED,
  500: ErrorCode.INTERNAL,
  502: ErrorCode.BAD_GATEWAY,
  503: ErrorCode.SERVICE_UNAVAILABLE,
  504: ErrorCode.TIMEOUT,
};

const RETRYABLE_CODES = new Set<ErrorCode>([
  ErrorCode.TIMEOUT,
  ErrorCode.OFFLINE,
  ErrorCode.INTERNAL,
  ErrorCode.SERVICE_UNAVAILABLE,
  ErrorCode.BAD_GATEWAY,
  ErrorCode.AI_UNAVAILABLE,
  ErrorCode.AI_RETRIEVAL_FAILED,
  ErrorCode.GRAPH_LOAD_FAILED,
  ErrorCode.SIMULATION_FAILED,
  ErrorCode.PROFILE_LOAD_FAILED,
]);

/**
 * Normalizes any error into a safe, typed ApiError.
 * NEVER includes stack traces, internal paths, or database details.
 */
export function normalizeError(
  error: unknown,
  options?: {
    code?: ErrorCode;
    httpStatus?: number;
    requestId?: string;
    retryAfterMs?: number;
  }
): ApiError {
  const requestId = options?.requestId ?? randomUUID();

  // Already normalized
  if (isApiError(error)) {
    return { ...error, requestId };
  }

  // HTTP status code provided
  if (options?.httpStatus) {
    const code = options.code ?? HTTP_STATUS_TO_CODE[options.httpStatus] ?? ErrorCode.INTERNAL;
    return {
      code,
      message: ERROR_MESSAGES[code],
      httpStatus: options.httpStatus,
      requestId,
      retryable: RETRYABLE_CODES.has(code),
      retryAfterMs: options.retryAfterMs,
    };
  }

  // Network error
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return {
      code: ErrorCode.OFFLINE,
      message: ERROR_MESSAGES[ErrorCode.OFFLINE],
      httpStatus: 0,
      requestId,
      retryable: true,
    };
  }

  // Explicit code
  if (options?.code) {
    const code = options.code;
    return {
      code,
      message: ERROR_MESSAGES[code],
      httpStatus: codeToHttpStatus(code),
      requestId,
      retryable: RETRYABLE_CODES.has(code),
    };
  }

  // Unknown error — safe fallback
  return {
    code: ErrorCode.INTERNAL,
    message: ERROR_MESSAGES[ErrorCode.INTERNAL],
    httpStatus: 500,
    requestId,
    retryable: true,
  };
}

export function normalizeApiResponse(status: number, body?: unknown): ApiError {
  const code = HTTP_STATUS_TO_CODE[status] ?? ErrorCode.INTERNAL;

  // If body has a safe message from our API, use it
  const safeMessage =
    body &&
    typeof body === "object" &&
    "message" in body &&
    typeof (body as { message: unknown }).message === "string"
      ? (body as { message: string }).message
      : ERROR_MESSAGES[code];

  return {
    code:
      body &&
      typeof body === "object" &&
      "code" in body &&
      typeof (body as { code: unknown }).code === "string"
        ? ((body as { code: string }).code as ErrorCode)
        : code,
    message: safeMessage,
    httpStatus: status,
    requestId: randomUUID(),
    retryable: RETRYABLE_CODES.has(code),
  };
}

function codeToHttpStatus(code: ErrorCode): number {
  const map: Partial<Record<ErrorCode, number>> = {
    [ErrorCode.NOT_FOUND]: 404,
    [ErrorCode.UNAUTHORIZED]: 401,
    [ErrorCode.FORBIDDEN]: 403,
    [ErrorCode.VALIDATION]: 422,
    [ErrorCode.RATE_LIMITED]: 429,
    [ErrorCode.TIMEOUT]: 408,
    [ErrorCode.INTERNAL]: 500,
    [ErrorCode.SERVICE_UNAVAILABLE]: 503,
    [ErrorCode.BAD_GATEWAY]: 502,
  };
  return map[code] ?? 500;
}

function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value &&
    "httpStatus" in value
  );
}

/** For use in Next.js Route Handlers */
export function errorResponse(
  code: ErrorCode,
  httpStatus?: number,
  options?: { retryAfterMs?: number; requestId?: string }
): Response {
  const error = normalizeError(null, {
    code,
    httpStatus: httpStatus ?? codeToHttpStatus(code),
    ...options,
  });
  return Response.json(error, {
    status: error.httpStatus,
    headers: options?.retryAfterMs
      ? { "Retry-After": String(Math.ceil(options.retryAfterMs / 1000)) }
      : undefined,
  });
}
