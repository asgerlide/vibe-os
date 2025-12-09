"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Save, Loader2, Plus, Trash2 } from "lucide-react";
import { Persona, SectionKey } from "@/lib/persona/types";

interface EditSheetProps {
  isOpen: boolean;
  onClose: () => void;
  persona: Persona | null;
  sectionKey: SectionKey | null;
  onSave: (updatedPersona: Persona) => void;
  onRegenerate: (sectionKey: SectionKey) => Promise<void>;
  isRegenerating?: boolean;
}

export function EditSheet({
  isOpen,
  onClose,
  persona,
  sectionKey,
  onSave,
  onRegenerate,
  isRegenerating = false,
}: EditSheetProps) {
  const [editedPersona, setEditedPersona] = useState<Persona | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (persona) {
      setEditedPersona({ ...persona });
    }
  }, [persona]);

  if (!persona || !editedPersona || !sectionKey) return null;

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate save
    onSave(editedPersona);
    setIsSaving(false);
    onClose();
  };

  const handleRegenerate = async () => {
    await onRegenerate(sectionKey);
  };

  const getSectionTitle = () => {
    const titles: Record<SectionKey, string> = {
      bio: "Profile & Bio",
      journey: "User Journey",
      goals: "Goals",
      painPoints: "Pain Points",
      behaviors: "Behaviors",
      tools: "Tools & Stack",
      jtbds: "Jobs to Be Done",
      needsMap: "Needs & Solutions",
      triggers: "Triggers",
      constraints: "Constraints",
      scenarios: "Scenarios",
      goalPainSolutions: "Goal ↔ Pain ↔ Solution",
      skills: "Skills",
    };
    return titles[sectionKey];
  };

  const inputStyles = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 outline-none transition-all text-slate-800 placeholder:text-slate-400";

  const renderSectionEditor = () => {
    switch (sectionKey) {
      case "goalPainSolutions":
        return (
          <div className="space-y-4 text-sm text-slate-600">
            <p className="text-slate-500">
              Goal–Pain–Solution items are generated from persona data. Editing UI is not yet implemented in this sheet.
            </p>
            <p className="text-slate-500">
              You can regenerate this section, or edit the underlying goals and pain points to change the generated outputs.
            </p>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-4 text-sm text-slate-600">
            <p className="text-slate-500">
              Skills radar values are generated from persona data. Manual edit UI is not yet implemented in this sheet.
            </p>
            <p className="text-slate-500">
              Consider regenerating this section after updating goals, tools, or behaviors.
            </p>
          </div>
        );

      case "bio":
        return (
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Name
              </label>
              <input
                type="text"
                value={editedPersona.name}
                onChange={(e) => setEditedPersona({ ...editedPersona, name: e.target.value })}
                className={inputStyles}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Role
              </label>
              <input
                type="text"
                value={editedPersona.role}
                onChange={(e) => setEditedPersona({ ...editedPersona, role: e.target.value })}
                className={inputStyles}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Company
              </label>
              <input
                type="text"
                value={editedPersona.company || ""}
                onChange={(e) => setEditedPersona({ ...editedPersona, company: e.target.value })}
                className={inputStyles}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Bio
              </label>
              <textarea
                value={editedPersona.bio}
                onChange={(e) => setEditedPersona({ ...editedPersona, bio: e.target.value })}
                rows={4}
                className={`${inputStyles} resize-none`}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Quick Facts <span className="text-slate-400 font-normal">(comma-separated)</span>
              </label>
              <input
                type="text"
                value={editedPersona.quickFacts.join(", ")}
                onChange={(e) => setEditedPersona({ 
                  ...editedPersona, 
                  quickFacts: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                })}
                className={inputStyles}
              />
            </div>
          </div>
        );

      case "goals":
        return (
          <div className="space-y-3">
            {editedPersona.goals.map((goal, index) => (
              <div key={goal.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="text"
                    value={goal.text}
                    onChange={(e) => {
                      const newGoals = [...editedPersona.goals];
                      newGoals[index] = { ...goal, text: e.target.value };
                      setEditedPersona({ ...editedPersona, goals: newGoals });
                    }}
                    className={`${inputStyles} text-sm`}
                    placeholder="Goal description"
                  />
                  <select
                    value={goal.priority}
                    onChange={(e) => {
                      const newGoals = [...editedPersona.goals];
                      newGoals[index] = { ...goal, priority: Number(e.target.value) as 1 | 2 | 3 };
                      setEditedPersona({ ...editedPersona, goals: newGoals });
                    }}
                    className="px-3 py-3 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    <option value={1}>P1</option>
                    <option value={2}>P2</option>
                    <option value={3}>P3</option>
                  </select>
                  <button
                    onClick={() => {
                      const newGoals = editedPersona.goals.filter((_, i) => i !== index);
                      setEditedPersona({ ...editedPersona, goals: newGoals });
                    }}
                    className="p-3 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={goal.metric || ""}
                  onChange={(e) => {
                    const newGoals = [...editedPersona.goals];
                    newGoals[index] = { ...goal, metric: e.target.value };
                    setEditedPersona({ ...editedPersona, goals: newGoals });
                  }}
                  placeholder="Success metric (optional)"
                  className={`${inputStyles} text-sm`}
                />
              </div>
            ))}
            <button
              onClick={() => {
                const newGoal = {
                  id: `goal-${Date.now()}`,
                  text: "",
                  priority: 2 as const,
                };
                setEditedPersona({ ...editedPersona, goals: [...editedPersona.goals, newGoal] });
              }}
              className="w-full btn-ghost flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Goal
            </button>
          </div>
        );

      case "painPoints":
        return (
          <div className="space-y-3">
            {editedPersona.painPoints.map((point, index) => (
              <div key={point.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="flex items-start gap-3">
                  <textarea
                    value={point.text}
                    onChange={(e) => {
                      const newPoints = [...editedPersona.painPoints];
                      newPoints[index] = { ...point, text: e.target.value };
                      setEditedPersona({ ...editedPersona, painPoints: newPoints });
                    }}
                    rows={2}
                    className={`${inputStyles} text-sm resize-none flex-1`}
                    placeholder="Pain point description"
                  />
                  <button
                    onClick={() => {
                      const newPoints = editedPersona.painPoints.filter((_, i) => i !== index);
                      setEditedPersona({ ...editedPersona, painPoints: newPoints });
                    }}
                    className="p-3 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-3">
                  <select
                    value={point.category}
                    onChange={(e) => {
                      const newPoints = [...editedPersona.painPoints];
                      newPoints[index] = { ...point, category: e.target.value as any };
                      setEditedPersona({ ...editedPersona, painPoints: newPoints });
                    }}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                  >
                    <option value="functional">Functional</option>
                    <option value="process">Process</option>
                    <option value="tooling">Tooling</option>
                    <option value="emotional">Emotional</option>
                  </select>
                  <select
                    value={point.severity}
                    onChange={(e) => {
                      const newPoints = [...editedPersona.painPoints];
                      newPoints[index] = { ...point, severity: e.target.value as any };
                      setEditedPersona({ ...editedPersona, painPoints: newPoints });
                    }}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                const newPoint = {
                  id: `pain-${Date.now()}`,
                  text: "",
                  category: "functional" as const,
                  severity: "medium" as const,
                };
                setEditedPersona({ ...editedPersona, painPoints: [...editedPersona.painPoints, newPoint] });
              }}
              className="w-full btn-ghost flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Pain Point
            </button>
          </div>
        );

      case "behaviors":
        return (
          <div className="space-y-2">
            {editedPersona.behaviors.map((behavior, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={behavior}
                  onChange={(e) => {
                    const newBehaviors = [...editedPersona.behaviors];
                    newBehaviors[index] = e.target.value;
                    setEditedPersona({ ...editedPersona, behaviors: newBehaviors });
                  }}
                  className={`${inputStyles} text-sm`}
                  placeholder="Behavior pattern"
                />
                <button
                  onClick={() => {
                    const newBehaviors = editedPersona.behaviors.filter((_, i) => i !== index);
                    setEditedPersona({ ...editedPersona, behaviors: newBehaviors });
                  }}
                  className="p-3 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                setEditedPersona({ ...editedPersona, behaviors: [...editedPersona.behaviors, ""] });
              }}
              className="w-full btn-ghost flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Behavior
            </button>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-sm text-slate-500 mb-1">Editor for {getSectionTitle()} coming soon.</p>
            <p className="text-xs text-slate-400">Use the Regenerate button to update with AI.</p>
          </div>
        );
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-[440px] sm:w-[540px] sm:max-w-none bg-white border-l border-slate-200">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3 text-slate-900">
            Edit {getSectionTitle()}
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-600">
              {persona.name}
            </span>
          </SheetTitle>
          <SheetDescription className="text-slate-500">
            Make changes to this section. Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <Separator className="my-5 bg-slate-100" />

        <ScrollArea className="h-[calc(100vh-240px)] pr-4 custom-scrollbar">
          {renderSectionEditor()}
        </ScrollArea>

        <Separator className="my-5 bg-slate-100" />

        <SheetFooter className="flex-row gap-3 sm:justify-between">
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="flex-1 btn-ghost flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium disabled:opacity-50"
          >
            {isRegenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-indigo-500" />
            )}
            {isRegenerating ? "Regenerating..." : "AI Regenerate"}
          </button>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 btn-primary flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
