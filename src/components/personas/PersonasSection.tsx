"use client";

import React from "react";
import { User, Briefcase, Target, Quote, FileText, Cpu } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { EditableField } from "./EditableField";
import { Persona } from "@/types/personas";

interface PersonasSectionProps {
    primaryPersona: Persona;
    secondaryPersona: Persona;
    onUpdatePrimary: (updates: Partial<Persona>) => void;
    onUpdateSecondary: (updates: Partial<Persona>) => void;
}

export function PersonasSection({
    primaryPersona,
    secondaryPersona,
    onUpdatePrimary,
    onUpdateSecondary,
}: PersonasSectionProps) {
    const PersonaCard = ({ persona, isPrimary, onUpdate }: { persona: Persona; isPrimary: boolean; onUpdate: (updates: Partial<Persona>) => void }) => (
        <div className={`flex-1 min-w-0 p-5 rounded-lg border ${isPrimary
            ? 'bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900'
            : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700'
            }`}>
            {/* Quote */}
            <div className="mb-4 p-3 bg-white/60 dark:bg-zinc-900/60 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-start gap-2">
                    <Quote className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <EditableField
                        value={persona.quote || ""}
                        onSave={(value) => onUpdate({ quote: String(value ?? "") })}
                        multiline
                        placeholder="A quote that captures their attitude..."
                        className="flex-1 text-sm italic"
                    />
                </div>
            </div>

            {/* Avatar and Name */}
            <div className="flex items-start gap-3 mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-xl ${isPrimary
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600'
                    : 'bg-gradient-to-br from-zinc-500 to-zinc-600'
                    }`}>
                    {persona.avatar || persona.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <EditableField
                            value={persona.name}
                            onSave={(value) => onUpdate({ name: String(value ?? "") })}
                            className="flex-1 font-semibold text-lg"
                        />
                        {isPrimary && (
                            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-orange-500 text-white rounded">
                                Primary
                            </span>
                        )}
                    </div>
                    <EditableField
                        value={persona.role}
                        onSave={(value) => onUpdate({ role: String(value ?? "") })}
                        className="text-sm text-zinc-600 dark:text-zinc-400"
                    />
                </div>
            </div>

            {/* Background */}
            <div className="mb-4">
                <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-zinc-400 mt-1 flex-shrink-0" />
                    <EditableField
                        value={persona.background || ""}
                        onSave={(value) => onUpdate({ background: String(value ?? "") })}
                        multiline
                        placeholder="Background and context about this persona..."
                        className="flex-1 text-sm"
                    />
                </div>
            </div>

            {/* Demographics */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-zinc-400" />
                    <EditableField
                        value={persona.age}
                        onSave={(value) => onUpdate({ age: Number(value ?? 0) })}
                        type="number"
                        label="Age"
                    />
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4 text-zinc-400" />
                    <EditableField
                        value={persona.occupation}
                        onSave={(value) => onUpdate({ occupation: String(value ?? "") })}
                        label="Occupation"
                    />
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Cpu className="w-4 h-4 text-zinc-400" />
                    <div className="flex-1">
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 mr-2">Tech Level:</span>
                        <select
                            value={persona.technicalProficiency || "intermediate"}
                            onChange={(e) => onUpdate({ technicalProficiency: e.target.value as Persona['technicalProficiency'] })}
                            className="text-sm px-2 py-1 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800"
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Goal */}
            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1 block">Primary Goal</span>
                        <EditableField
                            value={persona.goal}
                            onSave={(value) => onUpdate({ goal: String(value ?? "") })}
                            multiline
                            placeholder="What is their main goal?"
                            className="flex-1"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <SectionCard
            title="Personas"
            description="Define your primary and secondary user personas"
        >
            <div className="flex gap-4">
                <PersonaCard
                    persona={primaryPersona}
                    isPrimary={true}
                    onUpdate={onUpdatePrimary}
                />
                <PersonaCard
                    persona={secondaryPersona}
                    isPrimary={false}
                    onUpdate={onUpdateSecondary}
                />
            </div>
        </SectionCard>
    );
}

