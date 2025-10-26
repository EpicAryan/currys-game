"use client";

import { useEffect, useState } from "react";
import { getCampaignConfig, CampaignConfig } from "../actions/campaign";
import { getCurrentCampaignDay } from "../utils/campaignDates";

export interface GiftRenderStatus {
  dayNumber: number;
  missed: boolean;
  locked: boolean;
  available: boolean;
}

export interface CampaignStatus {
  isLoading: boolean;
  campaignConfig: CampaignConfig | null;
  currentDay: number;
  gifts: GiftRenderStatus[];
  isActive: boolean;
}

/**
 * Hook to manage campaign gift rendering logic
 * Returns status for all 12 days to determine if they should be rendered as:
 * - missed: Past days that weren't claimed
 * - locked: Future days not yet available
 * - available: Current day that can be claimed
 */
export function useCurrentCampaign(): CampaignStatus {
  const [isLoading, setIsLoading] = useState(true);
  const [campaignConfig, setCampaignConfig] = useState<CampaignConfig | null>(
    null
  );
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [gifts, setGifts] = useState<GiftRenderStatus[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    async function loadCampaignStatus() {
      try {
        setIsLoading(true);

        // Fetch campaign configuration
        const config = await getCampaignConfig();

        if (!config) {
          setIsActive(false);
          setIsLoading(false);
          return;
        }

        setCampaignConfig(config);
        setIsActive(config.is_active);

        // Calculate current campaign day
        const day = getCurrentCampaignDay(new Date(config.campaign_start_date));
        setCurrentDay(day);

        // Generate status for all 12 days
        const giftStatuses: GiftRenderStatus[] = [];

        for (let dayNumber = 1; dayNumber <= 12; dayNumber++) {
          const missed = dayNumber < day; // Days before current day are missed
          const locked = dayNumber > day; // Days after current day are locked
          const available = dayNumber === day; // Current day is available

          giftStatuses.push({
            dayNumber,
            missed,
            locked,
            available,
          });
        }

        setGifts(giftStatuses);
      } catch (error) {
        console.error("Error loading campaign status:", error);
        setIsActive(false);
      } finally {
        setIsLoading(false);
      }
    }

    loadCampaignStatus();
  }, []);

  return {
    isLoading,
    campaignConfig,
    currentDay,
    gifts,
    isActive,
  };
}

/**
 * Helper hook to get status for a specific day
 */
export function useGiftStatus(dayNumber: number) {
  const { gifts, isLoading } = useCurrentCampaign();

  const giftStatus = gifts.find((g) => g.dayNumber === dayNumber);

  return {
    isLoading,
    missed: giftStatus?.missed ?? false,
    locked: giftStatus?.locked ?? false,
    available: giftStatus?.available ?? false,
  };
}
