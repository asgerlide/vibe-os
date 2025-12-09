"use client";

import React from "react";
import { Target, AlertTriangle, Lightbulb, ArrowRight, Sparkles, RefreshCw, Edit3 } from "lucide-react";
import { GoalPainSolution } from "@/lib/persona/types";

interface GoalsPainsSolutionsCardProps {
  data: GoalPainSolution[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function GoalsPainsSolutionsCard({ data, onEdit, onRegenerate }: GoalsPainsSolutionsCardProps) {
  return (
    <div className="elevated-card">
      {/* Card Header */}
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="card-icon">
            <Target className="w-4 h-4" />
          </div>
          <span className="card-title">Goals → Pains → Solutions</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onEdit} className="ai-action-btn" title="Edit">
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button onClick={onRegenerate} className="ai-action-btn" title="Regenerate">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button className="ai-action-btn" title="AI Refine">
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Content - Lane Layout */}
      <div className="card-content">
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={item.id} className="lane-container">
              {/* Goal Lane */}
              <div className="lane bg-[#090C9B]/5 border border-[#090C9B]/10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg bg-[#090C9B] flex items-center justify-center">
                    <Target className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-[#090C9B] uppercase tracking-wider">Goal</span>
                </div>
                <p className="text-sm font-medium text-slate-800 mb-2">{item.goal.text}</p>
                {item.goal.metric && (
                  <p className="text-xs text-[#090C9B]">📊 {item.goal.metric}</p>
                )}
              </div>

              {/* Connector */}
              <div className="lane-connector">
                <ArrowRight className="w-5 h-5" />
              </div>

              {/* Pain Points Lane */}
              <div className="lane bg-red-50/50 border border-red-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg bg-red-500 flex items-center justify-center">
                    <AlertTriangle className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Pain Points</span>
                </div>
                <div className="space-y-2">
                  {item.painPoints.map((pain) => (
                    <div
                      key={pain.id}
                      className={`px-3 py-2 rounded-lg text-xs border ${
                        pain.severity === "high" 
                          ? "bg-red-100 border-red-200 text-red-700"
                          : pain.severity === "medium"
                          ? "bg-amber-100 border-amber-200 text-amber-700"
                          : "bg-emerald-100 border-emerald-200 text-emerald-700"
                      }`}
                    >
                      {pain.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Connector */}
              <div className="lane-connector">
                <ArrowRight className="w-5 h-5" />
              </div>

              {/* Solution Lane */}
              <div className="lane bg-[#FF6B35]/5 border border-[#FF6B35]/15">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg bg-[#FF6B35] flex items-center justify-center">
                    <Lightbulb className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-[#FF6B35] uppercase tracking-wider">Solution</span>
                </div>
                <p className="text-sm font-medium text-slate-800 mb-2">{item.solution.text}</p>
                {item.solution.feature && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#FF6B35]/10 text-xs font-medium text-[#FF6B35]">
                    ✨ {item.solution.feature}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>{data.length} goal-solution mappings</span>
            <span>•</span>
            <span>{data.reduce((acc, d) => acc + d.painPoints.length, 0)} pain points addressed</span>
          </div>
          <button className="text-xs text-[#090C9B] font-medium hover:underline">
            + Add mapping
          </button>
        </div>
      </div>
    </div>
  );
}




