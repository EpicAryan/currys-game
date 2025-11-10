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
