"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StripesBackground from "../ui/curved-strips-background";
import ConfettiBackground from "../ui/confetti-background";

interface CongratulationsCardProps {
  couponCode?: string | null
  couponTitle?: string
  couponDescription?: string
  hasWonCoupon: boolean
  isEligibleForDraw?: boolean
}

const CongratulationsCard = ({ 
  couponCode, 
  couponTitle, 
  couponDescription,
  hasWonCoupon,
  isEligibleForDraw = false
}: CongratulationsCardProps) => {
  const [copied, setCopied] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);
  const couponCardDesktopRef = useRef<HTMLDivElement>(null);
  const couponCardMobileRef = useRef<HTMLDivElement>(null);

  const EXPIRY_TEXT = "Use by 24 January 2026.";

  const handleCopy = async () => {
    if (!couponCode) return;
    
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = couponCode;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const isMobile = window.innerWidth < 768;
      const targetRef = isMobile ? couponCardMobileRef : couponCardDesktopRef;

      if (!targetRef.current) {
        console.error("Coupon card ref not found");
        setDownloading(false);
        return;
      }

      const element = targetRef.current;
      const clonedElement = element.cloneNode(true) as HTMLElement;

      clonedElement.style.position = "absolute";
      clonedElement.style.left = "-9999px";
      clonedElement.style.top = "0";
      document.body.appendChild(clonedElement);

      const canvas = await html2canvas(clonedElement, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      document.body.removeChild(clonedElement);

      const dataURL = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.download = `currys-coupon-${Date.now()}.png`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloading(false);
    } catch (error) {
      console.error("Error downloading image:", error);
      setDownloading(false);
    }
  };

  if (hasWonCoupon && couponCode) {
    return (
      <div className="relative z-40 h-full w-full bg-[#9286C5]/80 overflow-hidden">
        <div className="absolute inset-0 z-0 ">
          <ConfettiBackground />
        </div>
         <div className="absolute inset-0 overflow-hidden w-full h-[130%]">
        <StripesBackground gap={105} count={24} fill="#3A308C" />
        </div>

        <div className="relative z-20 h-full">
          <div aria-live="polite" role="status" className="sr-only z-10">
            {copied ? "Coupon code copied" : ""}
            {downloading ? "Downloading coupon image" : ""}
          </div>

          <div className="container mx-auto flex h-full w-full flex-col items-center justify-between p-6 md:flex-row xl:p-10">
            <div className="flex flex-1 flex-col items-center py-4 text-white">
              <div className="flex flex-col items-center space-y-2 md:items-start">
                <h1 className="font-currys text-center text-3xl font-semibold tracking-wide md:text-left lg:text-[2.5rem] xl:text-6xl">
                  Congratulations!!
                </h1>
                <sub className="font-currys w-full text-center text-base font-semibold tracking-wide text-gray-200 md:text-left md:text-xl lg:text-2xl xl:text-3xl">
                  You have won a Currys voucher.
                </sub>
              </div>
            </div>

            <div className="flex flex-1 items-end justify-end gap-8">
              {/* Mobile Coupon Card */}
              <div
                ref={couponCardMobileRef}
                className="relative my-8 block w-72 md:hidden"
              >
                <Image
                  src="/reveal/coupon-card-mobile.webp"
                  alt="coupon card"
                  width={286}
                  height={500}
                  className="h-full w-full object-cover"
                />

                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <h3 className="font-currys mb-2 text-6xl font-semibold tracking-tighter text-nowrap text-[#E30469]">
                    {couponTitle || "30% OFF"}
                  </h3>
                  <p className="font-currys text-center text-xs font-semibold tracking-wide text-black">
                    {couponDescription || "On your next purchase."}
                  </p>
                </div>

                <div className="absolute bottom-1/8 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <p className="font-currys mb-3 text-center text-[10px] font-semibold tracking-wide text-black uppercase">
                    COUPON CODE:
                  </p>
                  <p className="font-currys text-center text-xl font-semibold text-black uppercase">
                    {couponCode}
                  </p>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                  <p className="font-currys text-center text-[10px] font-semibold tracking-wide text-nowrap text-black uppercase">
                    T&C APPLY. {EXPIRY_TEXT}
                  </p>
                </div>

                <div
                  data-html2canvas-ignore
                  className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 gap-4 md:hidden"
                >
                  <button
                    aria-label="Copy coupon code"
                    onClick={handleCopy}
                    disabled={downloading}
                    className="grid size-11 place-items-center rounded-full border border-[#CFC8F7] bg-[#4C12A1] transition-all active:scale-95 disabled:opacity-50"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="checked"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        >
                          <Check className="size-6 text-white" />
                        </motion.div>
                      ) : (
                        <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="size-6">
                            <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                              <rect width="24" height="24" fill="#fff" />
                            </mask>
                            <g mask="url(#mask0)">
                              <path d="M18.6916 18.5002H8.30714C7.80197 18.5002 7.37439 18.3252 7.02439 17.9752C6.67439 17.6252 6.49939 17.1977 6.49939 16.6925V3.30799C6.49939 2.80283 6.67439 2.37524 7.02439 2.02524C7.37439 1.67524 7.80197 1.50024 8.30714 1.50024H15.2494L20.4994 6.75024V16.6925C20.4994 17.1977 20.3244 17.6252 19.9744 17.9752C19.6244 18.3252 19.1968 18.5002 18.6916 18.5002ZM14.4994 7.50024V3.00024H8.30714C8.23014 3.00024 8.15964 3.03233 8.09564 3.09649C8.03147 3.16049 7.99939 3.23099 7.99939 3.30799V16.6925C7.99939 16.7695 8.03147 16.84 8.09564 16.904C8.15964 16.9682 8.23014 17.0002 8.30714 17.0002H18.6916C18.7686 17.0002 18.8391 16.9682 18.9031 16.904C18.9673 16.84 18.9994 16.7695 18.9994 16.6925V7.50024H14.4994ZM4.30714 22.5002C3.80197 22.5002 3.37439 22.3252 3.02439 21.9752C2.67439 21.6252 2.49939 21.1977 2.49939 20.6925V7.50024H3.99939V20.6925C3.99939 20.7695 4.03147 20.84 4.09564 20.904C4.15964 20.9682 4.23014 21.0002 4.30714 21.0002H14.4994V22.5002H4.30714Z" fill="white" />
                            </g>
                          </svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>

                  <button
                    aria-label="Download coupon image"
                    onClick={handleDownload}
                    disabled={downloading}
                    className="grid size-11 place-items-center rounded-full border border-[#CFC8F7] bg-[#4C12A1] transition-all active:scale-95 disabled:opacity-50"
                  >
                    {downloading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-white" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 15 15" className="h-4 w-4">
                        <path d="M7.5 11.2885L3.23075 7.01925L4.28475 5.93475L6.75 8.4V0H8.25V8.4L10.7153 5.93475L11.7693 7.01925L7.5 11.2885ZM1.80775 15C1.30258 15 0.875 14.825 0.525 14.475C0.175 14.125 0 13.6974 0 13.1923V10.4808H1.5V13.1923C1.5 13.2693 1.53208 13.3398 1.59625 13.4038C1.66025 13.4679 1.73075 13.5 1.80775 13.5H13.1923C13.2693 13.5 13.3398 13.4679 13.4038 13.4038C13.4679 13.3398 13.5 13.2693 13.5 13.1923V10.4808H15V13.1923C15 13.6974 14.825 14.125 14.475 14.475C14.125 14.825 13.6974 15 13.1923 15H1.80775Z" fill="white" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Desktop Coupon Card */}
              <div ref={couponCardDesktopRef} className="relative hidden w-75 md:block lg:w-95 xl:w-130">
                <Image
                  src="/reveal/coupon-card-desktop.webp"
                  alt="coupon card"
                  width={602}
                  height={1052}
                  className="h-full w-full object-cover"
                />

                <div className="absolute top-[55%] left-1/5 -translate-x-1/4 -translate-y-1/2">
                  <h3 className="font-currys mb-1 text-4xl font-semibold tracking-tighter text-[#E30469] lg:text-5xl xl:mb-2 xl:text-6xl">
                    {couponTitle || "30% OFF"}
                  </h3>
                  <p className="font-currys text-center text-[10px] font-semibold text-black lg:text-xs">
                    {couponDescription || "On your next purchase."}
                  </p>
                </div>

                <div className="absolute top-1/2 right-[5%] -translate-y-1/2">
                  <p className="font-currys text-center text-[9px] font-semibold tracking-wide text-black uppercase lg:text-[10px]">
                    COUPON CODE:
                  </p>
                  <p className="font-currys text-center text-xs font-semibold text-black uppercase lg:text-base xl:text-sm text-wrap max-w-[120px]">
                    {couponCode}
                  </p>
                </div>

                <div className="absolute right-2 bottom-[5%] lg:right-[5%] xl:right-[7%]">
                  <p className="font-currys text-center text-[8px] font-semibold tracking-wide text-black uppercase lg:text-[9px] xl:text-[10px]">
                    {EXPIRY_TEXT}
                  </p>
                </div>
              </div>

              {/* Desktop buttons */}
              <div className="hidden flex-col gap-4 md:flex">
                <button
                  aria-label="Copy coupon code"
                  onClick={handleCopy}
                  disabled={downloading}
                  className="grid size-8 place-items-center rounded-full bg-[#FFECB7] transition-all hover:bg-[#FFECB7]/80 active:scale-95 disabled:opacity-50 lg:size-10"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div key="checked" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}>
                        <Check className="size-6 text-[#213038]" />
                      </motion.div>
                    ) : (
                      <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="size-6">
                          <mask id="mask1" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <rect width="24" height="24" fill="#fff" />
                          </mask>
                          <g mask="url(#mask1)">
                            <path d="M18.6916 18.5002H8.30714C7.80197 18.5002 7.37439 18.3252 7.02439 17.9752C6.67439 17.6252 6.49939 17.1977 6.49939 16.6925V3.30799C6.49939 2.80283 6.67439 2.37524 7.02439 2.02524C7.37439 1.67524 7.80197 1.50024 8.30714 1.50024H15.2494L20.4994 6.75024V16.6925C20.4994 17.1977 20.3244 17.6252 19.9744 17.9752C19.6244 18.3252 19.1968 18.5002 18.6916 18.5002ZM14.4994 7.50024V3.00024H8.30714C8.23014 3.00024 8.15964 3.03233 8.09564 3.09649C8.03147 3.16049 7.99939 3.23099 7.99939 3.30799V16.6925C7.99939 16.7695 8.03147 16.84 8.09564 16.904C8.15964 16.9682 8.23014 17.0002 8.30714 17.0002H18.6916C18.7686 17.0002 18.8391 16.9682 18.9031 16.904C18.9673 16.84 18.9994 16.7695 18.9994 16.6925V7.50024H14.4994ZM4.30714 22.5002C3.80197 22.5002 3.37439 22.3252 3.02439 21.9752C2.67439 21.6252 2.49939 21.1977 2.49939 20.6925V7.50024H3.99939V20.6925C3.99939 20.7695 4.03147 20.84 4.09564 20.904C4.15964 20.9682 4.23014 21.0002 4.30714 21.0002H14.4994V22.5002H4.30714Z" fill="#213038" />
                          </g>
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                <button
                  aria-label="Download coupon image"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="grid size-8 place-items-center rounded-full bg-[#FFECB7] text-[#213038] transition-all hover:bg-[#FFECB7]/80 active:scale-95 disabled:opacity-50 lg:size-10"
                >
                  {downloading ? (
                    <Loader2 className="h-4 w-4 animate-spin text-[#213038]" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 15 15" className="h-4 w-4">
                      <path d="M7.5 11.2885L3.23075 7.01925L4.28475 5.93475L6.75 8.4V0H8.25V8.4L10.7153 5.93475L11.7693 7.01925L7.5 11.2885ZM1.80775 15C1.30258 15 0.875 14.825 0.525 14.475C0.175 14.125 0 13.6974 0 13.1923V10.4808H1.5V13.1923C1.5 13.2693 1.53208 13.3398 1.59625 13.4038C1.66025 13.4679 1.73075 13.5 1.80775 13.5H13.1923C13.2693 13.5 13.3398 13.4679 13.4038 13.4038C13.4679 13.3398 13.5 13.2693 13.5 13.1923V10.4808H15V13.1923C15 13.6974 14.825 14.125 14.475 14.475C14.125 14.825 13.6974 15 13.1923 15H1.80775Z" fill="#213038" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isEligibleForDraw && !hasWonCoupon) {
    return (
      <div className="relative z-40 h-full w-full bg-[#9286C5]/80 py-12 min-h-58 md:min-h-0 flex items-center justify-center">
       <div className="absolute inset-0 overflow-hidden w-full h-[190%]">
        <StripesBackground gap={105} count={24} fill="#3A308C" />
        </div>

        <div className="relative z-20 flex items-center justify-center">
          <h2 className="font-currys text-center text-2xl font-semibold text-white lg:text-3xl xl:text-4xl px-6">
            No prize today, but you&apos;re still in the running!
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-40 h-full w-full bg-[#9286C5]/80 py-12 min-h-58 md:min-h-0 flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden w-full h-[190%]">
        <StripesBackground gap={105} count={24} fill="#3A308C" />
        </div>

      <div className="relative z-20 flex items-center justify-center">
        <h2 className="font-currys text-center text-2xl font-semibold text-white lg:text-3xl xl:text-4xl px-6">
          No prize today, but try again tomorrow for more treats!
        </h2>
      </div>
    </div>
  );
};

export default CongratulationsCard;
