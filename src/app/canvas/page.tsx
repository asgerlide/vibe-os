"use client";

import React, { useCallback, useMemo } from "react";
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Background,
    Controls,
    useStore,
    ReactFlowProvider,
    useReactFlow,
    NodeProps,
    MarkerType,
    BaseEdge,
    EdgeProps,
    getSmoothStepPath,
    getBezierPath,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion } from "framer-motion";

import { TopBar } from "@/components/layout/TopBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { CanvasBackground } from "@/components/canvas/CanvasBackground";
import { CustomNode } from "@/components/nodes/CustomNode";
import { CustomPlaceholderNode } from "@/components/nodes/CustomPlaceholderNode";
import { NodeSideMenu } from "@/components/canvas/NodeSideMenu";
import { MarketAnalysisNode } from "@/components/nodes/MarketAnalysisNode";
import { PersonasNode } from "@/components/nodes/PersonasNode";
import { IdeaNode } from "@/components/nodes/IdeaNode";
import { ArchitectureNode } from "@/components/nodes/ArchitectureNode";
import { ValuePropositionNode } from "@/components/nodes/ValuePropositionNode";
import { FeaturesNode } from "@/components/nodes/FeaturesNode";
import { UIUXNode } from "@/components/nodes/UIUXNode";
import { NamingNode } from "@/components/nodes/NamingNode";
import { OutputNode } from "@/components/nodes/OutputNode";
import { JunctionNode } from "@/components/nodes/JunctionNode";

// Node height mapping for center-based alignment
// Heights calculated based on actual component content and Tailwind classes
// Note: These are approximate - actual rendered heights may vary slightly due to line-height, font rendering, etc.
const NODE_HEIGHTS: Record<string, number> = {
    'idea': 240,
    'personas': 236,
    'marketAnalysis': 280,
    'architecture': 248, // p-4 (32px) + header (36px) + title (40px) + tech stack (80px) + infrastructure (60px)
    'valueProposition': 326, // p-6 (48px) + header (36px) + tagline (44px) + target market (46px) + charts (152px)
    'uiux': 472, // p-6 (48px) + header (36px) + title (56px) + colors (120px) + typography (148px) + design style (62px) + border (2px)
    'features': 318, // p-6 (48px) + header (36px) + title (56px) + features grid (104px) + requirements (72px) + border (2px)
    'naming': 190,
    'outputNode': 320,
};

// Column X coordinates - consistent spacing
const COLUMN_X = {
    COL_1: 100,   // Idea
    COL_2: 600,   // Personas, Market, Tech
    COL_3: 1150,  // Value Prop
    COL_4: 1700,  // UI/UX, Features
    COL_5: 2250,  // Output
    NAMING_X: 1425, // Naming (between Col 3 and 4)
};

// Equal gap spacing between cards (visual gap between card edges)
const EQUAL_GAP = 50; // pixels between card edges

// Row spacing - controls vertical spacing between row centers
const ROW_SPACING = 200; // pixels between row centers (increased from ~100px default)

// Helper function to calculate top Y position from center Y and node type
const getTopY = (centerY: number, nodeType: string): number => {
    const height = NODE_HEIGHTS[nodeType] || 250; // Default fallback
    return centerY - (height / 2);
};

// Calculate structured row centers and Column 2 positions
// Market must align with Row 3, so we position Market first, then calculate Personas and Tech with equal gaps
const calculateStructuredLayout = () => {
    const personasHeight = NODE_HEIGHTS['personas'];
    const marketHeight = NODE_HEIGHTS['marketAnalysis'];
    const techHeight = NODE_HEIGHTS['architecture'];
    
    // Row 3 is fixed - Market must align with Idea and Output
    // Start with a base Y position and use ROW_SPACING to space rows
    const ROW_3_CENTER = 400; // Increased from 350 to add more spacing
    const marketCenterY = ROW_3_CENTER;
    const marketTop = getTopY(marketCenterY, 'marketAnalysis');
    const marketBottom = marketTop + marketHeight;
    
    // Calculate Personas position with equal gap above Market
    const personasBottom = marketTop - EQUAL_GAP;
    const personasTop = personasBottom - personasHeight;
    const personasCenterY = personasTop + (personasHeight / 2);
    
    // Calculate Tech position with equal gap below Market
    const techTop = marketBottom + EQUAL_GAP;
    const techCenterY = techTop + (techHeight / 2);
    
    // Row centers with increased spacing
    // Row 2 is positioned above Row 3 with ROW_SPACING
    const ROW_2_CENTER = ROW_3_CENTER - ROW_SPACING; // Value Prop, UI/UX
    const ROW_1_CENTER = personasCenterY; // Personas (calculated from equal gaps)
    const ROW_4_CENTER = techCenterY; // Tech, Features (calculated from equal gaps)
    
    // Naming is positioned between Row 3 and Row 4
    const NAMING_CENTER = (ROW_3_CENTER + ROW_4_CENTER) / 2;
    
    return {
        rowCenters: {
            ROW_1: ROW_1_CENTER,
            ROW_2: ROW_2_CENTER,
            ROW_3: ROW_3_CENTER,
            ROW_4: ROW_4_CENTER,
            NAMING: NAMING_CENTER,
        },
        column2Positions: {
            personas: personasTop,
            market: marketTop,
            tech: techTop,
        },
    };
};

