"use client";

import React, { useCallback, type ReactNode } from "react";
import {
  useReactFlow,
  useNodeId,
  Handle,
  Position,
  type NodeProps,
} from "@xyflow/react";

import { BaseNode } from "@/components/nodes/base-node";

export type PlaceholderNodeProps = Partial<NodeProps> & {
  children?: ReactNode;
};

export function PlaceholderNode({ children }: PlaceholderNodeProps) {
  const id = useNodeId();
  const { setNodes, setEdges } = useReactFlow();

  // Note: onClick handler removed - we handle clicks externally in Canvas page
  // This prevents converting to default type with top/bottom handles

  return (
    <BaseNode
      className="bg-card w-[150px] border-dashed border-gray-400 p-2 text-center text-gray-400 shadow-none"
    >
      {children}
      <Handle
        type="target"
        style={{ visibility: "hidden" }}
        position={Position.Left}
        isConnectable={false}
      />
      <Handle
        type="source"
        style={{ visibility: "hidden" }}
        position={Position.Right}
        isConnectable={false}
      />
    </BaseNode>
  );
}
