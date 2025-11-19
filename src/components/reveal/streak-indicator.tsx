"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  ShareIcon,
  FireIcon,
  LockIcon,
  FireIconWithCoupon,
  CopyIcon,
} from "./icons";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";

interface StreakDay {
  dayNumber: number;
  played: boolean;
  missed: boolean;
  playedAt?: string | null;
  coupon?: {
    coupon_code: string;
    coupon_title: string;
  } | null;
}

interface StreakIndicatorProps {
  currentStreak: number;
  totalDays: number;
  streak: StreakDay[];
  currentDay: number;
}

const StreakIndicator = ({
  currentStreak,
  totalDays,
  streak,
  currentDay,
}: StreakIndicatorProps) => {
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>(
    {},
  );

  const couponCodes: { [key: number]: string } = {};
  streak.forEach((day) => {
    if (day.coupon && day.coupon.coupon_code) {
      couponCodes[day.dayNumber - 1] = day.coupon.coupon_code;
    }
  });

  const handleCopy = async (code: string, dayIndex: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedStates((prev) => ({ ...prev, [dayIndex]: true }));

      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [dayIndex]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async () => {
    try {
      const url = window.location.href.replace(/\/reveal$/, "");

      if (navigator.share) {
        await navigator.share({
          title: "My Quest",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied!");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  return (
    <div className="relative z-50 bg-[#2A234A]">
      <div className="relative container mx-auto px-6 py-6 md:px-12">
        <button
          onClick={handleShare}
          className="group absolute top-8 right-6 hidden size-12 items-center justify-center rounded-full md:right-12 md:flex lg:size-14"
        >
          <div className="absolute inset-0 rounded-full">
            <Image
              src="/reveal/streak-bg.webp"
              alt=""
              fill
              className="rounded-full object-cover"
            />
          </div>
          <ShareIcon className="relative z-10 mr-1 h-6 w-6 text-white transition-transform group-hover:scale-110" />
        </button>

        <div className="flex flex-col items-center gap-3 md:items-start">
          <h2 className="font-currys text-xs text-white md:text-xl xl:text-2xl">
            {currentStreak} {currentStreak === 1 ? "day" : "days"} in a row!{" "}
            <span className="lg:hidden">
              Click the icons to uncover coupon codes.
            </span>
            <span className="hidden lg:inline">
              Roll over the icons to uncover coupon codes.
            </span>
          </h2>

          <div className="flex items-center gap-1.5 md:gap-3">
            {Array.from({ length: totalDays }).map((_, index) => {
              const dayNumber = index + 1;
              const hasCoupon = couponCodes[index];
              const dayData = streak[index];
              const isPlayed = dayData?.played || false;
              const isMissed = dayData?.missed || false;
              const isFuture = dayNumber > currentDay;

              const isUnlocked = isPlayed;
              const isLocked = isFuture;
              const isMissedDay = isMissed && !isFuture;

              return (
                <Popover key={index}>
                  <PopoverTrigger asChild>
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative flex size-5.5 cursor-pointer items-center justify-center rounded-full disabled:cursor-default md:size-8 lg:size-10"
                      disabled={!hasCoupon}
                    >
                      <div className="absolute inset-0 overflow-hidden rounded-full">
                        <Image
                          src="/reveal/streak-bg.webp"
                          alt=""
                          fill
                          className={`object-cover ${
                            isMissedDay
                              ? "opacity-30 grayscale"
                              : isLocked
                                ? "opacity-50"
                                : "opacity-100"
                          }`}
                        />
                      </div>

                      {hasCoupon && (
                        <motion.div
                          className="absolute right-0 bottom-0 z-20 size-1.5 rounded-full bg-[#E5006D] md:size-2.5"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [1, 0.7, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      )}

                      <div className="relative z-10 flex items-center justify-center">
                        {isUnlocked ? (
                          hasCoupon ? (
                            <FireIconWithCoupon className="size-3 md:size-5" />
                          ) : (
                            <FireIcon className="size-3 md:size-5" />
                          )
                        ) : isMissedDay ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-3 text-red-400 md:size-5"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        ) : (
                          <LockIcon className="size-3 text-white/40 md:size-5" />
                        )}
                      </div>
                    </motion.button>
                  </PopoverTrigger>

                  {hasCoupon && (
                    <PopoverContent
                      className="z-[100] w-auto border-none bg-[#E5006D] px-2.5 py-1 shadow-lg md:px-4 md:py-2"
                      side="bottom"
                      align="start"
                      sideOffset={10}
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        <code className="font-currys max-w-3xs text-[10px] font-medium tracking-wider text-white md:text-lg lg:max-w-lg">
                          {couponCodes[index]}
                        </code>

                        <button
                          onClick={() => handleCopy(couponCodes[index], index)}
                          className="flex-shrink-0 rounded-full bg-[#F9D2E5] p-1 transition-colors md:p-1.5"
                          aria-label="Copy code"
                        >
                          <AnimatePresence mode="wait">
                            {copiedStates[index] ? (
                              <motion.div
                                key="checked"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 25,
                                }}
                              >
                                <Check className="size-3 text-[#E5006D] md:size-4" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="copy"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <CopyIcon className="size-3 md:size-4" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                      </div>
                    </PopoverContent>
                  )}
                </Popover>
              );
            })}
          </div>

          <div className="block md:hidden">
            <Button
              onClick={handleShare}
              className="font-currys mt-3 overflow-visible rounded-4xl border border-[#CFC8F7] bg-transparent !px-6 !pr-8 leading-snug text-[#CFC8F7] [&_svg]:overflow-visible"
            >
              <span className="flex items-center gap-2.5 mb-1">
                Share the quest
                <ShareIcon className="size-5 flex-shrink-0 overflow-visible text-[#CFC8F7] mt-1" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakIndicator;