// Pre-calculate structured layout
const LAYOUT = calculateStructuredLayout();
const ROW_CENTERS = LAYOUT.rowCenters;
const COLUMN2_POSITIONS = LAYOUT.column2Positions;

// Custom edge for 90° angled connectors (straightStep style)
// Creates perfectly straight horizontal, then vertical, then horizontal lines
function StraightStepEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style, markerEnd }: EdgeProps) {
    // Calculate the midpoint X coordinate for the vertical segment
    // For horizontal connections, use halfway point
    const midX = sourceX + (targetX - sourceX) / 2;
    
    // Create path: horizontal from source, vertical drop/rise, horizontal to target
    const path = `M ${sourceX} ${sourceY} 
                  L ${midX} ${sourceY} 
                  L ${midX} ${targetY} 
                  L ${targetX} ${targetY}`;
    
    return (
        <BaseEdge
            id={id}
            path={path}
            style={style}
            markerEnd={markerEnd}
        />
    );
}

// Custom edge for Value → Features with vertical drop (90° angled)
function VerticalDropEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style, markerEnd }: EdgeProps) {
    // Horizontal from source, then vertical drop, then horizontal to target
    const waypointX = sourceX + Math.max(50, (targetX - sourceX) * 0.3);
    const path = `M ${sourceX} ${sourceY} 
                  L ${waypointX} ${sourceY} 
                  L ${waypointX} ${targetY} 
                  L ${targetX} ${targetY}`;
    
    return (
        <BaseEdge
            id={id}
            path={path}
            style={style}
            markerEnd={markerEnd}
        />
    );
}

