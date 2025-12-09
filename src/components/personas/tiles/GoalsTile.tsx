"use client";

import React from "react";
import { Target, Flag } from "lucide-react";
import { Goal } from "@/lib/persona/types";
import { TileWrapper } from "./TileWrapper";

interface GoalsTileProps {
  goals: Goal[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function GoalsTile({ goals, onEdit, onRegenerate }: GoalsTileProps) {
  const copyContent = () => {
    const text = goals
      .map((g, i) => `${i + 1}. ${g.text}${g.metric ? ` (${g.metric})` : ""}`)
      .join("\n");
    navigator.clipboard.writeText(text);
  };

  const getPriorityStyles = (priority: Goal["priority"]) => {
    switch (priority) {
      case 1:
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case 2:
        return "bg-amber-50 text-amber-700 border-amber-200";
      case 3:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const getPriorityLabel = (priority: Goal["priority"]) => {
    switch (priority) {
      case 1:
        return "P1";
      case 2:
        return "P2";
      case 3:
        return "P3";
    }
  };

  // Sort by priority
  const sortedGoals = [...goals].sort((a, b) => a.priority - b.priority);

  return (
    <TileWrapper
      title="Goals"
      icon={<Target className="w-4 h-4 text-slate-500" />}
      onEdit={onEdit}
      onRegenerate={onRegenerate}
      onCopy={copyContent}
    >
      <div className="space-y-2.5">
        {sortedGoals.map((goal) => (
          <div
            key={goal.id}
            className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors border border-slate-100"
          >
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 border ${getPriorityStyles(goal.priority)}`}
            >
              {getPriorityLabel(goal.priority)}
            </span>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-700 leading-snug">
                {goal.text}
              </p>
              {goal.metric && (
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <Flag className="w-3 h-3" />
                  {goal.metric}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </TileWrapper>
  );
}
