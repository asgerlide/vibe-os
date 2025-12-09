"use client";

import React from "react";
import { Calendar, CheckCircle, XCircle } from "lucide-react";
import { PersonaCard } from "./PersonaCard";
import { Persona } from "@/types/personas";

interface ScenarioCardProps {
    persona: Persona;
    onEdit: () => void;
    onRegenerate: () => void;
}

export function ScenarioCard({ persona, onEdit, onRegenerate }: ScenarioCardProps) {
    return (
        <PersonaCard
            title="Scenario of Use"
            onEdit={onEdit}
            onRegenerate={onRegenerate}
            className="flex-shrink-0 min-w-[480px]"
            fullWidth
        >
            <div className="space-y-4">
                {/* Typical Day */}
                {persona.scenarios?.typicalDay && (
                    <div className="p-4 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-5 h-5 text-blue-500" />
                            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">A Day in the Life</h4>
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            {persona.scenarios.typicalDay}
                        </p>
                    </div>
                )}

                {/* Success */}
                {persona.scenarios?.success && (
                    <div className="p-4 bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-950/20 dark:to-green-950/20 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Success Story</h4>
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            {persona.scenarios.success}
                        </p>
                    </div>
                )}

                {/* Failure */}
                {persona.scenarios?.failure && (
                    <div className="p-4 bg-gradient-to-r from-red-50/50 to-rose-50/50 dark:from-red-950/20 dark:to-rose-950/20 rounded-xl border border-red-200/50 dark:border-red-800/50">
                        <div className="flex items-center gap-2 mb-2">
                            <XCircle className="w-5 h-5 text-red-500" />
                            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">Failure Story</h4>
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            {persona.scenarios.failure}
                        </p>
                    </div>
                )}
            </div>
        </PersonaCard>
    );
}






