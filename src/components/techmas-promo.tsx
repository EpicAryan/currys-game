"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Badge } from "./promo-badge";
import BackButton from "./ui/back-button";
import CircleBackground from "./ui/circular-bg";
import { useCurrentCampaign } from "../hooks/useCurrentCampaign";
import { PRIZE_CONFIGS } from "@/lib/promo-prizes";
import { PromoPrizeModal } from "./ui/promo-prize-modal";

const TechmasPromo = () => {
  const { gifts } = useCurrentCampaign();
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBadgeClick = (
    day: number,
    available: boolean,
    missed: boolean,
  ) => {
    if (available && !missed) {
      setActiveDay(day);
      setIsModalOpen(true);
      // TODO: Navigate to game/claim page
    } else if (missed) {
      console.log(`Day ${day} was missed`);
      // TODO: Show missed message
    } else {
      console.log(`Day ${day} is still locked`);
      // TODO: Show locked message
    }
  };

  const giftMap = useMemo(() => {
    const map = new Map();
    gifts.forEach((gift) => {
      map.set(gift.dayNumber, gift);
    });
    return map;
  }, [gifts]);

  useEffect(() => {
    if (activeDay === null && gifts.length > 0) {
      const firstAvailable = gifts.find(
        (gift) => gift.available && !gift.missed
      );
      if (firstAvailable) {
        setActiveDay(firstAvailable.dayNumber);
      }
    }
  }, [gifts, activeDay]);

  const badges = Array.from({ length: 12 }, (_, i) => {
    const day = i + 1;
    const giftStatus = giftMap.get(day);

    const isAvailable = giftStatus?.available ?? false;
    const isMissed = giftStatus?.missed ?? false;

    return (
      <Badge
        key={day}
        day={day}
        isActive={activeDay === day}
        isAvailable={isAvailable}
        isMissed={isMissed}
        prize={PRIZE_CONFIGS[day]}
        onClick={() => handleBadgeClick(day, isAvailable, isMissed)}
      />
    );
  });

  const currentPrize = activeDay ? PRIZE_CONFIGS[activeDay] : undefined;

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-b from-[#2A1F44] via-[#3D2F5B] to-[#4A3566]">
      <CircleBackground />
      <div className="absolute top-6 left-10 z-40 md:top-8 xl:top-10">
        <BackButton />
      </div>

      {/* Currys Logo */}
      <div className="absolute top-0 right-8 z-40 flex size-20 -translate-y-1/3 items-center justify-center rounded-full bg-white md:right-12 md:size-34 lg:right-[10vw] xl:size-44 2xl:size-50">
        <h5 className="font-currys text-2xl font-semibold tracking-wide text-[#3D2683] md:text-4xl lg:text-5xl xl:text-6xl">
          currys
        </h5>
        <div className="absolute -right-16 md:-right-24 lg:-right-30 xl:-right-40 -bottom-[120%] md:-bottom-[100%] lg:-bottom-[110%] 2xl:-bottom-[100%] -z-10 h-44 md:h-64 w-auto lg:h-70 xl:h-96 2xl:h-[408px] rotate-90">
          <Image
            src="/promo/magic-cluster-b.png"
            alt="magic cluster"
            width={408}
            height={408}
            className="object-fit h-full w-full"
          />
        </div>
      </div>

      {/* Header Text */}
      <div className="font-currys relative z-10 w-full pt-20 text-center lg:pt-12 2xl:pt-20 flex flex-col items-center">
        <h1
          className="text-3xl font-semibold tracking-wide text-white md:text-5xl 2xl:text-7xl text-nowrap"
          style={{
            textShadow: "4px 4px 4px rgba(11, 4, 44, 0.12)",
          }}
        >
          12 Days of Techmas
        </h1>
        <p className="pt-3 text-sm leading-tight text-[#CFC8F7] md:text-xl 2xl:text-2xl text-center max-w-xs md:max-w-4xl">
          Play for a chance to win a different prize every day!
          <br />
          Play all 12 days and you will be entered into a draw for a{" "}
          <span className="font-semibold">€1,000 Currys voucher.</span>
        </p>
      </div>

      {/* Badge Grid */}
      <div className="relative z-30 mx-auto mt-12 max-w-6xl overflow-visible xl:mt-6 2xl:mt-12 ">
        <div className="grid grid-cols-3 space-y-2 gap-x-12 place-self-center overflow-visible lg:grid-cols-4 2xl:space-y-5 2xl:gap-x-15">
          {badges.map((badge, index) => (
            <div
              key={badge.key}
              className={`${
                index >= 4 && index <= 7
                  ? "lg:translate-x-16 xl:translate-x-20 2xl:translate-x-24"
                  : ""
              }`}
            >
              {badge}
              {index === 7 && (
                <div className="hidden lg:block absolute -right-20 -top-32 lg:-right-40 lg:-top-32 xl:-right-44 xl:-top-36 2xl:-right-50 2xl:-top-45 -z-10 h-64 w-auto lg:h-72 xl:h-80 2xl:h-92">
                  <Image
                    src="/promo/magic-cluster-b.png"
                    alt="magic cluster"
                    width={408}
                    height={408}
                    className="object-fit h-full w-full"
                  />
                </div>
              )}
              {index === 5 && (
                <div className="lg:hidden absolute -right-14 md:right-10 top-16 md:top-18  -z-10 w-auto h-40 md:h-64 rotate-45">
                  <Image
                    src="/promo/magic-cluster-b.png"
                    alt="magic cluster"
                    width={408}
                    height={408}
                    className="object-fit h-full w-full"
                  />
                </div>
              )}
            </div>
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
        <div className="absolute right-6 bottom-12 z-30 h-29 w-auto md:bottom-24 md:h-40 lg:right-10 lg:bottom-6 lg:h-36 xl:right-16 xl:bottom-10 xl:h-44 2xl:right-20 2xl:bottom-16 2xl:h-50">
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
      <PromoPrizeModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        day={activeDay}
        prize={currentPrize}
      />
    </section>
  );
};

export default TechmasPromo;