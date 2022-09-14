import React from 'react'
import millify from 'millify'
import { LocationMarkerIcon, ShareIcon } from '@heroicons/react/solid'
import toast from 'react-hot-toast'

import Image from './../Image'
import SectionContainer from './../layouts/SectionContainer';
import Specification from './../Specification'
import { useAdmin } from '../../lib/provider/context'
import Status from '../Status'


const Payment = ({property}) => {
  const { image, slug, title, purpose, address, price, specifications, excerpt, relationships } = property
  const { furnish, amenities } = useAdmin()

  return (
    <SectionContainer>
    <div>
      <div className="mt-10 sm:mt-20 text-center">
          <h1 className="my-2 text-xl font-bold leading-none text-gray-900">
            You can now proceed to paying for your booking!
          </h1>
      </div>

      <div className="mb-10 mt-5 sm:mt-10">
        <div className="group flex bg-transparent bg-opacity-20 px-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <div className="space-y-2 bg-transparent bg-opacity-20 p-2 transition duration-200 hover:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                <div className="space-y-5 xl:col-span-4">
                    <div className="relative space-y-1">
                        <div className="flex justify-between items-center space-x-5">
                            <div
                                className="w-full cursor-pointer flex-1"
                                onClick={() => router.push('/property/[slug]', `/property/${slug}`)}
                            >
                                {image ? (
                                <Image
                                    src={image[0]}
                                    alt={title}
                                    width="250"
                                    height="200"
                                    className="rounded-2xl object-cover"
                                    placeholder="blur"
                                    blurDataURL="/static/images/SVG-placeholder.png"
                                />
                                ) : null}
                            </div>

                            <div className="flex-3">
                                <div className="flex justify-between items-center space-x-5">
                                    <div className="flex justify-between items-center space-x-2">
                                        <div className="rounded-md bg-primary-500 bg-opacity-50 px-3 py-1.5 text-sm font-bold uppercase text-white">
                                            {purpose}
                                        </div>
                                        <div className="rounded-md bg-primary-700 bg-opacity-50 px-3 py-1.5 text-sm font-bold uppercase text-white">
                                            {relationships.category.title}
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-gray-900 transition duration-500 ease-in-out hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-500">
                                            {millify(price)}
                                        </h2>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-2">
                                    <span  className="flex space-x-2 mt-2">
                                        <LocationMarkerIcon className="w-7 h-7 text-primary-900"/>
                                        <p className="font-bold text-gray-900 transition duration-500 ease-in-out hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-500">
                                            {address}
                                        </p>
                                    </span>

                                    <p className="font-bold text-gray-900 transition duration-500 ease-in-out hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-500">
                                        {title}
                                    </p>
                                </div>
                                <p>{excerpt}</p>

                                <div className="mt-2 flex flex-wrap justify-center items-center">
                                    {specifications?.map((specification, index) => (
                                        <Specification key={index} text={specification} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

        <div className="flex flex-col space-x-4">
        <div className="flex flex-wrap items-center justify-around p-5">
        <div className="rounded-lg border-2 border-primary-500 bg-gray-100 p-5">
          {!amenities ? 'No amenities attached' : ''}

          <div>
            {amenities.map((amenity, index) => (
              <div key={index}>
                <Status name={amenity} status={true} />
              </div>
            ))}
          </div>
        </div>
    </div>

    <div className="flex flex-wrap items-center justify-around p-5">
        <div className="rounded-lg border-2 border-primary-500 bg-gray-100 p-5">
          {!furnish ? 'No furnishing attached' : ''}

          <div>
            {furnish.map((amenity, index) => (
              <div key={index}>
                <Status name={amenity} status={true} />
              </div>
            ))}
          </div>
        </div>
    </div>
        </div>
      </div>


    </SectionContainer>
  )
}

export default Payment
