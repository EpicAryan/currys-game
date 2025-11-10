import Image from 'next/image'
import React from 'react'

const ResultSection = () => {
  return (
    <section className='relative w-full h-full'>
        <div className='container mx-auto px-6 lg:px-12'>

        </div>

        {/* Snow Drift Right */}
              <div className="absolute -right-1/2 bottom-14 h-auto w-full translate-x-1/16 translate-y-1/2 md:bottom-26 lg:bottom-8 2xl:bottom-10">
                <Image
                  src="/promo/snow-drift-2.png"
                  alt="snow drift"
                  width={1446}
                  height={986}
                  className="w-[70vw] object-cover"
                />
              </div>
        
              {/* Magic Cluster Bottom Left */}
              <div className="absolute -bottom-2 left-2 z-30 h-64 w-auto lg:-left-2 lg:h-88 xl:h-96 2xl:h-[408px]">
                <Image
                  src="/promo/magic-cluster-b.png"
                  alt="magic cluster"
                  width={408}
                  height={408}
                  className="object-fit h-full w-full"
                />
              </div>
        
              {/* Gift Box 2 */}
              <div className="absolute bottom-24 left-0 z-30 h-20 w-auto md:h-30 lg:bottom-40 lg:h-22 2xl:h-[108px]">
                <Image
                  src="/promo/gift-box-2.png"
                  alt="gift box"
                  width={108}
                  height={108}
                  className="object-fit h-full w-full"
                />
              </div>
        
              {/* Gift Box 1 */}
              <div className="absolute bottom-8 left-8 z-30 h-20 w-auto lg:bottom-4 lg:left-10 lg:h-30 xl:h-35 2xl:h-[163px]">
                <Image
                  src="/promo/gift-box-1.png"
                  alt="gift box"
                  width={163}
                  height={163}
                  className="object-fit h-full w-full"
                />
              </div>
    </section>
  )
}

export default ResultSection
