import React from 'react'
import TextInput from '../components/form/TextInput'
import Modal from '../components/modal'

const ConfirmPassModal = ({confirming, setPassword, password, setConfirming, onConfirm}) => {
    return (
        <Modal isOpen={confirming}>
            <div>
                Confirm Password: {" "}
                <TextInput type="password" name="password" value={password}
                       onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="flex justify-between pt-10">
                <button onClick={() => setConfirming(false)}>Cancel</button>
                <button className="button"  onClick={onConfirm}>Confirm</button>
            </div>
        </Modal>
    )
}

export default ConfirmPassModal
