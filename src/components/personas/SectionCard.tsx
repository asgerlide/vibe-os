import React from "react";
import { motion } from "framer-motion";

interface SectionCardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

export function SectionCard({ title, description, children, className = "" }: SectionCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow p-6 ${className}`}
        >
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    {title}
                </h3>
                {description && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {description}
                    </p>
                )}
            </div>
            {children}
        </motion.div>
    );
}






