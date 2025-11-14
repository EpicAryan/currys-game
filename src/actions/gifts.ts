'use server';

import { supabase } from "@/utils/supabase/server";

export async function getGifts() {
  const { data, error } = await supabase
    .from("gifts")
    .select("id, day_number, gift_name, image_url")
    .order("day_number", { ascending: true });

  if (error) {
    console.error("Error fetching gifts:", error);
    return [];
  }

  console.log(data);
  return data;
}

export async function enrollUserForGift(userId: string, dayNumber: number) {
  try {
    // 1️⃣ Find the gift for the given day number
    const { data: gift, error: giftError } = await supabase
      .from("gifts")
      .select("id")
      .eq("day_number", dayNumber)
      .single();

    if (giftError || !gift) {
      return { success: false, error: "Gift not found for the given day." };
    }

    // 2️⃣ Insert enrollment entry (unique constraint ensures one per day per user)
    const { data, error } = await supabase
      .from("user_gift_enrollments")
      .insert({
        user_id: userId,
        gift_id: gift.id,
        day_number: dayNumber,
      })
      .select("id, user_id, gift_id, day_number, enrolled_at")
      .single();

    if (error) {
      // Handle unique violation cleanly
      if (error.code === "23505") {
        return { success: false, error: "User already enrolled for this day." };
      }
      throw error;
    }

    return { success: true, data };
  } catch (err: any) {
    console.error("Enrollment error:", err);
    return { success: false, error: "Unexpected server error." };
  }
}

export async function getGiftDetailsByDay(dayNumber: number) {
  const { data, error } = await supabase
    .from("gifts")
    .select("id, gift_name, image_url")
    .eq("day_number", dayNumber)
    .single();

  if (error) {
    console.error("Error fetching gift details:", error);
    return null;
  }
  return data;
}