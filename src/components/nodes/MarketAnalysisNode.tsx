import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useMarketStore } from "@/lib/market/store";

export const MarketAnalysisNode = React.memo(({ data }: NodeProps) => {
    const { marketData } = useMarketStore();
    const nodeData = data as Record<string, unknown>;

    // Use store data if available, otherwise fall back to node data or defaults
    const hasMarketData = !!marketData;
    const marketDefinition = marketData?.marketDefinition || (nodeData.marketDefinition as string) || "No market data yet";
    const marketShare = marketData?.marketShare || (nodeData.marketShare as number) || 0;
    const growthRate = marketData?.growthRate || (nodeData.growthRate as number) || 0;
    const isGrowth = growthRate >= 0;
    
    // Get competitor names
    const competitors = marketData?.competitors?.map(c => c.name).slice(0, 3) || 
        (nodeData.competitors as string[]) || 
        [];
    
    // Add "+N" if there are more competitors
    const displayCompetitors = [...competitors];
    if (marketData?.competitors && marketData.competitors.length > 3) {
        displayCompetitors.push(`+${marketData.competitors.length - 3}`);
    }

    const chartData = marketData?.chartData || (nodeData.chartData as number[]) || [45, 52, 48, 58, 54, 62, 75];

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
                    <div className={`w-2 h-2 rounded-full ${hasMarketData ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                    <h3 className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                        Market & Competitors
                    </h3>
                    {hasMarketData && (
                        <span className="ml-auto text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            AI Generated
                        </span>
                    )}
                </div>

                {/* Market Definition */}
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 line-clamp-2">
                    {marketDefinition}
                </h2>

                {/* Market Share Section */}
                {hasMarketData ? (
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-1 uppercase tracking-wide">
                                Market Share
                            </p>
                            <div className="flex items-baseline gap-3">
                                <span className="text-5xl font-bold text-zinc-900 dark:text-zinc-100">
                                    {marketShare}%
                                </span>
                                <div className={`flex items-center gap-1 text-sm font-medium ${isGrowth ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'
                                    }`}>
                                    <TrendingUp className={`w-4 h-4 ${!isGrowth && 'rotate-180'}`} />
                                    <span>{isGrowth ? '+' : '-'}{Math.abs(growthRate)}% YoY</span>
                                </div>
                            </div>
                        </div>

                        {/* Mini Bar Chart */}
                        <div className="flex items-end gap-1.5 h-16">
                            {chartData.map((value: number, index: number) => {
                                const height = (value / 100) * 100;
                                const isLast = index === chartData.length - 1;
                                return (
                                    <div
                                        key={index}
                                        className={`w-3 rounded-sm transition-all ${isLast
                                            ? 'bg-orange-500'
                                            : 'bg-zinc-300 dark:bg-zinc-700'
                                            }`}
                                        style={{ height: `${height}%` }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="mb-6 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700">
                        <p className="text-sm text-zinc-500 text-center">
                            Complete onboarding to generate market analysis
                        </p>
                    </div>
                )}

                {/* Key Players Section */}
                {displayCompetitors.length > 0 && (
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg px-4 py-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                                Key Players
                            </span>
                            <div className="flex items-center gap-2 flex-wrap justify-end">
                                {displayCompetitors.map((competitor: string, index: number) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-700 rounded-md border border-zinc-200 dark:border-zinc-600"
                                    >
                                        {competitor}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
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

MarketAnalysisNode.displayName = "MarketAnalysisNode";
