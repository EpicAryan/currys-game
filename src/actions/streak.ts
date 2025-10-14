import { addDays, isSameDay, isWithinInterval } from "date-fns";
import { supabase } from "../utils/supabase/server";

export interface StreakInfo {
  currentStreak: number;
  maxStreak: number;
  lastClaimDate: Date | null;
}

/**
 * Calculate user's current streak based on their gift claims
 */
export async function calculateStreak(userId: string): Promise<StreakInfo> {
  // Get all claimed gifts for the user, ordered by claim date
  const { data: claims, error } = await supabase
    .from("user_gifts")
    .select("claimed_at")
    .eq("user_id", userId)
    .eq("status", "claimed")
    .order("claimed_at", { ascending: true });

  if (error) throw error;

  if (!claims || claims.length === 0) {
    return { currentStreak: 0, maxStreak: 0, lastClaimDate: null };
  }

  let currentStreak = 0;
  let maxStreak = 0;
  let lastClaimDate = claims[claims.length - 1].claimed_at;
  let previousDate: Date | null = null;

  // Calculate streaks
  for (const claim of claims) {
    const claimDate = new Date(claim.claimed_at);

    if (!previousDate) {
      currentStreak = 1;
      maxStreak = 1;
    } else {
      // Check if this claim is on the next day
      const expectedDate = addDays(previousDate, 1);
      if (isSameDay(claimDate, expectedDate)) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        // Streak broken
        currentStreak = 1;
      }
    }

    previousDate = claimDate;
  }

  // Check if streak is still active (last claim was yesterday or today)
  const now = new Date();
  const yesterday = addDays(now, -1);
  const lastClaim = new Date(lastClaimDate);

  if (!isWithinInterval(lastClaim, { start: yesterday, end: now })) {
    currentStreak = 0;
  }

  return {
    currentStreak,
    maxStreak,
    lastClaimDate: lastClaim,
  };
}

/**
 * Update streak information after claiming a gift
 */
export async function updateStreakAfterClaim(
  userId: string
): Promise<StreakInfo> {
  return calculateStreak(userId);
}
