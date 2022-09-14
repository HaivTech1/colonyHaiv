import React, {useEffect, useState} from 'react'
import client from '../lib/client'
import TextInput from './form/components/form/TextInput'

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
            </div>
            
        </div>
    )
}

export default ProfileInfo
