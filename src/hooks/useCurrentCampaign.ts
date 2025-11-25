"use client";

import { useQuery } from "@tanstack/react-query";
import { getCampaignConfig, CampaignConfig } from "@/actions/campaign";
import { getGifts } from "@/actions/gifts";
import { getCurrentCampaignDay } from "../utils/campaignDates";
import { currentDayAtom } from "@/store/currentDay";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export interface Gift {
  id: number;
  day_number: number;
  gift_name: string;
  image_url: string;
}

export interface CampaignGift {
  dayNumber: number;
  missed: boolean;
  locked: boolean;
  available: boolean;
  gift_name: string | null;
  image_url: string | null;
}

export interface CampaignStatus {
  isLoading: boolean;
  campaignConfig: CampaignConfig | null;
  currentDay: number;
  gifts: CampaignGift[];
  isActive: boolean;
}


const useCampaignConfig = () => {
  return useQuery({
    queryKey: ["campaignConfig"],
    queryFn: getCampaignConfig,
    staleTime: 5 * 60 * 1000, 
  });
};


const useGiftsData = () => {
  return useQuery({
    queryKey: ["gifts"],
    queryFn: getGifts,
    staleTime: 10 * 60 * 1000, 
  });
};


const useCurrentDay = (campaignStartDate: string | null) => {
  return useQuery({
    queryKey: ["currentDay", campaignStartDate],
    queryFn: async () => {
      if (!campaignStartDate) return 0;
      return getCurrentCampaignDay(new Date(campaignStartDate));
    },
    enabled: !!campaignStartDate,
    staleTime: 60 * 1000, 
  });
};


export function useCurrentCampaign(): CampaignStatus {
  const setCurrentDayAtom = useSetAtom(currentDayAtom);

  const { data: campaignConfig, isLoading: configLoading } = useCampaignConfig();
  const { data: allGifts = [], isLoading: giftsLoading } = useGiftsData();

  const { data: currentDay = 0 } = useCurrentDay(
    campaignConfig?.campaign_start_date ?? null
  );

  useEffect(() => {
    if (currentDay > 0) {
      setCurrentDayAtom(currentDay);
    }
  }, [currentDay, setCurrentDayAtom]);

  const { data: gifts = [] } = useQuery({
    queryKey: ["giftStatuses", currentDay, allGifts],
    queryFn: () => {
      const giftStatuses: CampaignGift[] = [];

      for (let dayNumber = 1; dayNumber <= 12; dayNumber++) {
        const missed = dayNumber < currentDay;
        const locked = dayNumber > currentDay;
        const available = dayNumber === currentDay;

        const giftDetails = allGifts.find((g) => g.day_number === dayNumber);

        giftStatuses.push({
          dayNumber,
          missed,
          locked,
          available,
          gift_name: giftDetails?.gift_name || null,
          image_url: giftDetails?.image_url || null,
        });
      }

      return giftStatuses;
    },
    enabled: allGifts.length > 0 && currentDay > 0,
    staleTime: 60 * 1000, 
  });

  const isLoading = configLoading || giftsLoading;
  const isActive = campaignConfig?.is_active ?? false;

  return {
    isLoading,
    campaignConfig: campaignConfig || null,
    currentDay,
    gifts,
    isActive,
  };
}

export function useGiftStatus(dayNumber: number) {
  const { gifts, isLoading } = useCurrentCampaign();

  const giftStatus = gifts.find((g) => g.dayNumber === dayNumber);

  return {
    isLoading,
    missed: giftStatus?.missed ?? false,
    locked: giftStatus?.locked ?? false,
    available: giftStatus?.available ?? false,
    gift_name: giftStatus?.gift_name || null,
    image_url: giftStatus?.image_url || null,
  };
}
