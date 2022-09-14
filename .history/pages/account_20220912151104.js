import Image from 'next/image';
import Link from 'next/link';
import LayoutWrapper from '../components/layouts/LayoutWrapper'
import { PageSEO } from '../utils/SEO'

const Account = () => {
  return (
    <LayoutWrapper>
        <PageSEO title="Properties" description="properties" />
    </LayoutWrapper>
  );
};

export default Account;
