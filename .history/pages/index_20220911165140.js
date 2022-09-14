import React from 'react';
import Typewriter from 'typewriter-effect'
import { FaCaretRight } from "react-icons/fa";
import Link from '../components/Link'

import LayoutWrapper from '../components/layouts/LayoutWrapper'
import { PageSEO } from '../utils/SEO';
import siteMetadata from '../utils/siteMetadata';
import Image from 'next/image';
import Label from '../components/form/Label';


export default function Home() {
  return (
    <LayoutWrapper>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="pt-6">
          <div className="transition ease-in-out flex justify-center">
            <Image
              src="/static/home.jpg"
              alt="colony"
              width={400}
              height={400}
              className="rounded-2xl sm:object-cover object-center"
              placeholder="blur"
              blurDataURL="/static/images/SVG-placeholder.png"
            />
          </div>

          <h1 className="pb-6 text-lg text-center font-extrabold leading-9 tracking-tight text-primary-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            <Typewriter
                options={{
                  strings: 'The future of living is here!',
                  autoStart: true,
                  loop: true,
                }}
              />
          </h1>
        </div>

        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 grid-rows-3 gap-8 py-12">
            <div className="my-2 grid items-start gap-8">
              <div className="group relative">
                <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-50 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                <Link href="/auth/login">
                  <span className="relative flex items-center divide-x divide-gray-600 rounded-lg bg-white px-7 py-4 leading-none dark:bg-black">
                    <span className="flex items-center space-x-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 -rotate-6 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                        />
                      </svg>
                      <span className="pr-6 text-gray-900 dark:text-gray-100">
                        Create an account!
                      </span>
                    </span>
                    <span className="pl-6 text-amber-400 transition duration-200 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                      Register&nbsp;&rarr;
                    </span>
                  </span>
                </Link>
              </div>
            </div>

            <div className="my-2 grid items-start gap-8">
              <div className="group relative">
                <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-fuchsia-600 to-emerald-600 opacity-50 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                <Link href="/properties">
                  <span className="relative flex items-center divide-x divide-gray-600 rounded-lg bg-white px-7 py-4 leading-none dark:bg-black">
                    <span className="flex items-center space-x-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 -rotate-6 text-pink-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <span className="pr-6 text-gray-900 dark:text-gray-100">
                        Search for properties!
                      </span>
                    </span>
                    <span className="pl-6 text-indigo-400 transition duration-200 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                      Search&nbsp;&rarr;
                    </span>
                  </span>
                </Link>
              </div>
            </div>

            <div className="my-2 grid items-start gap-8">
              <div className="group relative">
                <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r  from-pink-600 to-purple-600 opacity-50 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                <span className="relative flex items-center divide-x divide-gray-600 rounded-lg bg-white px-7 py-4 leading-none dark:bg-black">
                  <span className="flex items-center space-x-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 -rotate-6 text-fuchsia-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                    <span className="pr-6 text-gray-900 dark:text-gray-100">
                      Book a property!&nbsp;&nbsp;&nbsp;
                    </span>
                  </span>
                  <span className="pl-6 text-primary-400 transition duration-200 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                    Book&nbsp;&rarr;
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
            <Link href="/auth/register" className="bg-primary-900 rounded-t-xl rounded-br-xl px-6 py-4 font-semibold text-2xl text-white">Get Started</Link>   
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center my-12 bg-primary-500 py-8 px-8  rounded-[48px]">
              <Image
                src="/static/rent.jpg"
                alt="colony"
                width={600}
                height={400}
                className="rounded-2xl w-ful sm:object-cover object-center"
                placeholder="blur"
                blurDataURL="/static/images/SVG-placeholder.png"
              />

           <div className="">
                <div className="w-24 text-center bg-gray-100 font-bold rounded-lg text-lg p-4">Rent</div>

                <h1 className="font-bold text-2xl my-6 text-white md:subpixel-antialiased">Rent Houses Easily</h1>

                <p className="leading-loose leading-8 indent-3 whitespace-normal">
                  View all your rent in one place. Easily search and manage your rental income. 
                  Automate rent reminders to your tenants. 
                  Receive money into your account same day
                </p>

                <div className="flex justify-start items-center space-x-4">
                    <span className="text-white underline decoration-solid underline-offset-8">Start Renting </span>
                    <Link href="/auth/register" className="rounded-full p-2 bg-gray-100">
                      <FaCaretRight className="w-7 h-7 text-primary-900" />
                    </Link>
                </div>
           </div> 
           
      </div>
    </LayoutWrapper>
  );
}
