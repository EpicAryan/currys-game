"use client";

import { useUserCampaignData } from "@/hooks/useUserCampaginData";

export default function RevealPage() {
    const { user, currentDay, streak, currentDayCoupon, currentDayGift } = useUserCampaignData("garv@test.com");
  return (
    <div>
        <h1>Reveal Page</h1>
        <p>User: {user?.email}</p>
        <p>Current Day: {currentDay}</p>
        <p>Streak: {JSON.stringify(streak)}</p>
        <p>Current Day Coupon: {currentDayCoupon?.coupon_code}</p>
        <p>Current Day Gift: {JSON.stringify(currentDayGift)}</p>
        <p>Current day buy now link: {currentDayCoupon?.buy_now_link}</p>
    </div>
  )
}
