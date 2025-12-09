"use client";

import React from "react";
import { Lightbulb, Heart, Users, Cog } from "lucide-react";
import { JTBDItem } from "@/lib/persona/types";
import { TileWrapper } from "./TileWrapper";

interface JTBDTileProps {
  jtbds: JTBDItem[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function JTBDTile({ jtbds, onEdit, onRegenerate }: JTBDTileProps) {
  const copyContent = () => {
    const text = jtbds
      .map((j) => `[${j.kind.toUpperCase()}] ${j.title}\n  → ${j.detail}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
  };

  const getKindConfig = (kind: JTBDItem["kind"]) => {
    switch (kind) {
      case "functional":
        return {
          icon: <Cog className="w-3.5 h-3.5" />,
          styles: "bg-[#090C9B]/5 border-[#090C9B]/10 text-[#090C9B]",
          label: "Functional",
        };
      case "emotional":
        return {
          icon: <Heart className="w-3.5 h-3.5" />,
          styles: "bg-[#FF6B35]/5 border-[#FF6B35]/15 text-[#FF6B35]",
          label: "Emotional",
        };
      case "social":
        return {
          icon: <Users className="w-3.5 h-3.5" />,
          styles: "bg-slate-100 border-slate-200 text-slate-600",
          label: "Social",
        };
    }
  };

  return (
    <TileWrapper
      title="Jobs to Be Done"
      icon={<Lightbulb className="w-4 h-4 text-slate-500" />}
      onEdit={onEdit}
      onRegenerate={onRegenerate}
      onCopy={copyContent}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {jtbds.map((jtbd) => {
          const config = getKindConfig(jtbd.kind);
          return (
            <div
              key={jtbd.id}
              className={`p-3 rounded-xl border ${config.styles}`}
            >
              <div className="flex items-center gap-2 mb-2">
                {config.icon}
                <span className="text-[10px] font-semibold uppercase tracking-wide">
                  {config.label}
                </span>
              </div>
              
              <p className="text-sm font-medium text-slate-800 mb-1.5">
                {jtbd.title}
              </p>
              
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {jtbd.detail}
              </p>
            </div>
          );
        })}
      </div>
    </TileWrapper>
  );
}
