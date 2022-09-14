import React, {useState} from 'react'
import Swal from 'sweetalert2'
import SectionContainer from '../layouts/SectionContainer'
import { useAdmin } from '../../lib/provider/context'
import { colonyFurnish } from '../../utils/filterData'
import { colonyAmenities  } from '../../utils/filterData'

import toast from 'react-hot-toast'


const Furnish = () => {

  const { furnish, addFurnish, amenities, addAmenities } = useAdmin()
  const [currentFurnish, setCurrentFurnish] = useState(furnish)
  const [currentAmenities, setCurrentAmenities] = useState(amenities)

  const handleFurnishClick = async (e) => {
    const { checked, value } = e.currentTarget

    const isConfirm = await Swal.fire({
      title: 'Hello, dear user!',
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

  return (
    <SectionContainer>

      <div className=''>
        <div className=''>
          <div className="mb-10 mt-10 sm:mt-20 text-center">
              <h3 className="my-2 text-xl font-bold leading-none text-gray-900">
                Get your place professionally equipped
              </h3>
              <p className='mt-2 font-thin text-base'>
                With our professional artisans, you can get the best. Ours is to get professionals for you needs. Check the area you would like us to 
                service you.
              </p>
          </div>

          <div className="block w-full overflow-x-auto">
              <form onSubmit={submitFurnishHandler}>
                <div className="grid grid-cols-1 md:grid-cols-3 sm:place-items-center">
                {!colonyFurnish && 'There are no amenities available'}
                  {colonyFurnish.map(({ name, value }) => (
                    <div key={name} className="mx-8 my-5 flex">
                      <input
                        id={name}
                        type="checkbox"
                        label={value}
                        value={value}
                        checked={colonyFurnish.some((val) => val === value)}
                        onChange={handleFurnishClick}
                        hidden
                      />
                      <label
                        className="group flex cursor-pointer select-none items-center space-x-2 text-gray-700"
                        htmlFor={name}
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary-700 group-hover:border-primary-700">
                          {currentFurnish.some((val) => val === value) && (
                            <div className="h-3 w-3 rounded-full bg-primary-500 group-hover:bg-primary-700" />
                          )}
                        </div>
                        <span className="font-bold text-primary-500 group-hover:text-lg">
                          {name}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                  { currentFurnish.length >= 1 &&
                    <div className="flex justify-center">
                        <button type="submit"
                          className={`px-2 py-2 dark:bg-background-color rounded-lg bg-transparent outline-none border-2 border-primary-400 text-primary-500 font-medium active:scale-95 hover:bg-primary-600 hover:text-white hover:border-transparent focus:bg-primary-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none cursor-pointer transition-colors duration-200 ease-in-out`}>
                          Save
                        </button>
                    </div>
                  }
              </form>
          </div>
        </div>

        <div className=''>
          <div className="mb-10 mt-10 sm:mt-20 text-center">
            <h3 className="my-2 text-xl font-bold leading-none text-gray-900">
              Your booking is important to us!
            </h3>
            <p>
              We would love to give you more. Please select the service you want to attach to this
              booking and save before proceeding
            </p>
          </div>

          <div className="block w-full overflow-x-auto">
            <form onSubmit={submitHandler}>
              <div className="flex sm:flex-row flex-col flex-wrap items-start sm:justify-around justify-start">
                {colonyAmenities.map(({ name, value }) => (
                  <div key={name} className="mx-8 my-5 flex">
                    <input
                      id={name}
                      type="checkbox"
                      label={value}
                      value={value}
                      checked={colonyAmenities.some((val) => val === value)}
                      onChange={handleClick}
                      hidden
                    />
                    <label
                      className="group flex cursor-pointer select-none items-center space-x-2 text-gray-700"
                      htmlFor={name}
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary-700 group-hover:border-primary-700">
                        {colonyAmenities.some((val) => val === value) && (
                          <div className="h-3 w-3 rounded-full bg-primary-500 group-hover:bg-primary-700" />
                        )}
                      </div>
                      <span className="font-bold text-primary-500 group-hover:text-lg">
                        {name}
                      </span>
                    </label>
                  </div>
                ))}
              </div>

              {currentAmenities.length >= 1  &&
                <div className="flex justify-center">
                    <button type="submit"
                      className={`px-2 py-2 dark:bg-background-color rounded-lg bg-transparent outline-none border-2 border-primary-400 text-primary-500 font-medium active:scale-95 hover:bg-primary-600 hover:text-white hover:border-transparent focus:bg-primary-600 focus:text-white focus:border-transparent focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none cursor-pointer transition-colors duration-200 ease-in-out`}>
                      Save
                    </button>
                </div>
              }
            </form>
          </div>
        </div>
        </div>
    </SectionContainer>
  )
}

export default Furnish
