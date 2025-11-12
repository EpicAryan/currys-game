// "use client";
// import Image from "next/image";
// import React, { useEffect, useMemo, useState } from "react";
// import { Badge } from "./promo-badge";
// import BackButton from "./ui/back-button";
// import CircleBackground from "./ui/circular-bg";
// import { useCurrentCampaign } from "../hooks/useCurrentCampaign";
// import { PRIZE_CONFIGS } from "@/lib/promo-prizes";
// import LightParticles from "./ui/nebula-forgery";
// import { motion } from 'motion/react';
// import BadgeGridSkeleton from "./ui/badge-grid-skeleton";
// import { useRouter } from "next/navigation";

// const TechmasPromo = () => {
//     const router = useRouter();
//   const { gifts, isLoading } = useCurrentCampaign(); 
//   const [activeDay, setActiveDay] = useState<number | null>(null);

//   const handleBadgeClick = (
//     day: number,
//     available: boolean,
//     missed: boolean,
//   ) => {
//     if (available && !missed) {
//       setActiveDay(day);
//       router.push("/result");
//       // TODO: Navigate to game/claim page
//     } else if (missed) {
//       console.log(`Day ${day} was missed`);
//       // TODO: Show missed message
//     } else {
//       console.log(`Day ${day} is still locked`);
//       // TODO: Show locked message
//     }
//   };

//   const giftMap = useMemo(() => {
//     const map = new Map();
//     gifts.forEach((gift) => {
//       map.set(gift.dayNumber, gift);
//     });
//     return map;
//   }, [gifts]);

//   useEffect(() => {
//     if (activeDay === null && gifts.length > 0) {
//       const firstAvailable = gifts.find(
//         (gift) => gift.available && !gift.missed
//       );
//       if (firstAvailable) {
//         setActiveDay(firstAvailable.dayNumber);
//       }
//     }
//   }, [gifts, activeDay]);

//   const badges = Array.from({ length: 12 }, (_, i) => {
//     const day = i + 1;
//     const giftStatus = giftMap.get(day);

//     const isAvailable = giftStatus?.available ?? false;
//     const isMissed = giftStatus?.missed ?? false;

//     return (
//       <Badge
//         key={day}
//         day={day}
//         isActive={activeDay === day}
//         isAvailable={isAvailable}
//         isMissed={isMissed}
//         prize={PRIZE_CONFIGS[day]}
//         onClick={() => handleBadgeClick(day, isAvailable, isMissed)}
//       />
//     );
//   });



//   return (
//     <section className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-b from-[#2A1F44] via-[#3D2F5B] to-[#4A3566]">
//       <CircleBackground />
//       <div className="absolute top-6 left-10 z-40 md:top-8 xl:top-10">
//         <BackButton />
//       </div>

//       {/* Currys Logo */}
//       <div className="absolute top-0 right-8 z-40 flex size-20 -translate-y-1/3 items-center justify-center rounded-full bg-white md:right-12 md:size-34 lg:right-[10vw] xl:size-44 2xl:size-50">
//         <h5 className="font-currys text-2xl font-semibold tracking-wide text-[#3D2683] md:text-4xl lg:text-5xl xl:text-6xl">
//           currys
//         </h5>
//         <div className="absolute -right-16 md:-right-16 lg:-right-20 bottom-0 lg:-bottom-3 2xl:bottom-0 -z-10 h-20 w-24 md:h-30 md:w-30 lg:h-36 lg:w-36 2xl:h-40 2xl:w-40 rotate-90">
//           <LightParticles />
//         </div>
//       </div>

//       {/* Header Text */}
//       <div className="font-currys relative z-10 w-full pt-20 text-center lg:pt-12 2xl:pt-20 flex flex-col items-center">
//         <h1
//           className="text-3xl font-semibold tracking-wide text-white md:text-5xl 2xl:text-7xl text-nowrap"
//           style={{
//             textShadow: "4px 4px 4px rgba(11, 4, 44, 0.12)",
//           }}
//         >
//           12 Days of Techmas
//         </h1>
//         <p className="pt-3 text-sm leading-tight text-[#CFC8F7] md:text-xl 2xl:text-2xl text-center max-w-xs md:max-w-4xl">
//           Play for a chance to win a different prize every day!
//           <br />
//           Play all 12 days and you will be entered into a draw for a{" "}
//           <span className="font-semibold">€1,000 Currys voucher.</span>
//         </p>
//       </div>

