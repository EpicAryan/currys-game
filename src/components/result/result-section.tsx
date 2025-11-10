import Image from 'next/image'
import React from 'react'

const ResultSection = () => {
  return (
    <section className='relative w-full h-screen overflow-hidden'>
        <div className="absolute top-0 left-8 z-40 flex size-20 -translate-y-1/3 items-center justify-center rounded-full bg-white md:left-12 md:size-34 lg:left-[8vw] xl:size-44 2xl:size-50">
                <h5 className="font-currys text-2xl font-semibold tracking-wide text-[#3D2683] md:text-4xl lg:text-5xl xl:text-6xl">
                  currys
                </h5>
              </div>
        <div className='container mx-auto px-6 lg:px-12'>

        </div>
        <div className='w-auto h-[180vh] absolute top-1/2 -translate-y-1/2 left-2/5 aspect-square '>

        <Image
          src="/result/bg-circle.webp"
          alt="snow drift"
          width={2000}
          height={2000}
          className="w-full h-full object-cover "
        />
        </div>
    </section>
  )
}

export default ResultSection
