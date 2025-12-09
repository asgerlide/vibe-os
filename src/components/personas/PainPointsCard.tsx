"use client";

import React from "react";
import { AlertCircle, X } from "lucide-react";
import { PersonaCard } from "./PersonaCard";
import { PainPoint } from "@/types/personas";
import { motion } from "framer-motion";

interface PainPointsCardProps {
    painPoints: PainPoint[];
    onEdit: () => void;
    onRegenerate: () => void;
}

const priorityColors = {
    high: "from-red-500/20 to-rose-500/20 border-red-500/30 text-red-700 dark:text-red-400",
    medium: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-700 dark:text-amber-400",
    low: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-700 dark:text-blue-400",
};

const categoryLabels = {
    functional: "Functional",
    emotional: "Emotional",
    process: "Process",
    tooling: "Tooling",
};

export function PainPointsCard({ painPoints, onEdit, onRegenerate }: PainPointsCardProps) {
    // Group by priority
    const highPriority = painPoints.filter(pp => pp.priority === "high");
    const mediumPriority = painPoints.filter(pp => pp.priority === "medium");
    const lowPriority = painPoints.filter(pp => pp.priority === "low");

    return (
        <PersonaCard
            title="Pain Points"
            onEdit={onEdit}
            onRegenerate={onRegenerate}
            className="flex-shrink-0 min-w-[360px]"
        >
            <div className="space-y-4">
                {highPriority.length > 0 && (
                    <div>
                        <h4 className="text-xs font-semibold text-red-600 dark:text-red-400 mb-2 uppercase tracking-wider">
                            High Priority
                        </h4>
                        <div className="space-y-2">
                            {highPriority.map((pp) => (
                                <motion.div
                                    key={pp.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`p-3 rounded-xl bg-gradient-to-r ${priorityColors.high} border backdrop-blur-sm`}
                                >
                                    <div className="flex items-start gap-2">
                                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm flex-1">{pp.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {mediumPriority.length > 0 && (
                    <div>
                        <h4 className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2 uppercase tracking-wider">
                            Medium Priority
                        </h4>
                        <div className="space-y-2">
                            {mediumPriority.map((pp) => (
                                <motion.div
                                    key={pp.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`p-3 rounded-xl bg-gradient-to-r ${priorityColors.medium} border backdrop-blur-sm`}
                                >
                                    <div className="flex items-start gap-2">
                                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm flex-1">{pp.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {lowPriority.length > 0 && (
                    <div>
                        <h4 className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wider">
                            Low Priority
                        </h4>
                        <div className="space-y-2">
                            {lowPriority.map((pp) => (
                                <motion.div
                                    key={pp.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`p-3 rounded-xl bg-gradient-to-r ${priorityColors.low} border backdrop-blur-sm`}
                                >
                                    <div className="flex items-start gap-2">
                                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm flex-1">{pp.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PersonaCard>
    );
}






