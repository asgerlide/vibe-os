"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Download,
  ChevronRight,
  Zap,
  Target,
  Loader2,
  AlertCircle,
  User,
  Briefcase,
  MapPin,
  CheckCircle2,
  XCircle,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

import { useIdeaStore } from "@/lib/idea/store";
import { useMarketStore } from "@/lib/market/store";
import { usePersonaStore } from "@/lib/persona/store";
import { useOnboardingStore } from "@/lib/onboarding/store";
import { generatePersonasFromIdea } from "@/lib/ai/generation";
import { Persona } from "@/lib/persona/types";

export default function UserProfilesPage() {
  const router = useRouter();
  const { idea } = useIdeaStore();
  const { marketData } = useMarketStore();
  const { personas, upsertPersona, selectPersona, selectedPersonaId } = usePersonaStore();
  const { nextStep } = useOnboardingStore();

  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [generatedPersonas, setGeneratedPersonas] = useState<Persona[]>([]);

  const selectedPersona =
    generatedPersonas.find((p) => p.id === selectedPersonaId) ||
    generatedPersonas[0] ||
    null;

  // Auto-generate personas on mount if not already present
  useEffect(() => {
    if (idea && marketData && !isGenerating && !hasGenerated && generatedPersonas.length === 0) {
      generatePersonas();
    }
  }, [idea, marketData, isGenerating, hasGenerated, generatedPersonas.length]);

  const generatePersonas = async () => {
    if (!idea || !marketData) return;
    setIsGenerating(true);
    setHasGenerated(true);
    try {
      const newPersonas = await generatePersonasFromIdea(idea, marketData);
      setGeneratedPersonas(newPersonas);
      // Save to store
      newPersonas.forEach((p) => upsertPersona(p));
      if (newPersonas.length > 0) {
        selectPersona(newPersonas[0].id);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNext = () => {
    nextStep();
    router.push("/canvas/tech");
  };

  const handleBack = () => {
    router.push("/canvas/market");
  };

  const handleSelectPersona = (id: string) => {
    selectPersona(id);
  };

  // If no idea or market data, show error
  if (!idea || !marketData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Missing data</h2>
          <p className="text-slate-500 mb-6">
            Please complete the market analysis first.
          </p>
          <Link
            href="/canvas/market"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go to Market
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-black/5">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-500" />
              </button>

              <div>
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-0.5">
                  <span>Onboarding</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-slate-600 font-medium">User Personas</span>
                </div>
                <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
                  Target Users & Personas
                </h1>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-8 h-1 rounded-full bg-[#090C9B]" />
                <div className="w-8 h-1 rounded-full bg-[#090C9B]" />
                <div className="w-8 h-1 rounded-full bg-slate-200" />
              </div>
              <span className="text-sm text-slate-400 ml-2">2 of 3</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Idea Context Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{idea.ideaName}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{idea.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#090C9B] to-[#1a1db8] flex items-center justify-center mb-6">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Creating Personas...
              </h2>
              <p className="text-slate-500">
                AI is building user profiles based on your market analysis
              </p>
            </motion.div>
          ) : generatedPersonas.length > 0 ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Persona Selector */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {generatedPersonas.map((persona) => (
                  <motion.button
                    key={persona.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectPersona(persona.id)}
                    className={`flex-shrink-0 p-4 rounded-2xl border-2 transition-all ${
                      selectedPersona?.id === persona.id
                        ? "bg-white border-[#090C9B] shadow-lg shadow-[#090C9B]/10"
                        : "bg-white/50 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          persona.type === "Primary"
                            ? "bg-gradient-to-br from-[#090C9B] to-[#1a1db8]"
                            : "bg-gradient-to-br from-slate-400 to-slate-500"
                        }`}
                      >
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-slate-900">{persona.name}</p>
                        <p className="text-sm text-slate-500">{persona.type} Persona</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${persona.matchScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-600">
                        {persona.matchScore}%
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Selected Persona Details */}
              {selectedPersona && (
                <div className="space-y-6">
                  {/* Identity Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                          selectedPersona.type === "Primary"
                            ? "bg-gradient-to-br from-[#090C9B] to-[#1a1db8]"
                            : "bg-gradient-to-br from-slate-400 to-slate-500"
                        }`}
                      >
                        <User className="w-8 h-8 text-white" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-2xl font-bold text-slate-900">
                            {selectedPersona.name}
                          </h2>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              selectedPersona.type === "Primary"
                                ? "bg-[#090C9B]/10 text-[#090C9B]"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {selectedPersona.type}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {selectedPersona.role}
                          </span>
                          {selectedPersona.company && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {selectedPersona.company}
                            </span>
                          )}
                          {selectedPersona.age && (
                            <span>{selectedPersona.age} years old</span>
                          )}
                        </div>

                        <p className="text-slate-600 leading-relaxed">
                          {selectedPersona.bio}
                        </p>

                        {/* Quick Facts */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {selectedPersona.quickFacts.map((fact, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm"
                            >
                              {fact}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Match Score */}
                      <div className="text-center flex-shrink-0">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center border-4 border-green-200">
                          <span className="text-2xl font-bold text-green-600">
                            {selectedPersona.matchScore}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">Match Score</p>
                      </div>
                    </div>
                  </div>

                  {/* Goals, Pains & Solutions */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                        <Target className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                          Goals, Pains & Solutions
                        </h2>
                        <p className="text-sm text-slate-500">
                          What drives this persona and how you can help
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {selectedPersona.goalPainSolutions.map((gps, index) => (
                        <div
                          key={index}
                          className="p-4 bg-slate-50 rounded-xl border border-slate-100"
                        >
                          {/* Goal */}
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <Target className="w-3.5 h-3.5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-blue-600 uppercase mb-0.5">
                                Goal
                              </p>
                              <p className="font-medium text-slate-900">{gps.goal.text}</p>
                              {gps.goal.metric && (
                                <p className="text-sm text-slate-500">
                                  Metric: {gps.goal.metric}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Pain Points */}
                          <div className="flex items-start gap-3 mb-3 ml-3">
                            <div className="w-0.5 h-full bg-slate-200" />
                            <div className="flex-1">
                              <p className="text-xs font-medium text-red-600 uppercase mb-2">
                                Pain Points
                              </p>
                              <ul className="space-y-1">
                                {gps.painPoints.map((pain, pIndex) => (
                                  <li
                                    key={pIndex}
                                    className="flex items-start gap-2 text-sm"
                                  >
                                    <XCircle
                                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                        pain.severity === "high"
                                          ? "text-red-500"
                                          : pain.severity === "medium"
                                            ? "text-amber-500"
                                            : "text-slate-400"
                                      }`}
                                    />
                                    <span className="text-slate-600">{pain.text}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Solution */}
                          <div className="flex items-start gap-3 ml-3">
                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                              <Lightbulb className="w-3.5 h-3.5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-green-600 uppercase mb-0.5">
                                Solution
                              </p>
                              <p className="font-medium text-slate-900">{gps.solution.text}</p>
                              {gps.solution.feature && (
                                <p className="text-sm text-slate-500">
                                  Feature: {gps.solution.feature}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Behaviors & Tools */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Behaviors */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-slate-900">
                            Behaviors
                          </h2>
                        </div>
                      </div>

                      <ul className="space-y-2">
                        {selectedPersona.behaviors.map((behavior, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2 className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-600">{behavior}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tools */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-slate-900">
                            Tools & Environment
                          </h2>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {selectedPersona.tools.map((tool, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                          >
                            <span className="font-medium text-slate-900">
                              {tool.name}
                            </span>
                            <span className="text-sm text-slate-500">
                              {tool.purpose}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Footer with Next button */}
      {generatedPersonas.length > 0 && !isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 py-4"
        >
          <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Review your user personas. You can add more detail later.
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#090C9B] text-white rounded-xl font-medium hover:bg-[#0a0eb0] transition-colors shadow-lg shadow-[#090C9B]/20"
            >
              Next: Tech Stack
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
