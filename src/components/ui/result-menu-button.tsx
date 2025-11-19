"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Share2, Flag, LogOut } from "lucide-react";

export default function MenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const getBaseUrl = () => {
    const url = new URL(window.location.href);
    const pathBeforeResult = pathname.split("/result")[0];
    return `${url.origin}${pathBeforeResult}`;
  };

  const handleShare = async () => {
    const baseUrl = getBaseUrl();
    
    if (navigator.share) {
      try {
        await navigator.share({
          url: baseUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(baseUrl);
      alert("Link copied to clipboard!");
    }
    setIsOpen(false);
  };

  const handleReport = () => {
    const baseUrl = getBaseUrl();
    const subject = encodeURIComponent("Report Issue");
    const body = encodeURIComponent(`I would like to report an issue.\n\nPage URL: ${baseUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setIsOpen(false);
  };

  const handleExit = () => {
    const baseUrl = getBaseUrl();
    router.push(baseUrl);
    setIsOpen(false);
  };

  const menuItems = [
    { icon: Share2, label: "Share", onClick: handleShare },
    { icon: Flag, label: "Report", onClick: handleReport },
    { icon: LogOut, label: "Exit", onClick: handleExit },
  ];

  return (
    <div className="relative">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="aspect-square size-[31px] md:size-9 xl:size-11"
        aria-label="Menu"
      >
        <Image
          src="/result/menu-button.png"
          alt="menu"
          width={45}
          height={45}
          className="h-full w-full cursor-pointer object-contain transition-all active:scale-95"
        />
      </button>

      {/* Menu Card */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ 
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="absolute top-full right-0 z-50 mt-2 w-35 md:w-40 lg:w-[180px] overflow-hidden rounded-[20px] border border-white/20 shadow-lg"
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.05,
                    duration: 0.2
                  }}
                  onClick={item.onClick}
                  className="font-currys flex w-full items-center justify-between px-4 py-3 text-left text-sm font-normal text-white transition-colors hover:bg-white/15 xl:text-base"
                >
                  <span>{item.label}</span>
                  <item.icon className="h-4 w-4" strokeWidth={2} />
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
