'use server';

import { supabase } from "@/utils/supabase/server";

export async function claimCouponAction(userEmail: string, todayDayNumber: number) {

  try {
    const { data, error } = await supabase.rpc('claim_coupon', {
      user_email: userEmail,
      day_number: todayDayNumber,
    });

    if (error) throw new Error(error.message);

    return { success: true, coupon: data };
  } catch (err: any) {
    console.error('claimCouponAction error:', err.message);
    return { success: false, error: err.message };
  }
}
