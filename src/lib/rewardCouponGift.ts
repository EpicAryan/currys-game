import { checkExisting } from "@/actions/checkExisting";
import { enrollUserForGift } from "@/actions/gifts";
export async function rewardCouponGift({score, email, currentDay}: {score: number, email: string, currentDay: number}) {
    const  user_id  = await checkExisting(email);
    console.log("user_id", user_id);

    if(score >= 10) {
        const { success, error } = await enrollUserForGift(user_id, currentDay);
        if(success) {
            console.log("User enrolled for gift");
            return { success: true, error: null };
        }
        else{
            console.log("User not enrolled for gift", error);
            return { success: false, error: error };
        }
    }
    else{
        // logic to increase streak
    }
}