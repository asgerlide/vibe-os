"use client";

import React from "react";
import { User, Briefcase, Building2, Cpu, Users } from "lucide-react";
import { PersonaCard } from "./PersonaCard";
import { Persona } from "@/types/personas";
import { motion } from "framer-motion";

interface ProfileCardProps {
    persona: Persona;
    isPrimary: boolean;
    onEdit: () => void;
    onRegenerate: () => void;
}

export function ProfileCard({ persona, isPrimary, onEdit, onRegenerate }: ProfileCardProps) {
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const getProficiencyColor = (level?: string) => {
        switch (level) {
            case "expert": return "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30";
            case "advanced": return "bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30";
            case "intermediate": return "bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/30";
            case "beginner": return "bg-zinc-500/20 text-zinc-700 dark:text-zinc-400 border-zinc-500/30";
            default: return "bg-zinc-500/20 text-zinc-700 dark:text-zinc-400 border-zinc-500/30";
        }
    };

    return (
        <PersonaCard
            onEdit={onEdit}
            onRegenerate={onRegenerate}
            className="flex-shrink-0"
        >
            {/* Avatar & Name */}
            <div className="flex items-center gap-4 mb-6">
                <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white ${
                    isPrimary 
                        ? 'bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30' 
                        : 'bg-gradient-to-br from-zinc-500 to-zinc-600 shadow-lg shadow-zinc-500/30'
                }`}>
                    {persona.avatar || getInitials(persona.name)}
                    {isPrimary && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                            <span className="text-[10px] font-bold text-white">P</span>
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1 truncate">
                        {persona.name}
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">
                        {persona.role}
                    </p>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 p-2 bg-zinc-50/50 dark:bg-zinc-800/30 rounded-xl">
                    <User className="w-4 h-4 text-zinc-500" />
                    <div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Age</p>
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{persona.age}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-zinc-50/50 dark:bg-zinc-800/30 rounded-xl">
                    <Briefcase className="w-4 h-4 text-zinc-500" />
                    <div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Industry</p>
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{persona.occupation}</p>
                    </div>
                </div>
                {persona.professional?.companySize && (
                    <div className="flex items-center gap-2 p-2 bg-zinc-50/50 dark:bg-zinc-800/30 rounded-xl">
                        <Building2 className="w-4 h-4 text-zinc-500" />
                        <div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">Company</p>
                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{persona.professional.companySize}</p>
                        </div>
                    </div>
                )}
                {persona.technicalProficiency && (
                    <div className="flex items-center gap-2 p-2 bg-zinc-50/50 dark:bg-zinc-800/30 rounded-xl">
                        <Cpu className="w-4 h-4 text-zinc-500" />
                        <div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">Tech Level</p>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${getProficiencyColor(persona.technicalProficiency)}`}>
                                {persona.technicalProficiency}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Quote */}
            {persona.quote && (
                <div className="mt-4 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                    <p className="text-sm italic text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        "{persona.quote}"
                    </p>
                </div>
            )}
        </PersonaCard>
    );
}






