import Cookies from 'js-cookie'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import toast, { LoaderIcon } from 'react-hot-toast'
import AuthBase from '../../components/AuthBase'
import AuthCard from '../../components/form/AuthCard'
import TextInput from '../../components/form/TextInput'
import redirectTo from '../../lib/redirectTo'
import { Register } from '../../lib/user'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    if (!name.trim() || name.length < 5) return toast.error('Name is missing')
    if (!email) return toast.error('Email is missing')
    if (!password.trim()) return toast.error('Password is missing')

    setIsLoading(true)

    const res = await Register({ name, email, password })
    console.log(res)

    if (res.success) {
      console.log(res.user)
      const user = res.user
      toast.success('Account Created successfully! you will be redirect shortly')
      Cookies.set('userId', user.id, {
        expires: 26400,
        sameSite: 'lax',
      })

      setIsLoading(false)
      setInterval(() => {
        redirectTo('/auth/verification')
      }, 2000)
    }
  }

  return (
    <AuthCard>
      <div className="md:mx-6 md:p-12">
        <div className="text-center">
          <Image
            className="mx-auto w-48"
            src="/static/images/logo.png"
            alt="logo"
            width={100}
            height={100}
          />
          <h4 className="mt-1 mb-12 pb-1 text-xl font-semibold">The Scribes</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <p className="mb-4">Create an account with us</p>
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
                <Link href="/auth/signin" className="mb-0 mr-2">
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
