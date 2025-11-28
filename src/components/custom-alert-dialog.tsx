"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { createContext, useContext, useState, useCallback, useRef, ReactNode } from "react";

interface AlertDialogContextType {
  showAlert: (
    title: string,
    description: string,
    onConfirm?: () => void
  ) => void;
}

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(
  undefined
);

export function AlertDialogProvider({ children }: { children: ReactNode }) {
  const [alertState, setAlertState] = useState<{
    open: boolean;
    title: string;
    description: string;
  }>({
    open: false,
    title: "",
    description: "",
  });

  const callbackRef = useRef<(() => void) | null>(null);

  const showAlert = useCallback(
    (
      title: string,
      description: string,
      onConfirm: () => void = () => {}
    ) => {
      callbackRef.current = onConfirm;
      setAlertState({
        open: true,
        title,
        description,
      });
    },
    []
  );

  const handleConfirm = useCallback(() => {
    const callback = callbackRef.current;
    setAlertState({
      open: false,
      title: "",
      description: "",
    });
    callbackRef.current = null;
    
    if (callback) {
      requestAnimationFrame(() => {
        callback();
      });
    }
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setAlertState({
        open: false,
        title: "",
        description: "",
      });
      callbackRef.current = null;
    }
  }, []);

  return (
    <AlertDialogContext.Provider value={{ showAlert }}>
      {children}
      <AlertDialog open={alertState.open} onOpenChange={handleOpenChange}>
        <AlertDialogContent className="border-white/20 bg-gradient-to-b from-[#2A1F44] to-[#3D2F5B]">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-currys text-2xl text-[#E5006D]">
              {alertState.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="font-currys text-gray-300 tracking-wider text-base md:text-lg xl:text-xl">
              {alertState.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={handleConfirm}
              className="font-currys bg-white text-[#2A1F44] hover:bg-white/90"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialogContext.Provider>
  );
}

export function useAlertDialog() {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("useAlertDialog must be used within AlertDialogProvider");
  }
  return context;
}
