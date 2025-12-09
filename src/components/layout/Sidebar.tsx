"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Lightbulb,
    Users,
    TrendingUp,
    Target,
    List,
    Palette,
    Server,
    Tag,
    PenTool,
    FileText
} from "lucide-react";

// Icon mapping for each section
const sectionIcons = {
    root: Lightbulb,
    "child-1": Users,
    "child-2": TrendingUp,
    valueProp: Target,
    features: List,
    "child-3": Palette,
    architecture: Server,
    naming: Tag,
    uiux: PenTool,
    output: FileText,
};

// Blueprint sections with their IDs and labels
const blueprintSections: Array<{
    id: string;
    label: string;
    status: "complete" | "in-progress" | "pending";
}> = [
        { id: "root", label: "Idea", status: "complete" },
        { id: "child-1", label: "Personas & JTBD", status: "complete" },
        { id: "child-2", label: "Market & Competitors", status: "complete" },
        { id: "valueProp", label: "Value Proposition", status: "in-progress" },
        { id: "features", label: "Features & Requirements", status: "pending" },
        { id: "child-3", label: "Design Framework", status: "complete" },
        { id: "architecture", label: "Architecture & Tech Notes", status: "pending" },
        { id: "naming", label: "Naming & Story", status: "pending" },
        { id: "uiux", label: "UI/UX Direction", status: "pending" },
        { id: "output", label: "Final Blueprint Output", status: "pending" },
    ];

// Status indicator component
function StatusDot({ status }: { status: "complete" | "in-progress" | "pending" }) {
    const colorClass = {
        complete: "bg-emerald-500",
        "in-progress": "bg-orange-500",
        pending: "bg-zinc-300 dark:bg-zinc-700"
    }[status];

    return (
        <div className={`h-1.5 w-1.5 rounded-full ${colorClass} transition-colors duration-200`} />
    );
}

interface SidebarProps {
    activatedNodes: Set<string>;
}

export function Sidebar({ activatedNodes }: SidebarProps) {
    const handleSectionClick = (sectionId: string) => {
        // Navigate to specific pages for certain sections
        if (sectionId === "child-1") {
            // Personas page
            window.location.href = "/canvas/personas";
            return;
        }
        // TODO: Implement zoom to node functionality for other sections
        console.log("Navigate to section:", sectionId);
    };

    // Filter sections to only show activated nodes
    const visibleSections = blueprintSections.filter((section) =>
        activatedNodes.has(section.id)
    );

    return (
        <div className="flex h-full w-[260px] flex-col border-r border-white/20 bg-white/40 backdrop-blur-md">
            {/* Header */}
            <div className="border-b border-white/20 px-4 py-4">
                <h2 className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Blueprint
                </h2>
            </div>

            {/* Sections List */}
            <div className="flex-1 overflow-y-auto px-3 py-3">
                <div className="space-y-1">
                    {visibleSections.map((section) => {
                        const Icon = sectionIcons[section.id as keyof typeof sectionIcons];
                        const isPersonas = section.id === "child-1";
                        return (
                            <motion.button
                                key={section.id}
                                onClick={() => handleSectionClick(section.id)}
                                className="group flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition-all hover:bg-orange-50/80 hover:shadow-sm"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                transition={{ duration: 0.15 }}
                            >
                                {/* Icon */}
                                <div className="flex-shrink-0 rounded-lg border border-white/40 bg-white/60 p-2 shadow-sm group-hover:border-orange-200 group-hover:text-orange-600 transition-colors">
                                    <Icon className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                                </div>

                                {/* Label */}
                                <span className="flex-1 text-sm text-zinc-700 dark:text-zinc-300 truncate">
                                    {section.label}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Add New Block Button */}
            <div className="border-t border-white/20 p-3">
                <motion.button
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:border-zinc-700"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    Add Block
                </motion.button>
            </div>
        </div>
    );
}
