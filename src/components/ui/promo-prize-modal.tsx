// components/promo/promo-prize-modal.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export interface PrizeConfig {
  src: string;
  width: number;
  height: number;
  className?: string;
}

interface PromoPrizeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  day?: number | null;
  prize?: PrizeConfig;
}

export function PromoPrizeModal({
  open,
  onOpenChange,
  day,
  prize,
}: PromoPrizeModalProps) {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay
        className="
          fixed inset-0 z-[100] bg-[#0b042c]/60 backdrop-blur-sm
          data-[state=open]:animate-in data-[state=closed]:animate-out
          data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
        "
      />
      {/* <DialogTitle>Techmas</DialogTitle> */}
      <DialogContent
        className="z-[101] min-w-screen h-full grid place-items-center bg-gradient-to-b from-[#2A1F44] via-[#3D2F5B] to-[#4A3566] border-none rounded-none outline-none"
      >
        <DialogClose
          aria-label="Close"
          className="
            absolute right-4 top-4 inline-flex items-center justify-center
            rounded-full p-2 text-white/80 hover:text-white
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50
          "
        >
          <X className="h-6 w-6" />
        </DialogClose>

        <div className="mx-auto flex max-w-[min(92vw,560px)] flex-col items-center gap-6 px-6">
          {typeof day === "number" ? (
            <p className="font-currys text-center text-lg text-[#CFC8F7]">
              Day {day}
            </p>
          ) : null}

          <div className="relative w-full">
            <div className="mx-auto w-full">
              {prize ? (
                <Image
                  src={prize.src}
                  alt={`Day ${day ?? ""} prize`}
                  width={prize.width}
                  height={prize.height}
                  className={`mx-auto h-auto max-h-[52vh] w-auto object-contain drop-shadow-2xl ${prize.className ?? ""}`}
                  priority
                />
              ) : (
                <div className="mx-auto aspect-square h-[220px] w-[220px] rounded-full bg-white/5" />
              )}
            </div>
          </div>

          {/* <Link href="/reveal" className="w-full">
            <Button
              size="lg"
              className="
                w-full font-semibold
                bg-white/10 text-white hover:bg-white/20
                border border-white/20
              "
            >
              Play now
            </Button>
          </Link> */}
          
            <Button
            onClick={() => {
              onOpenChange(false);
              router.push("/sample/game");
            }}
              size="lg"
              className="
                w-full font-semibold
                bg-white/10 text-white hover:bg-white/20
                border border-white/20
              "
            >
              Play now
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
