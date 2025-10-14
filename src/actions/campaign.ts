import {
  getCurrentCampaignDay,
  isWithinCampaignPeriod,
} from "../utils/campaignDates";
import { supabase } from "../utils/supabase/server";

export interface CampaignConfig {
  id: string;
  campaign_start_date: string;
  campaign_end_date: string;
  is_active: boolean;
}

/**
 * Get the current active campaign configuration
 */
export async function getCampaignConfig(): Promise<CampaignConfig | null> {
  const { data, error } = await supabase
    .from("campaign_config")
    .select("*")
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching campaign config:", error);
    return null;
  }

  return data;
}

/**
 * Validate if the campaign is currently active
 */
export async function validateCampaignActive(): Promise<boolean> {
  const config = await getCampaignConfig();
  if (!config) return false;

  return isWithinCampaignPeriod(
    new Date(),
    new Date(config.campaign_start_date),
    new Date(config.campaign_end_date)
  );
}

/**
 * Calculate the current day of the campaign
 */
export async function calculateCurrentDay(): Promise<number> {
  const config = await getCampaignConfig();
  if (!config) return 0;

  return getCurrentCampaignDay(new Date(config.campaign_start_date));
}
