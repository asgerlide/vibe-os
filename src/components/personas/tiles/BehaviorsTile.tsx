"use client";

import React from "react";
import { Activity, CheckCircle2 } from "lucide-react";
import { TileWrapper } from "./TileWrapper";

interface BehaviorsTileProps {
  behaviors: string[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function BehaviorsTile({ behaviors, onEdit, onRegenerate }: BehaviorsTileProps) {
  const copyContent = () => {
    const text = behaviors.map((b, i) => `${i + 1}. ${b}`).join("\n");
    navigator.clipboard.writeText(text);
  };

  return (
    <TileWrapper
      title="Behaviors"
      icon={<Activity className="w-4 h-4 text-slate-500" />}
      onEdit={onEdit}
      onRegenerate={onRegenerate}
      onCopy={copyContent}
    >
      <div className="space-y-2">
        {behaviors.map((behavior, index) => (
          <div
            key={index}
            className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-slate-700 leading-snug">
              {behavior}
            </p>
          </div>
        ))}
      </div>
    </TileWrapper>
  );
}
