import React from 'react'
import { useRouter } from 'next/router'
import millify from 'millify'
import Image from './Image'
import { LocationMarkerIcon, ShareIcon } from '@heroicons/react/solid'

const PropertyCard = ({ property }) => {
  const { image, slug, title, purpose, type, address, price } = property
  const router = useRouter()

  return (
    <>
    <div className="my-3.5 overflow-hidden rounded-md border border-gray-200  transition duration-500 ease-linear md:my-0 md:mr-6">
    <div className="relative">
      <div
        className="w-full cursor-pointer"
        onClick={() => router.push('/property/[slug]', `/property/${slug}`)}
      >
        {image ? (
          <Image
            src="/static/props.png"
            alt={title}
            width="480"
            height="350"
            className="rounded-2xl object-cover"
            placeholder="blur"
            blurDataURL="/static/images/SVG-placeholder.png"
          />
        ) : null}
        <div className="absolute top-2.5 left-2.5 rounded-md bg-primary-700 bg-opacity-50 px-3 py-1.5 text-sm font-bold uppercase text-white">
          {purpose}
        </div>
      </div>
      <div className="px-2.5 py-4  md:px-3.5 md:py-6">
        <div className="flex items-center justify-between">
          <div className="mb-3 flex items-center md:mb-3">
            <LocationMarkerIcon className="w-7 h-7 text-primary-900"/>
            <p className="mx-2 font-bold text-gray-900 transition duration-500 ease-in-out hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-500">{address}</p>
          </div>
          <div className="mb-3 md:mb-3">
            <p className="font-bold">
              {' '}
              {millify(price)}
             
            </p>
          </div>
        </div>
        <div>
          <div
            onClick={() => router.push('/property/[slug]', `/property/${slug}`)}
            className="cursor-pointer"
          >
            <h2 className="text-header mb-3 text-base font-bold capitalize md:text-lg  darkdark:text-white">
              {title}
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div onClick={() => router.push('/property/[slug]', `/property/${slug}`)}>
                {' '}
                <h2 className="mt-2 inline-block cursor-pointer rounded-full border border-gray-300 px-6 py-2.5 text-sm font-bold  text-primary-500 shadow-sm transition duration-500 ease-linear hover:translate-x-1">
                  View Detail
                </h2>{' '}
              </div>
            </div>
            <ShareIcon className='w-7 h-7'/>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default PropertyCard
