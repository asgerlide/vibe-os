"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { Target, Users, Sparkles } from "lucide-react";

interface WorkspaceDropzoneProps {
  isOver: boolean;
}

export function WorkspaceDropzone({ isOver }: WorkspaceDropzoneProps) {
  const { setNodeRef } = useDroppable({
    id: "workspace-dropzone",
  });

  return (
    <motion.div
      ref={setNodeRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`
        relative min-h-[400px] rounded-3xl border-2 border-dashed
        flex flex-col items-center justify-center text-center
        transition-all duration-300 ease-out
        ${isOver 
          ? "border-[#090C9B] bg-[#090C9B]/5 shadow-[inset_0_0_0_2px_rgba(9,12,155,0.1),0_0_40px_-10px_rgba(9,12,155,0.2)]" 
          : "border-slate-200 bg-slate-50/50"
        }
      `}
      role="region"
      aria-label="Drop persona here to analyze"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-8 left-8 w-16 h-16 rounded-2xl border border-slate-200/50" />
        <div className="absolute top-16 right-12 w-12 h-12 rounded-xl border border-slate-200/50" />
        <div className="absolute bottom-12 left-16 w-20 h-20 rounded-3xl border border-slate-200/50" />
        <div className="absolute bottom-8 right-8 w-14 h-14 rounded-2xl border border-slate-200/50" />
      </div>

      {/* Main Content */}
      <motion.div
        animate={isOver ? { scale: 1.05, y: -5 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`
          w-20 h-20 rounded-3xl flex items-center justify-center mb-6
          shadow-lg transition-all duration-300
          ${isOver 
            ? "bg-gradient-to-br from-[#090C9B] to-[#1a1db8] shadow-[0_8px_30px_-5px_rgba(9,12,155,0.4)]" 
            : "bg-white"
          }
        `}
      >
        <Target className={`w-9 h-9 ${isOver ? "text-white" : "text-slate-400"}`} />
      </motion.div>

      <motion.h3
        animate={isOver ? { scale: 1.02 } : { scale: 1 }}
        className={`text-xl font-semibold mb-2 ${isOver ? "text-[#090C9B]" : "text-slate-700"}`}
      >
        {isOver ? "Drop to Analyze Persona" : "Drag a Persona to Analyze"}
      </motion.h3>

      <p className="text-sm text-slate-500 max-w-sm mb-8">
        Select a persona card from above or drag it here to explore detailed insights,
        goals, pain points, and opportunities
      </p>

      {/* Quick Tips */}
      <div className="flex items-center gap-6 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>Click to select</span>
        </div>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          <span>Drag to drop</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Press ↵ to activate</span>
        </div>
      </div>

      {/* Decorative Glow when active */}
      {isOver && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(9, 12, 155, 0.08) 0%, transparent 70%)"
          }}
        />
      )}
    </motion.div>
  );
}




