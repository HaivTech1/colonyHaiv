import React from 'react'
import { usePaystackPayment } from 'react-paystack';
import { FaCcMastercard } from "react-icons/fa";
import { useAdmin } from '../../lib/provider/context';

const Payment = ({property}) => {

  const { image, slug, title, purpose, address, price, specifications, excerpt, relationships } = property
  const { user, furnish, amenities } = useAdmin()

  console.log(user.email);

  const config = {
    reference: (new Date()).getTime(),
    email:  user.email,
    amount: price,
    publicKey: 'pk_test_37c3e7ef0bd3d61bb23906ed4e92de33d759fb01',
};

 // you can call this function anything
 const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed')
}

const PaystackProperty = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div className='flex justify-center'>
          <button className="button" onClick={() => {
              initializePayment(onSuccess, onClose)
          }}>
            <span className="flex justify-center items-center space-x-2">
            <FaCcMastercard className="w-7 h-7 "/>
            <span>Pay With Paystack</span>
            </span>
          </button>
      </div>
    );
};

  return (
    <div>
      <div>
        <PaystackProperty />
      </div>
    </div>
  )
}

export default Payment