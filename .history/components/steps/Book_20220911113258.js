import React, { useState } from 'react'
import millify from 'millify'
import { LocationMarkerIcon, ShareIcon } from '@heroicons/react/solid'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import Image from '../Image'
import SectionContainer from '../layouts/SectionContainer';
import Specification from '../Specification'
import { useAdmin } from '../../lib/provider/context'
import Status from '../Status'
import Loader from '../Loader'
import client from '../../lib/client';
import { colonyPayment  } from '../../utils/filterData'


const Book = ({property}) => {
  const { id, image, slug, title, purpose, address, price, specifications, excerpt, relationships } = property
  const { user, furnish, amenities, paymentMethod, addPaymentMethod, bookingClear } = useAdmin();
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState(paymentMethod)
  const [isLoading, setIsLoading] = useState(false);


  const handlePaymentClick = async (e) => {
    const { value } = e.currentTarget

    const isConfirm = await Swal.fire({
      title: 'Hello! ' + user.name,
      text: `Are you sure you want to pay with ${value}!`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#D100D1',
      cancelButtonColor: '#F9A01B',
      confirmButtonText: 'Yes, please add!',
    }).then((result) => {
      return result.isConfirmed
    })

    if (!isConfirm) {
      return
    }

    setCurrentPaymentMethod(value)
    addPaymentMethod(value)
    if(currentPaymentMethod.length < 1) toast.success('Payment method added!')
    else toast.success('Payment method updated!')

  }

  const handleBook = async() => {
      setIsLoading(true)
      await client.post('auth/bookings', {
        property_uuid: id, 
        furnish, 
        amenities,
        paymentMethod,
       }).then((response) => {
          console.log(response)
          if(response.data.success === true ){
            toast.success(response.data.message)
            bookingClear()
          }else{
            toast.error(response.data.message)
          }; 
        }).catch((response) => {
          console.log(response.data)
          // toast.success(response.data.message);
        });
      setIsLoading(false)
  }

  if(isLoading){
    return (
      <Loader />
    )
  }

  return (
    <SectionContainer>
    <div>
      <div className="mt-10 sm:mt-20 text-center">
          <h1 className="my-2 text-xl font-bold leading-none ">
            You can now submit your booking with your payment choice!
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

        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center border-1 border-primary-500">
                <div className="rounded-lg  p-5">
                  {!amenities ? 'No amenities attached' : ''}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {amenities.map((amenity, index) => (
                      <div key={index}>
                        <Status name={amenity} status={true} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg  p-5">
                  {!furnish ? 'No furnishing attached' : ''}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {furnish.map((amenity, index) => (
                      <div key={index}>
                        <Status name={amenity} status={true} />
                      </div>
                    ))}
                  </div>
            </div>
        </div>

          <div className="block w-full overflow-x-auto">
            <h1 className="font-bold text-center text-2xl sm:mt-8 sm:text-4xl text-primary-500">Payment Method</h1>
            
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {colonyPayment.map(({ name, value }) => (
                    <div key={name} className="mx-8 my-5 flex">
                      <input
                        id={name}
                        type="checkbox"
                        label={value}
                        value={value}
                        checked={colonyPayment.some((val) => val === value)}
                        onChange={handlePaymentClick}
                        hidden
                      />
                      <label
                        className="group flex cursor-pointer select-none items-center space-x-2 text-gray-700"
                        htmlFor={name}
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary-700 group-hover:border-primary-700">
                          {currentPaymentMethod === value && (
                            <div className="h-3 w-3 rounded-full bg-primary-500 group-hover:bg-primary-700" />
                          )}
                        </div>
                        <span className="font-bold text-primary-500 group-hover:text-lg">
                          {name}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
          </div>
        </div>

        {currentPaymentMethod && (
          <div className="mt-4 flex justify-center">
            <button onClick={handleBook} className="button w-64">Book Property</button>
          </div>
        )}

    </SectionContainer>
  )
}

export default Book
