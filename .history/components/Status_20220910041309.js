import { CheckCircleIcon } from '@heroicons/react/solid'
import { TbZoomCancel } from 'react-icons/tb'

const Status = ({ name, status, ...props }) => {
  return (
    <>
      <div className="my-2 flex items-center justify-between">
        <span className="px-verify py-verify rounded-full border border-primary-500 border-opacity-60">
          <CheckCircleIcon className="h-4 w-4 text-primary-700" />
        </span>
        <p className="ml-2 uppercase">{name}</p>
      </div>
    </>
  )
}

export default Status
