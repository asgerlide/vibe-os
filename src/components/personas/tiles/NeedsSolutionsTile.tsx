"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { NeedSolution } from "@/lib/persona/types";
import { TileWrapper } from "./TileWrapper";

interface NeedsSolutionsTileProps {
  needsMap: NeedSolution[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function NeedsSolutionsTile({ needsMap, onEdit, onRegenerate }: NeedsSolutionsTileProps) {
  const copyContent = () => {
    const text = needsMap
      .map((ns) => `Need: ${ns.need}\nSolution: ${ns.solution}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
  };

  return (
    <TileWrapper
      title="Needs → Solutions"
      icon={<Sparkles className="w-4 h-4 text-slate-500" />}
      onEdit={onEdit}
      onRegenerate={onRegenerate}
      onCopy={copyContent}
    >
      <div className="space-y-3">
        {needsMap.map((item, index) => (
          <div
            key={index}
            className="flex items-stretch gap-2"
          >
            {/* Need */}
            <div className="flex-1 p-2.5 rounded-xl bg-amber-50 border border-amber-100">
              <p className="text-caption text-amber-600 mb-1">NEED</p>
              <p className="text-sm text-amber-900 leading-snug">
                {item.need}
              </p>
            </div>

            {/* Arrow */}
            <div className="flex items-center px-1">
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </div>

            {/* Solution */}
            <div className="flex-1 p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
              <p className="text-caption text-emerald-600 mb-1">SOLUTION</p>
              <p className="text-sm text-emerald-900 leading-snug">
                {item.solution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </TileWrapper>
  );
}
