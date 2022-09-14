import React, {useState} from 'react'
import Swal from 'sweetalert2'
import SectionContainer from '../layouts/SectionContainer'
import { useAdmin } from '../../lib/provider/context'
import { colonyFurnish } from '../../utils/filterData'
import toast from 'react-hot-toast'


const Furnish = () => {

  const { furnish, addFurnish } = useAdmin()

  const [currentFurnish, setCurrentFurnish] = useState(furnish)

  const handleClick = async (e) => {
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

  const submitHandler = (e) => {
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

        </div>

        </div>
    </SectionContainer>
  )
}

export default Furnish
