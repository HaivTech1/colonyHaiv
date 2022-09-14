import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import AuthSessionStatus from '../components/AuthSessionStatus';
import AuthValidationErrors from '../components/AuthValidationErrors';
import Loader from '../components/Loader';
import client from '../lib/client';
import { useAdmin } from '../lib/provider/context';
import LayoutWrapper from './../components/layouts/LayoutWrapper';
import { PageSEO } from './../utils/SEO';

const Payment = () => {

  const { user, furnish, amenities } = useAdmin()
  const [isLoading, setIsLoading] = useState(false)
  const [bookings, setBookings] = useState([])

  useEffect(() => {
      fetchBookings()
  })

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
        <div className="w-full sm:pt-4 mt-4">
            <AuthSessionStatus className="mb-4" status={status} />
            <AuthValidationErrors errors={errors}/>
        </div>
        <div className='flex flex-wrap justify-around mt-10 sm:mt-0'>
            

        </div>
    </LayoutWrapper>
  );
};

export default Payment;


