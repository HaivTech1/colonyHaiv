import React, {useEffect, useState} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import LayoutWrapper from '../components/layouts/LayoutWrapper'
import { PageSEO } from '../utils/SEO'
import { useAuth } from '../utils/useAuth'
import { useAdmin } from '../lib/provider/context'
import ProfileInfo from '../components/profile-info'
import PasswordInfo from '../components/password-info'
import AuthSessionStatus from '../components/AuthSessionStatus'
import AuthValidationErrors from '../components/AuthValidationErrors'

const Account = () => {

    const { changePassword, changeDetails } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/auth/login',
    });

    const { user } = useAdmin();

    const router = useRouter()
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
          }
    }, [router.query.reset, errors.length])

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

            <div className="flex-1 flex-grow">
                <div className="">
                    <ProfileInfo user={user} changeDetails={changeDetails} />
                </div>

                <div className="mt-8">
                    <PasswordInfo changePassword={changePassword} />
                </div>
            </div>
        </div>
    </LayoutWrapper>
  );
};

export default Account;
