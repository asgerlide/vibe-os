"use client";

import React from "react";
import { Wrench } from "lucide-react";
import { ToolRef } from "@/lib/persona/types";
import { TileWrapper } from "./TileWrapper";

interface ToolsTileProps {
  tools: ToolRef[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function ToolsTile({ tools, onEdit, onRegenerate }: ToolsTileProps) {
  const copyContent = () => {
    const text = tools.map((t) => `${t.name}: ${t.purpose}`).join("\n");
    navigator.clipboard.writeText(text);
  };

  return (
    <TileWrapper
      title="Tools & Stack"
      icon={<Wrench className="w-4 h-4 text-slate-500" />}
      onEdit={onEdit}
      onRegenerate={onRegenerate}
      onCopy={copyContent}
    >
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
          >
            <div className="w-6 h-6 rounded-md bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
              {tool.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-700">{tool.name}</p>
              <p className="text-[10px] text-slate-400">{tool.purpose}</p>
            </div>
          </div>
        ))}
      </div>
    </TileWrapper>
  );
}
