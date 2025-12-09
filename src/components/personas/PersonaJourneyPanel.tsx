"use client";

import React from "react";
import { Check, Calendar, FileText, Target, AlertCircle, Sparkles, Zap, TrendingUp, Palette, MapPin, Download } from "lucide-react";
import { Persona, PainPoint, JTBD } from "@/types/personas";
import { motion } from "framer-motion";

interface PersonaJourneyPanelProps {
    persona: Persona;
    painPoints: PainPoint[];
    jtbds: JTBD[];
    isPrimary: boolean;
}

const opportunityCards = [
    {
        id: "blueprint",
        title: "Generate product blueprint",
        icon: Target,
        color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-700 dark:text-blue-400",
        isHighlight: false,
    },
    {
        id: "value-prop",
        title: "Define value proposition",
        icon: TrendingUp,
        color: "from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-700 dark:text-purple-400",
        isHighlight: false,
    },
    {
        id: "ux-direction",
        title: "Craft UX direction",
        icon: Palette,
        color: "from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-700 dark:text-pink-400",
        isHighlight: false,
    },
    {
        id: "competitors",
        title: "Map competitors",
        icon: MapPin,
        color: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-700 dark:text-amber-400",
        isHighlight: false,
    },
    {
        id: "export",
        title: "Export .md specification",
        icon: Download,
        color: "from-zinc-900 to-zinc-800 border-zinc-700 text-white",
        isHighlight: true,
    },
];

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "high":
            return "bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30";
        case "medium":
            return "bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30";
        case "low":
            return "bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30";
        default:
            return "bg-zinc-500/20 text-zinc-700 dark:text-zinc-400 border-zinc-500/30";
    }
};