//       {/* Badge Grid with Loading State */}
//       <div className="relative z-30 mx-auto mt-12 max-w-6xl overflow-visible xl:mt-6 2xl:mt-12">
//         {isLoading ? (
//           <BadgeGridSkeleton />
//         ) : (
//           <div className="grid grid-cols-3 space-y-2 gap-x-12 place-self-center overflow-visible lg:grid-cols-4 xl:space-y-[4vh] 2xl:space-y-5 2xl:gap-x-15">
//             {badges.map((badge, index) => (
//               <div
//                 key={badge.key}
//                 className={`${
//                   index >= 4 && index <= 7
//                     ? "lg:translate-x-16 xl:translate-x-20 2xl:translate-x-24"
//                     : ""
//                 }`}
//               >
//                 {badge}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Snow Drift Bottom */}
//       <div className="absolute bottom-0 z-20 h-auto w-full">
//         <Image
//           src="/promo/snow-drift.png"
//           alt="snow drift"
//           width={2892}
//           height={1972}
//           priority
//           sizes="100vw"
//           className="hidden w-full object-cover lg:block"
//         />
//         <Image
//           src="/promo/snow-drift-mobile.png"
//           alt="snow drift"
//           width={910}
//           height={552}
//           priority
//           sizes="100vw"
//           className="block w-full object-cover lg:hidden"
//         />
//         {/* Jumping Deer */}
//         <div className="absolute right-6 bottom-12 z-30 h-29 w-auto md:bottom-24 md:h-40 lg:right-10 lg:bottom-6 lg:h-36 xl:right-16 xl:bottom-10 xl:h-44 2xl:right-20 2xl:bottom-16 2xl:h-50">
//           <Image
//             src="/promo/jumping-deer.png"
//             alt="deer"
//             width={400}
//             height={400}
//             sizes="(max-width: 768px) 116px, (max-width: 1024px) 160px, (max-width: 1280px) 144px, (max-width: 1536px) 176px, 200px"
//             className="object-fit h-full w-full"
//           />
//         </div>
//       </div>

//       {/* Snow Drift Right */}
//       <div className="absolute -right-1/2 bottom-14 h-auto w-full translate-x-1/16 translate-y-1/2 md:bottom-26 lg:bottom-8 2xl:bottom-10">
//         <Image
//           src="/promo/snow-drift-2.png"
//           alt="snow drift"
//           width={1446}
//           height={986}
//           sizes="70vw"
//           className="w-[70vw] object-cover"
//         />
//       </div>

//       {/* Magic Cluster Bottom Left */}
//       <div className="absolute bottom-20 md:bottom-36 lg:bottom-28 z-30 left-0 h-28 w-20 md:h-36 md:w-30 xl:h-36 xl:w-36 2xl:h-40 2xl:w-40">
//         <LightParticles />
//       </div>

//       {/* Gift Box 2 */}
//       <div className="absolute bottom-24 left-0 z-30 h-20 w-auto md:bottom-48 lg:bottom-40 md:h-22 2xl:h-[108px]">
//         <Image
//           src="/promo/gift-box-2.png"
//           alt="gift box"
//           width={108}
//           height={108}
//           sizes="(max-width: 768px) 80px, (max-width: 1024px) 88px, 108px"
//           className="object-fit h-full w-full"
//         />
//       </div>

//       {/* Gift Box 1 */}
//       <div className="absolute bottom-8 left-8 z-30 h-20 w-auto md:bottom-20 lg:bottom-4 lg:left-10 md:h-30 xl:h-35 2xl:h-[163px]">
//         <Image
//           src="/promo/gift-box-1.png"
//           alt="gift box"
//           width={163}
//           height={163}
//           sizes="(max-width: 768px) 80px, (max-width: 1024px) 120px, (max-width: 1280px) 140px, 163px"
//           className="object-fit h-full w-full"
//         />
//       </div>

//       {/* star 1 */}
//       <motion.div
//         className="hidden md:block absolute top-1/2 left-1/10 2xl:left-1/7 z-30 aspect-square size-13 xl:size-15"
//         animate={{ scale: [1, 1.2, 1] }}
//         transition={{
//           duration: 2.5,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//         style={{ willChange: "transform" }}
//       >
//         <Image
//           src="/promo/star.webp"
//           alt="star"
//           width={61}
//           height={61}
//           sizes="(max-width: 768px) 0px, (max-width: 1280px) 52px, 60px"
//           className="object-fit h-full w-full"
//         />
//       </motion.div>

