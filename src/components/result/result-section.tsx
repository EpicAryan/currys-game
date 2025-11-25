"use client";

import Image from "next/image";
import React, { useState, Suspense, useEffect, useMemo } from "react";
import CircleBackground from "../ui/circular-bg";
import LightParticlesFast from "../ui/nebula-forgery";
import { motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifySignature } from "@/lib/hmac";
import { rewardCouponGift } from "@/lib/rewardCouponGift";
import MenuButton from "../ui/result-menu-button";

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const day = searchParams.get("day") || "";
  const score = searchParams.get("score") || "";
  const timestamp = searchParams.get("t") || "";
  const signature = searchParams.get("s") || "";

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const savedEmail = localStorage.getItem("curry_user_mail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const scoreMessage = useMemo(() => {
    const scoreNum = parseInt(score, 10);

    if (scoreNum === 0) {
      return {
        line1: "No gifts made it down the chimney",
        line2: "this time - try again another day!",
      };
    } else if (scoreNum > 0 && scoreNum < 11) {
      return {
        line1: "Santa loves a trier!",
        line2: "Better luck next sled.",
      };
    } else if (scoreNum >= 10 && scoreNum < 41) {
      return {
        line1: "A few presents in the snow, but you",
        line2: "delivered some Christmas joy!",
      };
    } else {
      return {
        line1: "Solid sleigh control!",
        line2: "Santa would be proud.",
      };
    }
  }, [score]);

  useEffect(() => {
    async function verify() {
      if (!day || !score || !timestamp || !signature) {
        alert("Invalid URL - missing required parameters");
        router.push("/");
        return;
      }

      const isValid = await verifySignature(day, score, timestamp, signature);

      if (!isValid) {
        alert("🚨 Security Alert: URL has been tampered with or expired!");
        router.push("/");
        return;
      }
      setIsVerified(true);
      setIsVerifying(false);
    }

    verify();
  }, [day, score, timestamp, signature, router]);

  const validateEmail = (email: string): boolean => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    const [localPart, domain] = email.split("@");

    if (localPart.length > 64) {
      setError("Email local part is too long");
      return false;
    }

    if (domain.length > 255) {
      setError("Email domain is too long");
      return false;
    }

    if (email.includes("..")) {
      setError("Email cannot contain consecutive dots");
      return false;
    }

    if (!domain.includes(".")) {
      setError("Email domain must contain a dot");
      return false;
    }

    setError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail.trim()) {
      localStorage.setItem("curry_user_mail", newEmail);
    }

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const dayNumber = parseInt(day.replace(/^day/, ""), 10);
      const scoreNum = parseInt(score, 10);

      await rewardCouponGift({
        score: scoreNum,
        email: email,
        currentDay: dayNumber,
      });

      localStorage.setItem("curry_user_mail", email);

      router.push("/reveal");
    } catch (error) {
      console.error("❌ Failed to reward gift:", error);
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isVerifying) {
    return (
      <section className="relative h-screen w-full overflow-hidden">
        <CircleBackground />
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            <p className="font-currys text-xl text-white md:text-2xl">
              Verifying your score...
            </p>
            <p className="font-currys mt-2 text-sm text-gray-300 md:text-base">
              Please wait
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!isVerified) {
    return null;
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <CircleBackground />
      <div className="absolute hidden size-10 rotate-150 lg:left-0 lg:block xl:top-0 xl:size-12 2xl:size-16">
        <LightParticlesFast />
      </div>
      <div className="absolute top-1/8 -right-14 -z-10 size-16 -translate-x-1/2 rotate-0 lg:top-0 lg:-right-16 lg:left-2/5 lg:size-16 xl:size-20 2xl:size-24">
        <LightParticlesFast />
      </div>
      <div className="absolute top-1/4 left-0 -z-10 size-16 -translate-x-1/4 rotate-90 lg:top-1/7 lg:-right-16 lg:left-1/5 lg:size-16 xl:size-20 2xl:size-28">
        <LightParticlesFast />
      </div>

      <motion.div
        className="absolute top-1/6 right-1/5 z-30 aspect-square size-9 md:size-11 lg:left-8 lg:size-9 xl:size-15 2xl:top-1/4 2xl:left-1/14"
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
      <div className="absolute top-0 left-8 z-40 flex size-24 -translate-y-1/4 items-center justify-center rounded-full md:left-16 md:size-36 lg:left-[8vw] xl:size-48 2xl:left-[10vw] 2xl:size-56">
        <Image
          src="/curry-white-logo.png"
          alt="curry logo"
          fill
          quality={85}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="absolute top-6 right-10 z-40 aspect-square size-[31px] md:right-16 md:size-9 xl:top-8 xl:right-20 xl:size-11">
        <MenuButton />
      </div>

      {/* Main Container */}
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
                  {score}
                </h1>
              </div>

              <div className="text-center lg:space-y-1 lg:text-start">
                <p className="font-currys text-base font-medium text-white md:text-xl xl:text-2xl 2xl:text-3xl">
                  {scoreMessage.line1}
                </p>
                <p className="font-currys text-base font-medium text-white md:text-xl xl:text-2xl 2xl:text-3xl">
                  {scoreMessage.line2}
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
          <div className="z-40 mb-5 flex flex-1 items-center justify-center md:mb-12">
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
                    disabled={isSubmitting}
                    className={`font-currys w-full rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:ring-purple-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:px-6 md:py-3 md:text-base lg:rounded-xl xl:rounded-2xl xl:py-3.5 2xl:py-4 2xl:text-lg ${
                      error ? "ring-2 ring-red-500" : ""
                    }`}
                    aria-label="Email address"
                    aria-invalid={!!error}
                    aria-describedby={error ? "email-error" : undefined}
                    required
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
                  className="font-currys w-full cursor-pointer rounded-full bg-[#C6B5FF] px-8 py-3.5 text-sm leading-[120%] font-semibold text-[#4C12A1] transition-all hover:bg-[#D5C8FF] focus:outline-none active:scale-98 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 lg:mt-2 lg:text-base xl:py-4 xl:text-lg 2xl:text-xl"
                >
                  {isSubmitting ? "Checking..." : "Reveal my prize"}
                </button>

                <div className="-mt-3 text-center">
                  <a
                    href="https://www.currys.ie/12-days-of-techmas.html"
                    className="font-currys text-xs leading-[120%] text-white underline transition-colors hover:text-purple-200 md:text-sm lg:text-base 2xl:text-lg"
                  >
                    T&Cs apply
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* All decorative elements */}
      <div className="absolute -bottom-15 -left-12 z-10 aspect-square h-auto w-[120vw] overflow-auto md:-bottom-1/3 md:-left-14 md:w-[115vw] lg:top-1/2 lg:left-2/5 lg:w-[90vw] lg:translate-x-0 lg:-translate-y-1/2">
        <Image
          src="/result/bg-circle.webp"
          alt="background decoration"
          width={2000}
          height={2000}
          quality={95}
          priority
          sizes="(min-width: 1024px) 90vw, (min-width: 768px) 115vw, 120vw"
          className="hidden h-full w-full object-cover lg:block"
        />
        <Image
          src="/result/mobile-bg-circle.webp"
          alt="background decoration"
          width={600}
          height={595}
          priority
          sizes="(min-width: 1024px) 90vw, (min-width: 768px) 115vw, 120vw"
          className="h-full w-full object-contain lg:hidden"
        />
        <div className="absolute -right-16 bottom-0 -z-10 h-20 w-24 -translate-x-1/4 -translate-y-1/2 rotate-180 md:-right-16 md:h-30 md:w-30 lg:-bottom-3 lg:left-1/9 lg:h-36 lg:w-36 2xl:top-1/2 2xl:size-12">
          <LightParticlesFast />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 z-30 h-auto w-full">
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
      </div>

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

      <div className="absolute top-1/2 right-4 z-30 aspect-[27/37] h-auto w-32 -translate-y-1/2 md:right-10 md:w-46 lg:top-0 lg:left-1/2 lg:w-50 lg:-translate-x-1/2 lg:translate-y-0 xl:w-64 2xl:w-[378px] 2xl:-translate-x-2/3">
        <Image
          src="/result/santa.webp"
          alt="gift box"
          width={378}
          height={518}
          sizes="(max-width: 768px) 80px, (max-width: 1024px) 120px, (max-width: 1280px) 256px, 378px"
          className="object-fit h-full w-full"
        />
      </div>

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

      <div className="absolute right-8 bottom-8 z-10 h-auto -translate-x-3/4 md:bottom-20 md:w-30 lg:bottom-8 lg:left-1/2 lg:z-0 xl:bottom-16 2xl:bottom-24 2xl:w-[154px]">
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
}

const ResultSection = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2A1F44] via-[#3D2F5B] to-[#4A3566]">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            <p className="font-currys text-lg text-white">Loading...</p>
          </div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
};

export default ResultSection;
