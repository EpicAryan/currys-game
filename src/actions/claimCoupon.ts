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
  } catch (err: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (err instanceof Error) {
      errorMessage = err.message;
    }

    console.error("claimCouponAction error:", errorMessage);
    return { success: false, error: errorMessage };
  }
}
