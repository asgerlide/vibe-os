"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { PainPoint } from "@/lib/persona/types";
import { TileWrapper } from "./TileWrapper";

interface PainPointsTileProps {
  painPoints: PainPoint[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function PainPointsTile({ painPoints, onEdit, onRegenerate }: PainPointsTileProps) {
  const copyContent = () => {
    const text = painPoints
      .map((p) => `[${p.severity.toUpperCase()}] ${p.text} (${p.category})`)
      .join("\n");
    navigator.clipboard.writeText(text);
  };

  const getSeverityStyles = (severity: PainPoint["severity"]) => {
    switch (severity) {
      case "high":
        return "bg-red-50 border-red-100 text-red-800";
      case "medium":
        return "bg-amber-50 border-amber-100 text-amber-800";
      case "low":
        return "bg-emerald-50 border-emerald-100 text-emerald-800";
    }
  };

  const getCategoryStyles = (category: PainPoint["category"]) => {
    switch (category) {
      case "functional":
        return "bg-blue-100 text-blue-700";
      case "process":
        return "bg-purple-100 text-purple-700";
      case "tooling":
        return "bg-cyan-100 text-cyan-700";
      case "emotional":
        return "bg-pink-100 text-pink-700";
    }
  };

  // Sort by severity: high -> medium -> low
  const sortedPainPoints = [...painPoints].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.severity] - order[b.severity];
  });

  return (
    <TileWrapper
      title="Pain Points"
      icon={<AlertTriangle className="w-4 h-4 text-slate-500" />}
      onEdit={onEdit}
      onRegenerate={onRegenerate}
      onCopy={copyContent}
    >
      <div className="space-y-2.5">
        {sortedPainPoints.slice(0, 5).map((point) => (
          <div
            key={point.id}
            className={`
              p-3 rounded-xl border transition-colors
              ${getSeverityStyles(point.severity)}
            `}
          >
            <p className="text-sm leading-snug">
              {point.text}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`text-[10px] font-medium px-1.5 py-0.5 rounded capitalize ${getCategoryStyles(point.category)}`}
              >
                {point.category}
              </span>
              <span className="text-[10px] font-semibold uppercase opacity-60">
                {point.severity}
              </span>
            </div>
          </div>
        ))}
        
        {painPoints.length > 5 && (
          <p className="text-xs text-slate-400 text-center pt-1">
            +{painPoints.length - 5} more pain points
          </p>
        )}
      </div>
    </TileWrapper>
  );
}
