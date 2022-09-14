import React, {useState} from 'react'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

import SectionContainer from '../layouts/SectionContainer'
import { useAdmin } from '../../lib/provider/context'
import { colonyFurnish } from '../../utils/filterData'
import { colonyAmenities  } from '../../utils/filterData'



const Furnish = () => {

  const { furnish, addFurnish, amenities, addAmenities, user } = useAdmin()
  const [currentFurnish, setCurrentFurnish] = useState(furnish)
  const [currentAmenities, setCurrentAmenities] = useState(amenities)

  const handleFurnishClick = async (e) => {
    const { checked, value } = e.currentTarget

    const isConfirm = await Swal.fire({
      title: 'Hello! ' + user.name,
      text: `You have just choosen to be updated on (${value}). You will be notified soon.`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#D100D1',
      cancelButtonColor: '#F9A01B',
      confirmButtonText: 'Yes, please add!',
    }).then((result) => {
      return result.isConfirmed
    })

    if (!isConfirm) {
      return
    }

    setCurrentFurnish((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    )
  }

  const submitFurnishHandler = (e) => {
    e.preventDefault()
    if (!currentFurnish) {
      toast.error('At least one action is required')
    } else {
      addFurnish(currentFurnish)
      toast.success('Choices added successfully')
    }
  }

  const handleAmenitiesClick = async (e) => {
    const { checked, value } = e.currentTarget

    const isConfirm = await Swal.fire({
      title: 'Hello! ' + user.name,
      text: `You have just choosen (${value}) to be added to your booking`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#D100D1',
      cancelButtonColor: '#F9A01B',
      confirmButtonText: 'Yes, please add!',
    }).then((result) => {
      return result.isConfirmed
    })

    if (!isConfirm) {
      return
    }

    setCurrentAmenities((prev) => (
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    ))
    
  }

  const submitAmenitiesHandler = async (e) => {
    e.preventDefault()

    addAmenities(currentAmenities)
    toast.success('Items added to your booking successfully')
  }

  return (
    <SectionContainer>

      <div className=''>
        <div className='font-semi-bold leading-8 indent-3 whitespace-normal break-all text-lg'>
              <div className="mb-10 mt-10 sm:mt-20 text-center">
                  <h1 className="my-2 text-xl font-bold leading-none">Your booking is important to us!</h1>
                  <h1 className="my-2 text-md font-bold leading-none">
                    Get your place professionally equipped
                  </h1>
                  <p className='mt-2 font-thin text-base'>
                    With our professional artisans, you can get the best. Ours is to get professionals for your needs. Check the area you would like us to 
                    service you.
                  </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2">
              
              </div>

          
          </div>
        </div>
    </SectionContainer>
  )
}

export default Furnish
