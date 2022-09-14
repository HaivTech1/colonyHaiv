import React, {useState} from 'react'
import ConfirmPass from '../components/confirm-pass'
import client from '../utils/client'

const DisableTwoFA = ({onSuccess}) => {
    const [confirming, setConfirming] = useState(false)

    const disable = () => {
        client().delete('/user/two-factor-authentication').then(() => {
            onSuccess()
        }).catch(({status}) => {
            if (status === 423) {
                setConfirming(true)
            }
        })
    }

    return (
        <div>
            <button type='button' className="bg-red-400 text-white" onClick={disable}>Disable</button>
            {confirming ? (
                <ConfirmPass
                    confirming={true}
                    setConfirming={setConfirming}
                    onFail={() => alert('Failed to confirm password')}
                    onSuccess={disable}
                />
            ) : null}
        </div>
    )
}

export default DisableTwoFA
