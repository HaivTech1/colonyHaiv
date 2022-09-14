import { ClockIcon, LocationMarkerIcon, StarIcon, MapIcon } from '@heroicons/react/solid';
import { TbBath, TbBed } from 'react-icons/tb'
import { FaCalendarCheck } from "react-icons/fa";
import millify from 'millify';
import React, {useState} from 'react'
import ReactPlayer from 'react-player'
import toast from 'react-hot-toast'
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
} from 'next-share'
import SlideShow from './../SlideShow';
import { useRouter } from 'next/router';


const PropertyDetail = ({property}) => {
  const {slug, title, price, address, created_at, bedroom, bathroom, description, built, specifications, relationships, image, video} = property

  const [ratingRate, setRatingRate] = useState('')
  const [ratingMessage, setRatingMessage] = useState('')

  const router = useRouter();
  const {asPath} = router;
  
  const submitRating = async event => {
      event.preventDefault()
      let toastId
      toastId = toast.loading('Submiting...')

      try {
              client
              .post('/api/v1/reviews', {
                  rating: ratingRate,
                  message: ratingMessage,
                  property_id: property.id,
              })
              .then(
                  setRatingMessage(''),
                  toast.success(
                      'Your review has been successfully submitted!',
                      {
                          id: toastId,
                      },
                  ),
              )
              .catch(error => {
                  if (error.response.status !== 422) throw error
                  setErrors(Object.values(error.response.data.errors).flat())
                  toast.error('unable to submit review', { id: toastId })
              })
      } catch (e) {
          console.log(e)
          toast.error('unable to submit review', { id: toastId })
      }
  }

  const ratingChanged = newRating => {
      setRatingRate(newRating)
  }

  const propertyURL = `${siteMetadata.website}/property/${slug}`
  return (
    <div>
        <SlideShow images={image}/>

        <div>
          <div className="flex justify-between items-center">
              <span className='text-primary-700 font-bold text-2xl'>{title}</span>
              <span className='text-primary-500 font-bold border-b-4 border-primary-700 text-2xl'>{millify(price)}</span>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 mt-4 place-content-center'>
              <div>
                <div className='grid grid-cols-2'>
                  <div className='flex space-x-2'>
                    <ClockIcon className='w-5 h-5 text-primary-500' />
                    <span>Posted {created_at}</span>
                  </div>    

                  <div className='flex space-x-2'>
                    <LocationMarkerIcon className='w-5 h-5 text-primary-500' />
                    <span>{address}</span>
                  </div>
                </div>

                <div className='grid grid-cols-3 mt-4'>
                    <div className='flex space-x-2'>
                      <TbBed className='w-5 h-5 text-primary-500' />
                      <span>{bedroom} Bedroom</span>
                    </div>    

                    <div className='flex space-x-2'>
                      <TbBath className='w-5 h-5 text-primary-500' />
                      <span>{bathroom} Bathroom</span>
                    </div>

                    <div className='flex space-x-2'>
                      <FaCalendarCheck className='w-5 h-5 text-primary-500' />
                      <span> Built in {built}</span>
                    </div>

                    <div className='mt-2'>
                      <span className='font-bold text-primary-500 text-lg'>{relationships.category.name}</span>
                    </div>
                </div>

                <div className="flex mt-4">
                <TwitterShareButton
                url={propertyURL}
                title={title}
                via={siteMetadata.socialAccount.twitter}
                className="flex items-center overflow-hidden rounded-full !bg-[#1da1f2] hover:scale-110">
                <SocialIcon
                  network="twitter"
                  style={{ height: 35, width: 35 }}
                  fgColor="#fff"
                  bgColor="#1da1f2"
                />
              </TwitterShareButton>
              <FacebookShareButton
                url={propertyURL}
                quote={title}
                className="flex items-center overflow-hidden rounded-full !bg-[#1877f2] hover:scale-110">
                <SocialIcon
                  network="facebook"
                  style={{ height: 35, width: 35 }}
                  fgColor="#fff"
                  bgColor="#1877f2"
                />
              </FacebookShareButton>
                    <EmailShareButton
                      body={'Check out this property'}
                      subject={title}
                      separator=" : "
                      url={propertyURL}
                      className="flex items-center overflow-hidden rounded-full !bg-[#B61AC1] hover:scale-110">
                      <SocialIcon
                        network="email"
                        style={{ height: 35, width: 35 }}
                        fgColor="#fff"
                        bgColor="#B61AC1"
                      />
                    </EmailShareButton>
    
                    <WhatsappShareButton
                    title={title}
                    separator={' : '}
                    url={propertyURL}
                    className="flex items-center overflow-hidden rounded-full !bg-[#25D366] hover:scale-110">
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                    <LinkedinShareButton
                        url={propertyURL}
                        title={title}
                        source={siteMetadata.website}
                        className="flex items-center overflow-hidden rounded-full !bg-[#0072b1] hover:scale-110">
                    <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                </div>

                <div className="mt-4 leading-8 indent-3 whitespace-normal break-all text-lg">
                  <p>{description}</p>
                </div>

                <div className='mt-8'>
                    <h1 className="text-md font-bold text-primary-700">Features ({specifications?.length})</h1>
                    <div className='grid grid-cols-2 gap-4 mt-2 mx-2'>
                      {specifications?.map((specification, index) => (
                        <div className="flex items-center space-x-1" key={index}>
                          <StarIcon className='w-5 h-5 text-amber-500' />
                          <span className="font-bold">{specification}</span>
                        </div>
                      ))}
                    </div>
                </div>
              </div>

              <div className="p-4 rounded-xl sm:mt-2 mt-5 sm:ml-2 text-base ">
                <ReactPlayer url='https://www.youtube.com/watch?v=wWgIAphfn2U' className="border-2 border-primary-500 border-dashed aspect-video p-2" />
              </div>
            </div>

          </div>

        </div>
  )
}

export default PropertyDetail
