"use client";

import React from "react";
import { Wrench, ExternalLink, Sparkles, RefreshCw, Edit3 } from "lucide-react";
import { ToolRef } from "@/lib/persona/types";

interface ToolsEnvironmentCardProps {
  tools: ToolRef[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function ToolsEnvironmentCard({ tools, onEdit, onRegenerate }: ToolsEnvironmentCardProps) {
  // Tool categories for visual grouping
  const getToolColor = (purpose: string) => {
    const lower = purpose.toLowerCase();
    if (lower.includes("communication") || lower.includes("chat")) return "bg-blue-100 text-blue-600";
    if (lower.includes("design") || lower.includes("collab")) return "bg-pink-100 text-pink-600";
    if (lower.includes("tracking") || lower.includes("issue")) return "bg-purple-100 text-purple-600";
    if (lower.includes("analytics") || lower.includes("data")) return "bg-amber-100 text-amber-600";
    if (lower.includes("doc") || lower.includes("note")) return "bg-emerald-100 text-emerald-600";
    return "bg-slate-100 text-slate-600";
  };

  return (
    <div className="elevated-card h-full">
      {/* Card Header */}
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="card-icon">
            <Wrench className="w-4 h-4" />
          </div>
          <span className="card-title">Tools & Stack</span>
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
        <div className="grid grid-cols-2 gap-3">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="group flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-xl ${getToolColor(tool.purpose)} flex items-center justify-center font-bold text-sm`}>
                {tool.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium text-slate-800 truncate">{tool.name}</p>
                  <ExternalLink className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-slate-500 truncate">{tool.purpose}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Status */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">{tools.length} tools in stack</span>
            <button className="text-xs text-[#090C9B] font-medium hover:underline">
              Suggest integrations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}




