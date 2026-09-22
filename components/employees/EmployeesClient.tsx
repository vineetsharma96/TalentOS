"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Users,
  Filter,
  ArrowUpRight,
  ShieldAlert,
  Sparkles,
  Plus,
  Mail,
  Briefcase,
  Layers,
} from "lucide-react";
import type { EmployeeRecord } from "@/lib/data-store";

interface EmployeesClientProps {
  initialEmployees: EmployeeRecord[];
  userRole: string;
}

export function EmployeesClient({ initialEmployees, userRole }: EmployeesClientProps) {
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [riskFilter, setRiskFilter] = useState("ALL");

  const departments = useMemo(() => {
    return ["ALL", ...Array.from(new Set(initialEmployees.map((e) => e.department)))];
  }, [initialEmployees]);

  const filteredEmployees = useMemo(() => {
    return initialEmployees.filter((emp) => {
      const matchesSearch =
        search === "" ||
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.role.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchesDept = selectedDept === "ALL" || emp.department === selectedDept;
      const matchesRisk = riskFilter === "ALL" || emp.flightRisk === riskFilter;

      return matchesSearch && matchesDept && matchesRisk;
    });
  }, [initialEmployees, search, selectedDept, riskFilter]);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] mb-1">
            <Users size={13} />
            <span>PERSONNEL REPOSITORY</span>
          </div>
          <h1
            className="text-3xl font-bold tracking-tighter text-white"
            style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
          >
            Employee Directory ({filteredEmployees.length} of {initialEmployees.length})
          </h1>
          <p className="text-sm text-[#808080] mt-1" style={{ fontFamily: "Times, serif" }}>
            Searchable workforce directory with real-time skills tracking, graph topology, and AI flight risk indicators.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/connections"
            className="px-4 py-2 rounded-lg text-xs font-medium text-white transition-all flex items-center gap-1.5"
            style={{
              background: "#343755",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              fontFamily: "var(--font-nbarchitekt, sans-serif)",
            }}
          >
            <span>View Graph Visualizer</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4"
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid #4d4d4d",
        }}
      >
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808080]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, role, skill, email..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#808080] focus:outline-none focus:border-[#00F0FF]"
            style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
          />
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          <span className="text-xs text-[#808080] flex items-center gap-1">
            <Filter size={12} /> Dept:
          </span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-black/80 border border-white/10 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#00F0FF]"
            style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
          >
            {departments.map((d) => (
              <option key={d} value={d} className="bg-neutral-900 text-white">
                {d}
              </option>
            ))}
          </select>

          <span className="text-xs text-[#808080] ml-2">Risk:</span>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-black/80 border border-white/10 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#00F0FF]"
            style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
          >
            <option value="ALL" className="bg-neutral-900 text-white">All Risks</option>
            <option value="HIGH" className="bg-neutral-900 text-rose-400">High Risk Only</option>
            <option value="MEDIUM" className="bg-neutral-900 text-amber-400">Medium Risk</option>
            <option value="LOW" className="bg-neutral-900 text-emerald-400">Low Risk</option>
          </select>
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((emp) => {
          const isHighRisk = emp.flightRisk === "HIGH";
          return (
            <div
              key={emp.id}
              className="p-5 rounded-xl flex flex-col justify-between gap-4 transition-all hover:border-white/30 group"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: `1px solid ${isHighRisk ? "rgba(244, 63, 94, 0.3)" : "rgba(255, 255, 255, 0.08)"}`,
              }}
            >
              <div>
                {/* Top line with Avatar and Badges */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={emp.photoUrl}
                      alt={emp.name}
                      className="w-12 h-12 rounded-xl border border-white/10 bg-black/40 object-cover"
                    />
                    <div>
                      <Link
                        href={`/employees/${emp.id}`}
                        className="text-sm font-bold text-white hover:text-[#00F0FF] transition-colors"
                        style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
                      >
                        {emp.name}
                      </Link>
                      <span className="text-xs text-[#808080] block truncate max-w-[180px]">
                        {emp.role}
                      </span>
                    </div>
                  </div>

                  {/* Flight risk badge */}
                  {isHighRisk ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                      <ShieldAlert size={10} /> HIGH RISK
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      RATING {emp.performanceRating}
                    </span>
                  )}
                </div>

                {/* Dept & Team metadata */}
                <div className="mt-4 pt-3 border-t border-white/5 flex flex-col gap-1 text-xs text-[#808080]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-white/80">
                      <Briefcase size={12} className="text-[#808080]" /> {emp.department}
                    </span>
                    <span className="font-mono text-[11px] text-[#808080]">
                      {emp.experience} yrs exp
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#a3a3a3]">{emp.team}</span>
                    <span className="text-[#808080] font-mono">Since {emp.joiningDate.slice(0, 4)}</span>
                  </div>
                </div>

                {/* Skills Preview */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {emp.skills.slice(0, 3).map((skillId) => (
                    <span
                      key={skillId}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-[#c6c6c6]"
                    >
                      {skillId.replace("sk-", "")}
                    </span>
                  ))}
                  {emp.skills.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-[#808080]">
                      +{emp.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <a
                  href={`mailto:${emp.email}`}
                  className="text-xs text-[#808080] hover:text-white flex items-center gap-1"
                  title={emp.email}
                >
                  <Mail size={12} /> Contact
                </a>

                <Link
                  href={`/employees/${emp.id}`}
                  className="text-xs text-[#00F0FF] hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Intelligence Profile</span>
                  <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
