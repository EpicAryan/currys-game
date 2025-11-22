"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Badge } from "./promo-badge";
import BackButton from "./ui/back-button";
import CircleBackground from "./ui/circular-bg";
import { useCurrentCampaign } from "../hooks/useCurrentCampaign";
import LightParticles from "./ui/nebula-forgery";
import { motion, useAnimate } from "motion/react";
import BadgeGridSkeleton from "./ui/badge-grid-skeleton";
import { useRouter } from "next/navigation";
import { generateGameAccessURL } from "@/lib/game-access";

const TechmasPromo = () => {
  const router = useRouter();
  const { gifts, isLoading } = useCurrentCampaign();

  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [scope, animate] = useAnimate();

  const handleBadgeClick = async (
    day: number,
    available: boolean,
    missed: boolean,
  ) => {
    if (available && !missed) {
      setActiveDay(day);

      let secureURL = "";
      try {
        const result = await generateGameAccessURL(day);
        if (result.error || !result.url) {
          alert("Failed to access game. Please try again.");
          return;
        }
        secureURL = result.url;
      } catch (error) {
        console.error("Failed to generate game URL:", error);
        alert("Failed to access game. Please try again.");
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 50));

      const badgeElement = document.querySelector(
        `[data-badge-day="${day}"]`,
      ) as HTMLElement;

      if (!badgeElement) {
        const url = new URL(secureURL, window.location.origin);
        const timestamp = url.searchParams.get("t");
        const signature = url.searchParams.get("s");
        router.push(`/qualifio/day${day}?t=${timestamp}&s=${signature}`);
        return;
      }

      const rect = badgeElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;

      const translateX = viewportCenterX - centerX;
      const translateY = viewportCenterY - centerY;

      const scaleX = window.innerWidth / rect.width;
      const scaleY = window.innerHeight / rect.height;
      const scale = Math.max(scaleX, scaleY) * 1.5;

      // Create overlay
      const overlay = document.createElement("div");
      overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: #4A3566;
      z-index: 9998;
      opacity: 0;
      pointer-events: none;
    `;
      overlay.id = "page-transition-overlay";
      document.body.appendChild(overlay);

      const badgeClone = badgeElement.cloneNode(true) as HTMLElement;
      badgeClone.style.position = "fixed";
      badgeClone.style.top = `${rect.top}px`;
      badgeClone.style.left = `${rect.left}px`;
      badgeClone.style.width = `${rect.width}px`;
      badgeClone.style.height = `${rect.height}px`;
      badgeClone.style.zIndex = "9999";
      badgeClone.style.pointerEvents = "none";
      badgeClone.style.imageRendering = "high-quality";
      document.body.appendChild(badgeClone);

      badgeElement.style.opacity = "0";

      try {
        const overlayAnimation = animate(
          overlay,
          { opacity: 1 },
          { duration: 0.7, ease: "easeIn" },
        );

        await animate(
          badgeClone,
          {
            x: translateX,
            y: translateY,
            scale: scale,
            filter: ["blur(0px)", "blur(0px)", "blur(4px)"],
            opacity: 1,
          },
          {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          },
        );

        await overlayAnimation;
        await new Promise((resolve) => setTimeout(resolve, 50));
      } catch (error) {
        console.error("Animation error:", error);
      } finally {
        badgeClone.remove();
      }

      // Navigate to Qualifio page instead of game
      const url = new URL(secureURL, window.location.origin);
      const timestamp = url.searchParams.get("t");
      const signature = url.searchParams.get("s");
      router.push(`/qualifio/day${day}?t=${timestamp}&s=${signature}`);
    } else if (missed) {
      console.log(`Day ${day} was missed`);
    } else {
      console.log(`Day ${day} is still locked`);
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
        (gift) => gift.available && !gift.missed,
      );
      if (firstAvailable) {
        setActiveDay(firstAvailable.dayNumber);
      }
    }
  }, [gifts, activeDay]);

  useEffect(() => {
    return () => {
      const overlay = document.getElementById("page-transition-overlay");
      if (overlay) {
        overlay.remove();
      }
    };
  }, []);

  const PRIZE_SIZE_OVERRIDES: Record<number, string> = {
    1: "w-28 md:w-40 lg:w-36 xl:w-46 2xl:w-56",
    2: "w-30 md:w-44 lg:w-40 xl:w-50 2xl:w-64",
    3: "w-20 md:w-32 lg:w-28 xl:w-36 2xl:w-44 -translate-y-2",
    4: "w-16 md:w-24 lg:w-20 xl:w-28 2xl:w-36",
    5: "w-24 md:w-36 lg:w-32 xl:w-40 2xl:w-48 translate-y-1",
    6: "w-18 md:w-26 lg:w-22 xl:w-28 2xl:w-36",
    7: "w-18 md:w-26 lg:w-22 xl:w-30 2xl:w-38 translate-y-2",
    8: "w-18 md:w-26 lg:w-22 xl:w-30 2xl:w-38 translate-y-2",
    9: "w-16 md:w-26 lg:w-22 xl:w-30 2xl:w-38",
    10: "w-14 md:w-26 lg:w-20 xl:w-26 2xl:w-34 md:-translate-y-1",
    11: "w-24 md:w-38 lg:w-32 xl:w-40 2xl:w-52 translate-y-1",
    12: "w-28 md:w-44 lg:w-40 xl:w-48 2xl:w-56",
  };

  const badges = Array.from({ length: 12 }, (_, i) => {
    const day = i + 1;
    const giftStatus = giftMap.get(day);

    const isAvailable = giftStatus?.available ?? false;
    const isMissed = giftStatus?.missed ?? false;

    const sizeClass =
      PRIZE_SIZE_OVERRIDES[day] ||
      giftStatus?.className ||
      "w-24 md:w-32 xl:w-36 2xl:w-56";

    const prizeConfig = giftStatus?.image_url
      ? {
          src: giftStatus.image_url,
          width: 1500,
          height: 1500,
          className: sizeClass,
          name: giftStatus.gift_name || `Day ${day} Prize`,
        }
      : undefined;

    return (
      <Badge
        key={day}
        day={day}
        isActive={activeDay === day}
        isAvailable={isAvailable}
        isMissed={isMissed}
        prize={prizeConfig}
        onClick={() => handleBadgeClick(day, isAvailable, isMissed)}
        activeDay={activeDay}
      />
    );
  });

  return (
    <section
      ref={scope}
      className="relative min-h-[100dvh] overflow-hidden bg-[#2A234A]"
    >
      <CircleBackground />

      <div className="absolute top-4 left-10 z-40 md:top-8 xl:top-10">
        <BackButton />
      </div>

      {/* Currys Logo */}
      <div className="absolute top-0 right-6 z-40 flex size-25 -translate-y-1/4 items-center justify-center rounded-full md:right-12 md:size-36 lg:right-20 lg:size-42 xl:right-1/12 xl:size-55 2xl:size-65">
        <Image
          src="/curry-white-logo.png"
          alt="curry logo"
          fill
          quality={85}
          sizes="(min-width:1536px) 300px, (min-width:1280px) 240px, (min-width:1024px) 192px, (min-width:768px) 168px, 100px"
          className="h-full w-full object-contain"
        />
        <div className="absolute -right-10 bottom-8 -z-10 h-16 w-20 rotate-90 md:-right-16 md:h-30 md:w-30 lg:-right-10 lg:bottom-10 lg:h-28 lg:w-30 xl:bottom-16 2xl:bottom-16 2xl:h-40 2xl:w-40">
          <LightParticles />
        </div>
      </div>

      {/* Header Text */}
      <div className="font-currys relative z-10 flex w-full flex-col items-center pt-15 text-center md:pt-20 lg:pt-8 xl:pt-12 2xl:pt-12">
        <h1
          className="text-3xl font-semibold tracking-wide text-nowrap text-white md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-[66px]"
          style={{
            textShadow: "4px 4px 4px rgba(11, 4, 44, 0.12)",
          }}
        >
          12 Days of Techmas
        </h1>
        <p className="max-w-xs pt-1 text-center text-[13px] leading-tight font-light text-[#CFC8F7] md:max-w-4xl md:pt-3 md:text-xl lg:text-lg xl:text-xl 2xl:text-[22px]">
          Play for a chance to win a different prize every day!{" "}
          <br className="hidden md:block" />
          Play all 12 days and you will be entered into a draw for a
        </p>
        <p className="text-center text-lg font-semibold text-[#CFC8F7] md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl">
          €1,000 Currys voucher
        </p>
      </div>

      {/* Badge Grid with Loading State */}
      <div className="badge-container relative z-30 mx-auto mt-4 max-w-6xl overflow-visible pb-45 md:mt-8 md:pb-24 lg:mt-6 lg:pb-0 2xl:mt-10">
        {isLoading ? (
          <BadgeGridSkeleton />
        ) : (
          <div className="flex w-full justify-center">
            <div className="grid grid-cols-3 gap-x-9 gap-y-6 md:gap-y-8 lg:grid-cols-4 lg:gap-x-14 lg:gap-y-5 xl:gap-x-17 xl:gap-y-7 2xl:gap-y-8">
              {badges.map((badge, index) => (
                <div
                  key={badge.key}
                  className={`flex min-w-0 items-center justify-center ${
                    index >= 4 && index <= 7
                      ? "lg:translate-x-16 xl:translate-x-20 2xl:translate-x-24"
                      : ""
                  }`}
                  style={{
                    isolation: "isolate",
                  }}
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Snow Drift Bottom */}
      <div className="absolute bottom-0 z-20 h-auto w-full">
        <Image
          src="/promo/snow-drift.webp"
          alt="snow drift"
          width={2892}
          height={1972}
          priority
          sizes="100vw"
          className="hidden w-full object-cover lg:block"
        />
        <Image
          src="/promo/snow-drift-mobile.webp"
          alt="snow drift"
          width={910}
          height={552}
          priority
          sizes="100vw"
          className="block w-full object-cover lg:hidden"
        />
        {/* Jumping Deer */}
        <div className="absolute right-6 bottom-12 z-30 h-29 w-auto md:bottom-24 md:h-40 lg:right-10 lg:bottom-6 lg:h-36 xl:right-16 xl:bottom-10 xl:h-44 2xl:right-20 2xl:bottom-16 2xl:h-50">
          <Image
            src="/promo/jumping-deer.png"
            alt="deer"
            width={400}
            height={400}
            sizes="(max-width: 768px) 116px, (max-width: 1024px) 160px, (max-width: 1280px) 144px, (max-width: 1536px) 176px, 200px"
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
          sizes="70vw"
          className="w-[70vw] object-cover"
        />
      </div>

      {/* Magic Cluster Bottom Left */}
      <div className="absolute bottom-20 left-0 z-30 h-18 w-12 md:bottom-36 md:h-36 md:w-30 lg:bottom-20 lg:h-30 lg:w-22 xl:bottom-28 xl:h-36 xl:w-36 2xl:h-40 2xl:w-40">
        <LightParticles />
      </div>

      {/* Gift Box 2 */}
      <div className="absolute bottom-24 left-0 z-30 h-auto w-8 md:bottom-48 md:w-12 lg:bottom-28 xl:bottom-40 2xl:w-16">
        <Image
          src="/promo/gift-box-2.png"
          alt="gift box"
          width={108}
          height={108}
          sizes="(max-width: 768px) 32px, (max-width: 1280px) 48px, 64px"
          className="object-fit h-full w-full"
        />
      </div>

      {/* Gift Box 1 */}
      <div className="absolute bottom-8 left-8 z-30 h-auto w-18 md:bottom-20 md:w-26 lg:bottom-4 lg:left-10 xl:w-28 2xl:w-[143px]">
        <Image
          src="/promo/gift-box-1.png"
          alt="gift box"
          width={163}
          height={163}
          sizes="(max-width: 768px) 72px, (max-width: 1024px) 104px, (max-width: 1280px) 104px, 143px"
          className="object-fit h-full w-full"
        />
      </div>

      {/* star 1 */}
      <motion.div
        className="absolute top-1/2 left-1/10 z-30 hidden aspect-square size-13 md:block xl:size-15 2xl:left-1/7"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ willChange: "transform" }}
      >
        <Image
          src="/promo/star.webp"
          alt="star"
          width={61}
          height={61}
          sizes="(max-width: 768px) 52px, (max-width: 1280px) 52px, 60px"
          className="object-fit h-full w-full"
        />
      </motion.div>

      {/* star 2 */}
      <motion.div
        className="absolute top-1/2 left-1/8 z-30 hidden aspect-square size-10 -translate-y-20 md:block xl:size-12 xl:translate-x-10 2xl:left-1/6"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
        style={{ willChange: "transform" }}
      >
        <Image
          src="/promo/star.webp"
          alt="star"
          width={61}
          height={61}
          sizes="(max-width: 768px) 40px, (max-width: 1280px) 40px, 48px"
          className="object-fit h-full w-full"
        />
      </motion.div>

      {/* star 3 */}
      <motion.div
        className="absolute right-1/7 bottom-1/4 z-30 hidden aspect-square size-8 md:block xl:size-10 2xl:right-1/5"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        style={{ willChange: "transform" }}
      >
        <Image
          src="/promo/star.webp"
          alt="star"
          width={61}
          height={61}
          sizes="(max-width: 768px) 32px, (max-width: 1280px) 32px, 40px"
          className="object-fit h-full w-full"
        />
      </motion.div>
    </section>
  );
};

export default TechmasPromo;
