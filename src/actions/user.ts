"use server";

import { supabase } from "@/utils/supabase/server";

export async function checkExisting(email: string) {
    const { data, error } = await supabase
    .rpc('get_or_create_user', { user_email: email });
    if(error) {
        throw new Error(error.message);
    }
    console.log("data", data);
    return data as string;
}

export async function getUserCampaignData(email: string) {
    
  const { data, error } = await supabase.rpc("get_user_campaign_data", {
    user_email: email,
  });

  if (error) {
    console.error("RPC Error:", error);
    throw error;
  }

  return data;
}