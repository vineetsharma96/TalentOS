"use client";

import React from "react";
import { ErrorPage } from "./ErrorPage";

interface ErrorBoundaryFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorBoundaryFallback({
  error: _error,
  resetErrorBoundary,
}: ErrorBoundaryFallbackProps) {
  // Never expose the error details to the user
  return (
    <ErrorPage
      code="ERR_INTERNAL"
      httpStatus={500}
      onRetry={resetErrorBoundary}
    />
  );
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorBoundaryFallbackProps>;
}

/**
 * React Error Boundary for catching unexpected rendering errors.
 * All caught errors are normalized — stack traces are never shown to users.
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Safe telemetry — no stack traces or user data
    console.error("[TalentOS] Render error caught:", {
      errorMessage: error.message?.slice(0, 200),
      componentStack: errorInfo.componentStack?.split("\n")[0],
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent =
        this.props.fallback ?? ErrorBoundaryFallback;
      return (
        <FallbackComponent
          error={this.state.error!}
          resetErrorBoundary={this.handleReset}
        />
      );
    }
    return this.props.children;
  }
}
