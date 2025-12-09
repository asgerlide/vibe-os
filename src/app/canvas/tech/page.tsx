"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Server,
  Code,
  Shield,
  Zap,
  Sparkles,
  Loader2,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Layers,
  Cloud,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";

import { useIdeaStore } from "@/lib/idea/store";
import { useMarketStore } from "@/lib/market/store";
import { useTechStore } from "@/lib/tech/store";
import { useOnboardingStore } from "@/lib/onboarding/store";
import { usePersonaStore } from "@/lib/persona/store";
import { generateTechFromIdea } from "@/lib/ai/generation";

export default function TechPage() {
  const router = useRouter();
  const { idea } = useIdeaStore();
  const { marketData } = useMarketStore();
  const { techData, setTechData, isGenerating, setIsGenerating } = useTechStore();
  const { personas } = usePersonaStore();
  const { completeOnboarding } = useOnboardingStore();
  const [hasGenerated, setHasGenerated] = useState(false);

  // Auto-generate tech data on mount if not already present
  useEffect(() => {
    if (!techData && idea && marketData && !isGenerating && !hasGenerated) {
      generateTech();
    }
  }, [idea, marketData, techData, isGenerating, hasGenerated]);

  const generateTech = async () => {
    if (!idea || !marketData) return;
    setIsGenerating(true);
    setHasGenerated(true);
    try {
      const data = await generateTechFromIdea(idea, marketData, personas);
      setTechData(data);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNext = () => {
    completeOnboarding();
    router.push("/canvas");
  };

  const handleBack = () => {
    router.push("/canvas/UserProfiles");
  };

  // If no idea or market data, show error
  if (!idea || !marketData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Missing data</h2>
          <p className="text-slate-500 mb-6">
            Please complete the previous steps first.
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "frontend":
        return <Code className="w-4 h-4" />;
      case "backend":
        return <Server className="w-4 h-4" />;
      case "database":
        return <Layers className="w-4 h-4" />;
      case "infrastructure":
        return <Cloud className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "backend":
        return "bg-green-100 text-green-700 border-green-200";
      case "database":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "infrastructure":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

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
                  <span className="text-slate-600 font-medium">Tech Stack</span>
                </div>
                <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
                  Architecture & Technology
                </h1>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-8 h-1 rounded-full bg-[#090C9B]" />
                <div className="w-8 h-1 rounded-full bg-[#090C9B]" />
                <div className="w-8 h-1 rounded-full bg-[#090C9B]" />
              </div>
              <span className="text-sm text-slate-400 ml-2">3 of 3</span>
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
                Building Tech Stack...
              </h2>
              <p className="text-slate-500">
                AI is recommending the best technologies for your project
              </p>
            </motion.div>
          ) : techData ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Tech Stack */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Code className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Recommended Tech Stack
                    </h2>
                    <p className="text-sm text-slate-500">
                      Technologies chosen for your project
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {techData.techStack.map((tech, index) => (
                    <div
                      key={index}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border ${getCategoryColor(tech.category)}`}
                    >
                      {getCategoryIcon(tech.category)}
                      <span className="font-medium">{tech.name}</span>
                    </div>
                  ))}
                </div>

                {/* Tech details */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {techData.techStack.map(
                    (tech, index) =>
                      tech.reason && (
                        <div key={index} className="p-3 bg-slate-50 rounded-xl">
                          <p className="font-medium text-slate-900 mb-1">{tech.name}</p>
                          <p className="text-sm text-slate-500">{tech.reason}</p>
                        </div>
                      )
                  )}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Cloud className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Infrastructure</h2>
                    <p className="text-sm text-slate-500">Hosting and deployment</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-500 mb-1">Infrastructure</p>
                    <p className="font-semibold text-slate-900">{techData.infrastructure}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-sm text-slate-500 mb-1">Architecture Pattern</p>
                    <p className="font-semibold text-slate-900">
                      {techData.architecturePattern}
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 mb-2">Technical Notes</p>
                  <p className="text-slate-700 whitespace-pre-line">
                    {techData.technicalNotes}
                  </p>
                </div>
              </div>

              {/* Scalability & Security */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Scalability */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Scalability</h2>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {techData.scalabilityConsiderations.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Security */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Security</h2>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {techData.securityConsiderations.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Integrations */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <LinkIcon className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Integrations</h2>
                    <p className="text-sm text-slate-500">Third-party services</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {techData.integrations.map((integration, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Footer with Next button */}
      {techData && !isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-0 bg-white/80 backdrop-blur-xl border-t border-slate-200 py-4"
        >
          <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Your foundation is ready! Head to the canvas to build more.
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#090C9B] text-white rounded-xl font-medium hover:bg-[#0a0eb0] transition-colors shadow-lg shadow-[#090C9B]/20"
            >
              Go to Canvas
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}



