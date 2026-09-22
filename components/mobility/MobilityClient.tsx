"use client";

import React, { useState } from "react";
import {
  Briefcase,
  TrendingUp,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  Clock,
  Compass,
} from "lucide-react";
import Link from "next/link";
import { VoicePlayer } from "@/components/voice/VoicePlayer";

interface MobilityCard {
  id: string;
  employeeName: string;
  employeeId: string;
  currentRole: string;
  targetRole: string;
  matchScore: number;
  gapSkills: string[];
  learningWeeks: number;
  recommendedProject: string;
  mentorName: string;
  readinessSummary: string;
}

const MOBILITY_OPPORTUNITIES: MobilityCard[] = [
  {
    id: "mob-1",
    employeeName: "David Kim",
    employeeId: "e-006",
    currentRole: "Senior Backend Engineer",
    targetRole: "Staff MLOps & Distributed Systems Lead",
    matchScore: 0.89,
    gapSkills: ["LLM Engineering", "MLOps Architecture"],
    learningWeeks: 4,
    recommendedProject: "Project Nova ML Pipeline",
    mentorName: "Ben Zhou (ML Lead)",
    readinessSummary: "Possesses strong Go, Python, and PostgreSQL fundamentals. Transitioning to MLOps requires 4 weeks of hands-on model quantization and containerized inference experience.",
  },
  {
    id: "mob-2",
    employeeName: "Carlos Rivera",
    employeeId: "e-003",
    currentRole: "Frontend Engineer",
    targetRole: "Design Technologist / UI Architect",
    matchScore: 0.92,
    gapSkills: ["Design Systems Governance", "Figma Advanced Tokens"],
    learningWeeks: 3,
    recommendedProject: "Horizon Design System",
    mentorName: "Sofia Martinez (Product Design)",
    readinessSummary: "Exceptional React and Next.js capability. Pairing with Product Design will channel high creativity and mitigate flight hazard.",
  },
  {
    id: "mob-3",
    employeeName: "Fatima Al-Hassan",
    employeeId: "e-013",
    currentRole: "Cloud Engineer",
    targetRole: "Site Reliability & Security Architect",
    matchScore: 0.86,
    gapSkills: ["Go Programming", "Chaos Engineering"],
    learningWeeks: 6,
    recommendedProject: "Atlas Platform Hardening",
    mentorName: "Elena Vasquez (Principal Engineer)",
    readinessSummary: "Extensive AWS and Terraform background. Gaining systems programming depth in Go unlocks promotion to principal tier.",
  },
];

export function MobilityClient() {
  const [selectedMobility, setSelectedMobility] = useState<MobilityCard>(MOBILITY_OPPORTUNITIES[0]);

  const voiceText = `Internal talent marketplace report. Currently 3 senior personnel demonstrate high readiness for horizontal progression and leadership promotion. Top candidate is David Kim for the Staff MLOps Lead trajectory.`;

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] mb-1">
            <Compass size={13} />
            <span>TALENT MOBILITY & CAREER TRAJECTORY ENGINE</span>
          </div>
          <h1
            className="text-3xl font-bold tracking-tighter text-white"
            style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
          >
            Internal Talent Marketplace
          </h1>
          <p className="text-sm text-[#808080] mt-1" style={{ fontFamily: "Times, serif" }}>
            Unlocking horizontal mobility, skill adjacency progressions, and internal project staffing opportunities.
          </p>
        </div>

        <VoicePlayer text={voiceText} label="Listen to Mobility Brief" />
      </div>

      {/* Main Split: Candidates & Trajectory View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidates List (1 Col) */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono text-[#808080] uppercase tracking-wider">
            Mobility Candidates ({MOBILITY_OPPORTUNITIES.length})
          </span>

          {MOBILITY_OPPORTUNITIES.map((item) => {
            const isSelected = item.id === selectedMobility.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedMobility(item)}
                className={`p-4 rounded-xl text-left transition-all flex flex-col gap-2 ${
                  isSelected
                    ? "bg-[#343755]/40 border-[#00F0FF] shadow-lg"
                    : "bg-white/[0.02] border-white/10 hover:border-white/30"
                }`}
                style={{ border: `1px solid ${isSelected ? "#00F0FF" : "rgba(255, 255, 255, 0.08)"}` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{item.employeeName}</span>
                  <span className="text-xs font-mono font-bold text-[#00F0FF]">
                    {Math.round(item.matchScore * 100)}% FIT
                  </span>
                </div>

                <div className="text-xs text-[#808080]">
                  <span>{item.currentRole}</span>
                  <div className="flex items-center gap-1 text-[#00F0FF] mt-1 font-mono text-[11px]">
                    <ArrowRight size={11} /> {item.targetRole}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Trajectory Details (2 Cols) */}
        <div
          className="lg:col-span-2 p-6 md:p-8 rounded-xl flex flex-col gap-6"
          style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {selectedMobility.employeeName}
                </h3>
                <Link
                  href={`/employees/${selectedMobility.employeeId}`}
                  className="text-xs text-[#00F0FF] hover:underline"
                >
                  View Profile →
                </Link>
              </div>
              <p className="text-xs text-[#a3a3a3] mt-1">
                Current: <span className="text-white">{selectedMobility.currentRole}</span> → Target: <span className="text-[#00F0FF] font-medium">{selectedMobility.targetRole}</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold font-mono text-[#00F0FF]">
                {Math.round(selectedMobility.matchScore * 100)}%
              </span>
              <span className="text-[10px] text-[#808080] uppercase tracking-wider block">
                Adjacency Fit
              </span>
            </div>
          </div>

          {/* Readiness Summary */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#808080] flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#00F0FF]" /> AI Career Pathing Assessment
            </span>
            <p className="text-xs text-[#d4d4d4] leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
              {selectedMobility.readinessSummary}
            </p>
          </div>

          {/* Bridge Skills & Mentorship */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Award size={13} className="text-amber-400" /> Bridging Skills Required
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {selectedMobility.gapSkills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-amber-500/10 border border-amber-500/30 text-amber-300"
                  >
                    + {s}
                  </span>
                ))}
              </div>
              <span className="text-[11px] text-[#808080] mt-1 flex items-center gap-1">
                <Clock size={11} /> Estimated ramp: {selectedMobility.learningWeeks} weeks
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Layers size={13} className="text-purple-400" /> Targeted Project & Mentor
              </span>
              <div className="text-xs text-[#e5e5e5] mt-1">
                <span className="text-[#808080] block text-[11px]">Recommended Project:</span>
                <span className="font-semibold text-white">🚀 {selectedMobility.recommendedProject}</span>
              </div>
              <div className="text-xs text-[#e5e5e5]">
                <span className="text-[#808080] block text-[11px]">Executive Mentor:</span>
                <span className="text-[#00F0FF]">{selectedMobility.mentorName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
