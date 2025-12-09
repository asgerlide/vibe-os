"use client";

import React from "react";
import { Zap, Lock, AlertCircle } from "lucide-react";
import { Trigger, Constraint } from "@/lib/persona/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TileWrapper } from "./TileWrapper";

interface TriggersConstraintsTileProps {
  triggers: Trigger[];
  constraints: Constraint[];
  onEdit?: () => void;
  onRegenerate?: () => void;
}

export function TriggersConstraintsTile({
  triggers,
  constraints,
  onEdit,
  onRegenerate,
}: TriggersConstraintsTileProps) {
  const copyContent = () => {
    const triggersText = triggers.map((t) => `- ${t.text}`).join("\n");
    const constraintsText = constraints.map((c) => `- ${c.text}`).join("\n");
    const text = `TRIGGERS:\n${triggersText}\n\nCONSTRAINTS:\n${constraintsText}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <TileWrapper
      title="Triggers & Constraints"
      icon={<Zap className="w-4 h-4 text-slate-500" />}
      onEdit={onEdit}
      onRegenerate={onRegenerate}
      onCopy={copyContent}
    >
      <Tabs defaultValue="triggers" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-3 h-9 bg-slate-100 p-1 rounded-lg">
          <TabsTrigger 
            value="triggers" 
            className="text-xs font-medium rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900"
          >
            <Zap className="w-3 h-3 mr-1.5" />
            Triggers ({triggers.length})
          </TabsTrigger>
          <TabsTrigger 
            value="constraints"
            className="text-xs font-medium rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900"
          >
            <Lock className="w-3 h-3 mr-1.5" />
            Constraints ({constraints.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="triggers" className="mt-0">
          <div className="space-y-2">
            {triggers.map((trigger) => (
              <div
                key={trigger.id}
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-amber-50/50 border border-amber-100"
              >
                <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-700 leading-snug">
                  {trigger.text}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="constraints" className="mt-0">
          <div className="space-y-2">
            {constraints.map((constraint) => (
              <div
                key={constraint.id}
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100"
              >
                <Lock className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-700 leading-snug">
                  {constraint.text}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </TileWrapper>
  );
}
