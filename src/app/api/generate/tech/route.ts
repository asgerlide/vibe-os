import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { idea, market, personas } = await request.json();

    if (!idea || !market) {
      return NextResponse.json(
        { error: "Idea and market data are required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const personaContext = personas?.length
      ? `Primary User: ${personas[0]?.name} - ${personas[0]?.role}, Tech Proficiency: ${personas[0]?.techProficiency}`
      : "General users";

    const prompt = `You are a solutions architect recommending a technology stack for a new product.

PRODUCT IDEA:
Name: ${idea.ideaName}
Description: ${idea.description}
Target Audience: ${idea.targetAudience}
Value Proposition: ${idea.valueProposition}

MARKET CONTEXT:
Market: ${market.marketDefinition}
Competitors: ${market.competitors?.map((c: { name: string }) => c.name).join(", ")}

USER CONTEXT:
${personaContext}

Recommend a modern, scalable technology stack for this product. Consider whether it needs mobile (React Native), web, real-time features, AI capabilities, etc. Return ONLY valid JSON (no markdown, no code blocks) in this exact format:

{
  "techStack": [
    { "name": "Technology Name", "category": "frontend", "reason": "Why this technology" },
    { "name": "Technology 2", "category": "backend", "reason": "Why this technology" },
    { "name": "Technology 3", "category": "database", "reason": "Why this technology" },
    { "name": "Technology 4", "category": "infrastructure", "reason": "Why this technology" }
  ],
  "infrastructure": "Description of hosting and deployment strategy",
  "architecturePattern": "Architecture pattern (e.g., 'Microservices', 'Serverless', 'Monolith')",
  "technicalNotes": "2-3 sentences about key technical considerations and focus areas for this specific product",
  "scalabilityConsiderations": [
    "Scalability consideration 1",
    "Scalability consideration 2",
    "Scalability consideration 3"
  ],
  "securityConsiderations": [
    "Security consideration 1",
    "Security consideration 2",
    "Security consideration 3"
  ],
  "integrations": [
    "Third-party integration 1",
    "Integration 2",
    "Integration 3"
  ]
}

category must be one of: "frontend", "backend", "database", "infrastructure", or "other".
Include 5-8 technologies in the stack. Be specific to this product's needs.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    let techData;
    try {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        techData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", text);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    return NextResponse.json(techData);
  } catch (error) {
    console.error("Tech generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate tech stack" },
      { status: 500 }
    );
  }
}

