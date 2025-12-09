"use client";

import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Brain } from "lucide-react";
import { SkillRating } from "@/lib/persona/types";
import { TileWrapper } from "./TileWrapper";

interface SkillsRadarTileProps {
  skills: SkillRating[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function SkillsRadarTile({ skills, onEdit, onRegenerate }: SkillsRadarTileProps) {
  const copyContent = () => {
    const text = skills.map(s => `${s.skill}: ${s.level}%`).join("\n");
    navigator.clipboard.writeText(text);
  };

  const chartData = skills.map(s => ({
    subject: s.skill,
    value: s.level,
    fullMark: 100,
  }));

  return (
    <TileWrapper
      title="Skillset"
      icon={<Brain className="w-4 h-4 text-slate-500" />}
      onEdit={onEdit}
      onRegenerate={onRegenerate}
      onCopy={copyContent}
    >
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid 
              stroke="#e2e8f0" 
              strokeWidth={1}
            />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ 
                fontSize: 10, 
                fill: "#64748b",
                fontWeight: 500 
              }}
              tickLine={false}
            />
            <Radar
              name="Skills"
              dataKey="value"
              stroke="#090C9B"
              fill="#090C9B"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mt-2 pt-3 border-t border-slate-100">
        {skills.slice(0, 3).map((skill) => (
          <div key={skill.skill} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-[#090C9B]" />
            <span className="text-slate-600">{skill.skill}</span>
            <span className="text-slate-400">{skill.level}%</span>
          </div>
        ))}
      </div>
    </TileWrapper>
  );
}
