"use client";

import React from "react";
import { Edit3, RotateCcw, Copy, Check } from "lucide-react";

interface TileWrapperProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onEdit?: () => void;
  onRegenerate?: () => void;
  onCopy?: () => void;
  className?: string;
}

export function TileWrapper({
  title,
  icon,
  children,
  onEdit,
  onRegenerate,
  onCopy,
  className = "",
}: TileWrapperProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    onCopy?.();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className={`
        insight-tile p-5 h-full relative
        focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:ring-offset-2 focus-within:ring-offset-white
        ${className}
      `}
      tabIndex={0}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
              {icon}
            </div>
          )}
          <h3 className="text-sm font-semibold text-slate-800 tracking-tight">
            {title}
          </h3>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-1">
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-2 rounded-lg text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Edit"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          )}

          {onRegenerate && (
            <button
              onClick={onRegenerate}
              className="p-2 rounded-lg text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Regenerate"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {onCopy && (
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title={copied ? "Copied!" : "Copy"}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
