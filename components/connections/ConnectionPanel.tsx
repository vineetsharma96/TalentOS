"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Briefcase, Users, Award, TrendingUp } from "lucide-react";
import type { WorkforceGraph } from "@/types/graph";
import type { ConnectionType } from "@/types/employee";
import { slideInRight } from "@/lib/motion";

const CONNECTION_LABELS: Record<ConnectionType, { label: string; color: string }> = {
  SAME_TEAM: { label: "Same Team", color: "#343755" },
  SAME_PROJECT: { label: "Same Project", color: "rgba(52,55,85,0.6)" },
  REPORTS_TO: { label: "Reports to", color: "rgba(198,198,198,0.5)" },
  MENTORS: { label: "Mentors", color: "rgba(198,198,198,0.4)" },
  COLLABORATED_WITH: { label: "Collaborated", color: "rgba(77,77,77,0.8)" },
};

interface ConnectionPanelProps {
  selectedId: string | null;
  graphData: WorkforceGraph;
  onClose: () => void;
}

export function ConnectionPanel({ selectedId, graphData, onClose }: ConnectionPanelProps) {
  const employee = selectedId
    ? graphData.nodes.find((n) => n.id === selectedId)?.data
    : null;

  const connections = selectedId
    ? graphData.edges
        .filter((e) => e.source === selectedId || e.target === selectedId)
        .map((e) => {
          const otherId = e.source === selectedId ? e.target : e.source;
          const other = graphData.nodes.find((n) => n.id === otherId)?.data;
          return other
            ? {
                ...other,
                connectionType: e.data.connectionType,
                label: e.data.label,
                projectName: e.data.projectName,
              }
            : null;
        })
        .filter(Boolean)
    : [];

  // Deduplicate connections
  const uniqueConnections = connections.reduce<typeof connections>((acc, conn) => {
    if (conn && !acc.find((c) => c?.employeeId === conn.employeeId)) {
      acc.push(conn);
    }
    return acc;
  }, []);

  return (
    <AnimatePresence>
      {employee && (
        <motion.aside
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute right-0 top-0 h-full w-[340px] overflow-y-auto z-20 flex flex-col"
          style={{
            background: "rgba(0,0,0,0.85)",
            borderLeft: "1px solid #4d4d4d",
            backdropFilter: "blur(8px)",
          }}
          role="complementary"
          aria-label={`${employee.name} profile and connections`}
        >
          {/* Header */}
          <div
            className="flex items-start justify-between p-6"
            style={{ borderBottom: "1px solid #4d4d4d" }}
          >
            <div className="flex items-center gap-4 min-w-0">
              {/* Avatar */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <svg
                  viewBox="0 0 100 100"
                  width={56}
                  height={56}
                  aria-hidden="true"
                >
                  <defs>
                    <clipPath id="panel-hex-clip">
                      <path d="M50 5 L93 27.5 L93 72.5 L50 95 L7 72.5 L7 27.5 Z" />
                    </clipPath>
                  </defs>
                  <path
                    d="M50 5 L93 27.5 L93 72.5 L50 95 L7 72.5 L7 27.5 Z"
                    fill="rgba(52,55,85,0.3)"
                    stroke="#343755"
                    strokeWidth={2}
                  />
                  <image
                    href={employee.photoUrl}
                    x={7}
                    y={7}
                    width={86}
                    height={86}
                    clipPath="url(#panel-hex-clip)"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </svg>
              </div>

              <div className="min-w-0">
                <h2
                  className="text-sm font-bold text-white truncate"
                  style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
                >
                  {employee.name}
                </h2>
                <p
                  className="text-xs truncate mt-0.5"
                  style={{ color: "#c6c6c6", fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
                >
                  {employee.role}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "#808080", fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
                >
                  {employee.department}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="shrink-0 p-1 rounded text-white/30 hover:text-white transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/30"
              style={{ borderRadius: "5px" }}
              aria-label="Close profile panel"
            >
              <X size={16} />
            </button>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-3 divide-x"
            style={{ borderBottom: "1px solid #4d4d4d", divideColor: "#4d4d4d" }}
          >
            {[
              { icon: Users, label: "Connections", value: uniqueConnections.length },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="p-4 text-center">
                <p
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
                >
                  {value}
                </p>
                <p
                  className="label-data mt-1"
                  style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)", fontSize: "8px" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Connections list */}
          <div className="flex-1 p-4">
            <h3
              className="label-data mb-4"
              style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
            >
              Direct Connections ({uniqueConnections.length})
            </h3>

            {uniqueConnections.length === 0 ? (
              <p
                className="text-xs text-center py-8"
                style={{ color: "#4d4d4d", fontFamily: "Times, serif" }}
              >
                No direct connections found.
              </p>
            ) : (
              <div className="space-y-2">
                {uniqueConnections.map((conn) => {
                  if (!conn) return null;
                  const connStyle = CONNECTION_LABELS[conn.connectionType as ConnectionType] ?? {
                    label: conn.connectionType,
                    color: "#4d4d4d",
                  };

                  return (
                    <div
                      key={conn.employeeId}
                      className="flex items-center gap-3 p-2 rounded"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(77,77,77,0.3)",
                        borderRadius: "5px",
                      }}
                    >
                      {/* Mini avatar */}
                      <svg viewBox="0 0 100 100" width={32} height={32} aria-hidden="true">
                        <defs>
                          <clipPath id={`conn-hex-${conn.employeeId}`}>
                            <path d="M50 5 L93 27.5 L93 72.5 L50 95 L7 72.5 L7 27.5 Z" />
                          </clipPath>
                        </defs>
                        <path
                          d="M50 5 L93 27.5 L93 72.5 L50 95 L7 72.5 L7 27.5 Z"
                          fill="rgba(0,0,0,0.5)"
                          stroke="rgba(77,77,77,0.5)"
                          strokeWidth={2}
                        />
                        <image
                          href={conn.photoUrl}
                          x={7} y={7} width={86} height={86}
                          clipPath={`url(#conn-hex-${conn.employeeId})`}
                          preserveAspectRatio="xMidYMid slice"
                        />
                      </svg>

                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs font-semibold text-white truncate"
                          style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
                        >
                          {conn.name}
                        </p>
                        <p
                          className="text-[9px] truncate"
                          style={{ color: "#808080", fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
                        >
                          {conn.role}
                        </p>
                      </div>

                      {/* Connection type badge */}
                      <span
                        className="shrink-0 px-2 py-0.5 rounded-full text-[8px] uppercase tracking-wider"
                        style={{
                          background: connStyle.color,
                          color: "rgba(255,255,255,0.8)",
                          fontFamily: "var(--font-nbarchitekt, sans-serif)",
                          borderRadius: "500px",
                          fontSize: "7px",
                        }}
                      >
                        {connStyle.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* View full profile link */}
          <div className="p-4" style={{ borderTop: "1px solid #4d4d4d" }}>
            <a
              href={`/employees/${employee.employeeId}`}
              className="block w-full text-center py-2 rounded font-bold text-sm transition-all focus-visible:outline focus-visible:outline-1 focus-visible:outline-white/30"
              style={{
                background: "#343755",
                color: "#ffffff",
                fontFamily: "var(--font-nbarchitekt, sans-serif)",
                fontSize: "12px",
                borderRadius: "5px",
              }}
            >
              View Full Profile →
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
