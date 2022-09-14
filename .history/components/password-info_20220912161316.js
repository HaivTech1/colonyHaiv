import React, {useState} from 'react'
import client from '../lib/client'
import TextInput from '../components/form/TextInput'

const PasswordInfo = () => {
    const [fields, setFields] = useState({current_password: '', password: '', password_confirmation: ''})
    const updateFields        = e => {
        e.persist()

        setFields(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const updatePassword = () => {
        client().put('/user/password', fields).then(() => {
            alert('Password has been updated')
        }).catch(({errors}) => {
            alert(errors[0])
        })
    }

    return (
        <div className="flex flex-wrap justify-around space-x-4 items-center">
            <div className="flex-3">
                <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Password
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
                        id="passwordConfirmation"
                        name="password_confirmation"
                        type="password"
                        value={fields.password_confirmation}
                        onChange={updateFields}
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
    )
}

export default PasswordInfo
