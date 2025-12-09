"use client";

import React from "react";
import { Route, Check } from "lucide-react";
import { JourneyStep } from "@/lib/persona/types";
import { TileWrapper } from "./TileWrapper";

interface JourneyTileProps {
  journey: JourneyStep[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function JourneyTile({ journey, onEdit, onRegenerate }: JourneyTileProps) {
  const copyContent = () => {
    const text = journey
      .map((step, i) => `${i + 1}. ${step.title} (${step.status})${step.note ? `: ${step.note}` : ""}`)
      .join("\n");
    navigator.clipboard.writeText(text);
  };

  const getStatusStyles = (status: JourneyStep["status"]) => {
    switch (status) {
      case "completed":
        return { bg: "bg-emerald-500", ring: "", text: "text-emerald-600" };
      case "active":
        return { bg: "bg-[#090C9B]", ring: "ring-4 ring-[#090C9B]/20", text: "text-[#090C9B]" };
      case "pending":
        return { bg: "bg-slate-200", ring: "", text: "text-slate-400" };
    }
  };

  return (
    <TileWrapper
      title="Customer Journey"
      icon={<Route className="w-4 h-4 text-slate-500" />}
      onEdit={onEdit}
      onRegenerate={onRegenerate}
      onCopy={copyContent}
    >
      <div className="flex items-start justify-between overflow-x-auto pb-2 gap-2">
        {journey.map((step, index) => {
          const styles = getStatusStyles(step.status);
          return (
            <div
              key={step.id}
              className="flex flex-col items-center flex-1 min-w-[120px] relative group"
            >
              {/* Connection Line */}
              {index < journey.length - 1 && (
                <div
                  className={`absolute top-5 left-1/2 w-full h-0.5 ${
                    step.status === "completed" ? "bg-emerald-500" : 
                    step.status === "active" ? "bg-gradient-to-r from-[#090C9B] to-slate-200" : 
                    "bg-slate-200"
                  }`}
                />
              )}

              {/* Status Circle with Number */}
              <div
                className={`
                  relative z-10 w-10 h-10 rounded-full
                  flex items-center justify-center
                  text-sm font-bold text-white
                  ${styles.bg} ${styles.ring}
                `}
              >
                {step.status === "completed" ? (
                  <Check className="w-5 h-5" />
                ) : step.status === "pending" ? (
                  <span className="text-slate-500">{index + 1}</span>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Step Title */}
              <p className={`mt-3 text-xs font-medium text-center leading-tight ${styles.text}`}>
                {step.title}
              </p>
              <p className="text-[10px] text-slate-400 capitalize mt-0.5">
                {step.status}
              </p>

              {/* Tooltip */}
              {step.note && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none max-w-[180px] text-center whitespace-normal z-20 shadow-lg">
                  {step.note}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </TileWrapper>
  );
}
