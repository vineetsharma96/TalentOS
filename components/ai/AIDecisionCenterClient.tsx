"use client";

import React, { useState } from "react";
import type { AIResponse } from "@/types/ai";
import { QueryInput } from "./QueryInput";
import { ResponsePanel } from "./ResponsePanel";
import { Brain, Cpu, Shield, Zap } from "lucide-react";

interface AIDecisionCenterClientProps {
  initialResponse?: AIResponse | null;
}

export function AIDecisionCenterClient({ initialResponse }: AIDecisionCenterClientProps) {
  const [response, setResponse] = useState<AIResponse | null>(initialResponse ?? null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuery = async (queryText: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryText }),
      });

      if (!res.ok) {
        throw new Error(`AI service responded with status ${res.status}`);
      }

      const data: AIResponse = await res.json();
      setResponse(data);
    } catch (err) {
      console.error("[AIDecisionCenter] Query error:", err);
      setError(err instanceof Error ? err.message : "Failed to process AI query");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF]">
          <Cpu size={14} />
          <span>MULTI-AGENT REASONING LAYER</span>
        </div>
        <h1
          className="text-3xl font-bold tracking-tighter text-white"
          style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
        >
          AI Decision Center
        </h1>
        <p
          className="text-sm text-[#808080]"
          style={{ fontFamily: "Times, serif" }}
        >
          Synthesize knowledge graph relationships, predictive risk vectors, project loads, and HR compliance with auditable evidence.
        </p>
      </div>

      {/* Query Bar */}
      <QueryInput onSubmit={handleQuery} isLoading={isLoading} />

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* Loading state skeleton */}
      {isLoading && (
        <div
          className="p-8 rounded-xl flex flex-col items-center justify-center gap-4 text-center"
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px dashed rgba(255, 255, 255, 0.15)",
          }}
        >
          <div className="w-12 h-12 rounded-full border-2 border-[#00F0FF] border-t-transparent animate-spin" />
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide">
              Orchestrating Specialist Agents...
            </h4>
            <p className="text-xs text-[#808080] mt-1 font-mono">
              Traversing Neo4j Graph → Running Flight Risk Model → Synthesizing Evidence
            </p>
          </div>
        </div>
      )}

      {/* Results */}
      {!isLoading && response && <ResponsePanel response={response} />}

      {/* Empty State / Welcome */}
      {!isLoading && !response && (
        <div
          className="p-12 rounded-xl flex flex-col items-center justify-center text-center gap-6"
          style={{
            background: "rgba(255, 255, 255, 0.015)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(52, 55, 85, 0.4)",
              border: "1px solid #343755",
            }}
          >
            <Brain size={32} className="text-[#00F0FF]" />
          </div>

          <div className="max-w-md">
            <h3
              className="text-lg font-bold text-white mb-2"
              style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
            >
              Ready to Reason Over Your Workforce
            </h3>
            <p className="text-xs text-[#808080] leading-relaxed">
              Ask about employee capabilities, flight hazard probabilities, team bottlenecks, or policy interpretations. All answers are validated against the live workforce knowledge graph.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-2xl text-left">
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="text-xs font-bold text-white block mb-1 flex items-center gap-1.5">
                <Shield size={13} className="text-emerald-400" /> Evidence-Backed
              </span>
              <span className="text-[11px] text-[#808080]">
                Every claim links to verified facts, ML predictions, or policy clauses.
              </span>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="text-xs font-bold text-white block mb-1 flex items-center gap-1.5">
                <Zap size={13} className="text-[#00F0FF]" /> ElevenLabs Voice
              </span>
              <span className="text-[11px] text-[#808080]">
                Listen to synthesized executive briefings with natural AI voice narration.
              </span>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="text-xs font-bold text-white block mb-1 flex items-center gap-1.5">
                <Cpu size={13} className="text-purple-400" /> Multi-Agent
              </span>
              <span className="text-[11px] text-[#808080]">
                Coordinated supervisor and specialist agents route queries autonomously.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
