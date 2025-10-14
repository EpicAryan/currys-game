import { CampaignConfig } from "./campaign";
import { isGiftAvailable, isGiftMissed } from "../utils/campaignDates";
import { supabase } from "../utils/supabase/server";

export interface GiftStatus {
  id: string;
  dayNumber: number;
  status: "locked" | "claimed" | "missed";
  couponCode?: string;
  score?: number;
}

interface UserGiftWithRelation {
  id: string;
  gift_id: string;
  status: "locked" | "claimed" | "missed";
  coupon_code: string | null;
  score: number | null;
  gifts: {
    day_number: number;
  };
}

/**
 * Get the status of all gifts for a user
 */
export async function getGiftStatus(
  userId: string,
  campaignConfig: CampaignConfig
): Promise<GiftStatus[]> {
  // Get all gifts and their status for the user
  const { data, error } = await supabase
    .from("user_gifts")
    .select(
      `
      id,
      gift_id,
      status,
      coupon_code,
      score,
      gifts (
        day_number
      )
    `
    )
    .eq("user_id", userId);

  if (error) throw error;

  // Update status based on current date
  const campaignStartDate = new Date(campaignConfig.campaign_start_date);
  const currentDate = new Date();

  const typedData = data as unknown as UserGiftWithRelation[];

  return typedData.map((item): GiftStatus => {
    let status = item.status;

    // If gift is locked, check if it should be marked as missed
    if (
      status === "locked" &&
      isGiftMissed(item.gifts.day_number, campaignStartDate, currentDate)
    ) {
      status = "missed";
      // Update the status in the database
      updateGiftStatus(item.id, "missed").catch(console.error);
    }

    return {
      id: item.gift_id,
      dayNumber: item.gifts.day_number,
      status,
      couponCode: item.coupon_code ?? undefined,
      score: item.score ?? undefined,
    };
  });
}

/**
 * Update the status of a gift
 */
async function updateGiftStatus(
  userGiftId: string,
  status: "locked" | "claimed" | "missed"
): Promise<void> {
  const { error } = await supabase
    .from("user_gifts")
    .update({ status })
    .eq("id", userGiftId);

  if (error) throw error;
}

/**
 * Generate a coupon code based on the score
 */
function generateCouponCode(score: number, giftId: string): string {
  // Simple coupon generation - in real world this would be more sophisticated
  const prefix = score >= 80 ? "GOLD" : score >= 50 ? "SILVER" : "BRONZE";
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${random}`;
}

/**
 * Claim a gift and generate a coupon based on the game score
 */
export async function claimGift(
  userId: string,
  giftId: string,
  score: number,
  campaignConfig: CampaignConfig
): Promise<{ success: boolean; couponCode?: string; error?: string }> {
  // Get the gift details
  const { data: gift, error: giftError } = await supabase
    .from("gifts")
    .select("day_number, coupon_ranges")
    .eq("id", giftId)
    .single();

  if (giftError) throw giftError;

  // Check if the gift is available
  const isAvailable = isGiftAvailable(
    gift.day_number,
    new Date(campaignConfig.campaign_start_date)
  );

  if (!isAvailable) {
    return { success: false, error: "Gift is not available for claiming" };
  }

  // Generate coupon code
  const couponCode = generateCouponCode(score, giftId);

  // Update the gift status
  const { data: userGift, error: updateError } = await supabase
    .from("user_gifts")
    .update({
      status: "claimed",
      claimed_at: new Date().toISOString(),
      score,
      coupon_code: couponCode,
    })
    .eq("user_id", userId)
    .eq("gift_id", giftId)
    .select()
    .single();

  if (updateError) throw updateError;

  return { success: true, couponCode };
}
