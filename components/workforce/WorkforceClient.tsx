"use client";

import React, { useState } from "react";
import {
  Users,
  TrendingUp,
  AlertTriangle,
  Layers,
  ArrowUpRight,
  ShieldAlert,
  Brain,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { VoicePlayer } from "@/components/voice/VoicePlayer";

interface DepartmentMetric {
  name: string;
  count: number;
}

interface SkillMetric {
  name: string;
  count: number;
}

interface HighRiskEmployee {
  id: string;
  name: string;
  role: string;
  department: string;
  team: string;
  riskScore: number;
  riskFactor?: string;
  photoUrl: string;
}

interface WorkforceClientProps {
  total: number;
  departments: DepartmentMetric[];
  topSkills: SkillMetric[];
  highRisks: HighRiskEmployee[];
  activeProjects: number;
  graphDensity: number;
}

export function WorkforceClient({
  total,
  departments,
  topSkills,
  highRisks,
  activeProjects,
  graphDensity,
}: WorkforceClientProps) {
  const [selectedDept, setSelectedDept] = useState<string>("ALL");

  const filteredDepts =
    selectedDept === "ALL"
      ? departments
      : departments.filter((d) => d.name === selectedDept);

  const voiceSummary = `Workforce intelligence summary. We have ${total} active employees across ${departments.length} departments. Overall graph connectivity is at ${graphDensity} percent with ${activeProjects} active initiatives. Three high-impact team members are flagged for flight risk interventions in Engineering.`;

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] mb-1">
            <Layers size={13} />
            <span>ORGANIZATIONAL TOPOLOGY & HEALTH</span>
          </div>
          <h1
            className="text-3xl font-bold tracking-tighter text-white"
            style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
          >
            Workforce Overview
          </h1>
          <p className="text-sm text-[#808080] mt-1" style={{ fontFamily: "Times, serif" }}>
            Real-time headcount dynamics, critical skill distribution, and proactive attrition monitoring.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <VoicePlayer text={voiceSummary} label="Executive Audio Brief" />
          <Link
            href="/connections"
            className="px-4 py-2 rounded-lg text-xs font-medium text-white transition-all flex items-center gap-1.5"
            style={{
              background: "#343755",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              fontFamily: "var(--font-nbarchitekt, sans-serif)",
            }}
          >
            <span>Open Graph</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="p-5 rounded-xl flex flex-col justify-between"
          style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid #4d4d4d" }}
        >
          <div className="flex items-center justify-between text-[#808080]">
            <span className="text-[10px] uppercase tracking-wider font-mono">Headcount</span>
            <Users size={16} className="text-white" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-white font-mono">{total}</span>
            <span className="text-xs text-emerald-400 block mt-1">+4.2% YoY growth</span>
          </div>
        </div>

        <div
          className="p-5 rounded-xl flex flex-col justify-between"
          style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid #4d4d4d" }}
        >
          <div className="flex items-center justify-between text-[#808080]">
            <span className="text-[10px] uppercase tracking-wider font-mono">Graph Density</span>
            <TrendingUp size={16} className="text-[#00F0FF]" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-[#00F0FF] font-mono">{graphDensity}%</span>
            <span className="text-xs text-[#808080] block mt-1">Cross-functional synergy</span>
          </div>
        </div>

        <div
          className="p-5 rounded-xl flex flex-col justify-between"
          style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid #4d4d4d" }}
        >
          <div className="flex items-center justify-between text-[#808080]">
            <span className="text-[10px] uppercase tracking-wider font-mono">Active Projects</span>
            <Layers size={16} className="text-purple-400" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-white font-mono">{activeProjects}</span>
            <span className="text-xs text-[#808080] block mt-1">Strategic initiatives</span>
          </div>
        </div>

        <div
          className="p-5 rounded-xl flex flex-col justify-between"
          style={{ background: "rgba(244, 63, 94, 0.06)", border: "1px solid rgba(244, 63, 94, 0.3)" }}
        >
          <div className="flex items-center justify-between text-rose-400">
            <span className="text-[10px] uppercase tracking-wider font-mono">Flight Hazard</span>
            <AlertTriangle size={16} />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-rose-400 font-mono">{highRisks.length}</span>
            <span className="text-xs text-rose-300/80 block mt-1">Immediate action needed</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Department Breakdown & Flight Risk Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Distribution (2 Cols) */}
        <div
          className="lg:col-span-2 p-6 rounded-xl flex flex-col gap-6"
          style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white" style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}>
                Department Distribution & Capacity
              </h3>
              <p className="text-xs text-[#808080] mt-0.5">Headcount allocation across core business units</p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setSelectedDept("ALL")}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all ${
                  selectedDept === "ALL"
                    ? "bg-[#343755] text-white border border-white/20"
                    : "text-[#808080] hover:text-white"
                }`}
              >
                All
              </button>
              {departments.map((d) => (
                <button
                  key={d.name}
                  onClick={() => setSelectedDept(d.name)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all ${
                    selectedDept === d.name
                      ? "bg-[#343755] text-white border border-white/20"
                      : "text-[#808080] hover:text-white"
                  }`}
                >
                  {d.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Department Bar Charts */}
          <div className="flex flex-col gap-4">
            {filteredDepts.map((dept) => {
              const percentage = Math.round((dept.count / total) * 100);
              return (
                <div key={dept.name} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white font-medium">{dept.name}</span>
                    <span className="text-[#808080] font-mono">
                      {dept.count} members ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        background:
                          dept.name === "Engineering"
                            ? "linear-gradient(90deg, #343755 0%, #00F0FF 100%)"
                            : dept.name === "Product"
                            ? "linear-gradient(90deg, #343755 0%, #A855F7 100%)"
                            : dept.name === "Data & Analytics"
                            ? "linear-gradient(90deg, #343755 0%, #3B82F6 100%)"
                            : "linear-gradient(90deg, #343755 0%, #10B981 100%)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Top Skills Tag Cloud */}
          <div className="pt-4 border-t border-white/5">
            <h4 className="text-xs font-mono text-[#808080] uppercase tracking-wider mb-3">
              Most Concentrated Skills in Organization
            </h4>
            <div className="flex flex-wrap gap-2">
              {topSkills.map((s) => (
                <div
                  key={s.name}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2"
                  style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
                >
                  <span className="text-white">{s.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-[#00F0FF] font-bold">
                    {s.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Flight Risk Monitor (1 Col) */}
        <div
          className="p-6 rounded-xl flex flex-col gap-5"
          style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert size={16} className="text-rose-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white" style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}>
                Flight Risk Sentinel
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
              ML Monitored
            </span>
          </div>

          <p className="text-xs text-[#808080] leading-relaxed">
            Personnel identified by gradient boosting models considering workload spikes, compensation gap, and recruiter reach-outs.
          </p>

          <div className="flex flex-col gap-3">
            {highRisks.map((emp) => (
              <div
                key={emp.id}
                className="p-3.5 rounded-lg flex flex-col gap-2 transition-all hover:bg-rose-500/[0.04]"
                style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(244, 63, 94, 0.2)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={emp.photoUrl}
                      alt={emp.name}
                      className="w-8 h-8 rounded-full border border-white/20 bg-black/40"
                    />
                    <div>
                      <Link
                        href={`/employees/${emp.id}`}
                        className="text-xs font-bold text-white hover:text-[#00F0FF] transition-colors"
                      >
                        {emp.name}
                      </Link>
                      <span className="text-[10px] text-[#808080] block">{emp.role}</span>
                    </div>
                  </div>

                  <span className="text-xs font-bold font-mono text-rose-400">
                    {Math.round(emp.riskScore * 100)}% Risk
                  </span>
                </div>

                {emp.riskFactor && (
                  <p className="text-[11px] text-rose-300/80 bg-rose-500/10 p-2 rounded border border-rose-500/10">
                    ⚠️ {emp.riskFactor}
                  </p>
                )}

                <div className="flex items-center justify-between text-[10px] text-[#808080] pt-1">
                  <span>{emp.department} • {emp.team}</span>
                  <Link
                    href={`/ai?prompt=What is the retention strategy for ${encodeURIComponent(emp.name)}?`}
                    className="text-[#00F0FF] hover:underline"
                  >
                    AI Action Plan →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/ai?prompt=Who are the top flight risks in Engineering and what are the intervention recommendations?"
              className="w-full py-2 rounded-lg text-xs font-medium text-white flex items-center justify-center gap-2 transition-all hover:bg-white/10"
              style={{ background: "rgba(52, 55, 85, 0.4)", border: "1px solid #343755" }}
            >
              <Brain size={13} className="text-[#00F0FF]" />
              <span>Generate Full Retention Brief</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
