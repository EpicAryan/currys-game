"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CTAProps {
  giftName: string 
  giftImageUrl: string
  isEligibleForDraw?: boolean
}

const CTA = ({ giftName, giftImageUrl, isEligibleForDraw = false}: CTAProps) => {
  const hasScore = isEligibleForDraw;

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
            <h2 className="font-currys mb-3 text-2xl text-black xl:text-3xl">
              {hasScore
                ? "Don't want to wait to see if you've won?"
                : "Didn't win anything today?"}
            </h2>
            <p className="font-currys mb-6 text-4xl leading-tight text-[#4C12A1] xl:text-[44px]">
              Buy the {giftName} now and get <br />
              <span className="font-semibold">FREE delivery </span> today only!*
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.92 }}
              className="cursor-pointer rounded-full bg-[#4C12A1] px-10 xl:px-12 py-3 xl:py-4 text-2xl xl:text-3xl leading-snug text-white shadow-lg transition-all hover:bg-[#4C12A1]/90 hover:shadow-xl"
            >
              Buy now
            </motion.button>
          </motion.div>
            <p
              className={`font-currys absolute text-xl xl:text-2xl text-black ${
                hasScore ? "bottom-6 xl:bottom-10" : "bottom-1/5"
              }`}
            >
              * Offer expires at midnight
            </p>
        </div>

        {!hasScore && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="absolute top-1/2 right-[15%] w-[280px] -translate-y-1/2 lg:w-[350px]"
          >
            <Image
              src={giftImageUrl}
              alt={giftName}
              width={350}
              height={350}
              className="h-auto w-full drop-shadow-2xl"
            />
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
        <div className="absolute inset-0 flex flex-col items-center md:items-start container mx-auto px-6 md:px-12 py-8 font-currys">
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
            <p className="mb-4 text-[#4C12A1] text-2xl leading-tight sm:text-3xl ">
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

            <p className="mt-3 text-base text-black absolute bottom-5">
              * Offer expires at midnight
            </p>
          {!hasScore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6 w-[180px] sm:w-[220px]"
            >
              <Image
                src={giftImageUrl}
                alt={giftName}
                width={220}
                height={220}
                className="h-auto w-full drop-shadow-2xl"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
