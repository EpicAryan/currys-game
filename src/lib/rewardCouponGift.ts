import { checkExisting } from "@/actions/user";
import { claimCouponAction } from "@/actions/claimCoupon";
import { enrollUserForGift } from "@/actions/gifts";
import { markParticipation } from "@/actions/markParticipation";
import { isLucky } from "./couponProbabilityCheck";


export async function rewardCouponGift({score, email, currentDay}: {score: number, email: string, currentDay: number}) {
    try{
        const  user_id  = await checkExisting(email);
        const { success, error } = await markParticipation(user_id, currentDay);
        if (!success) {
        return { success: false, error: error || "Failed to mark participation" };
        }

        if(score >= 10 && success) {
        const enrollResult = await enrollUserForGift(user_id, currentDay);
            if(isLucky()) {
                const { success, coupon, error } = await claimCouponAction(user_id, currentDay);
                if(success) {
                    console.log("Coupon claimed", coupon);
                }
                else {
                    console.log("Coupon not claimed", error);
                }
            }
            if (enrollResult.error) {
                console.log("Error enrolling user for gift", enrollResult.error);
            }
        }
        return { success: true };
    }catch (error) {
        console.error("Error in rewardCouponGift:", error);
        return { 
        success: false, 
        error: "An unexpected error occurred. Please try again." 
        };
    }
}
