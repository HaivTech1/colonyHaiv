import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AuthSessionStatus from '../components/AuthSessionStatus';
import AuthValidationErrors from '../components/AuthValidationErrors';
import LayoutWrapper from './../components/layouts/LayoutWrapper';
import { PageSEO } from './../utils/SEO';
import client from '..//util/client';
import { useAdmin } from '../lib/provider/context';
import { useAuth } from '../utils/useAuth';

const Payment = () => {

  const { changePassword, changeDetails } = useAuth({
      middleware: 'auth',
      redirectIfAuthenticated: '/auth/login',
  });

  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)
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

  return (
    <LayoutWrapper>
        <PageSEO title="Payment" description="make Payment" />
        <div className="w-full sm:pt-4 mt-4">
            <AuthSessionStatus className="mb-4" status={status} />
            <AuthValidationErrors errors={errors}/>
        </div>
        <div className='flex flex-wrap justify-around mt-10 sm:mt-0'>
            <div className="flex-3">

            </div>

        </div>
    </LayoutWrapper>
  );
};

export default Payment;


