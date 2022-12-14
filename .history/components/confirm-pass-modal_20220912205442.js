import React from 'react'
import TextInput from './components/form/TextInput'
import Button from './components/button'
import Modal from './components/modal'

const ConfirmPassModal = ({confirming, setPassword, password, setConfirming, onConfirm}) => {
    return (
        <Modal isOpen={confirming}>
            <div>
                Confirm Password: {" "}
                <TextInput type="password" name="password" value={password}
                       onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="flex justify-between pt-10">
                <Button onClick={() => setConfirming(false)}>Cancel</Button>
                <Button className="bg-green-400 text-white" onClick={onConfirm}>Confirm</Button>
            </div>
        </Modal>
    )
}

export default ConfirmPassModal
