import { normalizeApiResponse, type ApiError } from "./error-normalizer";
import type { ErrorCode } from "@/types/errors";

interface FetchOptions extends RequestInit {
  /** Timeout in milliseconds. Default: 30000 */
  timeoutMs?: number;
}

/**
 * Typed fetch wrapper that:
 * - Adds correlation request IDs
 * - Normalizes error responses into ApiError
 * - Handles timeouts
 * - Never exposes internal error details to components
 */
export async function apiFetch<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeoutMs = 30000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort("timeout"), timeoutMs);

  const requestId = crypto.randomUUID();

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "X-Request-ID": requestId,
        ...fetchOptions.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let body: unknown;
      try {
        body = await response.json();
      } catch {
        body = null;
      }
      const error = normalizeApiResponse(response.status, body);
      throw error;
    }

    return response.json() as Promise<T>;
  } catch (error) {
    clearTimeout(timeoutId);

    // Already normalized
    if (isApiError(error)) throw error;

    // Abort = timeout
    if (error instanceof Error && error.name === "AbortError") {
      const timeoutError = normalizeApiResponse(408, null);
      throw { ...timeoutError, requestId };
    }

    // Network / offline
    if (error instanceof TypeError) {
      const offlineError = normalizeApiResponse(0, null);
      throw { ...offlineError, requestId };
    }

    throw error;
  }
}

function isApiError(value: unknown): value is ApiError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "httpStatus" in value
  );
}

// ─── Convenience methods ──────────────────────────────────────────────────────

export const api = {
  get: <T>(url: string, options?: FetchOptions) =>
    apiFetch<T>(url, { method: "GET", ...options }),

  post: <T>(url: string, body: unknown, options?: FetchOptions) =>
    apiFetch<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    }),

  patch: <T>(url: string, body: unknown, options?: FetchOptions) =>
    apiFetch<T>(url, {
      method: "PATCH",
      body: JSON.stringify(body),
      ...options,
    }),

  delete: <T>(url: string, options?: FetchOptions) =>
    apiFetch<T>(url, { method: "DELETE", ...options }),
} as const;
