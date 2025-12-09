"use client";

import React from "react";
import { Layers, Sparkles, RefreshCw, Edit3 } from "lucide-react";
import { Persona } from "@/lib/persona/types";

interface FeatureRelevanceCardProps {
  persona: Persona;
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function FeatureRelevanceCard({ persona, onEdit, onRegenerate }: FeatureRelevanceCardProps) {
  // Mock feature relevance data
  const features = [
    { name: "Automation", relevance: 95, priority: "high" },
    { name: "Analytics", relevance: 88, priority: "high" },
    { name: "Collaboration", relevance: 82, priority: "medium" },
    { name: "Integrations", relevance: 78, priority: "medium" },
    { name: "Templates", relevance: 65, priority: "low" },
    { name: "Mobile App", relevance: 45, priority: "low" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-[#FF6B35]";
      case "medium": return "text-[#090C9B]";
      default: return "text-slate-400";
    }
  };

  const getRelevanceBar = (relevance: number) => {
    if (relevance >= 80) return "bg-[#FF6B35]";
    if (relevance >= 60) return "bg-[#090C9B]";
    return "bg-slate-300";
  };

  return (
    <div className="elevated-card h-full">
      {/* Card Header */}
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="card-icon">
            <Layers className="w-4 h-4" />
          </div>
          <span className="card-title">Feature Relevance</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onEdit} className="ai-action-btn" title="Edit">
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button onClick={onRegenerate} className="ai-action-btn" title="Regenerate">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="card-content">
        <div className="space-y-3">
          {features.map((feature) => (
            <div key={feature.name} className="flex items-center gap-3">
              <div className="w-24 flex-shrink-0">
                <p className="text-sm font-medium text-slate-700">{feature.name}</p>
              </div>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getRelevanceBar(feature.relevance)}`}
                  style={{ width: `${feature.relevance}%` }}
                />
              </div>
              <div className={`w-12 text-right text-sm font-bold ${getPriorityColor(feature.priority)}`}>
                {feature.relevance}%
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#FF6B35]" />
                High priority
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#090C9B]" />
                Medium
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-300" />
                Low
              </span>
            </div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="mt-4 p-3 rounded-xl bg-[#FF6B35]/5 border border-[#FF6B35]/10">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#FF6B35] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-[#FF6B35]">Automation</strong> and <strong className="text-[#FF6B35]">Analytics</strong> are top priorities for this persona. Focus messaging on these capabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}




