"use client";

import React, { useState } from "react";
import {
  Settings,
  Database,
  Cpu,
  Volume2,
  Shield,
  CheckCircle2,
  AlertCircle,
  Save,
  RefreshCw,
  Download,
  Activity,
  FileSpreadsheet,
  FileCode,
} from "lucide-react";
import { VoicePlayer } from "@/components/voice/VoicePlayer";

interface SettingsClientProps {
  userEmail: string;
  userRole: string;
}

export function SettingsClient({ userEmail, userRole }: SettingsClientProps) {
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);
  const [selectedVoice, setSelectedVoice] = useState("21m00Tcm4TlvDq8ikWAM");
  const [isSaved, setIsSaved] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [healthData, setHealthData] = useState<any>(null);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const runDiagnostics = async () => {
    setIsPinging(true);
    try {
      const res = await fetch("/api/settings/health");
      if (res.ok) {
        const json = await res.json();
        setHealthData(json);
      }
    } catch (err) {
      console.error("Diagnostic probe failed:", err);
    } finally {
      setIsPinging(false);
    }
  };

  const handleExport = (format: "json" | "csv") => {
    const link = document.createElement("a");
    link.href = `/api/workforce/export?format=${format}`;
    link.download = format === "csv" ? "talentos-workforce-census.csv" : "talentos-knowledge-graph.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] mb-1">
            <Settings size={13} />
            <span>PLATFORM CONFIGURATION & INTEGRATIONS</span>
          </div>
          <h1
            className="text-3xl font-bold tracking-tighter text-white"
            style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
          >
            System Settings
          </h1>
          <p className="text-sm text-[#808080] mt-1" style={{ fontFamily: "Times, serif" }}>
            Configure ElevenLabs voice synthesis, AI reasoning parameters, and database connectivity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={runDiagnostics}
            disabled={isPinging}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all disabled:opacity-50"
          >
            <RefreshCw size={13} className={isPinging ? "animate-spin text-[#00F0FF]" : "text-white/60"} />
            <span>{isPinging ? "Probing Cloud Services..." : "Run Service Diagnostic"}</span>
          </button>
          <VoicePlayer text="TalentOS system settings. All core services are operating normally with active voice synthesis." label="Audio System Check" />
        </div>
      </div>

      {/* Service Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Knowledge Graph Status */}
        <div
          className="p-5 rounded-xl flex flex-col justify-between gap-3 transition-all"
          style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          <div className="flex items-center justify-between text-[#808080]">
            <span className="text-[10px] font-mono uppercase tracking-wider">Graph Datastore</span>
            <Database size={16} className="text-[#00F0FF]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-bold text-white">
                {healthData?.neo4j?.mode ?? "Neo4j / In-Memory Cache"}
              </span>
            </div>
            <p className="text-xs text-[#808080] mt-1">
              62 nodes • 126 relationships mapped
              {healthData?.neo4j?.latencyMs !== undefined && (
                <span className="text-emerald-400 ml-2 font-mono">({healthData.neo4j.latencyMs}ms)</span>
              )}
            </p>
          </div>
        </div>

        {/* ElevenLabs Voice Engine */}
        <div
          className="p-5 rounded-xl flex flex-col justify-between gap-3 transition-all"
          style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          <div className="flex items-center justify-between text-[#808080]">
            <span className="text-[10px] font-mono uppercase tracking-wider">Voice AI Engine</span>
            <Volume2 size={16} className="text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm font-bold text-white">
                {healthData?.elevenlabs?.mode ?? "ElevenLabs / Web Speech"}
              </span>
            </div>
            <p className="text-xs text-[#808080] mt-1">
              TTS proxy active with audio streaming
              {healthData?.elevenlabs?.latencyMs !== undefined && (
                <span className="text-purple-400 ml-2 font-mono">({healthData.elevenlabs.latencyMs}ms)</span>
              )}
            </p>
          </div>
        </div>

        {/* AI Multi-Agent Engine */}
        <div
          className="p-5 rounded-xl flex flex-col justify-between gap-3 transition-all"
          style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          <div className="flex items-center justify-between text-[#808080]">
            <span className="text-[10px] font-mono uppercase tracking-wider">AI Reasoning</span>
            <Cpu size={16} className="text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm font-bold text-white">Multi-Agent Supervisor</span>
            </div>
            <p className="text-xs text-[#808080] mt-1">
              Auditable evidence verification enabled
              {healthData?.aiEngine?.latencyMs !== undefined && (
                <span className="text-amber-400 ml-2 font-mono">({healthData.aiEngine.latencyMs}ms)</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Enterprise Data Snapshot & Exports */}
      <div
        className="p-6 md:p-8 rounded-xl flex flex-col gap-6"
        style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Download size={18} className="text-[#00F0FF]" />
            <h3 className="text-base font-bold text-white">Enterprise Data Snapshot & Exports</h3>
          </div>
          <span className="text-[10px] font-mono text-[#808080]">Instant Snapshot Generation</span>
        </div>

        <p className="text-xs text-white/70 leading-relaxed max-w-3xl">
          Export full workforce snapshots for external HRIS auditing, executive board presentations, or offline graph analytics. All exports reflect real-time relationship edges, verified skills, and flight hazard classifications.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => handleExport("json")}
            className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#00F0FF]/50 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#00F0FF]/10 text-[#00F0FF]">
                <FileCode size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-white group-hover:text-[#00F0FF] transition-colors">
                  Workforce Knowledge Graph (.JSON)
                </div>
                <div className="text-[11px] text-white/50">
                  Full node-edge topology, department metadata, and coordinates
                </div>
              </div>
            </div>
            <Download size={14} className="text-white/40 group-hover:text-white transition-colors" />
          </button>

          <button
            onClick={() => handleExport("csv")}
            className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-400/50 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <FileSpreadsheet size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Workforce Census & Risk Report (.CSV)
                </div>
                <div className="text-[11px] text-white/50">
                  62 employees, tenure, flight risk scores, and skill inventories
                </div>
              </div>
            </div>
            <Download size={14} className="text-white/40 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>

      {/* Voice Configuration Card */}
      <div
        className="p-6 md:p-8 rounded-xl flex flex-col gap-6"
        style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Volume2 size={18} className="text-[#00F0FF]" />
            <h3 className="text-base font-bold text-white">ElevenLabs Voice AI Preferences</h3>
          </div>
          <span className="text-[10px] font-mono text-[#808080]">Server-Side Encrypted</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-[#808080] uppercase tracking-wider">
              Default Executive Voice
            </label>
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="bg-black/80 border border-white/15 text-xs text-white rounded-lg p-2.5 focus:border-[#00F0FF] focus:outline-none"
            >
              <option value="21m00Tcm4TlvDq8ikWAM" className="bg-neutral-900 text-white">Rachel (Calm & Professional)</option>
              <option value="AZnzlk1XvdvUeBnXmlld" className="bg-neutral-900 text-white">Domi (Energetic Executive)</option>
              <option value="EXAVITQu4vr4xnSDxMaL" className="bg-neutral-900 text-white">Bella (Warm & Authoritative)</option>
              <option value="ErXwobaYiN019PkySvjV" className="bg-neutral-900 text-white">Antoni (Clear & Technical)</option>
            </select>
            <span className="text-[11px] text-[#808080]">
              All synthesis requests pass through the secure backend proxy. API keys are never exposed to browser clients.
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-[#808080] uppercase tracking-wider">
                Narration Pace: {voiceSpeed}x
              </label>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.5"
              step="0.05"
              value={voiceSpeed}
              onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
              className="accent-[#00F0FF] mt-2"
            />
            <div className="flex items-center justify-between text-[10px] font-mono text-[#808080]">
              <span>0.75x (Deliberate)</span>
              <span>1.0x (Standard)</span>
              <span>1.5x (Accelerated)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
          {isSaved && (
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1 animate-in fade-in">
              <CheckCircle2 size={13} /> Settings Updated
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#343755] border border-white/20 hover:bg-[#343755]/80 flex items-center gap-1.5"
          >
            <Save size={13} />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
}
