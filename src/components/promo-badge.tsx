import Image from "next/image";

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

  return (
    <button
      onClick={onClick}
      disabled={!isClickable}
      className={`group relative w-full overflow-visible transition-transform duration-300 ${
        isClickable ? "cursor-pointer hover:scale-105" : "cursor-not-allowed"
      }`}
      aria-label={`Day ${day} ${isAvailable ? "available" : isMissed ? "missed" : "locked"}`}
    >
      <div className="relative h-full w-full overflow-visible">
        {isUnlocked && (
          <div
            className={`absolute inset-0 -z-10 scale-105 rounded-full bg-[#CFC8F7] opacity-90 blur-sm lg:blur-lg ${
              isActive ? "animate-pulse" : ""
            }`}
          />
        )}

        {/* Main Badge Circle */}
        <div
          className={`relative flex size-20 items-center justify-center rounded-full transition-all duration-300 md:size-30 xl:size-34 2xl:size-40 ${
            isUnlocked
              ? "overflow-visible"
              : "overflow-hidden"
          }`}
        >
          {/* Background Image - Only show for unlocked state */}
          {isUnlocked && (
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <Image
                src="/promo/currys-circle.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Day Number */}
          <span
            className={`font-currys absolute left-1.5 z-0 transition-opacity duration-300 md:left-3 xl:left-5 ${
              isUnlocked
                ? "opacity-0"
                : isMissed
                  ? "text-4xl text-[#686188] line-through md:text-5xl xl:text-6xl 2xl:text-[80px]"
                  : "text-4xl text-[#686188] md:text-5xl xl:text-6xl 2xl:text-[80px]"
            }`}
          >
            {day}
          </span>

          {/* Gift Ribbon Overlay - For locked/missed states */}
          <div className="absolute flex h-full w-full items-center justify-center overflow-visible rounded-full">
            {!isUnlocked ? (
              <>
                {/* Background Image for locked/missed */}
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
                <div className="relative z-20 aspect-square w-16 md:w-24 xl:w-28 2xl:w-30">
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
              // Prize for available badge
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
                      alt="available"
                      width={121}
                      height={121}
                      className="h-full w-full animate-pulse object-contain"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Day Number Badge */}
          {isUnlocked && (
            <div className="absolute -right-1 bottom-0 z-40 flex size-7 items-center justify-center rounded-full shadow-lg md:-right-2 md:size-11 xl:size-12 2xl:-right-1 2xl:bottom-1 2xl:size-13 overflow-hidden">
              {/* Background Image for smaller circle */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <Image
                  src="/promo/currys-circle.png"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-currys relative z-10 text-xs font-bold text-white md:text-xl xl:text-3xl">
                {day}
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
};
