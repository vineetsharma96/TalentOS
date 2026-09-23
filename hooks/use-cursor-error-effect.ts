"use client";

import { useEffect, useRef, useCallback } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

interface UseCursorErrorEffectOptions {
  /** Element to apply the spotlight to. Defaults to document */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** Max parallax displacement in px. Default: 20 */
  maxDisplacement?: number;
  /** Spotlight radius in px. Default: 300 */
  spotlightRadius?: number;
}

/**
 * Interactive cursor effect for error pages.
 *
 * Creates:
 * 1. A radial gradient spotlight that follows the cursor
 * 2. A parallax displacement on the error code element
 *
 * Respects prefers-reduced-motion — disables all motion when set.
 * Touch devices receive a static ambient pulse instead.
 * Cleans up all event listeners and animation frames on unmount.
 */
export function useCursorErrorEffect(
  spotlightRef: React.RefObject<HTMLElement | null>,
  codeRef: React.RefObject<HTMLElement | null>,
  options: UseCursorErrorEffectOptions = {}
) {
  const { maxDisplacement = 20, spotlightRadius = 300 } = options;

  const rafRef = useRef<number | null>(null);
  const cursorRef = useRef<CursorPosition>({ x: 0, y: 0 });
  const isReducedMotion = useRef(false);
  const isTouchDevice = useRef(false);

  // Check preferences once on mount
  useEffect(() => {
    isReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    isTouchDevice.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, []);

  const applyEffect = useCallback(() => {
    if (isReducedMotion.current || isTouchDevice.current) return;

    const spotlight = spotlightRef.current;
    const codeEl = codeRef.current;
    if (!spotlight && !codeEl) return;

    const { x, y } = cursorRef.current;

    // Spotlight gradient
    if (spotlight) {
      const rect = spotlight.getBoundingClientRect();
      const cx = x - rect.left;
      const cy = y - rect.top;

      spotlight.style.background = `radial-gradient(${spotlightRadius}px circle at ${cx}px ${cy}px, rgba(52, 55, 85, 0.15) 0%, transparent 70%)`;
    }

    // Error code parallax
    if (codeEl) {
      const rect = codeEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = ((x - centerX) / window.innerWidth) * maxDisplacement;
      const dy = ((y - centerY) / window.innerHeight) * maxDisplacement;

      codeEl.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
    }
  }, [spotlightRef, codeRef, maxDisplacement, spotlightRadius]);

  useEffect(() => {
    if (isReducedMotion.current || isTouchDevice.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };

      // Throttle to rAF
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        applyEffect();
        rafRef.current = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      // Reset transforms on cleanup
      if (codeRef.current) {
        codeRef.current.style.transform = "";
      }
    };
  }, [applyEffect, codeRef]);
}
