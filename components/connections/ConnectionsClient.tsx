"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Network, List, Search } from "lucide-react";
import { GraphCanvas } from "@/components/connections/GraphCanvas";
import { ConnectionPanel } from "@/components/connections/ConnectionPanel";
import { InlineErrorState } from "@/components/errors/InlineErrorState";
import type { WorkforceGraph } from "@/types/graph";

interface ConnectionsClientProps {
  initialGraph: WorkforceGraph;
}

export function ConnectionsClient({ initialGraph }: ConnectionsClientProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"graph" | "list">("graph");
  const [search, setSearch] = useState("");

  const handleSelectEmployee = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  const filteredNodes = initialGraph.nodes.filter((n) =>
    search === "" ||
    n.data.name.toLowerCase().includes(search.toLowerCase()) ||
    n.data.role.toLowerCase().includes(search.toLowerCase()) ||
    n.data.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div
        className="flex items-center gap-4 px-6 py-4 shrink-0"
        style={{ borderBottom: "1px solid #4d4d4d" }}
      >
        <div className="flex items-center gap-2">
          <Network size={16} className="text-[#343755]" aria-hidden="true" />
          <h1
            className="text-sm font-bold text-white uppercase tracking-widest"
            style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
          >
            Employee Connections
          </h1>
        </div>

        <div className="flex items-center gap-1 ml-4">
          <span
            className="text-[10px] px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(52,55,85,0.3)",
              color: "#c6c6c6",
              fontFamily: "var(--font-nbarchitekt, sans-serif)",
              borderRadius: "500px",
            }}
          >
            {initialGraph.meta.totalEmployees} employees
          </span>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              color: "#808080",
              fontFamily: "var(--font-nbarchitekt, sans-serif)",
              borderRadius: "500px",
            }}
          >
            {initialGraph.meta.totalConnections} connections
          </span>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative">
            <Search
              size={12}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white/30"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search employees…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-7 pl-7 pr-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(77,77,77,0.5)",
                borderRadius: "5px",
                width: "200px",
                fontFamily: "var(--font-nbarchitekt, sans-serif)",
              }}
              aria-label="Search employees"
            />
          </div>

          {/* Toggle view */}
          <div
            className="flex"
            role="group"
            aria-label="View mode"
            style={{ border: "1px solid #4d4d4d", borderRadius: "5px", overflow: "hidden" }}
          >
            <button
              onClick={() => setViewMode("graph")}
              aria-pressed={viewMode === "graph"}
              className="flex items-center gap-1 px-2 py-1 transition-colors"
              style={{
                background: viewMode === "graph" ? "#343755" : "transparent",
                color: viewMode === "graph" ? "#fff" : "#808080",
                fontFamily: "var(--font-nbarchitekt, sans-serif)",
                fontSize: "10px",
              }}
              title="Graph view"
            >
              <Network size={12} aria-hidden="true" /> Graph
            </button>
            <button
              onClick={() => setViewMode("list")}
              aria-pressed={viewMode === "list"}
              className="flex items-center gap-1 px-2 py-1 transition-colors"
              style={{
                background: viewMode === "list" ? "#343755" : "transparent",
                color: viewMode === "list" ? "#fff" : "#808080",
                fontFamily: "var(--font-nbarchitekt, sans-serif)",
                fontSize: "10px",
                borderLeft: "1px solid #4d4d4d",
              }}
              title="List view"
            >
              <List size={12} aria-hidden="true" /> List
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard hint */}
      {selectedId && (
        <div
          className="px-6 py-2 text-[9px] uppercase tracking-widest"
          style={{ color: "#4d4d4d", fontFamily: "var(--font-nbarchitekt, sans-serif)", borderBottom: "1px solid rgba(77,77,77,0.3)" }}
          aria-live="polite"
        >
          Click employee to select · Click canvas to deselect · Scroll to zoom
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 relative overflow-hidden">
        {viewMode === "graph" ? (
          <>
            <GraphCanvas
              graphData={initialGraph}
              onSelectEmployee={handleSelectEmployee}
              selectedEmployeeId={selectedId}
            />
            <ConnectionPanel
              selectedId={selectedId}
              graphData={initialGraph}
              onClose={() => setSelectedId(null)}
            />
          </>
        ) : (
          /* Accessible list fallback */
          <div
            className="h-full overflow-y-auto p-6"
            role="region"
            aria-label="Employee connections list"
          >
            <p
              className="text-xs mb-4"
              style={{ color: "#808080", fontFamily: "Times, serif" }}
            >
              Showing {filteredNodes.length} of {initialGraph.nodes.length} employees
            </p>
            <table
              className="w-full"
              aria-label="All employees and their connections"
            >
              <thead>
                <tr style={{ borderBottom: "1px solid #4d4d4d" }}>
                  {["Employee", "Role", "Department", "Connections"].map((h) => (
                    <th
                      key={h}
                      className="text-left pb-2 pr-4"
                      style={{
                        fontFamily: "var(--font-nbarchitekt, sans-serif)",
                        fontSize: "9px",
                        color: "#4d4d4d",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        fontWeight: 400,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredNodes.map((node) => {
                  const connCount = initialGraph.edges.filter(
                    (e) => e.source === node.id || e.target === node.id
                  ).length;

                  return (
                    <tr
                      key={node.id}
                      style={{ borderBottom: "1px solid rgba(77,77,77,0.2)" }}
                      className="hover:bg-white/5 cursor-pointer transition-colors"
                      onClick={() => {
                        setViewMode("graph");
                        setSelectedId(node.id);
                      }}
                    >
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={node.data.photoUrl}
                            alt=""
                            width={24}
                            height={24}
                            className="rounded-full"
                            style={{ objectFit: "cover" }}
                            loading="lazy"
                          />
                          <span
                            className="text-xs text-white"
                            style={{ fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
                          >
                            {node.data.name}
                          </span>
                        </div>
                      </td>
                      <td
                        className="py-3 pr-4 text-xs"
                        style={{ color: "#c6c6c6", fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
                      >
                        {node.data.role}
                      </td>
                      <td
                        className="py-3 pr-4 text-xs"
                        style={{ color: "#808080", fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
                      >
                        {node.data.department}
                      </td>
                      <td
                        className="py-3 text-xs"
                        style={{ color: "#343755", fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
                      >
                        {connCount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Legend */}
      {viewMode === "graph" && !selectedId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-16 left-4 flex flex-col gap-1.5 p-3 rounded"
          style={{
            background: "rgba(0,0,0,0.7)",
            border: "1px solid #4d4d4d",
            backdropFilter: "blur(4px)",
            borderRadius: "5px",
          }}
          aria-label="Graph legend"
          role="region"
        >
          <p
            className="text-[8px] uppercase tracking-widest mb-1"
            style={{ color: "#4d4d4d", fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
          >
            Connection types
          </p>
          {[
            { color: "#343755", label: "Same Team" },
            { color: "rgba(52,55,85,0.6)", label: "Collaborated" },
            { color: "rgba(198,198,198,0.5)", label: "Reports to" },
            { color: "rgba(198,198,198,0.4)", label: "Mentors" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className="block w-4 h-0.5"
                style={{ background: color }}
                aria-hidden="true"
              />
              <span
                className="text-[9px]"
                style={{ color: "#808080", fontFamily: "var(--font-nbarchitekt, sans-serif)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
