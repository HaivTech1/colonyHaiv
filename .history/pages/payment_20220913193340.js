import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import millify from 'millify';
import { usePaystackPayment } from 'react-paystack';
import Loader from '../components/Loader';
import client from '../lib/client';
import { useAdmin } from '../lib/provider/context';
import LayoutWrapper from './../components/layouts/LayoutWrapper';
import { PageSEO } from './../utils/SEO';
import Status from '../components/Status';
import { FaCcMastercard } from 'react-icons/fa';
import { useAuth } from '../utils/useAuth';
import Modal from './../components/modal';
import { CheckCircleIcon } from '@heroicons/react/solid';

const Payment = () => {

  const {  } = useAuth({
      middleware: 'auth',
      redirectIfAuthenticated: '/auth/login',
  });

  const { user } = useAdmin()
  const [isLoading, setIsLoading] = useState(false)
  const [bookings, setBookings] = useState([])
  const [paymentSuccess, setPaymentSuccess]   = useState(true)

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
      if(reference.status === "success"){
        toast.success(reference.message);

        setPaymentSuccess(true)
      }
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const PaystackHookExample  = () => {

      const initializePayment = usePaystackPayment(config);

      return (
        <div className='flex justify-center'>
            <button  onClick={() => {
              initializePayment(onSuccess, onClose)
            }} className="button">
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
              
            <Modal isOpen={paymentSuccess}>
                <div className="mt-5">
                    <h3 className="font-bold text-lg mb-2">Payment Successful</h3>
                </div>
                <div className="flex justify-center items-center animate-ping">
                        <CheckCircleIcon className="w-10 h-10 text-green-500" />
                </div>
                <div className="flex pt-5 mx-auto">
                      <button type="button" className='button' onClick={() => {
                        setPaymentSuccess(false)
                    }}>Close</button>
                </div>
            </Modal>
            <div className="w-full  md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:-mx-3 md:my-3 rounded-md md:relative md:z-50 md:flex md:flex-col">
              <div className="w-full flex-grow">
                  <h1 className="text-center text-2xl font-bold uppercase mb-2">Booking Id</h1>
                  <h2 className="text-center font-bold text-lg mb-4">{bookings?.id}</h2>

                  

                  <h3 className="text-center font-bold text-3xl md:text-4xl mb-2">₦{ millify(bookings?.total) }
                  <span className="text-lg">/grand total</span></h3>
              </div>
              <div className="w-full flex justify-center mt-4">
                  <PaystackHookExample  />
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
    </LayoutWrapper>
  );
};

export default Payment;


