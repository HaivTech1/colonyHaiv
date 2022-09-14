import React, { useState } from 'react'
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
  
          
        </AuthCard>
        </>
    )
}

export default VerifyEmail
