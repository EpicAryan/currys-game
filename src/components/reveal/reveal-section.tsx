// components/reveal/reveal-section.tsx
"use client";
import React from "react";
import StreakIndicator from "./streak-indicator";
import CongratulationsCard from "./congratulations-card";
import PrizeReveal from "./prize-reveal";

const RevealSection = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Streak Indicator */}
      <StreakIndicator currentStreak={3} totalDays={12} />

      {/* Congratulations Section */}
      <CongratulationsCard />

      {/* Prize Reveal Section */}
      <PrizeReveal />
    </div>
  );
};

export default RevealSection;
