"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Compass,
  Share2,
  Sparkles,
  Sliders,
  Mic,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

interface TourStep {
  title: string;
  route: string;
  badge: string;
  description: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: "Workforce Command Center",
    route: "/dashboard",
    badge: "1. Overview & Signals",
    description: "Inspect live headcount metrics, 94.6% graph density, and real-time flight hazard alerts.",
    icon: Compass,
  },
  {
    title: "62-Node Hexagonal Graph",
    route: "/connections",
    badge: "2. Graph Topology",
    description: "Explore 62 employees connected by 126 relationships with custom SVG hex nodes and interactive dimming.",
    icon: Share2,
  },
  {
    title: "Multi-Agent AI Decision Center",
    route: "/ai",
    badge: "3. Reasoning Supervisor",
    description: "Run strategic queries backed by auditable FACT, PREDICTION, and RECOMMENDATION evidence cards.",
    icon: Sparkles,
  },
  {
    title: "What-If Workforce Simulator",
    route: "/simulation",
    badge: "4. Predictive Restructuring",
    description: "Model delta sprint velocity and secondary attrition impact when simulating key leadership flights.",
    icon: Sliders,
  },
  {
    title: "Recruitment AI & Voice Rehearsal",
    route: "/recruitment",
    badge: "5. Voice Synthesis",
    description: "Audit candidate match scores, missing skill deficits, and rehearse interview questions with ElevenLabs voice.",
    icon: Mic,
  },
];

export function ShowcaseTour() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Sync step if user navigates manually
  const matchedIndex = TOUR_STEPS.findIndex((s) => s.route === pathname);
  const activeIndex = matchedIndex !== -1 ? matchedIndex : currentStep;

  const goToStep = (index: number) => {
    setCurrentStep(index);
    router.push(TOUR_STEPS[index].route);
  };

  const nextStep = () => {
    const nextIdx = (activeIndex + 1) % TOUR_STEPS.length;
    goToStep(nextIdx);
  };

  const prevStep = () => {
    const prevIdx = (activeIndex - 1 + TOUR_STEPS.length) % TOUR_STEPS.length;
    goToStep(prevIdx);
  };

  const step = TOUR_STEPS[activeIndex] ?? TOUR_STEPS[0];
  const StepIcon = step.icon;

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #343755 0%, #1e2038 100%)",
            border: "1px solid rgba(0, 240, 255, 0.4)",
            boxShadow: "0 8px 32px rgba(0, 240, 255, 0.2)",
            fontFamily: "var(--font-nbarchitekt, sans-serif)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
          <span>Evaluator Guided Tour</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/70">
            {activeIndex + 1}/5
          </span>
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-40 w-96 rounded-2xl shadow-2xl border p-4 text-white animate-in slide-in-from-bottom-4 duration-300"
      style={{
        background: "rgba(10, 10, 18, 0.95)",
        borderColor: "rgba(0, 240, 255, 0.3)",
        boxShadow: "0 12px 48px rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
          <span
            className="text-xs uppercase font-bold tracking-wider text-[#00F0FF]"
            style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
          >
            Judge Demonstration Tour
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white/40 hover:text-white p-1 rounded-md transition-colors"
        >
          <X size={15} />
        </button>
      </div>

      {/* Step Content */}
      <div className="py-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono uppercase text-emerald-400">
            {step.badge}
          </span>
          <span className="text-[11px] font-mono text-white/40">
            Step {activeIndex + 1} of {TOUR_STEPS.length}
          </span>
        </div>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-[#00F0FF]">
            <StepIcon size={16} />
          </div>
          <h4
            className="text-sm font-bold text-white tracking-tight"
            style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
          >
            {step.title}
          </h4>
        </div>

        <p className="text-xs text-white/70 leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-1.5 py-2">
        {TOUR_STEPS.map((s, idx) => (
          <button
            key={s.route}
            onClick={() => goToStep(idx)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: idx === activeIndex ? "24px" : "8px",
              background:
                idx === activeIndex
                  ? "#00F0FF"
                  : idx < activeIndex
                  ? "rgba(0, 240, 255, 0.4)"
                  : "rgba(255, 255, 255, 0.15)",
            }}
            title={s.title}
          />
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <button
          onClick={prevStep}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft size={14} /> Back
        </button>

        <button
          onClick={nextStep}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-black transition-all hover:scale-105"
          style={{
            background: "#00F0FF",
            fontFamily: "var(--font-nbarchitekt, sans-serif)",
          }}
        >
          <span>{activeIndex === TOUR_STEPS.length - 1 ? "Finish Tour" : "Next Milestone"}</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
