"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ExitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmExit: () => void;
}

export default function ExitDialog({
  open,
  onOpenChange,
  onConfirmExit,
}: ExitDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] border-none bg-transparent p-0 shadow-none md:max-w-lg xl:max-w-2xl">
        <div className="relative overflow-hidden rounded-2xl bg-[#2B0C5A]">
          {/* Content */}
          <div className="relative z-10 px-6 pb-8 pt-12 md:px-8 xl:pb-10 xl:pt-16">
            <DialogTitle className="font-currys mb-8 text-center text-xl leading-tight text-white md:mb-10 md:text-3xl xl:text-4xl font-normal">
              Are you sure you want to exit?
            </DialogTitle>

            <DialogDescription className="sr-only">
              Confirm if you want to exit the game or continue playing
            </DialogDescription>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <button
                onClick={onConfirmExit}
                className="font-currys text-sm text-white underline underline-offset-4 transition-all hover:text-white md:text-xl xl:text-2xl hover:scale-102"
              >
                Yes, exit
              </button>

              <Button
                onClick={() => onOpenChange(false)}
                className="font-currys rounded-full bg-[#CFC8F7] px-6 py-4 text-sm text-[#4C12A1] transition-all hover:scale-105 hover:bg-[#CFC8F7]/80 md:px-10 md:py-6 md:text-lg xl:text-xl font-semibold cursor-pointer"
              >
                No, stay
              </Button>
            </div>
          </div>

          {/* Bottom Snow Scene */}
          <div className="relative h-23 w-full md:h-32 xl:h-40 translate-y-1 xl:translate-y-0">
            <Image
              src="/result/exit-dialog.webp"
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
