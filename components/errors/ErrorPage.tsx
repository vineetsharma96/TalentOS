"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { useCursorErrorEffect } from "@/hooks/use-cursor-error-effect";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getErrorContent } from "./error-content";
import { RetryButton } from "./RetryButton";

interface ErrorPageProps {
  code: string;
  httpStatus?: number;
  onRetry?: () => void;
  /** Override the default recovery action */
  customRecoveryLabel?: string;
  customRecoveryHref?: string;
}

export function ErrorPage({
  code,
  httpStatus,
  onRetry,
  customRecoveryLabel,
  customRecoveryHref,
}: ErrorPageProps) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const spotlightRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  // Interactive cursor effect
  useCursorErrorEffect(spotlightRef, codeRef);

  const content = getErrorContent(code);
  const displayCode = httpStatus ?? code;

  const recoveryHref = customRecoveryHref ?? content.recoveryHref;
  const recoveryLabel = customRecoveryLabel ?? content.recoveryLabel;

  const handleRecovery = () => {
    if (recoveryHref === "retry") {
      onRetry?.();
    } else if (recoveryHref === "back") {
      router.back();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#000000] flex flex-col items-center justify-center overflow-hidden">
      {/* Spotlight layer — pointer-events: none so it never blocks interactions */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />

      {/* Ambient background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <main
        className="relative flex flex-col items-center text-center px-6 py-24 z-10 max-w-2xl mx-auto"
        role="main"
        aria-labelledby="error-heading"
      >
        {/* Error code — parallax target */}
        <motion.div
          ref={codeRef}
          initial={reducedMotion ? false : { opacity: 0, scale: 1.1, filter: "blur(16px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ willChange: "transform" }}
          aria-hidden="true"
        >
          <span
            className="block text-[clamp(6rem,20vw,14rem)] font-bold leading-none tracking-tighter select-none"
            style={{
              fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.08)",
              textShadow: "0 0 80px rgba(52,55,85,0.4)",
            }}
          >
            {displayCode}
          </span>
        </motion.div>

        {/* Error heading + message */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="mt-4 space-y-4"
        >
          <h1
            id="error-heading"
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
          >
            {content.title}
          </h1>

          <p
            className="text-[#c6c6c6] text-base leading-[1.88]"
            style={{ fontFamily: "Times, 'Times New Roman', serif", maxWidth: "480px" }}
          >
            {content.message}
          </p>

          {/* Error code badge — accessible text */}
          <p className="sr-only">
            Error code: {code}. HTTP status: {httpStatus ?? "N/A"}.
          </p>
        </motion.div>

        {/* Recovery actions */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.65 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 items-center"
        >
          {recoveryHref === "retry" ? (
            <RetryButton onRetry={onRetry ?? (() => window.location.reload())} />
          ) : recoveryHref === "back" ? (
            <button
              onClick={handleRecovery}
              className="inline-flex items-center justify-center h-9 px-6 rounded-full text-sm font-bold text-black transition-all"
              style={{
                background: "#343755",
                fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)",
                fontSize: "14px",
              }}
            >
              {recoveryLabel}
            </button>
          ) : (
            <Link
              href={recoveryHref}
              className="inline-flex items-center justify-center h-9 px-6 rounded-full text-sm font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50"
              style={{
                background: "#343755",
                color: "#ffffff",
                fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)",
                fontSize: "14px",
              }}
            >
              {recoveryLabel}
            </Link>
          )}

          {content.showDashboardLink && recoveryHref !== "/dashboard" && (
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center h-9 px-6 rounded text-sm font-bold text-white/60 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/50"
              style={{
                fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)",
                fontSize: "12px",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "5px",
              }}
            >
              Return to Dashboard
            </Link>
          )}
        </motion.div>

        {/* Error code visible label */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="mt-12"
        >
          <code
            className="text-[10px] font-mono tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            {code}
          </code>
        </motion.div>
      </main>

      {/* Touch device ambient animation */}
      <style>{`
        @media (hover: none) {
          @keyframes ambientPulse {
            0%, 100% { opacity: 0.03; }
            50% { opacity: 0.06; }
          }
          .error-ambient {
            animation: ambientPulse 4s ease-in-out infinite;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
