"use client";

import { useEffect, useState } from "react";
import { getUserCampaignData } from "@/actions/user";
import { getGiftDetailsByDay } from "@/actions/gifts"; // <-- new action

interface DayStreakItem {
  dayNumber: number;
  played: boolean;
  missed: boolean;
  playedAt?: string | null;
  coupon?: any | null;
  gift?: any | null;
}

interface HookReturn {
  loading: boolean;
  error: string | null;

  user: any | null;
  currentDay: number;
  streak: DayStreakItem[];
  currentDayCoupon: any | null;
  currentDayGift: any | null; // now includes gift name + image
}

export function useUserCampaignData(email: string): HookReturn {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [user, setUser] = useState<any | null>(null);
  const [currentDay, setCurrentDay] = useState(1);

  const [streak, setStreak] = useState<DayStreakItem[]>([]);
  const [currentDayCoupon, setCurrentDayCoupon] = useState<any | null>(null);
  const [currentDayGift, setCurrentDayGift] = useState<any | null>(null);

  useEffect(() => {
    if (!email) return;

    async function fetchData() {
      try {
        setLoading(true);

        // 1️⃣ FETCH USER + PARTICIPATION DATA
        const data = await getUserCampaignData(email);

        if (!data) {
          setError("User not found");
          return;
        }

        setUser(data);

        const playedDays =
          data.days_participated?.map((d: any) => ({
            dayNumber: d.day_number,
            playedAt: d.played_at,
          })) || [];

        const maxDay =
          playedDays.length > 0
            ? Math.max(...playedDays.map((d: any) => d.dayNumber))
            : 1;

        setCurrentDay(maxDay);

        // 2️⃣ BUILD STREAK OBJECT
        let streakArr: DayStreakItem[] = [];

        for (let day = 1; day <= 12; day++) {
          const played = playedDays.find((d: any) => d.dayNumber === day);

          const coupon =
            data.coupons_claimed?.find((c: any) => c.day === day) || null;

          const gift =
            data.gifts_enrolled?.find((g: any) => g.day_number === day) || null;

          streakArr.push({
            dayNumber: day,
            played: !!played,
            missed: !played,
            playedAt: played?.playedAt || null,
            coupon,
          });
        }

        setStreak(streakArr);

        // 3️⃣ TODAY'S COUPON FROM RPC DATA
        setCurrentDayCoupon(
          data.coupons_claimed?.find((c: any) => c.day === maxDay) || null
        );

        // 4️⃣ FETCH TODAY’S GIFT DETAILS (NAME + IMAGE)
        const giftInfo = await getGiftDetailsByDay(maxDay); // ❗ second action call

        const finalGift = {
          ...(data.gifts_enrolled?.find((g: any) => g.day_number === maxDay) ||
            null),
          gift_name: giftInfo?.gift_name || null,
          gift_image_url: giftInfo?.image_url || null,
        };

        setCurrentDayGift(finalGift);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [email]);

  return {
    loading,
    error,
    user,
    currentDay,
    streak,
    currentDayCoupon,
    currentDayGift,
  };
}
