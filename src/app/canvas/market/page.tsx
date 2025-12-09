"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Users,
  Target,
  Sparkles,
  Loader2,
  Building2,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

import { useIdeaStore } from "@/lib/idea/store";
import { useMarketStore } from "@/lib/market/store";
import { useOnboardingStore } from "@/lib/onboarding/store";
import { generateMarketFromIdea } from "@/lib/ai/generation";

export default function MarketPage() {
  const router = useRouter();
  const { idea } = useIdeaStore();
  const { marketData, setMarketData, isGenerating, setIsGenerating } = useMarketStore();
  const { nextStep } = useOnboardingStore();
  const [hasGenerated, setHasGenerated] = useState(false);

  // Auto-generate market data on mount if not already present
  useEffect(() => {
    if (!marketData && idea && !isGenerating && !hasGenerated) {
      generateMarket();
    }
  }, [idea, marketData, isGenerating, hasGenerated]);

  const generateMarket = async () => {
    if (!idea) return;
    setIsGenerating(true);
    setHasGenerated(true);
    try {
      const data = await generateMarketFromIdea(idea);
      setMarketData(data);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNext = () => {
    nextStep();
    router.push("/canvas/UserProfiles");
  };

  // If no idea, redirect to canvas
  if (!idea) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">No idea found</h2>
          <p className="text-slate-500 mb-6">Please start by creating your idea first.</p>
          <Link
            href="/canvas"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go to Canvas
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
              <Link
                href="/canvas"
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-500" />
              </Link>

              <div>
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-0.5">
                  <span>Onboarding</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-slate-600 font-medium">Market Analysis</span>
                </div>
                <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
                  Market & Competitors
                </h1>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-8 h-1 rounded-full bg-[#090C9B]" />
                <div className="w-8 h-1 rounded-full bg-slate-200" />
                <div className="w-8 h-1 rounded-full bg-slate-200" />
              </div>
              <span className="text-sm text-slate-400 ml-2">1 of 3</span>
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
                Analyzing Market...
              </h2>
              <p className="text-slate-500">
                AI is researching competitors and market opportunities
              </p>
            </motion.div>
          ) : marketData ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Market Overview */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Market Overview</h2>
                    <p className="text-sm text-slate-500">Key market metrics and size</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-500 mb-1">Market Definition</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {marketData.marketDefinition}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-500 mb-1">Market Size</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {marketData.marketSize}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-500 mb-1">Growth Rate</p>
                    <p className="text-lg font-semibold text-green-600">
                      +{marketData.growthRate}% YoY
                    </p>
                  </div>
                </div>
              </div>

              {/* Competitors */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Competitors</h2>
                    <p className="text-sm text-slate-500">Key players in the market</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {marketData.competitors.map((competitor, index) => (
                    <div
                      key={index}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-100"
                    >
                      <h3 className="font-semibold text-slate-900 mb-1">
                        {competitor.name}
                      </h3>
                      <p className="text-sm text-slate-500 mb-3">
                        {competitor.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs font-medium text-slate-400 uppercase mb-2">
                            Strengths
                          </p>
                          <ul className="space-y-1">
                            {competitor.strengths?.map((s, i) => (
                              <li
                                key={i}
                                className="text-sm text-slate-600 flex items-center gap-2"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-400 uppercase mb-2">
                            Weaknesses
                          </p>
                          <ul className="space-y-1">
                            {competitor.weaknesses?.map((w, i) => (
                              <li
                                key={i}
                                className="text-sm text-slate-600 flex items-center gap-2"
                              >
                                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                                {w}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Segments */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Target Segments</h2>
                    <p className="text-sm text-slate-500">Who you're building for</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {marketData.targetSegments.map((segment, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                    >
                      {segment}
                    </span>
                  ))}
                </div>
              </div>

              {/* Competitive Advantages */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Target className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Your Competitive Advantages
                    </h2>
                    <p className="text-sm text-slate-500">What sets you apart</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {marketData.competitiveAdvantages.map((advantage, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Footer with Next button */}
      {marketData && !isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 py-4"
        >
          <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Review the market analysis above. You can edit details later.
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#090C9B] text-white rounded-xl font-medium hover:bg-[#0a0eb0] transition-colors shadow-lg shadow-[#090C9B]/20"
            >
              Next: User Personas
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}



