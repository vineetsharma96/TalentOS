import type { ErrorCode } from "@/types/errors";

interface ErrorContent {
  title: string;
  message: string;
  recoveryLabel: string;
  recoveryHref: string;
  /** Show secondary "return to dashboard" action */
  showDashboardLink?: boolean;
}

export const ERROR_CONTENT: Record<string, ErrorContent> = {
  ERR_NOT_FOUND: {
    title: "Page Not Found",
    message:
      "The page you're looking for doesn't exist or may have been moved. Check the URL or return to the dashboard.",
    recoveryLabel: "Return to Dashboard",
    recoveryHref: "/dashboard",
  },
  ERR_UNAUTHORIZED: {
    title: "Sign In Required",
    message:
      "You need to be signed in to access TalentOS. Please sign in with your account credentials.",
    recoveryLabel: "Sign In",
    recoveryHref: "/sign-in",
  },
  ERR_FORBIDDEN: {
    title: "Access Denied",
    message:
      "You don't have permission to access this resource. Contact your administrator if you believe this is a mistake.",
    recoveryLabel: "Return to Dashboard",
    recoveryHref: "/dashboard",
    showDashboardLink: false,
  },
  ERR_VALIDATION: {
    title: "Invalid Request",
    message:
      "The submitted information could not be processed. Please review your input and try again.",
    recoveryLabel: "Go Back",
    recoveryHref: "back",
  },
  ERR_RATE_LIMITED: {
    title: "Too Many Requests",
    message:
      "You've made too many requests in a short period. Please wait a moment before trying again.",
    recoveryLabel: "Try Again",
    recoveryHref: "retry",
  },
  ERR_TIMEOUT: {
    title: "Request Timed Out",
    message:
      "The request took longer than expected. This may be a temporary issue — please try again.",
    recoveryLabel: "Try Again",
    recoveryHref: "retry",
    showDashboardLink: true,
  },
  ERR_OFFLINE: {
    title: "No Connection",
    message:
      "TalentOS cannot reach the server. Please check your internet connection and try again.",
    recoveryLabel: "Try Again",
    recoveryHref: "retry",
  },
  ERR_INTERNAL: {
    title: "Something Went Wrong",
    message:
      "TalentOS encountered an unexpected error. Our team has been notified. Please try again or return to the dashboard.",
    recoveryLabel: "Try Again",
    recoveryHref: "retry",
    showDashboardLink: true,
  },
  ERR_SERVICE_UNAVAILABLE: {
    title: "Service Unavailable",
    message:
      "A TalentOS service is temporarily unavailable. Please try again in a few moments.",
    recoveryLabel: "Try Again",
    recoveryHref: "retry",
    showDashboardLink: true,
  },
  ERR_BAD_GATEWAY: {
    title: "Service Unavailable",
    message:
      "A dependent service is not responding. Please try again shortly.",
    recoveryLabel: "Try Again",
    recoveryHref: "retry",
    showDashboardLink: true,
  },
  ERR_AI_UNAVAILABLE: {
    title: "AI Unavailable",
    message:
      "The AI service is temporarily unavailable. Your query was not processed. Please try again.",
    recoveryLabel: "Try Again",
    recoveryHref: "retry",
  },
  ERR_AI_RETRIEVAL_FAILED: {
    title: "Data Retrieval Failed",
    message:
      "The AI could not retrieve the required workforce data. Please try again.",
    recoveryLabel: "Try Again",
    recoveryHref: "retry",
  },
  ERR_GRAPH_LOAD_FAILED: {
    title: "Graph Load Failed",
    message:
      "The workforce connection graph could not be loaded. Please refresh the page.",
    recoveryLabel: "Refresh",
    recoveryHref: "retry",
  },
  ERR_VOICE_UNAVAILABLE: {
    title: "Voice Unavailable",
    message:
      "Voice generation is currently unavailable. The written response is shown below.",
    recoveryLabel: "Try Again",
    recoveryHref: "retry",
  },
  ERR_DOCUMENT_REJECTED: {
    title: "Document Rejected",
    message:
      "The document could not be processed. Please check the file format (PDF, DOCX) and size, then try again.",
    recoveryLabel: "Try Again",
    recoveryHref: "retry",
  },
  ERR_SIMULATION_FAILED: {
    title: "Simulation Failed",
    message:
      "The workforce simulation could not be completed. Please check your scenario inputs and try again.",
    recoveryLabel: "Revise Scenario",
    recoveryHref: "back",
  },
  ERR_PROFILE_LOAD_FAILED: {
    title: "Profile Unavailable",
    message:
      "This employee profile could not be loaded right now. Please try again.",
    recoveryLabel: "Try Again",
    recoveryHref: "retry",
  },
};

export function getErrorContent(code: string): ErrorContent {
  return (
    ERROR_CONTENT[code] ?? {
      title: "Something Went Wrong",
      message:
        "An unexpected error occurred. Please try again or return to the dashboard.",
      recoveryLabel: "Return to Dashboard",
      recoveryHref: "/dashboard",
    }
  );
}

export function httpStatusToTitle(status: number): string {
  const titles: Record<number, string> = {
    400: "Bad Request",
    401: "Authentication Required",
    403: "Access Denied",
    404: "Not Found",
    408: "Request Timeout",
    429: "Too Many Requests",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
  };
  return titles[status] ?? "Error";
}
