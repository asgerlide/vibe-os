"use client";

import React from "react";
import { ArrowLeft, Sparkles, Plus, RotateCcw } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface PersonaHeaderProps {
    onRegeneratePersona?: () => void;
    onAddPersona?: () => void;
    onBackToCanvas?: () => void;
}

export function PersonaHeader({ onRegeneratePersona, onAddPersona, onBackToCanvas }: PersonaHeaderProps) {
    return (
        <div className="sticky top-0 z-50 w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50">
            <div className="max-w-[1920px] mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Left: Breadcrumbs & Title */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/canvas"
                            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                        </Link>
                        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
                        <div>
                            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                                <span>Blueprint</span>
                                <span>/</span>
                                <span className="text-zinc-900 dark:text-zinc-100 font-medium">Personas</span>
                            </div>
                            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                                Persona Builder
                            </h1>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">
                        {onRegeneratePersona && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onRegeneratePersona}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium text-sm shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Regenerate Persona
                            </motion.button>
                        )}
                        {onAddPersona && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onAddPersona}
                                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl font-medium text-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add Persona
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}






