import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { motion } from "framer-motion";
import { Code, Cloud } from "lucide-react";
import { useTechStore } from "@/lib/tech/store";

export const ArchitectureNode = React.memo(({ data }: NodeProps) => {
    const { techData } = useTechStore();
    const nodeData = data as Record<string, unknown>;

    // Use store data if available, otherwise fall back to node data or defaults
    const hasTechData = !!techData;
    
    // Get tech stack names
    const techStack = techData?.techStack?.map(t => t.name) || 
        (nodeData.techStack as string[]) || 
        [];
    
    const infrastructure = techData?.infrastructure || 
        (nodeData.infrastructure as string) || 
        "No infrastructure defined";
    
    const technicalNotes = techData?.technicalNotes || 
        (nodeData.technicalNotes as string) || 
        "";

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

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow p-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                    <div className={`w-2 h-2 rounded-full ${hasTechData ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                    <h3 className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                        Architecture & Tech Notes
                    </h3>
                    {hasTechData && (
                        <span className="ml-auto text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            AI Generated
                        </span>
                    )}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                    Tech Stack
                </h2>

                {/* Tech Stack Tags */}
                {techStack.length > 0 ? (
                    <div className="mb-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Code className="w-4 h-4 text-zinc-500" />
                            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                                Technologies
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {techStack.slice(0, 6).map((tech: string, index: number) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-700"
                                >
                                    {tech}
                                </span>
                            ))}
                            {techStack.length > 6 && (
                                <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                    +{techStack.length - 6} more
                                </span>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="mb-5 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700">
                        <p className="text-sm text-zinc-500 text-center">
                            Complete onboarding to generate tech stack
                        </p>
                    </div>
                )}

                {/* Infrastructure */}
                {infrastructure && hasTechData && (
                    <div className="mb-5">
                        <div className="flex items-center gap-2 mb-2">
                            <Cloud className="w-4 h-4 text-zinc-500" />
                            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                                Infrastructure
                            </span>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg px-3 py-2 border border-blue-100 dark:border-blue-900/30">
                            <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 line-clamp-2">
                                {infrastructure}
                            </p>
                        </div>
                    </div>
                )}
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

ArchitectureNode.displayName = "ArchitectureNode";
