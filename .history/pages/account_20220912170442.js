import Image from 'next/image';
import Link from 'next/link';
import LayoutWrapper from '../components/layouts/LayoutWrapper'
import { PageSEO } from '../utils/SEO'
import { useAuth } from '../utils/useAuth'
import { useAdmin } from '../lib/provider/context'
import ProfileInfo from '../components/profile-info'
import PasswordInfo from '../components/password-info'


const Account = () => {

    const { changePassword, changeDetails } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/auth/login',
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
                    <ProfileInfo user={user} changeDetails={changeDetails} />
                </div>

                <div className="mt-8">
                    <PasswordInfo changePassword={changePassword} />
                </div>
            </div>
        </div>
    </LayoutWrapper>
  );
};

export default Account;
