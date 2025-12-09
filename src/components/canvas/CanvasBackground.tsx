import { useEffect, useRef } from "react";
import { useStore } from "@xyflow/react";

export function CanvasBackground() {
    const transform = useStore((state) => state.transform);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const render = () => {
            const width = canvas.width;
            const height = canvas.height;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Dot settings
            const dotSpacing = 20;
            const dotRadius = 1;
            const baseColor = "rgba(0, 0, 0, 0.08)";

            // Calculate grid offset based on viewport transform
            const [tx, ty, tScale] = transform;

            // Keep dots fixed size (don't scale with zoom)
            const currentSpacing = dotSpacing * tScale;

            const offsetX = tx % currentSpacing;
            const offsetY = ty % currentSpacing;

            // Determine visible grid range
            const startX = -currentSpacing;
            const startY = -currentSpacing;
            const endX = width + currentSpacing;
            const endY = height + currentSpacing;

            ctx.fillStyle = baseColor;

            // Simple static dot grid (no physics)
            for (let x = startX + offsetX; x < endX; x += currentSpacing) {
                for (let y = startY + offsetY; y < endY; y += currentSpacing) {
                    ctx.beginPath();
                    ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        const handleResize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
                render();
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial size and render

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [transform]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full pointer-events-none"
        />
    );
}
