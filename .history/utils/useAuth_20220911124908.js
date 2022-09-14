import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import toast from 'react-hot-toast'
import { useCookies } from 'react-cookie'

import client from '../lib/client'


export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    
    const [processing, setProcessing] = useState(false)
    const [cookie, setCookie] = useCookies(['app_accessToken'])


    // const {
    //     data: user,
    //     error,
    //     mutate,
    // } = useSWR('/auth/profile', () =>
    //     client
    //         .get('/auth/profile')
    //         .then(res => res.data)
    //         .catch(error => {
    //             if (error.response.status !== 409) throw error
    //             router.push('/verify-email')
    //             toast.error(error);
    //         }),
    // )

    const csrf = () => client.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }) => {
        let toastId
        toastId = toast.loading('Redirecting...')
        setProcessing(true)
        await csrf()

        setErrors([])
        try {
            client
                .post('/register', props)
                .then(() => mutate())
                .catch(error => {
                    if (error.response.status !== 422) throw error

                    setErrors(Object.values(error.response.data.errors).flat())
                })
            toast.success('Welcome to Colony! It a  pleasure having you here', {
                id: toastId,
            })
        } catch (e) {
            console.log(e)
            toast.error('Unable to register', { id: toastId })
            setProcessing(false)
        }
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        setProcessing(true)
        setErrors('')
        setStatus(null)
        try {
            client
                .post('/auth/login', props)
                .then((response) => {
                        console.log(response.data.expires_in)
                        setStatus(response.data.message)
                        toast.success(response.data.message);
                        setCookie('app_accessToken', response.data._token, {
                            path: '/',
                            maxAge: response.data.expires_in,
                            sameSite: true,
                          })

                        // setInterval(() => {
                        //     router.push('/')
                        // }, 3000)
                    }
                 )
                .catch(error => {
                    console.log(error.response.data.message)
                    // if (error.response.status !== 422) toast.error(error.response.data.message);
                    setErrors(error.response.data.message)
                })
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
            setProcessing(false)
        }
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        let toastId
        toastId = toast.loading('Redirecting...')
        setProcessing(true)
        await csrf()

        setErrors([])
        setStatus(null)
        try {
            client
                .post('/forgot-password', { email })
                .then(response => setStatus(response.data.status))
                .catch(error => {
                    if (error.response.status !== 422) throw error

                    setErrors(Object.values(error.response.data.errors).flat())
                    toast.error(
                        Object.values(error.response.data.errors).flat(),
                        {
                            id: toastId,
                        },
                    )
                })
        } catch (e) {
            console.log(e)
            toast.error(Object.values(e.response.data.errors).flat(), {
                id: toastId,
            })
            setProcessing(false)
        }
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        client
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/auth/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        client
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        let toastId
        toastId = toast.loading('Logging you out...')
        setProcessing(true)

        if (!error) {
            try {
                await client.post('/logout').then(() => mutate())
                toast.success(
                    'Logged out successful! We wish to see you back soon',
                    { id: toastId },
                )
            } catch (e) {
                console.log(e)
                toast.error('Unable to logout of account', { id: toastId })
                setProcessing(false)
            }
        }

        window.location.pathname = '/auth/login'
    }

    // useEffect(() => {
    //     if (middleware === 'guest' && redirectIfAuthenticated && user)
    //         router.push(redirectIfAuthenticated)
    //     if (middleware === 'auth' && error) logout()
    // }, [user, error])

    return {
        // user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
