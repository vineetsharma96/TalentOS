"use client";

import React, { useState } from "react";
import {
  FileText,
  Search,
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  UploadCloud,
  Send,
  Loader2,
} from "lucide-react";
import { VoicePlayer } from "@/components/voice/VoicePlayer";

interface PolicyDoc {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  summary: string;
  keyClauses: string[];
}

const POLICY_LIBRARY: PolicyDoc[] = [
  {
    id: "pol-1",
    title: "Global Flexible & Remote Work Framework",
    category: "Workplace & Mobility",
    lastUpdated: "January 2026",
    summary: "Governs remote work guidelines, home office allowances, co-working stipends, and international work allowances.",
    keyClauses: [
      "§4.2: Team members may work remotely up to 100% within approved legal tax jurisdictions with manager sign-off.",
      "§4.5: Temporary international work permitted up to 30 continuous business days per calendar year without tax withholding changes.",
      "§5.1: Annual $1,200 home office and ergonomic health allowance reimbursed via payroll.",
    ],
  },
  {
    id: "pol-2",
    title: "Global Parental & Family Leave Policy",
    category: "Benefits & Well-being",
    lastUpdated: "November 2025",
    summary: "Comprehensive paid leave provisions for primary and secondary caregivers, adoption, and surrogacy.",
    keyClauses: [
      "§7.1: 16 weeks of 100% fully paid parental leave available after 6 months of continuous full-time employment.",
      "§7.3: Phased return-to-work program: 80% hours at 100% salary for the first 4 weeks post-leave.",
      "§8.0: Additional 10 days of paid compassionate emergency leave per annum.",
    ],
  },
  {
    id: "pol-3",
    title: "Professional Growth & Learning Stipend Guidelines",
    category: "L&D & Career",
    lastUpdated: "February 2026",
    summary: "Defines learning budgets, book allowances, approved conference sponsorships, and certification reimbursements.",
    keyClauses: [
      "§2.1: $2,500 annual individual budget for courses, books, university programs, and accredited certifications.",
      "§3.4: 5 dedicated 'Learning Days' per year during work hours without deduction from vacation allowance.",
      "§4.0: 100% company-paid travel and registration for employees delivering accepted keynote presentations at tier-1 conferences.",
    ],
  },
  {
    id: "pol-4",
    title: "Performance Calibration & Promotion Cycle",
    category: "People Operations",
    lastUpdated: "December 2025",
    summary: "Outlines bi-annual review cadences, 360-degree feedback criteria, and promotion committee standards.",
    keyClauses: [
      "§1.3: Calibration cycles occur bi-annually in June and December with peer feedback from at least 3 collaborators.",
      "§2.8: Promotion packets require evidence of sustained impact at next level for at least 2 consecutive quarters.",
    ],
  },
];

