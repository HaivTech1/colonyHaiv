import React, {useState} from 'react'
import Modal from '../components/modal'
import ConfirmPass from '../components/confirm-pass'
import client from '../lib/client'

const EnableTwoFa = ({onSuccess}) => {
    const [confirming, setConfirming]       = useState(false)
    const [twoFAEnabled, setTwoFAEnabled]   = useState(false)
    const [qrCode, setQrCode]               = useState('')
    const [recoveryCodes, setRecoveryCodes] = useState([])

    const enable = () => {
        client().post('/user/two-factor-authentication').then(() => {
            client().get('/user/two-factor-qr-code').then(({data}) => {
                setQrCode(data.svg)
            })

            client().get('/user/two-factor-recovery-codes').then(({data}) => {
                setRecoveryCodes(data)
            })

            setConfirming(false)
            setTwoFAEnabled(true)
        }).catch(({status}) => {
            if (status === 423) {
                setConfirming(true)
            }
        })
    }

    return (
        <div>
            <Button className="bg-green-400 text-white" onClick={enable}>Enable</Button>
            <Modal isOpen={twoFAEnabled}>
                <div>
                    {qrCode && <span dangerouslySetInnerHTML={{__html: qrCode}} />}
                </div>
                <div className="mt-5">
                    <h3 className="font-bold text-lg mb-2">Recovery Codes</h3>
                    <div className="gap-2">
                        {recoveryCodes.map(recoveryCode => <div key={recoveryCode}>{recoveryCode}</div>)}
                    </div>
                </div>
                <div className="flex pt-10 mx-auto">
                    <button type="button" onClick={() => {
                        // close modal
                        setTwoFAEnabled(false)

                        // call success
                        onSuccess()
                    }}>Close</button>
                </div>
            </Modal>
            {confirming ? (
                <ConfirmPass
                    confirming={true}
                    setConfirming={setConfirming}
                    onSuccess={enable}
                    onFail={() => alert('Failed to confirm password')}
                />
            ) : null}
        </div>
    )
}

export default EnableTwoFa
