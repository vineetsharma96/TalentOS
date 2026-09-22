"use client";

import React, { useState } from "react";
import {
  UserPlus,
  Sparkles,
  CheckCircle2,
  XCircle,
  Briefcase,
  Layers,
  ArrowRight,
  HelpCircle,
  FileText,
} from "lucide-react";
import { VoicePlayer } from "@/components/voice/VoicePlayer";

interface Candidate {
  id: string;
  name: string;
  targetRole: string;
  matchScore: number;
  stage: "Screening" | "Interviewing" | "Offer" | "Sourced";
  matchedSkills: string[];
  missingSkills: string[];
  experienceYrs: number;
  interviewQuestions: string[];
  summary: string;
}

const DEMO_CANDIDATES: Candidate[] = [
  {
    id: "cand-1",
    name: "Dr. Maya Lin",
    targetRole: "Senior LLM / MLOps Engineer",
    matchScore: 0.94,
    stage: "Interviewing",
    matchedSkills: ["Python", "Machine Learning", "LLM Engineering", "Docker", "AWS"],
    missingSkills: ["Kubernetes", "Apache Spark"],
    experienceYrs: 6,
    summary: "Ex-Scale AI research engineer with strong open-source contributions to vLLM and TensorRT-LLM inference pipelines.",
    interviewQuestions: [
      "How have you architected multi-GPU tensor parallelism for models exceeding 70B parameters?",
      "Can you describe your experience implementing continuous fine-tuning pipelines with RLHF or DPO?",
      "Since our infrastructure runs on Kubernetes, how do you manage cold-start latencies in containerized inference workers?",
    ],
  },
  {
    id: "cand-2",
    name: "Marcus Vance",
    targetRole: "Principal Platform & Cloud Architect",
    matchScore: 0.88,
    stage: "Screening",
    matchedSkills: ["Kubernetes", "Terraform", "AWS", "Go", "Docker"],
    missingSkills: ["Rust", "Neo4j"],
    experienceYrs: 11,
    summary: "Veteran distributed systems engineer with deep multi-region AWS cloud migration experience.",
    interviewQuestions: [
      "What strategies have you employed to manage multi-tenant Kubernetes cluster security across regulated environments?",
      "How do you approach zero-downtime database schema migrations for high-throughput transactional graphs?",
    ],
  },
  {
    id: "cand-3",
    name: "Elena Rostova",
    targetRole: "Staff Product Designer",
    matchScore: 0.91,
    stage: "Offer",
    matchedSkills: ["Figma", "UX Research", "Design Systems", "Product Strategy"],
    missingSkills: ["React / Frontend Prototyping"],
    experienceYrs: 8,
    summary: "Led enterprise design system overhaul at Datadog with a focus on graph visualizations and dense data displays.",
    interviewQuestions: [
      "How do you design interfaces that maintain clarity when visualizing over 1,000 interconnected nodes?",
      "Walk us through your process for balancing accessibility guidelines with high-contrast cinematic dark mode aesthetics.",
    ],
  },
];

export function RecruitmentClient() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(DEMO_CANDIDATES[0]);

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] mb-1">
            <UserPlus size={13} />
            <span>AI RECRUITMENT INTELLIGENCE & RESUME RAG</span>
          </div>
          <h1
            className="text-3xl font-bold tracking-tighter text-white"
            style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
          >
            Recruitment Intelligence
          </h1>
          <p className="text-sm text-[#808080] mt-1" style={{ fontFamily: "Times, serif" }}>
            Automated candidate matching against knowledge graph role requirements, skill gap diagnostics, and AI interview prep.
          </p>
        </div>

        <VoicePlayer
          text={`Recruitment pipeline status. Top candidate is Dr. Maya Lin for the Senior LLM Engineer role, scoring a 94 percent match against active open requisitions. Her primary skill gap is Kubernetes.`}
          label="Pipeline Audio Overview"
        />
      </div>

      {/* Main Split: Candidate List & Detailed Match Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate List (1 Col) */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono text-[#808080] uppercase tracking-wider">
            Active Candidates ({DEMO_CANDIDATES.length})
          </span>

          {DEMO_CANDIDATES.map((cand) => {
            const isSelected = cand.id === selectedCandidate.id;
            return (
              <button
                key={cand.id}
                type="button"
                onClick={() => setSelectedCandidate(cand)}
                className={`p-4 rounded-xl text-left transition-all flex flex-col gap-2 ${
                  isSelected
                    ? "bg-[#343755]/40 border-[#00F0FF] shadow-lg"
                    : "bg-white/[0.02] border-white/10 hover:border-white/30"
                }`}
                style={{ border: `1px solid ${isSelected ? "#00F0FF" : "rgba(255,255,255,0.08)"}` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{cand.name}</span>
                  <span
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                    style={{
                      background: "rgba(0, 240, 255, 0.12)",
                      color: "#00F0FF",
                      border: "1px solid rgba(0, 240, 255, 0.3)",
                    }}
                  >
                    {Math.round(cand.matchScore * 100)}% MATCH
                  </span>
                </div>

                <span className="text-xs text-[#808080]">{cand.targetRole}</span>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/5">
                  <span className="text-[#a3a3a3]">{cand.experienceYrs} yrs exp</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-[#c6c6c6] font-mono">
                    {cand.stage}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Candidate Deep Match Diagnostics (2 Cols) */}
        <div
          className="lg:col-span-2 p-6 rounded-xl flex flex-col gap-6"
          style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          {/* Candidate Header */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {selectedCandidate.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {selectedCandidate.stage}
                </span>
              </div>
              <p className="text-xs text-[#00F0FF] font-mono mt-1">
                Target Requisition: {selectedCandidate.targetRole}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold font-mono text-[#00F0FF]">
                {Math.round(selectedCandidate.matchScore * 100)}%
              </span>
              <span className="text-[10px] text-[#808080] uppercase tracking-wider block">
                Requirement Fit
              </span>
            </div>
          </div>

          {/* AI Summary */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-mono text-[#808080] uppercase tracking-wider flex items-center gap-1.5">
              <FileText size={13} /> Resume Analysis Summary
            </span>
            <p className="text-xs leading-relaxed text-[#c6c6c6] bg-white/[0.02] p-3.5 rounded-lg border border-white/5">
              {selectedCandidate.summary}
            </p>
          </div>

          {/* Skill Match vs Gap Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Matched */}
            <div className="p-4 rounded-lg bg-emerald-500/[0.04] border border-emerald-500/20 flex flex-col gap-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 size={13} /> Matched Verified Skills ({selectedCandidate.matchedSkills.length})
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {selectedCandidate.matchedSkills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                  >
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Gaps */}
            <div className="p-4 rounded-lg bg-amber-500/[0.04] border border-amber-500/20 flex flex-col gap-2">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <XCircle size={13} /> Target Skill Deficits ({selectedCandidate.missingSkills.length})
              </span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {selectedCandidate.missingSkills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 border border-amber-500/30 text-amber-300"
                  >
                    ✕ {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI-Generated Tailored Interview Questions with Voice */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <HelpCircle size={14} className="text-[#00F0FF]" /> AI Recommended Interview Questions
              </span>
              <span className="text-[10px] font-mono text-[#808080]">Calibrated to address skill deficits</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {selectedCandidate.interviewQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-start justify-between gap-3 group hover:border-white/20 transition-all"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-xs font-mono font-bold text-[#00F0FF] mt-0.5">
                      Q{idx + 1}.
                    </span>
                    <p className="text-xs text-[#e5e5e5] leading-relaxed">{q}</p>
                  </div>

                  <VoicePlayer text={q} compact />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
