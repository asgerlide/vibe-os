"use client";

import React, { useState } from "react";
import { PersonaHeader } from "@/components/personas/PersonaHeader";
import { ProfileCard } from "@/components/personas/ProfileCard";
import { DemographicsPsychographicsCard } from "@/components/personas/DemographicsPsychographicsCard";
import { JTBDCards } from "@/components/personas/JTBDCards";
import { PainPointsCard } from "@/components/personas/PainPointsCard";
import { WorkflowToolsCard } from "@/components/personas/WorkflowToolsCard";
import { ScenarioCard } from "@/components/personas/ScenarioCard";
import { NeedsMappingCard } from "@/components/personas/NeedsMappingCard";
import { ConstraintsCard } from "@/components/personas/ConstraintsCard";
import { PersonaSidePanel } from "@/components/personas/PersonaSidePanel";
import { PersonaJourneyPanel } from "@/components/personas/PersonaJourneyPanel";
import { AIChatPanel } from "@/components/personas/AIChatPanel";
import { PersonasData } from "@/types/personas";

// Default initial data
const defaultPersonasData: PersonasData = {
    primaryPersona: {
        name: "Sarah Chen",
        role: "Product Manager",
        age: 32,
        occupation: "Tech Startup",
        goal: "Streamline team workflows without coding",
        quote: "I need tools that work the way I think, not the way developers think.",
        background: "Sarah has been managing product teams for 5 years. She's tech-savvy but doesn't code, and constantly struggles to bridge the gap between her team's needs and what engineering can deliver.",
        technicalProficiency: "intermediate",
        motivations: ["Efficiency", "Team productivity", "Quick wins"],
        values: ["Simplicity", "Transparency", "Collaboration"],
        demographics: {
            ageRange: { min: 28, max: 36 },
            location: "San Francisco, CA",
            education: "MBA",
            income: "$100k-$150k",
        },
        environment: {
            physical: ["Office", "Home office"],
            social: "Small team (5-10 people), collaborative culture",
            technology: ["Slack", "Notion", "Figma", "Google Workspace"],
        },
        professional: {
            experience: 5,
            companySize: "Startup (10-50)",
            teamSize: 8,
        },
        scenarios: {
            typicalDay: "Sarah starts her day reviewing team priorities in Notion. She notices a workflow bottleneck and wishes she could quickly prototype a solution without waiting for engineering. She spends 30 minutes searching for no-code tools that might help.",
            success: "Sarah finds a tool that lets her build a custom workflow in 15 minutes. Her team adopts it immediately, and productivity increases by 20%. She feels empowered to solve problems independently.",
            failure: "Sarah tries a tool that requires too much technical knowledge. She gets frustrated, gives up, and the problem persists. Her team continues to work around the bottleneck manually.",
        },
    },
    secondaryPersona: {
        name: "Marcus Johnson",
        role: "Operations Lead",
        age: 38,
        occupation: "Enterprise Corp",
        goal: "Automate repetitive business processes",
        quote: "If I can't explain it to my team in 5 minutes, it's too complicated.",
        background: "Marcus manages operations for a 200-person company. He's been in operations for 12 years and values proven, reliable solutions over cutting-edge tech.",
        technicalProficiency: "beginner",
        motivations: ["Reliability", "Cost savings", "Scalability"],
        values: ["Stability", "Security", "ROI"],
        demographics: {
            ageRange: { min: 33, max: 43 },
            location: "Chicago, IL",
            education: "Bachelor's in Business",
            income: "$80k-$120k",
        },
        environment: {
            physical: ["Office"],
            social: "Large team (50+ people), hierarchical structure",
            technology: ["Microsoft Office", "Salesforce", "SAP"],
        },
        professional: {
            experience: 12,
            companySize: "Enterprise (200+)",
            teamSize: 50,
        },
        scenarios: {
            typicalDay: "Marcus reviews daily operations reports and identifies several manual processes that could be automated. He researches enterprise automation tools but finds most require IT department approval and long implementation cycles.",
            success: "Marcus finds a tool that integrates with existing systems and can be implemented without IT. He automates 3 processes in the first month, saving 10 hours per week.",
            failure: "Marcus chooses a tool that requires extensive IT support. Implementation takes 6 months, and by the time it's ready, the business needs have changed. The ROI is negative.",
        },
    },
    painPoints: [
        {
            id: "pp-1",
            description: "Lack of technical skills to build custom solutions",
            priority: "high",
        },
        {
            id: "pp-2",
            description: "Time-consuming manual processes",
            priority: "medium",
        },
        {
            id: "pp-3",
            description: "Difficulty communicating needs to technical teams",
            priority: "high",
        },
    ],
    jtbds: [
        {
            id: "jtbd-1",
            statement: "When I need to automate a workflow, I want to do it without coding, so I can save time and focus on my core work",
            importance: 5,
        },
        {
            id: "jtbd-2",
            statement: "When my team needs a new tool, I want to build it quickly, so we can start using it immediately",
            importance: 4,
        },
        {
            id: "jtbd-3",
            statement: "When I'm stuck on a problem, I want to feel empowered to solve it myself, so I don't have to wait for others",
            importance: 4,
        },
    ],
    journey: [
        {
            id: "stage-1",
            name: "Discovery",
            description: "User becomes aware of a problem or need",
            touchpoints: ["Social media", "Word of mouth", "Search"],
        },
        {
            id: "stage-2",
            name: "Evaluation",
            description: "User researches and compares solutions",
            touchpoints: ["Website", "Documentation", "Demo"],
        },
        {
            id: "stage-3",
            name: "Adoption",
            description: "User starts using the solution",
            touchpoints: ["Onboarding", "Support", "Community"],
        },
    ],
    behaviors: [
        { id: "b-1", label: "Prefers visual interfaces", category: "preference" },
        { id: "b-2", label: "Uses mobile devices frequently", category: "technology" },
        { id: "b-3", label: "Seeks quick solutions", category: "pattern" },
    ],
};

