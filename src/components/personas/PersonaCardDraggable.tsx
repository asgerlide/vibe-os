"use client";

import React, { useRef } from "react";
import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { Sparkles, DollarSign, Calendar, BadgeCheck, GripVertical } from "lucide-react";
import { Persona } from "@/lib/persona/types";

interface PersonaCardDraggableProps {
  persona: Persona;
  onSelect?: () => void;
  isSelected?: boolean;
}

export function PersonaCardDraggable({
  persona,
  onSelect,
  isSelected,
}: PersonaCardDraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: persona.id,
    data: { persona },
  });
  
  const hasDraggedRef = useRef(false);

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: isDragging ? 50 : undefined,
      }
    : undefined;
    
  // Track if we've started dragging
  if (isDragging) {
    hasDraggedRef.current = true;
  }

  const handleClick = () => {
    // Only fire click if we haven't dragged
    if (!hasDraggedRef.current) {
      onSelect?.();
    }
    // Reset for next interaction
    hasDraggedRef.current = false;
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onClick={handleClick}
      className={`
        persona-card flex flex-col w-[200px] flex-shrink-0
        ${isDragging ? "opacity-90 shadow-2xl scale-105 rotate-2" : ""}
        ${isSelected ? "selected" : ""}
      `}
      aria-label={`${persona.name}, ${persona.role}. Press Enter to select or drag to analyze.`}
      aria-roledescription="draggable persona card"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.();
        }
      }}
      {...attributes}
      {...listeners}
    >
      {/* Grab Handle */}
      <div className="grab-handle">
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 mb-3">
        {persona.avatarUrl ? (
          <img
            src={persona.avatarUrl}
            alt={persona.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#090C9B] to-[#1a1db8] flex items-center justify-center">
            <span className="text-4xl font-bold text-white/90">
              {persona.name.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
        )}
        
        {/* Type Badge */}
        {persona.type === "Primary" && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#090C9B] text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
            Primary
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-1">
        {/* Name with verified badge */}
        <div className="flex items-center gap-1.5 mb-0.5">
          <h3 className="text-base font-semibold text-slate-900 truncate">
            {persona.name}
          </h3>
          <BadgeCheck className="w-4 h-4 text-[#FF6B35] flex-shrink-0" />
        </div>
        
        {/* Role */}
        <p className="text-sm text-slate-500 mb-3 line-clamp-2 leading-snug">
          {persona.role}{persona.company ? ` at ${persona.company}` : ""}
        </p>

        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{persona.ageRange || `${persona.age}y`}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" />
            <span>{persona.incomeRange || "N/A"}</span>
          </div>
        </div>

        {/* Match Score */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-400">Match</span>
          <div className="flex items-center gap-1.5">
            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FF6B35] rounded-full transition-all duration-500"
                style={{ width: `${persona.matchScore}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-700">{persona.matchScore}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Professional placeholder for "Generate New Persona"
export function GeneratePersonaCard({ onClick }: { onClick?: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(9,12,155,0.15)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onClick={onClick}
      className="
        flex flex-col items-center justify-center
        w-[200px] h-[340px] flex-shrink-0
        bg-white rounded-[20px] p-4
        border-2 border-dashed border-slate-200
        hover:border-[#090C9B] hover:bg-[#090C9B]/5
        transition-all duration-200 cursor-pointer
        group
      "
      aria-label="Generate new persona with AI"
    >
      <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:bg-[#090C9B]/10 group-hover:border-[#090C9B]/20 transition-all">
        <Sparkles className="w-8 h-8 text-slate-300 group-hover:text-[#090C9B] transition-colors" />
      </div>
      <p className="text-sm font-semibold text-slate-600 group-hover:text-[#090C9B] transition-colors">Generate</p>
      <p className="text-xs text-slate-400 mt-0.5">AI Persona</p>
    </motion.button>
  );
}
