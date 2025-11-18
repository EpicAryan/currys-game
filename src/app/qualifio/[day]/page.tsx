"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function QualifioPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const dayParam = params.day as string;
  const timestamp = searchParams.get("t") || "";
  const signature = searchParams.get("s") || "";
  const [isLoading, setIsLoading] = useState(true);

  // Handle messages from Qualifio iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verify origin for security
      if (event.origin !== "https://qlic.it") return;
      
      // Listen for completion event from Qualifio
      if (event.data?.type === "qualifio_complete" || event.data?.action === "play_now") {
        // Navigate to game with secure params
        router.push(`/game/${dayParam}?t=${timestamp}&s=${signature}`);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [dayParam, timestamp, signature, router]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // If Qualifio doesn't support postMessage, add a manual "Play Now" button
  const handlePlayNow = () => {
    router.push(`/game/${dayParam}?t=${timestamp}&s=${signature}`);
  };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-gradient-to-b from-[#2A1F44] via-[#3D2F5B] to-[#4A3566]">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#2A1F44]">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            <p className="font-currys text-lg text-white">Loading form...</p>
          </div>
        </div>
      )}

      {/* Qualifio Iframe */}
      <iframe
        ref={iframeRef}
        src="https://qlic.it/1688593"
        className="h-full w-full border-0"
        title="Qualifio Form"
        allow="camera; microphone; geolocation"
        onLoad={handleIframeLoad}
      />

      {/* Fallback Play Now Button (if Qualifio doesn't auto-redirect) */}
      {!isLoading && (
        <div className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2">
          <button
            onClick={handlePlayNow}
            className="rounded-lg bg-[#CFC8F7] px-8 py-4 font-currys text-xl font-semibold text-[#2A1F44] shadow-lg transition-all hover:scale-105 hover:bg-white"
          >
            Play Now
          </button>
        </div>
      )}
    </div>
  );
}
