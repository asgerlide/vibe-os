"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Persona } from "@/lib/persona/types";

// Import tiles
import { BioTile } from "./tiles/BioTile";
import { JourneyTile } from "./tiles/JourneyTile";
import { GoalPainSolutionTile } from "./tiles/GoalPainSolutionTile";
import { SkillsRadarTile } from "./tiles/SkillsRadarTile";
import { EngagementChartTile } from "./tiles/EngagementChartTile";
import { BehaviorsTile } from "./tiles/BehaviorsTile";
import { ToolsTile } from "./tiles/ToolsTile";
import { JTBDTile } from "./tiles/JTBDTile";
import { TriggersConstraintsTile } from "./tiles/TriggersConstraintsTile";

interface PersonaInsightsGridProps {
  persona: Persona;
  onEditSection?: (sectionKey: string) => void;
  onRegenerateSection?: (sectionKey: string) => void;
}

const staggerDelay = 0.05;

export function PersonaInsightsGrid({
  persona,
  onEditSection,
  onRegenerateSection,
}: PersonaInsightsGridProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="space-y-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Row 1: Bio + Skills Radar + Engagement Chart */}
      <div className="grid grid-cols-12 gap-5">
        <motion.div variants={itemVariants} className="col-span-12 lg:col-span-5">
          <BioTile
            persona={persona}
            onEdit={() => onEditSection?.("bio")}
            onRegenerate={() => onRegenerateSection?.("bio")}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 lg:col-span-3">
          <SkillsRadarTile
            skills={persona.skills}
            onEdit={() => onEditSection?.("skills")}
            onRegenerate={() => onRegenerateSection?.("skills")}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 lg:col-span-4">
          <EngagementChartTile
            data={persona.engagementData}
            onEdit={() => onEditSection?.("engagement")}
            onRegenerate={() => onRegenerateSection?.("engagement")}
          />
        </motion.div>
      </div>

      {/* Row 2: Customer Journey */}
      <motion.div variants={itemVariants}>
        <JourneyTile
          journey={persona.journey}
          onEdit={() => onEditSection?.("journey")}
          onRegenerate={() => onRegenerateSection?.("journey")}
        />
      </motion.div>

      {/* Row 3: Goal → Pain Point → Solution Model (Full Width) */}
      <motion.div variants={itemVariants}>
        <GoalPainSolutionTile
          data={persona.goalPainSolutions}
          onEdit={() => onEditSection?.("goalPainSolutions")}
          onRegenerate={() => onRegenerateSection?.("goalPainSolutions")}
        />
      </motion.div>

      {/* Row 4: Behaviors + Tools + JTBD */}
      <div className="grid grid-cols-12 gap-5">
        <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 lg:col-span-4">
          <BehaviorsTile
            behaviors={persona.behaviors}
            onEdit={() => onEditSection?.("behaviors")}
            onRegenerate={() => onRegenerateSection?.("behaviors")}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 lg:col-span-4">
          <ToolsTile
            tools={persona.tools}
            onEdit={() => onEditSection?.("tools")}
            onRegenerate={() => onRegenerateSection?.("tools")}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-12 lg:col-span-4">
          <TriggersConstraintsTile
            triggers={persona.triggers}
            constraints={persona.constraints}
            onEdit={() => onEditSection?.("triggers")}
            onRegenerate={() => onRegenerateSection?.("triggers")}
          />
        </motion.div>
      </div>

      {/* Row 5: Jobs to Be Done (Full Width) */}
      <motion.div variants={itemVariants}>
        <JTBDTile
          jtbds={persona.jtbds}
          onEdit={() => onEditSection?.("jtbds")}
          onRegenerate={() => onRegenerateSection?.("jtbds")}
        />
      </motion.div>
    </motion.div>
  );
}
