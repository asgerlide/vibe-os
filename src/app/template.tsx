"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PlatformTemplate({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
