"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Building2, Calendar, DollarSign, Briefcase, GraduationCap, MoreHorizontal, Sparkles, RefreshCw, Edit3 } from "lucide-react";
import { Persona } from "@/lib/persona/types";

interface PersonaIdentityCardProps {
  persona: Persona;
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function PersonaIdentityCard({ persona, onEdit, onRegenerate }: PersonaIdentityCardProps) {
  return (
    <div className="elevated-card h-full">
      {/* Card Header */}
      <div className="card-header">
        <div className="flex items-center gap-3">
          <div className="card-icon">
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="card-title">Identity Profile</span>
        </div>
        <div className="flex items-center gap-1">
          <AIActionButton icon={<Edit3 className="w-3.5 h-3.5" />} label="Edit" onClick={onEdit} />
          <AIActionButton icon={<RefreshCw className="w-3.5 h-3.5" />} label="Regenerate" onClick={onRegenerate} />
          <AIActionButton icon={<Sparkles className="w-3.5 h-3.5" />} label="AI Refine" />
        </div>
      </div>

      {/* Card Content */}
      <div className="card-content">
        <div className="flex gap-6">
          {/* Avatar Section */}
          <div className="flex-shrink-0">
            <div className="relative">
              {persona.avatarUrl ? (
                <img
                  src={persona.avatarUrl}
                  alt={persona.name}
                  className="w-24 h-24 rounded-2xl object-cover shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#090C9B] to-[#1a1db8] flex items-center justify-center shadow-md">
                  <span className="text-2xl font-bold text-white">
                    {persona.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
              )}
              
              {/* Type Badge */}
              <div className={`absolute -bottom-2 -right-2 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm
                ${persona.type === "Primary" 
                  ? "bg-[#090C9B] text-white" 
                  : "bg-slate-100 text-slate-600 border border-slate-200"
                }`}
              >
                {persona.type}
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-slate-900 mb-1">{persona.name}</h3>
            <p className="text-sm text-slate-600 mb-4">{persona.role}</p>

            {/* Demographics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <InfoItem icon={<Building2 className="w-3.5 h-3.5" />} label="Company" value={persona.company || "N/A"} />
              <InfoItem icon={<MapPin className="w-3.5 h-3.5" />} label="Location" value={persona.location || "N/A"} />
              <InfoItem icon={<Calendar className="w-3.5 h-3.5" />} label="Age Range" value={persona.ageRange || `${persona.age}y`} />
              <InfoItem icon={<DollarSign className="w-3.5 h-3.5" />} label="Income" value={persona.incomeRange || "N/A"} />
              <InfoItem icon={<Briefcase className="w-3.5 h-3.5" />} label="Industry" value={persona.industry || "N/A"} />
              <InfoItem icon={<GraduationCap className="w-3.5 h-3.5" />} label="Experience" value={persona.experienceLevel} />
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-5 pt-5 border-t border-slate-100">
          <p className="text-sm text-slate-600 leading-relaxed">{persona.bio}</p>
        </div>

        {/* Quick Facts */}
        <div className="mt-4 flex flex-wrap gap-2">
          {persona.quickFacts.map((fact, index) => (
            <span
              key={index}
              className="pill"
            >
              {fact}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium text-slate-700 truncate capitalize">{value}</p>
      </div>
    </div>
  );
}

function AIActionButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="ai-action-btn"
      title={label}
    >
      {icon}
    </button>
  );
}




