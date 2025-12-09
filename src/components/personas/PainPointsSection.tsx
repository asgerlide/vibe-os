"use client";

import React from "react";
import { AlertCircle, Plus, Trash2 } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { EditableField } from "./EditableField";
import { PainPoint } from "@/types/personas";
import { motion } from "framer-motion";

interface PainPointsSectionProps {
    painPoints: PainPoint[];
    onUpdate: (painPoints: PainPoint[]) => void;
}

export function PainPointsSection({ painPoints, onUpdate }: PainPointsSectionProps) {
    const updatePainPoint = (id: string, field: keyof PainPoint, value: string | "high" | "medium" | "low") => {
        onUpdate(
            painPoints.map((pp) =>
                pp.id === id ? { ...pp, [field]: value } : pp
            )
        );
    };

    const addPainPoint = () => {
        onUpdate([
            ...painPoints,
            {
                id: `pp-${Date.now()}`,
                description: "New pain point",
                priority: "medium",
            },
        ]);
    };

    const removePainPoint = (id: string) => {
        onUpdate(painPoints.filter((pp) => pp.id !== id));
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "bg-red-100 dark:bg-red-950/30 border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400";
            case "medium":
                return "bg-amber-100 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/30 text-amber-700 dark:text-amber-400";
            case "low":
                return "bg-blue-100 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/30 text-blue-700 dark:text-blue-400";
            default:
                return "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300";
        }
    };

    return (
        <SectionCard
            title="Pain Points"
            description="Identify and prioritize user pain points"
        >
            <div className="space-y-3">
                {painPoints.map((painPoint) => (
                    <motion.div
                        key={painPoint.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700"
                    >
                        <AlertCircle className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                            <EditableField
                                value={painPoint.description}
                                onSave={(value) => updatePainPoint(painPoint.id, "description", value)}
                                multiline
                                className="mb-2"
                            />
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">Priority:</span>
                                <select
                                    value={painPoint.priority}
                                    onChange={(e) =>
                                        updatePainPoint(
                                            painPoint.id,
                                            "priority",
                                            e.target.value as "high" | "medium" | "low"
                                        )
                                    }
                                    className={`text-xs px-2 py-1 rounded border ${getPriorityColor(painPoint.priority)}`}
                                >
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                        </div>
                        <button
                            onClick={() => removePainPoint(painPoint.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </motion.div>
                ))}
                <button
                    onClick={addPainPoint}
                    className="w-full py-2 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:border-orange-500 transition-colors flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Pain Point
                </button>
            </div>
        </SectionCard>
    );
}






