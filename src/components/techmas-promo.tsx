"use client";
import Image from "next/image";
import React from "react";
import { Badge } from "./promo-badge";
import BackButton from "./ui/back-button";
import CircleBackground from "./ui/circular-bg";

const TechmasPromp = () => {
  const [unlockedDays, setUnlockedDays] = React.useState<number[]>([1]);
  const [activeDay, setActiveDay] = React.useState<number>(1);

  const handleBadgeClick = (day: number) => {
    if (unlockedDays.includes(day)) {
      setActiveDay(day);
      console.log(`Opened day ${day}`);
    }
  };

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-b from-[#2A1F44] via-[#3D2F5B] to-[#4A3566]">
      <CircleBackground />
      <div className="absolute top-6 md:top-8 xl:top-10 left-10">
        <BackButton/>
      </div>
      {/* Currys Logo */}
      <div className="absolute top-0 right-8 z-0 flex size-20 -translate-y-1/3 items-center justify-center rounded-full bg-white md:size-32 md:right-12 lg:right-[10vw] xl:size-44 2xl:size-50">
        <h5 className="font-currys text-2xl font-semibold tracking-wide text-[#3D2683] md:text-4xl lg:text-5xl xl:text-6xl">
          currys
        </h5>
      </div>

      {/* Header Text */}
      <div className="font-currys w-full pt-20 text-center lg:pt-12 xl:pt-16 2xl:pt-20">
        <h1
          className="text-3xl font-semibold tracking-wide text-white md:text-5xl xl:text-6xl 2xl:text-7xl"
          style={{
            textShadow: "4px 4px 4px rgba(11, 4, 44, 0.12)",
          }}
        >
          12 Days of Techmas
        </h1>
        <p className="pt-3 text-sm leading-tight text-[#CFC8F7] md:text-xl xl:text-2xl 2xl:text-3xl">
          Come back daily to unwrap your chance to win.
        </p>
        <p className="text-sm leading-tight font-semibold text-[#CFC8F7] md:text-xl xl:text-2xl 2xl:text-3xl">
          Every day is a new prize.
        </p>
      </div>

      {/* Badge Grid - Added overflow-visible */}
      <div className="relative z-30 mx-auto mt-12 max-w-6xl overflow-visible">
        <div className="grid grid-cols-3 space-y-5 gap-x-12 place-self-center lg:grid-cols-4 xl:gap-x-15 overflow-visible">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((day) => (
            <Badge
              key={day}
              day={day}
              isActive={day === activeDay}
              isUnlocked={unlockedDays.includes(day)}
              prize={
                day === 1
                  ? {
                      src: "/prize/first-prize.png",
                      width: 220,
                      height: 168,
                      className: "w-23 md:w-34 xl:w-40 2xl:w-46 translate-x-2 xl:translate-x-3 -rotate-8",
                    }
                  : undefined
              }
              onClick={() => handleBadgeClick(day)}
            />
          ))}
        </div>
      </div>

      {/* Snow Drift Bottom */}
      <div className="absolute bottom-0 z-20 h-auto w-full">
        <Image
          src="/promo/snow-drift.png"
          alt="snow drift"
          width={2892}
          height={1972}
          className="hidden w-full object-cover lg:block"
        />
        <Image
          src="/promo/snow-drift-mobile.png"
          alt="snow drift"
          width={910}
          height={552}
          className="block w-full object-cover lg:hidden"
        />
        {/* Jumping Deer */}
        <div className="absolute right-6 bottom-12 z-30 h-29 w-auto lg:right-10 md:bottom-24 lg:bottom-6 md:h-40 lg:h-36 xl:right-16 xl:bottom-10 xl:h-44 2xl:right-20 2xl:bottom-16 2xl:h-50">
          <Image
            src="/promo/jumping-deer.png"
            alt="deer"
            width={400}
            height={400}
            className="object-fit h-full w-full"
          />
        </div>
      </div>

      {/* Snow Drift Right */}
      <div className="absolute -right-1/2 bottom-14 h-auto w-full translate-x-1/16 translate-y-1/2 md:bottom-26 lg:bottom-8 2xl:bottom-10">
        <Image
          src="/promo/snow-drift-2.png"
          alt="snow drift"
          width={1446}
          height={986}
          className="w-[70vw] object-cover"
        />
      </div>

      {/* Magic Cluster Bottom Left */}
      <div className="absolute -bottom-2 left-2 z-30 h-64 w-auto lg:-left-2 lg:h-88 xl:h-96 2xl:h-[408px]">
        <Image
          src="/promo/magic-cluster-b.png"
          alt="magic cluster"
          width={408}
          height={408}
          className="object-fit h-full w-full"
        />
      </div>

      {/* Gift Box 2 */}
      <div className="absolute bottom-24 left-0 z-30 h-20 w-auto md:h-30 lg:bottom-40 lg:h-22 2xl:h-[108px]">
        <Image
          src="/promo/gift-box-2.png"
          alt="gift box"
          width={108}
          height={108}
          className="object-fit h-full w-full"
        />
      </div>

      {/* Gift Box 1 */}
      <div className="absolute bottom-8 left-8 z-30 h-20 w-auto lg:bottom-4 lg:left-10 lg:h-30 xl:h-35 2xl:h-[163px]">
        <Image
          src="/promo/gift-box-1.png"
          alt="gift box"
          width={163}
          height={163}
          className="object-fit h-full w-full"
        />
      </div>
    </section>
  );
};

export default TechmasPromp;
// // //missed, claimed, locked, 
