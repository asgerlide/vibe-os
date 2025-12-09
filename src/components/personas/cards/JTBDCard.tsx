"use client";

import React from "react";
import { Lightbulb, Cog, Heart, Users, Sparkles, RefreshCw, Edit3 } from "lucide-react";
import { JTBDItem } from "@/lib/persona/types";

interface JTBDCardProps {
  jtbds: JTBDItem[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function JTBDCard({ jtbds, onEdit, onRegenerate }: JTBDCardProps) {
  const getKindConfig = (kind: JTBDItem["kind"]) => {
    switch (kind) {
      case "functional":
        return {
          icon: <Cog className="w-3.5 h-3.5" />,
          color: "bg-[#090C9B]/5 border-[#090C9B]/10 text-[#090C9B]",
          iconBg: "bg-[#090C9B]",
          label: "Functional",
        };
      case "emotional":
        return {
          icon: <Heart className="w-3.5 h-3.5" />,
          color: "bg-[#FF6B35]/5 border-[#FF6B35]/10 text-[#FF6B35]",
          iconBg: "bg-[#FF6B35]",
          label: "Emotional",
        };
      case "social":
        return {
          icon: <Users className="w-3.5 h-3.5" />,
          color: "bg-slate-50 border-slate-200 text-slate-600",
          iconBg: "bg-slate-500",
          label: "Social",
        };
    }
  };

  return (
    <div className="elevated-card h-full">
      {/* Card Header */}
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="card-icon">
            <Lightbulb className="w-4 h-4" />
          </div>
          <span className="card-title">Jobs To Be Done</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onEdit} className="ai-action-btn" title="Edit">
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button onClick={onRegenerate} className="ai-action-btn" title="Regenerate">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button className="ai-action-btn" title="AI Refine">
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="card-content">
        <div className="space-y-3">
          {jtbds.map((jtbd) => {
            const config = getKindConfig(jtbd.kind);
            return (
              <div
                key={jtbd.id}
                className={`p-4 rounded-xl border ${config.color} transition-all hover:shadow-sm`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-lg ${config.iconBg} flex items-center justify-center text-white`}>
                    {config.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {config.label}
                  </span>
                </div>
                
                <h4 className="text-sm font-semibold text-slate-800 mb-1.5">{jtbd.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{jtbd.detail}</p>
              </div>
            );
          })}
        </div>

        {/* JTBD Framework Note */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 italic">
            "When I [situation], I want to [motivation], so I can [expected outcome]"
          </p>
        </div>
      </div>
    </div>
  );
}




