"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  UserCheck,
  Video,
  FileText,
  Layers,
  ChevronRight,
} from "lucide-react";
import { VoicePlayer } from "@/components/voice/VoicePlayer";

interface Milestone {
  phase: string;
  title: string;
  focus: string;
  tasks: Array<{
    title: string;
    type: "SETUP" | "MEETING" | "TRAINING" | "OBJECTIVE";
    duration: string;
    assignee: string;
  }>;
}

const ONBOARDING_PLAN: Milestone[] = [
  {
    phase: "Day 1 – 14",
    title: "Environment Initialization & Culture Calibration",
    focus: "Local workspace config, repository access, security baseline, and 1-on-1 team intros.",
    tasks: [
      { title: "Complete zero-trust credentials and GitHub org verification", type: "SETUP", duration: "2 hours", assignee: "IT Team" },
      { title: "Introductory roadmap briefing with Sarah Chen (Engineering Manager)", type: "MEETING", duration: "45 mins", assignee: "Sarah Chen" },
      { title: "Review TalentOS architecture & Neo4j graph data pipeline", type: "TRAINING", duration: "3 hours", assignee: "David Kim" },
      { title: "Deploy first pull request to staging environment", type: "OBJECTIVE", duration: "1 day", assignee: "Mentor: Max Wenger" },
    ],
  },
  {
    phase: "Day 15 – 30",
    title: "First Strategic Project Immersion",
    focus: "Active contribution to Project Nova ML pipeline and cross-functional team alignment.",
    tasks: [
      { title: "Deep dive into model quantization and vLLM serving configs", type: "TRAINING", duration: "4 hours", assignee: "Chioma Eze" },
      { title: "Cross-functional sync with Product Design on latency thresholds", type: "MEETING", duration: "1 hour", assignee: "Sofia Martinez" },
      { title: "Take on first P1 bug fix on inference routing bottleneck", type: "OBJECTIVE", duration: "3 days", assignee: "Self-driven" },
    ],
  },
  {
    phase: "Day 31 – 60",
    title: "Autonomous Ownership & Cross-Team Impact",
    focus: "Leading independent technical sub-modules and mentoring newer hires on domain tools.",
    tasks: [
      { title: "Conduct architecture review for real-time telemetry streaming", type: "MEETING", duration: "1.5 hours", assignee: "Architecture Board" },
      { title: "Lead sprint retrospective demo for executive stakeholders", type: "OBJECTIVE", duration: "2 hours", assignee: "Engineering Guild" },
      { title: "Document production runbook for high-throughput failover scenarios", type: "TRAINING", duration: "1 day", assignee: "SRE Lead" },
    ],
  },
  {
    phase: "Day 61 – 90",
    title: "Strategic Innovation & Performance Milestone",
    focus: "Evaluating 90-day achievements, goal calibration, and initiating internal mentorship.",
    tasks: [
      { title: "90-day comprehensive performance & growth calibration with VP", type: "MEETING", duration: "1 hour", assignee: "Max Wenger" },
      { title: "Formulate quarterly OKRs for next fiscal cycle", type: "OBJECTIVE", duration: "2 days", assignee: "Self-driven" },
      { title: "Sign up for TalentOS internal mobility mentorship circle", type: "TRAINING", duration: "30 mins", assignee: "People & Culture" },
    ],
  },
];

