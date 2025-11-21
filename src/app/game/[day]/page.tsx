"use client";

import { verifyGameAccess } from "@/lib/game-access";
import { generateSignedURL } from "@/lib/hmac";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function GamePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  
  const dayParam = params.day as string;
  const dayNumber = dayParam.replace(/^day/, ""); 
  
  const timestamp = searchParams.get("t") || "";
  const signature = searchParams.get("s") || "";

 
  useEffect(() => {
    async function verify() {
      if (!timestamp || !signature) {
        alert("🚨 Invalid access! Please start from the promo page.");
        router.push("/");
        return;
      }

      const isValid = await verifyGameAccess(dayNumber, timestamp, signature);
      
      if (!isValid) {
        alert("🚨 Access expired or invalid! Please start from the promo page.");
        router.push("/");
        return;
      }
      
      setIsVerified(true);
      setIsVerifying(false);
    }
    
    verify();
  }, [dayNumber, timestamp, signature, router]);

  useEffect(() => {
    if (!isVerified || !iframeRef.current) return;
    
    const iframe = iframeRef.current;
    const handleIframeLoad = () => {
      iframe.contentWindow?.postMessage({
        type: "setDayNumber",
        day: parseInt(dayNumber),
        source: "parent-website"
      }, "*");
    };
    
    iframe.addEventListener("load", handleIframeLoad);
    
    return () => {
      iframe.removeEventListener("load", handleIframeLoad);
    };
  }, [isVerified, dayNumber]);

  useEffect(() => {
    
    const handleMessage = async (event: MessageEvent) => {
      
      if (!event.origin.includes("playcanv.as")) {
        console.log("⚠️ Message from untrusted origin, ignoring");
        return;
      }

      if (!event.data || typeof event.data !== 'object') {
        console.log("⚠️ Invalid message data structure");
        return;
      }
      
    
      if (event.data.type === "gameOver") {
        const finalScore = event.data.finalScore;

        if (finalScore === undefined || finalScore === null) {
          alert("Score data is missing. Please try again.");
          return;
        }
        
        try {
          const signedURL = await generateSignedURL(dayParam, finalScore.toString());
          router.push(signedURL);
        } catch (error) {
          console.error("❌ Failed to generate signed URL:", error);
          alert("Failed to submit score. Please try again.");
        }
      } else {
        console.log("ℹ️ Message type:", event.data.type, "(not gameOver)");
      }
    };

    window.addEventListener("message", handleMessage);
    
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [dayParam, router]);

  if (isVerifying) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2A1F44] via-[#3D2F5B] to-[#4A3566]">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent mx-auto"></div>
          <p className="font-currys text-white text-lg">Verifying access...</p>
          <p className="font-currys text-white text-sm mt-2 opacity-70">Day {dayNumber}</p>
        </div>
      </div>
    );
  }

  if (!isVerified) {
    return null;
  }

  return (
    <iframe
      ref={iframeRef}
      src="https://playcanv.as/p/3FSwoGDA"
      className="fixed top-0 left-0 w-screen h-screen border-none block"
      allow="autoplay; fullscreen"
      title={`Day ${dayNumber} Game`}
    />
  );
}