//       {/* star 2 */}
//       <motion.div
//         className="hidden md:block absolute top-1/2 -translate-y-20 left-1/8 2xl:left-1/6 xl:translate-x-10 z-30 aspect-square size-10 xl:size-12"
//         animate={{ scale: [1, 1.15, 1] }}
//         transition={{
//           duration: 2,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 0.4,
//         }}
//         style={{ willChange: "transform" }}
//       >
//         <Image
//           src="/promo/star.webp"
//           alt="star"
//           width={61}
//           height={61}
//           sizes="(max-width: 768px) 0px, (max-width: 1280px) 40px, 48px"
//           className="object-fit h-full w-full"
//         />
//       </motion.div>

//       {/* star 3 */}
//       <motion.div
//         className="hidden md:block absolute bottom-1/4 right-1/7 2xl:right-1/5 z-30 aspect-square size-8 xl:size-10"
//         animate={{ scale: [1, 1.25, 1] }}
//         transition={{
//           duration: 3,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 0.8,
//         }}
//         style={{ willChange: "transform" }}
//       >
//         <Image
//           src="/promo/star.webp"
//           alt="star"
//           width={61}
//           height={61}
//           sizes="(max-width: 768px) 0px, (max-width: 1280px) 32px, 40px"
//           className="object-fit h-full w-full"
//         />
//       </motion.div>

    
//     </section>
//   );
// };

// export default TechmasPromo;
"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Badge } from "./promo-badge";
import BackButton from "./ui/back-button";
import CircleBackground from "./ui/circular-bg";
import { useCurrentCampaign } from "../hooks/useCurrentCampaign";
import LightParticles from "./ui/nebula-forgery";
import { motion, useAnimate } from 'motion/react';
import BadgeGridSkeleton from "./ui/badge-grid-skeleton";
import { useRouter } from "next/navigation";



