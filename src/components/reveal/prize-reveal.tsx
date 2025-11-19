"use client";
import React from "react";
import Image from "next/image";

interface PrizeRevealProps {
  giftName: string;
  giftImageUrl: string;
  hasWonCoupon: boolean;
  isEligibleForDraw?: boolean;
  currentDay: number;
}

const PrizeReveal = ({
  giftName,
  giftImageUrl,
  hasWonCoupon,
  isEligibleForDraw = false,
  currentDay,
}: PrizeRevealProps) => {
  if (!isEligibleForDraw) {
    return null;
  }

  const PRIZE_SIZE_OVERRIDES: Record<
    number,
    {
      mobile: string;
      desktop: string;
    }
  > = {
    1: {
      mobile: "w-90 md:w-110",
      desktop: "w-100 xl:w-140 ",
    },
    2: {
      mobile: "w-100 md:w-115",
      desktop: "w-100 xl:w-150",
    },
    3: {
      mobile: "w-66 md:w-84",
      desktop: "w-72 xl:w-100",
    },
    4: {
      mobile: "w-84 md:w-100",
      desktop: "w-56 xl:w-72",
    },
    5: {
      mobile: "w-80 md:w-100",
      desktop: "w-80 xl:w-120",
    },
    6: {
      mobile: "w-60 md:w-72",
      desktop: "w-60 xl:w-84",
    },
    7: {
      mobile: "w-64 md:w-80",
      desktop: "w-70 xl:w-90",
    },
    8: {
      mobile: "w-60 md:w-74 translate-y-1",
      desktop: "w-60 xl:w-80 translate-y-4",
    },
    9: {
      mobile: "w-60 md:w-72",
      desktop: "w-56 xl:w-76",
    },
    10: {
      mobile: "w-56 md:w-72",
      desktop: "w-64 xl:w-82",
    },
    11: {
      mobile: "w-90 md:w-120",
      desktop: "w-100 xl:w-120",
    },
    12: {
      mobile: "w-90 md:w-120",
      desktop: "w-90 xl:w-130",
    },
  };

  const config = PRIZE_SIZE_OVERRIDES[currentDay] || {
    mobile: "w-56 md:w-72",
    desktop: "w-80 lg:w-92 xl:w-100",
  };

  const BG_CIRCLE_OVERRIDES: Record<
    number,
    {
      mobile: string;
      desktop: string;
    }
  > = {
    1: {
      mobile: "h-[100%] w-[75%] md:w-[45%]",
      desktop: "h-[100%] w-[100%] translate-y-0 xl:translate-y-10",
    },
    2: {
      mobile: "h-[100%] w-[70%] md:w-[45%]",
      desktop: "h-[90%] w-[90%] translate-y-0 xl:translate-y-2",
    },
    3: {
      mobile: "h-[100%] w-[70%] md:w-[45%]",
      desktop: "h-[120%] w-[120%] translate-y-8 xl:translate-y-14",
    },
    4: {
      mobile: "h-[100%] w-[70%] md:w-[45%]",
      desktop: "h-[160%] w-[160%] translate-y-16 xl:translate-y-24",
    },
    5: {
      mobile: "h-[100%] w-[70%] md:w-[45%]",
      desktop: "h-[110%] w-[110%] translate-y-4 xl:translate-y-12",
    },
    6: {
      mobile: "h-[100%] w-[75%] md:w-[45%]",
      desktop: "h-[160%] w-[160%] translate-y-18 xl:translate-y-30",
    },
    7: {
      mobile: "h-[100%] w-[70%] md:w-[45%]",
      desktop: "h-[130%] w-[130%] translate-y-8 xl:translate-y-12",
    },
    8: {
      mobile: "h-[100%] w-[70%] md:w-[45%]",
      desktop: "h-[140%] w-[140%] translate-y-8 xl:translate-y-12",
    },
    9: {
      mobile: "h-[100%] w-[70%] md:w-[45%]",
      desktop: "h-[160%] w-[160%] translate-y-20 xl:translate-y-28",
    },
    10: {
      mobile: "h-[100%] w-[70%] md:w-[45%]",
      desktop: "h-[150%] w-[150%] translate-y-20 xl:translate-y-28",
    },

    11: {
      mobile: "h-[100%] w-[70%] md:w-[45%]",
      desktop: "h-[105%] w-[105%] translate-y-12 xl:translate-y-16",
    },
    12: {
      mobile: "h-[100%] w-[70%] md:w-[45%]",
      desktop: "h-[105%] w-[105%] translate-y-4 xl:translate-y-12",
    },
  };

  const bgCircleConfig = BG_CIRCLE_OVERRIDES[currentDay] || {
    mobile: "w-64 md:w-72 h-64 md:h-72 translate-x-0 translate-y-0",
    desktop: "w-80 xl:w-96 h-80 xl:h-96 translate-x-0 translate-y-0",
  };

  const headingText = hasWonCoupon
    ? "You have also been entered into today's lucky draw."
    : "You've entered today's lucky draw.";

  return (
    <div className="relative bg-[#CFC8F7] py-12 xl:py-20">
      <div className="z-30 container mx-auto flex w-full flex-col px-6 pb-24 md:flex-row xl:px-12 2xl:pb-28">
        <div className="font-currys flex flex-1 flex-col space-y-4 xl:space-y-6">
          <h2 className="text-center text-2xl font-semibold text-black md:mt-8 md:text-3xl lg:text-start xl:text-5xl">
            {headingText}
          </h2>

          <div className="relative flex h-64 items-center justify-center py-6 md:h-80 lg:hidden">
            <div className={`absolute z-20 ${config.mobile} aspect-square`}>
              <Image
                src={giftImageUrl}
                alt={giftName}
                fill
                sizes="(max-width: 768px) 800px, 1200px"
                className="object-contain"
                priority
              />
            </div>
            <div
              className={`absolute left-1/2 -translate-x-1/2 ${bgCircleConfig.mobile} rounded-full bg-[#A68ADC]/35`}
            />
          </div>

          <p className="w-full max-w-xs place-self-center text-center text-base text-[#3C3C3C] md:max-w-lg md:text-xl lg:place-self-start lg:text-start xl:text-2xl">
            Check your email in the next 72 hours to see if you have won{" "}
            {giftName}.
          </p>

          <div className="z-20 w-full max-w-xs place-self-center rounded-xl bg-white p-4 text-center text-xs font-semibold text-[#4C12A1] md:max-w-lg md:p-6 md:text-base lg:place-self-start lg:p-4 lg:text-start xl:mt-8 xl:p-6">
            Play ALL 12 days to be entered into the Grand Prize Draw for €1,000
            in Currys vouchers!
          </div>
        </div>

        <div className="relative z-0 hidden flex-1 items-center justify-center lg:flex lg:translate-y-6">
          <div className={`absolute ${config.desktop} aspect-square`}>
            <Image
              src={giftImageUrl}
              alt={giftName}
              fill
              sizes="(max-width: 1024px) 600px, (max-width: 1280px) 800px, 1000px"
              className="object-contain"
              priority
            />
            <div
              className={`absolute -bottom-8 left-1/2 -translate-x-1/2 ${bgCircleConfig.desktop} -z-99 rounded-full bg-[#A68ADC]/35`}
            />
          </div>
        </div>
      </div>

      {/* Snow Drift Bottom */}
      <div className="absolute bottom-0 z-10 h-auto w-full">
        <Image
          src="/promo/snow-drift.webp"
          alt="snow drift"
          width={2892}
          height={1972}
          className="hidden w-full object-cover lg:block"
        />
        <Image
          src="/promo/snow-drift-mobile.webp"
          alt="snow drift"
          width={910}
          height={552}
          className="block w-full object-cover lg:hidden"
        />
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

      {/* Gift Box 2 */}
      <div className="absolute bottom-24 left-0 z-10 h-20 w-auto md:bottom-40 md:h-20 lg:bottom-20 lg:h-18 xl:bottom-40 xl:h-22">
        <Image
          src="/promo/gift-box-2.png"
          alt="gift box"
          width={108}
          height={108}
          className="object-fit h-full w-full"
        />
      </div>

      {/* Gift Box 1 */}
      <div className="absolute bottom-8 left-8 z-10 h-20 w-auto md:bottom-20 md:h-24 lg:bottom-4 lg:left-10 lg:h-20 xl:h-35">
        <Image
          src="/promo/gift-box-1.png"
          alt="gift box"
          width={163}
          height={163}
          className="object-fit h-full w-full"
        />
      </div>
    </div>
  );
};

export default PrizeReveal;
