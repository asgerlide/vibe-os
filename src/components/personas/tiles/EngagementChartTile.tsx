"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";
import { EngagementData } from "@/lib/persona/types";
import { TileWrapper } from "./TileWrapper";

interface EngagementChartTileProps {
  data: EngagementData[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function EngagementChartTile({ data, onEdit, onRegenerate }: EngagementChartTileProps) {
  const copyContent = () => {
    const text = data.map(d => `${d.label}: ${d.value}`).join("\n");
    navigator.clipboard.writeText(text);
  };

  // Calculate trend
  const firstHalf = data.slice(0, Math.floor(data.length / 2));
  const secondHalf = data.slice(Math.floor(data.length / 2));
  const firstAvg = firstHalf.reduce((a, b) => a + b.value, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((a, b) => a + b.value, 0) / secondHalf.length;
  const trend = ((secondAvg - firstAvg) / firstAvg * 100).toFixed(0);
  const isPositive = Number(trend) > 0;

  return (
    <TileWrapper
      title="Engagement Activity"
      icon={<TrendingUp className="w-4 h-4 text-slate-500" />}
      onEdit={onEdit}
      onRegenerate={onRegenerate}
      onCopy={copyContent}
    >
      {/* Stats Row */}
      <div className="flex items-center gap-4 mb-4">
        <div>
          <p className="text-2xl font-bold text-slate-900">{data[data.length - 1]?.value || 0}%</p>
          <p className="text-xs text-slate-500">Current</p>
        </div>
        <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${isPositive ? 'bg-[#FF6B35]/10 text-[#FF6B35]' : 'bg-red-100 text-red-700'}`}>
          {isPositive ? '+' : ''}{trend}% trend
        </div>
      </div>

      {/* Chart */}
      <div className="h-[140px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6B35" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#FF6B35" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="label" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: 'none', 
                borderRadius: '8px',
                fontSize: '12px',
                color: 'white'
              }}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#FF6B35"
              strokeWidth={2}
              fill="url(#engagementGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </TileWrapper>
  );
}
