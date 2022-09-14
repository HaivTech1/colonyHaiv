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
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Personal Information
                    </h3>
                </div>
            </div>
            
        </div>
    )
}

export default ProfileInfo
