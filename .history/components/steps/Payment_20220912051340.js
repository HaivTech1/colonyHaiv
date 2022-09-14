import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image';
import Swal from 'sweetalert2'
import { usePaystackPayment } from 'react-paystack';
import { FaCcMastercard } from "react-icons/fa";
import { useAdmin } from '../../lib/provider/context';
import client from '../../lib/client';
import Loader from '../Loader';
import millify from 'millify';
import Status from '../Status';

const Payment = () => {

  const { user } = useAdmin()
  const [isLoading, setIsLoading] = useState(false)
  const [bookings, setBookings] = useState([])

  useEffect(() => {
      fetchBookings()
  },[])

  const fetchBookings = async () => {
      try {
        setIsLoading(true)
        await client.get(`/auth/latest/bookings`).then((response) => {
          console.log(response.data.booking)
            setBookings(response.data.booking)
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
    email:  bookings?.relationships.author.email,
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

    const initializePayment = async() => {

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

      usePaystackPayment(config);
    } 

    return (
      <div className='flex justify-center'>
          <button  onClick={() => {
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
            <div className="w-full flex-grow">
                <h1 className="text-center text-lg font-bold uppercase mb-2">Your Booking</h1>
                <h2 className="text-center font-bold mb-4">{bookings?.id}</h2>

                <div className="flex justify-center">
                  <ul class="text-sm mb-8">
                      <li class="leading-tight"><Status name={bookings?.relationships.property.title} /> </li>
                      <li class="leading-tight"><Status name={bookings?.paymentMethod} /></li>
                  </ul>
                </div>

                <h3 className="text-center font-bold text-3xl md:text-4xl mb-2">₦{ millify(bookings?.total) }
                <span className="text-lg">/grand total</span></h3>
            </div>
            <div className="w-full flex justify-center">
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
