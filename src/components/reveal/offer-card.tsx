// components/reveal/offer-card.tsx
"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Offer {
  id: number
  brand: string
  badge: string | null
  title: string
  subtitle: string
  image: string
}

interface OfferCardProps {
  offer: Offer
  index: number
}

const OfferCard = ({ offer, index }: OfferCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.1 }}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-md transition-all hover:shadow-xl"
    >
      {/* Badge */}
      {offer.badge && (
        <div className="absolute left-4 top-4 z-10 rounded-full bg-[#E0004D] px-3 py-1 text-xs font-bold text-white">
          {offer.badge}
        </div>
      )}

      {/* Brand Logo */}
      <div className="px-4 pt-6">
        <h3 className="text-2xl font-bold text-gray-900">{offer.brand}</h3>
      </div>

      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-currys text-base font-semibold text-gray-900">
          {offer.title}
        </h4>
        <p className="mt-1 text-sm text-gray-600">{offer.subtitle}</p>
      </div>
    </motion.div>
  )
}

export default OfferCard
