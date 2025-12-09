"use client";

import React, { useState, useRef, useEffect } from "react";
import { Edit2, Check, X } from "lucide-react";
import { motion } from "framer-motion";

interface EditableFieldProps {
    value: string | number;
    onSave: (value: string | number) => void;
    label?: string;
    type?: "text" | "number" | "textarea";
    placeholder?: string;
    className?: string;
    multiline?: boolean;
}

export function EditableField({
    value,
    onSave,
    label,
    type = "text",
    placeholder,
    className = "",
    multiline = false,
}: EditableFieldProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(String(value));
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            if (inputRef.current instanceof HTMLInputElement) {
                inputRef.current.select();
            }
        }
    }, [isEditing]);

    const handleSave = () => {
        const finalValue = type === "number" ? Number(editValue) : editValue;
        onSave(finalValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValue(String(value));
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !multiline && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        } else if (e.key === "Escape") {
            handleCancel();
        }
    };

    if (isEditing) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                {label && (
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {label}:
                    </label>
                )}
                {multiline ? (
                    <textarea
                        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleSave}
                        placeholder={placeholder}
                        className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[80px] resize-y"
                    />
                ) : (
                    <input
                        ref={inputRef as React.RefObject<HTMLInputElement>}
                        type={type}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleSave}
                        placeholder={placeholder}
                        className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                )}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSave}
                    className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded"
                >
                    <Check className="w-4 h-4" />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCancel}
                    className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded"
                >
                    <X className="w-4 h-4" />
                </motion.button>
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-2 group ${className}`}>
            {label && (
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {label}:
                </span>
            )}
            <span className="flex-1 text-zinc-900 dark:text-zinc-100">
                {value || <span className="text-zinc-400 italic">{placeholder}</span>}
            </span>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-opacity"
            >
                <Edit2 className="w-4 h-4" />
            </motion.button>
        </div>
    );
}






