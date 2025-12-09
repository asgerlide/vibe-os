"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, AlertTriangle, Lightbulb, ChevronRight } from "lucide-react";
import { GoalPainSolution } from "@/lib/persona/types";
import { TileWrapper } from "./TileWrapper";

interface GoalPainSolutionTileProps {
  data: GoalPainSolution[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function GoalPainSolutionTile({ data, onEdit, onRegenerate }: GoalPainSolutionTileProps) {
  const copyContent = () => {
    const text = data.map(item => 
      `Goal: ${item.goal.text}\nPain Points: ${item.painPoints.map(p => p.text).join(", ")}\nSolution: ${item.solution.text}`
    ).join("\n\n");
    navigator.clipboard.writeText(text);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 border-red-200 text-red-700";
      case "medium": return "bg-orange-100 border-orange-200 text-orange-700";
      case "low": return "bg-emerald-100 border-emerald-200 text-emerald-700";
      default: return "bg-slate-100 border-slate-200 text-slate-700";
    }
  };

  return (
    <TileWrapper
      title="Goal → Pain Point → Solution Model"
      icon={<Target className="w-4 h-4 text-slate-500" />}
      onEdit={onEdit}
      onRegenerate={onRegenerate}
      onCopy={copyContent}
    >
      <div className="space-y-6">
        {data.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Flowchart Row */}
            <div className="flex items-stretch gap-0">
              {/* Goal Node */}
              <div className="flex-1 min-w-0">
                <div className="h-full p-3 rounded-xl bg-[#090C9B]/5 border border-[#090C9B]/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-[#090C9B] flex items-center justify-center">
                      <Target className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[10px] font-semibold text-[#090C9B] uppercase tracking-wide">Goal</span>
                  </div>
                  <p className="text-sm font-medium text-slate-800 leading-snug">
                    {item.goal.text}
                  </p>
                  {item.goal.metric && (
                    <p className="text-xs text-[#090C9B] mt-1.5">
                      Metric: {item.goal.metric}
                    </p>
                  )}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center px-2">
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>

              {/* Pain Points Node */}
              <div className="flex-1 min-w-0">
                <div className="h-full p-3 rounded-xl bg-red-50/50 border border-red-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-red-500 flex items-center justify-center">
                      <AlertTriangle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[10px] font-semibold text-red-600 uppercase tracking-wide">Pain Points</span>
                  </div>
                  <div className="space-y-1.5">
                    {item.painPoints.map((pain) => (
                      <div
                        key={pain.id}
                        className={`px-2 py-1.5 rounded-lg text-xs border ${getSeverityColor(pain.severity)}`}
                      >
                        {pain.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center px-2">
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>

              {/* Solution Node */}
              <div className="flex-1 min-w-0">
                <div className="h-full p-3 rounded-xl bg-[#FF6B35]/5 border border-[#FF6B35]/15">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-[#FF6B35] flex items-center justify-center">
                      <Lightbulb className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[10px] font-semibold text-[#FF6B35] uppercase tracking-wide">Solution</span>
                  </div>
                  <p className="text-sm font-medium text-slate-800 leading-snug">
                    {item.solution.text}
                  </p>
                  {item.solution.feature && (
                    <div className="mt-2 inline-flex items-center px-2 py-1 rounded-md bg-[#FF6B35]/10 text-xs font-medium text-[#FF6B35]">
                      {item.solution.feature}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Connector line to next item */}
            {index < data.length - 1 && (
              <div className="flex justify-center py-3">
                <div className="w-px h-4 bg-slate-200" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </TileWrapper>
  );
}
