import React from 'react'
import DisableTwoFA from '../components/disable-two-fa'
import EnableTwoFA from '../components/enable-two-fa'

const TwoFactorInfo = () => {
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
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                        <span className="ml-1 font-bold">
                                            {twoFactorAuthEnabled
                                                ? <span className="text-green-500">Enabled</span>
                                                : <span className="text-red-500">Disabled</span>}
                                        </span>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            {twoFactorAuthEnabled
                                ? <DisableTwoFA onSuccess={disableTwoFA} />
                                : <EnableTwoFA onSuccess={enableTwoFA} />}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
  )
}

export default TwoFactorInfo
