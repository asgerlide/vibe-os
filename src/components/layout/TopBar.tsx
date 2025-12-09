"use client";

import { ChevronLeft, Download, Layers, LayoutGrid, LayoutDashboard, Save } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopBar() {
    const pathname = usePathname();
    const isCanvas = pathname === "/canvas";
    const isDashboard = pathname === "/dashboard";
    const isPersonas = pathname === "/canvas/personas";

    return (
        <div className="flex h-14 w-full items-center justify-between border-b border-white/20 bg-white/40 backdrop-blur-md px-4">
            <div className="flex items-center gap-4">
                <Link
                    href="/"
                    className="flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                    <ChevronLeft className="h-5 w-5" />
                </Link>
                <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                        <Layers className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                            Travel_AI_v1
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            Last edited 2m ago
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900">
                <Link
                    href="/canvas"
                    className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${isCanvas
                        ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                        }`}
                >
                    <LayoutGrid className="h-3.5 w-3.5" />
                    Blueprint
                </Link>
                <Link
                    href="/dashboard"
                    className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${isDashboard
                        ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                        }`}
                >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    Dashboard
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-pink-500 ring-2 ring-white dark:ring-zinc-950" />
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-xs font-medium text-white ring-2 ring-white dark:ring-zinc-950">
                        +2
                    </div>
                </div>
                <button className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
                    {isPersonas ? (
                        <>
                            <Save className="h-4 w-4" />
                            Save
                        </>
                    ) : (
                        <>
                            <Download className="h-4 w-4" />
                            Export .md
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
