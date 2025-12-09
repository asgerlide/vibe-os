"use client";

import React from "react";
import { Heart, Zap, User, MapPin, GraduationCap, DollarSign } from "lucide-react";
import { PersonaCard } from "./PersonaCard";
import { Persona } from "@/types/personas";
import { motion } from "framer-motion";

interface DemographicsPsychographicsCardProps {
    persona: Persona;
    onEdit: () => void;
    onRegenerate: () => void;
}

export function DemographicsPsychographicsCard({ persona, onEdit, onRegenerate }: DemographicsPsychographicsCardProps) {
    return (
        <PersonaCard
            title="Demographics & Psychographics"
            onEdit={onEdit}
            onRegenerate={onRegenerate}
            className="flex-shrink-0"
        >
            <div className="space-y-4">
                {/* Demographics */}
                <div>
                    <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wider">
                        Demographics
                    </h4>
                    <div className="space-y-2">
                        {persona.demographics?.location && (
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-zinc-400" />
                                <span className="text-zinc-700 dark:text-zinc-300">{persona.demographics.location}</span>
                            </div>
                        )}
                        {persona.demographics?.education && (
                            <div className="flex items-center gap-2 text-sm">
                                <GraduationCap className="w-4 h-4 text-zinc-400" />
                                <span className="text-zinc-700 dark:text-zinc-300">{persona.demographics.education}</span>
                            </div>
                        )}
                        {persona.demographics?.income && (
                            <div className="flex items-center gap-2 text-sm">
                                <DollarSign className="w-4 h-4 text-zinc-400" />
                                <span className="text-zinc-700 dark:text-zinc-300">{persona.demographics.income}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Motivations */}
                {persona.motivations && persona.motivations.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-4 h-4 text-orange-500" />
                            <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                Motivations
                            </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {persona.motivations.map((motivation, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="px-3 py-1.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-full text-xs font-medium text-orange-700 dark:text-orange-400 border border-orange-500/20"
                                >
                                    {motivation}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Values */}
                {persona.values && persona.values.length > 0 && (
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Heart className="w-4 h-4 text-pink-500" />
                            <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                                Values
                            </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {persona.values.map((value, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="px-3 py-1.5 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full text-xs font-medium text-pink-700 dark:text-pink-400 border border-pink-500/20"
                                >
                                    {value}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Background */}
                {persona.background && (
                    <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                        <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">
                            Background
                        </h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {persona.background}
                        </p>
                    </div>
                )}
            </div>
        </PersonaCard>
    );
}






