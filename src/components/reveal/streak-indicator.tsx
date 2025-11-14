// components/reveal/streak-indicator.tsx
"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { ShareIcon, FireIcon, LockIcon, FireIconWithCoupon, CopyIcon } from './icons'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check } from 'lucide-react'

interface StreakIndicatorProps {
  currentStreak: number
  totalDays: number
}

const StreakIndicator = ({ currentStreak, totalDays }: StreakIndicatorProps) => {
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({})
  
  // Dummy data 
  const couponCodes: { [key: number]: string } = {
    0: '30CURRYS2025',
    2: '30CURRYS2025', 
  }

  const handleCopy = async (code: string, dayIndex: number) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedStates(prev => ({ ...prev, [dayIndex]: true }))
      
      // Reset after 2 seconds
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [dayIndex]: false }))
      }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

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
            {Array.from({ length: totalDays }).map((_, index) => {
              const hasCoupon = couponCodes[index]
              const isUnlocked = index < currentStreak

              return (
                <Popover key={index}>
                  <PopoverTrigger asChild>
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative flex size-5 md:size-8 items-center justify-center rounded-full lg:size-10 cursor-pointer disabled:cursor-default"
                      disabled={!hasCoupon}
                    >
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <Image
                          src="/reveal/streak-bg.webp"
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      {/* Pulsing dot indicator for coupon */}
                      {hasCoupon && (
                        <motion.div
                          className="absolute bottom-0 right-0 size-1.5 md:size-2.5 bg-[#E5006D] rounded-full z-20"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [1, 0.7, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      )}

                      <div className="relative z-10 flex items-center justify-center">
                        {isUnlocked ? (
                          hasCoupon ? (
                            <FireIconWithCoupon className="size-3 md:size-5" />
                          ) : (
                            <FireIcon className="size-3 md:size-5" />
                          )
                        ) : (
                          <LockIcon className="size-3 md:size-5 text-white/40" />
                        )}
                      </div>
                    </motion.button>
                  </PopoverTrigger>

                  {hasCoupon && (
                    <PopoverContent 
                      className="w-auto px-2.5 md:px-4 py-1 md:py-2 bg-[#E5006D] border-none shadow-lg z-[100]"
                      side="bottom"
                      align="start"
                      sideOffset={10}
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        <code className="font-currys text-[10px] md:text-lg font-medium text-white tracking-wider">
                          {couponCodes[index]}
                        </code>
                        
                        <button
                          onClick={() => handleCopy(couponCodes[index], index)}
                          className="flex-shrink-0 p-1 md:p-1.5 rounded-full transition-colors bg-[#F9D2E5]"
                          aria-label="Copy code"
                        >
                          <AnimatePresence mode="wait">
                            {copiedStates[index] ? (
                              <motion.div
                                key="checked"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                              >
                                <Check className="size-3 md:size-4 text-[#E5006D]" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="copy"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <CopyIcon className="size-3 md:size-4" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                      </div>
                    </PopoverContent>
                  )}
                </Popover>
              )
            })}
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
