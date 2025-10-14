import { getCampaignConfig } from "./campaign";
import { supabase } from "../utils/supabase/server";

export interface UserRegistration {
  email: string;
  firstName: string;
  lastName: string;
}

/**
 * Check if a user with the given email already exists
 */
export async function checkExistingUser(
  email: string
): Promise<{ exists: boolean; uuid?: string }> {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("email", email.toLowerCase())
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // no rows returned
      return { exists: false };
    }
    throw error;
  }

  return { exists: true, uuid: data.id };
}

/**
 * Create a new user and initialize their gifts
 */
export async function createUser(
  registration: UserRegistration
): Promise<string> {
  const campaign = await getCampaignConfig();
  if (!campaign) {
    throw new Error("No active campaign found");
  }

  // Start transaction to create user and initialize gifts
  const { data: user, error: userError } = await supabase
    .from("users")
    .insert({
      email: registration.email.toLowerCase(),
      first_name: registration.firstName,
      last_name: registration.lastName,
      campaign_start_date: new Date().toISOString(),
    })
    .select()
    .single();

  if (userError) throw userError;

  // Get all gifts
  const { data: gifts, error: giftsError } = await supabase
    .from("gifts")
    .select("id, day_number");

  if (giftsError) throw giftsError;

  // Initialize user_gifts for all gifts
  const userGifts = gifts.map((gift) => ({
    user_id: user.id,
    gift_id: gift.id,
    status: "locked",
  }));

  const { error: userGiftsError } = await supabase
    .from("user_gifts")
    .insert(userGifts);

  if (userGiftsError) throw userGiftsError;

  return user.id;
}

/**
 * Get user data by UUID
 */
export async function getUserByUUID(uuid: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", uuid)
    .single();

  if (error) throw error;
  return data;
}
