"use client";

import React, { useState } from "react";
import {
  Sliders,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Play,
  Sparkles,
  Layers,
  ArrowRight,
  Shield,
  Activity,
  DollarSign,
} from "lucide-react";
import { VoicePlayer } from "@/components/voice/VoicePlayer";

interface Scenario {
  id: string;
  name: string;
  category: string;
  description: string;
  metrics: {
    velocityImpact: string;
    velocityPositive: boolean;
    attritionDelta: string;
    attritionPositive: boolean;
    budgetImpact: string;
    skillCoverage: string;
  };
  synthesis: string;
  recommendedMitigations: string[];
}

const PRESET_SCENARIOS: Scenario[] = [
  {
    id: "scen-1",
    name: "Critical LLM Specialist Flight Event",
    category: "Risk Mitigation",
    description: "Models organizational impact if high-risk LLM Engineer Omar Abdullah departs within 60 days.",
    metrics: {
      velocityImpact: "-38% on Nova Pipeline",
      velocityPositive: false,
      attritionDelta: "+12% peer risk contagion",
      attritionPositive: false,
      budgetImpact: "$145,000 replacement cost",
      skillCoverage: "-25% in LLM Engineering",
    },
    synthesis: "The loss of Omar Abdullah would immediately bottleneck the Nova ML Pipeline for 6 to 8 weeks. Furthermore, the AI/ML team would drop from 4 to 3 practitioners, creating on-call fatigue for Chioma Eze and Ben Zhou.",
    recommendedMitigations: [
      "Issue proactive equity refresh and retention bonus package within 14 days.",
      "Initiate immediate cross-training of David Kim and Amara Osei on vLLM model deployment.",
      "Re-weight sprint commitments to alleviate single-person dependency.",
    ],
  },
  {
    id: "scen-2",
    name: "Engineering Expansion (+8 Headcount)",
    category: "Strategic Growth",
    description: "Simulates opening 5 AI/ML and 3 Platform engineering positions to accelerate Atlas & Nova.",
    metrics: {
      velocityImpact: "+45% across platform initiatives",
      velocityPositive: true,
      attritionDelta: "-18% on-call load reduction",
      attritionPositive: true,
      budgetImpact: "+$1,420,000 annualized payroll",
      skillCoverage: "+60% in MLOps & Kubernetes",
    },
    synthesis: "Scaling engineering by 8 heads eliminates current on-call bottlenecks in Platform and SRE, while providing redundant coverage for all critical ML serving infrastructure.",
    recommendedMitigations: [
      "Distribute onboarding across Sarah Chen and James Okonkwo to maintain manager span-of-control under 7:1.",
      "Utilize AI recruitment matching to reduce hiring cycle time from 52 to 28 days.",
    ],
  },
  {
    id: "scen-3",
    name: "Enterprise Sales Pivot & Rebalance",
    category: "Commercial Re-org",
    description: "Promoting 3 SDRs to Enterprise Account Executives and reallocating 2 Sales Engineers.",
    metrics: {
      velocityImpact: "+28% enterprise deal velocity",
      velocityPositive: true,
      attritionDelta: "-10% career mobility boost",
      attritionPositive: true,
      budgetImpact: "+$95,000 base adjustment",
      skillCoverage: "+35% in Complex Sales Negotiation",
    },
    synthesis: "Promoting internal sales talent delivers immediate morale uplift and capitalizes on existing product knowledge, yielding faster time-to-first-deal than external hiring.",
    recommendedMitigations: [
      "Assign Marcus Johnson (VP Sales) to direct executive coaching for the 3 promoted reps.",
      "Backfill SDR pipeline via automated inbound qualification tooling.",
    ],
  },
];

