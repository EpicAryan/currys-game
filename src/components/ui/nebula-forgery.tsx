"use client";

import { useMemo } from "react";
import { LazyMotion, m, MotionConfig } from "framer-motion";

const loadFeatures = () => import("framer-motion").then((mod) => mod.domAnimation);

type Size = "tiny" | "small" | "medium" | "large" | "xlarge";

interface Particle {
  id: number;
  x: number; 
  y: number; 
  size: Size;
  duration: number;
  delay: number;
  brightness: number;
}

const sizeConfig: Record<Size, {
  width: number; beamLength: number; beamThickness: number; centerGlow: number;
  diagonalLength: number; diagonalThickness: number; diagonalOffset: number;
}> = {
  tiny:   { width: 6,  beamLength: 8,  beamThickness: 1,   centerGlow: 2, diagonalLength: 4,  diagonalThickness: 0.5, diagonalOffset: 35 },
  small:  { width: 10, beamLength: 14, beamThickness: 1.5, centerGlow: 3, diagonalLength: 7,  diagonalThickness: 0.7, diagonalOffset: 35 },
  medium: { width: 16, beamLength: 22, beamThickness: 2,   centerGlow: 4, diagonalLength: 11, diagonalThickness: 0.9, diagonalOffset: 40 },
  large:  { width: 24, beamLength: 36, beamThickness: 2.5, centerGlow: 6, diagonalLength: 16, diagonalThickness: 1.2, diagonalOffset: 40 },
  xlarge: { width: 32, beamLength: 56, beamThickness: 3,   centerGlow: 8, diagonalLength: 24, diagonalThickness: 1.5, diagonalOffset: 45 },
};

function Sparkle({ size, brightness }: { size: Size; brightness: number }) {
  const cfg = sizeConfig[size];
  const box = Math.max(cfg.beamLength, cfg.width);

  return (
    <div
      className="relative"
      style={{
        width: box,
        height: box,
        willChange: "transform, opacity",
        contain: "paint",
        transform: "translateZ(0)",
      }}
    >
      {/* Horizontal beam */}
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          width: cfg.beamLength,
          height: cfg.beamThickness,
          transform: "translate(-50%, -50%)",
          opacity: brightness,
          background: "linear-gradient(to right, transparent, white, transparent)",
          filter: `blur(${Math.max(0.5, cfg.beamThickness * 0.25)}px)`,
        }}
      />
      {/* Vertical beam */}
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          width: cfg.beamThickness,
          height: cfg.beamLength,
          transform: "translate(-50%, -50%)",
          opacity: brightness,
          background: "linear-gradient(to bottom, transparent, white, transparent)",
          filter: `blur(${Math.max(0.5, cfg.beamThickness * 0.25)}px)`,
        }}
      />
      {/* Diagonals */}
      {[-45, 45].map((angle, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2"
          style={{
            width: cfg.diagonalThickness,
            height: cfg.diagonalLength,
            transform: `translate(-50%, -50%) rotate(${angle}deg)`,
            opacity: brightness * 0.45,
            background:
              angle === -45
                ? `linear-gradient(to top, transparent ${cfg.diagonalOffset}%, white 100%)`
                : `linear-gradient(to bottom, transparent ${cfg.diagonalOffset}%, white 100%)`,
            filter: `blur(${Math.max(0.5, cfg.diagonalThickness * 0.4)}px)`,
          }}
        />
      ))}
      {/* Center glow  */}
      <div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          width: cfg.centerGlow,
          height: cfg.centerGlow,
          transform: "translate(-50%, -50%)",
          opacity: brightness,
          background: "white",
          filter: `blur(${Math.max(1, cfg.centerGlow * 0.7)}px)`,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          width: cfg.centerGlow * 2.2,
          height: cfg.centerGlow * 2.2,
          transform: "translate(-50%, -50%)",
          opacity: brightness * 0.35,
          filter: `blur(${Math.max(2, cfg.centerGlow * 1.0)}px)`,
          background: "white",
        }}
      />
    </div>
  );
}

export default function LightParticlesFast() {
  const particles = useMemo<Particle[]>(
    () => [
      { id: 0, x: 18, y: 22, size: "xlarge", duration: 4.5, delay: 0, brightness: 1 },
      { id: 1, x: 15, y: 12, size: "medium", duration: 3.2, delay: 0.5, brightness: 0.8 },
      { id: 2, x: 8,  y: 25, size: "large",  duration: 3.8, delay: 0.8, brightness: 0.85 },
      { id: 3, x: 10, y: 32, size: "medium", duration: 3.0, delay: 1.2, brightness: 0.75 },
      { id: 4, x: 24, y: 18, size: "small",  duration: 2.5, delay: 0.3, brightness: 0.78 },
      { id: 5, x: 72, y: 28, size: "medium", duration: 3.3, delay: 1.0, brightness: 0.8 },
      { id: 6, x: 78, y: 38, size: "large",  duration: 3.6, delay: 0.6, brightness: 0.89 },
      { id: 7, x: 82, y: 18, size: "small",  duration: 2.8, delay: 1.5, brightness: 0.85 },
      { id: 8, x: 45, y: 35, size: "tiny",   duration: 2.0, delay: 0.5, brightness: 0.68 },
      { id: 9, x: 52, y: 42, size: "tiny",   duration: 2.2, delay: 1.0, brightness: 0.85 },
      { id: 10, x: 38, y: 48, size: "tiny",  duration: 1.8, delay: 0.8, brightness: 0.78 },
      { id: 11, x: 58, y: 52, size: "tiny",  duration: 2.1, delay: 1.3, brightness: 0.92 },
      { id: 12, x: 48, y: 58, size: "tiny",  duration: 1.9, delay: 0.4, brightness: 0.7 },
      { id: 20, x: 44, y: 66, size: "tiny",  duration: 2.0, delay: 0.3, brightness: 0.76 },
      { id: 21, x: 58, y: 63, size: "small", duration: 2.1, delay: 0.5, brightness: 0.8 },
      { id: 22, x: 26, y: 60, size: "medium",duration: 2.3, delay: 0.5, brightness: 0.9 },
      { id: 13, x: 25, y: 78, size: "medium",duration: 3.1, delay: 0.7, brightness: 0.75 },
      { id: 14, x: 42, y: 82, size: "small", duration: 2.6, delay: 1.1, brightness: 0.78 },
      { id: 15, x: 65, y: 75, size: "medium",duration: 3.2, delay: 0.9, brightness: 0.88 },
      { id: 16, x: 55, y: 88, size: "small", duration: 2.7, delay: 1.4, brightness: 0.74 },
      { id: 17, x: 18, y: 85, size: "small", duration: 2.5, delay: 0.6, brightness: 0.75 },
      { id: 18, x: 75, y: 85, size: "tiny",  duration: 2.0, delay: 1.2, brightness: 0.85 },
      { id: 19, x: 35, y: 92, size: "tiny",  duration: 1.9, delay: 0.8, brightness: 0.62 },
    ],
    []
  );

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures}>
        <div className="relative w-full h-full pointer-events-none">
          {particles.map((p) => (
            <m.div
              key={p.id}
              className="absolute"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                willChange: "transform, opacity",
                contain: "paint",
              }}
              initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
              animate={{
                opacity: [0.3 * p.brightness, p.brightness, 0.85 * p.brightness, p.brightness, 0.3 * p.brightness],
                scale: [0.92, 1.04, 0.97, 1.04, 0.92],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkle size={p.size} brightness={p.brightness} />
            </m.div>
          ))}
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
