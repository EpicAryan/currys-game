"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    console.log("click");
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="size-8 cursor-pointer rounded-full border-0 bg-transparent p-0 transition-transform duration-200 ease-in-out outline-none hover:scale-95 focus:outline-none active:scale-90 md:size-12"
    >
      <Image
        src="/promo/back-button.png"
        alt="button"
        width={45}
        height={45}
        className="h-full w-full object-contain"
      />
    </button>
  );
};

export default BackButton;
