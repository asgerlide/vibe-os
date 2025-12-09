import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useIdeaStore } from "@/lib/idea/store";

export const IdeaNode = React.memo(({ data }: NodeProps) => {
    const { idea } = useIdeaStore();
    const nodeData = data as Record<string, unknown>;

    // Use store data if available, otherwise fall back to node data or defaults
    const hasIdea = !!idea;
    const ideaName = idea?.ideaName || (nodeData.ideaName as string) || "Your Idea";
    const description = idea?.description || (nodeData.description as string) || "Describe your product idea";
    const targetAudience = idea?.targetAudience || (nodeData.targetAudience as string) || "Target Users";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-[420px]"
        >
            <div className="bg-zinc-100 dark:bg-zinc-700 rounded-xl border border-zinc-400 dark:border-zinc-600 shadow-lg hover:shadow-xl transition-shadow p-6">
                {/* Header */}
                <div className="flex items-center gap-2 mb-5">
                    <div className={`w-2 h-2 rounded-full ${hasIdea ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                    <h3 className="text-[11px] font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                        The Idea
                    </h3>
                    {hasIdea && (
                        <span className="ml-auto text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            Created
                        </span>
                    )}
                </div>

                {/* Idea Name - Larger and more prominent */}
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4 leading-tight">
                    {ideaName}
                </h2>

                {/* Description - Better contrast */}
                <p className="text-sm text-zinc-700 dark:text-zinc-200 mb-6 leading-relaxed line-clamp-3">
                    {description}
                </p>

                {/* Target Audience - "FOR" Section */}
                <div className="mb-6 flex items-center gap-3">
                    <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                        For
                    </span>
                    <div className="flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-white rounded-lg border border-zinc-300 dark:border-zinc-200 shadow-sm">
                        <Users className="w-4 h-4 text-zinc-600 dark:text-zinc-600" />
                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-900">
                            {targetAudience}
                        </span>
                    </div>
                </div>
            </div>

            {/* Output Handle (Right) */}
            <Handle
                type="source"
                position={Position.Right}
                className="!h-3 !w-3 !rounded-full !border-2 !border-white !bg-zinc-400 dark:!bg-zinc-600 !shadow-sm"
            />
        </motion.div>
    );
});

IdeaNode.displayName = "IdeaNode";
