import { type Variants } from "motion/react";

// ─── Core Variants ────────────────────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

/** Blur-to-sharp — used for typography reveals */
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/** Slide in from right — used for panels/drawers */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, x: 48, transition: { duration: 0.25, ease: "easeIn" } },
};

/** Slide in from left — used for sidebar */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, x: -32, transition: { duration: 0.2, ease: "easeIn" } },
};

// ─── Stagger Containers ───────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

/** Stagger for large hero typography — slower cadence */
export const staggerHero: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

// ─── Page Transitions ─────────────────────────────────────────────────────────

export const pageEnter: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const pageExit: Variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

// ─── Error Page Variants ──────────────────────────────────────────────────────

/** Error code typography — large, ready for parallax effect */
export const errorCodeReveal: Variants = {
  hidden: { opacity: 0, scale: 1.08, filter: "blur(16px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const errorContentFade: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.4 } },
};

// ─── Landing Page ─────────────────────────────────────────────────────────────

export const heroLetterReveal: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const heroSubtitleReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: "easeOut", delay: 0.3 },
  },
};

// ─── Graph Animation ──────────────────────────────────────────────────────────

export const nodeAppear: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

// ─── Timing constants (ms) for use with requestAnimationFrame ─────────────────

export const DURATION = {
  micro: 200,
  fast: 350,
  medium: 500,
  slow: 800,
  cinematic: 1200,
} as const;
