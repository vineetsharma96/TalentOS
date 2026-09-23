import type { ConnectionType } from "./employee";

export interface GraphNode {
  id: string; // React Flow node id (= employeeId)
  type: "hexEmployee";
  position: { x: number; y: number };
  data: GraphNodeData;
  /** Visual state — managed by graph canvas */
  className?: string;
}

export interface GraphNodeData extends Record<string, unknown> {
  employeeId: string;
  name: string;
  role: string;
  department: string;
  photoUrl: string;
  /** Computed by interaction state */
  state: NodeState;
}

export type NodeState = "default" | "selected" | "connected" | "dimmed";

export interface GraphEdge {
  id: string;
  source: string; // employeeId
  target: string; // employeeId
  type: "smoothstep";
  data: GraphEdgeData;
  /** Accessibility */
  ariaLabel?: string;
}

export interface GraphEdgeData {
  connectionType: ConnectionType;
  label: string;
  projectName?: string;
  state: EdgeState;
}

export type EdgeState = "default" | "highlighted" | "dimmed";

export interface WorkforceGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  meta: {
    totalEmployees: number;
    totalConnections: number;
    departments: string[];
  };
}

export interface GraphInteractionState {
  selectedNodeId: string | null;
  connectedNodeIds: Set<string>;
  highlightedEdgeIds: Set<string>;
}
