"use client";

import { useEffect, useRef } from "react";

interface CirclePiece {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  size: number;
  opacity: number;
  color: string;
  floatPhase: number;
  swayAmplitude: number;
}

export default function CircleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const circlesRef = useRef<CirclePiece[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const themeColors = [
      "rgba(255, 255, 255, 0.3)",
      "rgba(207, 200, 247, 0.4)",
      "rgba(157, 142, 220, 0.3)",
      "rgba(124, 116, 156, 0.25)",
      "rgba(255, 255, 255, 0.5)",
      "rgba(181, 170, 230, 0.35)",
      "rgba(103, 89, 150, 0.3)",
    ];

    const initCircles = () => {
      circlesRef.current = [];
      for (let i = 0; i < 70; i++) {
        let size;
        const sizeRandom = Math.random();
        if (sizeRandom < 0.3) {
          size = Math.random() * 15 + 10;
        } else if (sizeRandom < 0.6) {
          size = Math.random() * 20 + 25;
        } else if (sizeRandom < 0.85) {
          size = Math.random() * 25 + 45;
        } else {
          size = Math.random() * 30 + 60;
        }

        circlesRef.current.push({
          x: Math.random() * (canvas.width + 400) - 200,
          y: -Math.random() * canvas.height * 1.2 - size,
          velocityX: (Math.random() - 0.5) * 0.5,
          velocityY: Math.random() * 0.4 + 0.2,
          size: size,
          opacity: Math.random() * 0.3 + 0.2,
          color: themeColors[Math.floor(Math.random() * themeColors.length)],
          floatPhase: Math.random() * Math.PI * 2,
          swayAmplitude: Math.random() * 0.6 + 0.3,
        });
      }
    };

    const drawCircle = (circle: CirclePiece) => {
      ctx.save();
      ctx.globalAlpha = circle.opacity;
      ctx.fillStyle = circle.color;

      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.size * 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const updateCircles = () => {
      circlesRef.current.forEach((circle) => {
        circle.floatPhase += 0.015;

        const swayX = Math.sin(circle.floatPhase) * circle.swayAmplitude;

        circle.x += circle.velocityX + swayX * 0.2;
        circle.y += circle.velocityY;

        circle.velocityX += (Math.random() - 0.5) * 0.01;
        circle.velocityX *= 0.99;

        circle.velocityX = Math.max(-1, Math.min(1, circle.velocityX));

        if (circle.y - circle.size > canvas.height + 50) {
          circle.x = Math.random() * (canvas.width + 400) - 200;
          circle.y = -Math.random() * 200 - circle.size;
          circle.velocityX = (Math.random() - 0.5) * 0.5;
          circle.velocityY = Math.random() * 0.4 + 0.2;
          circle.floatPhase = Math.random() * Math.PI * 2;
        }

        if (circle.x < -circle.size - 300) {
          circle.x = canvas.width + circle.size + 100;
        } else if (circle.x > canvas.width + circle.size + 300) {
          circle.x = -circle.size - 100;
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      updateCircles();
      circlesRef.current.forEach(drawCircle);

      animationRef.current = requestAnimationFrame(animate);
    };

    initCircles();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: "transparent",
      }}
    />
  );
}
