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
      <div className="mt-10 sm:mt-20 text-center">
          <h1 className="my-2 text-xl font-bold leading-none text-gray-900">
            You can now proceed to paying for your booking!
          </h1>
      </div>

      

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
      </div>


    </SectionContainer>
  )
}

export default Payment
