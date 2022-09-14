import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image';
import { usePaystackPayment } from 'react-paystack';
import { FaCcMastercard } from "react-icons/fa";
import { useAdmin } from '../../lib/provider/context';

const Payment = ({property}) => {

  const { image, slug, title, purpose, address, price, specifications, excerpt, relationships } = property
  const { user, furnish, amenities } = useAdmin()

  console.log(user.email);

  useEffect(() => {

  })

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
    <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center mt-5 sm:mt-10">
      <div>
        <PaystackProperty />
      </div>

      <div className="group relative">
        <div className="animate-tilt rotate-60 absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-50 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
          <Image
              src="/static/pos.jpg"
              alt="pos"
              width={500}
              height={500}
              className="mt-6 p-6 rounded-lg shadow-xl sm:mt-8 sm:w-full sm:h-64 sm:object-cover  object-center"
              placeholder="blur"
              blurDataURL="/static/images/SVG-placeholder.png"
          />
      </div>
    </div>
  )
}

export default Payment
