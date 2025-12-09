"use client";

import React from "react";
import { Play, ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { Scenario } from "@/lib/persona/types";
import { TileWrapper } from "./TileWrapper";

interface ScenariosTileProps {
  scenarios: Scenario[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function ScenariosTile({ scenarios, onEdit, onRegenerate }: ScenariosTileProps) {
  const copyContent = () => {
    const text = scenarios
      .map((s) => `${s.title} [${s.outcome}]\n${s.description}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
  };

  const getOutcomeConfig = (outcome: Scenario["outcome"]) => {
    switch (outcome) {
      case "positive":
        return {
          icon: <ThumbsUp className="w-3 h-3" />,
          styles: "bg-emerald-100 text-emerald-700 border-emerald-200",
          bgStyles: "bg-emerald-50 border-emerald-100",
        };
      case "negative":
        return {
          icon: <ThumbsDown className="w-3 h-3" />,
          styles: "bg-red-100 text-red-700 border-red-200",
          bgStyles: "bg-red-50 border-red-100",
        };
      case "neutral":
        return {
          icon: <Minus className="w-3 h-3" />,
          styles: "bg-slate-100 text-slate-700 border-slate-200",
          bgStyles: "bg-slate-50 border-slate-100",
        };
    }
  };

  if (!scenarios || scenarios.length === 0) {
    return (
      <TileWrapper
        title="Scenarios"
        icon={<Play className="w-4 h-4 text-slate-500" />}
        onEdit={onEdit}
        onRegenerate={onRegenerate}
      >
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Play className="w-8 h-8 text-slate-300 mb-2" />
          <p className="text-sm text-slate-400">No scenarios defined</p>
          <p className="text-xs text-slate-300 mt-1">Click Edit to add usage scenarios</p>
        </div>
      </TileWrapper>
    );
  }

  return (
    <TileWrapper
      title="Scenarios"
      icon={<Play className="w-4 h-4 text-slate-500" />}
      onEdit={onEdit}
      onRegenerate={onRegenerate}
      onCopy={copyContent}
    >
      <div className="space-y-3">
        {scenarios.map((scenario) => {
          const config = getOutcomeConfig(scenario.outcome);
          return (
            <div
              key={scenario.id}
              className={`p-3 rounded-xl border ${config.bgStyles}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-medium text-slate-800">
                  {scenario.title}
                </p>
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded flex items-center gap-1 flex-shrink-0 capitalize border ${config.styles}`}
                >
                  {config.icon}
                  {scenario.outcome}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {scenario.description}
              </p>
            </div>
          );
        })}
      </div>
    </TileWrapper>
  );
}
