import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { motion } from "framer-motion";
import { CheckCircle2, Layout, Zap, Users, FileText, Palette, Settings } from "lucide-react";

export const FeaturesNode = React.memo(({ data }: NodeProps) => {
    const nodeData = data as Record<string, any>;

    // Placeholder data - will be replaced with real data later
    const coreFeatures = nodeData.coreFeatures || [
        { name: "Visual Canvas", icon: "Layout", priority: "high" },
        { name: "Real-time Collaboration", icon: "Users", priority: "high" },
        { name: "Export to Markdown", icon: "FileText", priority: "medium" },
        { name: "Custom Themes", icon: "Palette", priority: "low" },
    ];

    const mustHave = nodeData.mustHave || 3;
    const niceToHave = nodeData.niceToHave || 1;

    const getIcon = (iconName: string) => {
        const icons: Record<string, any> = {
            Layout, Zap, Users, FileText, Palette, Settings
        };
        const Icon = icons[iconName] || Layout;
        return <Icon className="w-4 h-4" />;
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 dark:bg-red-950/30 border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400';
            case 'medium':
                return 'bg-amber-100 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/30 text-amber-700 dark:text-amber-400';
            case 'low':
                return 'bg-blue-100 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/30 text-blue-700 dark:text-blue-400';
            default:
                return 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300';
        }
    };

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
                        Features & Requirements
                    </h3>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                    Core Features
                </h2>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                    {coreFeatures.map((feature: any, index: number) => (
                        <div
                            key={index}
                            className={`rounded-lg p-3 border ${getPriorityColor(feature.priority)}`}
                        >
                            <div className="flex items-start gap-2">
                                <div className="mt-0.5">
                                    {getIcon(feature.icon)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold leading-tight">
                                        {feature.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Requirements Summary */}
                <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                                Requirements
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-xs text-zinc-400 dark:text-zinc-500">Must-have</p>
                                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{mustHave}</p>
                            </div>
                            <div className="h-8 w-px bg-zinc-300 dark:bg-zinc-600"></div>
                            <div className="text-right">
                                <p className="text-xs text-zinc-400 dark:text-zinc-500">Nice-to-have</p>
                                <p className="text-lg font-bold text-zinc-600 dark:text-zinc-400">{niceToHave}</p>
                            </div>
                        </div>
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

FeaturesNode.displayName = "FeaturesNode";
