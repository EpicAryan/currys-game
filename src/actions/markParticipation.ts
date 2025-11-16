import { supabase } from "@/utils/supabase/server";

export async function markParticipation(userId: string, dayNumber: number) {
    const { data, error } = await supabase
      .from("user_day_participation")
      .insert({ user_id: userId, day_number: dayNumber })
      .maybeSingle();
  
    if (error && error.code !== "23505") throw error;
    else if(error && error.code === "23505") {
        return { success: false, error: "User already participated in this day" };
    }
    return { success: true };
  }