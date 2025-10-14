import { NextResponse } from "next/server";
import { getCampaignConfig } from "../../../actions/campaign";
import { getGiftStatus } from "../../../actions/gifts";
import { calculateStreak } from "../../../actions/streak";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
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

    // Get gift statuses
    const gifts = await getGiftStatus(userId, campaignConfig);

    // Get streak information
    const streak = await calculateStreak(userId);

    return NextResponse.json({
      gifts,
      streak,
      campaignConfig,
    });
  } catch (error) {
    console.error("Error fetching gifts:", error);
    return NextResponse.json(
      { error: "Failed to fetch gifts" },
      { status: 500 }
    );
  }
}
