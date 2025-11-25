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
  const hasRedirectedRef = useRef(false);
  const loadEventCountRef = useRef(0);
  const initialLoadCompleteRef = useRef(false);
  const formInteractedRef = useRef(false);

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

  useEffect(() => {
    if (!timestamp || !signature) {
      router.push("/");
    }
  }, [timestamp, signature, router]);

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


  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#2A234A]">
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
        src="https://dixonscarphone.qualifioapp.com/20/224B2611-0E8E-4671-B07B-7A0B9042D44A/_scosh5/v1.cfm?fbappiframe=false&cfid=3eddf383-83e0-4a1c-ad25-40ab61cf96fd&noback=false&uk=QK72GMRPJUF&page=1&cftoken=0"
        className="h-full w-full border-0"
        title="Qualifio Form"
        allow="camera; microphone; geolocation"
        onLoad={handleIframeLoad}
      />
    </div>
  );
}
