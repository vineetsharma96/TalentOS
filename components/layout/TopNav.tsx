"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Search,
  Bell,
  Cpu,
  Layers,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { CommandPalette } from "@/components/navigation/CommandPalette";
import { ShowcaseTour } from "@/components/navigation/ShowcaseTour";

interface TopNavProps {
  userName?: string;
  userEmail?: string;
  userRole?: string;
  userPhotoUrl?: string;
}

const ROUTE_TITLES: Record<string, string> = {
  "/dashboard": "Command Center",
  "/workforce": "Workforce Overview",
  "/employees": "Employee Directory",
  "/connections": "Employee Connections Graph",
  "/ai": "AI Decision Center",
  "/recruitment": "Recruitment Intelligence",
  "/onboarding": "Adaptive Onboarding",
  "/policies": "HR Policy Reasoning",
  "/simulation": "Workforce Simulation",
  "/mobility": "Internal Talent Marketplace",
  "/settings": "System Settings",
};

export function TopNav({
  userName = "Vikram Admin",
  userEmail = "admin@talentos.dev",
  userRole = "ADMIN",
  userPhotoUrl = "https://api.dicebear.com/9.x/avataaars/svg?seed=usr-admin",
}: TopNavProps) {
  const pathname = usePathname();
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const currentTitle =
    ROUTE_TITLES[pathname] ??
    (pathname.startsWith("/employees/")
      ? "Employee Intelligence Dossier"
      : "TalentOS Platform");

  return (
    <>
      <header
        className="sticky top-0 z-30 w-full h-16 px-8 flex items-center justify-between"
        style={{
          background: "rgba(0, 0, 0, 0.75)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Left: Breadcrumbs & Page indicator */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#808080] font-mono">TalentOS</span>
          <ChevronRight size={12} className="text-[#4d4d4d]" />
          <span
            className="text-white font-semibold tracking-tight text-sm"
            style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
          >
            {currentTitle}
          </span>
        </div>

        {/* Right: Quick Search, Status Pill, AI Quick Trigger & User Avatar */}
        <div className="flex items-center gap-3">
          {/* Command Palette Trigger */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white/70 hover:text-white bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all"
            title="Search commands, employees, or AI scenarios (Ctrl+K)"
          >
            <Search size={13} className="text-white/40" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/50 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Graph & AI Health Badge */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono text-[#808080]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
            <span className="text-[#c6c6c6]">Graph: 62 Nodes</span>
            <span className="text-[#4d4d4d]">•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck size={11} /> Multi-Agent Active
            </span>
          </div>

          {/* Quick AI Trigger */}
          <Link
            href="/ai"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:bg-white/10"
            style={{
              background: "rgba(52, 55, 85, 0.4)",
              border: "1px solid #343755",
              fontFamily: "var(--font-nbarchitekt, sans-serif)",
            }}
            title="Open AI Decision Center"
          >
            <Sparkles size={13} className="text-[#00F0FF]" />
            <span className="hidden md:inline">Ask AI Decision</span>
          </Link>

          {/* User Pill */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={userPhotoUrl}
              alt={userName}
              className="w-8 h-8 rounded-full border border-white/20 bg-black/40 object-cover"
            />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-white leading-tight">
                {userName}
              </span>
              <span className="text-[10px] font-mono text-[#00F0FF]">
                {userRole}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Global Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />

      {/* Evaluator Guided Tour Widget */}
      <ShowcaseTour />
    </>
  );
}