export default function PersonasPage() {
    const [data, setData] = useState<PersonasData>(defaultPersonasData);
    const [selectedPersona, setSelectedPersona] = useState<"primary" | "secondary">("primary");
    const [sidePanelOpen, setSidePanelOpen] = useState(false);
    const [sidePanelTitle, setSidePanelTitle] = useState("");
    const [sidePanelContent, setSidePanelContent] = useState<React.ReactNode>(null);

    const updateData = (updates: Partial<PersonasData>) => {
        setData((prev) => ({
            ...prev,
            ...updates,
            primaryPersona: updates.primaryPersona || prev.primaryPersona,
            secondaryPersona: updates.secondaryPersona || prev.secondaryPersona,
            painPoints: updates.painPoints || prev.painPoints,
            jtbds: updates.jtbds || prev.jtbds,
            journey: updates.journey || prev.journey,
            behaviors: updates.behaviors || prev.behaviors,
        }));
    };

    const updatePrimaryPersona = (updates: Partial<PersonasData["primaryPersona"]>) => {
        setData((prev) => ({
            ...prev,
            primaryPersona: {
                ...prev.primaryPersona,
                ...updates,
            },
        }));
    };

    const updateSecondaryPersona = (updates: Partial<PersonasData["secondaryPersona"]>) => {
        setData((prev) => ({
            ...prev,
            secondaryPersona: {
                ...prev.secondaryPersona,
                ...updates,
            },
        }));
    };

    const openSidePanel = (title: string, content: React.ReactNode) => {
        setSidePanelTitle(title);
        setSidePanelContent(content);
        setSidePanelOpen(true);
    };

    const currentPersona = selectedPersona === "primary" ? data.primaryPersona : data.secondaryPersona;
    const updateCurrentPersona = selectedPersona === "primary" ? updatePrimaryPersona : updateSecondaryPersona;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
            {/* Header */}
            <PersonaHeader
                onRegeneratePersona={() => {
                    // TODO: Implement regeneration
                    console.log("Regenerate persona");
                }}
                onAddPersona={() => {
                    // TODO: Implement add persona
                    console.log("Add persona");
                }}
            />

            {/* Persona Selector */}
            <div className="px-6 py-3 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Viewing:</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSelectedPersona("primary")}
                            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                                selectedPersona === "primary"
                                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20"
                                    : "bg-white/70 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                            }`}
                        >
                            {data.primaryPersona.name} (Primary)
                        </button>
                        <button
                            onClick={() => setSelectedPersona("secondary")}
                            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                                selectedPersona === "secondary"
                                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20"
                                    : "bg-white/70 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                            }`}
                        >
                            {data.secondaryPersona.name} (Secondary)
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col h-[calc(100vh-140px)]">
                {/* Persona Journey Panel - Full Width */}
                <div className="px-6 pt-6 pb-4">
                    <PersonaJourneyPanel
                        persona={currentPersona}
                        painPoints={data.painPoints}
                        jtbds={data.jtbds}
                        isPrimary={selectedPersona === "primary"}
                    />
                </div>

                {/* Main Workspace - Horizontally Scrollable */}
                <div className="flex-1 overflow-x-auto overflow-y-hidden">
                    <div className="inline-flex gap-6 p-6 min-w-max h-full items-start">
                        {/* Profile Card */}
                        <ProfileCard
                            persona={currentPersona}
                            isPrimary={selectedPersona === "primary"}
                            onEdit={() => openSidePanel("Edit Profile", <div>Profile Editor</div>)}
                            onRegenerate={() => console.log("Regenerate profile")}
                        />

                        {/* Demographics & Psychographics */}
                        <DemographicsPsychographicsCard
                            persona={currentPersona}
                            onEdit={() => openSidePanel("Edit Demographics", <div>Demographics Editor</div>)}
                            onRegenerate={() => console.log("Regenerate demographics")}
                        />

                        {/* JTBD Cards */}
                        <JTBDCards
                            jtbds={data.jtbds}
                            onRegenerate={() => console.log("Regenerate JTBD")}
                        />

                        {/* Pain Points */}
                        <PainPointsCard
                            painPoints={data.painPoints}
                            onEdit={() => openSidePanel("Edit Pain Points", <div>Pain Points Editor</div>)}
                            onRegenerate={() => console.log("Regenerate pain points")}
                        />

                        {/* Workflow & Tools */}
                        <WorkflowToolsCard
                            persona={currentPersona}
                            journey={data.journey}
                            onEdit={() => openSidePanel("Edit Workflow", <div>Workflow Editor</div>)}
                            onRegenerate={() => console.log("Regenerate workflow")}
                        />

                        {/* Scenario of Use */}
                        <ScenarioCard
                            persona={currentPersona}
                            onEdit={() => openSidePanel("Edit Scenarios", <div>Scenarios Editor</div>)}
                            onRegenerate={() => console.log("Regenerate scenarios")}
                        />

                        {/* Needs → Solutions Mapping */}
                        <NeedsMappingCard
                            persona={currentPersona}
                            painPoints={data.painPoints}
                            jtbds={data.jtbds}
                            onEdit={() => openSidePanel("Edit Mapping", <div>Mapping Editor</div>)}
                            onRegenerate={() => console.log("Regenerate mapping")}
                        />

                        {/* Constraints & Triggers */}
                        <ConstraintsCard
                            persona={currentPersona}
                            onEdit={() => openSidePanel("Edit Constraints", <div>Constraints Editor</div>)}
                            onRegenerate={() => console.log("Regenerate constraints")}
                        />
                    </div>
                </div>

                {/* AI Chat Panel */}
                <div className="w-96 flex-shrink-0 border-l border-zinc-200/50 dark:border-zinc-800/50">
                    <AIChatPanel data={data} onUpdate={updateData} />
                </div>
            </div>

            {/* Side Panel */}
            <PersonaSidePanel
                isOpen={sidePanelOpen}
                onClose={() => setSidePanelOpen(false)}
                title={sidePanelTitle}
            >
                {sidePanelContent}
            </PersonaSidePanel>
        </div>
    );
}
