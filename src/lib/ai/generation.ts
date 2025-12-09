import { IdeaData } from "@/lib/idea/store";
import { MarketData } from "@/lib/market/types";
import { TechData } from "@/lib/tech/types";
import { Persona } from "@/lib/persona/types";

/**
 * Generate Market Analysis from Idea using Gemini AI
 */
export async function generateMarketFromIdea(
  idea: IdeaData
): Promise<MarketData> {
  try {
    const response = await fetch("/api/generate/market", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate market analysis");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Market generation error:", error);
    // Fallback to mock data if API fails
    return generateMockMarket(idea);
  }
}

/**
 * Generate Personas from Idea + Market Data using Gemini AI
 */
export async function generatePersonasFromIdea(
  idea: IdeaData,
  market: MarketData
): Promise<Persona[]> {
  try {
    const response = await fetch("/api/generate/personas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea, market }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate personas");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Persona generation error:", error);
    // Fallback to mock data if API fails
    return generateMockPersonas(idea, market);
  }
}

/**
 * Generate Tech Stack from Idea + Market + Personas using Gemini AI
 */
export async function generateTechFromIdea(
  idea: IdeaData,
  market: MarketData,
  personas: Persona[]
): Promise<TechData> {
  try {
    const response = await fetch("/api/generate/tech", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea, market, personas }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate tech stack");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Tech generation error:", error);
    // Fallback to mock data if API fails
    return generateMockTech(idea, market, personas);
  }
}

// ============================================
// FALLBACK MOCK DATA GENERATORS
// Used when API is unavailable or fails
// ============================================

function generateMockMarket(idea: IdeaData): MarketData {
  const ideaLower = idea.initialPrompt.toLowerCase();
  
  let marketDefinition = "Digital Products";
  let competitors = [];

  if (ideaLower.includes("meditation") || ideaLower.includes("wellness") || ideaLower.includes("mental health")) {
    marketDefinition = "Mental Wellness & Meditation Apps";
    competitors = [
      { name: "Headspace", description: "Leading meditation app", strengths: ["Brand recognition"], weaknesses: ["Subscription fatigue"] },
      { name: "Calm", description: "Sleep and meditation", strengths: ["Sleep content"], weaknesses: ["High pricing"] },
    ];
  } else if (ideaLower.includes("productivity") || ideaLower.includes("task")) {
    marketDefinition = "Productivity & Task Management";
    competitors = [
      { name: "Notion", description: "All-in-one workspace", strengths: ["Flexibility"], weaknesses: ["Learning curve"] },
      { name: "Todoist", description: "Task management", strengths: ["Simplicity"], weaknesses: ["Limited free tier"] },
    ];
  } else {
    competitors = [
      { name: "Competitor A", description: "Market leader", strengths: ["Market share"], weaknesses: ["Slow innovation"] },
      { name: "Competitor B", description: "Growing challenger", strengths: ["Modern approach"], weaknesses: ["Limited features"] },
    ];
  }

  return {
    marketDefinition,
    marketSize: "$15B+ global market",
    marketShare: Math.floor(Math.random() * 15) + 5,
    growthRate: Math.floor(Math.random() * 20) + 10,
    competitors,
    competitiveAdvantages: [
      `Unique approach: ${idea.valueProposition || "Innovative solution"}`,
      "Modern, intuitive user experience",
      "AI-powered personalization",
    ],
    targetSegments: [idea.targetAudience || "General consumers", "Early adopters"],
    marketOpportunities: ["Growing market", "Underserved segments"],
    chartData: [45, 52, 48, 58, 54, 62, 75, 82],
  };
}

function generateMockPersonas(idea: IdeaData, market: MarketData): Persona[] {
  return [
    {
      id: "persona-1",
      type: "Primary",
      name: "Alex Thompson",
      role: "Target User",
      age: 30,
      ageRange: "25-35",
      incomeRange: "$60k-$100k",
      company: "Tech Company",
      industry: market.marketDefinition || "Technology",
      location: "United States",
      experienceLevel: "intermediate",
      techProficiency: "high",
      matchScore: 88,
      bio: `Alex is an ideal user for ${idea.ideaName}. They are actively looking for solutions that help with ${idea.description}.`,
      quickFacts: ["Tech-savvy", "Early adopter", "Values efficiency"],
      journey: [
        { id: "j1", title: "Awareness", status: "completed", note: "Discovered the problem" },
        { id: "j2", title: "Consideration", status: "active", note: "Evaluating solutions" },
        { id: "j3", title: "Decision", status: "pending", note: "Ready to try" },
      ],
      goals: [
        { id: "g1", text: idea.valueProposition || "Achieve goals", priority: 1 },
      ],
      painPoints: [
        { id: "pp1", category: "functional", text: "Current solutions don't meet needs", severity: "high" },
      ],
      behaviors: ["Researches before buying", "Values UX", "Shares recommendations"],
      tools: [{ id: "t1", name: "Smartphone", purpose: "Primary device" }],
      jtbds: [
        { id: "jtbd1", kind: "functional", title: "Use product effectively", detail: `When I need ${idea.description}, I want a simple solution` },
      ],
      needsMap: [{ need: "Easy onboarding", solution: "Guided setup flow" }],
      triggers: [{ id: "tr1", text: "Frustration with current solution" }],
      constraints: [{ id: "c1", text: "Limited time" }],
      scenarios: [{ id: "s1", title: "First use", description: "User tries the app", outcome: "positive" }],
      goalPainSolutions: [
        {
          id: "gps1",
          goal: { text: idea.valueProposition || "Achieve goals", metric: "Usage frequency" },
          painPoints: [{ id: "gpp1", text: "Current solutions are generic", severity: "high" }],
          solution: { text: `${idea.ideaName} provides personalized approach`, feature: "Core feature" },
        },
      ],
      skills: [{ skill: "Tech Savviness", level: 75 }],
      engagementData: [{ label: "Week 1", value: 40 }, { label: "Week 2", value: 55 }],
    },
  ];
}

function generateMockTech(idea: IdeaData, market: MarketData, personas: Persona[]): TechData {
  const ideaLower = idea.initialPrompt.toLowerCase();
  const needsMobile = ideaLower.includes("app") || ideaLower.includes("mobile");

  return {
    techStack: [
      { name: needsMobile ? "React Native" : "Next.js", category: "frontend", reason: needsMobile ? "Cross-platform mobile" : "Full-stack React" },
      { name: "TypeScript", category: "frontend", reason: "Type safety" },
      { name: "Node.js", category: "backend", reason: "JavaScript ecosystem" },
      { name: "PostgreSQL", category: "database", reason: "Reliable database" },
      { name: "Vercel", category: "infrastructure", reason: "Easy deployment" },
    ],
    infrastructure: "Cloud-native serverless architecture",
    architecturePattern: "Microservices with API Gateway",
    technicalNotes: `Built for ${idea.ideaName} with focus on scalability and user experience.`,
    scalabilityConsiderations: ["Horizontal scaling", "CDN for global reach", "Caching layer"],
    securityConsiderations: ["End-to-end encryption", "OAuth 2.0", "GDPR compliance"],
    integrations: ["Analytics", "Push notifications", "Cloud storage"],
  };
}
