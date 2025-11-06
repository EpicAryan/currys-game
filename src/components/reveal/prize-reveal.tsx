// components/reveal/prize-reveal.tsx
"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const PrizeReveal = () => {
  return (
    <div className="relative z-30 bg-gradient-to-b from-[#B5A8D6] to-[#C8BFE0] py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="font-currys text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
              You've also unlocked the prize of the day!
            </h2>
            <p className="mt-4 text-lg text-gray-700 md:text-xl">
              The latest Alexa speaker is here!
            </p>
            <p className="text-lg text-gray-700 md:text-xl">
              We'll reach out if you win.
            </p>
          </motion.div>

          {/* Right side - Prize Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: 'spring' }}
            className="relative flex justify-center"
          >
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              <Image
                src="https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80"
                alt="Alexa Speaker"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gift boxes decoration - reuse from your TechmasPromo */}
      <div className="absolute bottom-0 left-0 h-24 w-24 md:h-32 md:w-32">
        <Image
          src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=200&q=80"
          alt="gift box"
          fill
          className="object-contain"
        />
      </div>
    </div>
  )
}

export default PrizeReveal
