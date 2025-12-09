"use client";

import React from "react";
import { MapPin, Users, Monitor, Plus, X } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { EditableField } from "./EditableField";
import { Persona } from "@/types/personas";
import { motion } from "framer-motion";

interface ContextEnvironmentSectionProps {
    primaryPersona: Persona;
    secondaryPersona: Persona;
    onUpdatePrimary: (updates: Partial<Persona>) => void;
    onUpdateSecondary: (updates: Partial<Persona>) => void;
}

export function ContextEnvironmentSection({
    primaryPersona,
    secondaryPersona,
    onUpdatePrimary,
    onUpdateSecondary,
}: ContextEnvironmentSectionProps) {
    const PersonaContext = ({ persona, isPrimary, onUpdate }: { persona: Persona; isPrimary: boolean; onUpdate: (updates: Partial<Persona>) => void }) => {
        const [newPhysical, setNewPhysical] = React.useState("");
        const [newTech, setNewTech] = React.useState("");

        const addPhysical = () => {
            if (newPhysical.trim()) {
                onUpdate({
                    environment: {
                        ...persona.environment,
                        physical: [...(persona.environment?.physical || []), newPhysical.trim()],
                    },
                });
                setNewPhysical("");
            }
        };

        const removePhysical = (index: number) => {
            const updated = [...(persona.environment?.physical || [])];
            updated.splice(index, 1);
            onUpdate({
                environment: {
                    ...persona.environment,
                    physical: updated,
                },
            });
        };

        const addTech = () => {
            if (newTech.trim()) {
                onUpdate({
                    environment: {
                        ...persona.environment,
                        technology: [...(persona.environment?.technology || []), newTech.trim()],
                    },
                });
                setNewTech("");
            }
        };

        const removeTech = (index: number) => {
            const updated = [...(persona.environment?.technology || [])];
            updated.splice(index, 1);
            onUpdate({
                environment: {
                    ...persona.environment,
                    technology: updated,
                },
            });
        };

        return (
            <div className={`flex-1 min-w-0 p-4 rounded-lg border ${isPrimary
                ? 'bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900'
                : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700'
                }`}>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                    {persona.name}
                </h4>

                <div className="space-y-4">
                    {/* Physical Environment */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Physical Environment</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {(persona.environment?.physical || []).map((env, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 text-sm"
                                >
                                    {env}
                                    <button
                                        onClick={() => removePhysical(index)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </motion.span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newPhysical}
                                onChange={(e) => setNewPhysical(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addPhysical()}
                                placeholder="e.g., Office, Home, Mobile"
                                className="flex-1 px-2 py-1.5 text-sm border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800"
                            />
                            <button
                                onClick={addPhysical}
                                className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Social Context */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Social Context</span>
                        </div>
                        <EditableField
                            value={persona.environment?.social || ""}
                            onSave={(value) => onUpdate({
                                environment: {
                                    ...persona.environment,
                                    social: value,
                                },
                            })}
                            multiline
                            placeholder="Team size, collaboration style, decision-making process..."
                            className="text-sm"
                        />
                    </div>

                    {/* Technology */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Monitor className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Technology Stack</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {(persona.environment?.technology || []).map((tech, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 text-sm"
                                >
                                    {tech}
                                    <button
                                        onClick={() => removeTech(index)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </motion.span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newTech}
                                onChange={(e) => setNewTech(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addTech()}
                                placeholder="e.g., Slack, Notion, Excel"
                                className="flex-1 px-2 py-1.5 text-sm border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800"
                            />
                            <button
                                onClick={addTech}
                                className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <SectionCard
            title="Context & Environment"
            description="Where, when, and how personas interact with your product"
        >
            <div className="flex gap-4">
                <PersonaContext
                    persona={primaryPersona}
                    isPrimary={true}
                    onUpdate={onUpdatePrimary}
                />
                <PersonaContext
                    persona={secondaryPersona}
                    isPrimary={false}
                    onUpdate={onUpdateSecondary}
                />
            </div>
        </SectionCard>
    );
}






