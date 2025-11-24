'use server'
import {
  addDays,
  differenceInDays,
  endOfDay,
  isWithinInterval,
  startOfDay,
} from "date-fns";

export interface GiftAvailabilityWindow {
  availableFrom: Date;
  availableUntil: Date;
}

/**
 * Calculate the current campaign day number based on the campaign start date
 * @param campaignStartDate The start date of the campaign
 * @returns The current day number (1-12) or 0 if campaign hasn't started
 */
export function getCurrentCampaignDay(campaignStartDate: Date): number {
  const now = new Date();
  const startDay = startOfDay(campaignStartDate);
  const daysDifference = differenceInDays(now, startDay);

  // If campaign hasn't started yet
  if (daysDifference < 0) return 0;

  // If we're beyond day 12, return 12
  if (daysDifference >= 12) return 12;

  // Return current day (1-12)
  return daysDifference + 1;
}

/**
 * Check if the current date falls within the campaign period
 */
export function isWithinCampaignPeriod(
  currentDate: Date,
  startDate: Date,
  endDate: Date
): boolean {
  return isWithinInterval(currentDate, {
    start: startOfDay(startDate),
    end: endOfDay(endDate),
  });
}

/**
 * Calculate the availability window for a specific gift day
 */
export function getGiftAvailabilityWindow(
  dayNumber: number,
  campaignStartDate: Date
): GiftAvailabilityWindow {
  if (dayNumber < 1 || dayNumber > 12) {
    throw new Error("Day number must be between 1 and 12");
  }

  const startDay = startOfDay(campaignStartDate);
  const giftDay = addDays(startDay, dayNumber - 1);

  return {
    availableFrom: startOfDay(giftDay),
    availableUntil: endOfDay(giftDay),
  };
}

/**
 * Check if a gift is currently available for claiming
 */
export function isGiftAvailable(
  dayNumber: number,
  campaignStartDate: Date,
  currentDate: Date = new Date()
): boolean {
  const { availableFrom, availableUntil } = getGiftAvailabilityWindow(
    dayNumber,
    campaignStartDate
  );
  return isWithinInterval(currentDate, {
    start: availableFrom,
    end: availableUntil,
  });
}

/**
 * Check if a gift has been missed (past its availability window)
 */
export function isGiftMissed(
  dayNumber: number,
  campaignStartDate: Date,
  currentDate: Date = new Date()
): boolean {
  const { availableUntil } = getGiftAvailabilityWindow(
    dayNumber,
    campaignStartDate
  );
  return currentDate > availableUntil;
}
