"use client";

import React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PersonaCardDraggable, GeneratePersonaCard } from "./PersonaCardDraggable";
import { Persona } from "@/lib/persona/types";

interface PersonaDeckProps {
  personas: Persona[];
  selectedPersonaId?: string | null;
  onSelectPersona?: (id: string) => void;
  onGenerateNew?: () => void;
}

export function PersonaDeck({
  personas,
  selectedPersonaId,
  onSelectPersona,
  onGenerateNew,
}: PersonaDeckProps) {
  // Sort personas: Primary first, then Secondary, then others
  const sortedPersonas = [...personas].sort((a, b) => {
    if (a.type === "Primary" && b.type !== "Primary") return -1;
    if (a.type !== "Primary" && b.type === "Primary") return 1;
    if (a.type === "Secondary" && b.type !== "Secondary") return -1;
    if (a.type !== "Secondary" && b.type === "Secondary") return 1;
    return 0;
  });

  return (
    <div className="w-full">
      <ScrollArea className="w-full whitespace-nowrap">
        <div 
          className="flex gap-3 pb-3"
          role="list"
          aria-label="Persona cards"
        >
          {sortedPersonas.map((persona) => (
            <PersonaCardDraggable
              key={persona.id}
              persona={persona}
              isSelected={selectedPersonaId === persona.id}
              onSelect={() => onSelectPersona?.(persona.id)}
            />
          ))}
          
          <GeneratePersonaCard onClick={onGenerateNew} />
        </div>
        <ScrollBar orientation="horizontal" className="h-1.5 bg-slate-100" />
      </ScrollArea>
    </div>
  );
}
