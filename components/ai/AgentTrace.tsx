"use client";

import React from "react";
import { ArrowRight, Bot, Cpu, CheckCircle } from "lucide-react";

interface AgentTraceProps {
  agentPath: string[];
  processingMs?: number;
}

export function AgentTrace({ agentPath, processingMs }: AgentTraceProps) {
  if (!agentPath || agentPath.length === 0) return null;

  return (
    <div
      className="p-3 rounded-lg flex flex-col gap-2"
      style={{
        background: "rgba(0, 0, 0, 0.3)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div className="flex items-center justify-between text-[10px] text-[#808080] uppercase tracking-wider">
        <span className="flex items-center gap-1.5 font-bold text-white">
          <Bot size={13} className="text-[#00F0FF]" /> Multi-Agent Execution Pipeline
        </span>
        {processingMs && (
          <span className="font-mono text-[10px]">
            {processingMs}ms total latency
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {agentPath.map((agent, i) => {
          const isLast = i === agentPath.length - 1;
          return (
            <React.Fragment key={i}>
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded text-xs"
                style={{
                  background: isLast ? "rgba(0, 240, 255, 0.12)" : "rgba(255, 255, 255, 0.04)",
                  border: `1px solid ${isLast ? "#00F0FF" : "rgba(255, 255, 255, 0.1)"}`,
                  color: isLast ? "#00F0FF" : "#c6c6c6",
                  fontFamily: "var(--font-nbarchitekt, sans-serif)",
                }}
              >
                {isLast ? <CheckCircle size={11} className="text-[#00F0FF]" /> : <Cpu size={11} className="text-[#808080]" />}
                <span>{agent}</span>
              </div>
              {!isLast && <ArrowRight size={11} className="text-[#4d4d4d] shrink-0" />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
