import { supabase } from "@/utils/supabase/server";

export async function markParticipation(userId: string, dayNumber: number) {
    const { data, error } = await supabase
      .from("user_day_participation")
      .insert({ user_id: userId, day_number: dayNumber })
      .maybeSingle();
  
    if (error && error.code !== "23505") throw error;
    return { success: true };
  }