// Initial Nodes
const initialNodes = [
    // Column 1: Idea - Row 3 (center-aligned with Market and Output)
    {
        id: "root", type: "idea", position: { x: COLUMN_X.COL_1, y: getTopY(ROW_CENTERS.ROW_3, 'idea') }, data: {
            label: "Idea",
            type: "root",
            ideaName: "VibeOS",
            description: "A visual canvas for product development",
            targetAudience: "Product Teams",
            valueProposition: "Transform ideas into structured product specifications through an intuitive, visual workflow"
        }
    },
    // Column 2: Personas, Market, Tech - equal visual gaps between cards
    {
        id: "child-1", type: "personas", position: { x: COLUMN_X.COL_2, y: COLUMN2_POSITIONS.personas }, data: {
            label: "Personas & JTBD",
            type: "child",
            primaryPersona: {
                name: "Sarah Chen",
                role: "Product Manager",
                age: 32,
                occupation: "Tech Startup",
                goal: "Streamline team workflows without coding"
            },
            secondaryPersona: {
                name: "Marcus Johnson",
                role: "Operations Lead",
                age: 38,
                occupation: "Enterprise Corp",
                goal: "Automate repetitive business processes"
            }
        }
    },
    // Market - Row 3 (aligns with Idea and Output), with equal gaps above and below
    {
        id: "child-2", type: "marketAnalysis", position: { x: COLUMN_X.COL_2, y: COLUMN2_POSITIONS.market }, data: {
            label: "Market & Competitors",
            type: "child",
            marketDefinition: "No-Code Productivity",
            marketShare: 18,
            growthRate: 24,
            competitors: ["Microsoft", "Notion", "Airtable", "+2"],
            chartData: [45, 52, 48, 58, 54, 62, 75]
        }
    },
    // Tech - Row 4 (aligns with Features), positioned with equal gap below Market
    {
        id: "child-3", type: "architecture", position: { x: COLUMN_X.COL_2, y: COLUMN2_POSITIONS.tech }, data: {
            label: "Architecture & Tech Notes",
            type: "child",
            techStack: ["Next.js", "TypeScript", "PostgreSQL", "TailwindCSS"],
            infrastructure: "Vercel + Supabase",
            technicalNotes: "Focus on scalability and developer experience. Use serverless architecture where possible."
        }
    },
    // Column 3: Value Prop - Row 2 (center-aligned with UI/UX)
    {
        id: "valueProp",
        type: "placeholder",
        position: { x: COLUMN_X.COL_3, y: getTopY(ROW_CENTERS.ROW_2, 'valueProposition') },
        data: {
            label: "Value Proposition & Positioning",
            type: "child",
            tagline: "Transform ideas into reality",
            targetMarket: "Product teams and entrepreneurs",
            problem: "Teams struggle to organize and communicate product vision effectively",
            solution: "Visual canvas that structures thinking and aligns stakeholders",
            differentiation: "Intuitive, visual-first approach vs text-heavy docs"
        }
    },
    // Naming & Story - positioned between Column 3 and 4, between Row 3 and 4
    {
        id: "naming",
        type: "placeholder",
        position: { x: COLUMN_X.NAMING_X, y: getTopY(ROW_CENTERS.NAMING, 'naming') },
        data: {
            label: "Naming & Story",
            type: "child",
            productName: "VibeOS",
            tagline: "Where ideas become reality",
            brandVoice: ["Professional", "Innovative", "Friendly"],
            originStory: "Born from the need to bridge the gap between ideation and execution, VibeOS transforms scattered thoughts into structured product specifications."
        }
    },
    // Column 4: UI/UX, Features - center-aligned
    // Row 2: UI/UX (center-aligned with Value Prop)
    {
        id: "uiux",
        type: "placeholder",
        position: { x: COLUMN_X.COL_4, y: getTopY(ROW_CENTERS.ROW_2, 'uiux') },
        data: {
            label: "UI/UX Framework",
            type: "child",
            primaryColor: "#f97316",
            secondaryColor: "#71717a",
            typography: "Inter",
            components: ["Cards", "Navigation", "Forms", "Charts"],
            accessibility: "WCAG 2.1 AA"
        }
    },
    // Row 4: Features (center-aligned with Tech)
    {
        id: "features",
        type: "placeholder",
        position: { x: COLUMN_X.COL_4, y: getTopY(ROW_CENTERS.ROW_4, 'features') },
        data: {
            label: "Features & Requirements",
            type: "child",
            coreFeatures: [
                { name: "Visual Canvas", icon: "Layout", priority: "high" },
                { name: "Real-time Collaboration", icon: "Users", priority: "high" },
                { name: "Export to Markdown", icon: "FileText", priority: "medium" },
                { name: "Custom Themes", icon: "Palette", priority: "low" },
            ],
            mustHave: 3,
            niceToHave: 1
        }
    },
    // Column 5: Output - Row 3 (center-aligned with Idea and Market)
    {
        id: "output",
        type: "placeholder",
        position: { x: COLUMN_X.COL_5, y: getTopY(ROW_CENTERS.ROW_3, 'outputNode') },
        data: {
            label: "Output",
            type: "child",
            deliverableType: "Product Specification",
            status: "Ready",
            summary: "Complete product blueprint with user personas, market analysis, technical architecture, and feature specifications",
            completionPercentage: 100
        }
    },
];

