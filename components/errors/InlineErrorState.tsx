"use client";

import { getErrorContent } from "./error-content";
import { RetryButton } from "./RetryButton";
import { AlertCircle, WifiOff, Lock, Clock } from "lucide-react";

interface InlineErrorStateProps {
  code: string;
  onRetry?: () => void;
  /** Compact mode for small panels */
  compact?: boolean;
  className?: string;
}

const CODE_ICONS: Record<string, React.ReactNode> = {
  ERR_OFFLINE: <WifiOff size={16} aria-hidden="true" />,
  ERR_UNAUTHORIZED: <Lock size={16} aria-hidden="true" />,
  ERR_TIMEOUT: <Clock size={16} aria-hidden="true" />,
};

export function InlineErrorState({
  code,
  onRetry,
  compact = false,
  className = "",
}: InlineErrorStateProps) {
  const content = getErrorContent(code);
  const icon = CODE_ICONS[code] ?? <AlertCircle size={16} aria-hidden="true" />;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`flex ${compact ? "flex-row items-center gap-3" : "flex-col items-start gap-4"} p-4 rounded-xl ${className}`}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center gap-2 text-white/50">
        {icon}
        <span
          className="text-xs uppercase tracking-widest"
          style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
        >
          {code}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-semibold text-white/80 mb-1"
          style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
        >
          {content.title}
        </p>
        {!compact && (
          <p
            className="text-sm text-white/50 leading-relaxed"
            style={{ fontFamily: "Times, serif" }}
          >
            {content.message}
          </p>
        )}
      </div>

      {onRetry && content.recoveryHref === "retry" && (
        <RetryButton
          onRetry={onRetry}
          label={compact ? "Retry" : content.recoveryLabel}
        />
      )}
    </div>
  );
}
