import Link from 'next/link'
import Image from 'next/image'
import siteMetadata from '../../utils/siteMetadata'

const AuthCard = ({ children }) => {
  return (
    <div className="grid place-items-center bg-gray-200 text-black antialiased dark:bg-background-color">
      <section className="h-full gradient-form md:h-screen">
        <div className="container py-12 px-6 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="xl:w-10/12">
              <div className="block bg-white shadow-lg rounded-lg">
                <div className="lg:flex lg:flex-wrap g-0">
                  <div className="lg:w-6/12 px-4 md:px-0">
                    <div className="md:p-12 md:mx-6">
                      {children}
                    </div>
                  </div>
                  <div className="big-background lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none">
                    <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                    <div className="text-center">
                        <Link href="/">
                          <Image
                            src="/static/login.png"
                            alt="logo"
                            width={200}
                            height={200}
                          />
                        </Link>
                      </div>
                      
                      <p className="text-sm">
                      {siteMetadata.description} begins with the comfort that you get when you remember that you have a place to live; not just to live! but to live!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AuthCard
