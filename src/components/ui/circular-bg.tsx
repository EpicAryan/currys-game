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
  z: number;
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

    const themeColors = ["rgba(76,63,142, 1)", "rgba(76,63,142, 0.95)"];

    const initCircles = () => {
      circlesRef.current = [];
      for (let i = 0; i < 130; i++) {
        let size;
        const r = Math.random();
        if (r < 0.3) size = Math.random() * 10 + 12;
        else if (r < 0.6) size = Math.random() * 10 + 15;
        else if (r < 0.85) size = Math.random() * 15 + 18;
        else size = Math.random() * 20 + 20;

        circlesRef.current.push({
          x: Math.random() * (canvas.width + 400) - 200,
          y: -Math.random() * canvas.height * 1.2 - size,
          velocityX: (Math.random() - 0.5) * 0.5,
          velocityY: Math.random() * 0.4 + 0.2,
          size,
          opacity: Math.random() * 0.3 + 0.7,
          color: themeColors[Math.floor(Math.random() * themeColors.length)],
          floatPhase: Math.random() * Math.PI * 2,
          swayAmplitude: Math.random() * 0.6 + 0.3,
          z: Math.random() * 1200 + 200,
        });
      }
    };

    const focal = 800;

    const drawCircle = (circle: CirclePiece) => {
      const s = focal / (focal + circle.z);
      const radius = circle.size * 0.5 * s;

      const depthAlpha = Math.min(1, circle.opacity * (0.7 + 0.7 * s));
      ctx.save();
      ctx.globalAlpha = depthAlpha;
      ctx.fillStyle = circle.color;

      ctx.beginPath();
      ctx.arc(circle.x, circle.y, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const updateCircles = () => {
      circlesRef.current.forEach((circle) => {
        const s = focal / (focal + circle.z);
        circle.floatPhase += 0.015 * (0.75 + 0.5 * s);

        const swayX = Math.sin(circle.floatPhase) * circle.swayAmplitude;
        const speedScaleY = 0.8 + 0.9 * s;
        const swayScaleX = 0.15 + 0.25 * s;
        circle.x += circle.velocityX + swayX * swayScaleX;
        circle.y += circle.velocityY * speedScaleY;

        circle.velocityX += (Math.random() - 0.5) * 0.01;
        circle.velocityX *= 0.99;

        circle.velocityX = Math.max(-1, Math.min(1, circle.velocityX));

        if (circle.y - circle.size > canvas.height + 50) {
          circle.x = Math.random() * (canvas.width + 400) - 200;
          circle.y = -Math.random() * 200 - circle.size;
          circle.velocityX = (Math.random() - 0.5) * 0.5;
          circle.velocityY = Math.random() * 0.4 + 0.2;
          circle.floatPhase = Math.random() * Math.PI * 2;
          circle.z = Math.random() * 1200 + 200;
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

      const sorted = [...circlesRef.current].sort((a, b) => b.z - a.z);
      sorted.forEach(drawCircle);

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
