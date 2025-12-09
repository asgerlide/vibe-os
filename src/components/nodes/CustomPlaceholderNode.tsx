import React from "react";
import { NodeProps, Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";
import { PlaceholderNode } from "@/components/nodes/placeholder-node";
import { Plus } from "lucide-react";

export const CustomPlaceholderNode = React.memo(({ data, id }: NodeProps) => {
    const label = data.label as string;
    
    // For Output node placeholder, add a left handle to match the actual OutputNode
    const isOutputNode = id === "output";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-48 h-20 relative"
        >
            {/* Add handle for Output node placeholder so edges can connect */}
            {isOutputNode && (
                <Handle
                    type="target"
                    position={Position.Left}
                    id="input"
                    className="!h-3 !w-3 !rounded-full !border-2 !border-white !bg-zinc-400 dark:!bg-zinc-600 !shadow-sm"
                />
            )}
            <PlaceholderNode>
                <div className="h-full flex flex-col items-center justify-center gap-2">
                    <Plus className="h-5 w-5 text-zinc-400" />
                    <span className="text-xs text-zinc-500 dark:text-zinc-500 text-center px-2">
                        {label}
                    </span>
                </div>
            </PlaceholderNode>
        </motion.div>
    );
});

CustomPlaceholderNode.displayName = "CustomPlaceholderNode";
