"use client";

import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EditableField } from "./EditableField";

interface PersonaSidePanelProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function PersonaSidePanel({ isOpen, onClose, title, children }: PersonaSidePanelProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    />
                    
                    {/* Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-[480px] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-l border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl z-50 overflow-y-auto"
                    >
                        <div className="sticky top-0 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                            >
                                <X className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                            </button>
                        </div>
                        <div className="p-6">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}






