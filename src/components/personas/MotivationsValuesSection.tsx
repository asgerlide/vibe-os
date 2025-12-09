"use client";

import React from "react";
import { Zap, Heart, Plus, X } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { EditableField } from "./EditableField";
import { Persona } from "@/types/personas";
import { motion } from "framer-motion";

interface MotivationsValuesSectionProps {
    primaryPersona: Persona;
    secondaryPersona: Persona;
    onUpdatePrimary: (updates: Partial<Persona>) => void;
    onUpdateSecondary: (updates: Partial<Persona>) => void;
}

export function MotivationsValuesSection({
    primaryPersona,
    secondaryPersona,
    onUpdatePrimary,
    onUpdateSecondary,
}: MotivationsValuesSectionProps) {
    const PersonaMotivations = ({ persona, isPrimary, onUpdate }: { persona: Persona; isPrimary: boolean; onUpdate: (updates: Partial<Persona>) => void }) => {
        const [newMotivation, setNewMotivation] = React.useState("");
        const [newValue, setNewValue] = React.useState("");

        const addMotivation = () => {
            if (newMotivation.trim()) {
                onUpdate({
                    motivations: [...(persona.motivations || []), newMotivation.trim()],
                });
                setNewMotivation("");
            }
        };

        const removeMotivation = (index: number) => {
            const updated = [...(persona.motivations || [])];
            updated.splice(index, 1);
            onUpdate({ motivations: updated });
        };

        const addValue = () => {
            if (newValue.trim()) {
                onUpdate({
                    values: [...(persona.values || []), newValue.trim()],
                });
                setNewValue("");
            }
        };

        const removeValue = (index: number) => {
            const updated = [...(persona.values || [])];
            updated.splice(index, 1);
            onUpdate({ values: updated });
        };

        return (
            <div className={`flex-1 min-w-0 p-4 rounded-lg border ${isPrimary
                ? 'bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900'
                : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700'
                }`}>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                    {persona.name}
                </h4>

                {/* Motivations */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Motivations</span>
                    </div>
                    <div className="space-y-2 mb-2">
                        {(persona.motivations || []).map((motivation, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 p-2 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700"
                            >
                                <span className="flex-1 text-sm">{motivation}</span>
                                <button
                                    onClick={() => removeMotivation(index)}
                                    className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newMotivation}
                            onChange={(e) => setNewMotivation(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addMotivation()}
                            placeholder="Add motivation..."
                            className="flex-1 px-2 py-1.5 text-sm border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800"
                        />
                        <button
                            onClick={addMotivation}
                            className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Values */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Values</span>
                    </div>
                    <div className="space-y-2 mb-2">
                        {(persona.values || []).map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 p-2 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700"
                            >
                                <span className="flex-1 text-sm">{value}</span>
                                <button
                                    onClick={() => removeValue(index)}
                                    className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addValue()}
                            placeholder="Add value..."
                            className="flex-1 px-2 py-1.5 text-sm border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800"
                        />
                        <button
                            onClick={addValue}
                            className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <SectionCard
            title="Motivations & Values"
            description="What drives their decisions and what they care about most"
        >
            <div className="flex gap-4">
                <PersonaMotivations
                    persona={primaryPersona}
                    isPrimary={true}
                    onUpdate={onUpdatePrimary}
                />
                <PersonaMotivations
                    persona={secondaryPersona}
                    isPrimary={false}
                    onUpdate={onUpdateSecondary}
                />
            </div>
        </SectionCard>
    );
}






