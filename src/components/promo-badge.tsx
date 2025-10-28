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
  isUnlocked: boolean;
  prize?: PrizeConfig;
  onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  day,
  isActive,
  isUnlocked,
  prize,
  onClick,
}) => {
  const ribbonImage =
    day % 2 === 0 ? "/prize/silver-ribbon.png" : "/prize/bronze-ribbon.png";

  return (
    <button
      onClick={onClick}
      disabled={!isUnlocked}
      className="group relative w-full overflow-visible transition-transform duration-300"
      aria-label={`Day ${day} ${isUnlocked ? "unlocked" : "locked"}`}
    >
      {/* Badge Container */}
      <div className="relative h-full w-full overflow-visible">
        {/* Active/Unlocked Badge */}
        {isActive && (
          <div className="absolute inset-0 -z-10 scale-105 rounded-full bg-[#CFC8F7] opacity-90 blur-sm lg:blur-lg" />
        )}

        {/* Main Badge Circle */}
        <div
          className={`relative flex size-20 items-center justify-center rounded-full transition-all duration-300 md:size-30 xl:size-34 2xl:size-40 ${
            isUnlocked
              ? "circle overflow-visible"
              : "overflow-hidden bg-gradient-to-br from-[#3F3358] to-[#2D2541]"
          }`}
        >
          {/* Day Number */}
          <span
            className={`font-currys absolute left-1.5 z-0 transition-opacity duration-300 md:left-3 xl:left-5 ${
              isUnlocked
                ? "opacity-0"
                : "text-4xl text-[#686188] md:text-5xl xl:text-6xl 2xl:text-[80px]"
            }`}
          >
            {day}
          </span>

          {/* Gift Ribbon Overlay */}
          <div className="absolute flex h-full w-full items-center justify-center overflow-visible rounded-full">
            {!isUnlocked ? (
              <>
                {/* Horizontal Ribbon Band */}
                <div
                  className="absolute right-0 left-0 h-[10%]"
                  style={{
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                    background:
                      "linear-gradient(90deg, #393259 2.73%, #7C749C 12.39%, #E0DAFF 45.53%, #DFD8FD 76.52%, #2A234A 97.55%)",
                  }}
                />

                {/* Vertical Ribbon Band */}
                <div
                  className="absolute top-0 bottom-0 w-[10%]"
                  style={{
                    boxShadow: "2px 0 6px rgba(0, 0, 0, 0.3)",
                    background:
                      "linear-gradient(180deg, #3F385F 2.73%, #7C749C 12.39%, #E0DAFF 45.53%, #DFD8FD 76.52%, #070024 97.55%)",
                  }}
                />

                {/* Center Icon  */}
                <div className="relative z-10 aspect-square w-16 md:w-24 xl:w-28 2xl:w-30">
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
              // Prize for unlocked badge
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
                      alt="unlocked"
                      width={121}
                      height={121}
                      className="h-full w-full animate-pulse object-contain"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {isUnlocked && (
            <div className="circle absolute -right-1 bottom-0 z-40 flex size-7 items-center justify-center rounded-full shadow-lg md:-right-2 md:size-11 xl:size-12 2xl:-right-1 2xl:bottom-1 2xl:size-13">
              <span className="font-currys text-xs font-bold text-white md:text-xl xl:text-3xl">
                {day}
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
};
