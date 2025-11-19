import React from 'react';
import Image from 'next/image';

const BadgeGridSkeleton = () => {
  const skeletonBadges = Array.from({ length: 12 }, (_, i) => i + 1);
  
  return (
    <div className="grid grid-cols-3 space-y-[2.5vh] gap-x-12 place-self-center overflow-visible md:space-y-[2.8vh] lg:grid-cols-4 lg:space-y-[3vh] lg:gap-x-14 xl:space-y-[3.5vh] 2xl:space-y-8 xl:gap-x-17">
      {skeletonBadges.map((day, index) => (
        <div
          key={day}
          className={`flex min-w-0 items-center justify-center  ${
            index >= 4 && index <= 7
              ? "lg:translate-x-16 xl:translate-x-20 2xl:translate-x-24"
              : ""
          }`}
        >
          <div className="relative flex w-full items-center justify-center">
            <div className="relative flex size-20 items-center justify-center rounded-full overflow-hidden md:size-30 lg:size-26 xl:size-32 2xl:size-40">
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <Image
                  src="/promo/inactive-circle.webp"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Pulsing overlay */}
              <div className="absolute inset-0 rounded-full bg-purple-400/20 animate-pulse" />
              
              {/* Day number */}
              <span className="font-currys absolute left-1.5 z-0 text-4xl text-[#686188] opacity-50 md:left-3 md:text-5xl xl:text-6xl 2xl:left-5 2xl:text-[80px]">
                {day}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BadgeGridSkeleton;
