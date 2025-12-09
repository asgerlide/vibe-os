import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CanvasNodeProps {
    id: string;
    label: string;
    x: number;
    y: number;
    selected?: boolean;
    type?: "root" | "child";
    onMouseDown?: (e: React.MouseEvent) => void;
}

export function CanvasNode({ id, label, x, y, selected, type = "child", onMouseDown }: CanvasNodeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseDown={onMouseDown}
            className={cn(
                "absolute flex items-center justify-center rounded-2xl border px-6 py-4 shadow-sm backdrop-blur-md cursor-move select-none pointer-events-auto",
                "bg-white/80 border-zinc-200 dark:bg-zinc-900/80 dark:border-zinc-800",
                selected && "ring-2 ring-blue-500 border-transparent",
                type === "root" ? "w-48 h-24" : "w-48 h-20"
            )}
            style={{
                left: x,
                top: y,
            }}
        >
            {/* Connection Handles */}
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="h-2 w-2 rounded-full bg-zinc-400 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-zinc-600" />
            </div>
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
                <div className="h-2 w-2 rounded-full bg-zinc-400 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-zinc-600" />
            </div>

            <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {label}
            </span>
        </motion.div>
    );
}