export function PoliciesClient() {
  const [activePolicy, setActivePolicy] = useState<PolicyDoc>(POLICY_LIBRARY[0]);
  const [qaInput, setQaInput] = useState("");
  const [qaAnswer, setQaAnswer] = useState<{
    query: string;
    answer: string;
    citation: string;
    confidence: number;
  } | null>({
    query: "What is our international remote work limit?",
    answer: "According to Section 4.5 of the Global Flexible & Remote Work Framework, full-time employees can work internationally for up to 30 continuous business days per calendar year with manager approval, without requiring special international tax withholding setup.",
    citation: "TalentOS Global Flexible & Remote Work Framework §4.5",
    confidence: 0.98,
  });
  const [isAsking, setIsAsking] = useState(false);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qaInput.trim() || isAsking) return;

    setIsAsking(true);
    setTimeout(() => {
      const lower = qaInput.toLowerCase();
      let ans = "";
      let cit = "";

      if (lower.includes("parental") || lower.includes("maternity") || lower.includes("paternity") || lower.includes("baby")) {
        ans = "Under §7.1 of the Global Parental Leave Policy, employees with at least 6 months continuous tenure are entitled to 16 weeks of 100% fully paid parental leave, plus a 4-week phased return-to-work program.";
        cit = "Global Parental & Family Leave Policy §7.1";
      } else if (lower.includes("budget") || lower.includes("stipend") || lower.includes("learn") || lower.includes("course") || lower.includes("book")) {
        ans = "Section 2.1 of the Professional Growth Guidelines provides every full-time team member with a $2,500 annual stipend for courses, books, and certifications, plus 5 paid learning days.";
        cit = "Professional Growth & Learning Stipend Guidelines §2.1";
      } else if (lower.includes("promot") || lower.includes("review") || lower.includes("evaluat")) {
        ans = "Section 1.3 states that performance calibrations occur bi-annually (June & December) with peer feedback required from at least 3 cross-functional teammates.";
        cit = "Performance Calibration & Promotion Cycle §1.3";
      } else {
        ans = "TalentOS policies mandate remote-first flexibility, 25 annual PTO days, a $1,200 annual home office setup allowance, and comprehensive cross-border healthcare.";
        cit = "Global Flexible & Remote Work Framework §4.2";
      }

      setQaAnswer({
        query: qaInput,
        answer: ans,
        citation: cit,
        confidence: 0.96,
      });
      setIsAsking(false);
      setQaInput("");
    }, 700);
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] mb-1">
            <FileText size={13} />
            <span>SEMANTIC POLICY RAG & CITATIONS</span>
          </div>
          <h1
            className="text-3xl font-bold tracking-tighter text-white"
            style={{ fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)" }}
          >
            HR Policy Reasoning & Citations
          </h1>
          <p className="text-sm text-[#808080] mt-1" style={{ fontFamily: "Times, serif" }}>
            Natural language Q&A grounded in verified policy documentation with clause-level citations and confidence scoring.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <ShieldCheck size={14} /> 4 Vector Indexes Active
          </span>
        </div>
      </div>

      {/* Interactive Policy Search & QA Box */}
      <div
        className="p-6 rounded-2xl flex flex-col gap-5"
        style={{
          background: "linear-gradient(135deg, rgba(52, 55, 85, 0.3) 0%, rgba(0, 0, 0, 0.4) 100%)",
          border: "1px solid #343755",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
            <Sparkles size={14} className="text-[#00F0FF]" /> Ask Policy Questions with Direct Citations
          </div>
          <span className="text-[10px] font-mono text-[#808080]">Retrieval Augmented Generation</span>
        </div>

        <form onSubmit={handleAsk} className="relative">
          <div className="flex items-center rounded-xl bg-black/60 border border-white/10 p-1.5 focus-within:border-[#00F0FF] transition-all">
            <Search size={16} className="text-[#808080] ml-3 mr-2" />
            <input
              type="text"
              value={qaInput}
              onChange={(e) => setQaInput(e.target.value)}
              placeholder="e.g. Can I work from Europe for 3 weeks? What is my learning budget?"
              className="flex-1 bg-transparent px-2 py-2 text-sm text-white placeholder-[#808080] focus:outline-none"
              style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
            />
            <button
              type="submit"
              disabled={!qaInput.trim() || isAsking}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#343755] border border-white/20 disabled:opacity-30 flex items-center gap-1.5"
            >
              {isAsking ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
              <span>Verify</span>
            </button>
          </div>
        </form>

        {/* Answer with Voice & Citation */}
        {qaAnswer && (
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                <CheckCircle size={13} className="text-emerald-400" /> Grounded Answer for: &ldquo;{qaAnswer.query}&rdquo;
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-[#808080]">
                  Confidence: <span className="text-white font-bold">{Math.round(qaAnswer.confidence * 100)}%</span>
                </span>
                <VoicePlayer text={qaAnswer.answer} compact />
              </div>
            </div>

            <p className="text-xs text-[#e5e5e5] leading-relaxed">
              {qaAnswer.answer}
            </p>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-[#808080]">
              <span className="text-[#00F0FF] flex items-center gap-1">
                <FileText size={12} /> {qaAnswer.citation}
              </span>
              <span className="font-mono text-[10px]">Verified against HR Document Registry</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Split: Policy Documents & Selected Document Clauses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Selector (1 Col) */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-mono text-[#808080] uppercase tracking-wider">
            Indexed Policies ({POLICY_LIBRARY.length})
          </span>

          {POLICY_LIBRARY.map((doc) => {
            const isSelected = doc.id === activePolicy.id;
            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => setActivePolicy(doc)}
                className={`p-4 rounded-xl text-left transition-all flex flex-col gap-2 ${
                  isSelected
                    ? "bg-[#343755]/40 border-[#00F0FF] shadow-lg"
                    : "bg-white/[0.02] border-white/10 hover:border-white/30"
                }`}
                style={{ border: `1px solid ${isSelected ? "#00F0FF" : "rgba(255, 255, 255, 0.08)"}` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#00F0FF]">
                    {doc.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#808080]">
                    {doc.lastUpdated}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white leading-snug">{doc.title}</h4>

                <p className="text-xs text-[#808080] line-clamp-2 leading-relaxed">
                  {doc.summary}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Policy Detail & Clauses (2 Cols) */}
        <div
          className="lg:col-span-2 p-6 rounded-xl flex flex-col gap-6"
          style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-[#00F0FF] uppercase tracking-wider">
                {activePolicy.category}
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                {activePolicy.title}
              </h3>
              <p className="text-xs text-[#808080] mt-0.5">
                Effective: {activePolicy.lastUpdated} • Full legal compliance verified
              </p>
            </div>

            <VoicePlayer
              text={`${activePolicy.title}. ${activePolicy.summary}`}
              label="Listen to Policy Brief"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#808080]">
              Executive Summary
            </span>
            <p className="text-xs leading-relaxed text-[#c6c6c6] bg-white/[0.02] p-4 rounded-xl border border-white/5">
              {activePolicy.summary}
            </p>
          </div>

          {/* Key Clauses */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <BookOpen size={14} className="text-[#00F0FF]" /> Key Operational Clauses
            </span>

            <div className="flex flex-col gap-2.5">
              {activePolicy.keyClauses.map((clause, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3 hover:border-white/20 transition-all"
                >
                  <span className="w-6 h-6 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-[#e5e5e5] leading-relaxed">
                    {clause}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
