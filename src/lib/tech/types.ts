export interface TechStackItem {
  name: string;
  category: "frontend" | "backend" | "database" | "infrastructure" | "other";
  reason?: string;
}

export interface TechData {
  techStack: TechStackItem[];
  infrastructure: string;
  architecturePattern: string;
  technicalNotes: string;
  scalabilityConsiderations: string[];
  securityConsiderations: string[];
  integrations: string[];
}



