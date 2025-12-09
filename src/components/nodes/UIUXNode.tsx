import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { motion } from "framer-motion";
import { Palette, Type, Sparkles } from "lucide-react";

export const UIUXNode = React.memo(({ data }: NodeProps) => {
    const nodeData = data as Record<string, any>;

    // Placeholder data - will be replaced with real data later
    const primaryColor = nodeData.primaryColor || "#f97316";
    const secondaryColor = nodeData.secondaryColor || "#71717a";
    const accentColor = nodeData.accentColor || "#3b82f6";
    const typography = nodeData.typography || "Inter";
    const designStyle = nodeData.designStyle || ["Premium", "Futuristic", "Minimal"];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-[420px]"
        >
            {/* Input Handle (Left) */}
            <Handle
                type="target"
                position={Position.Left}
                className="!h-3 !w-3 !rounded-full !border-2 !border-white !bg-zinc-400 dark:!bg-zinc-600 !shadow-sm"
            />

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow p-6">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <h3 className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                        UI/UX Framework
                    </h3>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                    Design System
                </h2>

                {/* Color Palette */}
                <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                        <Palette className="w-4 h-4 text-zinc-500" />
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                            Colors
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <div
                                className="h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm"
                                style={{ backgroundColor: primaryColor }}
                            ></div>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1.5 text-center">Primary</p>
                        </div>
                        <div className="flex-1">
                            <div
                                className="h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm"
                                style={{ backgroundColor: secondaryColor }}
                            ></div>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1.5 text-center">Secondary</p>
                        </div>
                        <div className="flex-1">
                            <div
                                className="h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm"
                                style={{ backgroundColor: accentColor }}
                            ></div>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1.5 text-center">Accent</p>
                        </div>
                    </div>
                </div>

                {/* Typography - Simplified like the picture */}
                <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                        <Type className="w-4 h-4 text-zinc-500" />
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                            Font
                        </span>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2" style={{ fontFamily: typography }}>
                            {typography}
                        </p>
                        <p className="text-5xl font-bold text-zinc-900 dark:text-zinc-100" style={{ fontFamily: typography }}>
                            Aa
                        </p>
                    </div>
                </div>

                {/* Design Style */}
                <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3 border border-zinc-200 dark:border-zinc-700">
                    <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                        Design Style
                    </p>
                    <p className="text-sm text-zinc-900 dark:text-zinc-100 font-medium">
                        {designStyle.join(' • ')}
                    </p>
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

UIUXNode.displayName = "UIUXNode";
