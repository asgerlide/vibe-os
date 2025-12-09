"use client";

import React from "react";
import { Heart, Sparkles, RefreshCw, Edit3 } from "lucide-react";
import { Persona } from "@/lib/persona/types";

interface EmotionalMapCardProps {
  persona: Persona;
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function EmotionalMapCard({ persona, onEdit, onRegenerate }: EmotionalMapCardProps) {
  // Mock emotional data - in a real app, this would come from persona analysis
  const emotionalQuadrants = [
    { 
      label: "Excited", 
      emoji: "🤩", 
      description: "When discovering new solutions",
      energy: "high",
      valence: "positive"
    },
    { 
      label: "Frustrated", 
      emoji: "😤", 
      description: "With complex workflows",
      energy: "high",
      valence: "negative"
    },
    { 
      label: "Satisfied", 
      emoji: "😌", 
      description: "After successful delivery",
      energy: "low",
      valence: "positive"
    },
    { 
      label: "Overwhelmed", 
      emoji: "😩", 
      description: "During peak deadlines",
      energy: "low",
      valence: "negative"
    },
  ];

  return (
    <div className="elevated-card h-full">
      {/* Card Header */}
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="card-icon">
            <Heart className="w-4 h-4" />
          </div>
          <span className="card-title">Emotional Map</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onEdit} className="ai-action-btn" title="Edit">
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button onClick={onRegenerate} className="ai-action-btn" title="Regenerate">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="card-content">
        {/* 2x2 Emotional Grid */}
        <div className="emotional-grid">
          {emotionalQuadrants.map((quadrant, index) => (
            <div
              key={index}
              className={`emotional-quadrant ${
                quadrant.valence === "positive" 
                  ? "hover:bg-emerald-50" 
                  : "hover:bg-red-50"
              }`}
            >
              <span className="emotional-icon">{quadrant.emoji}</span>
              <p className={`text-sm font-semibold ${
                quadrant.valence === "positive" ? "text-emerald-700" : "text-red-700"
              }`}>
                {quadrant.label}
              </p>
              <p className="emotional-label mt-1">{quadrant.description}</p>
            </div>
          ))}
        </div>

        {/* Axis Labels */}
        <div className="mt-4 flex justify-between text-[10px] text-slate-400 uppercase tracking-wider">
          <span>← Low Energy</span>
          <span>High Energy →</span>
        </div>

        {/* Legend */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            Positive
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            Negative
          </span>
        </div>
      </div>
    </div>
  );
}




