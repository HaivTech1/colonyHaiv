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
      <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">

      <div class="w-full md:w-1/4 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:-mx-3 md:my-3 rounded-md shadow-lg shadow-gray-600 md:relative md:z-50 md:flex md:flex-col">
            <div class="w-full flex-grow">
                <h2 class="text-center font-bold uppercase mb-4">TEAM</h2>
                <h3 class="text-center font-bold text-3xl md:text-4xl mb-2">$15<span class="text-lg">/mo</span></h3>
                <p class="text-center font-bold mb-5">
                    <a href="#" class="hover:underline hover:text-gray-700 transition-all transform hover:scale-110 inline-block">Read more<i class="mdi mdi-arrow-right-thick ml-1"></i></a>
                </p>
                <ul class="text-sm px-5 mb-8">
                    <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Lorem ipsum</li>
                    <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Dolor sit amet</li>
                    <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Consectetur</li>
                    <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Adipisicing</li>
                    <li class="leading-tight"><i class="mdi mdi-check-bold text-lg"></i> Elit repellat</li>
                </ul>
            </div>
            <div class="w-full">
                <button class="font-bold bg-gray-600 hover:bg-gray-700 text-white rounded-md px-10 py-2 transition-colors w-full">Buy Now</button>
            </div>
        </div>


        <div></div>
      </div>    
    </SectionContainer>
  )
}

export default Book
