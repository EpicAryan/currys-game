import { NextResponse } from "next/server";
import { checkExistingUser, createUser } from "@/actions/users";
import { validateCampaignActive } from "@/actions/campaign";

export async function POST(request: Request) {
  try {
    // Check if campaign is active
    const isActive = await validateCampaignActive();
    if (!isActive) {
      return NextResponse.json(
        { error: "Campaign is not currently active" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { email, firstName, lastName } = body;

    // Validate input
    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user exists
    const { exists, uuid } = await checkExistingUser(email);
    if (exists) {
      return NextResponse.json(
        { error: "Email already registered", uuid },
        { status: 409 }
      );
    }

    // Create new user
    const newUserId = await createUser({ email, firstName, lastName });

    return NextResponse.json({ uuid: newUserId });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
}
