// components/reveal/congratulations-card.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const COUPON_CODE = "30CURRYS2025";
const EXPIRY_TEXT = "Use by 24 January 2026.";

const CongratulationsCard = () => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(COUPON_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // Fallback (no packages)
      const ta = document.createElement("textarea");
      ta.value = COUPON_CODE;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="relative z-40 h-full w-full bg-[#3A308C]"
    >
      {/* Live region for screen readers */}
      <div aria-live="polite" role="status" className="sr-only">
        {copied ? "Coupon code copied" : ""}
      </div>

      <div className="container mx-auto flex h-full w-full flex-col items-center justify-between p-6 xl:p-10 md:flex-row">
        <div className="flex flex-1 flex-col items-center py-4 text-white">
          <div className="space-y-2">
            <h1 className="font-currys text-3xl lg:text-[2.5rem] xl:text-6xl font-semibold">You sleighed it!</h1>
            <sub className="font-currys text-xl lg:text-2xl xl:text-3xl font-semibold">
              Santa&apos; dropped your gift - grab <br /> your coupon!
            </sub>
          </div>
        </div>

        <div className="flex flex-1 items-end justify-end gap-8">
          {/* Coupon card area */}
          <div className="relative w-75 lg:w-95 xl:w-130">
            <Image
              src="/reveal/coupon-card-desktop.webp"
              alt="coupon card"
              width={602}
              height={1052}
              className="h-full w-full object-cover"
            />

            {/* Left: offer */}
            <div className="absolute top-[55%] left-1/5 -translate-x-1/4 -translate-y-1/2">
              <h3 className="font-currys mb-1 xl:mb-2 text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tighter text-[#E30469]">
                30% OFF
              </h3>
              <p className="font-currys text-center text-[10px] lg:text-xs font-semibold text-black">
                On your next purchase.
              </p>
            </div>

            {/* Code */}
            <div className="absolute top-1/2 right-[5%] -translate-y-1/2">
              <p className="font-currys text-center text-[9px] lg:text-[10px] font-semibold tracking-wide text-black uppercase">
                COUPON CODE:
              </p>
              <p className="font-currys text-center text-xs lg:text-base xl:text-lg font-semibold text-black uppercase">
                {COUPON_CODE}
              </p>
            </div>

            {/* Expiry */}
            <div className="absolute right-2 lg:right-[5%] xl:right-[7%] bottom-[5%]">
              <p className="font-currys text-center text-[8px] lg:text-[9px] xl:text-[10px] font-semibold tracking-wide text-black uppercase">
                {EXPIRY_TEXT}
              </p>
            </div>

            {/* Right-side actions (copy active, others disabled for now) */}
          </div>
            <div className="flex flex-col gap-4">
              {/* Copy button */}
              <button
                aria-label="Copy coupon code"
                onClick={handleCopy}
                className="grid size-8 lg:size-10 place-items-center rounded-full bg-[#FFECB7] transition-all hover:bg-[#FFECB7]/80 active:scale-95"
              >
                {/* existing clipboard SVG */}
                <svg xmlns="http://www.w3.org/2000/svg"  fill="none" className="size-6">
                  <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#fff" />
                  </mask>
                  <g mask="url(#mask0)">
                    <path
                      d="M18.6916 18.5002H8.30714C7.80197 18.5002 7.37439 18.3252 7.02439 17.9752C6.67439 17.6252 6.49939 17.1977 6.49939 16.6925V3.30799C6.49939 2.80283 6.67439 2.37524 7.02439 2.02524C7.37439 1.67524 7.80197 1.50024 8.30714 1.50024H15.2494L20.4994 6.75024V16.6925C20.4994 17.1977 20.3244 17.6252 19.9744 17.9752C19.6244 18.3252 19.1968 18.5002 18.6916 18.5002ZM14.4994 7.50024V3.00024H8.30714C8.23014 3.00024 8.15964 3.03233 8.09564 3.09649C8.03147 3.16049 7.99939 3.23099 7.99939 3.30799V16.6925C7.99939 16.7695 8.03147 16.84 8.09564 16.904C8.15964 16.9682 8.23014 17.0002 8.30714 17.0002H18.6916C18.7686 17.0002 18.8391 16.9682 18.9031 16.904C18.9673 16.84 18.9994 16.7695 18.9994 16.6925V7.50024H14.4994ZM4.30714 22.5002C3.80197 22.5002 3.37439 22.3252 3.02439 21.9752C2.67439 21.6252 2.49939 21.1977 2.49939 20.6925V7.50024H3.99939V20.6925C3.99939 20.7695 4.03147 20.84 4.09564 20.904C4.15964 20.9682 4.23014 21.0002 4.30714 21.0002H14.4994V22.5002H4.30714Z"
                      fill="#213038"
                    />
                  </g>
                </svg>
              </button>

              {/* Message button (disabled placeholder) */}
              <button
                aria-label="Share message (coming soon)"
                className="grid h-10 w-10 place-items-center rounded-full bg-[#FFECB7] text-[#213038] transition-all hover:bg-[#FFECB7]/80 active:scale-95"
                title="Coming soon"
              >
                {/* your message SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="h-6 w-6">
                  <mask id="mask0_357_22526" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="white" />
                  </mask>
                  <g mask="url(#mask0_357_22526)">
                    <path d="M12.0004 12.0573L4.00037 6.94176V17.1918C4.00037 17.2816 4.0292 17.3553 4.08687 17.413C4.14453 17.4707 4.21828 17.4995 4.30812 17.4995H13.2504V18.9995H4.30812C3.80295 18.9995 3.37537 18.8245 3.02537 18.4745C2.67537 18.1245 2.50037 17.6969 2.50037 17.1918V5.80726C2.50037 5.30209 2.67537 4.87451 3.02537 4.52451C3.37537 4.17451 3.80295 3.99951 4.30812 3.99951H19.6926C20.1978 3.99951 20.6254 4.17451 20.9754 4.52451C21.3254 4.87451 21.5004 5.30209 21.5004 5.80726V12.7495H20.0004V6.94176L12.0004 12.0573ZM12.0004 10.4995L19.8466 5.49951H4.15412L12.0004 10.4995ZM18.8081 21.8938L17.7639 20.8495L19.5794 18.9995H15.0581V17.4995H19.5889L17.7389 15.6495L18.8081 14.6053L22.4524 18.2495L18.8081 21.8938ZM4.00037 6.94176V18.336V12.7495V12.8725V5.49951V6.94176Z" fill="#213038"/>
                  </g>
                </svg>
              </button>

              {/* Download button (disabled placeholder) */}
              <button
                aria-label="Download image (coming soon)"
                className="grid h-10 w-10 place-items-center rounded-full bg-[#FFECB7] text-[#213038] transition-all hover:bg-[#FFECB7]/80 active:scale-95"
                title="Coming soon"
              >
                {/* your download SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 15 15" className="h-4 w-4">
                  <path d="M7.5 11.2885L3.23075 7.01925L4.28475 5.93475L6.75 8.4V0H8.25V8.4L10.7153 5.93475L11.7693 7.01925L7.5 11.2885ZM1.80775 15C1.30258 15 0.875 14.825 0.525 14.475C0.175 14.125 0 13.6974 0 13.1923V10.4808H1.5V13.1923C1.5 13.2693 1.53208 13.3398 1.59625 13.4038C1.66025 13.4679 1.73075 13.5 1.80775 13.5H13.1923C13.2693 13.5 13.3398 13.4679 13.4038 13.4038C13.4679 13.3398 13.5 13.2693 13.5 13.1923V10.4808H15V13.1923C15 13.6974 14.825 14.125 14.475 14.475C14.125 14.825 13.6974 15 13.1923 15H1.80775Z" fill="#213038"/>
                </svg>
              </button>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CongratulationsCard;