// Initial Edges - All using 90° angled connectors (straightStep or verticalDrop)
const initialEdges = [
    // Layer 1 → Layer 2: Idea to Personas, Market, Tech (all 90° angled)
    { id: "e1", source: "root", target: "child-1", type: "straightStep", markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
    { id: "e2", source: "root", target: "child-2", type: "straightStep", markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
    { id: "e3", source: "root", target: "child-3", type: "straightStep", markerEnd: { type: MarkerType.ArrowClosed }, animated: true },

    // Layer 2 → Layer 3: Personas and Market to Value Proposition (90° angled)
    { id: "e4", source: "child-1", target: "valueProp", type: "straightStep", markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
    { id: "e5", source: "child-2", target: "valueProp", type: "straightStep", markerEnd: { type: MarkerType.ArrowClosed }, animated: true },

    // Layer 3 → Layer 4: Value Proposition to UI/UX, Features, and Naming (all 90° angled)
    { id: "e6", source: "valueProp", sourceHandle: "right", target: "uiux", type: "straightStep", markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
    { 
        id: "e7", 
        source: "valueProp", 
        sourceHandle: "right", 
        target: "features", 
        type: "verticalDrop", 
        markerEnd: { type: MarkerType.ArrowClosed }, 
        animated: true
    },
    { id: "e8", source: "valueProp", sourceHandle: "bottom", target: "naming", type: "straightStep", markerEnd: { type: MarkerType.ArrowClosed }, animated: true },

    // Layer 2 (Tech) → Layer 4: Tech connects directly to Features (90° angled)
    { id: "e10", source: "child-3", target: "features", type: "straightStep", markerEnd: { type: MarkerType.ArrowClosed }, animated: true },

    // Naming → Features (90° angled)
    { id: "e9", source: "naming", sourceHandle: "right", target: "features", type: "straightStep", markerEnd: { type: MarkerType.ArrowClosed }, animated: true },

    // Layer 4 → Layer 5: UI/UX and Features to Output (90° angled)
    { id: "e11", source: "uiux", target: "output", targetHandle: "input", type: "straightStep", markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
    { id: "e12", source: "features", target: "output", targetHandle: "input", type: "straightStep", markerEnd: { type: MarkerType.ArrowClosed }, animated: true },
];

// Wrapper to access internal React Flow state for the background
function CanvasContent({
    activatedNodes,
    setActivatedNodes
}: {
    activatedNodes: Set<string>;
    setActivatedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // Track selected node for side menu
    const [selectedNode, setSelectedNode] = React.useState<{ id: string; label: string; type?: string } | null>(null);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } }, eds)),
        [setEdges]
    );

    // Handle placeholder activation - convert to custom node type
    const handlePlaceholderClick = useCallback((nodeId: string, label: string) => {
        setActivatedNodes((prev) => new Set([...prev, nodeId]));

        // Convert placeholder to the appropriate custom node type
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id !== nodeId) return node;

                // Map node IDs to their custom types
                // Note: Using 'outputNode' instead of 'output' to avoid React Flow's default output node styles
                const typeMap: Record<string, string> = {
                    'valueProp': 'valueProposition',
                    'features': 'features',
                    'uiux': 'uiux',
                    'naming': 'naming',
                    'output': 'outputNode'
                };

                return { ...node, type: typeMap[nodeId] || 'custom' };
            })
        );

        // Update incoming edges to ensure they connect to the correct handle
        // This is especially important for the output node which has a specific handle ID
        setEdges((eds) =>
            eds.map((edge) => {
                if (edge.target !== nodeId) return edge;
                
                // For output node, ensure edges target the 'input' handle
                if (nodeId === 'output') {
                    return { 
                        ...edge, 
                        animated: false,
                        targetHandle: 'input' // Explicitly set the target handle
                    };
                }
                
                return { ...edge, animated: false };
            })
        );
    }, [setNodes, setEdges]);

    // Handle custom node click
    const handleNodeClick = useCallback((nodeId: string, label: string, type?: string) => {
        setSelectedNode({ id: nodeId, label, type });
    }, []);

    // Filter visible nodes based on activation
    const visibleNodes = useMemo(() => {
        return nodes.filter((node) => {
            // Always show activated nodes
            if (activatedNodes.has(node.id)) return true;

            // Placeholder visibility logic
            if (node.id === 'valueProp') {
                return activatedNodes.has('child-1') || activatedNodes.has('child-2');
            }
            if (node.id === 'features') {
                return activatedNodes.has('child-3') || activatedNodes.has('valueProp');
            }
            if (node.id === 'uiux') {
                return activatedNodes.has('valueProp');
            }
            if (node.id === 'naming') {
                return activatedNodes.has('valueProp');
            }
            if (node.id === 'output') {
                return activatedNodes.has('uiux') || activatedNodes.has('features');
            }

            return false;
        });
    }, [nodes, activatedNodes]);

    // Filter visible edges based on visible nodes
    const visibleEdges = useMemo(() => {
        const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));
        return edges.filter(
            (edge) => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
        );
    }, [edges, visibleNodes]);

    // Custom node types with click handlers
    const nodeTypes = useMemo(() => ({
        idea: React.memo((props: NodeProps) => (
            <div onClick={() => handleNodeClick(props.id, props.data.label as string, props.data.type as string)}>
                <IdeaNode {...props} />
            </div>
        )),
        custom: React.memo((props: NodeProps) => (
            <div onClick={() => handleNodeClick(props.id, props.data.label as string, props.data.type as string)}>
                <CustomNode {...props} />
            </div>
        )),
        marketAnalysis: React.memo((props: NodeProps) => (
            <div onClick={() => handleNodeClick(props.id, props.data.label as string, props.data.type as string)}>
                <MarketAnalysisNode {...props} />
            </div>
        )),
        personas: React.memo((props: NodeProps) => (
            <div onClick={() => handleNodeClick(props.id, props.data.label as string, props.data.type as string)}>
                <PersonasNode {...props} />
            </div>
        )),
        architecture: React.memo((props: NodeProps) => (
            <div onClick={() => handleNodeClick(props.id, props.data.label as string, props.data.type as string)}>
                <ArchitectureNode {...props} />
            </div>
        )),
        placeholder: React.memo((props: NodeProps) => (
            <div onClick={() => handlePlaceholderClick(props.id, props.data.label as string)}>
                <CustomPlaceholderNode {...props} />
            </div>
        )),
        valueProposition: React.memo((props: NodeProps) => (
            <div onClick={() => handleNodeClick(props.id, props.data.label as string, props.data.type as string)}>
                <ValuePropositionNode {...props} />
            </div>
        )),
        features: React.memo((props: NodeProps) => (
            <div onClick={() => handleNodeClick(props.id, props.data.label as string, props.data.type as string)}>
                <FeaturesNode {...props} />
            </div>
        )),
        uiux: React.memo((props: NodeProps) => (
            <div onClick={() => handleNodeClick(props.id, props.data.label as string, props.data.type as string)}>
                <UIUXNode {...props} />
            </div>
        )),
        naming: React.memo((props: NodeProps) => (
            <div onClick={() => handleNodeClick(props.id, props.data.label as string, props.data.type as string)}>
                <NamingNode {...props} />
            </div>
        )),
        outputNode: React.memo((props: NodeProps) => (
            <div onClick={() => handleNodeClick(props.id, props.data.label as string, props.data.type as string)}>
                <OutputNode {...props} />
            </div>
        )),
        junction: React.memo((props: NodeProps) => (
            <JunctionNode {...props} />
        ))
    }), [handlePlaceholderClick, handleNodeClick]);

    // Custom edge types - all 90° angled
    const edgeTypes = useMemo(() => ({
        straightStep: StraightStepEdge,
        verticalDrop: VerticalDropEdge,
    }), []);

    return (
        <div className="h-full w-full">
            <ReactFlow
                nodes={visibleNodes}
                edges={visibleEdges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                className="bg-transparent"
                minZoom={0.1}
                maxZoom={4}
                defaultEdgeOptions={{
                    type: 'smoothstep',
                    animated: false,
                    style: { stroke: '#71717a', strokeWidth: 2 }, // zinc-500 for better visibility
                    markerEnd: { type: MarkerType.ArrowClosed, color: '#71717a' },
                }}
            >
                <CanvasBackground />
                <Controls className="!bg-white/80 !backdrop-blur-md !border-zinc-200 dark:!bg-zinc-900/80 dark:!border-zinc-800 [&>button]:!border-zinc-200 dark:[&>button]:!border-zinc-800 [&>button]:!text-zinc-700 dark:[&>button]:!text-zinc-300" />
            </ReactFlow>

            {/* Side Menu */}
            <NodeSideMenu
                isOpen={selectedNode !== null}
                onClose={() => setSelectedNode(null)}
                nodeData={selectedNode}
            />
        </div>
    );
}

export default function CanvasPage() {
    // Track which nodes have been activated (clicked)
    const [activatedNodes, setActivatedNodes] = React.useState<Set<string>>(
        new Set(['root', 'child-1', 'child-2', 'child-3']) // Start with main nodes active
    );

    return (
        <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex h-screen w-full flex-col bg-zinc-50 dark:bg-black"
        >
            <TopBar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar activatedNodes={activatedNodes} />
                <div className="relative flex-1 overflow-hidden">
                    <ReactFlowProvider>
                        <CanvasContent
                            activatedNodes={activatedNodes}
                            setActivatedNodes={setActivatedNodes}
                        />
                    </ReactFlowProvider>
                </div>
            </div>
        </motion.div>
    );
}
