"use client";

import Image from "next/image";
import { motion, useAnimate } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

interface PrizeConfig {
  src: string;
  width: number;
  height: number;
  className?: string;
  name?: string;
}

interface BadgeProps {
  day: number;
  isActive: boolean;
  isAvailable: boolean;
  isMissed: boolean;
  prize?: PrizeConfig;
  onClick?: () => void;
  activeDay?: number | null;
}

export const Badge: React.FC<BadgeProps> = ({
  day,
  isActive,
  isAvailable,
  isMissed,
  prize,
  onClick,
  activeDay,
}) => {
  const ribbonImage =
    day % 2 === 0 ? "/prize/silver-ribbon.png" : "/prize/bronze-ribbon.png";

  const [scope, animate] = useAnimate();
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [hasUnlocked, setHasUnlocked] = useState(false);
  const [productRevealed, setProductRevealed] = useState(false);

  const prizeRef = useRef<HTMLDivElement | null>(null);
  const dayBadgeRef = useRef<HTMLDivElement | null>(null);

  const isLocked = !isAvailable && !isMissed;
  const isUnlocked = isAvailable;
  const showPrize = isUnlocked || isMissed;

  const shouldPulse = isUnlocked && isActive && hasUnlocked;

  const mainCircleImage =
    isMissed || isLocked
      ? "/promo/inactive-circle.webp"
      : "/promo/currys-circle.webp";

  const dayBadgeCircleImage = "/promo/currys-circle.webp";

  const showLockedVisuals =
    isLocked ||
    (isActive && isAvailable && !hasUnlocked) ||
    (isActive && isUnlocking);

  const prizeInitialStyle: CSSProperties | undefined =
    isActive && isAvailable && !productRevealed
      ? {
          opacity: 0,
          transform: "scale3d(0.3, 0.3, 1)",
          transformOrigin: "left bottom",
          willChange: "transform, opacity",
        }
      : {
          transformOrigin: "left bottom",
          transform: "translateZ(0)",
        };

  const dayBadgeInitialStyle: CSSProperties | undefined =
    isActive && isAvailable && !productRevealed
      ? {
          opacity: 0,
          transform: "scale3d(0, 0, 1)",
          willChange: "transform, opacity",
        }
      : {
          transform: "translateZ(0)",
        };

  useEffect(() => {
    if (isActive && isAvailable && !hasUnlocked) {
      setIsUnlocking(true);

      const run = async () => {
        await new Promise((r) => setTimeout(r, 650));

        await Promise.all([
          animate(
            ".horizontal-left",
            { scaleX: 0, opacity: 0 },
            { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
          ),
          animate(
            ".horizontal-right",
            { scaleX: 0, opacity: 0 },
            { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
          ),
          animate(
            ".vertical-top",
            { scaleY: 0, opacity: 0 },
            { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
          ),
          animate(
            ".vertical-bottom",
            { scaleY: 0, opacity: 0 },
            { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
          ),
        ]);

        await animate(
          ".star-badge",
          { opacity: 0, scale: 0.85 },
          { duration: 0.25, ease: [0.4, 0, 1, 1] },
        );

        setHasUnlocked(true);
        setIsUnlocking(false);

        await new Promise((r) =>
          requestAnimationFrame(() => requestAnimationFrame(r)),
        );

        const prizeEl = prizeRef.current;
        const dayEl = dayBadgeRef.current;

        if (prizeEl) {
          prizeEl.style.transformOrigin = "left bottom";
          prizeEl.style.opacity = "0";
          prizeEl.style.transform = "scale3d(0.3, 0.3, 1)";
          prizeEl.style.willChange = "transform, opacity";
        }
        if (dayEl) {
          dayEl.style.opacity = "0";
          dayEl.style.transform = "scale3d(0, 0, 1)";
          dayEl.style.willChange = "transform, opacity";
        }

        if (prizeEl) {
          await animate(
            prizeEl,
            {
              opacity: 1,
              scale: 1,
            },
            {
              duration: 0.65,
              ease: [0.34, 1.56, 0.64, 1],
            },
          );
          prizeEl.style.willChange = "auto";
          setProductRevealed(true);
        } else {
          setProductRevealed(true);
        }

        if (dayEl) {
          await animate(
            dayEl,
            { opacity: 1, scale: 1 },
            { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
          );
          dayEl.style.willChange = "auto";
        }
      };

      run();
    }
  }, [isActive, isAvailable, hasUnlocked, animate]);

  return (
    <motion.button
      ref={scope}
      data-badge-day={day}
      key={`badge-${day}-${isActive}`}
      onClick={onClick}
      disabled={!isAvailable}
      className={`group relative w-full overflow-visible ${
        isAvailable ? "cursor-pointer" : "cursor-not-allowed"
      }`}
      aria-label={`Day ${day} ${isAvailable ? "available" : isMissed ? "missed" : "locked"}`}
      initial={{ scale: 1 }}
      animate={shouldPulse ? { scale: [1, 1.05, 1] } : { scale: 1 }}
      whileHover={isAvailable ? { scale: 1.05 } : undefined}
      transition={
        shouldPulse
          ? {
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
              repeatDelay: 0.5,
            }
          : { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
      }
      style={{
        position: "relative",
        zIndex: activeDay === day ? 50 : 1,
        willChange: shouldPulse ? "transform" : "auto",
      }}
    >
      <div className="relative h-full w-full overflow-visible">
        {isUnlocked && hasUnlocked && (
          <div
            className={`absolute inset-0 -z-10 scale-105 rounded-full bg-[#CFC8F7] opacity-90 blur-sm lg:blur-lg${isActive ? "animate-pulse" : ""}`}
            style={{ transform: "translateZ(0)" }}
          />
        )}

        {/* Main Badge Circle */}
        <div
          className={`relative flex size-20 items-center justify-center rounded-full md:size-30 lg:size-26 xl:size-32 2xl:size-40 ${
            showPrize ? "overflow-visible" : "overflow-hidden"
          }`}
          style={{ transform: "translateZ(0)" }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <Image
              src={
                isActive && !hasUnlocked
                  ? "/promo/inactive-circle.webp"
                  : mainCircleImage
              }
              alt=""
              fill
              className="object-cover"
            />
          </div>

          {/* Missed hatch overlay*/}
          {isMissed && (
            <>
              <div
                className="pointer-events-none absolute inset-0 z-20 rounded-full bg-gray-600"
                style={{
                  transform: "translateZ(0)",
                  backgroundImage: `
                  /* Main bottom spherical shadow */
                  radial-gradient(circle at 50% 135%, rgba(0,0,0,0.65), transparent 60%),

                  /* Mid-bottom soft curve */
                  radial-gradient(circle at 50% 95%, rgba(0,0,0,0.05), transparent 65%),

                  /* Top highlight */
                  radial-gradient(circle at 50% 10%, rgba(255,255,255,0.22), transparent 55%)
                `,
                  boxShadow: `
                  /* Outer drop shadow */
                  0 16px 28px rgba(0,0,0,0.4),

                  /* Deep inner lower shadow (the strongest curvature) */
                  inset 0 -2px 3px rgba(0,0,0,0.6),

                  /* Subtle inner mid shadow (softens the curve) */
                  inset 0 -2px 1px rgba(0,0,0,0.25),

                  /* Inner top highlight */
                  inset 0 60px 50px rgba(255,255,255,0.18)
                `,
                }}
              />
            </>
          )}

          {/* Ribbons */}
          <div className="pointer-events-none absolute flex h-full w-full items-center justify-center overflow-visible rounded-full">
            {showLockedVisuals && (
              <>
                {/* Horizontal halves */}
                <div className="absolute inset-0 z-40">
                  <div
                    className="horizontal-left absolute top-1/2 left-0 h-[10%] w-1/2 origin-left -translate-y-1/2"
                    style={{
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                      background:
                        "linear-gradient(90deg, #393259 2.73%, #7C749C 12.39%, #E0DAFF 45.53%, #DFD8FD 76.52%, #2A234A 97.55%)",
                      willChange: "transform, opacity",
                      transform: "translateZ(0)",
                    }}
                  />
                  <div
                    className="horizontal-right absolute top-1/2 right-0 h-[10%] w-1/2 origin-right -translate-y-1/2"
                    style={{
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                      background:
                        "linear-gradient(90deg, #393259 2.73%, #7C749C 12.39%, #E0DAFF 45.53%, #DFD8FD 76.52%, #2A234A 97.55%)",
                      willChange: "transform, opacity",
                      transform: "translateZ(0)",
                    }}
                  />
                </div>

                {/* Vertical halves */}
                <div className="absolute inset-0 z-40">
                  <div
                    className="vertical-top absolute top-0 left-1/2 h-1/2 w-[10%] origin-top -translate-x-1/2"
                    style={{
                      boxShadow: "2px 0 6px rgba(0, 0, 0, 0.3)",
                      background:
                        "linear-gradient(180deg, #3F385F 2.73%, #7C749C 12.39%, #E0DAFF 45.53%, #DFD8FD 76.52%, #070024 97.55%)",
                      willChange: "transform, opacity",
                      transform: "translateZ(0)",
                    }}
                  />
                  <div
                    className="vertical-bottom absolute bottom-0 left-1/2 h-1/2 w-[10%] origin-bottom -translate-x-1/2"
                    style={{
                      boxShadow: "2px 0 6px rgba(0, 0, 0, 0.3)",
                      background:
                        "linear-gradient(180deg, #3F385F 2.73%, #7C749C 12.39%, #E0DAFF 45.53%, #DFD8FD 76.52%, #070024 97.55%)",
                      willChange: "transform, opacity",
                      transform: "translateZ(0)",
                    }}
                  />
                </div>

                {/* Center icon */}
                <div
                  className="star-badge relative z-50 aspect-square w-16 md:w-24 2xl:w-30"
                  style={{ willChange: "transform, opacity" }}
                >
                  <Image
                    src={ribbonImage}
                    alt="bow"
                    width={121}
                    height={121}
                    className="h-full w-full object-contain drop-shadow-lg"
                  />
                </div>
              </>
            )}
          </div>

          {/* Product layer */}
          {showPrize && (isMissed || !isActive || hasUnlocked) && (
            <div
              className="pointer-events-none absolute z-30 mb-6 flex h-auto w-full items-center justify-center"
              style={{ transform: "translateZ(0)" }}
            >
              {prize ? (
                isMissed ? (
                  <div
                    className="relative z-30"
                    style={{
                      filter: "contrast(0.95) brightness(0.95)",
                      transform: "translateZ(0)",
                    }}
                  >
                    <div className="prize-image origin-bottom-left">
                      <Image
                        src={prize.src}
                        alt={prize.name || `Day ${day} prize`}
                        width={prize.width}
                        height={prize.height}
                        quality={90}
                        className={`pointer-events-auto h-auto object-contain drop-shadow-2xl ${prize.className || ""}`}
                        style={{ maxWidth: "none" }}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    ref={prizeRef}
                    className="prize-image absolute origin-bottom-left"
                    style={prizeInitialStyle}
                  >
                    <Image
                      src={prize.src}
                      alt={prize.name || `Day ${day} prize`}
                      width={prize.width}
                      height={prize.height}
                      quality={90}
                      className={`h-auto object-contain drop-shadow-2xl ${prize.className || ""}`}
                      style={{ maxWidth: "none" }}
                    />
                  </div>
                )
              ) : (
                <div className="aspect-square w-[50%]">
                  <Image
                    src={ribbonImage}
                    alt={isMissed ? "passed" : "available"}
                    width={121}
                    height={121}
                    className={`h-full w-full object-contain ${!isMissed ? "animate-pulse" : ""}`}
                  />
                </div>
              )}
            </div>
          )}

          {/* Large inline day number */}
          <span
            className={`font-currys absolute left-1.5 z-0 transition-opacity duration-300 md:left-3 2xl:left-5 ${
              showPrize
                ? "opacity-0"
                : "text-4xl text-[#686188] md:text-5xl xl:text-6xl 2xl:text-[80px]"
            }`}
          >
            {day}
          </span>

          {/* Day badge */}

          {showPrize && (isMissed || !isActive || hasUnlocked) && (
            <div
              ref={dayBadgeRef}
              className="day-badge absolute -bottom-2 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full px-2.5 py-1 md:py-1.5 shadow-lg md:-bottom-2.5 md:px-4 lg:-bottom-2.5 lg:px-3.5"
              style={{
                ...dayBadgeInitialStyle,
                background:
                  "linear-gradient(180deg, rgba(67, 40, 129, 0.60) -24.62%, rgba(30, 18, 59, 0.60) 100%), rgba(255, 255, 255, 0.26)",
                backdropFilter: "blur(6px)",
                minHeight: "24px",
              }}
            >
              {/* Number badge circle with image background */}
              <div className="relative z-30 flex size-[18px] shrink-0 items-center justify-center overflow-hidden rounded-full md:size-6 lg:size-5.5 xl:size-6 2xl:size-7">
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <Image
                    src={dayBadgeCircleImage}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                <span className="font-currys relative z-10 text-[11px] font-bold text-[#CFC8F7] md:text-sm 2xl:text-base">
                  {day}
                </span>
              </div>

              {/* Fixed-width text column – wraps only after this width */}
              <div className="relative z-30 w-15 text-left lg:w-18 xl:w-[105px] 2xl:w-[125px]">
                <span className="font-currys block text-[9px] lg:text-[11px] leading-3 font-medium tracking-wide text-wrap text-white xl:text-[13px] 2xl:text-sm">
                  {prize?.name || `Day ${day}`}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
};
