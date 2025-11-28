"use client";

import { verifyGameAccess } from "@/lib/game-access";
import { generateSignedURL } from "@/lib/hmac";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useAlertDialog } from "@/components/custom-alert-dialog";

export default function GamePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { showAlert } = useAlertDialog();

  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  const dayParam = params.day as string;
  const dayNumber = dayParam.replace(/^day/, "");

  const timestamp = searchParams.get("t") || "";
  const signature = searchParams.get("s") || "";

  useEffect(() => {
    async function verify() {
      if (!timestamp || !signature) {
        showAlert(
           "Access Expired",
        "Your session has timed out. Please refresh to return to the start.",
          () => {
            router.push("/");
          },
        );
        setIsVerifying(false);
        return;
      }

      const isValid = await verifyGameAccess(dayNumber, timestamp, signature);

      if (!isValid) {
        showAlert(
           "Access Expired",
        "Your session has timed out. Please refresh to return to the start.",
          () => {
            router.push("/");
          },
        );
        setIsVerifying(false);
        return;
      }

      setIsVerified(true);
      setIsVerifying(false);
    }

    verify();
  }, [dayNumber, timestamp, signature, router, showAlert]);

  useEffect(() => {
    if (!isVerified || !iframeRef.current) {
      return;
    }

    const iframe = iframeRef.current;

    const postDayNumber = () => {
      iframe.contentWindow?.postMessage(
        {
          type: "setDayNumber",
          day: parseInt(dayNumber),
          source: "parent-website",
        },
        "*",
      );
    };

    postDayNumber();

    iframe.addEventListener("load", () => {
      postDayNumber();
    });

    return () => {
      iframe.removeEventListener("load", postDayNumber);
    };
  }, [isVerified, dayNumber]);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const trustedOrigins = [
        "https://playcanv.as",
        "https://techmasgame.pages.dev",
      ];

      const isTrusted = trustedOrigins.some((origin) =>
        event.origin.startsWith(origin),
      );

      if (!isTrusted) {
        console.warn("❌ Untrusted origin:", event.origin);
        return;
      }

      if (event.data.type === "gameOver") {
        const finalScore = event.data.finalScore;

        if (finalScore === undefined || finalScore === null) {
          showAlert(
            "Score Missing",
            "Score data is missing. Please try again.",
          );
          return;
        }

        try {
          const signedURL = await generateSignedURL(
            dayParam,
            finalScore.toString(),
          );
          router.push(signedURL);
        } catch (error) {
          console.error("❌ Failed to generate signed URL:", error);
          showAlert(
            "Submission Failed",
            "Failed to submit score. Please try again.",
          );
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [dayParam, router, showAlert]);

  if (isVerifying) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2A1F44] via-[#3D2F5B] to-[#4A3566]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
          <p className="font-currys text-lg text-white">Verifying access...</p>
          <p className="font-currys mt-2 text-sm text-white opacity-70">
            Day {dayNumber}
          </p>
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
      src="https://playcanv.as/e/p/3FSwoGDA"
      className="fixed top-0 left-0 block h-[100dvh] w-screen border-none"
      allow="autoplay; fullscreen"
      title={`Day ${dayNumber} Game`}
    />
  );
}
