import React from "react";

interface CanvasConnectionProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export function CanvasConnection({ startX, startY, endX, endY }: CanvasConnectionProps) {
    // Calculate path for orthogonal (square) connection
    // Move horizontally from start, then vertical, then horizontal to end
    const midX = (startX + endX) / 2;

    const pathData = `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;

    return (
        <g>
            <path
                d={pathData}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-zinc-300 dark:text-zinc-700"
            />
            {/* Connection Markers */}
            <circle cx={startX} cy={startY} r="3" className="fill-zinc-400 dark:fill-zinc-600" />
            <circle cx={endX} cy={endY} r="3" className="fill-zinc-400 dark:fill-zinc-600" />
        </g>
    );
}
