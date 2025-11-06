// components/reveal/top-offers.tsx
"use client"
import React from 'react'
import { motion } from 'framer-motion'
import OfferCard from './offer-card'

const TopOffers = () => {
  const offers = [
    {
      id: 1,
      brand: 'SAMSUNG',
      badge: 'Cashback!',
      title: 'Shop top TVs from Samsung',
      subtitle: 'and claim up to €450 cashback',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80',
    },
    {
      id: 2,
      brand: 'STARLINK',
      badge: 'Lowest ever price!',
      title: 'Reliable high-speed internet wherever you live',
      subtitle: 'Shop the Starlink range',
      image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=600&q=80',
    },
    {
      id: 3,
      brand: 'PS5',
      badge: null,
      title: 'Great value console bundles',
      subtitle: 'Shop PS5, Switch & and Xbox',
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&q=80',
    },
    {
      id: 4,
      brand: 'LEGO',
      badge: 'New!',
      title: 'Calling all Master Builders',
      subtitle: 'LEGO now available at Currys',
      image: 'https://images.unsplash.com/photo-1587912030133-2b38c4b97c73?w=600&q=80',
    },
  ]

  return (
    <div className="relative z-30 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <h2 className="font-currys mb-8 text-3xl font-bold text-[#E0004D] md:text-4xl">
          Shop our top offers
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopOffers
