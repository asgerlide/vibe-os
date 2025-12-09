"use client";

import React from "react";
import { Activity, Check, Sparkles, RefreshCw, Edit3 } from "lucide-react";

interface BehaviorPatternsCardProps {
  behaviors: string[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function BehaviorPatternsCard({ behaviors, onEdit, onRegenerate }: BehaviorPatternsCardProps) {
  return (
    <div className="elevated-card h-full">
      {/* Card Header */}
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="card-icon">
            <Activity className="w-4 h-4" />
          </div>
          <span className="card-title">Behavior Patterns</span>
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

      {/* Card Content */}
      <div className="card-content">
        <div className="space-y-3">
          {behaviors.map((behavior, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-white hover:border-slate-200 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{behavior}</p>
            </div>
          ))}
        </div>

        {/* Pattern Summary */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{behaviors.length} patterns identified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#090C9B]" />
              <span>High consistency</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




