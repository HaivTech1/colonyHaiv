import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '../../utils/useAuth'
import AuthCard from '../../components/form/AuthCard'
import AuthSessionStatus from '../../components/AuthSessionStatus'
import AuthValidationErrors from '../../components/AuthValidationErrors'
import Link from 'next/link'
import { PageSEO } from '../../utils/SEO'
import siteMetadata from '../../utils/siteMetadata'

const VerifyEmail = () => {
    const router = useRouter()

    const { logout, resendEmailVerification  } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    });

    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    return (
        <>
        <PageSEO title="Verify your account" description={siteMetadata.description} />
        <AuthCard>
  
            <div className="text-center mb-4 cursor-pointer">
            <Link href="/">
                <Image
                    className="mx-auto w-48"
                    src="/logo.png"
                    alt="logo"
                    width={100}
                    height={24}
                />
            </Link>
          </div>
  
          <div className="w-full sm:pt-4">
              <AuthSessionStatus className="mb-4" status={status} />
              <AuthValidationErrors errors={errors}/>
          </div>
  
            <div className="mb-4 text-sm text-gray-600">
                <p> Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you did not receive the email, we will gladly send you another.</p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    <p>A new verification link has been sent to the email
                    address you provided during registration.</p>
                </div>
            )}

            <div className="mt-4 flex justify-center">
                <button className="button"
                    onClick={() => resendEmailVerification({ setStatus })}>
                    Resend Verification Email
                </button>
            </div>
        </AuthCard>
        </>
    )
}

export default VerifyEmail
