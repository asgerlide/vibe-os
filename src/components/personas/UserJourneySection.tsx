"use client";

import React from "react";
import { ArrowRight, Plus, Trash2 } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { EditableField } from "./EditableField";
import { JourneyStage } from "@/types/personas";
import { motion } from "framer-motion";

interface UserJourneySectionProps {
    journey: JourneyStage[];
    onUpdate: (journey: JourneyStage[]) => void;
}

export function UserJourneySection({ journey, onUpdate }: UserJourneySectionProps) {
    const updateStage = (id: string, field: keyof JourneyStage, value: string | string[]) => {
        onUpdate(
            journey.map((stage) =>
                stage.id === id ? { ...stage, [field]: value } : stage
            )
        );
    };

    const addStage = () => {
        onUpdate([
            ...journey,
            {
                id: `stage-${Date.now()}`,
                name: "New Stage",
                description: "",
                touchpoints: [],
            },
        ]);
    };

    const removeStage = (id: string) => {
        onUpdate(journey.filter((stage) => stage.id !== id));
    };

    const addTouchpoint = (stageId: string) => {
        updateStage(stageId, "touchpoints", [
            ...journey.find((s) => s.id === stageId)!.touchpoints,
            "New touchpoint",
        ]);
    };

    const updateTouchpoint = (stageId: string, index: number, value: string) => {
        const stage = journey.find((s) => s.id === stageId)!;
        const newTouchpoints = [...stage.touchpoints];
        newTouchpoints[index] = value;
        updateStage(stageId, "touchpoints", newTouchpoints);
    };

    const removeTouchpoint = (stageId: string, index: number) => {
        const stage = journey.find((s) => s.id === stageId)!;
        const newTouchpoints = stage.touchpoints.filter((_, i) => i !== index);
        updateStage(stageId, "touchpoints", newTouchpoints);
    };

    return (
        <SectionCard
            title="User Journey"
            description="Map the user's journey through different stages"
        >
            <div className="space-y-4">
                {journey.map((stage, index) => (
                    <motion.div
                        key={stage.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold text-sm">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <EditableField
                                            value={stage.name}
                                            onSave={(value) => updateStage(stage.id, "name", value)}
                                            className="font-semibold text-lg mb-2"
                                        />
                                        <EditableField
                                            value={stage.description}
                                            onSave={(value) => updateStage(stage.id, "description", value)}
                                            multiline
                                            placeholder="Stage description..."
                                            className="text-sm text-zinc-600 dark:text-zinc-400"
                                        />
                                    </div>
                                </div>
                                {journey.length > 1 && (
                                    <button
                                        onClick={() => removeStage(stage.id)}
                                        className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Touchpoints */}
                            <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                        Touchpoints
                                    </span>
                                    <button
                                        onClick={() => addTouchpoint(stage.id)}
                                        className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700"
                                    >
                                        <Plus className="w-3 h-3" />
                                        Add
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {stage.touchpoints.map((touchpoint, tpIndex) => (
                                        <div key={tpIndex} className="flex items-center gap-2">
                                            <ArrowRight className="w-3 h-3 text-zinc-400" />
                                            <EditableField
                                                value={touchpoint}
                                                onSave={(value) => updateTouchpoint(stage.id, tpIndex, value)}
                                                className="flex-1 text-sm"
                                            />
                                            <button
                                                onClick={() => removeTouchpoint(stage.id, tpIndex)}
                                                className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {index < journey.length - 1 && (
                            <div className="flex justify-center my-2">
                                <ArrowRight className="w-5 h-5 text-zinc-400" />
                            </div>
                        )}
                    </motion.div>
                ))}
                <button
                    onClick={addStage}
                    className="w-full py-3 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:border-orange-500 transition-colors flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Stage
                </button>
            </div>
        </SectionCard>
    );
}