export function SimulationClient() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(PRESET_SCENARIOS[0]);
  const [headcountDelta, setHeadcountDelta] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const voiceScript = `Workforce simulation brief for: ${activeScenario.name}. Projected velocity impact is ${activeScenario.metrics.velocityImpact}, with ${activeScenario.metrics.budgetImpact}. The recommendation is to proceed with proactive retention interventions.`;

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] mb-1">
            <Sliders size={13} />
            <span>WHAT-IF WORKFORCE SIMULATION ENGINE</span>
          </div>
          <h1
            className="text-3xl font-bold tracking-tighter text-white"
            style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
          >
            Workforce Simulation Center
          </h1>
          <p className="text-sm text-[#808080] mt-1" style={{ fontFamily: "Times, serif" }}>
            Model organizational restructuring, critical skill flight events, and headcount expansion before committing budget.
          </p>
        </div>

        <VoicePlayer text={voiceScript} label="Listen to Scenario Impact" />
      </div>

      {/* Scenario Presets Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PRESET_SCENARIOS.map((scen) => {
          const isSelected = scen.id === activeScenario.id;
          return (
            <button
              key={scen.id}
              type="button"
              onClick={() => setActiveScenario(scen)}
              className={`p-4 rounded-xl text-left transition-all flex flex-col gap-2 ${
                isSelected
                  ? "bg-[#343755] border-[#00F0FF] text-white shadow-lg"
                  : "bg-white/[0.02] border-white/10 text-[#808080] hover:text-white hover:border-white/30"
              }`}
              style={{ border: `1px solid ${isSelected ? "#00F0FF" : "rgba(255, 255, 255, 0.08)"}` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#00F0FF]">
                  {scen.category}
                </span>
                <Activity size={12} className={isSelected ? "text-[#00F0FF]" : "text-[#808080]"} />
              </div>
              <h4 className="text-sm font-bold text-white">{scen.name}</h4>
              <p className="text-xs text-[#a3a3a3] line-clamp-2 leading-relaxed">
                {scen.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Simulation View */}
      <div
        className="p-6 md:p-8 rounded-2xl flex flex-col gap-6"
        style={{
          background: "linear-gradient(135deg, rgba(52, 55, 85, 0.3) 0%, rgba(0, 0, 0, 0.4) 100%)",
          border: "1px solid #343755",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-mono text-[#00F0FF] uppercase tracking-wider">
              ACTIVE SCENARIO MODEL
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
              {activeScenario.name}
            </h2>
            <p className="text-xs text-[#c6c6c6] mt-1">{activeScenario.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white">
              Simulation Engine v3.1 (Monte Carlo 10,000x)
            </span>
          </div>
        </div>

        {/* Projected Impact Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between gap-2">
            <span className="text-[10px] uppercase font-mono text-[#808080] flex items-center justify-between">
              <span>Velocity Impact</span>
              {activeScenario.metrics.velocityPositive ? (
                <TrendingUp size={14} className="text-emerald-400" />
              ) : (
                <TrendingDown size={14} className="text-rose-400" />
              )}
            </span>
            <span
              className={`text-lg font-bold font-mono ${
                activeScenario.metrics.velocityPositive ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {activeScenario.metrics.velocityImpact}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between gap-2">
            <span className="text-[10px] uppercase font-mono text-[#808080] flex items-center justify-between">
              <span>Attrition Delta</span>
              <AlertTriangle size={14} className={activeScenario.metrics.attritionPositive ? "text-emerald-400" : "text-amber-400"} />
            </span>
            <span className="text-lg font-bold font-mono text-white">
              {activeScenario.metrics.attritionDelta}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between gap-2">
            <span className="text-[10px] uppercase font-mono text-[#808080] flex items-center justify-between">
              <span>Budget Exposure</span>
              <DollarSign size={14} className="text-purple-400" />
            </span>
            <span className="text-lg font-bold font-mono text-purple-300">
              {activeScenario.metrics.budgetImpact}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between gap-2">
            <span className="text-[10px] uppercase font-mono text-[#808080] flex items-center justify-between">
              <span>Skill Deficit</span>
              <Layers size={14} className="text-[#00F0FF]" />
            </span>
            <span className="text-lg font-bold font-mono text-[#00F0FF]">
              {activeScenario.metrics.skillCoverage}
            </span>
          </div>
        </div>

        {/* AI Synthesis Summary */}
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#808080] flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#00F0FF]" /> Predictive Impact Narrative
          </span>
          <p className="text-xs text-[#e5e5e5] leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
            {activeScenario.synthesis}
          </p>
        </div>

        {/* Recommended Strategic Mitigations */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
            <Shield size={14} className="text-emerald-400" /> Actionable Mitigations & Protocol
          </span>

          <div className="flex flex-col gap-2">
            {activeScenario.recommendedMitigations.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-black/20 border border-white/5 flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs text-[#d4d4d4] leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
