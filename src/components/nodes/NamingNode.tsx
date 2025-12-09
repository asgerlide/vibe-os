import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const NamingNode = React.memo(({ data }: NodeProps) => {
    const nodeData = data as Record<string, any>;

    // Placeholder data - will be replaced with real data later
    const productName = nodeData.productName || "VibeOS";
    const description = nodeData.description || "Transform scattered thoughts into structured product specifications";
    const logoUrl = nodeData.logoUrl; // Optional logo URL
    const logoInitials = productName.split(' ').map((word: string) => word[0]).join('').slice(0, 2).toUpperCase();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-[340px]"
        >
            {/* Input Handle (Left) */}
            <Handle
                type="target"
                position={Position.Left}
                className="!h-3 !w-3 !rounded-full !border-2 !border-white !bg-zinc-400 dark:!bg-zinc-600 !shadow-sm"
            />

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow p-5">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <h3 className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                        Naming & Story
                    </h3>
                </div>

                {/* Logo and Product Name */}
                <div className="flex items-center gap-4 mb-5">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        {logoUrl ? (
                            <img
                                src={logoUrl}
                                alt={`${productName} logo`}
                                className="w-16 h-16 rounded-xl object-cover border-2 border-zinc-200 dark:border-zinc-700"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center border-2 border-orange-400 dark:border-orange-600">
                                <span className="text-xl font-bold text-white">
                                    {logoInitials}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Product Name */}
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1">
                            Product Name
                        </p>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 truncate">
                            {productName}
                        </h2>
                    </div>
                </div>

                {/* Tagline & Description */}
                <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3 border border-zinc-200 dark:border-zinc-700">
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>

            {/* Output Handle (Right) */}
            <Handle
                type="source"
                position={Position.Right}
                className="!h-3 !w-3 !rounded-full !border-2 !border-white !bg-zinc-400 dark:!bg-zinc-600 !shadow-sm"
            />
        </motion.div>
    );
});

NamingNode.displayName = "NamingNode";
