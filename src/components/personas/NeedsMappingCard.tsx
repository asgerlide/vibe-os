"use client";

import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { PersonaCard } from "./PersonaCard";
import { Persona, PainPoint, JTBD } from "@/types/personas";
import { motion } from "framer-motion";

interface NeedsMappingCardProps {
    persona: Persona;
    painPoints: PainPoint[];
    jtbds: JTBD[];
    onEdit: () => void;
    onRegenerate: () => void;
}

export function NeedsMappingCard({ persona, painPoints, jtbds, onEdit, onRegenerate }: NeedsMappingCardProps) {
    // Map top pain points and JTBDs to potential solutions
    const topPainPoints = painPoints.filter(pp => pp.priority === "high").slice(0, 3);
    const topJtbds = jtbds.filter(j => j.importance >= 4).slice(0, 3);

    return (
        <PersonaCard
            title="Needs → VibeOS Solutions"
            onEdit={onEdit}
            onRegenerate={onRegenerate}
            className="flex-shrink-0 min-w-[500px]"
        >
            <div className="space-y-4">
                {/* Pain Points to Solutions */}
                {topPainPoints.length > 0 && (
                    <div>
                        <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wider">
                            Pain Points → Solutions
                        </h4>
                        <div className="space-y-3">
                            {topPainPoints.map((pp) => (
                                <motion.div
                                    key={pp.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-start gap-3 p-3 bg-zinc-50/50 dark:bg-zinc-800/30 rounded-xl"
                                >
                                    <div className="flex-1">
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
                                            {pp.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                                            <ArrowRight className="w-3 h-3" />
                                            <span className="italic">VibeOS addresses this through...</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* JTBD to Features */}
                {topJtbds.length > 0 && (
                    <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                        <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wider">
                            Jobs → Features
                        </h4>
                        <div className="space-y-3">
                            {topJtbds.map((jtbd) => (
                                <motion.div
                                    key={jtbd.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-start gap-3 p-3 bg-zinc-50/50 dark:bg-zinc-800/30 rounded-xl"
                                >
                                    <div className="flex-1">
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
                                            {jtbd.statement}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                                            <Check className="w-3 h-3" />
                                            <span className="italic">Enabled by VibeOS features...</span>
                                        </div>
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






