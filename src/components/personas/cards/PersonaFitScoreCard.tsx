"use client";

import React from "react";
import { Target, TrendingUp, Check, AlertCircle, Sparkles, RefreshCw, Edit3 } from "lucide-react";
import { Persona } from "@/lib/persona/types";

interface PersonaFitScoreCardProps {
  persona: Persona;
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function PersonaFitScoreCard({ persona, onEdit, onRegenerate }: PersonaFitScoreCardProps) {
  const score = persona.matchScore;
  const scoreColor = score >= 80 ? "#10B981" : score >= 60 ? "#FF6B35" : "#EF4444";
  
  // Mock fit factors - in real app, these would come from persona data
  const fitFactors = [
    { label: "Problem-Solution Fit", score: 88, positive: true },
    { label: "Technical Match", score: 75, positive: true },
    { label: "Budget Alignment", score: 65, positive: score >= 60 },
    { label: "Timeline Fit", score: 90, positive: true },
  ];

  return (
    <div className="elevated-card h-full">
      {/* Card Header */}
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="card-icon">
            <Target className="w-4 h-4" />
          </div>
          <span className="card-title">Fit Score</span>
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
        {/* Score Ring */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#F1F5F9"
                strokeWidth="12"
              />
              {/* Progress circle */}
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={scoreColor}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(score / 100) * 327} 327`}
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-900">{score}</span>
              <span className="text-xs text-slate-400 font-medium">/ 100</span>
            </div>
          </div>
        </div>

        {/* Segment Tag */}
        <div className="flex justify-center mb-5">
          <span className={`pill ${score >= 80 ? "pill-success" : score >= 60 ? "pill-accent" : "pill-danger"}`}>
            <TrendingUp className="w-3 h-3" />
            {score >= 80 ? "High-Value Segment" : score >= 60 ? "Growth Potential" : "Edge Segment"}
          </span>
        </div>

        {/* Fit Factors */}
        <div className="space-y-3">
          {fitFactors.map((factor) => (
            <div key={factor.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {factor.positive ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertCircle className="w-3 h-3 text-amber-600" />
                  </div>
                )}
                <span className="text-sm text-slate-600">{factor.label}</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">{factor.score}%</span>
            </div>
          ))}
        </div>

        {/* AI Suggestion */}
        <div className="mt-5 p-3 rounded-xl bg-[#090C9B]/5 border border-[#090C9B]/10">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-[#090C9B] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              This persona shows strong alignment with core product value. Consider prioritizing features that address workflow efficiency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}




