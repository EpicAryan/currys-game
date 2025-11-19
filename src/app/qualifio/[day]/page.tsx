"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
// import { motion } from "motion/react";

export default function QualifioPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const dayParam = params.day as string;
  const timestamp = searchParams.get("t") || "";
  const signature = searchParams.get("s") || "";
  const [isLoading, setIsLoading] = useState(true);
  const hasRedirectedRef = useRef(false);
  const loadEventCountRef = useRef(0);
  const initialLoadCompleteRef = useRef(false);
  const formInteractedRef = useRef(false);

  // Suppress cross-origin iframe errors from Qualifio
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (
        event.filename?.includes("qualifio") ||
        event.filename?.includes("dixonscarphone") ||
        event.message?.includes("nextElementSibling") ||
        !event.filename
      ) {
        event.preventDefault();
        event.stopPropagation();
        return true;
      }
    };

    window.addEventListener("error", handleError, true);
    return () => window.removeEventListener("error", handleError, true);
  }, []);

  // Validate security parameters
  useEffect(() => {
    if (!timestamp || !signature) {
      router.push("/");
    }
  }, [timestamp, signature, router]);

  // Listen for postMessage from Qualifio iframe
  useEffect(() => {
    let initialLoadTimer: NodeJS.Timeout;

    const handleMessage = (event: MessageEvent) => {
      if (hasRedirectedRef.current) return;
      
      if (
        event.origin.includes("qualifio") ||
        event.origin.includes("qlic.it") ||
        event.origin.includes("dixonscarphone")
      ) {
        const data = event.data;
        
        if (!initialLoadCompleteRef.current) {
          initialLoadTimer = setTimeout(() => {
            initialLoadCompleteRef.current = true;
          }, 3000);
        }
        
        if (typeof data === "string" && data.includes("mutationObserver")) {
          formInteractedRef.current = true;
        }
        
        if (typeof data === "string" && data.includes("loadEvent")) {
          loadEventCountRef.current++;
          
          if (
            initialLoadCompleteRef.current && 
            formInteractedRef.current && 
            loadEventCountRef.current > 2
          ) {
            setTimeout(() => {
              if (!hasRedirectedRef.current) {
                hasRedirectedRef.current = true;
                router.push(`/game/${dayParam}?t=${timestamp}&s=${signature}`);
              }
            }, 1500);
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      if (initialLoadTimer) clearTimeout(initialLoadTimer);
    };
  }, [dayParam, timestamp, signature, router]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // const handlePlayNow = () => {
  //   if (hasRedirectedRef.current) return;
  //   hasRedirectedRef.current = true;
  //   router.push(`/game/${dayParam}?t=${timestamp}&s=${signature}`);
  // };

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-gradient-to-b from-[#2A1F44] via-[#3D2F5B] to-[#4A3566]">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#2A1F44]">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            <p className="font-currys text-lg text-white">Loading form...</p>
          </div>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src="https://qlic.it/1688593"
        className="h-full w-full border-0"
        title="Qualifio Form"
        allow="camera; microphone; geolocation"
        onLoad={handleIframeLoad}
      />

      {/* {!isLoading && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5, ease: "easeOut" }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-50 bg-gradient-to-t from-[#2A1F44] via-[#2A1F44]/95 to-transparent pb-8 pt-24"
        >
          <div className="pointer-events-auto flex flex-col items-center gap-3">
            <p className="font-currys text-center text-sm text-[#CFC8F7]/70 md:text-base">
              Or click here to continue
            </p>
            <motion.button
              onClick={handlePlayNow}
              className="rounded-full bg-[#CFC8F7] px-10 py-4 font-currys text-xl font-semibold text-[#2A1F44] shadow-2xl transition-all hover:scale-105 hover:bg-white active:scale-95 md:px-12 md:py-5 md:text-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 20px 60px rgba(207, 200, 247, 0.3)",
                  "0 20px 80px rgba(207, 200, 247, 0.5)",
                  "0 20px 60px rgba(207, 200, 247, 0.3)",
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              Play 12 Days of Techmas
            </motion.button>
          </div>
        </motion.div>
      )} */}
    </div>
  );
}
