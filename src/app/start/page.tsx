"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Lightbulb, Loader2 } from "lucide-react";
import { useIdeaStore, IdeaData } from "@/lib/idea/store";
import { useOnboardingStore } from "@/lib/onboarding/store";
import { useMarketStore } from "@/lib/market/store";
import { useTechStore } from "@/lib/tech/store";
import { usePersonaStore } from "@/lib/persona/store";

export default function StartPage() {
  const router = useRouter();
  const { setIdea } = useIdeaStore();
  const { resetOnboarding } = useOnboardingStore();
  const { clearMarketData } = useMarketStore();
  const { clearTechData } = useTechStore();
  const { clearPersonas } = usePersonaStore();

  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const examplePrompts = [
    "A meditation app called MindFrame that uses an emotional orb to display the user's emotions and help them calm down",
    "A productivity app that helps remote teams stay connected through async video updates",
    "A fitness app that gamifies workouts with friends and social challenges",
  ];

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setIsProcessing(true);

    // Clear previous data
    resetOnboarding();
    clearMarketData();
    clearTechData();
    clearPersonas();

    // Parse the prompt to extract idea details
    // This is a simple extraction - in production, AI would do this
    const ideaData = parsePromptToIdea(prompt);
    setIdea(ideaData);

    // Navigate to market page
    router.push("/canvas/market");
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#090C9B]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#090C9B] to-[#1a1db8] flex items-center justify-center shadow-lg shadow-[#090C9B]/20"
          >
            <Lightbulb className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            What's your idea?
          </h1>
          <p className="text-lg text-slate-500 max-w-md mx-auto">
            Describe your product idea in a few sentences. We'll help you build
            a complete product blueprint.
          </p>
        </div>

        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-6"
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A meditation app that uses an emotional orb to help users calm down..."
            className="w-full h-36 resize-none border-0 bg-slate-50 rounded-2xl p-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#090C9B]/20 focus:bg-white transition-all text-lg"
            disabled={isProcessing}
          />

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-slate-400">
              {prompt.length > 0 && `${prompt.length} characters`}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={!prompt.trim() || isProcessing}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#090C9B] text-white rounded-xl font-medium hover:bg-[#0a0eb0] transition-colors shadow-lg shadow-[#090C9B]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Start Building
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Example Prompts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8"
        >
          <p className="text-sm font-medium text-slate-400 text-center mb-4">
            Try an example
          </p>
          <div className="space-y-2">
            {examplePrompts.map((example, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                onClick={() => handleExampleClick(example)}
                className="w-full p-4 text-left bg-white/50 hover:bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:text-slate-900 transition-all hover:shadow-md"
              >
                {example}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Simple prompt parser - extracts idea details from natural language
function parsePromptToIdea(prompt: string): IdeaData {
  const promptLower = prompt.toLowerCase();

  // Try to extract app/product name
  let ideaName = "My Product";
  const calledMatch = prompt.match(/called\s+(\w+)/i);
  const namedMatch = prompt.match(/named\s+(\w+)/i);
  if (calledMatch) {
    ideaName = calledMatch[1];
  } else if (namedMatch) {
    ideaName = namedMatch[1];
  }

  // Try to extract target audience
  let targetAudience = "General users";
  if (promptLower.includes("remote") || promptLower.includes("team")) {
    targetAudience = "Remote teams";
  } else if (promptLower.includes("meditation") || promptLower.includes("wellness")) {
    targetAudience = "Wellness seekers";
  } else if (promptLower.includes("fitness") || promptLower.includes("workout")) {
    targetAudience = "Fitness enthusiasts";
  } else if (promptLower.includes("productivity")) {
    targetAudience = "Professionals";
  }

  // Generate description (clean up the prompt)
  const description = prompt.charAt(0).toUpperCase() + prompt.slice(1);

  // Generate value proposition
  let valueProposition = "Solving user problems with an innovative approach";
  if (promptLower.includes("meditation") || promptLower.includes("calm")) {
    valueProposition = "Help users achieve mental wellness through personalized guidance";
  } else if (promptLower.includes("productivity")) {
    valueProposition = "Boost productivity with smart tools and seamless collaboration";
  } else if (promptLower.includes("fitness")) {
    valueProposition = "Make fitness fun and social with gamified experiences";
  }

  return {
    initialPrompt: prompt,
    ideaName,
    description,
    targetAudience,
    valueProposition,
  };
}



