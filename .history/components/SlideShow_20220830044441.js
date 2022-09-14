import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@heroicons/react/solid';
import React from 'react'
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const SlideShow = ({images}) => {

  // const images = [
  //   '/static/images/Blog/apple-competition.jpg',
  //   '/static/images/Blog/apple-competition.jpg',
  //   '/static/images/Blog/apple-privacy.jpg',
  // ];

  const zoomInProperties = {
    indicators: true,
    scale: 1.2,
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    prevArrow:(
      <div className='lg:m-32 bg-primary-500 rounded-full text-white p-2 sm:m-20'>
        <ArrowCircleLeftIcon className="w-5 h-5" />
      </div>
    ),
    nextArrow:(
      <div className='lg:m-32 bg-primary-500 rounded-full text-white p-2 sm:m-20'>
        <ArrowCircleRightIcon className="w-5 h-5" />
      </div>
    ),
  }

  return (
    <div className='mt-10'>
        <Zoom {...zoomInProperties}>
            {images.map((image, index) => (
              <div key={index} className="flex justify-center w-full h-full">
                  <img src={image} className="w-3/4 h-80 object-cover rounded-lg shadow-xl" />
              </div>
            ))}
        </Zoom>
    </div>
  )
}

export default SlideShow
