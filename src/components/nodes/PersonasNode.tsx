import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { motion } from "framer-motion";
import { User, Briefcase } from "lucide-react";
import { usePersonaStore } from "@/lib/persona/store";

interface PersonaDisplay {
    name: string;
    role: string;
    age?: number;
    occupation?: string;
    goal?: string;
    avatar?: string;
    type?: string;
    matchScore?: number;
}

export const PersonasNode = React.memo(({ data }: NodeProps) => {
    const { personas } = usePersonaStore();
    const nodeData = data as Record<string, unknown>;

    // Use store data if available, otherwise fall back to node data or defaults
    const primaryPersona: PersonaDisplay = personas.find(p => p.type === "Primary") || 
        (nodeData.primaryPersona as PersonaDisplay) || {
            name: "No persona yet",
            role: "Generate personas first",
            age: 0,
            occupation: "—",
            goal: "—"
        };

    const secondaryPersona: PersonaDisplay = personas.find(p => p.type === "Secondary") || 
        (nodeData.secondaryPersona as PersonaDisplay) || {
            name: "No persona yet",
            role: "Generate personas first",
            age: 0,
            occupation: "—",
            goal: "—"
        };

    const hasPersonas = personas.length > 0;

    const PersonaCard = ({ persona, isPrimary }: { persona: PersonaDisplay; isPrimary: boolean }) => (
        <div className={`flex-1 min-w-0 p-3 rounded-lg border ${isPrimary
            ? 'bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900'
            : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700'
            }`}>
            {/* Avatar and Name */}
            <div className="flex items-start gap-3 mb-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg ${isPrimary
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600'
                    : 'bg-gradient-to-br from-zinc-500 to-zinc-600'
                    }`}>
                    {persona.avatar || persona.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100 truncate">
                            {persona.name}
                        </h3>
                        {isPrimary && hasPersonas && (
                            <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-orange-500 text-white rounded">
                                Primary
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {persona.role}
                    </p>
                </div>
            </div>

            {/* Demographics */}
            {hasPersonas && persona.age && persona.age > 0 && (
                <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-xs">
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="text-zinc-600 dark:text-zinc-400">{persona.age} years old</span>
                    </div>
                    {persona.occupation && (
                        <div className="flex items-center gap-2 text-xs">
                            <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                            <span className="text-zinc-600 dark:text-zinc-400 truncate">{persona.occupation}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Match Score */}
            {hasPersonas && persona.matchScore && (
                <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${persona.matchScore}%` }}
                        />
                    </div>
                    <span className="text-xs font-medium text-zinc-500">{persona.matchScore}%</span>
                </div>
            )}
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-[420px]"
        >
            {/* Input Handle (Left) */}
            <Handle
                type="target"
                position={Position.Left}
                className="!h-3 !w-3 !rounded-full !border-2 !border-white !bg-zinc-400 dark:!bg-zinc-600 !shadow-sm"
            />

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow p-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                    <div className={`w-2 h-2 rounded-full ${hasPersonas ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                    <h3 className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                        Personas & JTBD
                    </h3>
                    {hasPersonas && (
                        <span className="ml-auto text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            AI Generated
                        </span>
                    )}
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Target Users
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                    {hasPersonas ? `${personas.length} personas generated` : "Understanding who we're building for"}
                </p>

                {/* Personas */}
                <div className="flex gap-2">
                    <PersonaCard persona={primaryPersona} isPrimary={true} />
                    <PersonaCard persona={secondaryPersona} isPrimary={false} />
                </div>
            </div>

            {/* Output Handle (Right) */}
            <Handle
                type="source"
                position={Position.Right}
                className="!h-3 !w-3 !rounded-full !border-2 !border-white !bg-zinc-400 dark:!bg-zinc-600 !shadow-sm"
            />
        </motion.div>
    );
});

PersonasNode.displayName = "PersonasNode";
