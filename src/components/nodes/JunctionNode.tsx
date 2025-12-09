import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";

export const JunctionNode = React.memo(({ data }: NodeProps) => {
    return (
        <div className="relative">
            {/* Minimal visible junction point */}
            <div className="w-1 h-1 rounded-full bg-zinc-400" />

            {/* Input Handle (Left) */}
            <Handle
                type="target"
                position={Position.Left}
                className="!h-2 !w-2 !rounded-full !border-0 !bg-transparent"
            />

            {/* Output Handle (Right) */}
            <Handle
                type="source"
                position={Position.Right}
                className="!h-2 !w-2 !rounded-full !border-0 !bg-transparent"
            />
        </div>
    );
});
JunctionNode.displayName = "JunctionNode";
