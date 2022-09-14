import Link from 'next/link'
import React from 'react'
import CommandPalette from './CommandPalette'
import ThemeSwitch from './ThemeSwitch'
import Image from 'next/image'
import { navigation } from '../utils/nav'
import { useAdmin } from '../lib/provider/context'
import DropMenu from './DropMenu'

const Navigation = () => {
  const { user } = useAdmin()

  return (
    <div className="sticky top-0 z-20 py-2 bg-white md:py-6 md:mb-6 dark:bg-black">
      <div className="container px-4 mx-auto lg:max-w-4xl flex items-center justify-between">
        <Link href="/">
          <a
            className={
              'font-medium tracking-wider transition-colors text-gray-900 hover:text-sky-500 uppercase dark:text-white'
            }>
            <Image src="/logo.svg" width={300} height={70} alt="logo" />
          </a>
        </Link>
        <div className="flex items-center text-base leading-5">
          <CommandPalette navigation={navigation} />
          <ThemeSwitch />
          <DropMenu />
        </div>
      </div>
    </div>
  )
}

export default Navigation
