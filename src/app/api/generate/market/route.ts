import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const { idea } = await request.json();

    if (!idea) {
      return NextResponse.json({ error: "Idea data is required" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a product strategist helping to analyze the market for a new product idea.

PRODUCT IDEA:
Name: ${idea.ideaName}
Description: ${idea.description}
Target Audience: ${idea.targetAudience}
Value Proposition: ${idea.valueProposition}
Original Prompt: ${idea.initialPrompt}

Analyze this product idea and generate a comprehensive market analysis. Return ONLY valid JSON (no markdown, no code blocks) in this exact format:

{
  "marketDefinition": "The market category this product belongs to (e.g., 'Mental Wellness & Meditation Apps')",
  "marketSize": "Estimated market size (e.g., '$15B+ global market')",
  "marketShare": 15,
  "growthRate": 20,
  "competitors": [
    {
      "name": "Competitor Name",
      "description": "Brief description of competitor",
      "strengths": ["Strength 1", "Strength 2", "Strength 3"],
      "weaknesses": ["Weakness 1", "Weakness 2"]
    }
  ],
  "competitiveAdvantages": [
    "What makes this product unique - advantage 1",
    "Advantage 2",
    "Advantage 3",
    "Advantage 4"
  ],
  "targetSegments": [
    "Target segment 1 with demographics",
    "Target segment 2",
    "Target segment 3"
  ],
  "marketOpportunities": [
    "Market opportunity 1",
    "Market opportunity 2",
    "Market opportunity 3"
  ],
  "chartData": [45, 52, 48, 58, 54, 62, 75, 82]
}

Include 3-4 real competitors relevant to this space. Make the analysis specific to the product idea, not generic.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    let marketData;
    try {
      // Try to extract JSON from the response (in case there's extra text)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        marketData = JSON.parse(jsonMatch[0]);
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

    return NextResponse.json(marketData);
  } catch (error) {
    console.error("Market generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate market analysis" },
      { status: 500 }
    );
  }
}

