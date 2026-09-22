"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Briefcase,
  Users,
  ShieldAlert,
  Sparkles,
  Calendar,
  Layers,
  Award,
  TrendingUp,
  Brain,
} from "lucide-react";
import type { EmployeeRecord } from "@/lib/data-store";
import { VoicePlayer } from "@/components/voice/VoicePlayer";

interface EmployeeProfileClientProps {
  employee: EmployeeRecord;
  manager: EmployeeRecord | null;
  collaborators: EmployeeRecord[];
  projects: string[];
}

export function EmployeeProfileClient({
  employee,
  manager,
  collaborators,
  projects,
}: EmployeeProfileClientProps) {
  const isHighRisk = employee.flightRisk === "HIGH";

  const voiceBio = `${employee.name} is a ${employee.role} in the ${employee.department} department, working on team ${employee.team}. With ${employee.experience} years of experience, key competencies include ${employee.skills.slice(0, 3).map((s) => s.replace("sk-", "")).join(", ")}. Performance rating is currently ${employee.performanceRating} out of 5.`;

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-16">
      {/* Back button */}
      <div>
        <Link
          href="/employees"
          className="inline-flex items-center gap-1.5 text-xs text-[#808080] hover:text-white transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Employee Directory</span>
        </Link>
      </div>

      {/* Hero Header Card */}
      <div
        className="p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{
          background: "linear-gradient(135deg, rgba(52, 55, 85, 0.4) 0%, rgba(0, 0, 0, 0.5) 100%)",
          border: "1px solid #343755",
        }}
      >
        <div className="flex items-center gap-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={employee.photoUrl}
            alt={employee.name}
            className="w-20 h-20 rounded-2xl border-2 border-white/20 bg-black/50 object-cover shadow-2xl"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1
                className="text-2xl md:text-3xl font-bold text-white tracking-tight"
                style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
              >
                {employee.name}
              </h1>
              {isHighRisk ? (
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center gap-1">
                  <ShieldAlert size={12} /> HIGH FLIGHT RISK
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  RATING {employee.performanceRating}
                </span>
              )}
            </div>
            <p className="text-sm text-[#00F0FF] mt-1 font-mono">
              {employee.role} • {employee.team} ({employee.department})
            </p>
            <p className="text-xs text-[#808080] mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1"><Mail size={12} /> {employee.email}</span>
              <span className="flex items-center gap-1"><Calendar size={12} /> Joined {employee.joiningDate}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <VoicePlayer text={voiceBio} label="Audio Bio" />
          <Link
            href={`/connections?focus=${employee.id}`}
            className="px-4 py-2 rounded-lg text-xs font-medium text-white transition-all bg-[#00F0FF]/10 border border-[#00F0FF]/40 text-[#00F0FF] hover:bg-[#00F0FF]/20 flex items-center gap-1.5"
          >
            <span>Graph View</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: AI Intelligence & Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Skills, Bio, Projects, Risk Analysis */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* AI Executive Summary */}
          <div
            className="p-6 rounded-xl flex flex-col gap-3"
            style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                <Sparkles size={14} className="text-[#00F0FF]" /> AI Performance & Talent Summary
              </span>
              <span className="text-[10px] font-mono text-[#808080]">Synthesized from Reviews</span>
            </div>
            <p className="text-xs leading-relaxed text-[#c6c6c6]" style={{ fontFamily: "Times, serif", fontSize: "14px" }}>
              {employee.bio}
            </p>
          </div>

          {/* Flight Risk Alert Breakdown */}
          {isHighRisk && (
            <div
              className="p-5 rounded-xl flex flex-col gap-2.5"
              style={{ background: "rgba(244, 63, 94, 0.08)", border: "1px solid rgba(244, 63, 94, 0.3)" }}
            >
              <div className="flex items-center justify-between text-rose-400 font-bold text-xs uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert size={14} /> Attrition Hazard Analysis ({Math.round((employee.riskScore ?? 0.8) * 100)}% Probability)
                </span>
              </div>
              <p className="text-xs text-rose-200/90 leading-relaxed">
                {employee.riskFactor || "Key contributing signals include high market competition for this specialization, below-band compensation, and recent project overload."}
              </p>
              <div className="pt-2">
                <Link
                  href={`/ai?prompt=What is the retention strategy for ${encodeURIComponent(employee.name)}?`}
                  className="inline-flex items-center gap-1.5 text-xs text-[#00F0FF] hover:underline font-medium"
                >
                  <Brain size={12} /> Generate personalized retention intervention plan →
                </Link>
              </div>
            </div>
          )}

          {/* Verified Skills */}
          <div
            className="p-6 rounded-xl flex flex-col gap-4"
            style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Award size={14} className="text-amber-400" /> Verified Competencies ({employee.skills.length})
              </span>
              <span className="text-[10px] font-mono text-[#808080]">Verified via Neo4j Graph</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {employee.skills.map((s) => (
                <div
                  key={s}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 bg-white/5 border border-white/10"
                >
                  <span className="text-white">{s.replace("sk-", "")}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                    VERIFIED
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Projects */}
          <div
            className="p-6 rounded-xl flex flex-col gap-4"
            style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Layers size={14} className="text-purple-400" /> Active Strategic Projects
            </span>
            <div className="flex flex-wrap gap-2">
              {projects.length > 0 ? (
                projects.map((p) => (
                  <span
                    key={p}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-purple-500/10 border border-purple-500/20"
                  >
                    🚀 {p}
                  </span>
                ))
              ) : (
                <span className="text-xs text-[#808080]">Direct departmental operations</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Reporting chain, Collaborators */}
        <div className="flex flex-col gap-6">
          {/* Manager / Reporting Chain */}
          <div
            className="p-5 rounded-xl flex flex-col gap-3"
            style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#808080]">
              Reports To
            </span>
            {manager ? (
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={manager.photoUrl}
                  alt={manager.name}
                  className="w-10 h-10 rounded-lg border border-white/10 bg-black/40"
                />
                <div>
                  <Link
                    href={`/employees/${manager.id}`}
                    className="text-xs font-bold text-white hover:text-[#00F0FF] transition-colors"
                  >
                    {manager.name}
                  </Link>
                  <span className="text-[11px] text-[#808080] block">{manager.role}</span>
                </div>
              </div>
            ) : (
              <span className="text-xs text-white/60">Executive Leadership (Direct Report to Board/CEO)</span>
            )}
          </div>

          {/* Key Collaborators */}
          <div
            className="p-5 rounded-xl flex flex-col gap-4"
            style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#808080] flex items-center justify-between">
              <span>Frequent Collaborators ({collaborators.length})</span>
              <Users size={12} />
            </span>

            <div className="flex flex-col gap-3">
              {collaborators.map((c) => (
                <div key={c.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.photoUrl}
                      alt={c.name}
                      className="w-7 h-7 rounded-lg border border-white/10 bg-black/40"
                    />
                    <div>
                      <Link
                        href={`/employees/${c.id}`}
                        className="text-xs font-medium text-white hover:text-[#00F0FF] transition-colors"
                      >
                        {c.name}
                      </Link>
                      <span className="text-[10px] text-[#808080] block truncate max-w-[130px]">
                        {c.role}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#808080]">{c.team}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
