import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import toast, { LoaderIcon } from 'react-hot-toast'
import AuthBase from '../../components/AuthBase'
import AuthCard from '../../components/form/AuthCard'
import TextInput from '../../components/form/TextInput'
import { PageSEO } from '../../utils/SEO'
import siteMetadata from '../../utils/siteMetadata'
import { useAuth } from '../../utils/useAuth'
import AuthSessionStatus from '../../components/AuthSessionStatus'
import AuthValidationErrors from '../../components/AuthValidationErrors'
import Loader from '../../components/Loader'


const Login = () => {
  const router = useRouter()

  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState('')
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

  const submitForm = async event => {
      setIsLoading(true);
      event.preventDefault()
      login({ email, password, setErrors, setStatus })
      setIsLoading(false);
  }

  if(isLoading){
    return (
      <Loader />
    )
  }

  return (
    <>
      <PageSEO title="Sign in into your account" description={siteMetadata.description} />
      <AuthCard>

          <AuthSessionStatus className="mb-4" status={status} />

          {/* Validation Errors */}
          <AuthValidationErrors
              className="mb-4"
              errors={errors}
          />

        <form onSubmit={submitForm}>
          <p className="mb-4">Please login to your account</p>

          <div className="mb-4">
            <TextInput
              value={email}
              type="email"
              placeholder="email"
              onChange={event => setEmail(event.target.value)}
              autoFocus
            />
          </div>

          <div className="mb-4">
            <TextInput
              value={password}
              type="password"
              placeholder="password"
              onChange={event => setPassword(event.target.value)}
            />
          </div>

          <div className="text-center pt-1 mb-12 pb-1">
            <button
              className="big-background inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
              type="submit"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light">
              {isLoading ? (
                <div className="flex justify-center">
                  <LoaderIcon />
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          <AuthBase />
        </form>
      </AuthCard>
    </>
  )
}

export default Login
