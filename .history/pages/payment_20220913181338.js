import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import AuthSessionStatus from '../components/AuthSessionStatus';
import AuthValidationErrors from '../components/AuthValidationErrors';
import LayoutWrapper from './../components/layouts/LayoutWrapper';
import { PageSEO } from './../utils/SEO';
import Payment from './../components/steps/Payment';

const Payment = () => {

    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

  return (
    <LayoutWrapper>
        <PageSEO title="Payment" description="make Payment" />
        <div className="w-full sm:pt-4 mt-4">
            <AuthSessionStatus className="mb-4" status={status} />
            <AuthValidationErrors errors={errors}/>
        </div>
        <div className=' mt-10 sm:mt-0'>
            <Payment />

        </div>
    </LayoutWrapper>
  );
};

export default Payment;


