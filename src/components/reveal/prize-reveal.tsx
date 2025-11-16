"use client";
import React from "react";
import Image from "next/image";

interface PrizeRevealProps {
  giftName: string
  giftImageUrl: string
  hasWonCoupon: boolean
  isEligibleForDraw?: boolean
}

const PrizeReveal = ({ 
  giftName, 
  giftImageUrl,
  hasWonCoupon,
  isEligibleForDraw= false
}: PrizeRevealProps) => {
  if (!isEligibleForDraw) {
    return null;
  }

  const headingText = hasWonCoupon 
    ? "You have also been entered into today's lucky draw."
    : "You've entered today's lucky draw.";

  return (
    <div className="relative bg-[#CFC8F7] py-12 lg:py-20">
      <div className="z-30 container mx-auto flex w-full flex-col px-6 pb-28 md:flex-row xl:px-12">
        <div className="font-currys flex flex-1 flex-col space-y-6">
          <h2 className="text-center text-2xl font-semibold text-black md:mt-8 md:text-3xl lg:text-start xl:text-5xl">
            {headingText}
          </h2>

          <div className="flex items-center justify-center py-6 lg:hidden">
            <div className="h-auto w-44 md:w-60">
              <Image
                src={giftImageUrl}
                alt={giftName}
                width={230}
                height={290}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <p className="w-full max-w-xs md:max-w-lg place-self-center text-center text-base text-[#3C3C3C] md:text-xl lg:place-self-start lg:text-start xl:text-2xl">
            Check your email in the next 72 hours to see if you have won {giftName}.
          </p>

          <div className="z-20 w-full max-w-xs md:max-w-lg place-self-center rounded-xl bg-white p-4 text-xs font-semibold text-[#4C12A1] md:p-6 md:text-base lg:mt-8 lg:place-self-start text-center lg:text-start">
            Play ALL 12 days to be entered into the Grand Prize Draw for €1,000
            in Currys vouchers!
          </div>
        </div>

        <div className="z-40 hidden flex-1 items-center justify-center lg:flex">
          <div className="absolute h-auto w-60 lg:w-56 xl:w-100">
            <Image
              src={giftImageUrl}
              alt={giftName}
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
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
      <div className="absolute bottom-24 left-0 z-10 h-20 w-auto md:h-30 lg:bottom-40 lg:h-22">
        <Image
          src="/promo/gift-box-2.png"
          alt="gift box"
          width={108}
          height={108}
          className="object-fit h-full w-full"
        />
      </div>

      {/* Gift Box 1 */}
      <div className="absolute bottom-8 left-8 z-10 h-20 w-auto lg:bottom-4 lg:left-10 lg:h-30 xl:h-35">
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