const TechmasPromo = () => {
  const router = useRouter();
  const { gifts, isLoading } = useCurrentCampaign(); 

  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [scope, animate] = useAnimate();


  const handleBadgeClick = async (
    day: number,
    available: boolean,
    missed: boolean,
  ) => {
    if (available && !missed) {
      setActiveDay(day);
      
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const badgeElement = document.querySelector(`[data-badge-day="${day}"]`) as HTMLElement;
      
      if (!badgeElement) {
        console.error('Badge element not found!');
        router.push("/result");
        return;
      }
      
      const rect = badgeElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
      
      const translateX = viewportCenterX - centerX;
      const translateY = viewportCenterY - centerY;
      
      const scaleX = window.innerWidth / rect.width;
      const scaleY = window.innerHeight / rect.height;
      const scale = Math.max(scaleX, scaleY) * 2;
      
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: #4A3566;
        z-index: 9998;
        opacity: 0;
        pointer-events: none;
      `;
      overlay.id = 'page-transition-overlay';
      document.body.appendChild(overlay);
      
      badgeElement.style.position = 'fixed';
      badgeElement.style.top = `${rect.top}px`;
      badgeElement.style.left = `${rect.left}px`;
      badgeElement.style.width = `${rect.width}px`;
      badgeElement.style.height = `${rect.height}px`;
      badgeElement.style.zIndex = '9999';
      
      try {
        const overlayAnimation = animate(
          overlay,
          { opacity: 1 },
          { duration: 0.7, ease: "easeIn" }
        );
        
        await animate(
          badgeElement,
          { 
            x: translateX,
            y: translateY,
            scale: scale,
            filter: ["blur(0px)", "blur(0px)", "blur(4px)"],
            opacity: 1,
          },
          { 
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1]
          }
        );
        
        await overlayAnimation;
        await new Promise(resolve => setTimeout(resolve, 50));
        
        console.log('Animation completed, navigating...');
      } catch (error) {
        console.error('Animation error:', error);
      }
      
      router.push("/result");
    } else if (missed) {
      console.log(`Day ${day} was missed`);
    } else {
      console.log(`Day ${day} is still locked`);
    }
  };

  const giftMap = useMemo(() => {
    const map = new Map();
    gifts.forEach((gift) => {
      map.set(gift.dayNumber, gift);
    });
    return map;
  }, [gifts]);

  useEffect(() => {
    if (activeDay === null && gifts.length > 0) {
      const firstAvailable = gifts.find(
        (gift) => gift.available && !gift.missed
      );
      if (firstAvailable) {
        setActiveDay(firstAvailable.dayNumber);
      }
    }
  }, [gifts, activeDay]);

  useEffect(() => {
    return () => {
      const overlay = document.getElementById('page-transition-overlay');
      if (overlay) {
        overlay.remove();
      }
    };
  }, []);

  const PRIZE_SIZE_OVERRIDES: Record<number, string> = {
  1: "w-40 md:w-60 xl:w-72 2xl:w-76",  
  2: "w-16 md:w-24 xl:w-32 2xl:w-36",  
  3: "w-36 md:w-56 xl:w-68 2xl:w-72",
  4: "w-28 md:w-40 xl:w-48 2xl:w-52",
  5: "w-40 md:w-60 xl:w-68 2xl:w-72",
  6: "w-28 md:w-44 xl:w-56 2xl:w-60",
  7: "w-24 md:w-40 xl:w-52 2xl:w-56",
  8: "w-28 md:w-40 xl:w-48 2xl:w-52 mt-3 md:mt-5",
  9: "w-52 md:w-78 xl:w-92 2xl:w-100 rotate-30 ml-5",
  10: "w-36 md:w-54 xl:w-64 2xl:w-70",
  11: "w-24 md:w-40 xl:w-48 2xl:w-52",
  12: "w-24 md:w-38 xl:w-48 2xl:w-52", 

};

  const badges = Array.from({ length: 12 }, (_, i) => {
    const day = i + 1;
    const giftStatus = giftMap.get(day);

    const isAvailable = giftStatus?.available ?? false;
    const isMissed = giftStatus?.missed ?? false;
    
     const sizeClass = PRIZE_SIZE_OVERRIDES[day] || giftStatus?.className || "w-24 md:w-32 xl:w-36 2xl:w-56";

    const prizeConfig = giftStatus?.image_url ? {
      src: giftStatus.image_url,
      width: 400,
      height: 400,
      className: sizeClass,
      name: giftStatus.gift_name || `Day ${day} Prize`
    } : undefined;

    return (
      <Badge
        key={day}
        day={day}
        isActive={activeDay === day}
        isAvailable={isAvailable}
        isMissed={isMissed}
        prize={prizeConfig}
        onClick={() => handleBadgeClick(day, isAvailable, isMissed)}
        activeDay={activeDay}
      />
    );
  });

  return (
    <section 
      ref={scope}
      className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-b from-[#2A1F44] via-[#3D2F5B] to-[#4A3566]"
    >
      <CircleBackground />
      
      <div className="absolute top-6 left-10 z-40 md:top-8 xl:top-10">
        <BackButton />
      </div>

      {/* Currys Logo */}
      <div className="absolute top-0 right-8 z-40 flex size-20 -translate-y-1/3 items-center justify-center rounded-full bg-white md:right-12 md:size-34 lg:right-[10vw] xl:size-44 2xl:size-50">
        <h5 className="font-currys text-2xl font-semibold tracking-wide text-[#3D2683] md:text-4xl lg:text-5xl xl:text-6xl">
          currys
        </h5>
        <div className="absolute -right-16 md:-right-16 lg:-right-20 bottom-0 lg:-bottom-3 2xl:bottom-0 -z-10 h-20 w-24 md:h-30 md:w-30 lg:h-36 lg:w-36 2xl:h-40 2xl:w-40 rotate-90">
          <LightParticles />
        </div>
      </div>

      {/* Header Text */}
      <div className="font-currys relative z-10 w-full pt-20 text-center lg:pt-12 2xl:pt-20 flex flex-col items-center">
        <h1
          className="text-3xl font-semibold tracking-wide text-white md:text-5xl 2xl:text-7xl text-nowrap"
          style={{
            textShadow: "4px 4px 4px rgba(11, 4, 44, 0.12)",
          }}
        >
          12 Days of Techmas
        </h1>
        <p className="pt-3 text-sm leading-tight text-[#CFC8F7] md:text-xl 2xl:text-2xl text-center max-w-xs md:max-w-4xl">
          Play for a chance to win a different prize every day!
          <br />
          Play all 12 days and you will be entered into a draw for a{" "}
          <span className="font-semibold">€1,000 Currys voucher.</span>
        </p>
      </div>

      {/* Badge Grid with Loading State */}
      <div className="badge-container relative z-30 mx-auto mt-12 max-w-6xl overflow-visible xl:mt-6 2xl:mt-12">
        {isLoading ? (
          <BadgeGridSkeleton />
        ) : (
          <div className="grid grid-cols-3 space-y-2 gap-x-12 place-self-center overflow-visible lg:grid-cols-4 xl:space-y-[4vh] 2xl:space-y-5 2xl:gap-x-15">
            {badges.map((badge, index) => (
              <div
                key={badge.key}
                className={`min-w-0 flex items-center justify-center ${
                  index >= 4 && index <= 7
                    ? "lg:translate-x-16 xl:translate-x-20 2xl:translate-x-24"
                    : ""
                }`}
              >
                {badge}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Snow Drift Bottom */}
      <div className="absolute bottom-0 z-20 h-auto w-full">
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
        {/* Jumping Deer */}
        <div className="absolute right-6 bottom-12 z-30 h-29 w-auto md:bottom-24 md:h-40 lg:right-10 lg:bottom-6 lg:h-36 xl:right-16 xl:bottom-10 xl:h-44 2xl:right-20 2xl:bottom-16 2xl:h-50">
          <Image
            src="/promo/jumping-deer.png"
            alt="deer"
            width={400}
            height={400}
            sizes="(max-width: 768px) 116px, (max-width: 1024px) 160px, (max-width: 1280px) 144px, (max-width: 1536px) 176px, 200px"
            className="object-fit h-full w-full"
          />
        </div>
      </div>

      {/* Snow Drift Right */}
      <div className="absolute -right-1/2 bottom-14 h-auto w-full translate-x-1/16 translate-y-1/2 md:bottom-26 lg:bottom-8 2xl:bottom-10">
        <Image
          src="/promo/snow-drift-2.png"
          alt="snow drift"
          width={1446}
          height={986}
          sizes="70vw"
          className="w-[70vw] object-cover"
        />
      </div>

      {/* Magic Cluster Bottom Left */}
      <div className="absolute bottom-20 md:bottom-36 lg:bottom-28 z-30 left-0 h-28 w-20 md:h-36 md:w-30 xl:h-36 xl:w-36 2xl:h-40 2xl:w-40">
        <LightParticles />
      </div>

      {/* Gift Box 2 */}
      <div className="absolute bottom-24 left-0 z-30 h-20 w-auto md:bottom-48 lg:bottom-40 md:h-22 2xl:h-[108px]">
        <Image
          src="/promo/gift-box-2.png"
          alt="gift box"
          width={108}
          height={108}
          sizes="(max-width: 768px) 80px, (max-width: 1024px) 88px, 108px"
          className="object-fit h-full w-full"
        />
      </div>

      {/* Gift Box 1 */}
      <div className="absolute bottom-8 left-8 z-30 h-20 w-auto md:bottom-20 lg:bottom-4 lg:left-10 md:h-30 xl:h-35 2xl:h-[163px]">
        <Image
          src="/promo/gift-box-1.png"
          alt="gift box"
          width={163}
          height={163}
          sizes="(max-width: 768px) 80px, (max-width: 1024px) 120px, (max-width: 1280px) 140px, 163px"
          className="object-fit h-full w-full"
        />
      </div>

      {/* star 1 */}
      <motion.div
        className="hidden md:block absolute top-1/2 left-1/10 2xl:left-1/7 z-30 aspect-square size-13 xl:size-15"
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
          sizes="(max-width: 768px) 0px, (max-width: 1280px) 52px, 60px"
          className="object-fit h-full w-full"
        />
      </motion.div>

      {/* star 2 */}
      <motion.div
        className="hidden md:block absolute top-1/2 -translate-y-20 left-1/8 2xl:left-1/6 xl:translate-x-10 z-30 aspect-square size-10 xl:size-12"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
        style={{ willChange: "transform" }}
      >
        <Image
          src="/promo/star.webp"
          alt="star"
          width={61}
          height={61}
          sizes="(max-width: 768px) 0px, (max-width: 1280px) 40px, 48px"
          className="object-fit h-full w-full"
        />
      </motion.div>

      {/* star 3 */}
      <motion.div
        className="hidden md:block absolute bottom-1/4 right-1/7 2xl:right-1/5 z-30 aspect-square size-8 xl:size-10"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        style={{ willChange: "transform" }}
      >
        <Image
          src="/promo/star.webp"
          alt="star"
          width={61}
          height={61}
          sizes="(max-width: 768px) 0px, (max-width: 1280px) 32px, 40px"
          className="object-fit h-full w-full"
        />
      </motion.div>
    </section>
  );
};

export default TechmasPromo;
