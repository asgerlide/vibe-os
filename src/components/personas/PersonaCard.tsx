"use client";

import React from "react";
import { motion } from "framer-motion";
import { Edit2, Sparkles, X } from "lucide-react";

interface PersonaCardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    onEdit?: () => void;
    onRegenerate?: () => void;
    aiSuggestions?: string[];
    onAcceptSuggestion?: (suggestion: string) => void;
    fullWidth?: boolean;
}

export function PersonaCard({
    title,
    children,
    className = "",
    onEdit,
    onRegenerate,
    aiSuggestions = [],
    onAcceptSuggestion,
    fullWidth = false,
}: PersonaCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-[24px] border border-white/50 dark:border-zinc-800/50 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 ${fullWidth ? 'w-full' : 'min-w-[320px] max-w-[400px]'} ${className}`}
        >
            {/* Header Actions */}
            {(onEdit || onRegenerate) && (
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                    {onEdit && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onEdit}
                            className="p-2 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-full border border-zinc-200/50 dark:border-zinc-700/50 shadow-sm hover:bg-white dark:hover:bg-zinc-700 transition-colors"
                        >
                            <Edit2 className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                        </motion.button>
                    )}
                    {onRegenerate && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onRegenerate}
                            className="p-2 bg-orange-500/10 backdrop-blur-sm rounded-full border border-orange-500/20 shadow-sm hover:bg-orange-500/20 transition-colors"
                        >
                            <Sparkles className="w-4 h-4 text-orange-500" />
                        </motion.button>
                    )}
                </div>
            )}

            {/* Content */}
            <div className="p-6">
                {title && (
                    <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4 uppercase tracking-wider">
                        {title}
                    </h3>
                )}
                {children}
            </div>

            {/* AI Suggestions */}
            {aiSuggestions.length > 0 && onAcceptSuggestion && (
                <div className="px-6 pb-4 pt-2 border-t border-zinc-200/50 dark:border-zinc-800/50">
                    <div className="flex flex-wrap gap-2">
                        {aiSuggestions.map((suggestion, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onAcceptSuggestion(suggestion)}
                                className="px-3 py-1.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 backdrop-blur-sm rounded-full border border-orange-500/20 text-xs font-medium text-orange-700 dark:text-orange-400 hover:from-orange-500/20 hover:to-amber-500/20 transition-all"
                            >
                                {suggestion}
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}






