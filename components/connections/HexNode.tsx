"use client";

import { memo, useCallback } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { GraphNodeData, NodeState } from "@/types/graph";

const STATE_STYLES: Record<NodeState, { opacity: number; strokeColor: string; strokeWidth: number }> = {
  default: { opacity: 1, strokeColor: "rgba(77,77,77,0.8)", strokeWidth: 1.5 },
  selected: { opacity: 1, strokeColor: "#343755", strokeWidth: 2.5 },
  connected: { opacity: 1, strokeColor: "rgba(52,55,85,0.5)", strokeWidth: 1.5 },
  dimmed: { opacity: 0.2, strokeColor: "rgba(77,77,77,0.3)", strokeWidth: 1 },
};

// Hexagonal clip path
const HEX_PATH = "M50 5 L93 27.5 L93 72.5 L50 95 L7 72.5 L7 27.5 Z";
const HEX_VIEWBOX = "0 0 100 100";

interface HexNodeProps extends NodeProps {
  data: GraphNodeData;
  onClick?: (id: string) => void;
}

export const HexNode = memo(function HexNode({ data, selected }: HexNodeProps) {
  const state: NodeState = selected ? "selected" : data.state;
  const { opacity, strokeColor, strokeWidth } = STATE_STYLES[state];

  return (
    <div
      style={{
        opacity,
        transition: "opacity 0.3s ease",
        width: 90,
        textAlign: "center",
        userSelect: "none",
      }}
      role="button"
      aria-label={`${data.name}, ${data.role}, ${data.department}`}
      tabIndex={0}
    >
      {/* Hexagonal avatar */}
      <div style={{ position: "relative", width: 90, height: 90, margin: "0 auto" }}>
        <svg
          viewBox={HEX_VIEWBOX}
          width={90}
          height={90}
          style={{ position: "absolute", top: 0, left: 0 }}
          aria-hidden="true"
        >
          <defs>
            <clipPath id={`hex-clip-${data.employeeId}`}>
              <path d={HEX_PATH} />
            </clipPath>
            {/* Glow filter for selected state */}
            {state === "selected" && (
              <filter id={`glow-${data.employeeId}`}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            )}
          </defs>

          {/* Hexagon border */}
          <path
            d={HEX_PATH}
            fill="rgba(0,0,0,0.6)"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            style={{
              transition: "stroke 0.3s ease, stroke-width 0.3s ease",
              filter: state === "selected" ? `url(#glow-${data.employeeId})` : undefined,
            }}
          />

          {/* Employee photo */}
          {data.photoUrl && (
            <image
              href={data.photoUrl}
              x={7}
              y={7}
              width={86}
              height={86}
              clipPath={`url(#hex-clip-${data.employeeId})`}
              preserveAspectRatio="xMidYMid slice"
            />
          )}

          {/* Fallback initials if no photo */}
          {!data.photoUrl && (
            <text
              x="50"
              y="55"
              textAnchor="middle"
              fontSize="28"
              fontWeight="bold"
              fill="rgba(255,255,255,0.5)"
              clipPath={`url(#hex-clip-${data.employeeId})`}
            >
              {data.name.charAt(0)}
            </text>
          )}

          {/* Selected indicator ring */}
          {state === "selected" && (
            <path
              d={HEX_PATH}
              fill="none"
              stroke="#343755"
              strokeWidth={3}
              opacity={0.8}
            />
          )}
        </svg>
      </div>

      {/* Name label */}
      <div
        style={{
          marginTop: "6px",
          fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)",
          fontSize: "9px",
          fontWeight: state === "selected" ? 700 : 400,
          color: state === "selected" ? "#ffffff" : "rgba(198,198,198,0.8)",
          lineHeight: 1.3,
          transition: "color 0.3s ease",
          maxWidth: "90px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        title={data.name}
        aria-hidden="true"
      >
        {data.name.split(" ")[0]}
      </div>
      <div
        style={{
          fontFamily: "var(--font-nbarchitekt, 'Space Grotesk', sans-serif)",
          fontSize: "8px",
          color: "rgba(128,128,128,0.7)",
          maxWidth: "90px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        title={data.role}
        aria-hidden="true"
      >
        {data.role.replace("Senior ", "Sr. ").replace("Engineer", "Eng.")}
      </div>

      {/* React Flow handles — invisible */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ opacity: 0, width: 1, height: 1 }}
        aria-hidden="true"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ opacity: 0, width: 1, height: 1 }}
        aria-hidden="true"
      />
    </div>
  );
});
