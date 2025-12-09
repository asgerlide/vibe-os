import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { motion } from "framer-motion";
import { FileCheck, Download, ArrowRight } from "lucide-react";

export const OutputNode = React.memo(({ data }: NodeProps) => {
    const nodeData = data as Record<string, any>;

    // Placeholder data - will be replaced with real data later
    const deliverableType = nodeData.deliverableType || "Product Specification";
    const status = nodeData.status || "Ready";
    const summary = nodeData.summary || "Complete product blueprint with user personas, market analysis, technical architecture, and feature specifications";
    const completionPercentage = nodeData.completionPercentage || 100;

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'ready':
                return 'bg-emerald-500';
            case 'in progress':
                return 'bg-amber-500';
            case 'pending':
                return 'bg-zinc-400';
            default:
                return 'bg-zinc-400';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-[450px] relative"
        >
            {/* Input Handle (Left) - ONLY handle on this node, positioned first so React Flow can find it immediately */}
            <Handle
                type="target"
                position={Position.Left}
                id="input"
                isConnectable={true}
                className="!h-3 !w-3 !rounded-full !border-2 !border-white !bg-zinc-400 dark:!bg-zinc-600 !shadow-sm"
            />

            <div className="bg-zinc-100 dark:bg-zinc-700 rounded-xl border border-zinc-400 dark:border-zinc-600 shadow-lg hover:shadow-xl transition-shadow p-6">
                {/* Header with Status */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <h3 className="text-[11px] font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                            Output
                        </h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`}></div>
                        <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                            {status}
                        </span>
                    </div>
                </div>

                {/* Deliverable Type */}
                <div className="mb-5">
                    <div className="flex items-center gap-3 mb-3">
                        <FileCheck className="w-6 h-6 text-orange-500" />
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white leading-tight">
                            {deliverableType}
                        </h2>
                    </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-zinc-700 dark:text-zinc-200 mb-6 leading-relaxed">
                    {summary}
                </p>

                {/* Progress Bar */}
                <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                            Completion
                        </span>
                        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                            {completionPercentage}%
                        </span>
                    </div>
                    <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500"
                            style={{ width: `${completionPercentage}%` }}
                        ></div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold text-sm rounded-lg border border-zinc-300 dark:border-zinc-600 transition-colors">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
});

OutputNode.displayName = "OutputNode";
