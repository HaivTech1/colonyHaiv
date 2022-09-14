import Image from 'next/image';
import Link from 'next/link';

const Payment = () => {
  return (
    <LayoutWrapper>
        <PageSEO title="Account" description="users account" />
        <div className="w-full sm:pt-4 mt-4">
            <AuthSessionStatus className="mb-4" status={status} />
            <AuthValidationErrors errors={errors}/>
        </div>
        <div className='flex flex-wrap justify-around mt-10 sm:mt-0'>
            <div className="flex-3">

            </div>

        </div>
    </LayoutWrapper>
  );
};

export default Payment;


