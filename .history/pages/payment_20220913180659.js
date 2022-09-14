import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import AuthSessionStatus from '../components/AuthSessionStatus';
import AuthValidationErrors from '../components/AuthValidationErrors';
import LayoutWrapper from './../components/layouts/LayoutWrapper';

const Payment = () => {

    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

  return (
    <LayoutWrapper>
        <PageSEO title="Account" description="users account" />
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


