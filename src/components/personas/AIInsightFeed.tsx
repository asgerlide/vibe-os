"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot, X, Sparkles, AlertCircle, TrendingUp, Lightbulb, ChevronRight, RefreshCw } from "lucide-react";
import { Persona } from "@/lib/persona/types";

interface AIInsightFeedProps {
  persona: Persona;
  onClose: () => void;
}

export function AIInsightFeed({ persona, onClose }: AIInsightFeedProps) {
  const insights = [
    {
      id: "1",
      icon: <TrendingUp className="w-4 h-4" />,
      title: "High engagement potential",
      description: `${persona.name} shows strong alignment with automation features.`,
      action: "Create messaging",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      id: "2",
      icon: <AlertCircle className="w-4 h-4" />,
      title: "Missing data",
      description: "Budget range not specified. Add to improve fit scoring.",
      action: "Add data",
      color: "bg-amber-100 text-amber-600",
    },
    {
      id: "3",
      icon: <Lightbulb className="w-4 h-4" />,
      title: "Persona enrichment",
      description: "Add competitive tools analysis for switching barriers.",
      action: "Enrich persona",
      color: "bg-[#090C9B]/10 text-[#090C9B]",
    },
  ];

  return (
    <div className="elevated-card h-fit sticky top-24">
      <div className="card-header border-b-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#090C9B] to-[#1a1db8] flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="card-title">AI Insights</span>
            <p className="text-xs text-slate-400">Powered by VibeOS</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="px-5 pb-5">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 mb-4 rounded-xl bg-slate-50 border border-slate-100 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
          <RefreshCw className="w-4 h-4" />
          Refresh insights
        </button>

        <div className="insight-feed">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="insight-item"
            >
              <div className={`insight-icon ${insight.color}`}>{insight.icon}</div>
              <div className="insight-content">
                <p className="insight-title">{insight.title}</p>
                <p className="insight-description">{insight.description}</p>
                {insight.action && (
                  <button className="mt-2 flex items-center gap-1 text-xs font-medium text-[#090C9B] hover:underline">
                    {insight.action}
                    <ChevronRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-[#090C9B]/5 to-[#FF6B35]/5 border border-[#090C9B]/10">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#090C9B] flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-slate-800 mb-1">AI Summary</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                High-value target with strong problem-solution fit. Focus on automation messaging.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-600 hover:bg-white hover:border-slate-200 transition-all text-left">
            <Sparkles className="w-4 h-4 text-[#090C9B] mb-1.5" />
            Generate variants
          </button>
          <button className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-600 hover:bg-white hover:border-slate-200 transition-all text-left">
            <Lightbulb className="w-4 h-4 text-[#FF6B35] mb-1.5" />
            Suggest features
          </button>
        </div>
      </div>
    </div>
  );
}
