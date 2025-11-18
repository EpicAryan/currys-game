"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CTAProps {
  giftName: string 
  giftImageUrl: string
  isEligibleForDraw?: boolean
  currentDay: number 
}

const CTA = ({ 
  giftName, 
  giftImageUrl, 
  isEligibleForDraw = false,
  currentDay 
}: CTAProps) => {
  const hasScore = isEligibleForDraw;

  const CTA_IMAGE_SIZES: Record<number, { 
    mobile: string; 
    desktop: string;
  }> = {
    1: { 
       mobile: "w-[70vw]", 
      desktop: "lg:w-[38vw] translate-x-[7vw]" 
    },
    2: { 
      mobile: "w-[32vw] bottom-[18%]", 
      desktop: "lg:w-[20vw] -translate-x-[2vw]" 
    },
    3: { 
      mobile: "w-[60vw] bottom-[7%]", 
      desktop: "lg:w-[38vw] translate-x-[7vw]" 
    },
    4: { 
      mobile: "w-[45vw] bottom-[12%]", 
      desktop: "lg:w-[30vw] translate-x-[3vw]" 
    },
    5: { 
      mobile: "w-[55vw] bottom-[8%]", 
      desktop: "lg:w-[38vw] translate-x-[7vw]" 
    },
    6: { 
      mobile: "w-[55vw] bottom-[8%]", 
      desktop: "lg:w-[35vw] translate-x-[6vw]" 
    },
    7: { 
      mobile: "w-[48vw] bottom-[10%]", 
      desktop: "lg:w-[30vw] translate-x-[3vw]" 
    },
    8: { 
      mobile: "w-[48vw] bottom-[10%]", 
      desktop: "lg:w-[30vw] translate-x-[3vw]"
    },
    9: { 
    mobile: "w-[64vw] bottom-[5%]", 
      desktop: "lg:w-[40vw] translate-x-[8vw]"  
    },
    10: { 
       mobile: "w-[64vw] bottom-[5%]", 
      desktop: "lg:w-[40vw] translate-x-[8vw]" 
    },
    11: { 
       mobile: "w-[50vw] bottom-[12%]", 
      desktop: "lg:w-[30vw] translate-x-[3vw]" 
    },
    12: { 
        mobile: "w-[50vw] bottom-[12%]", 
      desktop: "lg:w-[30vw] translate-x-[3vw]"  
    },
  };

  const imageSize = CTA_IMAGE_SIZES[currentDay] || {
    mobile: "w-[180px] sm:w-[220px]",
    desktop: "w-[280px] lg:w-[350px]"
  };

  return (
    <section className="relative z-50 w-full">
      {/* Desktop Background */}
      <div className="relative hidden w-full lg:block">
        <Image
          src={
            hasScore
              ? "/reveal/cta-bg-desktop.webp"
              : "/reveal/cta-bg-zero-desktop.webp"
          }
          alt="CTA Background"
          width={1920}
          height={hasScore ? 680 : 900}
          className="h-auto w-full"
        />
        <div className="absolute inset-0 container mx-auto flex items-center justify-start px-6 lg:px-12 ">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-lg text-left"
          >
            <h2 className="font-currys mb-3 text-xl text-black xl:text-2xl 2xl:text-3xl">
              {hasScore
                ? "Don't want to wait to see if you've won?"
                : "Didn't win anything today?"}
            </h2>
            <p className="font-currys mb-6 text-3xl leading-tight text-[#4C12A1] xl:text-4xl 2xl:text-[44px] max-w-sm xl:max-w-xl">
              Buy the {giftName} now and get <br />
              <span className="font-semibold">FREE delivery </span> today only!*
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.92 }}
              className="cursor-pointer rounded-full bg-[#4C12A1] px-10 xl:px-12 py-3 xl:py-4 text-xl xl:text-3xl leading-snug text-white shadow-lg transition-all hover:bg-[#4C12A1]/90 hover:shadow-xl"
            >
              Buy now
            </motion.button>
          </motion.div>
          <p
            className={`font-currys absolute text-lg xl:text-2xl text-black ${
              hasScore ? "bottom-6 xl:bottom-10" : "bottom-[15%]"
            }`}
          >
            * Offer expires at midnight
          </p>
        </div>

        {/*  Desktop */}
        {!hasScore && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className={`absolute top-1/2 right-1/7 -translate-y-11/20 ${imageSize.desktop}`}
          >
            <div className="relative w-full aspect-square">
              <Image
                src={giftImageUrl}
                alt={giftName}
                fill
                sizes="(max-width: 1024px) 400px, 800px"
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile Background */}
      <div className="relative block w-full lg:hidden">
        <Image
          src={
            hasScore
              ? "/reveal/cta-bg-mobile.webp"
              : "/reveal/cta-bg-zero-mobile.webp"
          }
          alt="CTA Background"
          width={768}
          height={hasScore ? 400 : 600}
          className="h-auto w-full"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-start container mx-auto px-6 md:px-12 py-12 font-currys">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-md text-start"
          >
            <h2 className="mb-2 text-lg font-normal text-black ">
              {hasScore
                ? "Don't want to wait to see if you've won?"
                : "Didn't win anything today?"}
            </h2>
            <p className="mb-4 text-[#4C12A1] text-xl leading-tight sm:text-3xl ">
              Buy the {giftName} now and get{" "}<br/>
              <span className="font-semibold">FREE delivery </span>today only!*
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full leading-snug bg-[#4C12A1] px-10 py-3 font-normal text-sm text-white shadow-lg tracking-wide"
            >
              Buy now
            </motion.button>
          </motion.div>

          <p className="mt-3 text-base md:text-lg text-black absolute bottom-5 md:bottom-12">
            * Offer expires at midnight
          </p>

          {/* Mobile*/}
          {!hasScore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className={`absolute bottom-4 left-1/2 -translate-x-1/2 ${imageSize.mobile}`}
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={giftImageUrl}
                  alt={giftName}
                  fill
                  sizes="(max-width: 640px) 180px, 220px"
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
