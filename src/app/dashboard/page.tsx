"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { motion } from "framer-motion";

export default function DashboardPage() {
    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex h-screen w-full flex-col bg-zinc-50 dark:bg-black"
        >
            <TopBar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <div className="relative flex-1 overflow-hidden">
                    {/* Dashboard content will go here */}
                    <div className="flex h-full w-full items-center justify-center">
                        <p className="text-zinc-400">Dashboard coming soon...</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
