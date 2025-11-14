"use client";

import Image from "next/image";
import React, { useState } from "react";
import CircleBackground from "../ui/circular-bg";
import LightParticlesFast from "../ui/nebula-forgery";
import {motion} from 'motion/react';
import { useRouter } from "next/navigation";

const ResultSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  // Comprehensive email validation
  const validateEmail = (email: string): boolean => {
    // Check if email is empty
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    // Comprehensive email regex pattern
    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Additional checks
    const [localPart, domain] = email.split("@");

    // Check local part length
    if (localPart.length > 64) {
      setError("Email local part is too long");
      return false;
    }

    // Check domain length
    if (domain.length > 255) {
      setError("Email domain is too long");
      return false;
    }

    // Check for consecutive dots
    if (email.includes("..")) {
      setError("Email cannot contain consecutive dots");
      return false;
    }

    // Check if domain has at least one dot
    if (!domain.includes(".")) {
      setError("Email domain must contain a dot");
      return false;
    }

    setError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError(""); // Clear error on typing
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateEmail(email)) {
      setIsSubmitting(true);
      // Handle form submission logic here
      console.log("Valid email:", email);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        alert(`Prize check initiated for: ${email}`);
      }, 1000);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <CircleBackground />
      <div className="hidden lg:block absolute size-10 rotate-150 lg:left-0 xl:top-0 xl:size-12 2xl:size-16">
        <LightParticlesFast />
      </div>
      <div className="absolute -right-14 top-1/8 -z-10 size-16 -translate-x-1/2 rotate-0 lg:-right-16 lg:size-16 lg:top-0 lg:left-2/5 xl:size-20 2xl:size-24">
        <LightParticlesFast />
      </div>
      <div className="absolute left-0 top-1/4 -z-10 size-16 -translate-x-1/4 rotate-90 lg:-right-16 lg:size-16 lg:top-1/7 lg:left-1/5 xl:size-20 2xl:size-28">
        <LightParticlesFast />
      </div>

      <motion.div
        className=" absolute top-1/6 right-1/5 lg:left-8 2xl:left-1/14 2xl:top-1/4 z-30 aspect-square size-9 md:size-11 lg:size-9 xl:size-15"
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
          sizes="(max-width: 768px) 38px, (max-width: 1280px) 52px, 60px"
          className="object-fit h-full w-full"
        />
      </motion.div>

      {/* Currys Logo */}
      <div className="absolute top-0 left-8 z-40 flex size-20 -translate-y-1/3 items-center justify-center rounded-full bg-white shadow-xl md:left-12 md:size-28 lg:left-[8vw] xl:size-36 2xl:size-50">
        <h5 className="font-currys text-2xl font-semibold tracking-wide text-[#3D2683] md:text-4xl xl:text-5xl 2xl:text-6xl">
          currys
        </h5>
      </div>

      <div className="absolute top-6 right-10 z-40 aspect-square size-[31px] md:right-16 md:size-9 xl:top-8 xl:right-20 xl:size-11">
        <Image
          src="/result/menu-button.png"
          alt="button"
          width={45}
          height={45}
          className="h-full w-full cursor-pointer object-contain transition-all active:scale-95"
        />
      </div>

      {/* Main Container - Changed from grid to flex */}
      <div className="relative z-20 mx-auto flex h-full items-center px-6 lg:px-12">
        <div className="flex h-fit w-full flex-col gap-[16vh] lg:flex-row lg:gap-16">
          {/* Left Side - Score Section */}
          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center justify-center lg:items-start lg:space-y-2">
              <h2 className="font-currys text-lg tracking-wide text-white md:text-xl xl:text-2xl 2xl:text-3xl">
                Your score
              </h2>

              <div className="relative">
                <h1 className="font-currys text-[80px] leading-none font-semibold tracking-wider text-[#E5006D] text-shadow-md md:text-[90px] xl:text-[120px] 2xl:text-[140px]">
                  60
                </h1>
              </div>

              <div className="lg:space-y-1 text-center lg:text-start">
                <p className="font-currys text-base font-medium text-white md:text-xl xl:text-2xl 2xl:text-3xl">
                  Solid sleigh control!
                </p>
                <p className="font-currys text-base font-medium text-white md:text-xl xl:text-2xl 2xl:text-3xl">
                  Santa would be proud.
                </p>
              </div>

              <div className="mt-3 max-w-3xs rounded-lg bg-[#CAE7E6] p-3 md:max-w-xs md:p-4 xl:max-w-sm 2xl:mt-7 2xl:max-w-md 2xl:p-6">
                <p className="font-currys text-xs font-medium text-[#3D2683] md:text-base xl:text-lg 2xl:text-xl">
                  Play all 12 days for a chance to win €1,000 in Currys
                  vouchers!
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="z-40 flex flex-1 items-center justify-center mb-12">
            <div className="flex h-full w-full max-w-3xs flex-col justify-center space-y-6 md:max-w-xs xl:max-w-sm 2xl:max-w-md 2xl:space-y-10">
              <h2 className="font-currys text-center text-sm leading-snug text-gray-200 md:text-lg lg:text-start xl:text-xl 2xl:text-2xl">
                Santa is checking his list, enter your email to reveal if you
                have won today&apos;s prize!
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 2xl:space-y-6">
                <div className="space-y-2">
                  <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="mks1204@gmail.com"
                    className={`font-currys w-full rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:ring-purple-400 focus:outline-none md:px-6 md:py-3 md:text-base lg:rounded-xl xl:rounded-2xl xl:py-3.5 2xl:py-4 2xl:text-lg ${
                      error ? "ring-2 ring-red-500" : ""
                    }`}
                    aria-label="Email address"
                    aria-invalid={!!error}
                    aria-describedby={error ? "email-error" : undefined}
                  />
                  {error && (
                    <p
                      id="email-error"
                      className="px-2 text-xs font-medium text-red-300 md:text-sm 2xl:px-6 2xl:text-base"
                    >
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => router.push('/reveal')}
                  className="font-currys lg:mt-2 w-full cursor-pointer rounded-full bg-[#C6B5FF] px-8 py-3.5 text-sm leading-[120%] font-semibold text-[#4C12A1] transition-all hover:bg-[#D5C8FF] focus:outline-none active:scale-98 disabled:cursor-not-allowed disabled:opacity-70 lg:text-base xl:py-4 xl:text-lg 2xl:text-xl"
                >
                  {isSubmitting ? "Checking..." : "Reveal my prize"}
                </button>

                <div className="text-center -mt-3">
                  <a
                    href="#"
                    className="font-currys text-xs leading-[120%] text-white underline transition-colors hover:text-purple-200 md:text-sm lg:text-base 2xl:text-lg"
                  >
                    Take me shopping.
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Background Circle */}
      <div className="absolute -left-12 md:-left-14 -bottom-15 md:-bottom-1/3  z-10 aspect-square h-auto w-[120vw] md:w-[115vw] lg:top-1/2 lg:left-2/5 lg:w-[90vw] lg:translate-x-0 lg:-translate-y-1/2 overflow-auto">
        <Image
          src="/result/bg-circle.webp"
          alt="background decoration"
          width={2000}
          height={2000}
          className="hidden lg:block h-full w-full object-cover"
        />
        <Image
          src="/result/mobile-bg-circle.webp"
          alt="background decoration"
          width={600}
          height={595}
          className="lg:hidden h-full w-full object-contain"
        />
        <div className="absolute -right-16 bottom-0 -z-10 h-20 w-24 -translate-x-1/4 -translate-y-1/2 rotate-180 md:-right-16 md:h-30 md:w-30 lg:-bottom-3 lg:left-1/9 lg:h-36 lg:w-36 2xl:top-1/2 2xl:size-12">
          <LightParticlesFast />
        </div>
      </div>

      {/* Snow Drift Bottom */}
      <div className="pointer-events-none absolute bottom-0 z-30 h-auto w-full">
        <Image
          src="/promo/snow-drift.png"
          alt="snow drift"
          width={2892}
          height={1972}
          priority
          sizes="100vw"
          className="hidden w-full object-cover lg:block"
        />
        <Image
          src="/promo/snow-drift-mobile.png"
          alt="snow drift"
          width={910}
          height={552}
          priority
          sizes="100vw"
          className="block w-full object-cover lg:hidden"
        />
      </div>

      {/* Snow Drift Right */}
      <div className="absolute -right-1/2 bottom-14 z-20 h-auto w-full translate-x-1/16 translate-y-1/2 md:bottom-26 lg:bottom-8 lg:-z-10 2xl:bottom-10">
        <Image
          src="/promo/snow-drift-2.png"
          alt="snow drift"
          width={1446}
          height={986}
          sizes="70vw"
          className="w-[70vw] object-cover"
        />
      </div>

      {/* Santa */}
      <div className="absolute top-1/2 right-4 z-30 aspect-[27/37] h-auto w-32 -translate-y-1/2 md:right-10 md:w-46 lg:w-50 lg:left-1/2 lg:-translate-x-1/2 2xl:-translate-x-2/3 lg:translate-y-0 xl:w-64 lg:top-0 2xl:w-[378px]">
        <Image
          src="/result/santa.webp"
          alt="gift box"
          width={378}
          height={518}
          sizes="(max-width: 768px) 80px, (max-width: 1024px) 120px, (max-width: 1280px) 256px, 378px"
          className="object-fit h-full w-full"
        />
      </div>
      {/* Gift Box 1 */}
      <div className="absolute bottom-8 left-8 z-30 h-20 w-auto md:bottom-20 md:h-24 lg:bottom-4 lg:left-10 xl:h-30 2xl:h-[163px]">
        <Image
          src="/promo/gift-box-1.png"
          alt="gift box"
          width={163}
          height={163}
          sizes="(max-width: 768px) 80px, (max-width: 1024px) 120px, (max-width: 1280px) 120px, 163px"
          className="object-fit h-full w-full"
        />
      </div>
      {/* Gift Box 2 */}
      <div className="absolute bottom-24 left-0 z-30 h-20 w-auto md:bottom-30 md:h-16 xl:bottom-36 xl:h-20 2xl:bottom-40 2xl:h-[108px]">
        <Image
          src="/promo/gift-box-2.png"
          alt="gift box"
          width={108}
          height={108}
          sizes="(max-width: 768px) 80px, (max-width: 1024px) 80px, 108px"
          className="object-fit h-full w-full"
        />
        <div className="absolute -right-16 bottom-0 -z-10 hidden h-20 w-24 rotate-0 md:-right-16 md:h-24 md:w-10 lg:top-0 lg:left-1/2 lg:block xl:h-28 xl:w-12 2xl:top-0 2xl:h-36 2xl:w-16">
          <LightParticlesFast />
        </div>
      </div>

      {/* Candy Stick */}
      <div className="absolute right-8 bottom-8 z-10 h-auto -translate-x-3/4 md:bottom-20 lg:bottom-8 md:w-30 lg:left-1/2 lg:z-0 xl:bottom-16 2xl:bottom-24 2xl:w-[154px]">
        <Image
          src="/result/candy-stick.webp"
          alt="gift box"
          width={154}
          height={226}
          sizes="(max-width: 768px) 80px, (max-width: 1024px) 120px, (max-width: 1280px) 120px, 154px"
          className="object-fit h-full w-full"
        />
        <div className="absolute -right-16 bottom-0 -z-10 hidden h-20 w-24 rotate-180 md:-right-16 md:h-30 md:w-30 lg:bottom-[28%] lg:-left-1/3 lg:block lg:size-8 2xl:bottom-1/3">
          <LightParticlesFast />
        </div>
      </div>
    </section>
  );
};

export default ResultSection;
