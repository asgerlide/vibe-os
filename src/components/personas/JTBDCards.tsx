"use client";

import React from "react";
import { Target, Heart, Users, Star, Sparkles } from "lucide-react";
import { PersonaCard } from "./PersonaCard";
import { JTBD } from "@/types/personas";
import { motion } from "framer-motion";

interface JTBDCardsProps {
    jtbds: JTBD[];
    onRegenerate?: () => void;
}

const jtbdIcons = {
    functional: Target,
    emotional: Heart,
    social: Users,
};

const jtbdColors = {
    functional: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-700 dark:text-blue-400",
    emotional: "from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-700 dark:text-pink-400",
    social: "from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-700 dark:text-purple-400",
};

export function JTBDCards({ jtbds, onRegenerate }: JTBDCardsProps) {
    // Group JTBDs by importance for visual hierarchy
    const highImportance = jtbds.filter(j => j.importance >= 4);
    const mediumImportance = jtbds.filter(j => j.importance === 3);
    const lowImportance = jtbds.filter(j => j.importance <= 2);

    return (
        <div className="flex flex-col gap-4 flex-shrink-0 min-w-[360px]">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                    Jobs to Be Done
                </h3>
                {onRegenerate && (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onRegenerate}
                        className="p-1.5 bg-orange-500/10 rounded-lg border border-orange-500/20"
                    >
                        <Sparkles className="w-4 h-4 text-orange-500" />
                    </motion.button>
                )}
            </div>
            
            <div className="space-y-3">
                {jtbds.map((jtbd) => {
                    const importanceStars = Array.from({ length: 5 }, (_, i) => i < jtbd.importance);
                    const category = jtbd.importance >= 4 ? "functional" : jtbd.importance === 3 ? "emotional" : "social";
                    const Icon = jtbdIcons[category] || Target;
                    
                    return (
                        <motion.div
                            key={jtbd.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-zinc-800/50 shadow-sm p-4 hover:shadow-md transition-all"
                        >
                            <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-xl bg-gradient-to-br ${jtbdColors[category]} border`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-2">
                                        {jtbd.statement}
                                    </p>
                                    <div className="flex items-center gap-1">
                                        {importanceStars.map((filled, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${filled ? 'fill-orange-500 text-orange-500' : 'text-zinc-300 dark:text-zinc-700'}`}
                                            />
                                        ))}
                                        <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">
                                            {jtbd.importance}/5
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

