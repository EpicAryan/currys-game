// components/reveal/streak-indicator.tsx
"use client"
import React from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { ShareIcon, FireIcon, LockIcon } from './icons'
import { Button } from '../ui/button'

interface StreakIndicatorProps {
  currentStreak: number
  totalDays: number
}

const StreakIndicator = ({ currentStreak, totalDays }: StreakIndicatorProps) => {
  return (
    <div className="relative z-50 bg-[#2A234A]">
      <div className='relative container mx-auto px-6 py-6 md:px-12'>

        <button className="hidden group absolute right-6 top-8 md:flex size-12 lg:size-14 items-center justify-center rounded-full md:right-12">
          <div className="absolute inset-0 rounded-full">
            <Image
              src="/reveal/streak-bg.webp"
              alt=""
              fill
              className="object-cover rounded-full"
            />
          </div>
          <ShareIcon className="relative z-10 h-6 w-6 text-white transition-transform group-hover:scale-110" />
        </button>

        <div className="flex flex-col gap-3 items-center md:items-start">
          <h2 className="font-currys text-xl text-white xl:text-2xl">
            {currentStreak} days in a row! Your streak is on fire.
          </h2>
          
          <div className="flex items-center gap-1.5 md:gap-3">
            {Array.from({ length: totalDays }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative flex size-5 md:size-8 items-center justify-center rounded-full lg:size-10"
              >
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <Image
                    src="/reveal/streak-bg.webp"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10 flex items-center justify-center">
                  {index < currentStreak ? (
                    <FireIcon className="size-3 md:size-5" />
                  ) : (
                    <LockIcon className="size-3 md:size-5 text-white/40" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className='block md:hidden'>
            <Button className='font-currys leading-snug bg-transparent border border-[#CFC8F7] text-[#CFC8F7] rounded-4xl !px-5 mt-3'>
              Share the quest <ShareIcon className="text-[#CFC8F7] size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StreakIndicator
