import { CheckCircleIcon } from '@heroicons/react/solid'
import React from 'react'

const Modal = ({isOpen, title, message, children}) => {
    if (! isOpen) {
        return null
    }

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-2xl">
                    <div
                        className="text-center border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none px-4 pt-8 pb-5">
                        <div className="mt-5">
                            <h3 className="font-bold text-lg mb-2">{title}</h3>
                        </div>
                        <div className="flex justify-center items-center animate-bounce mb-4">
                                <CheckCircleIcon className="w-10 h-10 text-green-500" />
                        </div>
                        <p className="text-lg font-thin">{message}</p>
                        {children}
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black" />
        </>
    )
}

export default Modal
