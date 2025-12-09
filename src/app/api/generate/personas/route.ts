import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { idea, market } = await request.json();

    if (!idea || !market) {
      return NextResponse.json(
        { error: "Idea and market data are required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a UX researcher creating detailed user personas for a new product.

PRODUCT IDEA:
Name: ${idea.ideaName}
Description: ${idea.description}
Target Audience: ${idea.targetAudience}
Value Proposition: ${idea.valueProposition}

MARKET CONTEXT:
Market: ${market.marketDefinition}
Target Segments: ${market.targetSegments?.join(", ")}
Competitors: ${market.competitors?.map((c: { name: string }) => c.name).join(", ")}

Create 2 detailed user personas (1 Primary, 1 Secondary) that would be ideal users for this product. Return ONLY valid JSON (no markdown, no code blocks) in this exact format:

[
  {
    "id": "persona-1",
    "type": "Primary",
    "name": "Full Name",
    "role": "Job Title",
    "age": 32,
    "ageRange": "30-39",
    "incomeRange": "$80k-$120k",
    "company": "Company Type",
    "industry": "Industry",
    "location": "City, Country",
    "experienceLevel": "intermediate",
    "techProficiency": "high",
    "matchScore": 92,
    "bio": "A detailed 2-3 sentence bio describing this persona, their situation, and why they need this product.",
    "quickFacts": ["Fact 1", "Fact 2", "Fact 3"],
    "goalPainSolutions": [
      {
        "id": "gps-1",
        "goal": {
          "text": "Primary goal related to the product",
          "metric": "How success is measured"
        },
        "painPoints": [
          { "id": "pp-1", "text": "Pain point 1", "severity": "high" },
          { "id": "pp-2", "text": "Pain point 2", "severity": "medium" }
        ],
        "solution": {
          "text": "How the product solves this",
          "feature": "Specific feature"
        }
      }
    ],
    "behaviors": [
      "Behavior pattern 1",
      "Behavior pattern 2",
      "Behavior pattern 3",
      "Behavior pattern 4"
    ],
    "tools": [
      { "id": "t1", "name": "Tool Name", "purpose": "What they use it for" },
      { "id": "t2", "name": "Tool Name 2", "purpose": "Purpose" }
    ],
    "journey": [
      { "id": "j1", "title": "Awareness", "status": "completed", "note": "How they discovered the problem" },
      { "id": "j2", "title": "Consideration", "status": "active", "note": "Current evaluation stage" },
      { "id": "j3", "title": "Decision", "status": "pending", "note": "What will make them commit" },
      { "id": "j4", "title": "Adoption", "status": "pending", "note": "Expected usage pattern" }
    ],
    "goals": [
      { "id": "g1", "text": "Goal 1", "metric": "Metric", "priority": 1 },
      { "id": "g2", "text": "Goal 2", "priority": 2 }
    ],
    "painPoints": [
      { "id": "pp1", "category": "functional", "text": "Pain point", "severity": "high" },
      { "id": "pp2", "category": "emotional", "text": "Pain point", "severity": "medium" }
    ],
    "jtbds": [
      { "id": "jtbd1", "kind": "functional", "title": "Job title", "detail": "When [situation], I want to [action] so that [outcome]" },
      { "id": "jtbd2", "kind": "emotional", "title": "Job title", "detail": "Description" }
    ],
    "needsMap": [
      { "need": "User need", "solution": "How product addresses it" }
    ],
    "triggers": [
      { "id": "tr1", "text": "What triggers them to seek solution" }
    ],
    "constraints": [
      { "id": "c1", "text": "Constraint or limitation" }
    ],
    "scenarios": [
      { "id": "s1", "title": "Scenario name", "description": "Description of scenario", "outcome": "positive" }
    ],
    "skills": [
      { "skill": "Skill 1", "level": 80 },
      { "skill": "Skill 2", "level": 65 }
    ],
    "engagementData": [
      { "label": "Week 1", "value": 40 },
      { "label": "Week 2", "value": 55 },
      { "label": "Week 3", "value": 65 },
      { "label": "Week 4", "value": 72 }
    ]
  }
]

Make personas realistic, specific to this product idea, and diverse. experienceLevel must be "novice", "intermediate", or "expert". techProficiency must be "low", "medium", or "high". severity must be "low", "medium", or "high". kind must be "functional", "emotional", or "social". category must be "functional", "process", "tooling", or "emotional". status must be "completed", "active", or "pending". outcome must be "positive", "negative", or "neutral".`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    let personas;
    try {
      // Try to extract JSON array from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        personas = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON array found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", text);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    return NextResponse.json(personas);
  } catch (error) {
    console.error("Persona generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate personas" },
      { status: 500 }
    );
  }
}

