import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import millify from 'millify';
import { usePaystackPayment } from 'react-paystack';
import AuthSessionStatus from '../components/AuthSessionStatus';
import AuthValidationErrors from '../components/AuthValidationErrors';
import Loader from '../components/Loader';
import client from '../lib/client';
import { useAdmin } from '../lib/provider/context';
import LayoutWrapper from './../components/layouts/LayoutWrapper';
import { PageSEO } from './../utils/SEO';
import Status from '../components/Status';
import { FaCcMastercard } from 'react-icons/fa';

const Payment = () => {

  const { user, furnish, amenities } = useAdmin()
  const [isLoading, setIsLoading] = useState(false)
  const [bookings, setBookings] = useState([])

  useEffect(() => {
      fetchBookings()
  },[])

  const fetchBookings = async () => {
      try {
        setIsLoading(true)
        await client().get(`/auth/latest/bookings`).then((response) => {
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
    <LayoutWrapper>
        <PageSEO title="Payment" description="make Payment" />
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center mt-5 sm:mt-10">
              

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
    </LayoutWrapper>
  );
};

export default Payment;