export function OnboardingClient() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const activeMilestone = ONBOARDING_PLAN[activePhaseIndex];

  const voiceNarrative = `Welcome to TalentOS Adaptive Onboarding. This plan is tailored specifically to your engineering role, aligning your initial 90 days with active Project Nova milestones and your mentorship pairing with Max Wenger. In phase one, your focus is environment setup and deploying your first staging release.`;

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] mb-1">
            <BookOpen size={13} />
            <span>ADAPTIVE ONBOARDING PLATFORM</span>
          </div>
          <h1
            className="text-3xl font-bold tracking-tighter text-white"
            style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
          >
            Personalized Onboarding Plan
          </h1>
          <p className="text-sm text-[#808080] mt-1" style={{ fontFamily: "Times, serif" }}>
            Role-calibrated 30-60-90 day milestone roadmap integrated with mentor pairings and project needs.
          </p>
        </div>

        <VoicePlayer text={voiceNarrative} label="Listen to Onboarding Guide" />
      </div>

      {/* Target Employee Context Banner */}
      <div
        className="p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{
          background: "linear-gradient(135deg, rgba(52, 55, 85, 0.3) 0%, rgba(0, 0, 0, 0.4) 100%)",
          border: "1px solid #343755",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/15 border border-[#00F0FF] flex items-center justify-center text-[#00F0FF]">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                Personalized Onboarding: Senior ML Engineer
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                AI Custom Plan
              </span>
            </div>
            <p className="text-xs text-[#808080] mt-0.5">
              Assigned Mentor: Max Wenger (VP Engineering) • Primary Initiative: Project Nova
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#a3a3a3]">Overall Completion:</span>
          <span className="text-xs font-mono font-bold text-[#00F0FF]">28% Complete</span>
        </div>
      </div>

      {/* Phase Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {ONBOARDING_PLAN.map((m, idx) => {
          const isActive = idx === activePhaseIndex;
          return (
            <button
              key={m.phase}
              type="button"
              onClick={() => setActivePhaseIndex(idx)}
              className={`p-4 rounded-xl text-left transition-all flex flex-col gap-1.5 ${
                isActive
                  ? "bg-[#343755] border-[#00F0FF] text-white shadow-lg"
                  : "bg-white/[0.02] border-white/10 text-[#808080] hover:text-white hover:border-white/30"
              }`}
              style={{ border: `1px solid ${isActive ? "#00F0FF" : "rgba(255, 255, 255, 0.08)"}` }}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#00F0FF]">
                {m.phase}
              </span>
              <span className="text-xs font-bold truncate text-white">{m.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Phase Details */}
      <div
        className="p-6 md:p-8 rounded-xl flex flex-col gap-6"
        style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF]">
              <span>ACTIVE PHASE: {activeMilestone.phase}</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              {activeMilestone.title}
            </h2>
            <p className="text-xs text-[#a3a3a3] mt-1 leading-relaxed">
              {activeMilestone.focus}
            </p>
          </div>

          <VoicePlayer
            text={`${activeMilestone.phase}. ${activeMilestone.title}. Key focus: ${activeMilestone.focus}. There are ${activeMilestone.tasks.length} core tasks in this phase.`}
            label="Audio Phase Brief"
          />
        </div>

        {/* Task Cards */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#808080]">
            Action Items & Deliverables ({activeMilestone.tasks.length})
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeMilestone.tasks.map((task, i) => {
              const getTypeBadge = () => {
                switch (task.type) {
                  case "SETUP":
                    return { label: "SETUP", color: "text-[#00F0FF] bg-[#00F0FF]/10 border-[#00F0FF]/30" };
                  case "MEETING":
                    return { label: "MEETING", color: "text-purple-400 bg-purple-500/10 border-purple-500/30" };
                  case "TRAINING":
                    return { label: "TRAINING", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" };
                  case "OBJECTIVE":
                    return { label: "OBJECTIVE", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" };
                }
              };
              const badge = getTypeBadge();

              return (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between gap-3 hover:border-white/20 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${badge.color}`}>
                        {badge.label}
                      </span>
                      <span className="text-[11px] font-mono text-[#808080] flex items-center gap-1">
                        <Clock size={11} /> {task.duration}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-white leading-relaxed">
                      {task.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/5 text-[#808080]">
                    <span className="flex items-center gap-1 text-[#a3a3a3]">
                      <UserCheck size={12} /> {task.assignee}
                    </span>
                    <button
                      type="button"
                      className="text-xs text-[#00F0FF] hover:underline flex items-center gap-1"
                    >
                      <span>Mark Done</span>
                      <CheckCircle2 size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
