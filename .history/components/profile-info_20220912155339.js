import React, {useEffect, useState} from 'react'
import client from '../lib/client'

const ProfileInfo = ({user}) => {
    const [fields, setFields] = useState({name: '', email: ''})
    const updateFields        = e => {
        e.persist()

        setFields(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const save = () => {
        client().put('/user/profile-information', fields).then(() => {
            alert('Profile Info Updated')
        }).catch(({errors, status}) => {
            alert(errors[0])
        })
    }

    useEffect(() => {
        if (user) {
            setFields({name: user.name, email: user.email})
        }
    }, [user])

    return (
        <div className="">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Personal Information
                    </h3>
                </div>
            </div>

            <div className="">

            <div onSubmit={submitForm}>
            <p className="mb-4 text-center">Please login to your account</p>
  
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
                    <LoaderIcon/>
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
              <div className="flex items-center justify-between">
                <div className="flex items-end justify-end">
                  <Link href="/auth/register" className="mb-0 mr-2">
                    If you dont have an account? Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>

            </div>
            
        </div>
    )
}

export default ProfileInfo
