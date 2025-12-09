"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { SectionCard } from "./SectionCard";
import { EditableField } from "./EditableField";
import { Persona } from "@/types/personas";
import { GraduationCap, DollarSign, MapPin } from "lucide-react";

interface DemographicsSectionProps {
    primaryPersona: Persona;
    secondaryPersona: Persona;
    onUpdatePrimary: (updates: Partial<Persona>) => void;
    onUpdateSecondary: (updates: Partial<Persona>) => void;
}

export function DemographicsSection({ primaryPersona, secondaryPersona, onUpdatePrimary, onUpdateSecondary }: DemographicsSectionProps) {
    // Age distribution data
    const ageData = [
        { name: primaryPersona.name, age: primaryPersona.age },
        { name: secondaryPersona.name, age: secondaryPersona.age },
    ];

    // Role distribution
    const roleData = [
        { name: primaryPersona.role, value: 1 },
        { name: secondaryPersona.role, value: 1 },
    ];

    const COLORS = ['#f97316', '#71717a'];

    const PersonaDetails = ({ persona, isPrimary, onUpdate }: { persona: Persona; isPrimary: boolean; onUpdate: (updates: Partial<Persona>) => void }) => (
        <div className={`p-4 rounded-lg border ${isPrimary
            ? 'bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900'
            : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700'
            }`}>
            <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-3">{persona.name}</h4>
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-zinc-400" />
                    <EditableField
                        value={persona.demographics?.location || persona.location || ""}
                        onSave={(value) => onUpdate({
                            demographics: {
                                ...persona.demographics,
                                location: value,
                            },
                            location: value,
                        })}
                        placeholder="Location..."
                        className="flex-1"
                    />
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="w-4 h-4 text-zinc-400" />
                    <EditableField
                        value={persona.demographics?.education || ""}
                        onSave={(value) => onUpdate({
                            demographics: {
                                ...persona.demographics,
                                education: value,
                            },
                        })}
                        placeholder="Education level..."
                        className="flex-1"
                    />
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-zinc-400" />
                    <EditableField
                        value={persona.demographics?.income || ""}
                        onSave={(value) => onUpdate({
                            demographics: {
                                ...persona.demographics,
                                income: value,
                            },
                        })}
                        placeholder="Income range..."
                        className="flex-1"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <SectionCard
            title="Demographics"
            description="Visual breakdown and detailed demographic information"
        >
            <div className="space-y-6">
                {/* Age Distribution */}
                <div>
                    <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Age Distribution</h4>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={ageData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                            <XAxis dataKey="name" stroke="#71717a" />
                            <YAxis stroke="#71717a" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e4e4e7',
                                    borderRadius: '8px',
                                }}
                            />
                            <Bar dataKey="age" fill="#f97316" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Role Distribution */}
                <div>
                    <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Role Distribution</h4>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={roleData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {roleData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Detailed Demographics */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
                    <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Additional Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <PersonaDetails
                            persona={primaryPersona}
                            isPrimary={true}
                            onUpdate={onUpdatePrimary}
                        />
                        <PersonaDetails
                            persona={secondaryPersona}
                            isPrimary={false}
                            onUpdate={onUpdateSecondary}
                        />
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                    <div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Average Age</p>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                            {Math.round((primaryPersona.age + secondaryPersona.age) / 2)}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Total Personas</p>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">2</p>
                    </div>
                </div>
            </div>
        </SectionCard>
    );
}

