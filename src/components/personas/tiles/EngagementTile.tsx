"use client";

import React from "react";
import { BarChart3, TrendingUp, Target, Clock } from "lucide-react";
import { Persona } from "@/lib/persona/types";
import { TileWrapper } from "./TileWrapper";

interface EngagementTileProps {
  persona: Persona;
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function EngagementTile({ persona, onEdit, onRegenerate }: EngagementTileProps) {
  // Derive some engagement metrics from persona data
  const metrics = {
    matchScore: persona.matchScore,
    goalsProgress: Math.round(
      (persona.journey.filter(j => j.status === "completed").length / persona.journey.length) * 100
    ),
    painPointsCritical: persona.painPoints.filter(p => p.severity === "high").length,
    totalPainPoints: persona.painPoints.length,
    toolsCount: persona.tools.length,
    jtbdsCount: persona.jtbds.length,
  };

  const copyContent = () => {
    const text = `Match Score: ${metrics.matchScore}%\nJourney Progress: ${metrics.goalsProgress}%\nCritical Pain Points: ${metrics.painPointsCritical}/${metrics.totalPainPoints}\nTools: ${metrics.toolsCount}\nJTBDs: ${metrics.jtbdsCount}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <TileWrapper
      title="Engagement Metrics"
      icon={<BarChart3 className="w-4 h-4 text-slate-500" />}
      onEdit={onEdit}
      onRegenerate={onRegenerate}
      onCopy={copyContent}
    >
      <div className="space-y-4">
        {/* Match Score */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-xs font-medium text-slate-600">Match Score</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{metrics.matchScore}%</span>
          </div>
          <div className="progress-track h-2">
            <div 
              className="progress-fill h-full"
              style={{ width: `${metrics.matchScore}%` }}
            />
          </div>
        </div>

        {/* Journey Progress */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-medium text-slate-600">Journey Progress</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{metrics.goalsProgress}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
              style={{ width: `${metrics.goalsProgress}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100">
          <div className="text-center p-2 rounded-xl bg-red-50 border border-red-100">
            <p className="text-lg font-bold text-red-600">{metrics.painPointsCritical}</p>
            <p className="text-[10px] font-medium text-red-600/70">Critical Issues</p>
          </div>
          <div className="text-center p-2 rounded-xl bg-blue-50 border border-blue-100">
            <p className="text-lg font-bold text-blue-600">{metrics.toolsCount}</p>
            <p className="text-[10px] font-medium text-blue-600/70">Tools Used</p>
          </div>
          <div className="text-center p-2 rounded-xl bg-purple-50 border border-purple-100">
            <p className="text-lg font-bold text-purple-600">{metrics.jtbdsCount}</p>
            <p className="text-[10px] font-medium text-purple-600/70">Jobs to Do</p>
          </div>
        </div>

        {/* Insight */}
        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-indigo-50 border border-indigo-100">
          <TrendingUp className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-slate-600 leading-relaxed">
            {metrics.matchScore >= 85 
              ? "High-value persona with strong product alignment. Prioritize their feedback."
              : metrics.matchScore >= 70
              ? "Good fit persona. Address critical pain points to increase engagement."
              : "Developing persona. More research needed to improve alignment."
            }
          </p>
        </div>
      </div>
    </TileWrapper>
  );
}
