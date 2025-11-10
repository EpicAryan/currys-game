"use client";

import { useEffect, useState } from "react";
import { getCampaignConfig, CampaignConfig } from "@/actions/campaign";
import { getGifts } from "@/actions/gifts"; // <-- 1. Import getGifts
import { getCurrentCampaignDay } from "../utils/campaignDates";
import { currentDayAtom } from "@/store/currentDay";
import { useSetAtom } from "jotai";

// 2. Interface for the data from getGifts()
export interface Gift {
  id: number;
  day_number: number;
  gift_name: string;
  image_url: string;
}

// 3. Renamed and updated interface
export interface CampaignGift {
  dayNumber: number;
  missed: boolean;
  locked: boolean;
  available: boolean;
  gift_name: string | null; // <-- Added
  image_url: string | null; // <-- Added
}

export interface CampaignStatus {
  isLoading: boolean;
  campaignConfig: CampaignConfig | null;
  currentDay: number;
  gifts: CampaignGift[]; // <-- Use new interface
  isActive: boolean;
}

/**
 * Hook to manage campaign gift rendering logic
 * Returns status and gift details for all 12 days.
 */
export function useCurrentCampaign(): CampaignStatus {
  const [isLoading, setIsLoading] = useState(true);
  const [campaignConfig, setCampaignConfig] = useState<CampaignConfig | null>(
    null
  );
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [gifts, setGifts] = useState<CampaignGift[]>([]); // <-- Use new interface
  const [isActive, setIsActive] = useState<boolean>(false);
  const setCurrentDayAtom = useSetAtom(currentDayAtom);

  useEffect(() => {
    async function loadCampaignStatus() {
      try {
        setIsLoading(true);

        // 4. Fetch campaign config and all gifts in parallel
        const [config, allGifts] = await Promise.all([
          getCampaignConfig(),
          getGifts(),
        ]);

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
        setCurrentDayAtom(day);

        // 5. Generate status and merge gift details for all 12 days
        const giftStatuses: CampaignGift[] = [];

        for (let dayNumber = 1; dayNumber <= 12; dayNumber++) {
          const missed = dayNumber < day;
          const locked = dayNumber > day;
          const available = dayNumber === day;

          // Find the matching gift details from the fetched data
          const giftDetails = allGifts.find(
            (g) => g.day_number === dayNumber
          );

          giftStatuses.push({
            dayNumber,
            missed,
            locked,
            available,
            gift_name: giftDetails?.gift_name || null, // <-- Add gift name
            image_url: giftDetails?.image_url || null, // <-- Add image url
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
  }, [setCurrentDayAtom]); // Added dependency

  return {
    isLoading,
    campaignConfig,
    currentDay,
    gifts,
    isActive,
  };
}

/**
 * 6. Helper hook to get status and details for a specific day
 */
export function useGiftStatus(dayNumber: number) {
  const { gifts, isLoading } = useCurrentCampaign();

  const giftStatus = gifts.find((g) => g.dayNumber === dayNumber);

  return {
    isLoading,
    missed: giftStatus?.missed ?? false,
    locked: giftStatus?.locked ?? false,
    available: giftStatus?.available ?? false,
    gift_name: giftStatus?.gift_name || null, // <-- Return gift name
    image_url: giftStatus?.image_url || null, // <-- Return image url
  };
}