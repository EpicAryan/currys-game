// components/reveal/streak-indicator.tsx
"use client"
import React from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { ShareIcon, FireIcon, LockIcon } from './icons'

interface StreakIndicatorProps {
  currentStreak: number
  totalDays: number
}

const StreakIndicator = ({ currentStreak, totalDays }: StreakIndicatorProps) => {
  return (
    <div className="relative z-50 bg-[#2A234A]">
      <div className='relative container mx-auto px-6 py-6 md:px-12'>

        <button className="group absolute right-6 top-8 flex h-14 w-14 items-center justify-center rounded-full md:right-12">
          <div className="absolute inset-0 rounded-full">
            <Image
              src="/streak-bg.png"
              alt=""
              fill
              className="object-cover rounded-full"
            />
          </div>
          <ShareIcon className="relative z-10 h-6 w-6 text-white transition-transform group-hover:scale-110" />
        </button>

        <div className="flex flex-col gap-3">
          <h2 className="font-currys text-xl text-white md:text-2xl">
            {currentStreak} days in a row! Your streak is on fire.
          </h2>
          
          <div className="flex items-center gap-3">
            {Array.from({ length: totalDays }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative flex h-10 w-10 items-center justify-center rounded-full md:h-10 md:w-10"
              >
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <Image
                    src="/streak-bg.png"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10 flex items-center justify-center">
                  {index < currentStreak ? (
                    <FireIcon className="h-5 w-5" />
                  ) : (
                    <LockIcon className="h-5 w-5 text-white/40" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StreakIndicator
