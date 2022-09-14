import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import TextInput from '../components/form/TextInput'
import Label from '../components/form/Label'
import AuthSessionStatus from '../components/AuthSessionStatus'
import AuthValidationErrors from '../components/AuthValidationErrors'

const ProfileInfo = ({user, changeDetails}) => {
    const router = useRouter()
    const [fields, setFields] = useState({name: '', email: ''})
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const updateFields = e => {
        e.persist();
        setFields(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const save = () => {
        changeDetails({fields, setErrors, setStatus} );
    }

    useEffect(() => {
        if (user) {
            setFields({name: user.name, email: user.email})
        }
    }, [user])

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
          }
    }, [router.query.reset, errors.length])

    return (
        <>
        <div className="w-full sm:pt-4 mt-4">
            <AuthSessionStatus className="mb-4" status={status} />
            <AuthValidationErrors errors={errors}/>
        </div>
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
                    <Label> Name </Label>
                    <TextInput
                        id="name"
                        name="name"  
                        value={fields.name}
                        onChange={updateFields}
                        type="text"
                    />
                </div>

                <div className="mb-4">
                    <Label> Email </Label>   
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
                        onClick={save}
                        className="button"
                        type="submit"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light">
                        Save
                    </button>
                </div>
            </div>
            
        </div>
        </>
    )
}

export default ProfileInfo
