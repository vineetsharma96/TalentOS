"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type NodeMouseHandler,
  type Node,
  type Edge,
  addEdge,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { HexNode } from "./HexNode";
import type { WorkforceGraph, GraphNode, GraphEdge, NodeState } from "@/types/graph";

const NODE_TYPES = { hexEmployee: HexNode };

const EDGE_STYLES = {
  default: { stroke: "rgba(77,77,77,0.3)", strokeWidth: 1 },
  highlighted: { stroke: "rgba(52,55,85,0.9)", strokeWidth: 2 },
  dimmed: { stroke: "rgba(77,77,77,0.05)", strokeWidth: 0.5 },
};

interface GraphCanvasProps {
  graphData: WorkforceGraph;
  onSelectEmployee: (employeeId: string | null) => void;
  selectedEmployeeId: string | null;
}

export function GraphCanvas({
  graphData,
  onSelectEmployee,
  selectedEmployeeId,
}: GraphCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    graphData.nodes as unknown as Node[]
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    graphData.edges as unknown as Edge[]
  );

  // Compute connected employee IDs for the selected employee
  const connectedIds = useMemo(() => {
    if (!selectedEmployeeId) return new Set<string>();
    const ids = new Set<string>();
    graphData.edges.forEach((edge) => {
      if (edge.source === selectedEmployeeId) ids.add(edge.target);
      if (edge.target === selectedEmployeeId) ids.add(edge.source);
    });
    return ids;
  }, [selectedEmployeeId, graphData.edges]);

  // Compute highlighted edge IDs
  const highlightedEdgeIds = useMemo(() => {
    if (!selectedEmployeeId) return new Set<string>();
    return new Set(
      graphData.edges
        .filter(
          (e) =>
            e.source === selectedEmployeeId ||
            e.target === selectedEmployeeId
        )
        .map((e) => e.id)
    );
  }, [selectedEmployeeId, graphData.edges]);

  // Apply visual states to nodes and edges
  const styledNodes = useMemo(() => {
    return nodes.map((node) => {
      if (!selectedEmployeeId) {
        return {
          ...node,
          data: { ...(node.data as object), state: "default" as NodeState },
        };
      }
      let state: NodeState;
      if (node.id === selectedEmployeeId) state = "selected";
      else if (connectedIds.has(node.id)) state = "connected";
      else state = "dimmed";

      return {
        ...node,
        data: { ...(node.data as object), state },
      };
    });
  }, [nodes, selectedEmployeeId, connectedIds]);

  const styledEdges = useMemo(() => {
    return edges.map((edge) => {
      if (!selectedEmployeeId) {
        return {
          ...edge,
          style: EDGE_STYLES.default,
          animated: false,
          label: undefined,
        };
      }
      if (highlightedEdgeIds.has(edge.id)) {
        const edgeData = graphData.edges.find((e) => e.id === edge.id);
        return {
          ...edge,
          style: EDGE_STYLES.highlighted,
          animated: true,
          label: edgeData?.data?.label,
          labelStyle: {
            fontSize: 8,
            fontFamily: "var(--font-nbarchitekt, sans-serif)",
            fill: "rgba(198,198,198,0.8)",
          },
          labelBgStyle: {
            fill: "rgba(0,0,0,0.8)",
            stroke: "rgba(77,77,77,0.5)",
          },
        };
      }
      return {
        ...edge,
        style: EDGE_STYLES.dimmed,
        animated: false,
        label: undefined,
      };
    });
  }, [edges, selectedEmployeeId, highlightedEdgeIds, graphData.edges]);

  const handleNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      const employeeId = node.id;
      if (employeeId === selectedEmployeeId) {
        // Deselect
        onSelectEmployee(null);
      } else {
        onSelectEmployee(employeeId);
      }
    },
    [selectedEmployeeId, onSelectEmployee]
  );

  const handlePaneClick = useCallback(() => {
    onSelectEmployee(null);
  }, [onSelectEmployee]);

  return (
    <div className="w-full h-full" style={{ background: "#000000" }}>
      <ReactFlow
        nodes={styledNodes}
        edges={styledEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        nodeTypes={NODE_TYPES}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={2}
        style={{ background: "#000000" }}
        proOptions={{ hideAttribution: false }}
        aria-label="Workforce connections graph"
        role="application"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={48}
          size={0.5}
          color="rgba(77,77,77,0.3)"
        />
        <Controls
          style={{
            background: "rgba(0,0,0,0.7)",
            border: "1px solid #4d4d4d",
            borderRadius: "5px",
          }}
        />
        <MiniMap
          style={{
            background: "rgba(0,0,0,0.8)",
            border: "1px solid #4d4d4d",
            borderRadius: "5px",
          }}
          nodeColor={(node) => {
            const state = (node.data as { state?: NodeState })?.state;
            if (state === "selected") return "#343755";
            if (state === "connected") return "rgba(52,55,85,0.5)";
            if (state === "dimmed") return "rgba(77,77,77,0.2)";
            return "rgba(77,77,77,0.4)";
          }}
          maskColor="rgba(0,0,0,0.6)"
        />
      </ReactFlow>
    </div>
  );
}
