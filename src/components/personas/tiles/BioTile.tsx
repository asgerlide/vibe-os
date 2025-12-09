"use client";

import React from "react";
import { User, MapPin, Building2 } from "lucide-react";
import { Persona } from "@/lib/persona/types";
import { TileWrapper } from "./TileWrapper";

interface BioTileProps {
  persona: Persona;
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function BioTile({ persona, onEdit, onRegenerate }: BioTileProps) {
  const copyContent = () => {
    const text = `${persona.name}\n${persona.role}\n${persona.company || ""}\n\n${persona.bio}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <TileWrapper
      title="Bio"
      icon={<User className="w-4 h-4 text-slate-500" />}
      onEdit={onEdit}
      onRegenerate={onRegenerate}
      onCopy={copyContent}
      className="h-full"
    >
      <div className="space-y-4">
        {/* Avatar & Basic Info */}
        <div className="flex gap-4">
          {persona.avatarUrl ? (
            <img
              src={persona.avatarUrl}
              alt={persona.name}
              className="w-16 h-16 rounded-2xl bg-slate-100 flex-shrink-0 object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#090C9B] to-[#1a1db8] flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-semibold text-white">
                {persona.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 mb-0.5">
              {persona.name}
            </h3>
            <p className="text-sm text-slate-600 mb-2">{persona.role}</p>
            
            <div className="flex flex-wrap gap-3 text-xs text-slate-500">
              {persona.company && (
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {persona.company}
                </span>
              )}
              {persona.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {persona.location}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-slate-600 leading-relaxed">
          {persona.bio}
        </p>

        {/* Quick Facts as inline pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          {persona.quickFacts.map((fact, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium text-slate-600 bg-slate-50 rounded-md border border-slate-100"
            >
              {fact}
            </span>
          ))}
          <span className="px-2 py-1 text-xs font-medium text-[#090C9B] bg-[#090C9B]/5 rounded-md border border-[#090C9B]/10 capitalize">
            {persona.experienceLevel}
          </span>
        </div>
      </div>
    </TileWrapper>
  );
}
