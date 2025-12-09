"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { parseCommand, ParsedCommand } from "@/lib/commandParser";
import { PersonasData } from "@/types/personas";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    parsedCommand?: ParsedCommand;
}

interface AIChatPanelProps {
    data: PersonasData;
    onUpdate: (updates: Partial<PersonasData>) => void;
}

export function AIChatPanel({ data, onUpdate }: AIChatPanelProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Hi! I can help you refine your personas. Try saying something like 'change the age to 18-30' or 'update the primary persona's role to Designer'.",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isProcessing) return;

        const userMessage: Message = {
            id: `msg-${Date.now()}`,
            role: "user",
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsProcessing(true);

        // Parse the command
        const parsed = parseCommand(input.trim());

        // Simulate AI processing delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (parsed) {
            // Apply the command
            applyCommand(parsed);
            
            const assistantMessage: Message = {
                id: `msg-${Date.now() + 1}`,
                role: "assistant",
                content: generateResponse(parsed),
                timestamp: new Date(),
                parsedCommand: parsed,
            };
            setMessages((prev) => [...prev, assistantMessage]);
        } else {
            const assistantMessage: Message = {
                id: `msg-${Date.now() + 1}`,
                role: "assistant",
                content: "I didn't quite understand that. Could you rephrase? For example, you could say 'change age to 25-35' or 'update the persona name to John'.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, assistantMessage]);
        }

        setIsProcessing(false);
    };

    const applyCommand = (command: ParsedCommand) => {
        const updates: Partial<PersonasData> = {};

        if (command.target === "age" && command.action === "set" && typeof command.value === "object") {
            const ageRange = command.value as { min: number; max: number };
            const avgAge = Math.round((ageRange.min + ageRange.max) / 2);
            updates.primaryPersona = {
                ...data.primaryPersona,
                age: avgAge,
                demographics: {
                    ...data.primaryPersona.demographics,
                    ageRange,
                },
            };
        } else if (command.target === "primaryPersona" || command.target === "secondaryPersona") {
            const persona = command.target === "primaryPersona" ? data.primaryPersona : data.secondaryPersona;
            if (command.field && command.value) {
                updates[command.target] = {
                    ...persona,
                    [command.field]: command.value,
                };
            }
        } else if (command.target === "painPoint" && command.action === "add") {
            updates.painPoints = [
                ...data.painPoints,
                {
                    id: `pp-${Date.now()}`,
                    description: String(command.value),
                    priority: "medium",
                },
            ];
        } else if (command.target === "painPoint" && command.action === "remove") {
            updates.painPoints = data.painPoints.filter(
                (pp) => !pp.description.toLowerCase().includes(String(command.value).toLowerCase())
            );
        }

        if (Object.keys(updates).length > 0) {
            onUpdate(updates);
        }
    };

    const generateResponse = (command: ParsedCommand): string => {
        if (command.target === "age") {
            if (typeof command.value === "object") {
                const range = command.value as { min: number; max: number };
                return `I've updated the age range to ${range.min}-${range.max} years old.`;
            }
            return "I've updated the age information.";
        } else if (command.target === "primaryPersona" || command.target === "secondaryPersona") {
            const personaType = command.target === "primaryPersona" ? "primary" : "secondary";
            if (command.field) {
                return `I've updated the ${personaType} persona's ${command.field} to "${command.value}".`;
            }
        } else if (command.target === "painPoint") {
            if (command.action === "add") {
                return `I've added a new pain point: "${command.value}".`;
            } else if (command.action === "remove") {
                return `I've removed the pain point.`;
            }
        }
        return "I've made the requested changes.";
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800">
            {/* Header */}
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            AI Assistant
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Ask me to update your personas
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            {message.role === "assistant" && (
                                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                            )}
                            <div
                                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                    message.role === "user"
                                        ? "bg-orange-500 text-white"
                                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                                }`}
                            >
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                            {message.role === "user" && (
                                <div className="w-8 h-8 rounded-full bg-zinc-500 flex items-center justify-center flex-shrink-0">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
                {isProcessing && (
                    <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-2">
                            <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                        placeholder="Type a command... (e.g., 'change age to 18-30')"
                        className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        disabled={isProcessing}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isProcessing}
                        className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                    Try: "change age to 18-30", "update role to Designer", "add pain point..."
                </p>
            </div>
        </div>
    );
}






