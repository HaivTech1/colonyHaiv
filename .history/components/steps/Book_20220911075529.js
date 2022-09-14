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


const Book = ({property, handleClick}) => {
  const { id, image, slug, title, purpose, address, price, specifications, excerpt, relationships } = property
  const { user, furnish, amenities, paymentMethod, addPaymentMethod, bookingClear } = useAdmin();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPaymentMethod, SetCurrentPaymentMethod] = useState(paymentMethod)


  const handlePaymentClick = async (e) => {
    const { checked, value } = e.currentTarget

    const isConfirm = await Swal.fire({
      title: 'Hello! ' + user.name,
      text: `You have just choosen to be updated on (${value}). You will be notified soon.`,
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

    SetCurrentPaymentMethod((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    )
  }

  const submitPaymentMethodHandler = (e) => {
    e.preventDefault()
    if (!currentPaymentMethod) {
      toast.error('At least one action is required')
    } else {
      addPaymentMethod(currentPaymentMethod)
      toast.success('Payment method added successfully')
    }
  }

  const handleBook = async() => {
      setIsLoading(true)
      await client.post('/v1/bookings', {
        property_uuid: id, 
        furnish, 
        amenities, 
        author: user.id
       }).then((response) => {
          console.log(response)
          toast.success(response.data.message);
          bookingClear()
        }).catch((error) => {
          console.log(error)
          toast.success(error.data.message);
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
              <form onSubmit={submitPaymentMethodHandler}>
                <div className="grid grid-cols-1 md:grid-cols-3">
                {!colonyPayment && 'There are no amenities available'}
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
                          {currentPaymentMethod.some((val) => val === value) && (
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

                  { currentPaymentMethod.length >= 1 &&
                    <div className="flex justify-center">
                        <button type="submit"
                          className={`px-2 py-2 dark:bg-background-color rounded-lg bg-transparent outline-none border-2 border-primary-400 text-primary-500 font-medium active:scale-95 hover:bg-primary-600 hover:text-white hover:border-transparent focus:bg-primary-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none cursor-pointer transition-colors duration-200 ease-in-out`}>
                          Update
                        </button>
                    </div>
                  }
              </form>
          </div>
        </div>

        <div>
          <button onClick={handleBook} className="button">Book Property</button>
        </div>
    </SectionContainer>
  )
}

export default Book
