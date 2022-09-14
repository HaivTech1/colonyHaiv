import Image from 'next/image';
import Link from 'next/link';
import LayoutWrapper from '../components/layouts/LayoutWrapper'
import { PageSEO } from '../utils/SEO'
import { useAuth } from '../utils/useAuth'
import { useAdmin } from '../lib/provider/context'


const Account = () => {

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/auth/login',
    });

    const { user } = useAdmin();

  return (
    <LayoutWrapper>
        <PageSEO title="Account" description="users account" />
        <div>
            <div className="mt-10 sm:mt-0">
                <ProfileInfo user={user} />
            </div>
        </div>
    </LayoutWrapper>
  );
};

export default Account;
