export type PersonaType = "Primary" | "Secondary";

export type Severity = "low" | "medium" | "high";

export interface JTBDItem {
  id: string;
  kind: "functional" | "emotional" | "social";
  title: string;
  detail: string;
}

export interface PainPoint {
  id: string;
  category: "functional" | "process" | "tooling" | "emotional";
  text: string;
  severity: Severity;
}

export interface ToolRef {
  id: string;
  name: string;
  purpose: string;
}

export interface Goal {
  id: string;
  text: string;
  metric?: string;
  priority: 1 | 2 | 3;
}

export interface JourneyStep {
  id: string;
  title: string;
  status: "completed" | "active" | "pending";
  note?: string;
}

export interface NeedSolution {
  need: string;
  solution: string;
}

export interface Trigger {
  id: string;
  text: string;
}

export interface Constraint {
  id: string;
  text: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  outcome: "positive" | "negative" | "neutral";
}

// NEW: Connected Goal-PainPoint-Solution model
export interface GoalPainSolution {
  id: string;
  goal: {
    text: string;
    metric?: string;
  };
  painPoints: {
    id: string;
    text: string;
    severity: Severity;
  }[];
  solution: {
    text: string;
    feature?: string;
  };
}

// NEW: Skill ratings for radar chart
export interface SkillRating {
  skill: string;
  level: number; // 0-100
}

// NEW: Engagement/Activity data for charts
export interface EngagementData {
  label: string;
  value: number;
}

export interface Persona {
  id: string;
  type: PersonaType;
  name: string;
  role: string;
  age?: number;
  ageRange?: string; // e.g. "25-34"
  incomeRange?: string; // e.g. "$75k-$120k"
  company?: string;
  industry?: string;
  location?: string;
  experienceLevel: "novice" | "intermediate" | "expert";
  techProficiency: "low" | "medium" | "high";
  avatarUrl?: string;
  matchScore: number; // 0–100
  bio: string;
  quickFacts: string[]; // shown as chips
  journey: JourneyStep[];
  goals: Goal[];
  painPoints: PainPoint[];
  behaviors: string[];
  tools: ToolRef[];
  jtbds: JTBDItem[];
  needsMap: NeedSolution[];
  triggers: Trigger[];
  constraints: Constraint[];
  scenarios?: Scenario[];
  // NEW fields
  goalPainSolutions: GoalPainSolution[];
  skills: SkillRating[];
  engagementData: EngagementData[];
}

export type SectionKey = 
  | "bio"
  | "journey"
  | "goals"
  | "painPoints"
  | "behaviors"
  | "tools"
  | "jtbds"
  | "needsMap"
  | "triggers"
  | "constraints"
  | "scenarios"
  | "goalPainSolutions"
  | "skills";
