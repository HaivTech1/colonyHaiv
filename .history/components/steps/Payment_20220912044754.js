import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image';
import { usePaystackPayment } from 'react-paystack';
import { FaCcMastercard } from "react-icons/fa";
import { useAdmin } from '../../lib/provider/context';
import client from '../../lib/client';
import Loader from '../Loader';

const Payment = () => {

  const { user, furnish, amenities } = useAdmin()
  const [isLoading, setIsLoading] = useState(false)
  const [bookings, setBookings] = useState([])

  useEffect(() => {
      fetchBookings()
  },[bookings])

  const fetchBookings = async () => {
      try {
        setIsLoading(true)
        await client.get(`/auth/latest/bookings`).then((response) => {
          console.log(response.data.data)
            setBookings(response.data.data)
            setIsLoading(false)
        }).catch((error) => {
          console.log(error.response.data.message)
        })
      } catch (error) {
        console.log(error)
      }
  }


  const config = {
    reference: (new Date()).getTime(),
    email:  user.email,
    amount: bookings?.total,
    publicKey: 'pk_test_37c3e7ef0bd3d61bb23906ed4e92de33d759fb01',
  };

 // you can call this function anything
 const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed')
}

const PaystackProperty = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div className='flex justify-center'>
          <button className="button" onClick={() => {
              initializePayment(onSuccess, onClose)
          }}>
            <span className="flex justify-center items-center space-x-2">
            <FaCcMastercard className="w-7 h-7 "/>
            <span>Pay With Paystack</span>
            </span>
          </button>
      </div>
    );
};

  if (isLoading) return <Loader />

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center mt-5 sm:mt-10">
    <div class="w-full  md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:-mx-3 md:my-3 rounded-md md:relative md:z-50 md:flex md:flex-col">
            <div class="w-full flex-grow">
                <h2 class="text-center font-bold uppercase mb-4">{title}</h2>
                <h3 class="text-center font-bold text-3xl md:text-4xl mb-2">₦{ millify(price) }<span class="text-lg"></span></h3>
                
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
                <PaystackProperty />
            </div>
        </div>

      <div className="group relative">
        <div className="animate-tilt rotate-60 absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-50 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
          <Image
              src="/static/pos.jpg"
              alt="pos"
              width={500}
              height={500}
              className="mt-6 p-6 rounded-lg shadow-xl sm:mt-8 sm:w-full sm:h-64 sm:object-cover  object-center"
              placeholder="blur"
              blurDataURL="/static/images/SVG-placeholder.png"
          />
      </div>
    </div>
  )
}

export default Payment
