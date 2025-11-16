"use client";
import React from "react";
import Image from "next/image";

interface PrizeRevealProps {
  giftName: string
  giftImageUrl: string
  hasWonCoupon: boolean
  isEligibleForDraw?: boolean
  currentDay: number
}

const PrizeReveal = ({ 
  giftName, 
  giftImageUrl,
  hasWonCoupon,
  isEligibleForDraw = false,
  currentDay 
}: PrizeRevealProps) => {
  if (!isEligibleForDraw) {
    return null;
  }

  const PRIZE_SIZE_OVERRIDES: Record<number, { 
    mobile: string; 
    desktop: string;
  }> = {
    1: { 
      mobile: "w-124 md:w-170", 
      desktop: "w-88 lg:w-140 xl:w-180"
    },
    2: { 
      mobile: "w-52 md:w-64", 
      desktop: "w-88 lg:w-64 xl:w-72" 
    },
    3: { 
       mobile: "w-110 md:w-130", 
      desktop: "w-88 lg:w-130 xl:w-150" 
    },
    4: { 
      mobile: "w-90 md:w-100", 
      desktop: "w-88 lg:w-100 xl:w-120" 
    },
    5: { 
      mobile: "w-136 md:w-180", 
      desktop: "w-88 lg:w-150 xl:w-190" 
    },
    6: { 
      mobile: "w-100 md:w-110", 
      desktop: "w-88 lg:w-100 xl:w-140"
    },
    7: { 
     mobile: "w-90 md:w-110", 
      desktop: "w-88 lg:w-100 xl:w-140" 
    },
    8: { 
       mobile: "w-90 md:w-100 translate-y-6", 
      desktop: "w-88 lg:w-100 xl:w-130 translate-y-10"  
    },
    9: { 
       mobile: "w-120 md:w-140", 
      desktop: "w-88 lg:w-140 xl:w-160" 
    },
    10: { 
   mobile: "w-120 md:w-140", 
      desktop: "w-88 lg:w-130 xl:w-160"  
    },
    11: { 
       mobile: "w-90 md:w-120", 
      desktop: "w-88 lg:w-100 xl:w-120"  
    },
    12: { 
      mobile: "w-90 md:w-120", 
      desktop: "w-88 lg:w-100 xl:w-130" 
    },
  };

  const config = PRIZE_SIZE_OVERRIDES[currentDay] || {
    mobile: "w-56 md:w-72",
    desktop: "w-80 lg:w-92 xl:w-100"
  };

  const headingText = hasWonCoupon 
    ? "You have also been entered into today's lucky draw."
    : "You've entered today's lucky draw.";

  return (
    <div className="relative bg-[#CFC8F7] py-12 xl:py-20">
      <div className="z-30 container mx-auto flex w-full flex-col px-6 pb-28 md:flex-row xl:px-12">
        <div className="font-currys flex flex-1 flex-col space-y-6">
          <h2 className="text-center text-2xl font-semibold text-black md:mt-8 md:text-3xl lg:text-start xl:text-5xl">
            {headingText}
          </h2>

          <div className="relative flex items-center justify-center py-6 lg:hidden h-64 md:h-80">
            <div className={`absolute ${config.mobile} aspect-square`}>
              <Image
                src={giftImageUrl}
                alt={giftName}
                fill
                sizes="(max-width: 768px) 288px, 384px"
                className="object-contain"
                priority
              />
            </div>
          </div>

          <p className="w-full max-w-xs md:max-w-lg place-self-center text-center text-base text-[#3C3C3C] md:text-xl lg:place-self-start lg:text-start xl:text-2xl">
            Check your email in the next 72 hours to see if you have won {giftName}.
          </p>

          <div className="z-20 w-full max-w-xs md:max-w-lg place-self-center rounded-xl bg-white p-4 text-xs font-semibold text-[#4C12A1] md:p-6 md:text-base xl:mt-8 lg:place-self-start text-center lg:text-start">
            Play ALL 12 days to be entered into the Grand Prize Draw for €1,000
            in Currys vouchers!
          </div>
        </div>

        <div className="z-40 hidden flex-1 lg:flex relative items-center justify-center">
          <div className={`absolute ${config.desktop} aspect-square`}>
            <Image
              src={giftImageUrl}
              alt={giftName}
              fill
              sizes="(max-width: 1024px) 480px, (max-width: 1280px) 560px, 640px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Snow Drift Bottom */}
      <div className="absolute bottom-0 z-10 h-auto w-full">
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
      <div className="absolute bottom-24 left-0 z-10 h-20 w-auto md:bottom-40 lg:bottom-24 md:h-20 xl:bottom-40 lg:h-18 xl:h-22">
        <Image
          src="/promo/gift-box-2.png"
          alt="gift box"
          width={108}
          height={108}
          className="object-fit h-full w-full"
        />
      </div>

      {/* Gift Box 1 */}
      <div className="absolute bottom-8 left-8 z-10 h-20 w-auto md:bottom-20 lg:bottom-4 lg:left-10 md:h-24 lg:h-20 xl:h-35">
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
