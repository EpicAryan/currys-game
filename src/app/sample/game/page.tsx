"use client"

import { rewardCouponGift } from "@/lib/rewardCouponGift";
import { currentDayAtom } from "@/store/currentDay";
import { useAtomValue } from "jotai";

export default function GamePage() {
  const currentDay = useAtomValue(currentDayAtom);
  console.log("currentDay", currentDay);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button className="bg-blue-500 text-white p-2 rounded-md mt-4 " onClick={() => rewardCouponGift({score: 15, email: "garv@test.com", currentDay})}>Reward Coupon Gift</button>
    </div>
  );
}


 