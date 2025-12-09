"use client";

import React from "react";
import { Clock, ArrowRight, Monitor } from "lucide-react";
import { PersonaCard } from "./PersonaCard";
import { Persona } from "@/types/personas";
import { motion } from "framer-motion";

interface WorkflowToolsCardProps {
    persona: Persona;
    journey: any[];
    onEdit: () => void;
    onRegenerate: () => void;
}

export function WorkflowToolsCard({ persona, journey, onEdit, onRegenerate }: WorkflowToolsCardProps) {
    const tools = persona.environment?.technology || [];

    return (
        <PersonaCard
            title="Workflow & Tools"
            onEdit={onEdit}
            onRegenerate={onRegenerate}
            className="flex-shrink-0 min-w-[400px]"
        >
            <div className="space-y-6">
                {/* Daily Workflow Timeline */}
                {journey.length > 0 && (
                    <div>
                        <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wider">
                            Daily Workflow
                        </h4>
                        <div className="space-y-3">
                            {journey.map((stage, index) => (
                                <motion.div
                                    key={stage.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                            {index + 1}
                                        </div>
                                        {index < journey.length - 1 && (
                                            <div className="w-0.5 h-8 bg-gradient-to-b from-orange-500/50 to-transparent my-1" />
                                        )}
                                    </div>
                                    <div className="flex-1 pb-4">
                                        <h5 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                                            {stage.name}
                                        </h5>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            {stage.description}
                                        </p>
                                        {stage.touchpoints && stage.touchpoints.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {stage.touchpoints.map((tp: string, i: number) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs text-zinc-600 dark:text-zinc-400"
                                                    >
                                                        {tp}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tools */}
                {tools.length > 0 && (
                    <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                        <div className="flex items-center gap-2 mb-3">
                            <Monitor className="w-4 h-4 text-zinc-500" />
                            <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                Technology Stack
                            </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tools.map((tool, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl text-sm font-medium text-blue-700 dark:text-blue-400 border border-blue-500/20"
                                >
                                    {tool}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PersonaCard>
    );
}






