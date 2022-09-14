import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Link from 'next/link'
import Image from 'next/image'
import toast, { LoaderIcon } from 'react-hot-toast'
import AuthBase from '../../components/AuthBase'
import AuthCard from '../../components/form/AuthCard'
import TextInput from '../../components/form/TextInput'
import { useAuth } from '../../utils/useAuth'

const Register = () => {
  const router = useRouter()
  const { register } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (router.query.reset?.length > 0 && errors.length === 0) {
        setStatus(atob(router.query.reset))
    } else {
        setStatus(null)
      }
  }, [router.query.reset, errors.length])

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    register({ name, email, password, setErrors, setStatus })
    setIsLoading(false)
  }

  return (
    <AuthCard>
      <div className="md:mx-6 md:p-12">
        <div className="text-center mb-4">
          <Image
            className="mx-auto w-48"
            src="/logo.png"
            alt="logo"
            width={100}
            height={24}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <p className="mb-4 text-center">Create an account with us</p>
          <div className="mb-4">
            <TextInput
              value={name}
              type="text"
              placeholder="Name"
              onChange={event => setName(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <TextInput
              value={email}
              type="email"
              placeholder="email"
              onChange={event => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <TextInput
              value={password}
              type="password"
              placeholder="Password"
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          <div className="mb-12 pt-1 pb-1 text-center">
            <button
              type="submit"
              className="big-background mb-3 inline-block w-full rounded px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light">
              {isLoading ? (
                <div className="flex justify-center">
                  <LoaderIcon />
                </div>
              ) : (
                'Create account'
              )}
            </button>
            <div className="flex items-center justify-between">
              <div className="flex items-end justify-end">
                <Link href="/auth/login" className="mb-0 mr-2">
                  Do you have an account? Sign in
                </Link>
              </div>
            </div>
          </div>
          <AuthBase />
        </form>
      </div>
    </AuthCard>
  )
}

export default Register
