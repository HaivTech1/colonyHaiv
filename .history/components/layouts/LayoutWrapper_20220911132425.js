import Image from 'next/image'

import siteMetadata from '../../utils/siteMetadata'
import headerNavLinks from '../../utils/headerNavLinks'
import Link from '../Link'
import SectionContainer from './SectionContainer'
import { navigation } from '../../utils/nav'
import CommandPalette from '../CommandPalette'
import ThemeSwitch from '../ThemeSwitch'
import Footer from '../Footer'
import { useAdmin } from '../../lib/provider/context'
import { useAuth } from '../../utils/useAuth'

const LayoutWrapper = ({ children }) => {

  const {user} = useAdmin();
  const {logout} = useAuth();

  const handleLogout = () => {
    logout();
  }

  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-1 text-primary-500 font-bold text-sm">
                  <Image src="/logo.png" alt="logo" width="100" height="25"  placeholder="blur"
                  blurDataURL="/static/images/SVG-placeholder.png" />
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="link-underline rounded py-1 px-2 text-gray-900 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 sm:py-2 sm:px-3"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <CommandPalette navigation={navigation} />
            <ThemeSwitch />

            <div className="ml-2">
            {user ? (
             
                <div className="button-outline">
                  <button onClick={handleLogout()}>Logout</button>
                </div>
              
            ) : (
              <div className="button-outline">
                <Link href="/auth/login">Login</Link>
              </div>
            )}
          </div>
          </div>
        </header>

        <main className="mb-auto">{children}</main>

        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
