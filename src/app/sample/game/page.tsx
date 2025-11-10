"use client"
import { claimCouponAction } from "@/actions/claimCoupon";
import { currentDayAtom } from "@/store/currentDay";
import { useAtomValue } from "jotai";
import { useState } from "react";
export default function GamePage() {
  const currentDay = useAtomValue(currentDayAtom);
  const [inputEmail, setInputEmail] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    claim();
  }
    const claim = async () => {
        const data =  await claimCouponAction(inputEmail, currentDay);
        console.log(data)
    }
    console.log(currentDay);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input type="text" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} className="border-2 border-gray-300 p-2 rounded-md" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded-md mt-4 ">Claim Coupon</button>
    </div>
  );
}