export function PersonaJourneyPanel({ persona, painPoints, jtbds, isPrimary }: PersonaJourneyPanelProps) {
    return (
        <div className="w-full bg-gradient-to-br from-zinc-50 via-blue-50/30 to-cyan-50/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 rounded-[28px] p-6 overflow-x-auto">
            <div className="inline-flex gap-6 min-w-max">
                {/* Column 1: Persona Snapshot */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-shrink-0 w-[280px]"
                >
                    <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-[28px] border border-white/50 dark:border-zinc-800/50 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6">
                        {/* Avatar */}
                        <div className="flex justify-center mb-4">
                            <div className={`relative w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white ${
                                isPrimary 
                                    ? 'bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30' 
                                    : 'bg-gradient-to-br from-zinc-500 to-zinc-600 shadow-lg shadow-zinc-500/30'
                            }`}>
                                {persona.avatar || getInitials(persona.name)}
                                {isPrimary && (
                                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center border-4 border-white dark:border-zinc-900">
                                        <span className="text-xs font-bold text-white">P</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Name & Role */}
                        <div className="text-center mb-4">
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                                {persona.name}
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                                {persona.role}
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-500">
                                {persona.occupation} • Age {persona.age}
                            </p>
                        </div>

                        {/* Persona Type Badge */}
                        <div className="flex justify-center mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                isPrimary
                                    ? 'bg-orange-500/20 text-orange-700 dark:text-orange-400 border border-orange-500/30'
                                    : 'bg-zinc-500/20 text-zinc-700 dark:text-zinc-400 border border-zinc-500/30'
                            }`}>
                                {isPrimary ? 'Primary' : 'Secondary'} Persona
                            </span>
                        </div>

                        {/* Quick Facts */}
                        <div className="space-y-2 mb-4">
                            {persona.technicalProficiency && (
                                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                                    <Zap className="w-3.5 h-3.5" />
                                    <span>Tech Level: {persona.technicalProficiency}</span>
                                </div>
                            )}
                            {persona.professional?.companySize && (
                                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                                    <TrendingUp className="w-3.5 h-3.5" />
                                    <span>{persona.professional.companySize}</span>
                                </div>
                            )}
                            {persona.demographics?.location && (
                                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span>{persona.demographics.location}</span>
                                </div>
                            )}
                        </div>

                        {/* Motivational Tagline */}
                        {persona.quote && (
                            <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                                <p className="text-sm italic text-zinc-600 dark:text-zinc-400 text-center leading-relaxed">
                                    "{persona.quote}"
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Connector Line */}
                <div className="flex items-center justify-center flex-shrink-0 w-8">
                    <div className="w-0.5 h-full bg-gradient-to-b from-blue-400/50 via-cyan-400/50 to-transparent" style={{ minHeight: '400px' }} />
                </div>

                {/* Column 2: Jobs to Be Done */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex-shrink-0 w-[300px]"
                >
                    <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-[28px] border border-white/50 dark:border-zinc-800/50 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6">
                        <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4 uppercase tracking-wider">
                            Jobs to Be Done
                        </h3>
                        <div className="space-y-3">
                            {jtbds.slice(0, 5).map((jtbd, index) => (
                                <motion.div
                                    key={jtbd.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="relative"
                                >
                                    {/* Connector Line */}
                                    {index < jtbds.length - 1 && (
                                        <div className="absolute left-4 top-12 w-0.5 h-6 bg-gradient-to-b from-blue-400/40 to-transparent" />
                                    )}
                                    
                                    <div className="flex items-start gap-3 p-3 bg-zinc-50/50 dark:bg-zinc-800/30 rounded-xl hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors">
                                        {/* Avatar/Icon */}
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                                            <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                                    {jtbd.statement.split('I want to')[1]?.split(',')[0]?.trim() || 
                                                     jtbd.statement.split('so I can')[0]?.replace('When ', '').trim() || 
                                                     'Complete job'}
                                                </h4>
                                                <div className="flex items-center gap-1 flex-shrink-0">
                                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                                                </div>
                                            </div>
                                            <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                                                {jtbd.statement}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Connector Line */}
                <div className="flex items-center justify-center flex-shrink-0 w-8">
                    <div className="w-0.5 h-full bg-gradient-to-b from-cyan-400/50 via-pink-400/50 to-transparent" style={{ minHeight: '400px' }} />
                </div>

                {/* Column 3: Pain Points */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex-shrink-0 w-[300px]"
                >
                    <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-[28px] border border-white/50 dark:border-zinc-800/50 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6">
                        <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4 uppercase tracking-wider">
                            Pain Points
                        </h3>
                        <div className="space-y-3">
                            {painPoints.map((pp, index) => (
                                <motion.div
                                    key={pp.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="relative"
                                >
                                    {/* Connector Line */}
                                    {index < painPoints.length - 1 && (
                                        <div className="absolute left-4 top-14 w-0.5 h-6 bg-gradient-to-b from-pink-400/40 to-transparent" />
                                    )}
                                    
                                    <div className="flex items-start gap-3 p-3 bg-zinc-50/50 dark:bg-zinc-800/30 rounded-xl hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors">
                                        {/* Avatar/Icon */}
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500/20 to-rose-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                                            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <p className="text-sm text-zinc-900 dark:text-zinc-100 flex-1">
                                                    {pp.description}
                                                </p>
                                                <div className="flex items-center gap-1 flex-shrink-0">
                                                    <FileText className="w-3.5 h-3.5 text-zinc-400" />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${getPriorityColor(pp.priority)}`}>
                                                    {pp.priority}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Connector Line */}
                <div className="flex items-center justify-center flex-shrink-0 w-8">
                    <div className="w-0.5 h-full bg-gradient-to-b from-pink-400/50 via-orange-400/50 to-transparent" style={{ minHeight: '400px' }} />
                </div>

                {/* Column 4: VibeOS Opportunities */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex-shrink-0 w-[320px]"
                >
                    <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-[28px] border border-white/50 dark:border-zinc-800/50 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6">
                        <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-4 uppercase tracking-wider">
                            VibeOS Opportunities
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {opportunityCards.map((card, index) => {
                                const Icon = card.icon;
                                return (
                                    <motion.div
                                        key={card.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className={`p-4 rounded-2xl border backdrop-blur-sm ${
                                            card.isHighlight
                                                ? 'bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 text-white shadow-lg'
                                                : `bg-gradient-to-br ${card.color} border`
                                        } hover:scale-105 transition-transform cursor-pointer`}
                                    >
                                        <div className="flex flex-col items-center text-center gap-2">
                                            <div className={`p-2 rounded-xl ${
                                                card.isHighlight
                                                    ? 'bg-white/10'
                                                    : 'bg-white/50 dark:bg-zinc-800/50'
                                            }`}>
                                                <Icon className={`w-5 h-5 ${
                                                    card.isHighlight ? 'text-white' : ''
                                                }`} />
                                            </div>
                                            <p className={`text-xs font-medium leading-tight ${
                                                card.isHighlight ? 'text-white' : ''
                                            }`}>
                                                {card.title}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

