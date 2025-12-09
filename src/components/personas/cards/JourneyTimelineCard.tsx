"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Route, Check, Circle, Clock, Sparkles, RefreshCw, Edit3, ChevronDown } from "lucide-react";
import { JourneyStep } from "@/lib/persona/types";

interface JourneyTimelineCardProps {
  journey: JourneyStep[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function JourneyTimelineCard({ journey, onEdit, onRegenerate }: JourneyTimelineCardProps) {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const getStatusConfig = (status: JourneyStep["status"]) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-emerald-500",
          ring: "",
          text: "text-emerald-600",
          icon: <Check className="w-4 h-4 text-white" />,
        };
      case "active":
        return {
          bg: "bg-[#090C9B]",
          ring: "ring-4 ring-[#090C9B]/20",
          text: "text-[#090C9B]",
          icon: <Circle className="w-3 h-3 text-white fill-white" />,
        };
      case "pending":
        return {
          bg: "bg-slate-200",
          ring: "",
          text: "text-slate-400",
          icon: <Clock className="w-4 h-4 text-slate-500" />,
        };
    }
  };

  return (
    <div className="elevated-card">
      {/* Card Header */}
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="card-icon">
            <Route className="w-4 h-4" />
          </div>
          <span className="card-title">Customer Journey</span>
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
        {/* Timeline */}
        <div className="journey-timeline">
          {journey.map((step, index) => {
            const config = getStatusConfig(step.status);
            const isSelected = selectedStage === step.id;

            return (
              <div
                key={step.id}
                className="journey-stage"
                onClick={() => setSelectedStage(isSelected ? null : step.id)}
              >
                {/* Connector */}
                {index < journey.length - 1 && (
                  <div
                    className={`journey-connector ${
                      step.status === "completed"
                        ? "bg-emerald-500"
                        : step.status === "active"
                        ? "bg-gradient-to-r from-[#090C9B] to-slate-200"
                        : "bg-slate-200"
                    }`}
                  />
                )}

                {/* Node */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`journey-node ${config.bg} ${config.ring} cursor-pointer`}
                >
                  {config.icon}
                </motion.div>

                {/* Label */}
                <p className={`journey-label ${config.text}`}>{step.title}</p>
                <p className="journey-status">{step.status}</p>

                {/* Expand indicator */}
                {step.note && (
                  <motion.div
                    animate={{ rotate: isSelected ? 180 : 0 }}
                    className="mt-1 text-slate-300"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Stage Details */}
        {selectedStage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-slate-100"
          >
            {journey
              .filter((step) => step.id === selectedStage)
              .map((step) => (
                <div key={step.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-800 mb-2">{step.title}</h4>
                  {step.note && <p className="text-sm text-slate-600">{step.note}</p>}
                  
                  {/* Stage Actions */}
                  <div className="mt-3 flex gap-2">
                    <button className="text-xs px-3 py-1.5 rounded-lg bg-[#090C9B]/5 text-[#090C9B] font-medium hover:bg-[#090C9B]/10 transition-colors">
                      View pain points
                    </button>
                    <button className="text-xs px-3 py-1.5 rounded-lg bg-[#FF6B35]/5 text-[#FF6B35] font-medium hover:bg-[#FF6B35]/10 transition-colors">
                      See opportunities
                    </button>
                  </div>
                </div>
              ))}
          </motion.div>
        )}

        {/* Progress Summary */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              {journey.filter((s) => s.status === "completed").length} of {journey.length} stages completed
            </span>
            <div className="flex gap-3">
              <span className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                Completed
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#090C9B]" />
                Active
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-300" />
                Pending
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




