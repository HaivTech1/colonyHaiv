import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../utils/useAuth'
import AuthSessionStatus from '../../components/AuthSessionStatus'
import AuthValidationErrors from '../../components/AuthValidationErrors'
import Link from 'next/link'

const VerifyEmail = () => {
    const router = useRouter()

    const { logout, resendEmailVerification  } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    });

    const [status, setStatus] = useState(null)

    return (
        <>
        
        </>
    )
}

export default VerifyEmail
