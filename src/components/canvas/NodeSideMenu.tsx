"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

interface NodeSideMenuProps {
    isOpen: boolean;
    onClose: () => void;
    nodeData: {
        id: string;
        label: string;
        type?: string;
    } | null;
}

export function NodeSideMenu({ isOpen, onClose, nodeData }: NodeSideMenuProps) {
    const router = useRouter();

    const handleNavigate = () => {
        if (nodeData) {
            // Navigate to specific pages based on node type
            if (nodeData.id === "child-1") {
                // Persona node navigates to UserProfiles page
                router.push("/canvas/UserProfiles");
            } else {
                // Default navigation for other nodes
                router.push(`/canvas/${nodeData.id}`);
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && nodeData && (
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                    }}
                    className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-96 bg-white dark:bg-zinc-900 shadow-2xl z-50 flex flex-col border-l border-zinc-200 dark:border-zinc-800"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                                {nodeData.label}
                            </h2>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                {nodeData.type === "root" ? "Root Node" : "Node Details"}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <X className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-6 overflow-y-auto">
                        <div className="space-y-4">
                            {/* Placeholder for future content */}
                            <div className="text-zinc-500 dark:text-zinc-400 text-sm">
                                Additional node details will appear here.
                            </div>
                        </div>
                    </div>

                    {/* Footer with Navigate Button */}
                    <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleNavigate}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                        >
                            <span>Open Node Page</span>
                            <ExternalLink className="h-4 w-4" />
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
