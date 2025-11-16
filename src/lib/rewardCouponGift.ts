import { checkExisting } from "@/actions/user";
import { claimCouponAction } from "@/actions/claimCoupon";
import { enrollUserForGift } from "@/actions/gifts";
import { markParticipation } from "@/actions/markParticipation";
import { isLucky } from "./couponProbabilityCheck";


export async function rewardCouponGift({score, email, currentDay}: {score: number, email: string, currentDay: number}) {

    const  user_id  = await checkExisting(email);
    const { success, error } = await markParticipation(user_id, currentDay);
    if(!success) {
        alert(error);
        return;
    }
    if(score >= 10 && success) {
        const { success, error } = await enrollUserForGift(user_id, currentDay);
        if(isLucky()) {
            const { success, coupon, error } = await claimCouponAction(user_id, currentDay);
            if(success) {
                console.log("Coupon claimed", coupon);
            }
            else {
                console.log("Coupon not claimed", error);
            }
        }
        if(error) {
            console.log("Error enrolling user for gift", error);
        }
    }
}