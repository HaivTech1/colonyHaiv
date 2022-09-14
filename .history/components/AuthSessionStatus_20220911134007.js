import { CheckCircleIcon } from '@heroicons/react/solid'

const AuthSessionStatus = ({ status, className, ...props }) => (
    <>
        {status && (
            <div
                className={`${className} font-medium text-sm text-green-600 flex justify-center items-center`}
                {...props}>
                <CheckCircleIcon className="h-4 w-4 text-green-600 mr-4" /> 
                <span>{status}</span>
            </div>
        )}
    </>
)

export default AuthSessionStatus
