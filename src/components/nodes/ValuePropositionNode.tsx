import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { motion } from "framer-motion";
import { Target } from "lucide-react";

interface CompetitorPosition {
    name: string;
    quality: number; // 0-100
    price: number;   // 0-100
    color: string;
}

export const ValuePropositionNode = React.memo(({ data }: NodeProps) => {
    const nodeData = data as Record<string, any>;

    // Placeholder data - will be replaced with real data later
    const tagline = nodeData.tagline || "Transform ideas into reality";
    const targetMarket = nodeData.targetMarket || "Product teams and entrepreneurs";

    // Positioning data (0-100 scale for each axis)
    const positioning = nodeData.positioning || {
        quality: 85,      // Quality/Premium
        price: 40,        // Price (low to high)
        innovation: 90,   // Innovation
        simplicity: 95    // Ease of Use/Simplicity
    };

    // Competitor positioning data
    const competitors: CompetitorPosition[] = nodeData.competitorPositions || [
        { name: "Microsoft", quality: 75, price: 70, color: "#ec4899" },
        { name: "Notion", quality: 80, price: 50, color: "#f59e0b" },
        { name: "Airtable", quality: 70, price: 60, color: "#8b5cf6" },
        { name: "Us", quality: 85, price: 40, color: "#f97316" }
    ];

    // Create radar chart polygons
    const createRadarPath = (data: typeof positioning) => {
        const centerX = 60;
        const centerY = 60;
        const maxRadius = 50;

        const angles = [0, 90, 180, 270]; // degrees for 4 axes
        const values = [data.quality, data.price, data.innovation, data.simplicity];

        const points = values.map((value, i) => {
            const angle = (angles[i] - 90) * (Math.PI / 180); // -90 to start from top
            const radius = (value / 100) * maxRadius;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            return `${x},${y}`;
        });

        return points.join(' ');
    };

    // Axis labels and positions for radar
    const radarLabels = [
        { label: 'Quality', x: 60, y: 8, fontSize: '8px' },
        { label: 'Price', x: 112, y: 62, fontSize: '8px' },
        { label: 'Innovation', x: 60, y: 116, fontSize: '8px' },
        { label: 'Simplicity', x: 8, y: 62, fontSize: '8px' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-[420px]"
        >
            {/* Input Handle (Left) */}
            <Handle
                type="target"
                position={Position.Left}
                className="!h-3 !w-3 !rounded-full !border-2 !border-white !bg-zinc-400 dark:!bg-zinc-600 !shadow-sm"
            />

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow p-6">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <h3 className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                        Value Proposition & Positioning
                    </h3>
                </div>

                {/* Tagline */}
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-3">
                    {tagline}
                </h2>

                {/* Target Market */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1.5">
                        <Target className="w-3.5 h-3.5 text-orange-500" />
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                            Target Market
                        </span>
                    </div>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 pl-5">
                        {targetMarket}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {/* Market Positioning Radar Chart */}
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-2.5 border border-zinc-200 dark:border-zinc-700">
                        <p className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                            Market Position
                        </p>
                        <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                            {/* Grid circles */}
                            <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-300 dark:text-zinc-600" />
                            <circle cx="60" cy="60" r="37.5" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-300 dark:text-zinc-600" />
                            <circle cx="60" cy="60" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-300 dark:text-zinc-600" />
                            <circle cx="60" cy="60" r="12.5" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-300 dark:text-zinc-600" />

                            {/* Axes */}
                            <line x1="60" y1="10" x2="60" y2="110" stroke="currentColor" strokeWidth="0.5" className="text-zinc-300 dark:text-zinc-600" />
                            <line x1="10" y1="60" x2="110" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-zinc-300 dark:text-zinc-600" />

                            {/* Positioning polygon */}
                            <polygon
                                points={createRadarPath(positioning)}
                                fill="rgba(249, 115, 22, 0.2)"
                                stroke="rgb(249, 115, 22)"
                                strokeWidth="2"
                            />

                            {/* Axis labels */}
                            {radarLabels.map((axis, i) => (
                                <text
                                    key={i}
                                    x={axis.x}
                                    y={axis.y}
                                    textAnchor="middle"
                                    style={{ fontSize: axis.fontSize }}
                                    className="font-medium fill-zinc-600 dark:fill-zinc-400"
                                >
                                    {axis.label}
                                </text>
                            ))}
                        </svg>
                    </div>

                    {/* Competitor Positioning Chart (Price vs Quality) */}
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-2.5 border border-zinc-200 dark:border-zinc-700">
                        <p className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                            Competitive Landscape
                        </p>
                        <svg width="120" height="120" viewBox="0 0 140 140" className="mx-auto">
                            {/* Grid lines */}
                            <line x1="20" y1="20" x2="20" y2="100" stroke="currentColor" strokeWidth="1" className="text-zinc-400 dark:text-zinc-600" />
                            <line x1="20" y1="100" x2="120" y2="100" stroke="currentColor" strokeWidth="1" className="text-zinc-400 dark:text-zinc-600" />

                            {/* Light grid */}
                            <line x1="20" y1="60" x2="120" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-zinc-300 dark:text-zinc-700" strokeDasharray="2,2" />
                            <line x1="70" y1="20" x2="70" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-zinc-300 dark:text-zinc-700" strokeDasharray="2,2" />

                            {/* Axis labels */}
                            <text x="70" y="115" textAnchor="middle" className="text-[7px] font-medium fill-zinc-500 dark:fill-zinc-400">
                                Higher Quality →
                            </text>
                            <text x="10" y="60" textAnchor="middle" transform="rotate(-90 10 60)" className="text-[7px] font-medium fill-zinc-500 dark:fill-zinc-400">
                                Higher Price →
                            </text>

                            {/* Competitor dots */}
                            {competitors.map((comp, i) => {
                                const x = 20 + (comp.quality / 100) * 100;
                                const y = 100 - (comp.price / 100) * 80;
                                const isUs = comp.name === "Us";
                                return (
                                    <g key={i}>
                                        <circle
                                            cx={x}
                                            cy={y}
                                            r={isUs ? 8 : 6}
                                            fill={comp.color}
                                            opacity={isUs ? 1 : 0.8}
                                            stroke={isUs ? "#fff" : "none"}
                                            strokeWidth={isUs ? 2 : 0}
                                        />
                                        {isUs && (
                                            <text
                                                x={x}
                                                y={y + 1}
                                                textAnchor="middle"
                                                className="text-[7px] font-bold fill-white"
                                            >
                                                Us
                                            </text>
                                        )}
                                    </g>
                                );
                            })}
                        </svg>

                        {/* Legend */}
                        <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1">
                            {competitors.map((comp, i) => (
                                <div key={i} className="flex items-center gap-1">
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: comp.color }}
                                    />
                                    <span className="text-[8px] text-zinc-600 dark:text-zinc-400">
                                        {comp.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Output Handle (Right) */}
            <Handle
                type="source"
                position={Position.Right}
                id="right"
                className="!h-3 !w-3 !rounded-full !border-2 !border-white !bg-zinc-400 dark:!bg-zinc-600 !shadow-sm"
            />

            {/* Output Handle (Bottom) for Naming connection */}
            <Handle
                type="source"
                position={Position.Bottom}
                id="bottom"
                className="!h-3 !w-3 !rounded-full !border-2 !border-white !bg-zinc-400 dark:!bg-zinc-600 !shadow-sm"
            />
        </motion.div>
    );
});

ValuePropositionNode.displayName = "ValuePropositionNode";
