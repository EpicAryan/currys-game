'use server';

import { supabase } from "@/utils/supabase/server";

export async function claimCouponAction(user_id: string, todayDayNumber: number) {

  try {
    const { data, error } = await supabase.rpc('claim_coupon', {
      user_id: user_id,
      day_number: todayDayNumber,
    });

    if (error) throw new Error(error.message);

    return { success: true, coupon: data };
  } catch (err: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (err instanceof Error) {
      errorMessage = err.message;
    }

    console.error("claimCouponAction error:", errorMessage);
    return { success: false, error: errorMessage };
  }
}
