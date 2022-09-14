import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../utils/useAuth'
import AuthSessionStatus from '../../components/AuthSessionStatus'
import AuthValidationErrors from '../../components/AuthValidationErrors'
import Link from 'next/link'
import { useAuth } from '../hooks/auth'

const VerifyEmail = () => {
    const router = useRouter()

    const { resendEmailVerification  } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    });

    const [status, setStatus] = useState(null)

    return (
        <>
        <div className="mb-4 text-sm text-gray-600">
            <p> Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you did not receive the email, we will gladly send you another.</p>
        </div>

        {status === 'verification-link-sent' && (
            <div className="mb-4 font-medium text-sm text-green-600">
                <p>A new verification link has been sent to the email
                address you provided during registration.</p>
            </div>
        )}

     <div className="mt-4 flex items-center justify-between">
         <button
             onClick={() => resendEmailVerification({ setStatus })}>
             Resend Verification Email
         </button>

         <button
             type="button"
             className="underline text-sm text-gray-600 hover:text-gray-900"
             onClick={logout}>
             Logout
         </button>
     </div>
        </>
    )
}

export default VerifyEmail
