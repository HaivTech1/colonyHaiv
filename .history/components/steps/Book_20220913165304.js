import React, { useState } from 'react'
import millify from 'millify'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import Image from '../Image'
import SectionContainer from '../layouts/SectionContainer';
import { useAdmin } from '../../lib/provider/context'
import Loader from '../Loader'
import client from '../../lib/client';
import { colonyPayment  } from '../../utils/filterData'


const Book = ({property}) => {
  const { id,  title, price } = property
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
            setInterval(() => {
                window.location.pathname = response.data.redirectTo
            }, 2000);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center sm:mt-20 mt-10">

      <div className="w-full  md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:-mx-3 md:my-3 rounded-md md:relative md:z-50 md:flex md:flex-col">
            <div className="w-full flex-grow">
                <h2 className="text-center font-bold uppercase mb-4">{title}</h2>
                <h3 className="text-center font-bold text-3xl md:text-4xl mb-2">₦{ millify(price) }
                <span className="text-lg"></span></h3>
                
                <h1 className="font-bold text-center text-lg mb-4 sm:text-4xl text-primary-900">Payment Method</h1>
              
                <div className="grid grid-cols-1 md:grid-cols-3 mb-3">
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
            <div class="w-full flex justify-center">
                <button onClick={handleBook} 
                  class="bg-primary-900 rounded-t-xl rounded-br-xl px-4 py-2 font-semibold text-md text-white">
                  Book Property
                </button>
            </div>
        </div>


        <div className="group relative">
          <div className="animate-tilt rotate-60 absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-50 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
          <Image
              src="/static/book.jpg"
              alt="agreement"
              width={500}
              height={500}
              className="mt-6 p-6 rounded-lg shadow-xl sm:mt-8 sm:w-full sm:h-64 sm:object-cover  object-center"
              placeholder="blur"
              blurDataURL="/static/images/SVG-placeholder.png"
          />
        </div>
      </div>    
    </SectionContainer>
  )
}

export default Book
