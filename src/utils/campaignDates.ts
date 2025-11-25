"use server";
import { differenceInDays, startOfDay } from 'date-fns';
import {toZonedTime } from 'date-fns-tz';

export async function  getCurrentCampaignDay(campaignStartDate: Date): Promise<number> {
  const DUBLIN_TIME_ZONE = 'Europe/Dublin';
  const nowUtc = new Date(); // Current time in UTC

  const nowDublinTime = toZonedTime(nowUtc, DUBLIN_TIME_ZONE);

  const todayDublinStart = startOfDay(nowDublinTime);
  
  const campaignDublinStart = toZonedTime(campaignStartDate, DUBLIN_TIME_ZONE);
  const campaignStartDay = startOfDay(campaignDublinStart);

  
  const daysDifference = differenceInDays(todayDublinStart, campaignStartDay);

  if (daysDifference < 0) return 0;
  if (daysDifference >= 12) return 12;
  return daysDifference + 1;
}

// /**
//  * Check if the current date falls within the campaign period
//  */
// export function isWithinCampaignPeriod(
//   currentDate: Date,
//   startDate: Date,
//   endDate: Date
// ): boolean {
//   return isWithinInterval(currentDate, {
//     start: startOfDay(startDate),
//     end: endOfDay(endDate),
//   });
// }

// /**
//  * Calculate the availability window for a specific gift day
//  */
// export function getGiftAvailabilityWindow(
//   dayNumber: number,
//   campaignStartDate: Date
// ): GiftAvailabilityWindow {
//   if (dayNumber < 1 || dayNumber > 12) {
//     throw new Error("Day number must be between 1 and 12");
//   }

//   const startDay = startOfDay(campaignStartDate);
//   const giftDay = addDays(startDay, dayNumber - 1);

//   return {
//     availableFrom: startOfDay(giftDay),
//     availableUntil: endOfDay(giftDay),
//   };
// }

// /**
//  * Check if a gift is currently available for claiming
//  */
// export function isGiftAvailable(
//   dayNumber: number,
//   campaignStartDate: Date,
//   currentDate: Date = new Date()
// ): boolean {
//   const { availableFrom, availableUntil } = getGiftAvailabilityWindow(
//     dayNumber,
//     campaignStartDate
//   );
//   return isWithinInterval(currentDate, {
//     start: availableFrom,
//     end: availableUntil,
//   });
// }

// /**
//  * Check if a gift has been missed (past its availability window)
//  */
// export function isGiftMissed(
//   dayNumber: number,
//   campaignStartDate: Date,
//   currentDate: Date = new Date()
// ): boolean {
//   const { availableUntil } = getGiftAvailabilityWindow(
//     dayNumber,
//     campaignStartDate
//   );
//   return currentDate > availableUntil;
// }
