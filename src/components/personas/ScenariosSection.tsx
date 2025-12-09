"use client";

import React from "react";
import { Calendar, CheckCircle, XCircle } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { EditableField } from "./EditableField";
import { Persona } from "@/types/personas";

interface ScenariosSectionProps {
    primaryPersona: Persona;
    secondaryPersona: Persona;
    onUpdatePrimary: (updates: Partial<Persona>) => void;
    onUpdateSecondary: (updates: Partial<Persona>) => void;
}

export function ScenariosSection({
    primaryPersona,
    secondaryPersona,
    onUpdatePrimary,
    onUpdateSecondary,
}: ScenariosSectionProps) {
    const PersonaScenarios = ({ persona, isPrimary, onUpdate }: { persona: Persona; isPrimary: boolean; onUpdate: (updates: Partial<Persona>) => void }) => {
        return (
            <div className={`flex-1 min-w-0 p-4 rounded-lg border ${isPrimary
                ? 'bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900'
                : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700'
                }`}>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                    {persona.name}
                </h4>

                <div className="space-y-4">
                    {/* Typical Day */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">A Day in the Life</span>
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300">
                            {persona.scenarios?.typicalDay || "Describe a typical day for this persona and how they would interact with your product..."}
                        </p>
                    </div>

                    {/* Success Scenario */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Success Story</span>
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300">
                            {persona.scenarios?.success || "Describe what success looks like for this persona..."}
                        </p>
                    </div>

                    {/* Failure Scenario */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Failure Story</span>
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300">
                            {persona.scenarios?.failure || "Describe what happens when things go wrong..."}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <SectionCard
            title="Scenarios"
            description="Narrative scenarios showing how personas interact with your product"
        >
            <div className="flex gap-4">
                <PersonaScenarios
                    persona={primaryPersona}
                    isPrimary={true}
                    onUpdate={onUpdatePrimary}
                />
                <PersonaScenarios
                    persona={secondaryPersona}
                    isPrimary={false}
                    onUpdate={onUpdateSecondary}
                />
            </div>
        </SectionCard>
    );
}






