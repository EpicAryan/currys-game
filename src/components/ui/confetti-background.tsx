"use client";

import { useEffect, useRef } from "react";

interface ConfettiPiece {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  scale: number;
  floatPhase: number;
  swayAmplitude: number;
  rotation: number;
  rotationSpeed: number;
  pathIndex: number;
  fill: string;
}

export default function ConfettiBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const confettiRef = useRef<ConfettiPiece[]>([]);
  const pathsRef = useRef<Path2D[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);


    const pathDefinitions = [
      {
        d: "M8.94551 29.1986L17.9309 28.2983L8.9854 0.000178782L-2.16388e-07 0.900477L8.94551 29.1986Z",
        fill: "#FBD1E6",
        width: 18,
        height: 30,
      },
      {
        d: "M24.0154 51.1839L38.3845 42.9922L14.369 9.01397e-05L-0.000111749 8.19185L24.0154 51.1839Z",
        fill: "#EADDFF",
        width: 39,
        height: 52,
      },
      {
        d: "M10.5328 0.000124703L0 0.55957L4.86644 31.0566L15.3992 30.4972L10.5328 0.000124703Z",
        fill: "#EADDFF",
        width: 16,
        height: 32,
      },
      {
        d: "M40.1111 13.07L37.2595 0L-9.42976e-05 11.7965L2.85145 24.8664L40.1111 13.07Z",
        fill: "#EADDFF",
        width: 41,
        height: 25,
      },
      {
        d: "M20.0354 4.4501L5.73169 0L0.000117562 16.0112L14.3039 20.4613L20.0354 4.4501Z", 
        fill:"#EADDFF",
        width: 21,
        height: 21,
      }
    ];

    pathsRef.current = pathDefinitions.map((def) => new Path2D(def.d));

    const calculateParticleCount = () => {
      const canvasArea = canvas.width * canvas.height;
      const density = 12000; 
      
      const count = Math.floor(canvasArea / density);
      
      const minParticles = 40;
      const maxParticles = 80;
      
      return Math.max(minParticles, Math.min(maxParticles, count));
    };

    const initConfetti = () => {
      const particleCount = calculateParticleCount();
      confettiRef.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        const pathIndex = Math.floor(Math.random() * pathDefinitions.length);
        const pathDef = pathDefinitions[pathIndex];
        
        const baseScale = Math.min(pathDef.width, pathDef.height);
        const sizeRandom = Math.random();
        let scaleFactor;
        
        if (sizeRandom < 0.4) {
          scaleFactor = Math.random() * 0.2 + 0.3;
        } else if (sizeRandom < 0.7) {
          scaleFactor = Math.random() * 0.3 + 0.5;
        } else if (sizeRandom < 0.9) {
          scaleFactor = Math.random() * 0.4 + 0.8;
        } else {
          scaleFactor = Math.random() * 0.4 + 1;
        }
        
        const scale = scaleFactor * (30 / baseScale); 

        confettiRef.current.push({
          x: Math.random() * canvas.width,
          y: -Math.random() * canvas.height * 1.5,
          velocityX: (Math.random() - 0.5) * 0.6,
          velocityY: Math.random() * 0.5 + 0.3,
          scale: scale,
          floatPhase: Math.random() * Math.PI * 2,
          swayAmplitude: Math.random() * 0.8 + 0.4,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.04,
          pathIndex: pathIndex,
          fill: pathDef.fill,
        });
      }
    };

    const drawConfetti = (confetti: ConfettiPiece) => {
      const path = pathsRef.current[confetti.pathIndex];
      const pathDef = pathDefinitions[confetti.pathIndex];

      ctx.save();

      ctx.translate(confetti.x, confetti.y);

      ctx.rotate(confetti.rotation);

      ctx.scale(confetti.scale, confetti.scale);

      ctx.translate(-pathDef.width / 2, -pathDef.height / 2);

      ctx.fillStyle = confetti.fill;
      ctx.fill(path);

      ctx.restore();
    };

    const updateConfetti = () => {
      confettiRef.current.forEach((confetti) => {
        confetti.floatPhase += 0.02;
        confetti.rotation += confetti.rotationSpeed;

        const swayX = Math.sin(confetti.floatPhase) * confetti.swayAmplitude;

        confetti.x += confetti.velocityX + swayX * 0.2;
        confetti.y += confetti.velocityY;

        confetti.velocityX += (Math.random() - 0.5) * 0.02;
        confetti.velocityX *= 0.99;

        confetti.velocityX = Math.max(-1.2, Math.min(1.2, confetti.velocityX));

        if (confetti.y > canvas.height + 100) {
          confetti.x = Math.random() * canvas.width;
          confetti.y = -Math.random() * 300;
          confetti.velocityX = (Math.random() - 0.5) * 0.6;
          confetti.velocityY = Math.random() * 0.5 + 0.3;
          confetti.floatPhase = Math.random() * Math.PI * 2;
          confetti.rotation = Math.random() * Math.PI * 2;
        }

        if (confetti.x < -100) {
          confetti.x = canvas.width + 50;
        } else if (confetti.x > canvas.width + 100) {
          confetti.x = -50;
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      updateConfetti();
      confettiRef.current.forEach(drawConfetti);

      animationRef.current = requestAnimationFrame(animate);
    };

    initConfetti();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0">
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          background: "transparent",
        }}
      />
    </div>
  );
}
