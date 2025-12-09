"use client";

import React, { useState } from "react";
import { Zap, Lock, Sparkles, RefreshCw, Edit3 } from "lucide-react";
import { Trigger, Constraint } from "@/lib/persona/types";

interface MotivationsTriggersCardProps {
  triggers: Trigger[];
  constraints: Constraint[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function MotivationsTriggersCard({ triggers, constraints, onEdit, onRegenerate }: MotivationsTriggersCardProps) {
  const [activeTab, setActiveTab] = useState<"triggers" | "constraints">("triggers");

  return (
    <div className="elevated-card h-full">
      {/* Card Header */}
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="card-icon">
            <Zap className="w-4 h-4" />
          </div>
          <span className="card-title">Motivations & Barriers</span>
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

      {/* Tabs */}
      <div className="px-5 pt-4">
        <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab("triggers")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "triggers"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Triggers</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-md bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-bold">
              {triggers.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("constraints")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "constraints"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Constraints</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-md bg-slate-200 text-slate-600 text-xs font-bold">
              {constraints.length}
            </span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="card-content">
        {activeTab === "triggers" ? (
          <div className="space-y-2">
            {triggers.map((trigger) => (
              <div
                key={trigger.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-[#FF6B35]/5 border border-[#FF6B35]/10 hover:bg-[#FF6B35]/10 transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-[#FF6B35]/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-3.5 h-3.5 text-[#FF6B35]" />
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{trigger.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {constraints.map((constraint) => (
              <div
                key={constraint.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{constraint.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* AI Insight */}
        <div className="mt-4 p-3 rounded-xl bg-[#090C9B]/5 border border-[#090C9B]/10">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#090C9B] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              {activeTab === "triggers"
                ? "These triggers indicate high motivation when pain points become acute. Target messaging around these moments."
                : "Address these constraints early in the sales process to reduce friction and objections."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}




