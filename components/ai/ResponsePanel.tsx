"use client";

import React from "react";
import type { AIResponse } from "@/types/ai";
import { AgentTrace } from "./AgentTrace";
import { EvidenceCard } from "./EvidenceCard";
import { VoicePlayer } from "@/components/voice/VoicePlayer";
import { Sparkles, Layers, ShieldCheck } from "lucide-react";

interface ResponsePanelProps {
  response: AIResponse;
}

export function ResponsePanel({ response }: ResponsePanelProps) {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Response Header with Voice AI */}
      <div
        className="p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
        style={{
          background: "linear-gradient(135deg, rgba(52, 55, 85, 0.3) 0%, rgba(0, 0, 0, 0.4) 100%)",
          border: "1px solid #343755",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(0, 240, 255, 0.15)", border: "1px solid #00F0FF" }}
          >
            <Sparkles size={20} className="text-[#00F0FF]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3
                className="text-base font-bold text-white tracking-tight"
                style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
              >
                Synthesized Decision Intelligence
              </h3>
              <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck size={11} /> Evidence Backed
              </span>
            </div>
            <p className="text-xs text-[#808080] font-mono mt-0.5">
              Query ID: {response.requestId}
            </p>
          </div>
        </div>

        {/* ElevenLabs Voice Playback Button */}
        <div>
          <VoicePlayer text={response.answer} label="Listen with ElevenLabs AI" />
        </div>
      </div>

      {/* Agent Trace */}
      <AgentTrace agentPath={response.agentPath} processingMs={response.processingMs} />

      {/* Main Answer Card */}
      <div
        className="p-6 rounded-xl"
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="prose prose-invert max-w-none text-sm leading-relaxed whitespace-pre-line text-[#e5e5e5]">
          {response.answer}
        </div>
      </div>

      {/* Evidence Section */}
      {response.evidence && response.evidence.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Layers size={14} className="text-[#00F0FF]" />
            <h4
              className="text-xs font-bold uppercase tracking-wider text-white"
              style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
            >
              Auditable Evidence & Data Sources ({response.evidence.length})
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {response.evidence.map((ev, i) => (
              <EvidenceCard key={i} evidence={ev} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
