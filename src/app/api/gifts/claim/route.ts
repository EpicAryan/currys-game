import { NextResponse } from "next/server";
import { claimGift } from "../../../../actions/gifts";
import { updateStreakAfterClaim } from "../../../../actions/streak";
import { getCampaignConfig } from "../../../../actions/campaign";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, giftId, score } = body;

    if (!userId || !giftId || typeof score !== "number") {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get campaign config
    const campaignConfig = await getCampaignConfig();
    if (!campaignConfig) {
      return NextResponse.json(
        { error: "No active campaign found" },
        { status: 404 }
      );
    }

    // Claim the gift
    const claimResult = await claimGift(userId, giftId, score, campaignConfig);
    if (!claimResult.success) {
      return NextResponse.json({ error: claimResult.error }, { status: 400 });
    }

    // Update streak
    const streak = await updateStreakAfterClaim(userId);

    return NextResponse.json({
      couponCode: claimResult.couponCode,
      streak,
    });
  } catch (error) {
    console.error("Error claiming gift:", error);
    return NextResponse.json(
      { error: "Failed to claim gift" },
      { status: 500 }
    );
  }
}
