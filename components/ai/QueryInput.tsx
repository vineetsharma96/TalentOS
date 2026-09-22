"use client";

import React, { useState } from "react";
import { Send, Loader2, Sparkles, AlertTriangle, Cpu, Compass, BookOpen } from "lucide-react";

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

const SUGGESTED_QUERIES = [
  {
    icon: <AlertTriangle size={13} className="text-amber-400" />,
    label: "Flight Risks",
    query: "Who are the top flight risks in Engineering and what are the intervention recommendations?",
  },
  {
    icon: <Cpu size={13} className="text-[#00F0FF]" />,
    label: "Skill Gaps",
    query: "What critical skill gaps exist in our AI/ML and Cloud engineering teams?",
  },
  {
    icon: <Compass size={13} className="text-purple-400" />,
    label: "Project Phoenix",
    query: "Analyze Project Phoenix staffing bottlenecks and cross-functional collaboration status.",
  },
  {
    icon: <BookOpen size={13} className="text-emerald-400" />,
    label: "Remote Policy",
    query: "What is the policy for working remotely internationally and what are the leave allowances?",
  },
];

export function QueryInput({ onSubmit, isLoading }: QueryInputProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    onSubmit(query.trim());
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="relative">
        <div
          className="relative flex items-center rounded-xl p-1.5 transition-all focus-within:ring-1 focus-within:ring-[#00F0FF]"
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid #4d4d4d",
          }}
        >
          <div className="pl-3 pr-2 text-[#808080]">
            <Sparkles size={18} className="text-[#00F0FF]" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about your workforce, skills, flight risks, project capacity..."
            className="flex-1 bg-transparent px-2 py-2 text-sm text-white placeholder-[#808080] focus:outline-none"
            style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
            style={{
              background: "#343755",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              fontFamily: "var(--font-nbarchitekt, sans-serif)",
            }}
          >
            {isLoading ? (
              <Loader2 size={14} className="animate-spin text-white" />
            ) : (
              <>
                <span>Reason</span>
                <Send size={12} />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Suggested Quick Prompts */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] text-[#808080] uppercase tracking-wider font-mono">
          Strategic Prompts:
        </span>
        {SUGGESTED_QUERIES.map((sq, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setQuery(sq.query);
              onSubmit(sq.query);
            }}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all hover:bg-white/10 hover:border-white/30 text-[#a3a3a3] hover:text-white"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              fontFamily: "var(--font-nbarchitekt, sans-serif)",
            }}
          >
            {sq.icon}
            <span>{sq.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
