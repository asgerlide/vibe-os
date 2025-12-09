"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, RefreshCw, MoreHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuggestionChipProps {
  suggestion: string;
  onAccept?: () => void;
  onReplace?: () => void;
  onMore?: () => void;
  onDismiss?: () => void;
  isVisible?: boolean;
}

export function SuggestionChip({
  suggestion,
  onAccept,
  onReplace,
  onMore,
  onDismiss,
  isVisible = true,
}: SuggestionChipProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30,
            duration: 0.3 
          }}
          className="inline-flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-2xl shadow-lg"
        >
          {/* AI Icon */}
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#FF7A1A]">
            <Sparkles className="w-3 h-3 text-white" />
          </div>

          {/* Suggestion Text */}
          <span className="text-sm font-medium max-w-[200px] truncate">
            {suggestion}
          </span>

          {/* Action Buttons */}
          <div className="flex items-center gap-0.5 ml-1 pl-2 border-l border-white/20">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white/70 hover:text-white hover:bg-white/10"
              onClick={onAccept}
              title="Accept"
            >
              <Check className="w-3.5 h-3.5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white/70 hover:text-white hover:bg-white/10"
              onClick={onReplace}
              title="Replace"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white/70 hover:text-white hover:bg-white/10"
              onClick={onMore}
              title="More options"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white/50 hover:text-white hover:bg-white/10"
              onClick={onDismiss}
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Multiple suggestions container
interface SuggestionsListProps {
  suggestions: Array<{
    id: string;
    text: string;
  }>;
  onAccept?: (id: string) => void;
  onReplace?: (id: string) => void;
  onMore?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export function SuggestionsList({
  suggestions,
  onAccept,
  onReplace,
  onMore,
  onDismiss,
}: SuggestionsListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <AnimatePresence mode="popLayout">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.id}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { delay: index * 0.1 }
            }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
          >
            <SuggestionChip
              suggestion={suggestion.text}
              onAccept={() => onAccept?.(suggestion.id)}
              onReplace={() => onReplace?.(suggestion.id)}
              onMore={() => onMore?.(suggestion.id)}
              onDismiss={() => onDismiss?.(suggestion.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}




