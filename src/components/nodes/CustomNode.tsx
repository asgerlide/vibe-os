import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { motion } from "framer-motion";
import { BaseNode, BaseNodeHeader, BaseNodeHeaderTitle } from "@/components/nodes/base-node";

export const CustomNode = React.memo(({ data }: NodeProps) => {
    const label = data.label as string;
    const type = data.type as "root" | "child" || "child";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={type === "root" ? "w-48 h-24" : "w-48 h-20"}
        >
            {/* Input Handle (Left) */}
            <Handle
                type="target"
                position={Position.Left}
                className="!h-3 !w-3 !rounded-full !border-2 !border-white !bg-zinc-400 dark:!bg-zinc-600 !shadow-sm"
            />

            <BaseNode className="h-full flex items-center justify-center">
                <BaseNodeHeader className="border-0">
                    <BaseNodeHeaderTitle className="text-sm">
                        {label}
                    </BaseNodeHeaderTitle>
                </BaseNodeHeader>
            </BaseNode>

            {/* Output Handle (Right) */}
            <Handle
                type="source"
                position={Position.Right}
                className="!h-3 !w-3 !rounded-full !border-2 !border-white !bg-zinc-400 dark:!bg-zinc-600 !shadow-sm"
            />
        </motion.div>
    );
});
CustomNode.displayName = "CustomNode";
