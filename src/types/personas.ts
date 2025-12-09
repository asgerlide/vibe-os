export interface Persona {
    name: string;
    role: string;
    age: number;
    occupation: string;
    goal: string;
    avatar?: string;
    location?: string;
    quote?: string;
    background?: string;
    motivations?: string[];
    values?: string[];
    technicalProficiency?: "beginner" | "intermediate" | "advanced" | "expert";
    demographics?: {
        ageRange?: { min: number; max: number };
        location?: string;
        education?: string;
        income?: string;
    };
    environment?: {
        physical?: string[];
        social?: string;
        technology?: string[];
    };
    professional?: {
        experience?: number;
        companySize?: string;
        teamSize?: number;
    };
    scenarios?: {
        typicalDay?: string;
        success?: string;
        failure?: string;
    };
}

export interface PainPoint {
    id: string;
    description: string;
    priority: "high" | "medium" | "low";
}

export interface JTBD {
    id: string;
    statement: string;
    importance: number; // 1-5
}

export interface JourneyStage {
    id: string;
    name: string;
    description: string;
    touchpoints: string[];
}

export interface Behavior {
    id: string;
    label: string;
    category: "technology" | "preference" | "pattern";
}

export interface PersonasData {
    primaryPersona: Persona;
    secondaryPersona: Persona;
    painPoints: PainPoint[];
    jtbds: JTBD[];
    journey: JourneyStage[];
    behaviors: Behavior[];
}

