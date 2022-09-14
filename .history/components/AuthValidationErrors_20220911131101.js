import { CheckTimesIcon } from '@heroicons/react/solid'

const AuthValidationErrors = ({ errors = [], ...props }) => (
    <>
        {errors.length > 0 && (
            <div {...props}>
                <div className="font-medium text-red-600">
                    Whoops! Something went wrong.
                </div>

                <ul className="mt-3 list-none list-inside text-sm text-red-600">
                    {errors.map((error, index) => (
                        <li key={index}>
                            <CheckTimesIcon className="h-4 w-4 text-primary-700 mr-4" /> 
                            <span>{error}</span>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </>
)

export default AuthValidationErrors
