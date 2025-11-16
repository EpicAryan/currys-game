"use client";

import React, { Suspense, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import StreakIndicator from "./streak-indicator";
import CongratulationsCard from "./congratulations-card";
import PrizeReveal from "./prize-reveal";
import CTA from "./cta";
import { useUserCampaignData } from "@/hooks/useUserCampaginData";

function RevealContent() {
  const router = useRouter();
  
  const [email, setEmail] = React.useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("curry_user_mail");
    
    if (!savedEmail) {
      alert("No email found. Please start from the game.");
      router.push("/promo");
      return;
    }
    
    setEmail(savedEmail);
  }, [router]);

  const { user, currentDay, streak, currentDayCoupon, currentDayGift } = useUserCampaignData(email);

  const { consecutiveDays, hasWonCoupon, isEligibleForDraw } = useMemo(() => {
    if (!streak || !currentDay) {
      return {
        consecutiveDays: 0,
        hasWonCoupon: false,
        isEligibleForDraw: false
      };
    }

    const isEligible = !!(currentDayGift?.gift_id && currentDayGift?.day_number);
    
    const wonCoupon = !!currentDayCoupon?.coupon_code;
    const consecutive = streak.filter(day => day.played && !day.missed).length;

    return {
      consecutiveDays: consecutive,
      hasWonCoupon: wonCoupon,
      isEligibleForDraw: isEligible
    };
  }, [streak, currentDay, currentDayCoupon, currentDayGift]);

  if (!email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2A1F44] via-[#3D2F5B] to-[#4A3566]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
          <p className="font-currys text-xl text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2A1F44] via-[#3D2F5B] to-[#4A3566]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
          <p className="font-currys text-xl text-white">Loading your prizes...</p>
        </div>
      </div>
    );
  }

  const shortGiftName = currentDayGift?.gift_name
    ? currentDayGift.gift_name.split(' ').slice(0, 2).join(' ')
    : 'Product';

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <StreakIndicator 
        currentStreak={consecutiveDays} 
        totalDays={12}
        streak={streak || []}
        currentDay={currentDay || 1}
      />

      <CongratulationsCard 
        couponCode={currentDayCoupon?.coupon_code}
        couponTitle={currentDayCoupon?.coupon_title}
        couponDescription={currentDayCoupon?.coupon_description}
        hasWonCoupon={hasWonCoupon}
        isEligibleForDraw={isEligibleForDraw}
      />

      {currentDayGift && isEligibleForDraw && (
        <PrizeReveal 
          giftName={shortGiftName}
          giftImageUrl={currentDayGift.gift_image_url}
          hasWonCoupon={hasWonCoupon}
          isEligibleForDraw={isEligibleForDraw}
        />
      )}

      {currentDayGift && (
        <CTA 
          giftName={shortGiftName}
          giftImageUrl={currentDayGift.gift_image_url}
          isEligibleForDraw={isEligibleForDraw}
        />
      )}
    </div>
  );
}

const RevealSection = () => {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2A1F44] via-[#3D2F5B] to-[#4A3566]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
          <p className="font-currys text-white text-lg">Loading...</p>
        </div>
      </div>
    }>
      <RevealContent />
    </Suspense>
  );
};

export default RevealSection;
