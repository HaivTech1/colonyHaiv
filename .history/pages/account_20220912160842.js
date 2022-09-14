import Image from 'next/image';
import Link from 'next/link';
import LayoutWrapper from '../components/layouts/LayoutWrapper'
import { PageSEO } from '../utils/SEO'
import { useAuth } from '../utils/useAuth'
import { useAdmin } from '../lib/provider/context'
import ProfileInfo from '../components/profile-info'


const Account = () => {

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '',
    });

    const { user } = useAdmin();

  return (
    <LayoutWrapper>
        <PageSEO title="Account" description="users account" />
        <div className='flex flex-wrap justify-around mt-10 sm:mt-0'>
            <div className="flex-3">

            </div>

            <div className="flex-1 flex-grow">
                <div className="">
                    <ProfileInfo user={user} />
                </div>

                <div className="mt-8">
                    <ProfileInfo user={user} />
                </div>
            </div>
        </div>
    </LayoutWrapper>
  );
};

export default Account;
