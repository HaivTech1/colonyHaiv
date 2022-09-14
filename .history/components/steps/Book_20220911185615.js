import React, { useState } from 'react'
import millify from 'millify'
import Image from 'next/image';
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
          console.log(response)
          toast.error(response.response.data.message);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div></div>
          <div>
            <Image
                  src="/static/agreement.jpg"
                  alt="agreement"
                  width={500}
                  height={500}
                  className="mt-6 p-6 rounded-lg shadow-xl sm:mt-8 sm:w-full sm:h-64 sm:object-cover  object-center"
                  placeholder="blur"
                  blurDataURL="/static/images/SVG-placeholder.png"
            />
          </div>
      </div>

    </div>
    </SectionContainer>
  )
}

export default Book
