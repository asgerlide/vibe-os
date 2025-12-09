"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Loader2, X } from "lucide-react";
import { Persona } from "@/lib/persona/types";
import { PersonaInsightsGrid } from "./PersonaInsightsGrid";

type DropzoneState = "idle" | "dragOver" | "analyzing" | "showingGrid";

interface AnalyzeDropzoneProps {
  selectedPersona: Persona | null;
  isAnalyzing?: boolean;
  onEditSection?: (sectionKey: string) => void;
  onRegenerateSection?: (sectionKey: string) => void;
  onClearSelection?: () => void;
}

export function AnalyzeDropzone({
  selectedPersona,
  isAnalyzing = false,
  onEditSection,
  onRegenerateSection,
  onClearSelection,
}: AnalyzeDropzoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "analyze-dropzone",
  });

  const getState = (): DropzoneState => {
    if (isAnalyzing) return "analyzing";
    if (selectedPersona) return "showingGrid";
    if (isOver) return "dragOver";
    return "idle";
  };

  const state = getState();

  return (
    <div
      ref={setNodeRef}
      role="region"
      aria-label="Analyze workspace drop zone"
      aria-live="polite"
      className="w-full"
    >
      <AnimatePresence mode="wait">
        {state === "showingGrid" && selectedPersona ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Analyzed Profile Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
                  Analyzed Profile
                </p>
                <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">
                  {selectedPersona.name}
                  <span className="text-slate-400 font-normal ml-2">/</span>
                  <span className="text-slate-500 font-normal ml-2">{selectedPersona.role}</span>
                </h2>
              </div>
              
              <button
                onClick={onClearSelection}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close analysis"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <PersonaInsightsGrid
              persona={selectedPersona}
              onEditSection={onEditSection}
              onRegenerateSection={onRegenerateSection}
            />
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`
              rounded-2xl bg-slate-50/50 border-2 border-dashed
              min-h-[300px] flex flex-col items-center justify-center
              transition-all duration-300 ease-out
              ${state === "dragOver" 
                ? "border-[#090C9B] bg-[#090C9B]/5" 
                : "border-slate-200"
              }
              ${state === "analyzing" ? "bg-white" : ""}
            `}
          >
            {state === "analyzing" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#090C9B]/10 flex items-center justify-center">
                  <Loader2 className="w-7 h-7 text-[#090C9B] animate-spin" />
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold text-slate-800">
                    Analyzing persona...
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Generating insights
                  </p>
                </div>
              </motion.div>
            ) : (
              <>
                <motion.div
                  animate={state === "dragOver" ? { scale: 1.05 } : { scale: 1 }}
                  className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center mb-4
                    ${state === "dragOver" ? "bg-[#090C9B]/10" : "bg-slate-100"}
                  `}
                >
                  <Target 
                    className={`w-7 h-7 ${state === "dragOver" ? "text-[#090C9B]" : "text-slate-400"}`}
                  />
                </motion.div>
                
                <p className={`text-base font-medium ${state === "dragOver" ? "text-[#090C9B]" : "text-slate-500"}`}>
                  {state === "dragOver" ? "Drop to analyze" : "Drag a persona here to analyze"}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  View goals, pain points, and solutions
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
