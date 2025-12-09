"use client";

import React from "react";
import { Tag, Plus, X } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { Behavior } from "@/types/personas";
import { motion } from "framer-motion";

interface BehaviorsSectionProps {
    behaviors: Behavior[];
    onUpdate: (behaviors: Behavior[]) => void;
}

export function BehaviorsSection({ behaviors, onUpdate }: BehaviorsSectionProps) {
    const [newBehavior, setNewBehavior] = React.useState("");

    const addBehavior = () => {
        if (newBehavior.trim()) {
            onUpdate([
                ...behaviors,
                {
                    id: `behavior-${Date.now()}`,
                    label: newBehavior.trim(),
                    category: "preference",
                },
            ]);
            setNewBehavior("");
        }
    };

    const removeBehavior = (id: string) => {
        onUpdate(behaviors.filter((b) => b.id !== id));
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "technology":
                return "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900/30";
            case "preference":
                return "bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-900/30";
            case "pattern":
                return "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900/30";
            default:
                return "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700";
        }
    };

    const behaviorsByCategory = {
        technology: behaviors.filter((b) => b.category === "technology"),
        preference: behaviors.filter((b) => b.category === "preference"),
        pattern: behaviors.filter((b) => b.category === "pattern"),
    };

    return (
        <SectionCard
            title="Behaviors & Preferences"
            description="Capture user behaviors, preferences, and patterns"
        >
            <div className="space-y-4">
                {/* Add New Behavior */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newBehavior}
                        onChange={(e) => setNewBehavior(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addBehavior()}
                        placeholder="Add a behavior or preference..."
                        className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                        onClick={addBehavior}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add
                    </button>
                </div>

                {/* Behaviors by Category */}
                {Object.entries(behaviorsByCategory).map(([category, categoryBehaviors]) => (
                    categoryBehaviors.length > 0 && (
                        <div key={category}>
                            <h4 className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">
                                {category}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {categoryBehaviors.map((behavior) => (
                                    <motion.div
                                        key={behavior.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${getCategoryColor(behavior.category)}`}
                                    >
                                        <Tag className="w-3 h-3" />
                                        <span className="text-sm">{behavior.label}</span>
                                        <button
                                            onClick={() => removeBehavior(behavior.id)}
                                            className="hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )
                ))}

                {behaviors.length === 0 && (
                    <p className="text-sm text-zinc-400 text-center py-8">
                        No behaviors added yet. Add one above to get started.
                    </p>
                )}
            </div>
        </SectionCard>
    );
}






