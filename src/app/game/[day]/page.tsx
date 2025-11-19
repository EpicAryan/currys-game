// "use client";

// import { verifyGameAccess } from "@/lib/game-access";
// import { generateSignedURL } from "@/lib/hmac";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";

// export default function GamePage() {
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const router = useRouter();
  
//   const [score, setScore] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(true);
  
//   const dayParam = params.day as string;
//   const dayNumber = dayParam.replace(/^day/, ""); 
  
//   const timestamp = searchParams.get("t") || "";
//   const signature = searchParams.get("s") || "";

//   useEffect(() => {
//     async function verify() {
//       if (!timestamp || !signature) {
//         alert("🚨 Invalid access! Please start from the promo page.");
//         router.push("/");
//         return;
//       }

//       const isValid = await verifyGameAccess(dayNumber, timestamp, signature);
      
//       if (!isValid) {
//         alert("🚨 Access expired or invalid! Please start from the promo page.");
//         router.push("/");
//         return;
//       }
      
//       console.log("✅ Access verified successfully!");
//       setIsVerified(true);
//       setIsVerifying(false);
//     }
    
//     verify();
//   }, [dayNumber, timestamp, signature, router]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (score.trim() === "" || parseInt(score) < 0) {
//       alert("Please enter a valid score");
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       const signedURL = await generateSignedURL(dayParam, score);
//       router.push(signedURL);
//     } catch (error) {
//       console.error("Failed to generate URL:", error);
//       alert("Failed to submit score");
//       setIsSubmitting(false);
//     }
//   };


//   if (isVerifying) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2A1F44] via-[#3D2F5B] to-[#4A3566]">
//         <div className="text-center">
//           <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent mx-auto"></div>
//           <p className="font-currys text-white text-lg">Verifying access...</p>
//           <p className="font-currys text-white text-sm mt-2 opacity-70">Day {dayNumber}</p>
//         </div>
//       </div>
//     );
//   }


//   if (!isVerified) {
//     return null;
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2A1F44] via-[#3D2F5B] to-[#4A3566]">
//       <div className="w-full max-w-md rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
//         <h1 className="mb-6 text-center font-currys text-3xl font-semibold text-white">
//           {dayParam.charAt(0).toUpperCase() + dayParam.slice(1)} Game
//         </h1>
        
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label 
//               htmlFor="score" 
//               className="mb-2 block text-sm font-medium text-[#CFC8F7]"
//             >
//               Enter Your Score
//             </label>
//             <input
//               id="score"
//               type="number"
//               value={score}
//               onChange={(e) => setScore(e.target.value)}
//               placeholder="0"
//               min="0"
//               disabled={isSubmitting}
//               className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/40 focus:border-[#CFC8F7] focus:outline-none focus:ring-2 focus:ring-[#CFC8F7]/50 disabled:opacity-50"
//               required
//             />
//           </div>
          
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full rounded-lg bg-[#CFC8F7] px-6 py-3 font-semibold text-[#2A1F44] transition-all hover:bg-white hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? "Submitting..." : "Submit Score"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
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

  // Step 1: Verify HMAC access
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
      
      console.log("✅ Access verified successfully!");
      setIsVerified(true);
      setIsVerifying(false);
    }
    
    verify();
  }, [dayNumber, timestamp, signature, router]);

  // Step 2: Send day number to game when iframe loads
  useEffect(() => {
    if (!isVerified || !iframeRef.current) return;
    
    const iframe = iframeRef.current;
    
    const handleIframeLoad = () => {
      console.log("📤 Game loaded, sending day number:", dayNumber);
      
      // Send day number to the game
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

  // Step 3: Listen for ALL messages (DEBUG MODE)
  useEffect(() => {
    console.log("🔍 Message listener attached - waiting for game messages...");
    
    const handleMessage = async (event: MessageEvent) => {
      console.log("📨 MESSAGE RECEIVED:", {
        origin: event.origin,
        data: event.data,
        type: typeof event.data
      });
      
      // ✅ Security check - verify origin first
      if (!event.origin.includes("playcanv.as")) {
        console.log("⚠️ Message from untrusted origin, ignoring");
        return;
      }

      // ✅ Check if data exists and has expected structure
      if (!event.data || typeof event.data !== 'object') {
        console.log("⚠️ Invalid message data structure");
        return;
      }
      
      console.log("✅ Message from trusted origin with valid data");
      
      // ✅ Check for gameOver message
      if (event.data.type === "gameOver") {
        console.log("🎮 GAME OVER DETECTED!");
        const finalScore = event.data.finalScore;
        console.log("📊 Final Score:", finalScore);
        
        // ✅ Validate score exists
        if (finalScore === undefined || finalScore === null) {
          console.error("❌ No score provided in gameOver message");
          alert("Score data is missing. Please try again.");
          return;
        }
        
        try {
          const signedURL = await generateSignedURL(dayParam, finalScore.toString());
          console.log("🔗 Redirecting to:", signedURL);
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
    console.log("✅ Event listener added to window");
    
    return () => {
      console.log("🧹 Removing message listener");
      window.removeEventListener("message", handleMessage);
    };
  }, [dayParam, router]);

  // Loading state
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

  // Full viewport game
  return (
    <iframe
      ref={iframeRef}
      src="https://playcanv.as/b/f602d7f9"
      className="fixed top-0 left-0 w-screen h-screen border-none block"
      allow="autoplay; fullscreen"
      title={`Day ${dayNumber} Game`}
    />
  );
}
