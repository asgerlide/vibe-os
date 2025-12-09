"use client";

import React from "react";
import { Clock, DollarSign, AlertTriangle, Zap } from "lucide-react";
import { PersonaCard } from "./PersonaCard";
import { Persona } from "@/types/personas";

interface ConstraintsCardProps {
    persona: Persona;
    onEdit: () => void;
    onRegenerate: () => void;
}

export function ConstraintsCard({ persona, onEdit, onRegenerate }: ConstraintsCardProps) {
    return (
        <PersonaCard
            title="Constraints & Triggers"
            onEdit={onEdit}
            onRegenerate={onRegenerate}
            className="flex-shrink-0 min-w-[360px]"
        >
            <div className="space-y-4">
                {/* Time Constraints */}
                <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200/50 dark:border-amber-800/50">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <h4 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                            Time Limitations
                        </h4>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Limited time for learning new tools. Needs quick setup and immediate value.
                    </p>
                </div>

                {/* Budget */}
                {persona.demographics?.income && (
                    <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <h4 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                                Budget Considerations
                            </h4>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Income: {persona.demographics.income}
                        </p>
                    </div>
                )}

                {/* Skill Gaps */}
                {persona.technicalProficiency && (
                    <div className="p-3 bg-purple-50/50 dark:bg-purple-950/20 rounded-xl border border-purple-200/50 dark:border-purple-800/50">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <h4 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                                Skill Gaps
                            </h4>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Technical level: {persona.technicalProficiency}. May need intuitive interfaces and good documentation.
                        </p>
                    </div>
                )}

                {/* Triggers */}
                <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50">
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <h4 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                            Trigger Events
                        </h4>
                    </div>
                    <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                        <li>• Workflow bottlenecks become critical</li>
                        <li>• Team requests new tools or processes</li>
                        <li>• Current solutions become too expensive</li>
                    </ul>
                </div>
            </div>
        </PersonaCard>
    );
}






