"use client";

import React from "react";
import { Target, Plus, Trash2, Star } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { EditableField } from "./EditableField";
import { JTBD } from "@/types/personas";
import { motion } from "framer-motion";

interface JTBDSectionProps {
    jtbds: JTBD[];
    onUpdate: (jtbds: JTBD[]) => void;
}

export function JTBDSection({ jtbds, onUpdate }: JTBDSectionProps) {
    const updateJTBD = (id: string, field: keyof JTBD, value: string | number) => {
        onUpdate(
            jtbds.map((jtbd) =>
                jtbd.id === id ? { ...jtbd, [field]: value } : jtbd
            )
        );
    };

    const addJTBD = () => {
        onUpdate([
            ...jtbds,
            {
                id: `jtbd-${Date.now()}`,
                statement: "When [situation], I want to [motivation], so I can [outcome]",
                importance: 3,
            },
        ]);
    };

    const removeJTBD = (id: string) => {
        onUpdate(jtbds.filter((jtbd) => jtbd.id !== id));
    };

    return (
        <SectionCard
            title="Jobs to be Done (JTBD)"
            description="Define what users are trying to accomplish"
        >
            <div className="space-y-3">
                {jtbds.map((jtbd) => (
                    <motion.div
                        key={jtbd.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700"
                    >
                        <div className="flex items-start gap-3 mb-3">
                            <Target className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                                <EditableField
                                    value={jtbd.statement}
                                    onSave={(value) => updateJTBD(jtbd.id, "statement", value)}
                                    multiline
                                    placeholder="When [situation], I want to [motivation], so I can [outcome]"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">Importance:</span>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <button
                                            key={rating}
                                            onClick={() => updateJTBD(jtbd.id, "importance", rating)}
                                            className={`w-5 h-5 rounded ${
                                                rating <= jtbd.importance
                                                    ? "text-orange-500"
                                                    : "text-zinc-300 dark:text-zinc-700"
                                            }`}
                                        >
                                            <Star
                                                className={`w-full h-full ${
                                                    rating <= jtbd.importance ? "fill-current" : ""
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={() => removeJTBD(jtbd.id)}
                                className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
                <button
                    onClick={addJTBD}
                    className="w-full py-2 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:border-orange-500 transition-colors flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add JTBD
                </button>
            </div>
        </SectionCard>
    );
}






