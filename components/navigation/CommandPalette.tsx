"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Sparkles,
  Users,
  Compass,
  FileText,
  Sliders,
  Share2,
  Workflow,
  ArrowRight,
  X,
  CornerDownLeft,
} from "lucide-react";
import { EMPLOYEES } from "@/lib/data-store";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Navigation Items
  const navItems = [
    { name: "Command Center", href: "/dashboard", icon: Compass, category: "Navigation" },
    { name: "Workforce Connections Graph (62 Nodes)", href: "/connections", icon: Share2, category: "Navigation" },
    { name: "AI Decision Center", href: "/ai", icon: Sparkles, category: "Navigation" },
    { name: "Workforce Overview & Risk Sentinel", href: "/workforce", icon: Workflow, category: "Navigation" },
    { name: "Employee Directory", href: "/employees", icon: Users, category: "Navigation" },
    { name: "Recruitment Intelligence & Match Scores", href: "/recruitment", icon: Users, category: "Navigation" },
    { name: "Adaptive Onboarding Planner", href: "/onboarding", icon: FileText, category: "Navigation" },
    { name: "HR Policy Semantic RAG", href: "/policies", icon: FileText, category: "Navigation" },
    { name: "What-If Workforce Simulator", href: "/simulation", icon: Sliders, category: "Navigation" },
    { name: "Internal Talent Marketplace", href: "/mobility", icon: Compass, category: "Navigation" },
    { name: "System Settings & Audio Engine", href: "/settings", icon: Sliders, category: "Navigation" },
  ].filter((item) => !cleanQuery || item.name.toLowerCase().includes(cleanQuery));

  // AI Presets
  const aiPresets = [
    { title: "Engineering Flight Risk & Attrition Audit", prompt: "Analyze flight risk and burnout across engineering and recommend interventions" },
    { title: "Project Nova Skill Gap Diagnostic", prompt: "Identify skill gaps in our AI/ML team for Project Nova" },
    { title: "Platform SRE Burnout & On-Call Fatigue", prompt: "Evaluate on-call fatigue in Platform engineering and propose restructuring" },
    { title: "Parental Leave & Remote Stipend Policy", prompt: "What are the rules and budget limits for remote equipment and parental leave?" },
  ].filter((p) => !cleanQuery || p.title.toLowerCase().includes(cleanQuery) || p.prompt.toLowerCase().includes(cleanQuery));

  // Employee Matches
  const matchedEmployees = cleanQuery.length >= 2
    ? EMPLOYEES.filter(
        (e) =>
          e.name.toLowerCase().includes(cleanQuery) ||
          e.role.toLowerCase().includes(cleanQuery) ||
          e.department.toLowerCase().includes(cleanQuery) ||
          e.skills.some((s) => s.toLowerCase().includes(cleanQuery))
      ).slice(0, 6)
    : [];

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  const handleAIPreset = (prompt: string) => {
    router.push(`/ai?q=${encodeURIComponent(prompt)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border flex flex-col"
        style={{
          background: "rgba(10, 10, 15, 0.95)",
          borderColor: "rgba(255, 255, 255, 0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search size={18} className="text-[#00F0FF]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search 62 employees, or ask AI..."
            className="flex-1 bg-transparent text-white placeholder-white/40 text-sm focus:outline-none"
            style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
          />
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white p-1 rounded-md transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results Scroll Area */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* AI Scenarios */}
          {aiPresets.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-[#00F0FF] px-2 mb-1.5 flex items-center gap-1.5">
                <Sparkles size={11} /> AI Decision Scenarios
              </div>
              <div className="space-y-1">
                {aiPresets.map((preset) => (
                  <button
                    key={preset.title}
                    onClick={() => handleAIPreset(preset.prompt)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.06] flex items-center justify-between text-xs text-white/80 hover:text-white transition-all group"
                  >
                    <span className="font-medium text-white group-hover:text-[#00F0FF] transition-colors">
                      {preset.title}
                    </span>
                    <span className="text-[10px] text-white/40 flex items-center gap-1">
                      Run AI <CornerDownLeft size={10} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Employee Matches */}
          {matchedEmployees.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 px-2 mb-1.5 flex items-center gap-1.5">
                <Users size={11} /> Employee Intelligence Dossiers
              </div>
              <div className="space-y-1">
                {matchedEmployees.map((emp) => (
                  <button
                    key={emp.id}
                    onClick={() => handleSelect(`/employees/${emp.id}`)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.06] flex items-center justify-between text-xs transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={emp.photoUrl}
                        alt={emp.name}
                        className="w-6 h-6 rounded-full border border-white/20"
                      />
                      <div>
                        <div className="font-medium text-white">{emp.name}</div>
                        <div className="text-[10px] text-white/50">
                          {emp.role} • {emp.department}
                        </div>
                      </div>
                    </div>
                    {emp.flightRisk === "HIGH" && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
                        HIGH RISK
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Items */}
          {navItems.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-white/40 px-2 mb-1.5">
                Platform Navigation
              </div>
              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleSelect(item.href)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/[0.06] flex items-center justify-between text-xs text-white/70 hover:text-white transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={14} className="text-white/40 group-hover:text-white" />
                        <span>{item.name}</span>
                      </div>
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 text-white/50 transition-opacity" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-[11px] text-white/40 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-[#00F0FF]/80">TalentOS Command Palette</span>
        </div>
      </div>
    </div>
  );
}
