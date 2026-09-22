"use client";

import React from "react";
import type { AIEvidence } from "@/types/ai";
import { Database, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";

interface EvidenceCardProps {
  evidence: AIEvidence;
}

export function EvidenceCard({ evidence }: EvidenceCardProps) {
  const getBadgeStyle = () => {
    switch (evidence.type) {
      case "FACT":
        return {
          bg: "rgba(16, 185, 129, 0.12)",
          border: "#10B981",
          text: "#10B981",
          icon: <Database size={12} />,
          label: "VERIFIED FACT",
        };
      case "PREDICTION":
        return {
          bg: "rgba(245, 158, 11, 0.12)",
          border: "#F59E0B",
          text: "#F59E0B",
          icon: <TrendingUp size={12} />,
          label: "ML PREDICTION",
        };
      case "AI_INTERPRETATION":
        return {
          bg: "rgba(0, 240, 255, 0.12)",
          border: "#00F0FF",
          text: "#00F0FF",
          icon: <Sparkles size={12} />,
          label: "AI INTERPRETATION",
        };
      case "RECOMMENDATION":
        return {
          bg: "rgba(168, 85, 247, 0.12)",
          border: "#A855F7",
          text: "#C084FC",
          icon: <CheckCircle2 size={12} />,
          label: "ACTION RECOMMENDATION",
        };
    }
  };

  const style = getBadgeStyle();

  return (
    <div
      className="p-3.5 rounded-lg flex flex-col gap-2 transition-all hover:bg-white/[0.04]"
      style={{
        background: "rgba(255, 255, 255, 0.02)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase"
          style={{
            background: style.bg,
            border: `1px solid ${style.border}`,
            color: style.text,
            fontFamily: "var(--font-nbarchitekt, sans-serif)",
          }}
        >
          {style.icon}
          {style.label}
        </span>

        {evidence.confidence !== undefined && (
          <span
            className="text-[10px] font-mono text-[#808080]"
            title={`Confidence score: ${(evidence.confidence * 100).toFixed(0)}%`}
          >
            Confidence: <span className="text-white font-bold">{Math.round(evidence.confidence * 100)}%</span>
          </span>
        )}
      </div>

      <p
        className="text-xs leading-relaxed text-[#d4d4d4]"
        style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
      >
        {evidence.content}
      </p>

      {evidence.source && (
        <div className="pt-1 mt-1 border-t border-white/5 flex items-center justify-between text-[10px] text-[#808080]">
          <span className="truncate">Source: <span className="text-[#a3a3a3]">{evidence.source}</span></span>
        </div>
      )}
    </div>
  );
}
