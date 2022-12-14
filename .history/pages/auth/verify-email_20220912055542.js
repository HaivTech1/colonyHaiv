import ApplicationLogo from '../components/ApplicationLogo'
import AuthCard from '../components/AuthCard'
import Button from '../components/Form/Button'
import GuestLayout from '../components/Layouts/GuestLayout'
import Link from 'next/link'
import { useAuth } from '../hooks/auth'
import { useState } from 'react'

const VerifyEmail = () => {
    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
    })

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
         <Button
             onClick={() => resendEmailVerification({ setStatus })}>
             Resend Verification Email
         </Button>

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
