import React, {useEffect, useState} from 'react'
import client from '../lib/client'
import TextInput from '../components/form/TextInput'

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
        <div className="flex flex-wrap justify-around space-x-4 items-center">
            <div className="flex-3">
                <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Personal Information
                    </h3>
                </div>
            </div>

            <div className="flex-1 max-w-5xl">
                <div className="mb-4">
                    <TextInput
                        id="name"
                        name="name"  
                        value={fields.name}
                        onChange={updateFields}
                        type="text"
                    />
                </div>

                <div className="mb-4">
                    <TextInput
                        id="email"
                        name="email" 
                        value={fields.email}
                        onChange={updateFields}
                        type="email"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                    className="button"
                    type="submit"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light">
                        Save
                    </button>
                </div>
            </div>
            
        </div>
    )
}

export default ProfileInfo
