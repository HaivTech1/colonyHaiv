import { ClockIcon, LocationMarkerIcon, StarIcon, MapIcon } from '@heroicons/react/solid';
import { FiHome } from 'react-icons/fi'
import { TbBath, TbBed } from 'react-icons/tb'
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
} from 'next-share'
import SlideShow from './../SlideShow';
import { useRouter } from 'next/router';


const PropertyDetail = ({property}) => {
  const {title, price, address, created_at, bedroom, bathroom, description, built, specifications, relationships, image, video} = property

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
                      <ClockIcon className='w-5 h-5 text-primary-500' />
                      <span>{bedroom} Bedroom</span>
                    </div>    

                    <div className='flex space-x-2'>
                      <LocationMarkerIcon className='w-5 h-5 text-primary-500' />
                      <span>{bathroom} Bathroom</span>
                    </div>

                    <div className='flex space-x-2'>
                      <LocationMarkerIcon className='w-5 h-5 text-primary-500' />
                      <span> Built in {built}</span>
                    </div>

                    <div className='mt-2'>
                      <span className='font-bold text-primary-500 text-lg'>{relationships.category.name}</span>
                    </div>
                </div>

                <div className="flex mt-4">
                    <FacebookShareButton
                        url={`http://localhost:3000/${asPath}`}
                        title={
                            'next-share is a social share buttons for your next React apps.'
                        }>
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <PinterestShareButton
                        url={`http://localhost:3000/${asPath}`}
                        title={
                            'next-share is a social share buttons for your next React apps.'
                        }>
                        <PinterestIcon size={32} round />
                    </PinterestShareButton>
                    <RedditShareButton
                        url={`http://localhost:3000/${asPath}`}
                        title={
                            'next-share is a social share buttons for your next React apps.'
                        }>
                        <RedditIcon size={32} round />
                    </RedditShareButton>
                    <WhatsappShareButton
                        url={`http://localhost:3000/${asPath}`}
                        title={
                            'next-share is a social share buttons for your next React apps.'
                        }>
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    <LinkedinShareButton
                        url={`http://localhost:3000/${asPath}`}
                        title={
                            'next-share is a social share buttons for your next React apps.'
                        }>
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                </div>

                <div className="mt-4">
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
