import React, { useEffect, useState } from 'react'
import DisableTwoFA from '../components/disable-two-fa'
import EnableTwoFA from '../components/enable-two-fa'
import client from '../lib/client'

const TwoFactorInfo = () => {

    const [twoFactorAuthEnabled, setTwoFactorAuthEnabled] = useState(false)
    const [user, setUser]                                 = useState(false)
    const enableTwoFA                                     = () => setTwoFactorAuthEnabled(true)
    const disableTwoFA                                    = () => setTwoFactorAuthEnabled(false)

    useEffect(() => {
        client().get('/auth/profile').then(result => {
            setUser(result.data.data)
            setTwoFactorAuthEnabled(!! result.data?.data?.has2FA)
        })
    }, [])

  return (
    <div className="flex flex-wrap justify-around space-x-4 items-center">
            <div className="flex-3">
                <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Two-Factor Authentication
                    </h3>
                </div>
            </div>

            <div className="flex-1 max-w-5xl">
                <div>
                    <span className="ml-1 font-bold">
                        {twoFactorAuthEnabled
                            ? <span className="text-green-500 p-2 rouded-lg">Enabled</span>
                            : <span className="text-red-500 p-2 rouded-lg">Disabled</span>
                        }
                    </span>
                </div>
                <div className="flex justify-around items-center">
                    {twoFactorAuthEnabled
                        ? <DisableTwoFA onSuccess={disableTwoFA} />
                        : <EnableTwoFA onSuccess={enableTwoFA} />}
                </div>
            </div>
            
        </div>
  )
}

export default TwoFactorInfo
