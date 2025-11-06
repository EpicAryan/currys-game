import Image from "next/image";
import { motion } from 'motion/react'

interface PrizeConfig {
  src: string;
  width: number;
  height: number;
  className?: string;
}

interface BadgeProps {
  day: number;
  isActive: boolean;
  isAvailable: boolean;
  isMissed: boolean;
  prize?: PrizeConfig;
  onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  day,
  isActive,
  isAvailable,
  isMissed,
  prize,
  onClick,
}) => {
  const ribbonImage =
    day % 2 === 0 ? "/prize/silver-ribbon.png" : "/prize/bronze-ribbon.png";

  const isUnlocked = isAvailable;
  const isClickable = isAvailable;
  const showPrize = isUnlocked || isMissed;

  const shouldPulse = isClickable && isUnlocked && isActive;


  return (
    <motion.button
      key={`badge-${day}-${isActive}`} 
      onClick={onClick}
      disabled={!isClickable}
      className={`group relative w-full overflow-visible ${
        isClickable ? "cursor-pointer" : "cursor-not-allowed"
      }`}
      aria-label={`Day ${day} ${isAvailable ? "available" : isMissed ? "missed" : "locked"}`}
      initial={{ scale: 1 }}
      animate={
        shouldPulse
          ? { scale: [1, 1.05, 1] }
          : { scale: 1 }
      }
      whileHover={isClickable ? { scale: 1.05 } : undefined}
      transition={
        shouldPulse
          ? {
              duration: 1.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
              repeatDelay: 0.2,
            }
          : { duration: 0.3, ease: "easeOut" }
      }
    >
      <div className="relative h-full w-full overflow-visible">
        {isUnlocked && (
          <div
            className={`absolute inset-0 -z-10 scale-105 rounded-full bg-[#CFC8F7] opacity-90 blur-sm lg:blur-lg${
              isActive ? " animate-pulse" : ""
            }`}
          />
        )}

        {/* Main Badge Circle */}
        <div
          className={`relative flex size-20 items-center justify-center rounded-full md:size-30 2xl:size-40 ${
            showPrize ? "overflow-visible" : "overflow-hidden"
          }`}
        >
          {/* Background Image - Show for unlocked or passed state */}
          {showPrize && (
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <Image
                src="/promo/currys-circle.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Circular Overlay for passed days - behind the product image */}
          {isMissed && (
            <div className="absolute inset-0 z-20 rounded-full bg-black/50 backdrop-blur-sm" />
          )}

          {/* Day Number */}
          <span
            className={`font-currys absolute left-1.5 z-0 transition-opacity duration-300 md:left-3 2xl:left-5 ${
              showPrize
                ? "opacity-0"
                : "text-4xl text-[#686188] md:text-5xl xl:text-6xl 2xl:text-[80px]"
            }`}
          >
            {day}
          </span>

          {/* Gift Ribbon Overlay - For locked states only */}
          <div className="absolute flex h-full w-full items-center justify-center overflow-visible rounded-full">
            {!showPrize ? (
              <>
                {/* Background Image for locked */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <Image
                    src="/promo/currys-circle.png"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Horizontal Ribbon Band */}
                <div
                  className="absolute right-0 left-0 h-[10%] z-10"
                  style={{
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                    background:
                      "linear-gradient(90deg, #393259 2.73%, #7C749C 12.39%, #E0DAFF 45.53%, #DFD8FD 76.52%, #2A234A 97.55%)",
                  }}
                />

                {/* Vertical Ribbon Band */}
                <div
                  className="absolute top-0 bottom-0 w-[10%] z-10"
                  style={{
                    boxShadow: "2px 0 6px rgba(0, 0, 0, 0.3)",
                    background:
                      "linear-gradient(180deg, #3F385F 2.73%, #7C749C 12.39%, #E0DAFF 45.53%, #DFD8FD 76.52%, #070024 97.55%)",
                  }}
                />

                {/* Center Icon */}
                <div className="relative z-20 aspect-square w-16 md:w-24 2xl:w-30">
                  <Image
                    src={ribbonImage}
                    alt="bow"
                    width={121}
                    height={121}
                    className="h-full w-full object-contain drop-shadow-lg"
                  />
                </div>
              </>
            ) : (
              // Prize for available or passed badge
              <div className="relative z-30 flex h-auto w-full items-center justify-center">
                {prize ? (
                  <Image
                    src={prize.src}
                    alt={`Day ${day} prize`}
                    width={prize.width}
                    height={prize.height}
                    className={`h-auto object-contain drop-shadow-2xl ${prize.className || ""}`}
                    style={{ maxWidth: "none" }}
                  />
                ) : (
                  <div className="aspect-square w-[50%]">
                    <Image
                      src={ribbonImage}
                      alt={isMissed ? "passed" : "available"}
                      width={121}
                      height={121}
                      className={`h-full w-full object-contain ${
                        !isMissed ? "animate-pulse" : ""
                      }`}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Day Number Badge */}
          {showPrize && (
            <div className="absolute -right-1 bottom-0 z-40 flex size-7 items-center justify-center rounded-full shadow-lg md:-right-2 md:size-11 2xl:-right-1 2xl:bottom-1 2xl:size-13 overflow-hidden">
              {/* Background Image for smaller circle */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <Image
                  src="/promo/currys-circle.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-currys relative z-10 text-xs font-bold text-white md:text-xl xl:text-2xl 2xl:text-3xl">
                {day}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
};
