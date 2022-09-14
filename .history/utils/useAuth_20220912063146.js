import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import toast from 'react-hot-toast'
import { useCookies } from 'react-cookie'
import Cookie from 'js-cookie'
import client from '../lib/client'


export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    
    const [processing, setProcessing] = useState(false)
    const [cookie, setCookie] = useCookies(['app_accessToken'])


    const {
        data: user,
        error,
        mutate,
    } = useSWR('/auth/profile', () =>
        client
            .get('/auth/profile')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
                router.push('/verify-email')
                toast.error(error);
            }),
    )

    const register = async ({ setErrors, setStatus, ...props }) => {
        setProcessing(true)
        setErrors([])
        setStatus(null)
        try {
            client
                .post('/auth/register', props)
                .then((response) => {
                    setStatus(response.data.message)
                    setInterval(() => {
                        window.location.pathname = response.data.redirect
                    }, 2000)
                })
                .catch(error => {
                    console.log(error.response.data.message)
                    if (error.response.status !== 422) throw error
                    setErrors(Object.values(error.response.data.message).flat())
                })
        } catch (e) {
            console.log(e)
            setProcessing(false)
        }
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        setProcessing(true)
        setErrors([])
        setStatus(null)
        try {
            client
                .post('/auth/login', props)
                .then((response) => {
                        setStatus(response.data.message)
                        setCookie('app_accessToken', response.data._token, {
                            path: '/',
                            maxAge: response.data.expires_in,
                            sameSite: true,
                        })

                        setInterval(() => {
                            window.location.pathname = '/'
                        }, 2000)
                }
                )
                .catch(error => {
                    console.log(error.response.data.message)
                    if (error.response.status !== 422) throw error
                    setErrors(Object.values(error.response.data.message).flat())
                })
        } catch (e) {
            console.log(e)
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
            .then(response => setStatus(response.data.message))
            .catch((error) => {
                setErrors(error.response.data.message)
        })
    }

    const logout = async () => {
        Cookie.remove('app_accessToken')
        window.location.pathname = '/auth/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
        if (middleware === 'verify' && error)  router.push(redirectIfAuthenticated)
        
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
