import { useState } from 'react'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggle = prevState => ! prevState

  const toggleMobileMenu = () => {
      setIsMobileMenuOpen(toggle)
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
                  className="link-underline rounded py-1 px-2 text-primary-900 font-bold hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 sm:py-2 sm:px-3"
                >
                  {link.title}
                </Link>
              ))}
            </div>
              <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} border-b border-gray-700 md:hidden`}>
                <div className="px-2 py-3 space-y-1 sm:px-3">
                    <Link href="/">
                        <a className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-900 focus:outline-none focus:text-white focus:bg-indigo-700">
                            Dashboard
                        </a>
                    </Link>
                    <Link href="/">
                        <a
                            className="block px-3 py-2 rounded-md text-base font-medium text-indigo-300 hover:text-white hover:bg-indigo-700 focus:outline-none focus:text-white focus:bg-indigo-700">
                            Account Settings
                        </a>
                    </Link>
                    <a
                        className="block px-3 py-2 rounded-md text-base font-medium text-indigo-300 hover:text-white hover:bg-indigo-700 focus:outline-none focus:text-white focus:bg-indigo-700">
                        Sign Out
                    </a>
                </div>
            </div>
            <CommandPalette navigation={navigation} />
            <ThemeSwitch />

            <div className="ml-2">
            {user.name ? (
                <div className="button">
                  <button onClick={logout}>Logout</button>
                </div>
              
            ) : (
              <div className="flex justify-center items-center space-x-4">
                <Link href="/auth/login" className="font-bold text-lg text-primary-900 dark:text-white">Login</Link>
                <Link href="/auth/register" className="button">Get Started</Link>   
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
