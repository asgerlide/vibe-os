export interface ParsedCommand {
    action: "update" | "add" | "remove" | "set" | "change";
    target: "primaryPersona" | "secondaryPersona" | "age" | "demographics" | "painPoint" | "jtbd" | "behavior" | "journey";
    field?: string;
    value?: string | number | { [key: string]: any };
    personaType?: "primary" | "secondary";
    confidence: number;
    rawCommand: string;
}

export function parseCommand(command: string): ParsedCommand | null {
    const lowerCommand = command.toLowerCase().trim();
    
    // Default response
    const defaultResult: ParsedCommand = {
        action: "update",
        target: "primaryPersona",
        confidence: 0.3,
        rawCommand: command,
    };

    // Age-related commands - check for age ranges first
    const ageRangePattern = /(?:we\s+should\s+use|use|should\s+use|age\s+(?:should\s+be|is|to|should)|change|update|set)\s+age\s+(?:to\s+)?(\d+)[-\s]+(\d+)/i;
    const ageRangeMatch = lowerCommand.match(ageRangePattern);
    if (ageRangeMatch) {
        return {
            action: "set",
            target: "age",
            value: { min: parseInt(ageRangeMatch[1]), max: parseInt(ageRangeMatch[2]) },
            confidence: 0.9,
            rawCommand: command,
        };
    }

    // Single age
    const singleAgePattern = /age\s+(?:should\s+be|is|to|should)\s+(\d+)/i;
    const singleAgeMatch = lowerCommand.match(singleAgePattern);
    if (singleAgeMatch) {
        const age = parseInt(singleAgeMatch[1]);
        return {
            action: "set",
            target: "age",
            value: { min: age - 5, max: age + 5 },
            confidence: 0.9,
            rawCommand: command,
        };
    }

    // Younger/older
    if (/(make|change)\s+(them|the\s+persona|persona)\s+younger/i.test(lowerCommand)) {
        return {
            action: "update",
            target: "age",
            value: "decrease",
            confidence: 0.8,
            rawCommand: command,
        };
    }
    if (/(make|change)\s+(them|the\s+persona|persona)\s+older/i.test(lowerCommand)) {
        return {
            action: "update",
            target: "age",
            value: "increase",
            confidence: 0.8,
            rawCommand: command,
        };
    }

    // Persona name changes
    if (/change\s+(primary|secondary)?\s*persona\s+name\s+to\s+(.+)/i.test(lowerCommand)) {
        const match = lowerCommand.match(/change\s+(primary|secondary)?\s*persona\s+name\s+to\s+(.+)/i);
        if (match) {
            return {
                action: "update",
                target: match[1] ? `${match[1]}Persona` as "primaryPersona" | "secondaryPersona" : "primaryPersona",
                field: "name",
                value: match[2].trim(),
                personaType: match[1] as "primary" | "secondary" | undefined,
                confidence: 0.9,
                rawCommand: command,
            };
        }
    }

    // Role changes
    if (/change\s+(primary|secondary)?\s*persona\s+role\s+to\s+(.+)/i.test(lowerCommand) ||
        /(the\s+)?role\s+(should\s+be|is|to)\s+(.+)/i.test(lowerCommand)) {
        const match = lowerCommand.match(/(?:change\s+(?:primary|secondary)?\s*persona\s+role\s+to|(?:the\s+)?role\s+(?:should\s+be|is|to))\s+(.+)/i);
        if (match) {
            return {
                action: "update",
                target: "primaryPersona",
                field: "role",
                value: match[1].trim(),
                confidence: 0.85,
                rawCommand: command,
            };
        }
    }

    // Goal changes
    if (/change\s+(primary|secondary)?\s*persona\s+goal\s+to\s+(.+)/i.test(lowerCommand) ||
        /(the\s+)?goal\s+(should\s+be|is|to)\s+(.+)/i.test(lowerCommand)) {
        const match = lowerCommand.match(/(?:change\s+(?:primary|secondary)?\s*persona\s+goal\s+to|(?:the\s+)?goal\s+(?:should\s+be|is|to))\s+(.+)/i);
        if (match) {
            return {
                action: "update",
                target: "primaryPersona",
                field: "goal",
                value: match[1].trim(),
                confidence: 0.85,
                rawCommand: command,
            };
        }
    }

    // Occupation changes
    if (/change\s+occupation\s+to\s+(.+)/i.test(lowerCommand) ||
        /occupation\s+(should\s+be|is|to)\s+(.+)/i.test(lowerCommand)) {
        const match = lowerCommand.match(/(?:change\s+occupation\s+to|occupation\s+(?:should\s+be|is|to))\s+(.+)/i);
        if (match) {
            return {
                action: "update",
                target: "primaryPersona",
                field: "occupation",
                value: match[1].trim(),
                confidence: 0.85,
                rawCommand: command,
            };
        }
    }

    // Add pain point
    if (/add\s+pain\s+point\s+(.+)/i.test(lowerCommand)) {
        const match = lowerCommand.match(/add\s+pain\s+point\s+(.+)/i);
        if (match) {
            return {
                action: "add",
                target: "painPoint",
                value: match[1].trim(),
                confidence: 0.9,
                rawCommand: command,
            };
        }
    }

    // Remove pain point
    if (/remove\s+pain\s+point\s+(.+)/i.test(lowerCommand)) {
        const match = lowerCommand.match(/remove\s+pain\s+point\s+(.+)/i);
        if (match) {
            return {
                action: "remove",
                target: "painPoint",
                value: match[1].trim(),
                confidence: 0.9,
                rawCommand: command,
            };
        }
    }

    // General persona update - catch-all for "I don't think the persona is right"
    if (/persona\s+(isn't|is\s+not|should\s+be|needs?\s+to\s+be)/i.test(lowerCommand) ||
        /(don't|do\s+not)\s+think\s+(the\s+)?persona/i.test(lowerCommand)) {
        // Try to extract what should change
        if (/age/i.test(lowerCommand)) {
            const ageMatch = lowerCommand.match(/(\d+)[-\s]+(\d+)/);
            if (ageMatch) {
                return {
                    action: "set",
                    target: "age",
                    value: { min: parseInt(ageMatch[1]), max: parseInt(ageMatch[2]) },
                    confidence: 0.7,
                    rawCommand: command,
                };
            }
        }
        
        // Generic update - low confidence
        return {
            action: "update",
            target: "primaryPersona",
            confidence: 0.5,
            rawCommand: command,
        };
    }

    // If no pattern matches, return null
    return null;
}

