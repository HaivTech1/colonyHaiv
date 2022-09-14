import React, {useState} from 'react'
import client from '../lib/client'
import ConfirmPassModal from '@components/confirm-pass-modal'

const ConfirmPass = ({confirming, setConfirming, onFail, onSuccess}) => {
    const [password, setPassword] = useState('')

    const confirm = () => {
        client().post('/user/confirm-password', {password}).then(() => {
            onSuccess()
        }).catch(({error, status}) => {
            console.log(error, status)

            onFail()
        })
    }

    return (
        <ConfirmPassModal
            setConfirming={setConfirming}
            confirming={confirming}
            password={password}
            setPassword={setPassword}
            onConfirm={confirm}
        />
    )
}

export default ConfirmPass
