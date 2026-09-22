"use client";

import { useState, useCallback, useRef } from "react";

interface RetryButtonProps {
  onRetry: () => void | Promise<void>;
  /** Max attempts before showing "contact support". Default: 3 */
  maxAttempts?: number;
  label?: string;
}

export function RetryButton({
  onRetry,
  maxAttempts = 3,
  label = "Try Again",
}: RetryButtonProps) {
  const [attempts, setAttempts] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleRetry = useCallback(async () => {
    if (isRetrying || attempts >= maxAttempts) return;

    setIsRetrying(true);
    setAttempts((a) => a + 1);

    try {
      await onRetry();
    } finally {
      // Small delay before re-enabling to prevent rapid clicks
      timeoutRef.current = setTimeout(() => setIsRetrying(false), 500);
    }
  }, [isRetrying, attempts, maxAttempts, onRetry]);

  // Cleanup timeout on unmount
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRetry();
    }
  };

  const isExhausted = attempts >= maxAttempts;

  if (isExhausted) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p
          className="text-[12px] text-white/40"
          style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
        >
          Still having trouble?
        </p>
        <a
          href="mailto:support@talentos.dev"
          className="inline-flex items-center justify-center h-9 px-6 rounded text-sm font-bold text-white/60 hover:text-white transition-colors"
          style={{
            fontFamily: "var(--font-nbarchitekt, sans-serif)",
            fontSize: "12px",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "5px",
          }}
        >
          Contact Support
        </a>
      </div>
    );
  }

  return (
    <button
      onClick={handleRetry}
      onKeyDown={handleKeyDown}
      disabled={isRetrying}
      aria-label={isRetrying ? "Retrying..." : label}
      aria-disabled={isRetrying}
      className="inline-flex items-center justify-center h-9 px-6 rounded-full font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50 disabled:opacity-60 disabled:cursor-not-allowed"
      style={{
        background: "#343755",
        color: "#ffffff",
        fontFamily: "var(--font-nbarchitekt, sans-serif)",
        fontSize: "14px",
        minWidth: "120px",
      }}
    >
      {isRetrying ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="7"
              cy="7"
              r="5"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="20"
              strokeDashoffset="10"
            />
          </svg>
          Retrying…
        </span>
      ) : (
        label
      )}
    </button>
  );
}
